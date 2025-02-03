import React from 'react'
import NavBar from '../components/NavBar'
import InputField from '../components/InputField'
import FindCoordinates from '../components/FindCoordinates'

const SearchLocation = () => {
  return (
    <div className="bg-[#1A1A1D] min-h-screen">
      <NavBar />
      <InputField />
      <FindCoordinates />
    </div>
  )
}

export default SearchLocation
