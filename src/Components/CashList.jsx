import React from "react";
import CashItem from "./CashItem";

const CashList = ({ data = [], onDelete }) => {
  return (
    <div className="mt-2 rounded-2xl p-0">
      <div className="mb-2 flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-bold text-slate-100">Movimentações</h2>

        <span className="rounded-full bg-slate-700 px-3 py-1 text-sm font-medium text-slate-200">
          {data.length} itens
        </span>
      </div>

      <div className="space-y-3 px-4">
        {data.length > 0 ? (
          data.map((transaction) => (
            <CashItem
              key={transaction.id}
              data={transaction}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
            Sem movimentações
          </div>
        )}
      </div>
    </div>
  );
};

export default CashList;
