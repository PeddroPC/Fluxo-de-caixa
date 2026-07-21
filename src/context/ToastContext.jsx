import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ open: false, message: "", type: "info" });

  const showToast = useCallback((message, type = "info") => {
    setToast({ open: true, message, type });
    window.setTimeout(() => {
      setToast((current) => ({ ...current, open: false }));
    }, 3000);
  }, []);

  const hideToast = useCallback(() => {
    setToast((current) => ({ ...current, open: false }));
  }, []);

  const value = useMemo(
    () => ({ toast, showToast, hideToast }),
    [toast, showToast, hideToast],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
