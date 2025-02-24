import React, { useState } from 'react'
import usePrayerTimeStore from '../store/usePrayerTimeStore'
import { useNavigate } from 'react-router-dom'

const InputField = () => {
  const {
    address,
    setAddress,
    fetchPrayerTimes,
    prayerTimes,
    fetchType,
    setFetchType,
  } = usePrayerTimeStore()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    setFetchType('address')
    e.preventDefault()
    fetchPrayerTimes(fetchType)
    console.log(prayerTimes)
    navigate('/')
  }

  return (
    <div className="flex  justify-center items-center">
      <div className="flex bg-base-100 items-center gap-2 p-4 rounded-lg shadow-lg mt-28">
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && address.trim()) {
                handleSubmit(e)
              }
            }}
            placeholder="eg: Dubai, UAE"
            className="outline-none px-2"
            required
          />
        </label>
        <button
          onClick={(e) => {
            if (!address.trim()) return // Prevent submission if input is empty
            handleSubmit(e)
          }}
          className={`px-4 py-2 rounded-lg ${
            address.trim()
              ? 'bg-neutral text-neutral-content cursor-pointer'
              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
          }`}
          disabled={!address.trim()} // Disable button when input is empty
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default InputField
