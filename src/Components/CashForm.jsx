import React, { useEffect, useState, useRef } from "react";
import useCash from "../hooks/useCash";
import useModal from "../hooks/useModal";
import useToast from "../hooks/useToast";

const CashForm = () => {
  const { addTransaction, updateTransaction } = useCash();
  const { selectedTransaction, closeModal } = useModal();
  const { showToast } = useToast();

  const getInitialFormState = () => ({
    id: Math.random().toString(36).substr(2, 9),
    name: "",
    amount: "",
    date: "",
    type: "income",
    category: categories[14].id,
    observation: "",
  });

  const [formData, setFormData] = useState(getInitialFormState());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.date) {
      showToast("Preencha todos os campos", "error");
      return;
    }

    const payload = {
      id: formData.id,
      name: formData.name,
      amount: formData.amount,
      date: formData.date,
      type: formData.type,
      category: formData.category,
      observation: formData.observation,
    };

    if (selectedTransaction) {
      updateTransaction(selectedTransaction.id, payload);
      showToast("Movimentação atualizada com sucesso", "success");
    } else {
      addTransaction(payload);
      showToast("Movimentação adicionada", "success");
    }

    setFormData(getInitialFormState());
    closeModal();
  };

  useEffect(() => {
    if (selectedTransaction) {
      setFormData({
        id: selectedTransaction.id,
        description: selectedTransaction.description,
        amount: selectedTransaction.amount,
        date: selectedTransaction.date,
        type: selectedTransaction.type,
      });
    } else {
      setFormData(getInitialFormState());
    }
  }, [selectedTransaction]);
  const textareaRef = useRef(null);

  const handleObservationChange = (e) => {
    // 1. Atualiza o estado normalmente
    setFormData({ ...formData, observation: e.target.value });

    // 2. Lógica para expandir a altura automaticamente
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reseta a altura para calcular o novo tamanho
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajusta para o tamanho do texto
    }
  };
  const [categories, setCategories] = useState([
    { id: 1, name: "Salário" },
    { id: 2, name: "Freelance" },
    { id: 3, name: "Bônus" },
    { id: 4, name: "Receita" },
    { id: 5, name: "Mercado" },
    { id: 6, name: "Alimentação" },
    { id: 7, name: "Saúde" },
    { id: 8, name: "Moradia" },
    { id: 9, name: "Contas" },
    { id: 10, name: "Educação" },
    { id: 11, name: "Seguro" },
    { id: 12, name: "Transporte" },
    { id: 13, name: "Streaming" },
    { id: 14, name: "Outros" },
  ]);

  return (
    <form
      className="space-y-5 rounded-2xl bg-slate-800 p-6 shadow-lg border border-slate-700"
      onSubmit={handleSubmit}
    >
      {/* Container Grid para Tipo e Data lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        {/* Tipo */}
        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-300"
            htmlFor="type"
          >
            Tipo
          </label>

          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-3 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
          >
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>
        </div>

        {/* Data */}
        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-300"
            htmlFor="date"
          >
            Data
          </label>

          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-3 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      {/* nome */}
      <div>
        <label
          className="mb-2 block text-sm font-medium text-slate-300"
          htmlFor="name"
        >
          descrição
        </label>

        <input
          type="text"
          id="description"
          name="description"
          placeholder="Descrição da movimentação"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-3 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {/* Valor */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-300"
            htmlFor="amount"
          >
            Valor
          </label>

          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-3 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
          />
        </div>
        {/* Category */}
        <div>
          <label
            className="mb-2 block text-sm font-medium text-slate-300"
            htmlFor="category"
          >
            Categoria
          </label>

          <input
            type="text"
            id="category"
            name="category"
            placeholder="Categoria"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-3 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>
      {/* observation */}
      <div>
        <label
          className="mb-2 block text-sm font-medium text-slate-300"
          htmlFor="observation"
        >
          Observação
        </label>

        <textarea
          id="observation"
          name="observation"
          ref={textareaRef}
          rows={1} // Começa com o tamanho de 1 linha
          placeholder="Observação da movimentação"
          value={formData.observation || ""}
          onChange={handleObservationChange}
          className="w-full resize-none overflow-hidden rounded-xl border border-slate-700 bg-slate-700 px-4 py-3 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-primary px-4 py-3 font-medium text-white transition hover:brightness-95"
      >
        {selectedTransaction ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
};

export default CashForm;
