import Dock from './Dock';
import ai_image from './assets/chat.png'
import home_image from './assets/home.png'
import dashbaord_image from './assets/dashboard.png'
import profile_image from './assets/user.png'
import settings_image from './assets/settings.png'
import location_img from './assets/location.png'
import { AnimatePresence, motion } from "motion/react"
import { Link } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import React, { useEffect, useState } from 'react'
import ChatUI from '../ai_drawer/ai_chatUi'
import { db } from "../../firebase";
import { ref, set, serverTimestamp, getDatabase, onValue, get } from "firebase/database";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";


function Docker() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate()
  const { user, logOut } = UserAuth();
  const [survey, setSurvey] = useState(null)
  const [loading, setLoading] = useState(true);



  //use effect runs after component loads
  useEffect(() => {
    if (!user?.uid) {
      setSurvey(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const surveyRef = ref(db, `users/${user.uid}/survey`);

    const unsubscribe = onValue(
      surveyRef,
      (snap) => {
        if (snap.exists()) {
          setSurvey(snap.val());
        } else {
          setSurvey(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Failed to listen to survey:", err);
        setLoading(false);
      }
    );

    // cleanup listener when component unmounts
    return () => unsubscribe();
  }, [user?.uid]);


  const items = [
    { icon: <img src={home_image} height={20} width={20} />, label: 'Home', onClick: () => navigate('/') },
    { icon: <img src={dashbaord_image} height={20} width={20} />, label: 'Dashboard', onClick: () => navigate('/user_dashboard') },
    { icon: <img src={ai_image} height={20} width={20} />, label: 'Ai', onClick: () => setDrawerOpen(true) },
    { icon: <img src={location_img} height={20} width={20} />, label: 'Profile', onClick: () => navigate('/findSalon') },
    { icon: <img src={settings_image} height={20} width={20} />, label: 'Settings', onClick: () => navigate('/user_dashboard') },
  ];


  return (
    <>
      {drawerOpen ? <div></div> :
        <Dock
          items={items}
          panelHeight={65}
          baseItemSize={45}
          magnification={60}
        />
      }

      {user?.displayName ? (
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              height: "90vh",
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
              paddingBottom: 2,
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <div className='bottomMiniBarHandle' style={{ justifyContent: 'center' }} />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginTop: '40px' }}>
              <img src={ai_image} width={36} height={36} />
              <p style={{ fontSize: 23, fontWeight: 600, marginBottom: '0px', marginTop: '0px' }}>
                Ai Assistant
              </p>
            </div>
            <p className='ai_subText'>Your Ai recommensdations will be based off your hair stats:</p>
            <div className='docker_info_box_div'>
              <div className='docker_info_box'>
                <p className='info_header'>Your Hair Type:</p>
                <p className='info_stats_docker'>{survey?.hairType}</p>
              </div>
              <div className='docker_info_box'>
                <p className='info_header'>Your Hair Porosity:</p>
                <p className='info_stats_docker'>{survey?.porosity}</p>
              </div>
              <div className='docker_info_box'>
                <p className='info_header'>Your Hair Type:</p>
                <p className='info_stats_docker'>{survey?.lifestyle}</p>
              </div>
              <div className='docker_info_box'>
                <p className='info_header'>Goals:</p>
                <p className='info_stats_docker'>{survey?.goals}</p>
              </div>
              <div className='docker_info_box'>
                <p className='info_header'>Wash Time:</p>
                <p className='info_stats_docker'>{survey?.washTime}</p>
              </div>
              <div className='docker_info_box'>
                <p className='info_header'>Wash Frequency:</p>
                <p className='info_stats_docker'>{survey?.washFrequency}</p>
              </div>
            </div>
            <div>

            </div>
            <ChatUI />

            {/* <Button
            variant="outlined"
            onClick={() => setDrawerOpen(false)}
            sx={{ mt: 2, width: "100%" }}
          >
            Close
          </Button> */}
          </Box>
        </Drawer>
      ) : (
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              height: "90vh",
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
              paddingBottom: 2,
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <div className='bottomMiniBarHandle' style={{ justifyContent: 'center' }} />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginTop: '40px' }}>
              <img src={ai_image} width={36} height={36} />
              <p style={{ fontSize: 23, fontWeight: 600, marginBottom: '0px', marginTop: '0px' }}>
                Ai Assistant
              </p>
            </div>
            <p className='ai_subText'>Make sure that you are logged in </p>
            <div>

            </div>

            {/* <Button
            variant="outlined"
            onClick={() => setDrawerOpen(false)}
            sx={{ mt: 2, width: "100%" }}
          >
            Close
          </Button> */}
          </Box>
        </Drawer>


      )}
    </>

  )
}

export default Docker