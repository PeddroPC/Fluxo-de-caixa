import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ModalContext = createContext(null);

// Provider responsável por abrir, fechar e manter o estado do modal de formulário.
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);

  const openModal = useCallback((transaction = null) => {
    setSelectedTransaction(transaction);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedTransaction(null);
  }, []);

  const openTransactionModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionOpen(true);
    console.log("Abrindo modal de transação:", transaction);
  }

  const closeTransactionModal = () => {
    setIsTransactionOpen(false);
    setSelectedTransaction(null);
  }

  const value = useMemo(
    () => ({ isOpen, selectedTransaction, openModal, closeModal, setSelectedTransaction, openTransactionModal, closeTransactionModal, isTransactionOpen }),
    [isOpen, selectedTransaction, openModal, closeModal, isTransactionOpen],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
