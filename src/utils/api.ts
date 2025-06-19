import axios from "axios";

const yelpApi = axios.create({
  baseURL: "/api",
});

export default yelpApi;
