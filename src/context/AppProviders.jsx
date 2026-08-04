import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";
import { CashProvider } from "./CashContext";
import { FilterProvider } from "./FilterContext";
import { ModalProvider } from "./ModalContext";
import { DateProvider } from "./DateContext";
import TransactionModal from "../Components/TransactionModal";

// Agrupa todos os providers da aplicação para fornecer contexto global aos componentes.
const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DateProvider>
          <CashProvider>
            <FilterProvider>
              <ModalProvider>
                {children}
                 <TransactionModal/>
                </ModalProvider>
            </FilterProvider>
          </CashProvider>
        </DateProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
