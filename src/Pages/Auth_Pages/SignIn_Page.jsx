import React from 'react'
import './SignInPage.css'
import GoogleButton from 'react-google-button'

function SignIn_Page() {
  return (
    <div className='section1_signIn'>
        <div className='section1_layout_signIn'>
            <p className='header_text'>Sign In</p>  
            <GoogleButton className='google_btn'/>
        </div>
    </div>
  )
}

export default SignIn_Page