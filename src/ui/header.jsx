import React from 'react'
import './header.css'

function header() {
    return (
        <div className='navbar'>
            <div className='navbar_child'>
                <p className='Rooted_title'>Rooted</p>
                <button className='login_signin_buttons'>Login</button>
                <button className='login_signin_buttons'>Sign Up</button>
            </div>
        </div>
    )
}

export default header