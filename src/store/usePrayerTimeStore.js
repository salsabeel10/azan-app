import { create } from 'zustand'
import axios from 'axios'
import { formattedDate } from './timeFormat'

const usePrayerTimeStore = create((set) => ({
  prayerTimes: null,
  loading: false,
  error: null,

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
}))

export default usePrayerTimeStore
