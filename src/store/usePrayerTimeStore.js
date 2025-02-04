import { create } from 'zustand'
import axios from 'axios'
import { formattedDate } from './timeFormat'

const usePrayerTimeStore = create((set) => ({
  prayerTimes: null,
  loading: false,
  error: null,
  locationType: 'manual',
  latitude: '',
  longitude: '',

  fetchPrayerTimes: async () => {
    set({ loading: true, error: null })

    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=25.300128&longitude=55.378632&method=3&calendarMethod=UAQ&midnightMode=1`
      )

      set({ prayerTimes: response.data.data.timings, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch prayer times', loading: false })
    }
  },
  //radio button mode
  setLocationType: (type) => set({ locationType: type }),

  fetchLocation: () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          set({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          })
        },
        (error) => {
          console.error('Error fetching location:', error)
          alert('Unable to retrieve location.')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  },
  setLatitude: (lat) => set({ latitude: lat }),
  setLongitude: (lon) => set({ longitude: lon }),
}))

export default usePrayerTimeStore
