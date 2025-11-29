import { create } from "zustand";
import axios from "axios";
import { formattedDate } from "./timeFormat";

const usePrayerTimeStore = create((set, get) => ({
  prayerTimes: null,
  fetchType: "fixed",
  loading: false,
  error: null,
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

  fetchPrayerTimes: async () => {
    set({ loading: true, error: null });

    const { latitude, longitude, address, fetchType } = get();

    let url = "";

    if (fetchType === "fixed") {
      url = `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=25.300128&longitude=55.378632&method=3&calendarMethod=UAQ&midnightMode=1&tune=0,-2,0,0,0,0,0,0,-1,`;
    } else if (fetchType === "coordinate") {
      if (!latitude || !longitude) {
        set({ error: "Latitude and Longitude are required", loading: false });
        return;
      }
      url = `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${latitude}&longitude=${longitude}&method=3&calendarMethod=UAQ&midnightMode=1`;
    } else if (fetchType === "address") {
      if (!address) {
        set({ error: "Address is required", loading: false });
        return;
      }
      url = `https://api.aladhan.com/v1/timingsByAddress/${formattedDate}?address=${address}&method=3&calendarMethod=UAQ&midnightMode=1`;
    }

    // STEP A — Get cached data if offline
    const cached = localStorage.getItem("prayerTimes");
    if (!navigator.onLine && cached) {
      set({
        prayerTimes: JSON.parse(cached),
        loading: false,
        error: "Offline mode. Showing saved prayer times.",
      });
      return;
    }

    try {
      const response = await axios.get(url);
      const timings = response.data.data.timings;

      // STEP B — Save fresh data into cache
      localStorage.setItem("prayerTimes", JSON.stringify(timings));

      set({ prayerTimes: timings, loading: false });
    } catch (error) {
      console.error("Error fetching prayer times:", error);

      // STEP C — If API fails but cache exists, use it
      if (cached) {
        set({
          prayerTimes: JSON.parse(cached),
          loading: false,
          error: "Unable to fetch. Showing saved prayer times.",
        });
      } else {
        set({ error: "Failed to fetch prayer times", loading: false });
      }
    }
  },

  //radio button mode
  setLocationType: (type) => set({ locationType: type }),

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
  setLatitude: (lat) => set({ latitude: lat }),
  setLongitude: (lon) => set({ longitude: lon }),
  setAddress: (add) => set({ address: add }),
}));

export default usePrayerTimeStore;
