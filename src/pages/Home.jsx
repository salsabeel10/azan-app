import React from 'react'
import NavBar from '../components/NavBar'
import ListOfTimes from '../components/ListOfTimes'

const Home = () => {
  return (
    <div className="min-h-screen bg-body text-black">
      <NavBar />
      <ListOfTimes />
    </div>
  )
}

export default Home
