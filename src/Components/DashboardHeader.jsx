import React from "react";

// Cabeçalho principal do painel com ações rápidas de limpar dados e adicionar movimentação.
// Props recebidas:
// - onAdd: callback para abrir a modal de cadastro.
// - onReset: callback para limpar os dados armazenados.
const DashboardHeader = ({ onAdd, onReset }) => {
  return (
    <div className="mb-8 flex flex-col gap-6 rounded-3xl bg-slate-900/70 p-6 shadow-xl shadow-slate-900/40 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Painel Financeiro</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Olá, bem vindo de volta</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Veja o resumo do seu fluxo financeiro e controle suas movimentações com segurança.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-white"
          onClick={onReset}
        >
          Limpar dados
        </button>
        <button
          className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-105"
          onClick={onAdd}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
