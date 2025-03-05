import axios from "axios";

export const BASE_URL = "https://dashboard-next-js-nj1t.vercel.app";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
