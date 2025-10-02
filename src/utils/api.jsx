// utils/api.js
import axios from "axios";
import { useMemo } from "react";

const address = "https://api.muizi.uz/api/";

const useApi = () => {

  const api = useMemo(() => {
    return axios.create({
      baseURL: address,
    });
  }, []);

  return api;
};

export default useApi;