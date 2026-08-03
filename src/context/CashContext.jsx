import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import mockTransactions from "../data/mockTransactions";

const CashContext = createContext(null);
const storageKey = "transactions";

const normalizeTransaction = (transaction) => ({
  ...transaction,
  description: transaction.description ?? transaction.nome ?? "Movimentação",
  observation: transaction.observation ?? "",
  category:
    transaction.category ??
    (transaction.type === "investment" ? undefined : "Outros"),
});

const getInitialTransactions = () => {
  const stored = localStorage.getItem(storageKey);

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length > 0
        ? parsed.map(normalizeTransaction)
        : mockTransactions.map(normalizeTransaction);
    } catch (error) {
      console.error("Não foi possível carregar as transações salvas.", error);
    }
  }

  return mockTransactions.map(normalizeTransaction);
};

// Provider responsável por armazenar e manipular as movimentações financeiras do app.
export const CashProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => getInitialTransactions());

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = useCallback((transaction) => {
    setTransactions((current) => [...current, normalizeTransaction(transaction)]);
  }, []);

  const updateTransaction = useCallback((id, updatedTransaction) => {
    setTransactions((current) =>
      current.map((item) =>
        String(item.id) === String(id)
          ? normalizeTransaction({ ...item, ...updatedTransaction })
          : item,
      ),
    );
  }, []);

  const removeTransaction = useCallback((id) => {
    setTransactions((current) =>
      current.filter((item) => String(item.id) !== String(id)),
    );
  }, []);

  const clearTransactions = useCallback(() => {
    setTransactions([]);
  }, []);

  const value = useMemo(
    () => ({
      transactions,
      addTransaction,
      updateTransaction,
      removeTransaction,
      clearTransactions,
    }),
    [transactions, addTransaction, updateTransaction, removeTransaction, clearTransactions],
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
