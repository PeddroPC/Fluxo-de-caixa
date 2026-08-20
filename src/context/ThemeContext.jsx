import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);
const storageKey = "app-theme";
const defaultTheme = "dark";

const getStoredTheme = () => {
  try {
    const stored = localStorage.getItem(storageKey);
    return stored === "light" || stored === "dark" ? stored : defaultTheme;
  } catch {
    return defaultTheme;
  }
};

// Provider que controla o tema visual da aplicação e persiste a escolha no storage.
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return getStoredTheme();
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // A theme without storage is still usable for the current session.
    }

    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
