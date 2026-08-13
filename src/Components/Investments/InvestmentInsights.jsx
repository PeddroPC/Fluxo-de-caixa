import React from "react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));

const formatPercent = (value) =>
  `${Number(value || 0).toFixed(2).replace(".", ",")}%`;

const InvestmentInsights = ({
  largestPosition,
  bestYield,
  worstYield,
  diversification,
}) => (
  <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20">
    
    {/* Cabeçalho mais enxuto */}
    <div className="mb-4">
      <h2 className="text-lg font-semibold tracking-tight text-white">Resumo da carteira</h2>
    </div>

    <div className="grid gap-3">
      
      {/* 1. Maior Posição (Flex Row em vez de empilhado) */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/80 p-3.5">
        <p className="text-[10px] uppercase tracking-widest text-slate-400">Maior posição</p>
        <div className="text-right">
          <p className="text-sm font-semibold text-white">
            {largestPosition ? largestPosition.description : "Sem dados"}
          </p>
          <p className="text-xs text-slate-400">
            {largestPosition ? formatCurrency(largestPosition.amount) : "-"}
          </p>
        </div>
      </div>

      {/* 2. Melhor e Pior Rendimento (Lado a lado) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3.5">
          <p className="text-[10px] uppercase tracking-widest text-slate-400">Melhor</p>
          <p className="mt-1 truncate text-sm font-semibold text-white">
            {bestYield ? bestYield.description : "-"}
          </p>
          <p className="text-xs font-medium text-emerald-400">
            {bestYield ? `+${formatPercent(bestYield.profitability)}` : "-"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3.5">
          <p className="text-[10px] uppercase tracking-widest text-slate-400">Pior</p>
          <p className="mt-1 truncate text-sm font-semibold text-white">
            {worstYield ? worstYield.description : "-"}
          </p>
          <p className="text-xs font-medium text-rose-400">
            {worstYield ? formatPercent(worstYield.profitability) : "-"}
          </p>
        </div>
      </div>

      {/* 3. Diversificação (Lista compactada) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3.5">
        <p className="mb-3 text-[10px] uppercase tracking-widest text-slate-400">Diversificação</p>
        
        <div className="space-y-2">
          {diversification.length > 0 ? (
            diversification.map((entry) => (
              <div key={entry.label} className="flex items-center justify-between rounded-xl bg-slate-900/80 px-3 py-2">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-white">{entry.label}</p>
                  <p className="text-[10px] text-slate-500">{entry.percentage}%</p>
                </div>
                <p className="text-[10px] font-semibold text-slate-300">{entry.count} atv</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400">Sem investimentos no período.</p>
          )}
        </div>
      </div>

    </div>
  </div>
);

export default InvestmentInsights;