import React, { useEffect, useState }from 'react'
import { ref, set, serverTimestamp, getDatabase, onValue, get } from "firebase/database";
import { AnimatePresence, motion } from "motion/react"
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";

function LoggedOutComponent() {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate()

    const signInbtn = async () => {
        navigate('/SignIn_Page');
    }
    return (
        <div className='section1_unauthenticated' style={{height: '100vh'}}>
            <div className='unauthenticted_box' style={{top:'10%'}}>
                <p className='unauthenticated_header'>Welcome to Rooted</p>
                <p className='unauthenticated_subtitle'>Please sign in to access your personalized dashboard and hair journey.</p>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                    <button className='unauthenticated_btn' onClick={signInbtn}>Sign In</button>
                </div>

            </div>
        </div>
    )
}

export default LoggedOutComponent