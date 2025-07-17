import React from 'react'
import NavBar from '../components/NavBar'
import InputField from '../components/InputField'
import RadioButtons from '../components/RadioButtons'
import AutoLocation from '../components/AutoLocation'
import usePrayerTimeStore from '../store/usePrayerTimeStore'
import Footer from '../components/Footer'

const SearchLocation = () => {
  const {locationType} = usePrayerTimeStore()
  return (
    <div className="flex flex-col bg-base-100 min-h-screen">
      <NavBar />

      <main className='flex-grow'>
      <div className="flex flex-col items-center gap-5">
        {/* Wrap InputField & RadioButtons */}
        {locationType === 'manual' ? <InputField /> : <AutoLocation />}
        <RadioButtons />
      </div>
      </main>
      <Footer />

    </div>
  )
}

export default SearchLocation
