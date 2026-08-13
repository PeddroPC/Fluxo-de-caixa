import React from "react";
import { Wallet, TrendingUp, BarChart, PiggyBank } from "lucide-react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));

const formatPercent = (value) =>
  `${Number(value || 0).toFixed(2).replace(".", ",")}%`;

const InvestmentSummary = ({
  totalInvested,
  totalCurrentValue,
  totalProfit,
  averageProfitability,
}) => {
  const profitPositive = totalProfit >= 0;

  return (
    <div className="mb-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Wallet size={20} strokeWidth={2} className="inline-block mr-2 align-text-bottom" /> Patrimônio Investido
        </p>
        <p className="text-2xl font-bold text-white">
          {formatCurrency(totalInvested)}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <TrendingUp size={20} strokeWidth={2} className="inline-block mr-2 align-text-bottom" /> Valor Atual da Carteira
        </p>
        <p className="text-2xl font-bold text-white">
          {formatCurrency(totalCurrentValue)}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <PiggyBank size={20} strokeWidth={2} className="inline-block mr-2 align-text-bottom" /> Lucro / Prejuízo
        </p>
        <p className={`text-2xl font-bold ${profitPositive ? "text-emerald-400" : "text-rose-400"}`}>
          {profitPositive ? "+" : "-"} {formatCurrency(Math.abs(totalProfit))}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <BarChart size={20} strokeWidth={2} className="inline-block mr-2 align-text-bottom" /> Rentabilidade Média
        </p>
        <p className="text-2xl font-bold text-white">
          {formatPercent(averageProfitability)}
        </p>
      </div>
    </div>
  );
};

export default InvestmentSummary;
