// utils/api.js
import axios from "axios";
import { useLanguage } from "@/context/languageContext";
import { useMemo } from "react";

const address = "https://api.muizi.uz/api/";

const useApi = () => {
  const { language } = useLanguage();

  const api = useMemo(() => {
    return axios.create({
      baseURL: address,
      headers: {
        "Accept-Language": language,
      },
    });
  }, [language]);

  return api;
};

export default useApi;