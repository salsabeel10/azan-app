import React, { useState } from 'react'

function FindCoordinates() {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  })

  const getCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          console.error(error)
          alert('Unable to retrieve your location.')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  }

  return (
    <div>
      <button onClick={getCoordinates}>Get Coordinates</button>
      {coordinates.latitude && coordinates.longitude ? (
        <div>
          <p>Latitude: {coordinates.latitude}</p>
          <p>Longitude: {coordinates.longitude}</p>
        </div>
      ) : (
        <p>Click the button to get your coordinates.</p>
      )}
    </div>
  )
}

export default FindCoordinates
