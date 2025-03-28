import React, { useState } from 'react'
import usePrayerTimeStore from '../store/usePrayerTimeStore'
import { useNavigate } from 'react-router-dom'

const AutoLocation = () => {
  const {
    latitude,
    longitude,
    fetchLocation,
    setLatitude,
    setLongitude,
    prayerTimes,
    fetchPrayerTimes,
    fetchType,
    setFetchType,
  } = usePrayerTimeStore()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    setFetchType('coordinate')
    e.preventDefault()
    fetchPrayerTimes(fetchType)
    console.log(prayerTimes)
    navigate('/')
  }
  return (
    <div className="flex justify-center items-center">
      <div className="flex bg-base-100 flex-col items-center gap-2 p-4 rounded-lg shadow-lg mt-28">
        {/* Input Fields & Search Button */}
        <div className="flex items-center gap-2">
          <label className="input flex items-center border border-gray-900 rounded-lg px-3 py-2">
            <svg
              className="h-5 w-5 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Latitude"
              className="outline-none px-2"
            />
          </label>
          <label className="input flex items-center border border-gray-900 rounded-lg px-3 py-2">
            <svg
              className="h-5 w-5 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && latitude.trim() && longitude.trim()) {
                  handleSubmit(e)
                }
              }}
              required
              placeholder="Longitude"
              className="outline-none px-2"
            />
          </label>
          <button
            onClick={fetchLocation}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && latitude.trim() && longitude.trim()) {
                handleSubmit(e)
              }
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 hover:cursor-pointer"
          >
            Fetch
          </button>
          <button
            onClick={(e) => {
              if (!latitude.trim() || !longitude.trim()) return // Prevent submission if input is empty
              handleSubmit(e)
            }}
            className={`px-4 py-2 rounded-lg ${
              latitude.trim() && longitude.trim()
                ? 'bg-neutral text-neutral-content cursor-pointer'
                : 'bg-gray-400 text-black cursor-not-allowed'
            }`}
            disabled={!latitude.trim() || !longitude.trim()} // Disable button when input is empty
          >
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default AutoLocation
