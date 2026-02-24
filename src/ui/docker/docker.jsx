import Dock from './Dock';
import ai_image from './assets/chat.png'
import home_image from './assets/home.png'
import dashbaord_image from './assets/dashboard.png'
import profile_image from './assets/user.png'
import settings_image from './assets/settings.png'
import { AnimatePresence, motion } from "motion/react"
import { Link } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import React, { useEffect, useState } from 'react'
import {GlassCard} from '@developer-hub/liquid-glass'
import ChatUI from '../ai_drawer/ai_chatUi'
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
  
  const items = [
    { icon: <img src={home_image} height={20} width={20} />, label: 'Home', onClick: () => navigate('/') },
    { icon: <img src={dashbaord_image} height={20} width={20} />, label: 'Dashboard', onClick: () => navigate('/user_dashboard') },
    { icon: <img src={ai_image} height={20} width={20} />, label: 'Ai', onClick: () => setDrawerOpen(true) },
    { icon: <img src={profile_image} height={20} width={20} />, label: 'Profile', onClick: () => navigate('/user_dashboard') },
    { icon: <img src={settings_image} height={20} width={20} />, label: 'Settings', onClick: () => navigate('/user_dashboard') },
  ];


  return (
    <>
      {drawerOpen? <div></div> :
        <Dock
          items={items}
          panelHeight={65}
          baseItemSize={45}
          magnification={60}
        />
      }
      
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
          <div style={{display: 'flex', flexDirection:'row', alignItems:'center', gap: '10px', marginTop: '40px'}}>
          <img src={ai_image} width={36} height={36}/>
          <p style={{ fontSize: 23, fontWeight: 600, marginBottom: '0px', marginTop: '0px' }}>
            Ai Assistant
          </p>
          </div>

          <List>
            <ListItem disablePadding>
              <ChatUI/>
            </ListItem>
          </List>

          {/* <Button
            variant="outlined"
            onClick={() => setDrawerOpen(false)}
            sx={{ mt: 2, width: "100%" }}
          >
            Close
          </Button> */}
        </Box>
      </Drawer>

    </>

  )
}

export default Docker