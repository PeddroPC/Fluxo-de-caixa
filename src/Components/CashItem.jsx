import React from "react";
import { useModal } from "../context/ModalContext";

// Renderiza uma movimentação individual na lista, exibindo valor, categoria e ações de edição/exclusão.
// Props recebidas:
// - data: objeto com os dados da transação.
// - onDelete: callback executado ao clicar em excluir.
const CashItem = ({ data, onDelete }) => {
  const { openModal } = useModal();

  const isIncome = data.type === "income";
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-slate-800/40 p-4 border border-slate-700/50 transition-all hover:bg-slate-800 hover:border-slate-600 shadow-sm">
      {/* Esquerda: Ícone e Detalhes */}
      <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
        {/* Ícone Redondo (Substitui a necessidade de bordas coloridas no card todo) */}
        <div
          className={`flex shrink-0 items-center justify-center h-12 w-12 rounded-full 
          ${isIncome ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
        >
          {isIncome ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 11l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 13l-5 5m0 0l-5-5m5 5V6"
              />
            </svg>
          )}
        </div>

        {/* Textos: Nome, Metadados e Observação */}
        <div className="min-w-0 flex-1">
          <h3
            className="text-base sm:text-lg font-medium text-slate-100 truncate"
            title={data.nome || data.description}
          >
            {data.nome || data.description}
          </h3>

          {/* Linha de Metadados (Data e Categoria) */}
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400">
            <span>{data.date}</span>

            {data.category && data.category !== "Outros" && (
              <>
                <span className="text-slate-600">•</span>
                <span className="rounded bg-slate-700/50 px-1.5 py-0.5 text-xs text-slate-300">
                  {data.category}
                </span>
              </>
            )}
          </div>

          {/* Observação (Agora é um texto suave, sem a caixa preta) */}
          {data.observation && (
            <p
              className="    mt-2 text-sm text-slate-400 overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]"
              title={data.observation}
            >
              {data.observation}
            </p>
          )}
        </div>
      </div>

      {/* Direita: Valor e Ações */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pl-16 sm:pl-0 border-t border-slate-700/50 sm:border-0 pt-3 sm:pt-0">
        {/* Valor */}
        <p
          className={`text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap ${isIncome ? "text-green-400" : "text-red-400"}`}
        >
          {isIncome ? "+" : "-"} R$ {Number(data.amount).toFixed(2)}
        </p>

        {/* Botões de Ação (Menores e mais discretos) */}
        <div className="flex gap-2">
          <button
            className="flex items-center justify-center rounded-lg bg-slate-700/50 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-600 hover:text-white"
            onClick={() => openModal(data)}
          >
            Editar
          </button>

          <button
            className="flex items-center justify-center rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
            onClick={() => onDelete?.(data.id)}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashItem;
