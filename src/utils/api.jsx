// utils/api.js
import axios from "axios";

const address = "https://api.muizi.uz/api/";

const useApi = () => {
  const api = axios.create({
    baseURL: address,
  });
  
  return api;
};

export default useApi;