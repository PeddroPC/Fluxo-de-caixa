import React from "react";
import InvestmentItem from "./InvestmentItem";

const InvestmentList = ({ investments, onOpenItem }) => (
  <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-slate-400">Investimentos</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Lista de investimentos</h2>
      </div>
      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
        {investments.length} ativos
      </span>
    </div>

    {investments.length === 0 ? (
      <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center text-slate-400">
        <p className="text-base font-semibold text-slate-200">Nenhum investimento encontrado</p>
        <p className="mt-2 text-sm">Ajuste o filtro ou altere o período para ver a carteira.</p>
      </div>
    ) : (
      <div className="space-y-4">
        {investments.map((investment) => (
          <InvestmentItem
            key={investment.id}
            item={investment}
            onOpen={onOpenItem}
          />
        ))}
      </div>
    )}
  </div>
);

export default InvestmentList;
