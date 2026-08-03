import React from "react";
import useFilters from "../hooks/useFilters";
import useDate from "../hooks/useDate";

// Controles de visualização para buscar e ordenar as movimentações.
const CashModes = () => {
  const { search, sortBy, setSearch, setSortBy } = useFilters();

  const { prevMonth, nextMonth, selectedPeriod } = useDate();

  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  return (
    <div className="mb-6 mt-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-between rounded-full bg-slate-800 px-3 py-1.5 text-sm text-slate-200 shadow-sm">
          <button
            onClick={prevMonth}
            className="flex items-center justify-center text-slate-400 transition-colors hover:text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <span className="mx-3 min-w-[80px] text-center font-medium">
            {monthNames[selectedPeriod.month - 1]} {selectedPeriod.year}
          </span>

          <button
            onClick={nextMonth}
            className="flex items-center justify-center text-slate-400 transition-colors hover:text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4 min-w-[240px]">
        <input
          className="flex-1 min-w-[180px] rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 placeholder-slate-400 focus:border-slate-500 focus:outline-none"
          type="text"
          placeholder="Buscar descrição..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 focus:border-slate-500 focus:outline-none"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recent">Recente</option>
          <option value="oldest">Mais antigo</option>
          <option value="amountHigh">Valor (Maior → Menor)</option>
          <option value="amountLow">Valor (Menor → Maior)</option>
        </select>
      </div>
    </div>
  );
};

export default CashModes;
