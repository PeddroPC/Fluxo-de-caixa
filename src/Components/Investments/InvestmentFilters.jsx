import React from "react";

const investmentTypeOptions = [
  "Todos",
  "Ações",
  "Fundos Imobiliários",
  "Tesouro",
  "CDB",
  "LCI",
  "LCA",
  "ETF",
  "Criptomoedas",
  "Outros",
];

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

const InvestmentFilters = ({
  searchQuery,
  onSearchChange,
  investmentType,
  onInvestmentTypeChange,
  showAllPeriods,
  onToggleShowAllPeriods,
  prevMonth,
  nextMonth,
  selectedPeriod,
}) => (
<div className="mb-8 flex w-full flex-wrap items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-3 shadow-sm lg:flex-nowrap">
    
    {/* 1. Seletor de Mês */}
    <div className="flex items-center gap-3 rounded-full bg-slate-800/80 px-4 py-2 text-sm text-slate-200 shadow-sm">
      <button
        type="button"
        onClick={prevMonth}
        className="flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition hover:text-white focus:outline-none"
        aria-label="Mês anterior"
      >
        ‹
      </button>

      <span className="min-w-[80px] text-center font-medium">
        {monthNames[selectedPeriod.month - 1]} {selectedPeriod.year}
      </span>

      <button
        type="button"
        onClick={nextMonth}
        className="flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition hover:text-white focus:outline-none"
        aria-label="Próximo mês"
      >
        ›
      </button>
    </div>

    {/* 2. Botão de Filtro (Toggle) */}
    <button
      type="button"
      onClick={onToggleShowAllPeriods}
      className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
        showAllPeriods
          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
          : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700"
      }`}
    >
      {showAllPeriods ? "Todas as movimentações" : "Só este mês"}
    </button>

    {/* 3. Campo de Busca (Com flex-grow para esticar) */}
    <input
      type="text"
      value={searchQuery}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder="Buscar por ativo..."
      className="flex-grow rounded-full border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-slate-600 focus:outline-none"
    />

    {/* 4. Dropdown Select */}
    <select
      value={investmentType}
      onChange={(event) => onInvestmentTypeChange(event.target.value)}
      className="min-w-[140px] rounded-full border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-200 focus:border-slate-600 focus:outline-none"
    >
      {investmentTypeOptions.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
    
  </div>
);

export default InvestmentFilters;
