import axios from "axios";
import { setTokenFunction } from "./interceptors";

const instanse = axios.create({
  baseURL: process.env.VUE_APP_NEWS_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

setTokenFunction(instanse);

export default instanse;
