import React from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Profile({showProfile,handleLogout,handleCloseProfileBox,fetchAllNotes, isUser,setShowLogin}) {
  const user = useSelector(state=>state.user.user)
  const token = localStorage.getItem('auth-token')

  const handleLogin = () =>{
    setShowLogin(true)
    handleCloseProfileBox()
  }
  const deleteAllNotes = async() =>{
      const confirmed = confirm('do you want to delete all your notes press "OK" for "YES" else press "CLOSE" for "NO"')
      if(!confirmed){
        return;
      }
      const response = await axios.delete('/notes/all',{
        headers:{'auth-token':token}
      }) 
      fetchAllNotes(token)
  }
  return (
    <div className={`${showProfile ? 'show' : 'hide'}  profileContainer ` }>
      <div className="content">
      <div className="close" ><span onClick={handleCloseProfileBox}>close</span></div>
      {isUser ? <>
        <div className="name">{user?.firstName || '....'} {user?.lastName}</div>
        <div className="name">{user?.email || '....'}</div>
        <div className="name">Update Account</div>
        <div className="name">Delete Account</div>
        <div className="name" onClick={()=>deleteAllNotes()}>Delete All Notes</div>
        <div className="name" onClick={handleLogout}>Log out</div>
        </>:<>
        <div className="name">HOME</div>
        <div className="name">ABOUT</div>
        <div className="name">CONTACT</div>
        <div className="name" onClick={handleLogin}>LOG IN</div>
        </>
      }
    </div>
    </div>
  )
}

