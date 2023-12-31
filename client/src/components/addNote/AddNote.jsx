import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setNotesToStore } from '../../redux/userSlice'

export default function AddNote({handleNote,handleNotify}) {
    const dispatch = useDispatch()
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const token = localStorage.getItem('auth-token')

    const addNoteToDb = async() =>{
        handleNote(false)
        if(title.length === 0 ){
            handleNotify('title should not be empty')
             return;
        }
        const response = await axios.post('https://notesaver-mern-app.vercel.app/notes',
        {title,description},
        {headers:{'auth-token': token}})
        console.log({response});
        handleNotify('note created successfully')

        //fetching notes again
        const res = await axios.get('https://notesaver-mern-app.vercel.app/notes', {
            headers: { 'auth-token': token }
        })
        dispatch(setNotesToStore(res.data))
    }
    return (
        <>
        <div className="bigBlurContainer" onClick={()=>handleNote(false)}>
            <div className={`addNoteContainer`} onClick={e=>e.stopPropagation()}>
                <div className={`innerContainer`}>

                    <div className="titleContainer">
                        <div className="title">Title</div>
                        <input type="text" onChange={e=>setTitle(e.target.value)}/>
                    </div>
                    <div className="descriptionContainer">
                        <div className="description">Description</div>
                        <textarea name="" id="" cols="30" rows="10"  onChange={e=>setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="buttonContainer">
                        <button onClick={addNoteToDb}>ADD NOTE</button>
                        <button onClick={()=>handleNote(false)}>CLOSE</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
