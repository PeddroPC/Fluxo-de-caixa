import React from "react";

const CashSumary = ({ totalIncome, totalExpense, balance }) => {
  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Summary</h2>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-600">Total Income</p>
          <p className="text-2xl font-bold text-green-600">
            ${totalIncome.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-600">Total Expense</p>
          <p className="text-2xl font-bold text-red-600">
            ${totalExpense.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-600">Balance</p>
          <p
            className={`text-2xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CashSumary;
