import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";
import { CashProvider } from "./CashContext";
import { FilterProvider } from "./FilterContext";
import { ModalProvider } from "./ModalContext";

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
