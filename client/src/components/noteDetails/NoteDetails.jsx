import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
export default function NoteDetails({handleNoteDetails,clickedNote,showUpdateBox,fetchAllNotes}) {
    const [title,setTitle] = useState(clickedNote.title)
    const [description,setDescription] = useState(clickedNote.description)
    const token = localStorage.getItem('auth-token')
    const updateNoteInDb = async(e,id) =>{
        handleNoteDetails(e,false)
        const response = await axios.put(`https://notesaver-mern-app.vercel.app/notes/${id}`,{
            title,description },{
                headers:{'auth-token' : token}
            })
        fetchAllNotes(token)
    }
  return (
    <>
    <div className="bigBlurContainer" onClick={(e,)=>handleNoteDetails(e,false)}>
            <div className={`addNoteContainer`} onClick={e=>e.stopPropagation()}>
                <div className={`innerContainer`}>

                    <div className="titleContainer">
                        <div className="title">Title</div>
                        <input type="text" defaultValue={clickedNote.title} onChange={e=>setTitle(e.target.value)}/>
                    </div>
                    <div className="descriptionContainer">
                        <div className="description">Description</div>
                        <textarea name="" id="" cols="30" rows="10" defaultValue={clickedNote.description} onChange={e=>setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="buttonContainer">
                        {showUpdateBox ? <button onClick={(e)=>updateNoteInDb(e,clickedNote._id)}>update</button> : <div></div>}
                        <button onClick={(e)=>handleNoteDetails(e,false)}>CLOSE</button>
                    </div>
                </div>
            </div>
            </div>
        </>
  )
}
