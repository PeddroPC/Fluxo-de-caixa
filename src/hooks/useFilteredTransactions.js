import { useMemo } from "react";
import { useCash } from "../context/CashContext";
import useTransactionFilters from "./useTransactionFilters";

/**
 * Hook semântico que retorna transações filtradas por tipo, período, busca e ordenação.
 * Injeta automaticamente as transações do CashContext.
 *
 * @param {"income" | "expense" | "investment" | undefined} transactionType
 * @param {Function | undefined} predicate - Filtro adicional opcional
 * @returns {Array} Lista de transações filtradas e ordenadas
 *
 * @example
 * const receitas = useFilteredTransactions("income");
 * const despesas = useFilteredTransactions("expense");
 * const investimentos = useFilteredTransactions("investment");
 */
const useFilteredTransactions = (transactionType, predicate) => {
  const { transactions } = useCash();

  return useTransactionFilters({
    transactions,
    transactionType,
    predicate,
  });
};

export default useFilteredTransactions;
