import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { ref, set, serverTimestamp, getDatabase, onValue, get, child } from "firebase/database";
import { AnimatePresence, motion, observeTimeline } from "motion/react"
import { UserAuth } from '../../context/AuthContext'
import "./styles/find_salon.css"
import { StarRating } from '@danielgtmn/react-star-rating';
import fallback_image from "./assets/fallback_image.jpg"

import LoadingComponent from '../../ui/loadingComponent/loadingComponent'
import LoggedOutComponent from '../../ui/loggedOutComponent/loggedOutComponent'

function search_for_salon() {
    const { user, logOut } = UserAuth();
    const [survey, setSurvey] = useState(null)
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [recentSearch, setRecentSearch] = useState([]);
    const navigate = useNavigate()
    const [inputLocation, setInputLocation] = useState("");
    const [inputStyle, setInputStyle] = useState("");
    const [salons, setSalons] = useState([])

    const dummyInfo = [
        {
            name: "Curl Up Salon",
            image: fallback_image,
            rating: 4.5,
            reviewsCount: 120,
            street: "123 Main St New York",
        },
        {
            name: "New Salon",
            image: fallback_image,
            rating: 4.5,
            reviewsCount: 120,
            street: "123 Main St New York",
        },
        {
            name: "Brand New Salon",
            image: fallback_image,
            rating: 4.5,
            reviewsCount: 120,
            street: "123 Main St New York",
        }
    ]

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
        if (!user?.uid) return
        // Here you would typically call an API to get salons based on the input location
        console.log("Searching for salons with style:", inputStyle)
        console.log("Searching for salons near:", inputLocation)

        const trimedStyle = inputStyle.trim();
        const trimmedLocation = inputLocation.trim();

        if (!trimedStyle || !trimmedLocation) {
            alert("Please enter both a style and location to search for salons.");
            return;
        }

        setSearchLoading(true);

        try {
            //check recent searches first

            const recentRef = ref(db, `users/${user.uid}/recentSearches`);
            const snap = await get(recentRef);

            if (snap.exists()) {
                const data = snap.val();
                const searchesArray = Object.values(data);

                const cachedSearch = searchesArray.find(
                    (item) =>
                        item.query?.toLowerCase() === trimedStyle.toLowerCase() &&
                        item.location?.toLowerCase() === trimmedLocation.toLowerCase()
                );

                if (cachedSearch) {
                    console.log("Using chached search results for", trimedStyle, trimmedLocation);
                    setSalons(cachedSearch.salons || []);
                    setSearchLoading(false);
                    return;
                }
            }

            // if not cached call api
            const token = await user.getIdToken();

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
            const salonsData = data.salons || [];
            setSalons(salonsData);
            await saveRecentSearch(trimedStyle, trimmedLocation, salonsData);


        } catch (e) {
            console.error("Error calling salon search API:", e);
        } finally {
            setSearchLoading(false);
        }

    }

    //save recent searches to  firebase
    const saveRecentSearch = async (query, location, salonsData) => {
        if (!user?.uid) return;

        const recentRef = ref(db, `users/${user.uid}/recentSearches`);
        const snap = await get(recentRef);

        let existingSearches = [];

        if (snap.exists()) {
            const data = snap.val();

            existingSearches = Object.entries(data).map(([id, value]) => ({ id, ...value }));
        }

        //removing duplicates of same search

        existingSearches = existingSearches.filter(
            (item) =>
                !(
                    item.query?.toLowerCase() === query.toLowerCase() &&
                    item.location?.toLowerCase() === location.toLowerCase()
                )
        )

        //add newestSearch to the front

        const updateSearches = [
            {
                id: `search-${Date.now()}`,
                query,
                location,
                salons: salonsData,
                createdAt: Date.now(),
            },
            ...existingSearches
        ].slice(0, 10) //keep only the 3 most recent searches

        //converting the array back to object for firebae
        const objToSave = {}
        updateSearches.forEach((item) => {
            objToSave[item.id] = {
                query: item.query,
                location: item.location,
                salons: item.salons,
                createdAt: item.createdAt,
            }
        })

        await set(recentRef, objToSave);

    }

    useEffect(() => {
        if (!user?.uid) { setRecentSearch([]); return };

        const recentRef = ref(db, `users/${user.uid}/recentSearches`);

        const unsubscribe = onValue(
            recentRef,
            (snap) => {
                if (!snap.exists()) {
                    setRecentSearch([]);
                    return;
                }

                const data = snap.val();

                //convert array to obj

                const searchesArray = Object.entries(data).map(([id, value]) => ({ id, ...value }));

                //newsest search first
                searchesArray.sort((a, b) => b.createdAt - a.createdAt);

                setRecentSearch(searchesArray);
            },
            (err) => {
                console.error("Failed to listen to recent searches:", err);
            }
        );

        return () => unsubscribe();
    }, [user?.uid])


    if (loading && user || !survey) {
        return (
            <LoadingComponent />
        )
    }

    if (!user) {
        return (
            <LoggedOutComponent />
        )
    }
    // 


    return (
        <div className='section1_authenticated' style={{ marginBottom: '50px' }}>
            <p className='section1_auth_subtitle'>Find a Salon</p>
            <p style={{ marginTop: '20px' }}>Search for salons in your area</p>
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

            <div className='recent_search_main_div'>
                <p className='recent_search_text'>Recent Search</p>
                <div className='recent_search_div'>
                    {recentSearch.length > 0 ? (
                        recentSearch.map((item, index) => {
                            const firstSalon = item.salons?.[0]

                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                                    key={item.id}
                                    className='recent_search_card'
                                    onClick={() => {
                                        setInputStyle(item.query || "");
                                        setInputLocation(item.location || "");
                                        setSalons(item.salons || []);
                                    }}
                                    style={{ cursor: "pointer" }}
                                >

                                    <div className='recent_search_salon_images_wrap'>
                                        <img src={firstSalon?.imageUrl || fallback_image} referrerPolicy="no-referrer" className='recent_search_salon_images' />
                                    </div>

                                    <div style={{ padding: '5px', display: 'grid' }}>
                                        <p className='recent_card_label'><strong>Search Term: </strong>{item.query}</p>
                                        <p className='recent_card_label'><strong>Location: </strong>{item.location}</p>
                                    </div>

                                </motion.div>
                            )
                        }
                        )
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            style={{ textAlign: 'center', margin: 'auto' }}
                        >

                            <p className='search_loading' style={{ marginTop: '30px' }}>No recent searches yet</p>
                        </motion.div>
                    )
                    }
                </div>
            </div>

            <div style={{ marginTop: '50px', gap: '20px' }}>
                <p className='recent_search_text' style={{ marginBottom: '40px' }}>Search Results</p>
                {/* <div className='salonCards'>
                    <div className='salon_images'>
                        <img src={fallback_image}
                            // referrerPolicy="no-referrer"
                            className='salon_images' />
                        <div style={{ padding: '20px', display: 'grid', gap: '10px' }}>
                            <p><strong>Name:</strong> Curly Salons</p>
                            <p><strong>Address:</strong> 123 Main St New York</p>
                            <p><strong>Phone:</strong> +44 784569436</p>
                        </div>
                    </div>
                </div> */}

                {/* <div className='salonCards'>
                    <div className='salon_images'>
                        <img src={fallback_image}
                            // referrerPolicy="no-referrer"
                            className='salon_images' />
                        <div style={{ padding: '20px', display: 'grid', gap: '10px' }}>
                            <p><strong>Name:</strong> Curly Salons</p>
                            <p><strong>Address:</strong> 123 Main St New York</p>
                            <p><strong>Phone:</strong> +44 784569436</p>
                        </div>
                    </div>
                </div> */}

                {searchLoading && salons.length <= 0 ? (
                    <motion.div
                        style={{ textAlign: 'center', marginTop: '100px' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                    >
                        <p className='search_loading'>Searching for salons</p>
                    </motion.div>
                ) : salons.length > 0 ? (
                    salons.map((salon, index) => (
                        <motion.div
                            className='salonCards'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}

                        >
                            <div key={index} className='salon_images'>
                                <img src={salon.imageUrl}
                                    referrerPolicy="no-referrer"
                                    className='salon_images' />
                                <div style={{ padding: '20px', display: 'grid', gap: '10px' }}>
                                    <p><strong>Name:</strong> {salon.name}</p>
                                    <p><strong>Address:</strong> {salon.address}</p>
                                    <p><strong>Phone:</strong> {salon.phone}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        style={{ textAlign: 'center', justifySelf: 'center', marginTop: '50px' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <p className='search_loading' style={{ marginBottom: '5px' }}>Looking for something new?</p>
                        <p className='search_loading'>Try searching for a salon</p>
                    </motion.div>
                )

                }

                {/* 
                {salons.map((salon, index) => (
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', maxWidth: '350px', gap: '10px', justifySelf: 'center', marginBottom: '20px' }}>
                        <div key={index} className='salon_images'>
                            <img src={salon.imageUrl}
                                referrerPolicy="no-referrer"
                                className='salon_images' />
                            <p><strong>Name:</strong> {salon.name}</p>
                            <p><strong>Address:</strong> {salon.address}</p>
                            <p><strong>Phone:</strong> {salon.phone}</p>
                        </div>
                    </div>
                )
                )} */}
            </div>
        </div>
    )
}

export default search_for_salon