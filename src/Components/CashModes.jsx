import React from "react";
import useFilters from "../hooks/useFilters";

// Controles de visualização para filtrar, buscar e ordenar as movimentações.
const CashModes = () => {
  const { filter, search, sortBy, setFilter, setSearch, setSortBy } = useFilters();
  return (
    <div className="mt-6 mb-6 flex flex-wrap gap-3 items-center">
      <button
        className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
          filter === "all"
            ? "bg-primary text-white shadow"
            : "bg-slate-800 text-slate-200 hover:bg-slate-700"
        }`}
        onClick={() => setFilter("all")}
      >
        Todas
      </button>

      <button
        className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
          filter === "income"
            ? "bg-green-600 text-white shadow"
            : "bg-slate-800 text-slate-200 hover:bg-slate-700"
        }`}
        onClick={() => setFilter("income")}
      >
        Receitas
      </button>

      <button
        className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
          filter === "expense"
            ? "bg-red-600 text-white shadow"
            : "bg-slate-800 text-slate-200 hover:bg-slate-700"
        }`}
        onClick={() => setFilter("expense")}
      >
        Despesas
      </button>

      <input
        className="ml-auto rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-slate-200 focus:border-primary focus:outline-none"
        type="text"
        placeholder="Buscar descrição..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="ml-4 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-slate-200 focus:border-primary focus:outline-none"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="recent">Recente</option>
        <option value="oldest">Mais antigo</option>
        <option value="amountHigh">Valor (Maior → Menor)</option>
        <option value="amountLow">Valor (Menor → Maior)</option>
      </select>
    </div>
  );
};

export default CashModes;
