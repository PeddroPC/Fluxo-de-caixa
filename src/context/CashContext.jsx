import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import mockTransactions from "../data/mockTransactions";

const CashContext = createContext(null);
const storageKey = "transactions";

export const CashProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.length > 0 ? parsed : mockTransactions;
    }
    return mockTransactions;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = useCallback((transaction) => {
    setTransactions((current) => [...current, transaction]);
  }, []);

  const updateTransaction = useCallback((id, updatedTransaction) => {
    setTransactions((current) => current.map((item) => (String(item.id) === String(id) ? updatedTransaction : item)));
  }, []);

  const removeTransaction = useCallback((id) => {
    setTransactions((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearTransactions = useCallback(() => {
    setTransactions([]);
  }, []);

  const totalIncome = useMemo(
    () => transactions.reduce((sum, item) => (item.type === "income" ? sum + Number(item.amount) : sum), 0),
    [transactions],
  );

  const totalExpense = useMemo(
    () => transactions.reduce((sum, item) => (item.type === "expense" ? sum + Number(item.amount) : sum), 0),
    [transactions],
  );

  const balance = useMemo(() => totalIncome - totalExpense, [totalIncome, totalExpense]);

  const value = useMemo(
    () => ({
      transactions,
      addTransaction,
      updateTransaction,
      removeTransaction,
      clearTransactions,
      totalIncome,
      totalExpense,
      balance,
    }),
    [transactions, addTransaction, updateTransaction, removeTransaction, clearTransactions, totalIncome, totalExpense, balance],
  );

  return <CashContext.Provider value={value}>{children}</CashContext.Provider>;
};

export const useCash = () => {
  const context = useContext(CashContext);
  if (!context) {
    throw new Error("useCash must be used within a CashProvider");
  }
  return context;
};
