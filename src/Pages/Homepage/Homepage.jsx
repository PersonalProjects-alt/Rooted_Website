import { useState } from 'react'
import './Homepage.css'
import './HomepageSection2.css'
import './HomepageSection3.css'
import "@fontsource-variable/montserrat"; // Defaults to wght axis
import "@fontsource-variable/montserrat/wght.css"; // Specify axis
import "@fontsource-variable/montserrat/wght-italic.css"; // Specify axis and style
import Header from '../../ui/header.jsx'
import heroImage from '../../assets/HomepageImg2.png'
import leafIcon from "../../assets/leaf.png";
import windIcon from "../../assets/wind.png";
import sunIcon from "../../assets/sunny_day.png";
import curatedStyle1  from "../../assets/curatedstyle1.png"
import curatedStyle2  from "../../assets/curatedstyle2.png"
import curatedStyle3  from "../../assets/curatedstyle3.png"

import { AnimatePresence, motion } from "motion/react"

const RootedKeyPoints = [
  { image: leafIcon, title: "Natural", desc: "Celebrating the inherent beauty of type 3-4 textures." }, 
  { image: windIcon, title: "Breathable", desc: "Routines that allow your hair and scalp to thrive." }, 
  { image: sunIcon, title: "Radiant", desc: "Confidence rooted in deep understanding and care." }, 

]

const CuratedStyles = [
  {image: curatedStyle1, title: "Protective Braids", desc: "Low Maintenance" },
  {image: curatedStyle2, title: "Natural Coil Definition", desc: "Daily Care" },
  {image: curatedStyle3, title: "Twists Outs", desc: "Volume & Definition" },
]

function App() {
  return (
    <div> 
      <Header />
      <div className='section1'>
        <div className='homepage_hero_div'>
          <div className='text_title_div'>
            <p className='title_text1'>Rooted in</p>
            <p className='title_text2'>Knowledge</p>
            <p className='title_description'>A sanctuary for type 3–4 hair. Discover personalized guidance, expert education, and a supportive community.</p>
            <div className='begin_journey_div'>
              <button className='begin_journey_button'>Begin Journey</button>
              <button className='begin_journey_button' style={{backgroundColor: 'transparent',  color: '#6ea2e0',  border: "1px solid rgba(0,0,0,0.18)" }}>Explore Gallery</button>
            </div>
          </div>
          <div className="hero_card">
            <img className= 'hero_image' src={heroImage} width={400} height={400}/>
          </div>
        </div>
      </div>

      <div className='section2'>
        <div className='section_layout'>
          <div className='section_title_div'>
            <p className='section2_title'>The Zen of Rooted</p>
            <p className='section2_description'>We believe in disciplined minimalism. Removing the noise to focus on what truly matters: the health and beauty of your natural texture.</p>
          </div>

          <div className='zen_grid'>
            {RootedKeyPoints.map((item, index) => (
              <motion.div
                key={index}
                className="zen_card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              >
                <div className="zen_icon_wrap">
                  <img src={item.image} alt={item.title} className="zen_icon" />
                </div>

                <p className="zen_title">{item.title}</p>
                <p className="zen_desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className='section3'>
        <div className='section_layout'>
          
        </div>
      </div>
    </div>
  )
}

export default App
