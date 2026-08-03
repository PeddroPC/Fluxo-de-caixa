import { createContext, useContext, useState, useMemo, useCallback } from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const today = new Date();

  const [selectedPeriod, setSelectedPeriod] = useState({
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });

  // Usamos useCallback para que a função não seja recriada a cada render
  const nextMonth = useCallback(() => {
    setSelectedPeriod((prev) => {
      if (prev.month === 12) {
        return {
          month: 1,
          year: prev.year + 1,
        };
      }
      return {
        month: prev.month + 1,
        year: prev.year,
      };
    });
  }, []); // Array vazio porque ela só depende do 'prev' do próprio estado

  const prevMonth = useCallback(() => {
    setSelectedPeriod((prev) => {
      if (prev.month === 1) {
        return {
          month: 12,
          year: prev.year - 1,
        };
      }
      return {
        month: prev.month - 1,
        year: prev.year,
      };
    });
  }, []);

  const value = useMemo(
    () => ({ selectedPeriod, nextMonth, prevMonth }),
    [selectedPeriod, nextMonth, prevMonth]
  );

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
}; // <-- O DateProvider termina AQUI

// O hook deve ser criado FORA do DateProvider, na raiz do arquivo!
export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDate must be used within a DateProvider");
  }
  return context;
};