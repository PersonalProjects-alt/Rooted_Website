import React, { useState } from "react";
import './styles/footer.css'
import { AnimatePresence, motion } from "motion/react"
import { Link } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext'
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import CopyrightIcon from '@mui/icons-material/Copyright';

function footer() {
  return (
    <div className='footer_parent_div'>
        <div className='footer_layout'>
            <p className='footer_title'>Rooted</p>
            <p className='footer_desc' style={{marginBottom: '70px'}}>Your trusted platform for natural hair guidance, education, and community.</p>
            <p className='footer_subtitle'>Explore</p>
            <div className="footer_list_div">
            <Link className="footer_desc" to= "/">Home</Link>
            <Link className="footer_desc" to= "/">Profile</Link>
            <Link className="footer_desc" to= "/user_dashboard">Dashboard</Link>
            <Link className="footer_desc" to= "/">About</Link>
            </div>

            <p className='footer_subtitle'>Connect</p>
            <div className="footer_list_div" style={{flexDirection: 'row'}}>    
                <XIcon style={{color: "white", marginTop: '20px'}}/>
                <YouTubeIcon style={{color: "white", marginTop: '20px'}}/>
                <InstagramIcon style={{color: "white", marginTop: '20px'}}/>
            </div>

            <hr/>
            
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:"center", gap: '12px', marginTop: '40px'}}>
                <CopyrightIcon style={{color: "#b6b6b6"}}/>
                <p className="footer_desc">2026 Rooted. All rights reserved.</p>
            </div>

        </div>
    
    </div>
  )
}

export default footer