import {React, useState, useEffect} from 'react'
import Stepper, { Step } from './Stepper';
import { AnimatePresence, motion } from "motion/react"
import { UserAuth } from '../../../context/AuthContext'
import { useNavigate } from "react-router-dom";



function survbey_stepper() {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate()

    const signInbtn = async () => {
      navigate('/SignIn_Page');
    }

    const [step, setStep] = useState(1);
    const [hairType, setHairType] = useState(null);
    const [porosity, setPorosity] = useState(null);
    const [lifestyle, setLifestyle] = useState(null);

    return (
    <>
    {user?.displayName ? (
        <div style={{paddingTop:'100px', marginBottom:'400px'}} >
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => console.log("All steps completed!")}
          backButtonText="Previous"
          nextButtonText="Next"
        >
          <Step>
            <h2 className='stepper_title' style={{marginTop:'10px'}}>What's your hair type?</h2>
            <p>Select the hair type that best matches your natural texture.</p>
            <div className='stepper_buttons_div'>
              {(['3A', '3B', '3C', '4A', '4B', '4C']).map((type) => (
                <button
                onClick={() => setHairType(type)}
                className='begin_journey_button' style={{borderRadius:'20px', backgroundColor: '#f8f8f8', border: '1px solid #cfcfcf', color: 'black', padding:'23px', height:'18px'}}
                >
                  {type}
                </button>
              ))}
            </div>
          </Step>

          <Step>
            <h2 className='stepper_title' style={{marginTop:'10px'}}>What's your hair porosity?</h2>
            <p>Hair porosity affects how your hair absorbs and retains moisture.</p>
            <p style={{fontWeight: 300, color:'#2d2d2d'}}>Low - Cuticles are tightly closed</p>
            <p style={{fontWeight: 300, color:'#2d2d2d'}}>Medium - Balanced moisture retention</p>
            <p style={{fontWeight: 300, color:'#2d2d2d', marginBottom: '30px'}}>High - Cuticles are more open</p>
            <div className='stepper_buttons_div_cols' >
              {(['Low', 'Medium', 'High']).map((type) => (
                
                <button
                onClick={() => setHairType(type)}
                className='begin_journey_button' style={{borderRadius:'20px', backgroundColor: '#f8f8f8', border: '1px solid #cfcfcf', color: 'black', padding:'23px', height:'18px'}}
                >
                  {type}
                </button>
              ))}
            </div>
          </Step>


          <Step>
            <h2 className='stepper_title' style={{marginTop:'10px'}}>What's your lifestyle?</h2>
            <p>Help us recommend hairstyles that fit your daily routine.</p>
            <p style={{fontWeight: 300, color:'#2d2d2d'}}>Low Maintenance - Minimal daily styling</p>
            <p style={{fontWeight: 300, color:'#2d2d2d'}}>Active - Gym and sports friendly</p>
            <p style={{fontWeight: 300, color:'#2d2d2d'}}>Flexible - Variety and versatility</p>
            <p style={{fontWeight: 300, color:'#2d2d2d', marginBottom: '30px'}}>Professional - Office-appropriate styles</p>
            <div className='stepper_buttons_div' >
              {(['Low Maintenance', 'Active', 'Flexible', 'Professional']).map((type) => (
                
                <button
                onClick={() => setHairType(type)}
                className='begin_journey_button' style={{borderRadius:'20px', backgroundColor: '#f8f8f8', border: '1px solid #cfcfcf', color: 'black', padding:'25px', height:'18px'}}
                >
                  {type}
                </button>
              ))}
            </div>
          </Step>

        </Stepper>
        </div>
    ) : (
        <div className='section1_unauthenticated'>
          <div className='unauthenticted_box'>
            <p className='unauthenticated_header'>Welcome to Rooted</p>
            <p className='unauthenticated_subtitle'>Please sign in to access your personalized dashboard and hair journey.</p>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
              <button className='unauthenticated_btn' onClick={signInbtn}>Sign In</button>
            </div>

          </div>
        </div>
    )}
    
    </>
    )
}

export default survbey_stepper