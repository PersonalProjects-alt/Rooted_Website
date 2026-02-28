import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { ref, set, serverTimestamp, getDatabase, onValue, get } from "firebase/database";
import { AnimatePresence, motion } from "motion/react"
import { UserAuth } from '../../context/AuthContext'
import "./styles/find_salon.css"

function search_for_salon() {
    const { user, logOut } = UserAuth();
    const [survey, setSurvey] = useState(null)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [input, setInput] = useState("");

    //use effect runs after component loads
    useEffect(() => {
        if (!user?.uid) {
            setSurvey(null);
            setLoading(false);
            return;
        }

        setLoading(true);

        const surveyRef = ref(db, `users/${user.uid}/survey`);

        const unsubscribe = onValue(
            surveyRef,
            (snap) => {
                if (snap.exists()) {
                    setSurvey(snap.val());
                } else {
                    setSurvey(null);
                }
                setLoading(false);
            },
            (err) => {
                console.error("Failed to listen to survey:", err);
                setLoading(false);
            }
        );

        // cleanup listener when component unmounts
        return () => unsubscribe();
    }, [user?.uid]);


    return (
        <div className='section1_authenticated'>
            <p className='section1_auth_subtitle'>Find a Salon</p>
            <p style={{ marginTop: '20px' }}>Use Ai to help find a salon fitted to your current survey data:</p>
            <div className='docker_info_box_div'>
                <div className='docker_info_box'>
                    <p className='info_header'>Your Hair Type:</p>
                    <p className='info_stats_docker'>{survey?.hairType}</p>
                </div>
                <div className='docker_info_box'>
                    <p className='info_header'>Your Hair Porosity:</p>
                    <p className='info_stats_docker'>{survey?.porosity}</p>
                </div>
                <div className='docker_info_box'>
                    <p className='info_header'>Your Hair Type:</p>
                    <p className='info_stats_docker'>{survey?.lifestyle}</p>
                </div>
                <div className='docker_info_box'>
                    <p className='info_header'>Goals:</p>
                    <p className='info_stats_docker'>{survey?.goals}</p>
                </div>
                <div className='docker_info_box'>
                    <p className='info_header'>Wash Time:</p>
                    <p className='info_stats_docker'>{survey?.washTime}</p>
                </div>
                <div className='docker_info_box'>
                    <p className='info_header'>Wash Frequency:</p>
                    <p className='info_stats_docker'>{survey?.washFrequency}</p>
                </div>
            </div>
            <div className='search_bar_div'>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    className="search_bar"
                />

            </div>
        </div>
    )
}

export default search_for_salon