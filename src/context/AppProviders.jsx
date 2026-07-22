import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";
import { CashProvider } from "./CashContext";
import { FilterProvider } from "./FilterContext";
import { ModalProvider } from "./ModalContext";

// Agrupa todos os providers da aplicação para fornecer contexto global aos componentes.
const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CashProvider>
          <FilterProvider>
            <ModalProvider>{children}</ModalProvider>
          </FilterProvider>
        </CashProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
