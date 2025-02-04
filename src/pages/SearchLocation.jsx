import React from 'react'
import NavBar from '../components/NavBar'
import InputField from '../components/InputField'
import RadioButtons from '../components/RadioButtons'
import AutoLocation from '../components/AutoLocation'
import usePrayerTimeStore from '../store/usePrayerTimeStore'

const SearchLocation = () => {
  const {locationType} = usePrayerTimeStore()
  return (
    <div className="bg-[#1A1A1D] min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center gap-5">
        {/* Wrap InputField & RadioButtons */}
        {locationType === 'manual' ? <InputField /> : <AutoLocation />}
        <RadioButtons />
      </div>
    </div>
  )
}

export default SearchLocation
