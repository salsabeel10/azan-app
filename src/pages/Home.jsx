import React from 'react'
import NavBar from '../components/NavBar'
import ListOfTimes from '../components/ListOfTimes'


const Home = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      <NavBar />
      <ListOfTimes />
    </div>
  )
}

export default Home