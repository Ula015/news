import axios from "axios";
import { setTokenFunction } from "../interceptors";

const instanse = axios.create({
  baseURL: process.env.VUE_APP_SIGN_UP_URL,
  headers: {
    "Content-type": "application/json",
  },
});

setTokenFunction(instanse);

export default instanse;
