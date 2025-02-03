import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import InputField from './components/InputField'
import ListOfTimes from './components/ListOfTimes'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import SearchLocation from './pages/SearchLocation'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchLocation />} />
      </Routes>
    </Router>
  )
}

export default App
