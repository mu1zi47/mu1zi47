import React, { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ru from "./langs/ru.json";
import uz from "./langs/uz.json";
import en from './langs/en.json';

const LanguageContext = createContext();
const translations = { ru, uz, en };

export const LanguageProvider = React.memo(({ children }) => {
  const queryClient = useQueryClient(); // Получаем queryClient
  const [language, setLanguageFunc] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setLanguageFunc(savedLang);
    }
  }, []);

  const setLanguage = (lang) => {
    if (lang !== localStorage.getItem("lang")) {
      localStorage.setItem("lang", lang);
      setLanguageFunc(lang);
      queryClient.invalidateQueries(); // Обновляем все API-запросы
    }
  };

  const translate = (key) => translations[language]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ translate, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
});

export const useLanguage = () => useContext(LanguageContext);