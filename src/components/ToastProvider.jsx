"use client";
import { createContext, useState, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // удалить через 3 сек
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Контейнер тостов */}
        <div style={styles.container}>
      <AnimatePresence mode="wait">
          {toasts.map((toast) => (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              key={toast.id}
              style={{ ...styles.toast, ...toastStyles[toast.type] }}
            >
              {toast.message}
            </motion.div>
          ))}
      </AnimatePresence>
        </div>
    </ToastContext.Provider>
  );
}

// Стили
const styles = {
  container: {
    position: "fixed",
    left: "20px",
    bottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    zIndex: 9999,
    width: "auto",
    maxWidth: "450px",
    padding:'0px 20px 0px 0px',
  },
  toast: {
    padding: "12px 20px",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease",
  },
};

const toastStyles = {
  success: { backgroundColor: "rgba(34, 197, 94, 0.9)" },
  error: { backgroundColor: "rgba(239, 68, 68, 0.9)" },
};
