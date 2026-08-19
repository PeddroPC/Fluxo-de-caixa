import React from "react";
import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import useDate from "../hooks/useDate";

const monthNames = [
  "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

/**
 * Header principal do Dashboard.
 * Exibe saudacao, descricao contextual do periodo,
 * seletor de mes e acoes rapidas (Nova Receita / Nova Despesa).
 *
 * Props:
 * - onAddIncome: fn - abre modal pre-definido como receita
 * - onAddExpense: fn - abre modal pre-definido como despesa
 */
const DashboardHeader = ({ onAddIncome, onAddExpense }) => {
  const { selectedPeriod, prevMonth, nextMonth } = useDate();

  const monthLabel = monthNames[selectedPeriod.month - 1];
  const yearLabel = selectedPeriod.year;

  return (
    <div className="mb-6">
      {/* Linha superior: saudacao + acoes */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Saudacao e contexto */}
        <div className="min-w-0">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ola, bem-vindo de volta.
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Visao financeira de{" "}
            <span className="font-medium text-slate-200">
              {monthLabel} de {yearLabel}
            </span>
            .
          </p>
        </div>

        {/* Acoes rapidas */}
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            onClick={onAddIncome}
            aria-label="Adicionar nova receita"
            className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-400 transition hover:border-emerald-500/60 hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
          >
            <Plus size={15} strokeWidth={2.5} />
            Nova Receita
          </button>
          <button
            onClick={onAddExpense}
            aria-label="Adicionar nova despesa"
            className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-400 transition hover:border-rose-500/60 hover:bg-rose-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50"
          >
            <Minus size={15} strokeWidth={2.5} />
            Nova Despesa
          </button>
        </div>
      </div>

      {/* Seletor de periodo */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center rounded-full border border-slate-700 bg-slate-800/80">
          <button
            onClick={prevMonth}
            aria-label="Mes anterior"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
          >
            <ChevronLeft size={15} />
          </button>
          <span className="min-w-[110px] px-1 text-center text-sm font-medium text-slate-200">
            {monthLabel} {yearLabel}
          </span>
          <button
            onClick={nextMonth}
            aria-label="Proximo mes"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Linha divisora sutil */}
      <div className="mt-5 h-px bg-slate-800" />
    </div>
  );
};

export default DashboardHeader;
