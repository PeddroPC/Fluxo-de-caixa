import { useMemo } from "react";
import { useDate } from "../context/DateContext";
import { useFilters } from "../context/FilterContext";

const useTransactionFilters = ({
  transactions = [],
  transactionType,
  predicate,
}) => {
  const { search, sortBy, showAllPeriods } = useFilters();
  const { selectedPeriod } = useDate();

  return useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return [...transactions]
      .filter((item) => {
        if (transactionType && item.type !== transactionType) {
          return false;
        }

        const itemDate = new Date(item.date);
        const matchesPeriod =
          showAllPeriods ||
          (itemDate.getFullYear() === selectedPeriod.year &&
            itemDate.getMonth() === selectedPeriod.month - 1);

        const description = item.description ?? "";
        const category = item.category ?? "";
        const matchesSearch = normalizedSearch
          ? description.toLowerCase().includes(normalizedSearch) ||
            category.toLowerCase().includes(normalizedSearch)
          : true;

        const matchesCustom = predicate ? predicate(item) : true;

        return matchesPeriod && matchesSearch && matchesCustom;
      })
      .sort((a, b) => {
        if (sortBy === "recent") {
          return new Date(b.date) - new Date(a.date);
        }

        if (sortBy === "oldest") {
          return new Date(a.date) - new Date(b.date);
        }

        if (sortBy === "amountHigh") {
          return Number(b.amount) - Number(a.amount);
        }

        if (sortBy === "amountLow") {
          return Number(a.amount) - Number(b.amount);
        }

        return 0;
      });
  }, [transactions, transactionType, predicate, search, sortBy, showAllPeriods, selectedPeriod]);
};

export default useTransactionFilters;
