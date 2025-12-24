import { create } from "zustand";
import axios from "axios";

// Helper to get current Month and Year
const getDateParams = () => {
  const date = new Date();
  return {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    day: date.getDate(),
  };
};

const usePrayerTimeStore = create((set, get) => ({
  prayerTimes: null,
  fetchType: "fixed",
  loading: false,
  error: null, // "Offline mode", "Error fetching", etc.
  locationType: "manual",
  latitude: "",
  longitude: "",
  address: "",
  theme: "dark",

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "dark" ? "light" : "dark",
    })),

  setFetchType: (type) => set({ fetchType: type }),

  // Set location mode (radio button)
  setLocationType: (type) => set({ locationType: type }),

  setLatitude: (lat) => set({ latitude: lat }),
  setLongitude: (lon) => set({ longitude: lon }),
  setAddress: (add) => set({ address: add }),

  fetchLocation: () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          set({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to retrieve location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  },

  // Main function to get prayer times
  fetchPrayerTimes: async () => {
    set({ loading: true, error: null });

    const { latitude, longitude, address, fetchType } = get();
    const { month, year, day } = getDateParams();

    // 1. Try to load from Cache first (Optimistic UI / Offline check)
    // We check if we have data for the CURRENT month/year/location stored.
    const cacheKey = "prayerTimesCache";
    const cachedDataString = localStorage.getItem(cacheKey);
    let cachedData = null;

    const cleanTimings = (timings) => {
      const cleaned = {};
      for (const key in timings) {
        if (typeof timings[key] === "string") {
          cleaned[key] = timings[key].replace(/\s*\(.*\)/, "");
        } else {
          cleaned[key] = timings[key];
        }
      }
      return cleaned;
    };

    if (cachedDataString) {
      try {
        cachedData = JSON.parse(cachedDataString);
        // Basic validity check: is it for this month/year?
        // Note: Realistically, you might want to also check if the location matches.
        // For simplicity now, we assume if cache exists, it's relevant, or we overwrite it if online.
        if (
          cachedData.month === month &&
          cachedData.year === year &&
          cachedData.fetchType === fetchType
        ) {
          // Find today's timings in the cached array
          const todayEntry = cachedData.data.find((d) => {
            // API date format examples: "01-12-2025" or similar.
            // But Aladhan Calendar API returns `date.gregorian.day` as string "01".
            return parseInt(d.date.gregorian.day) === day;
          });

          if (todayEntry) {
            set({
              prayerTimes: cleanTimings(todayEntry.timings),
              loading: false,
              error: navigator.onLine ? null : "Offline mode. Using saved data.",
            });
            // If we are offline, we are done. If online, we continue to fetch fresh data below.
            if (!navigator.onLine) return;
          }
        }
      } catch (e) {
        console.error("Cache parse error", e);
      }
    }

    // 2. Prepare API URL (Calendar endpoints)
    let url = "";
    // Common params: method=3 (MWL), midnightMode=1, calendarMethod=UAQ
    // Note: 'tune' parameter was used in 'fixed' mode previously, adding it back if essential,
    // but Calendar API structure is slightly different. Kept simple for now.
    const commonParams = `method=3&month=${month}&year=${year}&midnightMode=1`;

    if (fetchType === "fixed") {
      // Sharjah/Dubai fixed coords
      url = `https://api.aladhan.com/v1/calendar?latitude=25.300128&longitude=55.378632&${commonParams}&tune=0,-2,0,0,0,0,0,0,-1,`;
    } else if (fetchType === "coordinate") {
      if (!latitude || !longitude) {
        set({ error: "Latitude and Longitude are required", loading: false });
        return;
      }
      url = `https://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&${commonParams}`;
    } else if (fetchType === "address") {
      if (!address) {
        set({ error: "Address is required", loading: false });
        return;
      }
      url = `https://api.aladhan.com/v1/calendarByAddress?address=${address}&${commonParams}`;
    }

    console.log("Fetching Monthly:", url);

    try {
      const response = await axios.get(url);

      if (
        !response.data ||
        !response.data.data ||
        !Array.isArray(response.data.data)
      ) {
        throw new Error("Invalid API response");
      }

      const monthData = response.data.data;

      // 3. Save to Cache
      const newCache = {
        month,
        year,
        fetchType,
        timestamp: Date.now(),
        data: monthData,
      };
      localStorage.setItem(cacheKey, JSON.stringify(newCache));

      // 4. Update State with TODAY's times
      const todayEntry = monthData.find(
        (d) => parseInt(d.date.gregorian.day) === day
      );

      if (todayEntry) {
        set({
          prayerTimes: cleanTimings(todayEntry.timings),
          loading: false,
          error: null,
        });
      } else {
        set({
          loading: false,
          error: "Today's prayer times not found in response."
        });
      }
    } catch (error) {
      console.error("API FAILED:", error);

      // If we failed (and didn't already set cache data above for offline), set error.
      // If we already set the cache data (because we did the optimistic check at the top),
      // we might just want to update the error message to say "Could not refresh data".
      const currentPrayerTimes = get().prayerTimes;
      if (currentPrayerTimes) {
        set({ error: "Offline mode. Using saved data." });
      } else {
        set({
          loading: false,
          error: "Unable to fetch prayer times. Please check internet.",
        });
      }
    }
  },
}));

export default usePrayerTimeStore;
