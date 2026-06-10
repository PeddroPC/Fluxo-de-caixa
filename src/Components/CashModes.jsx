import React from "react";
import { useState } from "react";
const CashModes = ({
  filter,
  setFilter,
  search,
  setSearch,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="mt-8 mb-6 flex flex-wrap gap-3">
      <button
        className={`rounded-xl px-5 py-2 font-medium transition duration-200 ${
          filter === "all"
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={`rounded-xl px-5 py-2 font-medium transition duration-200 ${
          filter === "income"
            ? "bg-green-600 text-white shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => setFilter("income")}
      >
        Income
      </button>

      <button
        className={`rounded-xl px-5 py-2 font-medium transition duration-200 ${
          filter === "expense"
            ? "bg-red-600 text-white shadow-md"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => setFilter("expense")}
      >
        Expense
      </button>
      <input
        className="ml-auto rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
        type="text"
        placeholder="Search description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="ml-auto rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="recent">Recent</option>
        <option value="oldest">Oldest</option>
        <option value="amountHigh">Amount (High to Low)</option>
        <option value="amountLow">Amount (Low to High)</option>
      </select>
    </div>
  );
};

export default CashModes;
