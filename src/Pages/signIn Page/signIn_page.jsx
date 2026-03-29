import React, { useEffect, useState } from 'react'
import './styles/signIn_page.css'
import GoogleButton from 'react-google-button'
import { UserAuth } from '../../context/AuthContext'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import GoogleImage from './assets/google.png'

function SignIn_Page() {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();
    const [inputEmail, setinputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (user != null) {
            navigate('/user_dashboard');
        }
    }, [user])

    return (
        <div className='section1_signIn'>
            <div className='section1_layout_signIn'>
                <p className='header_text'>Rooted</p>
                <p>Email Address</p>
                <div className='search_bar_div' style ={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Enter your email address"
                        value={inputEmail}
                        onChange={(e) => setInputStyle(e.target.value)}
                        className="search_bar"
                    />
                </div>

                <p>Password</p>
                <div className='search_bar_div' style ={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Enter your password"
                        value={inputPassword}
                        onChange={(e) => setInputStyle(e.target.value)}
                        className="search_bar"
                    />
                </div>

                <div className='divider'>
                    <span>Login with</span>
                </div>
                <div>
                    <button className="google-icon-btn" onClick={handleGoogleSignIn}>
                        <img
                            src={GoogleImage}
                            alt="Google"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignIn_Page