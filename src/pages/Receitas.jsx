import React from "react";
import useModal from "../hooks/useModal";
import { useCash } from "../context/CashContext";

const Receitas = () => {
  const { openModal } = useModal();
  const { transactions } = useCash();

  const handleOpenReceitaModal = () => openModal(null, { type: "Receita" });
  return (
    <div className="min-h-screen bg-slate-950 p-8 lg:p-10 font-sans text-slate-100">
      {/* 1. Cabeçalho & Ação */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Receitas
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Gerencie suas entradas e recebimentos consolidados.
          </p>
        </div>
        <button
          onClick={handleOpenReceitaModal}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 font-medium text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-600"
        >
          <span>+</span> Nova Receita
        </button>
      </div>

      {/* 2. KPIs (Cards de Resumo Analítico) */}
      <div className="mb-8 grid gap-6 sm:grid-cols-3">
        {transactions.filter((item) => item.type === "income").length > 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              💰 Total Recebido
            </p>
            <p className="text-2xl font-bold text-emerald-400">R$ {currentValue.toFixed(2)}</p>
          </div>
        )}
      </div>

      {/* 3. Controles da Lista */}
      <div className="flex items-center justify-between rounded-t-2xl border border-slate-800 bg-slate-900/50 p-4">
        <div className="flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-950 px-4 py-2">
          <button className="text-slate-400 transition-colors hover:text-white">
            {"<"}
          </button>
          <span className="min-w-[80px] text-center text-sm font-medium text-slate-200">
            Jul 2026
          </span>
          <button className="text-slate-400 transition-colors hover:text-white">
            {">"}
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Buscar descrição..."
            className="w-64 rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-slate-600 focus:outline-none"
          />
        </div>
      </div>

      {/* 4. Lista de Lançamentos (Apenas Consolidados) */}
      {transactions.filter((item) => item.type === "income").length === 0 && (
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center text-sm text-slate-400">
          Nenhuma receita registrada ainda.
        </div>
      )}
      {transactions
        .filter((item) => item.type === "income")
        .map((item) => (
          <div key={item.id} className="flex cursor-pointer items-center justify-between border-b border-slate-800/50 p-4 transition-colors hover:bg-slate-800/30">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                💼
              </div>
              <div>
                <p className="text-base font-medium text-slate-200">
                  {item.description}
                </p>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-300">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-emerald-400">+ R$ {item.amount.toFixed(2)}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Receitas;
