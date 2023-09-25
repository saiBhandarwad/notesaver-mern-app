import React from 'react'
import './style.css'

export default function Spinner() {
    return (
        <>
            <div className="spinnerContainer">
                <div className="loader"></div>
                <div className="spinnerText">Please Wait! Your Notes Are Fetching...</div>
            </div>
        </>

    )
}
