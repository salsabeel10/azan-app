import { create } from 'zustand'
import axios from 'axios'
import { formattedDate } from './timeFormat'

const usePrayerTimeStore = create((set, get) => ({
  prayerTimes: null,
  fetchType: 'fixed',
  loading: false,
  error: null,
  locationType: 'manual',
  latitude: '',
  longitude: '',
  address: '',
  setFetchType: (type) => set({ fetchType: type }),

  fetchPrayerTimes: async (type) => {
    set({ loading: true, error: null })

    const { latitude, longitude, address, fetchType } = get()

    let url = ''

    if (fetchType === 'fixed') {
      url = `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=25.300128&longitude=55.378632&method=3&calendarMethod=UAQ&midnightMode=1`
    } else if (fetchType === 'coordinate') {
      if (!latitude || !longitude) {
        set({ error: 'Latitude and Longitude are required', loading: false })
        return
      }
      url = `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${latitude}&longitude=${longitude}&method=3&calendarMethod=UAQ&midnightMode=1`
    } else if (fetchType === 'address') {
      if (!address) {
        set({ error: 'Address is required', loading: false })
        return
      }
      url = `https://api.aladhan.com/v1/timingsByAddress/${formattedDate}?address=${address}&method=3&calendarMethod=UAQ&midnightMode=1`
    }

    try {
      const response = await axios.get(url)
      set({ prayerTimes: response.data.data.timings, loading: false })
    } catch (error) {
      console.error('Error fetching prayer times:', error)
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
  setAddress: (add) => set({ address: add }),
}))

export default usePrayerTimeStore
