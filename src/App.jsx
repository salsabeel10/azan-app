import React from 'react'
import InputField from './components/InputField'
import ListOfTimes from './components/ListOfTimes'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className="bg-[#1A1A1D]">
      {/* <InputField /> */}
      <NavBar />
      <ListOfTimes />
    </div>
  )
}

export default App