import React from 'react'
import './style.css'
export default function Notify({message}) {
    return (
        <>
        <div className="notifyWrapper">
            <div className="notificationContainer">
                    <div className="upper">
                        {message }
                    </div>
                    <div className="lower"></div>
            </div>
        </div>
        </>
    )
}
