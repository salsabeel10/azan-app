import React, { useState } from 'react'

const InputField = () => {
  const [location, setLocation] = useState('');

  const handleSubmit=(e)=>{
    e.preventDefault();
    
  }
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex items-center gap-2 p-4 rounded-lg shadow-lg mb-32">
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
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
            required
            placeholder="Enter Location"
            className="outline-none px-2"
          />
        </label>
        <button onClick={handleSubmit} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 hover:cursor-pointer">
          Search
        </button>
      </div>
    </div>
  )
}

export default InputField
