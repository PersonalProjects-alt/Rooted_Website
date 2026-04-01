import { React, useState, useEffect, use } from 'react'
import Stepper, { Step } from './react_bits/stepper';
import { AnimatePresence, motion } from "motion/react"
import { UserAuth } from '../../../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import { ref, set, serverTimestamp } from "firebase/database";



function survey_stepper() {
  const { user, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const signInbtn = async () => {
    navigate('/SignIn_Page');
  }

  const [step, setStep] = useState(1);
  const [hairType, setHairType] = useState(null);
  const [porosity, setPorosity] = useState(null);
  const [lifestyle, setLifestyle] = useState(null);
  const [goals, setGoals] = useState([]);
  const [washTime, setWashTime] = useState(null);
  const [washFrequency, setWashFrequency] = useState(null);

  const canProceed = () => {
    if (step === 1) return hairType != null
    if (step === 2) return porosity != null
    if (step === 3) return lifestyle != null
    if (step === 4) return goals.length > 0
    if (step === 5) return washTime != null
    if (step === 6) return washFrequency != null
    return true
  }

  const toggleGoal = (goal) => {
  setGoals((prevGoals) => {
    // remove if already selected
    if (prevGoals.includes(goal)) {
      return prevGoals.filter((g) => g !== goal);
    }

    // stop if already at max
    if (prevGoals.length >= 4) {
      return prevGoals;
    }

    // otherwise add it
    return [...prevGoals, goal];
  });
};

  const sendData = async () => {
    if (!user?.uid) return

    const surveyData = {
      hairType,
      porosity,
      lifestyle,
      goals,
      washTime,
      washFrequency,
      updatedAt: Date.now()
    };

    await set(ref(db, `users/${user.uid}/survey`), surveyData)// writing to user/uid/survey
  }

  return (
    <>
      {user?.displayName ? (
        <div style={{ paddingTop: '100px', marginBottom: '400px' }} >
          <Stepper
            initialStep={1}
            onStepChange={(s) => setStep(s)}
            onFinalStepCompleted={async () => {
              try {
                await sendData()
                console.log("Data saved")
                navigate('/user_dashboard')
              } catch (e) {
                console.log("Data Saved failed", e)
              }
            }}
            nextButtonProps={{ disabled: !canProceed() }}
            backButtonText="Previous"
            nextButtonText="Next"
          >

            <Step>
              <h2 className='stepper_title' style={{ marginTop: '10px' }}>What's your hair type?</h2>
              <p className='stepper_subtitle'>Select the hair type that best matches your natural texture.</p>
              <div className='stepper_buttons_div'>
                {(['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C', '4A', '4B', '4C']).map((type) => {
                  const selected = hairType === type
                  return (
                    <button
                      key={type}
                      onClick={() => {
                        setHairType(type);
                        console.log("hairtype set to ", type);
                      }}
                      className={`step_choice_btn ${selected ? "selected" : "disabled"}`} style={{ color: 'black', padding: '23px', height: '18px' }}
                    >
                      {type}
                      {hairType === type}
                    </button>
                  )
                })}
              </div>
            </Step>

            <Step>
              <h2 className='stepper_title' style={{ marginTop: '10px' }}>What's your hair porosity?</h2>
              <p className='stepper_subtitle'>Hair porosity affects how your hair absorbs and retains moisture.</p>
              <p style={{ fontWeight: 300, color: '#2d2d2d' }}>Low - Cuticles are tightly closed</p>
              <p style={{ fontWeight: 300, color: '#2d2d2d' }}>Medium - Balanced moisture retention</p>
              <p style={{ fontWeight: 300, color: '#2d2d2d', marginBottom: '30px' }}>High - Cuticles are more open</p>
              <div className='stepper_buttons_div_cols' >
                {(['Low', 'Medium', 'High']).map((level) => {
                  const selected = porosity === level
                  return (
                    <button
                      key={level}
                      onClick={() => {
                        setPorosity(level);
                        console.log("porosity set to ", level);
                      }}
                      className={`step_choice_btn ${selected ? "selected" : "disabled"}`} style={{ padding: '23px', height: '18px' }}
                    >
                      {level}
                      {porosity === level}
                    </button>
                  )
                })}
              </div>
            </Step>

            <Step>
              <h2 className='stepper_title' style={{ marginTop: '10px' }}>What's your lifestyle?</h2>
              <p className='stepper_subtitle'>Help us recommend hairstyles that fit your daily routine.</p>
              <p style={{ fontWeight: 300, color: '#2d2d2d' }}>Low Maintenance - Minimal daily styling</p>
              <p style={{ fontWeight: 300, color: '#2d2d2d' }}>Active - Gym and sports friendly</p>
              <p style={{ fontWeight: 300, color: '#2d2d2d' }}>Flexible - Variety and versatility</p>
              <p style={{ fontWeight: 300, color: '#2d2d2d', marginBottom: '30px' }}>Professional - Office-appropriate styles</p>
              <div className='stepper_buttons_div' >
                {(['Low Maintenance', 'Active', 'Flexible', 'Professional']).map((style) => {
                  const selected = lifestyle === style
                  return (
                    <button
                      key={style}
                      onClick={() => {
                        setLifestyle(style);
                        console.log("set lifestyle to ", style);
                      }}
                      className={`step_choice_btn ${selected ? "selected" : "disabled"}`} style={{ padding: '25px', height: '18px' }}
                    >
                      {style}
                      {lifestyle === style}
                    </button>
                  )

                })}
              </div>
            </Step>

            <Step>
              <h2 className='stepper_title' style={{ marginTop: '10px' }}>What's your goals</h2>
              <p className='stepper_subtitle'>Help us recommend hairstyles that fit your daily routine.</p>
              <div className='stepper_buttons_div' >
                {(['Moisture Retention', 'Length Retention', 'Reduce Breakage', 'Scalp Health', 'Volume', 'Shine', 'Repair Damage']).map((user_goal) => {
                  const selected = goals.includes(user_goal);
                  const maxReached = goals.length >= 4 && !selected; // disable unselected if already 4 selected
                  return (
                    <button
                      key={user_goal}
                      onClick={() => {
                        toggleGoal(user_goal);
                        console.log("set goals to ", user_goal);
                      }}
                      disabled={maxReached}
                      className={`step_choice_btn ${selected ? "selected" : "disabled"}`} style={{ padding: '25px', height: '18px' }}
                    >
                      {user_goal}
                    </button>
                  )

                })}
              </div>
            </Step>

            <Step>
              <h2 className='stepper_title' style={{ marginTop: '10px' }}>How much time do you spend on your hair daily?</h2>
              <p className='stepper_subtitle'>Help us recommend hairstyles that fit your daily routine.</p>
              <div className='stepper_buttons_div' >
                {(['5 - 10 minutes', '15 - 30 minutes', '30+ minutes']).map((user_washTime) => {
                  const selected = washTime === user_washTime
                  return (
                    <button
                      key={user_washTime}
                      onClick={() => {
                        setWashTime(user_washTime);
                        console.log("set wash time to ", user_washTime);
                      }}
                      className={`step_choice_btn ${selected ? "selected" : "disabled"}`} style={{ padding: '25px', height: '18px' }}
                    >
                      {user_washTime}
                      {washTime === user_washTime}
                    </button>
                  )

                })}
              </div>
            </Step>

            <Step>
              <h2 className='stepper_title' style={{ marginTop: '10px' }}>How much often do you wash your hair?</h2>
              <p className='stepper_subtitle'>Help us recommend hairstyles that fit your daily routine.</p>
              <div className='stepper_buttons_div' >
                {(['Weekly', 'Bi-weekly', 'Monthly']).map((user_washFrequency) => {
                  const selected = washFrequency === user_washFrequency
                  return (
                    <button
                      key={user_washFrequency}
                      onClick={() => {
                        setWashFrequency(user_washFrequency);
                        console.log("set wash frquency to ", user_washFrequency);
                      }}
                      className={`step_choice_btn ${selected ? "selected" : "disabled"}`} style={{ padding: '25px', height: '18px' }}
                    >
                      {user_washFrequency}
                      {washFrequency === user_washFrequency}
                    </button>
                  )

                })}
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

export default survey_stepper