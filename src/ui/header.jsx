import React, { useState } from "react";
import "./header.css";
import Hamburger from "hamburger-react";
import { AnimatePresence, motion } from "motion/react"
import { Link } from "react-router-dom";

function header() {
  const [isOpen, setOpen] = useState(false);
  const isMobile = window.matchMedia("(max-width: 575px)").matches;
  return (
    <header className="navbar">
      <div className="navbar_child">
        <p className="Rooted_title">Rooted</p>
        {isMobile ? null :  (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', position: 'fixed', right: '80px' }}>
          <motion.button 
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
            className="login_signin_buttons">Login</motion.button>

          <motion.button 
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
            className="login_signin_buttons">Sign Up</motion.button>
        </div>

        )}

          <div className="hamburger">
            <Hamburger
              rounded
              toggled={isOpen}
              toggle={setOpen}
              size={24}
              color="#2f2f2f"
            />
          </div>
      </div>
      {isMobile ? (
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
            <a className="menu_item" href="#">Stylists</a>
            <a className="menu_item" href="#">HairStyle Education</a>
            <hr className="navbar_line"/>
            <Link className="menu_item" to = "SignIn_Page">Sign Up</Link>
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
            <a className="menu_item" href="#">About</a>
            <Link className="menu_item" to = "/Ai_info_Page">AI Recomendations</Link>
            <a className="menu_item" href="#">Stylists</a>
            <a className="menu_item" href="#">HairStyle Education</a>
          </motion.div>
        )}
        </AnimatePresence>

      )}
    </header>
  );
}

export default header;
