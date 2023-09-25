import React, { useEffect, useState } from 'react'
import './style.css'
import Profile from '../profile/Profile'
import AddNote from '../addNote/AddNote'
import Login from '../login/login'
import Signup from '../signup/Signup'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setNotesToStore, setUser } from '../../redux/userSlice'
import Spinner from '../spinner/Spinner'
import NoteDetails from '../noteDetails/NoteDetails'

export default function Home() {
    const [showProfile, setShowProfile] = useState(false)
    const [showAddNote, setShowAddNote] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)
    const [showNoteDetails, setShowNoteDetails] = useState(false)
    const [showUpdateBox, setShowUpdateBox] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [clickedNote, setClickedNote] = useState(null)
    const token = localStorage.getItem('auth-token')
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const notes = useSelector(state => state.user.notes)

    const login = async (token) => {
        if (token) {
            const response = await axios.post('http://localhost:8080/user/login', {}, { headers: { "auth-token": token } })
            dispatch(setUser(response.data[0]))
            // console.log({msg: "token was available" ,user:response});
            setIsUser(true)
        }
    }

    const fetchAllNotes = async (token) => {
        if (token) {
            const response = await axios.get('http://localhost:8080/notes/', {
                headers: { 'auth-token': token }
            })
            dispatch(setNotesToStore(response.data))
        }

        // console.log({resFromFetchAllNotes:response.data,notes});
    }
    const deleteNoteFromDb = async (e, id) => {
        e.stopPropagation()
        setLoading(true)
        await axios.delete(`http://localhost:8080/notes/${id}`, { headers: { "auth-token": token } })
        fetchAllNotes(token)
        setLoading(false)

    }
    const handleNote = (boolean) => {
        setShowAddNote(boolean)
    }
    const handleNoteDetails = (e, boolean) => {
        setShowNoteDetails(boolean)
    }
    const handleUpdateBox = (e, boolean, note) => {
        e.stopPropagation()
        setClickedNote(note)
        setShowUpdateBox(boolean)
    }
    const handleSetShowAddNote = () => {
        scroll({
            top: 0,
            behavior: "smooth",
        })
        setShowAddNote(!showAddNote)
    }
    const handleLogin = (boolean) => {
        setShowLogin(boolean)
    }
    const handleSignup = (boolean) => {
        
        setShowSignup(boolean)

    }
    const handleSignupForm = () => {
        setShowLogin(false)
        setShowSignup(true)
    }
    const handleLoginForm = () => {
        setShowLogin(true)
        setShowSignup(false)
    }
    const handleIsUser = (boolean) => {
        setIsUser(boolean)
    }
    const handleLogout = () => {
        localStorage.removeItem('auth-token')
        setIsUser(false)
        setShowProfile(false)
        dispatch(setNotesToStore([]))
    }
    const handleCloseProfileBox = () => {
        setShowProfile(false)
    }
    const handleLoading = (boolean) => {
        setLoading(boolean)
    }
    const handleShowNoteDetails = (note) => {
        setClickedNote(note)
        setShowNoteDetails(true)
        console.log({ note });
    }
    useEffect(() => {
        login(token)
        fetchAllNotes(token)
    }, [token])
    return (
        <div className='container'>
            <nav className='nav'>
                <ul className='heading'>
                    <li className='li1'>Note</li>
                    <li className='li2'>saver</li>
                    <li className='li3'>.</li>
                </ul>
                <ul className='links'>
                    <li>home</li>
                    <li>about</li>
                    <li>contact</li>
                    {isUser ? <li className='profile' onClick={() => setShowProfile(!showProfile)}><span>{user?.firstName?.toUpperCase().slice(0, 1)}</span></li> : <li className='login' onClick={() => setShowLogin(true)}><button>Login</button></li>}
                </ul>
                <div className="menuIcon" onClick={()=>setShowProfile(!showProfile)}><i className="fa-solid fa-bars menuIcon" style={{color:"white"}}></i></div>
                {<Profile showProfile={showProfile}
                handleLogout={handleLogout}
                handleCloseProfileBox={handleCloseProfileBox}
                fetchAllNotes={fetchAllNotes}
                isUser={isUser}
                setShowLogin={setShowLogin}
            />}
                </nav>
                <div className="middleSection">
                <div className="left">
                    <div><span className='enjoy'>Enjoy </span><span className='your'>Your </span><span className='notes1'>Notes </span></div>
                    <div><span className='and'>& </span><span className='make'>Make </span><span className='your'>Your </span><span className='notes2'>Notes </span></div>
                    <div><span className='with'>With </span><span className='online'>Online </span><span className='notesSaver'>Notesaver</span><span className='dot'>.</span></div>
                    <div><span className='your'>Your </span><span className='previous'>Previous </span><span className='work'>Work </span><span className='is'>Is </span><span className='here'>Here </span><span className='dot'>.</span></div>

                </div>
                <div className="right">
                    <div className="btnContainer">
                        <div className="addNoteBtn" onClick={handleSetShowAddNote}>ADD NOTE+</div>
                        <div className="addNoteText">If You want to create A Note Then &nbsp;<div className='clickHere' onClick={handleSetShowAddNote}> Click Here</div>.
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom">
                {loading ? <Spinner /> : notes.length !== 0 ? notes.map((note, index) => {
                    return (
                        <div className="noteContainer" key={index} onClick={() => handleShowNoteDetails(note)}>
                            <div className="noteTitle">{note?.title?.toUpperCase()}</div>
                            <div className="noteDescription">{note.description}</div>
                            <div className="buttons">
                                <button className='update' onClick={(e) => handleUpdateBox(e, true, note)}>Update</button>
                                <button className='delete' onClick={(e) => deleteNoteFromDb(e, note._id)}>Delete</button>
                            </div>
                        </div>
                    )
                }) : <><div className="skContainer">
                    <div className="noteContainerSk"></div>
                    <div className="noteContainerSk"></div>
                    <div className="noteContainerSk"></div>
                    <div className="noteContainerSk"></div>
                </div></>
                }
            </div>
            {/*<Profile showProfile={showProfile}
                handleLogout={handleLogout}
                handleCloseProfileBox={handleCloseProfileBox}
                fetchAllNotes={fetchAllNotes}
                isUser={isUser}
            />*/}
            {
                showAddNote && <div className="addNoteHere">
                    <AddNote handleNote={handleNote}
                        handleLoading={handleLoading}
                    />
                </div>
            }
            {
                showNoteDetails && <div className="showNoteDetailsHere">
                    <NoteDetails
                        handleNoteDetails={handleNoteDetails}
                        clickedNote={clickedNote}
                    />
                </div>
            }
            {
                showUpdateBox && <div className="showNoteDetailsHere">
                    <NoteDetails
                        handleNoteDetails={handleUpdateBox}
                        clickedNote={clickedNote}
                        showUpdateBox={showUpdateBox}
                        fetchAllNotes={fetchAllNotes}
                    />
                </div>
            }
            {
                showLogin && <div className="loginHere">
                    <Login
                        handleLogin={handleLogin}
                        handleSignupForm={handleSignupForm}
                        handleIsUser={handleIsUser}
                        handleLoading={handleLoading}
                    />
                </div>
            }
            {
                showSignup && <div className="signupHere">
                    <Signup
                        handleSignup={handleSignup}
                        handleLoginForm={handleLoginForm}
                        handleLoading={handleLoading}
                        setIsUser={setIsUser}
                        login={login}
                    />
                </div>
            }
        </div>

    )
}
