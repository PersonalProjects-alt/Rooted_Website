import React, { use, useEffect, useState } from 'react'
import userImage from "./asset/user.png"
import notificationImage from "./asset/notification_img.png"
import lock from "./asset/lock.png"
import arrow from "./asset/arrow_right.png"
import "./settings.css"
import { AnimatePresence, motion } from "motion/react"
import logout from "./asset/user-logout.png"
import LoggedOutComponent from '../../ui/loggedOutComponent/loggedOutComponent'
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import LoadingComponent from '../../ui/loadingComponent/loadingComponent'

function settings() {

    const settingComponents = [
        { icon: userImage, title: "Account" },
        { icon: notificationImage, title: "Notifications" },
        { icon: lock, title: "Privacy and Security" },
        { icon: userImage, title: "About" },
    ]
    const { user, logOut } = UserAuth();
    const [loading, setLoading] = useState(true);

    const handleSignOut = async () => {
        try {
            await logOut();
            navigate('/')
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }


    // if (loading && user) {
    //     return (
    //         <LoadingComponent />
    //     )
    // }

    if (!user ) {
        return (
            <LoggedOutComponent />
        )
    }

    return (
        <div className='section1_authenticated'>
            <p className='section1_auth_subtitle'>Settings</p>
            {settingComponents.map((item, index) => (
                <div className='settingTabDivParent'>
                    <motion.button
                        className='settingTabDiv'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                    >
                        <div className='settingTabDivChild'>
                            <img src={item.icon} width={20} height={20} />
                            <p>{item.title}</p>
                        </div>
                        <img src={arrow} width={20} height={20} />
                    </motion.button >
                </div>

            ))}

            <motion.button
                style={{ marginTop: '50px' }}
                className='settingTabDiv'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                onClick={handleSignOut}
            >
                <div className='settingTabDivChild'>
                    <img src={logout} width={20} height={20} />
                    <p>Logout</p>
                </div>
                <img src={arrow} width={20} height={20} />
            </motion.button >
        </div>
    )
}

export default settings