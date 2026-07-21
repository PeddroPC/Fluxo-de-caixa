import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const openModal = useCallback((transaction = null) => {
    setSelectedTransaction(transaction);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedTransaction(null);
  }, []);

  const value = useMemo(
    () => ({ isOpen, selectedTransaction, openModal, closeModal, setSelectedTransaction }),
    [isOpen, selectedTransaction, openModal, closeModal],
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
