import React from 'react'
import './AI_infoPageSection1.css'
import "@fontsource-variable/montserrat";
import "@fontsource-variable/montserrat/wght.css";
import "@fontsource-variable/montserrat/wght-italic.css";

import ai_image from '../../assets/ai_image.png'
import filter from '../../assets/filter_image.png'
import book from '../../assets/book_image.png'

import { AnimatePresence, motion } from "motion/react"

const info_points = [
    { image: ai_image, title: "Intelligent Suggestions", desc: "Our platform's AI analyzes user data to recommend tailored hairstyles, tutorials, and guides, ensuring each user feels understood and supported.", backgroundColor: '#ff7744' },
    { image: filter, title: "Content Filtering", desc: "The AI efficiently filters and ranks content based on user preferences, enhancing the discovery process and improving user engagement over time.", backgroundColor: '#998c85' },
    { image: book, title: "Educational Resources", desc: "Our hair education section offers comprehensive guides on key topics, including porosity, routines, and protective styling, fostering a friendly and supportive community.", backgroundColor: '#719276' }
]

const steps = [
    { num: 1, title: "Analyze", desc: "Your preferences and hair profile" },
    { num: 2, title: "Learn", desc: "From your interactions and feedback" },
    { num: 3, title: "Recommend", desc: "Personalized hairstyles and guides" },
    { num: 4, title: "Improve", desc: "Continuously enhance suggestions" },
]

function AI_infoPage() {
    return (
        <>
            <div className='section1_Ai'>
                <div className='section1_header_div'>
                    <p className='section1_header'>AI-Powered Recommendations</p>
                    <p className='section1_subtitle'>Personalized guidance and intelligent content discovery tailored to your unique hair journey</p>
                </div>
                <div className='box_styles_row'>
                    {info_points.map((item, index) => {
                        return (
                            <motion.div 
                            className="style_card" 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                            >
                            <div className='box' style={{ backgroundColor: item.backgroundColor }}>
                                <img src={item.image} width={40} height={40} className='box_image' />
                                <p className='box_title'>{item.title}</p>
                                <p className='box_desc'>{item.desc}</p>
                            </div>
                        </motion.div>
                        )
                    })}
                </div>
            </div>

            <div className='section2_Ai'>
                <div style={{marginLeft: '30px', marginRight: '30px', paddingBottom: '70px'}}>
                    <div className='section1_header_div'>
                        <p className='section2_header'>How Our AI Works</p>
                        <p className='section1_subtitle'>A seamless process designed to understand your needs and deliver the best recommendations</p>
                    </div>
                    <div className='steps_styles_row'>
                        {steps.map((item, index) => {
                            return (
                                <motion.div 
                                className="style_card" 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                                >

                                <div className='box_steps'>
                                    <p className='box_num_style'>{item.num}</p>
                                    <p className='box_title_style'>{item.title}</p>
                                    <p className='box_desc_style'>{item.desc}</p>
                                </div>
                                </motion.div>
                            )
                        })}

                    </div>
                </div>
            </div>

            <div className='section3_Ai'>
                <div style={{marginLeft: '30px', marginRight: '30px', paddingBottom: '70px'}}>
                    <div className='section1_header_div'>
                        <p className='section3_header'>Ready to Discover Your Perfect Hairstyle?</p>
                        <p className='section3_subtitle'>Let our AI guide you to personalized hairstyles, tutorials, and educational resources tailored just for you.</p>
                    </div>
                    <button className='get_started_button_Ai'>Get Started</button>
                </div>
            </div>
        </>
    )
}

export default AI_infoPage