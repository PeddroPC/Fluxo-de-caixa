import React from "react";

// Card de insights com projeção financeira, meta mensal e dica de gestão.
// Props recebidas:
// - balance: saldo atual da conta.
// - goal: percentual de meta mensal.
// - nextDue: descrição do próximo vencimento.
// - tip: recomendação financeira exibida ao usuário.
// - prediction: valor previsto calculado pelo dashboard.
const InsightCard = ({ balance, goal, nextDue, tip, prediction }) => {
  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Insights Financeiros</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Resumo do mês</h3>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">Projeções</span>
      </div>

      <div className="space-y-4 text-sm text-slate-300">
        <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-100">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Saldo previsto</p>
          <p className="mt-2 text-lg font-semibold">R$ {prediction}</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-950/80 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Meta mensal</p>
            <p className="mt-2 text-base font-semibold text-white">{goal}%</p>
          </div>
          <div className="rounded-3xl bg-slate-950/80 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Próximo vencimento</p>
            <p className="mt-2 text-base font-semibold text-white">{nextDue}</p>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Dica</p>
          <p className="mt-2 text-sm">{tip}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
