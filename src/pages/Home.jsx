import React from 'react'
import NavBar from '../components/NavBar'
import ListOfTimes from '../components/ListOfTimes'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      <NavBar />
      <ListOfTimes />
      <Footer />
    </div>
  )
}

export default Home