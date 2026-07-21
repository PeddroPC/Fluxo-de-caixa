import React from "react";

const CashItem = ({ data, onDelete, onEdit }) => {
  return (
    <div
      className={`grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 rounded-xl border px-5 py-4
      ${
        data.type === "income"
          ? "border-green-700 bg-slate-800"
          : "border-red-700 bg-slate-800"
      }`}
    >
      {/* Nome e Info (Esquerda) */}
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-white whitespace-normal break-words leading-tight">
          {data.description}
        </h3>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm text-slate-400">{data.date}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs
            ${
              data.type === "income"
                ? "bg-green-700 text-green-100"
                : "bg-red-700 text-red-100"
            }`}
          >
            {data.type}
          </span>
        </div>
      </div>

      {/* Valor (Direita, alinhado ao topo) */}
      <div className="text-right self-start mt-0.5">
        <p
          className={`text-xl font-bold ${
            data.type === "income" ? "text-green-400" : "text-red-400"
          }`}
        >
          {data.type === "income" ? "+" : "-"} R${" "}
          {Number(data.amount).toFixed(2)}
        </p>
      </div>

      {/* Ações (Linha de baixo, alinhadas à direita) */}
      <div className="col-span-2 flex justify-end gap-2 mt-2">
        <button
          className="rounded-lg bg-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-600 transition-colors"
          onClick={() => onEdit(data)}
        >
          Editar
        </button>

        <button
          className="rounded-lg bg-red-600/20 px-4 py-2 text-sm text-red-300 hover:bg-red-600/30 transition-colors"
          onClick={() => onDelete(data.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default CashItem;