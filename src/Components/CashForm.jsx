import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const CashForm = ({
  addData,
  editData,
  editingTransaction,
  setSelectedTransaction,
  setShowForm,
  setEditingTransaction,
}) => {
  /**
   * O estado formData é usado para armazenar os valores dos campos do formulário,
   * incluindo a descrição, valor, data e tipo da transação. O handleSubmit é a função que é chamada quando o formulário
   * é enviado, criando um novo objeto de transação com os dados do formulário e chamando a função addData
   * para adicionar a transação à lista. Após o envio, o estado formData é resetado para os valores iniciais,
   * permitindo que o usuário adicione uma nova transação facilmente.
   */
  const [formData, setFormData] = React.useState({
    id: Math.random().toString(36).substr(2, 9),
    description: "",
    amount: "",
    date: "",
    type: "income",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.date) {
      alert("Please fill in all fields");
      return;
    }
    const newTransaction = {
      id: formData.id,
      description: formData.description,
      amount: formData.amount,
      date: formData.date,
      type: formData.type,
    };
    if (editingTransaction) {
      editData(editingTransaction.id, newTransaction);
    }else {
      addData(newTransaction);
    }
    setFormData({
      id: Math.random().toString(36).substr(2, 9),
      description: "",
      amount: "",
      date: "",
      type: "income",
    });
    setEditingTransaction(null);
    setShowForm(false);
  };

  useEffect(() => {
    if (editingTransaction) {
      setFormData(editingTransaction);
    }
  }, [editingTransaction]);

  return (
    <form
      className="space-y-5 rounded-2xl bg-white p-6 shadow-lg border border-gray-200"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          className="mb-2 block text-sm font-medium text-gray-700"
          htmlFor="description"
        >
          Description
        </label>

        <input
          type="text"
          id="description"
          name="description"
          placeholder="Enter transaction description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-medium text-gray-700"
          htmlFor="amount"
        >
          Amount
        </label>

        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="0.00"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-medium text-gray-700"
          htmlFor="date"
        >
          Date
        </label>

        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-medium text-gray-700"
          htmlFor="type"
        >
          Type
        </label>

        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:-translate-y-1 hover:bg-blue-700"
      >
        {editingTransaction ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default CashForm;
