import React, { use, useEffect, useState } from 'react'
import './user_dashboard.css'
import styl1 from "../../assets/style1.png"
import styl2 from "../../assets/style2.png"
import styl3 from "../../assets/style3.png"
import styl4 from "../../assets/style4.png"
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { ref, set, serverTimestamp, getDatabase, onValue, get } from "firebase/database";
import { AnimatePresence, motion } from "motion/react"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import loggedOutComponent from '../../ui/loggedOutComponent/loggedOutComponent'
import LoadingComponent from '../../ui/loadingComponent/loadingComponent'
import LoggedOutComponent from '../../ui/loggedOutComponent/loggedOutComponent'

function user_dashboard() {
  const { user, logOut } = UserAuth();
  const [survey, setSurvey] = useState(null)
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const navigate = useNavigate()
  const recommended_styles = [
    { image: styl1, title: "Box Braids", desc: "Medium Maintenace" },
    { image: styl2, title: "Faux Locs", desc: "Medium Maintenace" },
    { image: styl3, title: "Twist Out", desc: "Low Maintenace" },
    { image: styl4, title: "Wash and Go", desc: "Low Maintenace" }
  ]

  const signInbtn = async () => {
    navigate('/SignIn_Page');
  }

  const callProtectedRoute = async () => {
    try{
      if (!user) return;

      //Get Firebase ID token for the currently logged-in user
      const token = await user.getIdToken();

      //Call backend protected route with the token in headers
      const res = await fetch("http://localhost:4000/api/private", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json();

      // If token is missing/invalid, backend will return 401
      if (!res.ok) {
        console.error("Backend rejected request", data)
        return;
      }

      console.log("Protected route response", data);
    } catch(e){
      console.error("error calliung protected route", e)
    }
  }

  //use effect runs after component loads
  useEffect(() => {
    //cant make useEffect directly async so you have to wrap it 
    const loadSurvey = async () => {
      if (!user?.uid) return; // if the user is null return directly 

      await callProtectedRoute();
      //wrapping in a try and catch  
      try {
        const snap = await get(ref(db, `users/${user.uid}/survey`)); //fetching from firebase
        if (snap.exists()) setSurvey(snap.val()); //snap means "here is the data at that location", if statement checks if data exits
        else setSurvey(null);
      } catch (err) {
        console.error("Failed to load survey:", err);
      } finally {
        setLoading(false); //runs whenever the fecth suceeded or the fetch fails 
      }
    };

    loadSurvey();
  }, [user?.uid] /**User dependecy array which checks if there are any changes with user?uid */);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowFallback(true);
    }, 5000); // Show fallback after 5 seconds

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [])


  // if(loading && !showFallback) {
  //   return (
  //     <LoadingComponent/>
  //   )
  // }
  
  //   if(loading && showFallback) {
  //   return (
  //     <LoggedOutComponent/>
  //   )
  // } 
  
  if (loading && user) {
    <LoadingComponent/>
  }

  if(!user){
    return (
      <LoggedOutComponent/>
    )
  }
  if (!survey) return <p>No survey found yet.</p>;

  return (
    <>
      {user?.displayName ? (
        <div>
          <div className='section1_authenticated'>
            <p className='section1_auth_header'>Welcome back,</p>
            <p className='section1_auth_subtitle'>{user?.displayName}</p>
            <p className='section1_auth_desc'>Your personalized hair journey dashboard. Explore recommended styles, continue your education, and track your progress.</p>
            <div className='info_box_div'>
              <div className='info_box'>
                <p className='info_header'>Your Hair Type:</p>
                <p className='info_stats' style={{ fontSize: '25px', marginTop: '35px' }}>{survey?.hairType}</p>
              </div>
              <div className='info_box'>
                <p className='info_header'>Your Hair Porosity:</p>
                <p className='info_stats' style={{ marginTop: '35px' }}>{survey?.porosity}</p>
              </div>
              <div className='info_box'>
                <p className='info_header'>Your Hair Lifestyle:</p>
                <p className='info_stats' style={{ marginTop: '35px' }}>{survey?.lifestyle}</p>
              </div>
              <div className='info_box'>
                <p className='info_header_update' style={{ marginTop: '40px' }}>Update your hair stats</p>
              </div>
            </div>
          </div>

          <Drawer
            anchor="bottom"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              sx: {
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
                paddingBottom: 2,
              },
            }}
          >
            <Box sx={{ p: 2 }}>
              <div className='bottomMiniBarHandle' style={{justifyContent:'center'}} />
              <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
                Update your hair stats
              </p>

              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => { navigate("/ai_survey"); setDrawerOpen(false); }}>
                    Update survey
                  </ListItemButton>
                </ListItem>
              </List>

              <Button
                variant="outlined"
                onClick={() => setDrawerOpen(false)}
                sx={{ mt: 2, width: "100%" }}
              >
                Close
              </Button>
            </Box>
          </Drawer>


          <div className='section2_authenticated'>
            <div style={{ marginLeft: '30px', marginRight: '30px' }}>
              <p className='section2_header_dash'>Recommended for You</p>
              <p className='section2_desc_dash'>Hairstyles curated based on your preferences</p>

              <div>
                {recommended_styles.map((item, index) => (
                  <motion.div
                    key={index}
                    className="style_dash"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                  >

                    <div>
                      <img src={item.image} alt={item.title} className="style_dash_img" />
                    </div>

                    <p className='recommended_cards_title'>{item.title}</p>
                    <p className='recommended_cards_desc'>{item.desc}</p>
                  </motion.div>
                )
                )}
              </div>
            </div>
          </div>

        </div>
      ) : (
        <LoggedOutComponent/>
      )}
    </>

  )
}

export default user_dashboard