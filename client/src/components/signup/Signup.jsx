import React, { useState } from 'react'
import './style.css'
import axios from 'axios'

export default function Signup({ handleSignup, handleLoginForm, setIsUser,login }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const createUserInDb = async () => {
    handleSignup(false)
    const response = await axios.post('https://notesaver-mern-app.vercel.app/user/signup', {
      firstName,
      lastName,
      email,
      password
    })

    if (response.data.authToken) {
      setIsUser(true)
      const token = response.data.authToken
      localStorage.setItem('auth-token', token)
      login(token)
    }

  }
  return (
    <>
      <div className="bigBlurContainer">
        <div className={`signupContainer `}>
          <div className={`innerContainer`}>
            <div className="signupHeading">
              Signup Here!
            </div>
            <div className="nameContainer">
              <div className="name">First Name</div>
              <input type="text" onChange={e => setFirstName(e.target.value)} />
            </div>
            <div className="nameContainer">
              <div className="name" >Last Name</div>
              <input type="text" onChange={e => setLastName(e.target.value)} />
            </div>
            <div className="emailContainer">
              <div className="email" >Email</div>
              <input type="text" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="passwordContainer">
              <div className="password">Password</div>
              <input type="text" onChange={e => setPassword(e.target.value)} />
              <div className="password cp">Confirm Password</div>
              <input type="text" />
            </div>
            <div className="buttonContainer">
              <button onClick={createUserInDb}>SUBMIT</button>
              <button onClick={() => handleSignup(false)}>CLOSE</button>
            </div>
            <div className="haveAccount">
              Have already an account <span onClick={handleLoginForm}>click here.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
