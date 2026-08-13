import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const FilterContext = createContext(null);

// Provider que controla os filtros, texto de busca e ordenação da lista de movimentações.
export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showAllPeriods, setShowAllPeriods] = useState(false);

  const setFilters = useCallback(
    ({ filter: newFilter, search: newSearch, sortBy: newSortBy, showAllPeriods: newShowAllPeriods }) => {
      if (newFilter !== undefined) setFilter(newFilter);
      if (newSearch !== undefined) setSearch(newSearch);
      if (newSortBy !== undefined) setSortBy(newSortBy);
      if (newShowAllPeriods !== undefined) setShowAllPeriods(newShowAllPeriods);
    },
    [],
  );

  const value = useMemo(
    () => ({
      filter,
      search,
      sortBy,
      showAllPeriods,
      setFilter,
      setSearch,
      setSortBy,
      setShowAllPeriods,
      setFilters,
    }),
    [filter, search, sortBy, showAllPeriods, setFilter, setSearch, setSortBy, setShowAllPeriods, setFilters],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
