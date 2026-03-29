import React, { useState } from "react";
import "./styles/header.css";
import Hamburger from "hamburger-react";
import { AnimatePresence, motion } from "motion/react"
import { Link } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from "react-router-dom";


function header() {
  const [isOpen, setOpen] = useState(false);
  const isMobile = window.matchMedia("(max-width: 575px)").matches;
  const navigate = useNavigate()
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/')
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <header className="navbar">
      <div className="navbar_child">
        <p className="Rooted_title">Rooted</p>

        {user?.displayName ? (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', right: '80px' }}>
            <motion.button
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSignOut}
              className="login_signin_buttons">Signout</motion.button>
          </div>

        ) : (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', right: '80px' }}>
            <motion.button
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/SignIn_Page')}
              className="login_signin_buttons">Login/Signup</motion.button>
          </div>
        )}


        {/* <div className="hamburger">
            <Hamburger
              rounded
              toggled={isOpen}
              toggle={setOpen}
              size={24}
              color="#2f2f2f"
            />
          </div> */}
      </div>
      {/* {user?.displayName ? (
        <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
              className="menu_div"
              initial={{ opacity: 0, scale: 0.98, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Link className="menu_item" to= "/">Home</Link>
            <a className="menu_item" href="#">About</a>
            <Link className="menu_item" to = "/Ai_info_Page">AI Recomendations</Link>
            <Link className="menu_item" to= "/user_dashboard">Dashboard</Link>
            <a className="menu_item" href="#">Stylists</a>
            <a className="menu_item" href="#">HairStyle Education</a>
            <hr className="navbar_line"/>
            <button className="menu_item log_out_btn" onClick={handleSignOut}>LogOut</button>
          </motion.div>
        )}
        </AnimatePresence>

      ) :  
      
      (
        <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
              className="menu_div"
              initial={{ opacity: 0, scale: 0.98, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Link className="menu_item" to= "/">Home</Link>
            <Link className="menu_item" to= "/About">About</Link>
            <Link className="menu_item" to = "/Ai_info_Page">AI Recomendations</Link>
            <Link className="menu_item" to= "/user_dashboard">Dashboard</Link>
            <hr className="navbar_line"/>
            <Link className="menu_item" to = "/SignIn_Page">Sign In</Link>
          </motion.div>
        )}
        </AnimatePresence>

      )} */}
    </header>
  );
}

export default header;
