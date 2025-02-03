import React, { useEffect } from 'react'
import usePrayerTimeStore from '../store/usePrayerTimeStore'
import { formattedDate } from '../store/timeFormat'

const ListOfTimes = () => {
  const { prayerTimes, fetchPrayerTimes, loading, error } = usePrayerTimeStore()

  useEffect(() => {
    fetchPrayerTimes()
  }, [])
  console.log(prayerTimes)

  console.log(formattedDate)

  if (loading) return <p className="text-center">Loading...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>
  if (!prayerTimes) return <p className="text-center">No data available</p>

  // Define the required prayer order
  const orderedPrayers = [
    'Fajr',
    'Sunrise',
    'Dhuhr',
    'Asr',
    'Maghrib',
    'Isha',
    'Midnight',
    'Lastthird',
  ]

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ul className=" shadow-lg rounded-xl w-80 text-white p-1 mb-22">
        {/* Prayer Times List */}
        {orderedPrayers.map((prayer, index) =>
          prayerTimes[prayer] ? (
            <li
              key={prayer}
              className={`flex justify-between items-center px-4 py-3 border-b border-gray-700 rounded-xl mb-3 mt-2 ${
                index % 2 === 0 ? 'bg-base-100' : 'bg-base-200'
              }`}
            >
              <span className="font-medium text-lg">{prayer}</span>
              <span className="text-lg font-semibold">
                {prayerTimes[prayer]}
              </span>
            </li>
          ) : null
        )}

        {/* Bottom Rounded Edge */}
        <li className="rounded-b-xl"></li>
      </ul>
    </div>
  )
}

export default ListOfTimes
