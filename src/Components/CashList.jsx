import React from "react";
import CashItem from "./CashItem";

const CashList = ({
  data = [],
  removeData,
  setSelectedTransaction,
  handleEdit,
}) => {
  console.log(
    "CashList",
    data.map((item) => item.id),
  );
  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Transaction List</h2>

        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
          {data.length} transactions
        </span>
      </div>

      <div className="space-y-4">
        {data.length > 0 ? (
          data.map((transaction) => (
            <CashItem
              key={transaction.id}
              data={transaction}
              removeData={removeData}
              setSelectedTransaction={setSelectedTransaction}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            No transactions yet
          </div>
        )}
      </div>
    </div>
  );
};

export default CashList;
