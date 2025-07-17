import React, { useEffect, useState } from 'react'
import usePrayerTimeStore from '../store/usePrayerTimeStore'

const ListOfTimes = () => {
  const { prayerTimes, fetchPrayerTimes, loading, error, fetchType } =
    usePrayerTimeStore()

  const [remainingTime, setRemainingTime] = useState('')
  const [nextPrayer, setNextPrayer] = useState('')

  useEffect(() => {
    fetchPrayerTimes(fetchType)
  }, [fetchType, fetchPrayerTimes])
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
  const convertTo12Hour = (time24) => {
    let [hours, minutes] = time24.split(':').map(Number)
    let period = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12 // Convert 0 to 12
    return `${hours}:${String(minutes).padStart(2, '0')} ${period}`
  }

  useEffect(() => {
    if (!prayerTimes) return

    const getNextPrayer = () => {
      const now = new Date()
      const currentTime = now.getHours() * 60 + now.getMinutes()

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

      return nextPrayer
        ? { prayer: nextPrayer.prayer, totalMinutes: nextPrayer.totalMinutes }
        : sortedPrayers[0] // Fallback to the first prayer of the next day
    }

    const updateCountdown = () => {
      const now = new Date()
      const currentTime = now.getHours() * 60 + now.getMinutes()

      const next = getNextPrayer()
      if (!next) return

      setNextPrayer(next.prayer)

      const remainingMinutes = next.totalMinutes - currentTime
      const remainingSeconds = (60 - now.getSeconds()) % 60
      const hours = Math.floor(remainingMinutes / 60)
      const minutes = remainingMinutes % 60
      const seconds = remainingSeconds

      setRemainingTime(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      )
    }

    updateCountdown() // Run immediately
    const interval = setInterval(updateCountdown, 1000) // Update every second

    return () => clearInterval(interval) // Cleanup interval on unmount
  }, [prayerTimes])

  if (loading) return <p className="text-center">Loading...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>
  if (!prayerTimes) return <p className="text-center">No data available</p>
  return (
    <div>
      <p className="pt-2 text-center text-lg font-bold text-gray-800 dark:text-white">
        {nextPrayer} in{' '}
        <span className="text-green-700 dark:text-blue-400">
          {remainingTime}
        </span>
      </p>

      <div className="flex justify-center items-center pt-18">
        <ul className="rounded-xl w-80 text-base-content p-1 mb-22">
          {orderedPrayers.map((prayer, index) =>
            prayerTimes[prayer] ? (
              <li
                key={prayer}
                className={`relative flex justify-between items-center px-4 py-3  rounded-xl mb-3 mt-2
    ${index % 2 === 0 ? 'bg-base-100' : 'bg-base-200'}
    ${
      prayer === nextPrayer
        ? 'border border-sky-300 animate-border-glow'
        : 'border border-gray-300 dark:border-gray-600 shadow-md'
    }`}
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
    </div>
  )
}

export default ListOfTimes
