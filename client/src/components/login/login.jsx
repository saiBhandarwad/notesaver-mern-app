import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setNotesToStore, setUser } from '../../redux/userSlice'

export default function Login({ handleLogin, handleSignupForm, handleIsUser, handleLoading,handleNotify }) {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)



  const handleSubmit = async () => {

    handleLogin(false)
    console.log({ msg: "token was not available" });
    if(email.length ===0 || password.length === 0){
        handleNotify('you have not enter email or password');

        return;
    }
    //********* if token is not available ************
    const response = await axios.post('https://notesaver-mern-app.vercel.app/user/login', {
      email, password
    })

    console.log({ msg: "token was not available", response });
    if (response?.data?.authToken) {
      handleNotify('login successful')
      localStorage.setItem('auth-token', response.data.authToken)
      //fetching notes again
      handleLoading(true)
      const res = await axios.get('https://notesaver-mern-app.vercel.app/notes', {
        headers: { 'auth-token': response.data.authToken }
      })
      dispatch(setNotesToStore(res.data))
      handleIsUser(true)
      handleLoading(false)
    }else{
      handleNotify('please login using valid credentials')
    }
  }
  return (
    <>
      <div className="bigBlurContainer">
        <div className={`loginContainer`}>
          <div className={`innerContainer`}>
            <div className="loginHeading">
              Login Here!
            </div>
            <div className="emailContainer">
              <div className="email">Email</div>
              <input type="text" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="passwordContainer">
              <div className="password">Password</div>
              <input className='emailInput' type="text" onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="buttonContainer">
              <button onClick={handleSubmit}>SUBMIT</button>
              <button onClick={() => handleLogin(false)}>CLOSE</button>
            </div>
            <div className="haveAccount">
              Not have already an account <span onClick={() => handleSignupForm()}>click here.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
