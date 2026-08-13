import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFilters } from "../context/FilterContext";

const useRouteFilterReset = ({
  resetSearch = true,
  resetShowAllPeriods = false,
  resetFilter = false,
  resetSortBy = false,
} = {}) => {
  const location = useLocation();
  const { setSearch, setShowAllPeriods, setFilter, setSortBy } = useFilters();

  useEffect(() => {
    if (resetSearch) {
      setSearch("");
    }

    if (resetShowAllPeriods) {
      setShowAllPeriods(false);
    }

    if (resetFilter) {
      setFilter("all");
    }

    if (resetSortBy) {
      setSortBy("recent");
    }
  }, [location.pathname, resetSearch, resetShowAllPeriods, resetFilter, resetSortBy, setSearch, setShowAllPeriods, setFilter, setSortBy]);
};

export default useRouteFilterReset;
