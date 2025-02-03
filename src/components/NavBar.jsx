import React, { useEffect, useState } from 'react'
import { formattedDate } from '../store/timeFormat'

const NavBar = () => {
    const [currentTime, setCurrentTime] = useState('')

    useEffect(() => {
      // Function to update time every second
      const updateTime = () => {
        const now = new Date()
        const hours = now.getHours() % 12 || 12 // Convert 24-hour to 12-hour format
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM'
        setCurrentTime(`${hours}:${minutes} ${ampm}`)
      }
      updateTime() // Initial call
      const interval = setInterval(updateTime, 1000) // Update time every second
      return () => clearInterval(interval) // Cleanup interval on component unmount
    }, [])

  return (
    <div>
      <div className="navbar shadow-sm border-b border-b-gray-300">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Azan Times</a>
        </div>
        <div className='flex-1 pr-32'>
          <a className="btn btn-ghost text-lg text-center">Al Nahada, Sharjah</a>
        </div>
        <div className="flex-none">
          <span className="text-sm">{formattedDate}</span>
          <br />
          <span className="text-sm pl-3">{currentTime}</span>
        </div>
      </div>
    </div>
  )
}

export default NavBar