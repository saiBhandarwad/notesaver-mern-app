import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login/login'
import Signup from './components/signup/Signup'
import AddNote from './components/addNote/AddNote'


function App() {

  return (
    <div className='appContainer'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/addnote' element={<AddNote />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
