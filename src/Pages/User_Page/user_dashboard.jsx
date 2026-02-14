import React, { useEffect, useState } from 'react'
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

function user_dashboard() {
  const { user, logOut } = UserAuth();
  const [survey, setSurvey] = useState(null)
  const [loading, setLoading] = useState(true);
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

  //use effect runs after component loads
  useEffect(() => {
    //cant make useEffect directly async so you have to wrap it 
    const loadSurvey = async () => {
      if (!user?.uid) return; // if the user is null return directly 

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

  if (loading) return <p>Loading...</p>;
  if (!survey) return <p>No survey found yet.</p>;

  return (
    <>
      {user?.displayName ? (
        <>
          <div className='section1_authenticated'>
            <p className='section1_auth_header'>Welcome back,</p>
            <p className='section1_auth_subtitle'>{user?.displayName}</p>
            <p className='section1_auth_desc'>Your personalized hair journey dashboard. Explore recommended styles, continue your education, and track your progress.</p>
            <div className='info_box_div'>
              <div className='info_box'>
                <p className='info_header'>Your Hair Type:</p>
                <p className='info_stats' style={{fontSize:'25px'}}>{survey.hairType}</p>
              </div>
              <div className='info_box'>
                <p className='info_header'>Your Hair Porosity:</p>
                <p className='info_stats' style={{marginTop:'25px'}}>{survey.porosity}</p>
              </div>
              <div className='info_box'>
                <p className='info_header'>Your Hair Lifestyle:</p>
                <p className='info_stats' style={{marginTop:'25px'}}>{survey.lifestyle}</p>
              </div>
              <div className='info_box'>
                <p className='info_header_update' style={{marginTop:'40px'}}>Update your hair stats</p>
              </div>
            </div>
          </div>


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

        </>
      ) : (
        <div className='section1_unauthenticated'>
          <div className='unauthenticted_box'>
            <p className='unauthenticated_header'>Welcome to Rooted</p>
            <p className='unauthenticated_subtitle'>Please sign in to access your personalized dashboard and hair journey.</p>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
              <button className='unauthenticated_btn' onClick={signInbtn}>Sign In</button>
            </div>

          </div>
        </div>
      )}
    </>

  )
}

export default user_dashboard