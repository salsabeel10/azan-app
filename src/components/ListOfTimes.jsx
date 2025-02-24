import React, { useEffect } from 'react'
import usePrayerTimeStore from '../store/usePrayerTimeStore'

const ListOfTimes = () => {
  const { prayerTimes, fetchPrayerTimes, loading, error, fetchType } =
    usePrayerTimeStore()

  useEffect(() => {
    fetchPrayerTimes(fetchType)
  }, [fetchType])

  const convertTo12Hour = (time24) => {
    let [hours, minutes] = time24.split(':').map(Number)
    let period = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12 // Convert 0 to 12
    return `${hours}:${String(minutes).padStart(2, '0')} ${period}`
  }

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

  const getNextPrayerTime = (prayerTimes) => {
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes() // Convert current time to minutes

    const sortedPrayers = orderedPrayers
      .map((prayer) => ({
        prayer,
        time: prayerTimes[prayer],
      }))
      .filter(({ time }) => time) // Filter out undefined times
      .map(({ prayer, time }) => {
        const [hours, minutes] = time.split(':').map(Number)
        const totalMinutes = hours * 60 + minutes
        return { prayer, totalMinutes }
      })

    const nextPrayer = sortedPrayers.find(
      ({ totalMinutes }) => totalMinutes > currentTime
    )

    return nextPrayer ? nextPrayer.prayer : sortedPrayers[0]?.prayer // Fallback to the first prayer
  }

  const nextPrayer = getNextPrayerTime(prayerTimes)

  console.log('Next Prayer:', nextPrayer) // Debugging

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ul className="rounded-xl w-80 text-base-content p-1 mb-22">
        {orderedPrayers.map((prayer, index) =>
          prayerTimes[prayer] ? (
            <li
              key={prayer}
              className={`relative flex justify-between items-center px-4 py-3 shadow-md border border-gray-300 dark:border-0 dark:border-b dark:border-b-gray-400 rounded-xl mb-3 mt-2
    ${index % 2 === 0 ? 'bg-base-100' : 'bg-base-200'}
    ${
      prayer === nextPrayer ? 'border border-sky-300 animate-border-glow' : ''
    }`} // Apply border animation
            >
              <span className="font-medium text-lg">{prayer}</span>
              <span className="text-md font-semibold">
                {convertTo12Hour(prayerTimes[prayer])}
              </span>
            </li>
          ) : null
        )}
      </ul>
    </div>
  )
}

export default ListOfTimes
