import React from 'react'
import "./Dock.css";
import { db } from "../../firebase";
import { ref, set, serverTimestamp, getDatabase, onValue, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext.jsx'
import HomeImage from "./assets/house_blank.png";
import dashbaordImage from "./assets/chart_pie_alt.png";
import chatImage from "./assets/beacon.png"
import settingImage from "./assets/settings_sliders.png"
import locationImage from "./assets/marker.png"
import { House, User, MapPin, SlidersHorizontal, MessageCircle } from "lucide-react";

function Dock2() {
    const navigate = useNavigate()
    return (
        <div className="dock-wrapper">
            <div className="dock">
                <button className="dock-item active" onClick={() => navigate('/')}>
                    <img src={HomeImage} height={20} width={20} />
                    {/* <House size={28} strokeWidth={2.2} /> */}
                </button>

                <div style={{ display: 'flex', gap: '80px' }}>
                    <button className="dock-item" onClick={() => navigate('/user_dashboard')}>
                        <img src={dashbaordImage} height={20} width={20} />
                        {/* <User size={28} strokeWidth={2.2} /> */}
                    </button>

                    <button className="dock-center-btn" onClick={() => navigate('/')}>
                        <img src={chatImage} height={20} width={20} />
                        {/* <MessageCircle size={28} strokeWidth={2.2} /> */}
                    </button>

                    <button className="dock-item" onClick={() => navigate('/findSalon')}>
                        <img src={locationImage} height={20} width={20} />
                        {/* <MapPin size={28} strokeWidth={2.2} /> */}
                    </button>
                </div>
                <button className="dock-item" onClick={() => navigate('/user_dashboard')}>
                    <img src={settingImage} height={20} width={20} />
                    {/* <SlidersHorizontal size={28} strokeWidth={2.2} /> */}
                </button>
            </div>
        </div>
    )
}

export default Dock2