import axios from "axios";

const yelpApi = axios.create({
  baseURL: "/api", // Using a proxy to bypass CORS issues during development
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_YELP_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export default yelpApi;
