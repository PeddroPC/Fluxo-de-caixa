import React from "react";

const CashSumary = ({ totalIncome, totalExpense, balance }) => {
  return (
    <div className="mt-8 rounded-2xl glass p-6 card-shadow">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Resumo</h2>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-300">Receitas</p>
          <p className="text-2xl font-bold text-green-300">R$ {totalIncome.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-300">Despesas</p>
          <p className="text-2xl font-bold text-red-300">R$ {totalExpense.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-300">Saldo</p>
          <p className={`text-2xl font-bold ${balance >= 0 ? "text-green-300" : "text-red-300"}`}>
            R$ {balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CashSumary;
