import React from "react";
import { useState } from "react";

const CashItem = ({ data, removeData, setSelectedTransaction, handleEdit }) => {

  return (
    <div
      onDoubleClick={() => {
        setSelectedTransaction(data);
        handleEdit(data);
      }}
      className={`flex items-center justify-between rounded-2xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
        data.type === "income"
          ? "border-green-200 bg-green-50"
          : "border-red-200 bg-red-50"
      }`}
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {data.description}
        </h3>

        <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
          <span>{data.date}</span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              data.type === "income"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {data.type}
          </span>
        </div>
      </div>

      <div>
        <p
          className={`text-xl font-bold ${
            data.type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          {data.type === "income" ? "+" : "-"} ${Number(data.amount).toFixed(2)}
        </p>
      </div>
      <button
        className="ml-4 text-gray-400 hover:text-gray-600"
        onClick={() => removeData(data.id)}
      >
        Excluir
      </button>
      <button
        className="ml-4 text-gray-400 hover:text-gray-600"
        onClick={() => handleEdit(data)}
      >
        Editar
      </button>
    </div>
  );
};

export default CashItem;
