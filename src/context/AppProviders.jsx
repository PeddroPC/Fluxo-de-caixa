import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";
import { CashProvider } from "./CashContext";
import { FilterProvider } from "./FilterContext";
import { ModalProvider } from "./ModalContext";
import { DateProvider } from "./DateContext";
import { GoalsProvider } from "./GoalsContext";
import TransactionModal from "../Components/TransactionModal";
import TransactionDetailsModal from "../Components/TransactionDetailsModal";

// Agrupa todos os providers da aplicação para fornecer contexto global aos componentes.
const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DateProvider>
          <CashProvider>
            <GoalsProvider>
              <FilterProvider>
                <ModalProvider>
                  {children}
                  <TransactionModal />
                  <TransactionDetailsModal />
                </ModalProvider>
              </FilterProvider>
            </GoalsProvider>
          </CashProvider>
        </DateProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
