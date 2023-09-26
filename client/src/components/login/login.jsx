import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setNotesToStore, setUser } from '../../redux/userSlice'

export default function Login({ handleLogin, handleSignupForm, handleIsUser, handleLoading }) {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)



  const handleSubmit = async () => {
    handleLogin(false)

    // const token = localStorage.getItem('auth-token')

    // *********** if token is available ********
    // if (token) {
    //   console.log({ msg: "token was available" });
    //   const response = await axios.post('/user/login', {
    //     email, password
    //   }, { headers: { "auth-token": token } })
    //   dispatch(setUser(response.data[0]))
    //   handleIsUser(true)
    //   console.log({ msg: "token was available", user: response.data[0] });

    //   //fetching notes
    //   const res = await axios.get('/notes/', {
    //     headers: { 'auth-token': token }
    //   })
    //   dispatch(setNotesToStore(res.data))
    //   handleLoading(false)
    // } 


    console.log({ msg: "token was not available" });
    if(email.length ===0 || password.length === 0){
        console.log('you have not enter email or password');
        return;
    }
    //********* if token is not available ************
    const response = await axios.post('/user/login', {
      email, password
    })

    console.log({ msg: "token was not available", response });
    if (response?.data?.authToken) {

      localStorage.setItem('auth-token', response.data.authToken)
      //fetching notes again
      handleLoading(true)
      const res = await axios.get('/notes/', {
        headers: { 'auth-token': response.data.authToken }
      })
      dispatch(setNotesToStore(res.data))
      handleIsUser(true)
      handleLoading(false)
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
