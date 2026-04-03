import React, { useState } from "react";
import "./styles/header.css";
import Hamburger from "hamburger-react";
import { AnimatePresence, motion } from "motion/react"
import { Link } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from "react-router-dom";
import userImage from "./assets/user.png"
// import notifcationImage from "./assets/notification_img.png"



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
        {user?.displayName ? (
          <div className="updated_navbar_div">
            <div></div>
            <div>
              <motion.button className="userImage"
                onClick={() => navigate('/user_dashboard')}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <img src={userImage} width={20} height={20} />
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="greeting">Hey!</p>
              <p className="userName">{user?.displayName}</p>
            </motion.div>

            {/* <motion.button className="userImage"
              onClick={() => navigate('/user_dashboard')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img src={notifcationImage} width={20} height={20} />
            </motion.button> */}

          </div>

        ) : (
          // <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', right: '80px' }}>
          //   <motion.button
          //     whileHover={{ scale: 0.95 }}
          //     whileTap={{ scale: 0.9 }}
          //     onClick={() => navigate('/SignIn_Page')}
          //     className="login_signin_buttons2">Login/Signup</motion.button>
          // </div>

          <>
            <div>
              <motion.button
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/')}
                className="login_signin_buttons2">Rooted</motion.button>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/SignIn_Page')}
                style={{ right: '80px' }}
                className="login_signin_buttons2">SignIn</motion.button>
            </div>
          </>
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
