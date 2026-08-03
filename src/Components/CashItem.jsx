import React from "react";
import { useModal } from "../context/ModalContext";

// Renderiza uma movimentação individual na lista, exibindo valor, categoria e ações de edição/exclusão.
// Props recebidas:
// - data: objeto com os dados da transação.
// - onDelete: callback executado ao clicar em excluir.
const CashItem = ({ data, onDelete }) => {
  const { openModal, openTransactionModal } = useModal();

  const isIncome = data.type === "income";
  const isInvestment = data.type === "investment";
  const title = data.description ?? data.nome ?? "Movimentação";
  const amountPrefix = isInvestment ? "" : isIncome ? "+" : "-";
  const amountColor = isInvestment
    ? "text-amber-400"
    : isIncome
      ? "text-green-400"
      : "text-red-400";
  const iconTone = isInvestment
    ? "bg-amber-500/10 text-amber-400"
    : isIncome
      ? "bg-green-500/10 text-green-500"
      : "bg-red-500/10 text-red-500";

  return (
    <div
      className="group flex flex-col justify-between gap-4 rounded-2xl border border-slate-700/50 bg-slate-800/40 p-4 shadow-sm transition-all hover:border-slate-600 hover:bg-slate-800 sm:flex-row sm:items-center"
      onDoubleClick={() => openTransactionModal(data)}
    >
      <div className="flex min-w-0 flex-1 items-start gap-4 sm:items-center">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconTone}`}
        >
          {isInvestment ? (
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
                d="M12 8v8m0 0l-4-4m4 4l4-4"
              />
            </svg>
          ) : isIncome ? (
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

        <div className="min-w-0 flex-1">
          <h3
            className="truncate text-base font-medium text-slate-100 sm:text-lg"
            title={title}
          >
            {title}
          </h3>

          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400">
            <span>{data.date}</span>

            {isInvestment ? (
              <>
                <span className="text-slate-600">•</span>
                <span className="rounded bg-slate-700/50 px-1.5 py-0.5 text-xs text-slate-300">
                  {data.investmentType || "Investimento"}
                </span>
              </>
            ) : (
              data.category &&
              data.category !== "Outros" && (
                <>
                  <span className="text-slate-600">•</span>
                  <span className="rounded bg-slate-700/50 px-1.5 py-0.5 text-xs text-slate-300">
                    {data.category}
                  </span>
                </>
              )
            )}
          </div>

          {data.observation && (
            <p
              className="mt-2 overflow-hidden text-ellipsis text-sm text-slate-400 [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]"
              title={data.observation}
            >
              {data.observation}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-3 border-t border-slate-700/50 pt-3 pl-16 shrink-0 sm:flex-col sm:items-end sm:justify-center sm:border-0 sm:pt-0 sm:pl-0">
        <p
          className={`whitespace-nowrap text-lg font-bold tracking-tight sm:text-xl ${amountColor}`}
        >
          {amountPrefix} R$ {Number(data.amount || 0).toFixed(2)}
        </p>

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
