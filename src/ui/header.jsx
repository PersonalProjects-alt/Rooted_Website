import React, { useState } from "react";
import "./header.css";
import Hamburger from "hamburger-react";
import { AnimatePresence, motion } from "motion/react"

function header() {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar_child">
        <p className="Rooted_title">Rooted</p>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <motion.button 
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
            className="login_signin_buttons">Login</motion.button>

          <motion.button 
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
            className="login_signin_buttons">Sign Up</motion.button>

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
      </div>

      <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div 
            className="menu_div"
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <a className="menu_item" href="#">Home</a>
          <a className="menu_item" href="#">Stylists</a>
          <a className="menu_item" href="#">HairStyle Education</a>
          <a className="menu_item" href="#">About</a>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}

export default header;
