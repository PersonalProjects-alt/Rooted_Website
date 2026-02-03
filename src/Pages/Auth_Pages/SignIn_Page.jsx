import React, { useEffect } from 'react'
import './SignInPage.css'
import GoogleButton from 'react-google-button'
import { UserAuth } from '../../context/AuthContext'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function SignIn_Page() {
    const {googleSignIn, user} = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (e) {
            console.log(e);
        }

        
    }

    useEffect(() => {
        if(user != null){
            navigate('/user_dashboard');
        }
    }, [user])

  return (
    <div className='section1_signIn'>
        <div className='section1_layout_signIn'>
            <p className='header_text'>Sign In</p>  
            <GoogleButton onClick={handleGoogleSignIn}/>
        </div>
    </div>
  )
}

export default SignIn_Page