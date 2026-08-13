import React from "react";
import { TrendingUp, Building, Landmark, PiggyBank, DollarSign, BarChart, Bitcoin, Briefcase } from "lucide-react";

const typeIcons = {
  Ações: <TrendingUp size={20} strokeWidth={2} />,
  "Fundos Imobiliários": <Building size={20} strokeWidth={2} />,
  Tesouro: <Landmark size={20} strokeWidth={2} />,
  CDB: <PiggyBank size={20} strokeWidth={2} />,
  LCI: <Landmark size={20} strokeWidth={2} />,
  LCA: <DollarSign size={20} strokeWidth={2} />,
  ETF: <BarChart size={20} strokeWidth={2} />,
  Criptomoedas: <Bitcoin size={20} strokeWidth={2} />,
  Outros: <Briefcase size={20} strokeWidth={2} />,
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));

const formatPercent = (value) =>
  `${Number(value || 0).toFixed(2).replace(".", ",")} %`;

const InvestmentItem = ({ item, onOpen }) => {
  const normalizedType = item.investmentType || "Outros";
  const icon = typeIcons[normalizedType] || typeIcons.Outros;
  const currentValue = Number(item.currentValue || item.amount || 0);
  const investedValue = Number(item.amount || 0);
  const profitValue = currentValue - investedValue;
  const hasProfit = profitValue >= 0;

  return (
<button
      type="button"
      onClick={() => onOpen(item)}
      className="group w-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-left shadow-sm transition hover:border-cyan-500/30 hover:bg-slate-900"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Bloco Esquerdo: Ícone, Título, Data e Categoria */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/80 text-slate-300 transition-colors group-hover:text-cyan-400">
            {icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{item.description}</p>
            <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
              <span>{new Date(item.date).toLocaleDateString("pt-BR")}</span>
              <span>•</span>
              <span className="rounded bg-slate-800 px-1.5 py-0.5 uppercase tracking-widest text-slate-300">
                {normalizedType}
              </span>
            </div>
          </div>
        </div>

        {/* Bloco Direito: Indicadores Financeiros */}
        <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-6">
          <div className="text-left sm:text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Investido</p>
            <p className="text-xs font-medium text-slate-300">{formatCurrency(investedValue)}</p>
          </div>
          
          <div className="hidden text-right sm:block">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Atual</p>
            <p className="text-xs font-medium text-white">{formatCurrency(currentValue)}</p>
          </div>

          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Lucro ({formatPercent(Number(item.profitability || 0))})
            </p>
            <p className={`text-sm font-bold tracking-tight ${hasProfit ? "text-emerald-400" : "text-rose-400"}`}>
              {hasProfit ? "+" : "-"} {formatCurrency(Math.abs(profitValue))}
            </p>
          </div>
        </div>
        
      </div>
    </button>
  );
};

export default InvestmentItem;
