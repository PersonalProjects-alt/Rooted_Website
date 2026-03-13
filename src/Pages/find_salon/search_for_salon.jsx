import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { ref, set, serverTimestamp, getDatabase, onValue, get } from "firebase/database";
import { AnimatePresence, motion, observeTimeline } from "motion/react"
import { UserAuth } from '../../context/AuthContext'
import "./styles/find_salon.css"

function search_for_salon() {
    const { user, logOut } = UserAuth();
    const [survey, setSurvey] = useState(null)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [inputLocation, setInputLocation] = useState("");
    const [inputStyle, setInputStyle]  = useState("");
    const [salons, setSalons] = useState([])

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

    const sendInformation = async () => {
        // Here you would typically call an API to get salons based on the input location
        console.log("Searching for salons with style:", inputStyle)
        console.log("Searching for salons near:", inputLocation)

        const token = await user.getIdToken();

        try {
            const res = await fetch("http://localhost:4000/api/salons/search", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    query: inputStyle,
                    location: inputLocation,
                })
            })

            const data = await res.json();
            console.log("Salon search response", data);

            setSalons(data.salons || []);

        } catch(e){
            console.error("Error calling salon search API:", e);
        }
    }


    return (
        <div className='section1_authenticated' style={{ marginBottom: '600px' }}>
            <p className='section1_auth_subtitle'>Find a Salon</p>
            <p style={{ marginTop: '20px' }}>Use Ai to help find a salon fitted to your current survey data:</p>
            {/* <div className='docker_info_box_div'>
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
            </div> */}
            <div className='search_bar_div'>
                <input
                    type="text"
                    placeholder="Search by style (e.g. twist out, braid out)"
                    value={inputStyle}
                    onChange={(e) => setInputStyle(e.target.value)}
                    className="search_bar"
                />
            </div>
            <div className='search_bar_div'>
                <input
                    type="text"
                    placeholder="Search by location"
                    value={inputLocation}
                    onChange={(e) => setInputLocation(e.target.value)}
                    className="search_bar"
                />
            </div>
            <div>
                <button onClick={sendInformation} className='search_button'>Search</button>
            </div>

            <div style={{marginTop:'20px'}}>
                {salons.map((salon, index) => (
                    <div key ={index} className='salon_result_card'>
                        <img src={salon.imageUrl} className='salon_images' onError={(e) => {
                            e.currentTarget.style.display = "none"
                        }}/>
                        <p><strong>Name:</strong> {salon.name}</p>
                        <p><strong>Address:</strong> {salon.address}</p>
                        <p><strong>Phone:</strong> {salon.phone}</p>
                    </div>
                )
            )}
            </div>
        </div>
    )
}

export default search_for_salon