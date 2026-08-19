import React, { useEffect, useRef, useState } from "react";
import useCash from "../hooks/useCash";
import useModal from "../hooks/useModal";
import useToast from "../hooks/useToast";

const categories = [
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
];

const investmentTypes = [
  "Tesouro Direto",
  "CDB",
  "LCI",
  "LCA",
  "Fundos",
  "ETF",
  "Ações",
  "Criptomoedas",
  "Outros",
];

const defaultCategory = categories.find((cat) => cat.id === 14)?.name || "Outros";

const getInitialFormState = () => ({
  id: Math.random().toString(36).substr(2, 9),
  description: "",
  amount: "",
  date: "",
  type: "income",
  category: defaultCategory,
  observation: "",
  institution: "",
  investmentType: investmentTypes[0],
  profitability: "",
  currentValue: "",
  maturityDate: "",
});

// Formulário reutilizável para cadastro e edição de movimentações financeiras.
const CashForm = () => {
  const { addTransaction, updateTransaction } = useCash();
  const { selectedTransaction, closeModal, modalDefault } = useModal();
  const { showToast } = useToast();
  const textareaRef = useRef(null);
  const [formData, setFormData] = useState(getInitialFormState);

  const isInvestmentMode = formData.type === "investment";

  const handleTypeChange = (event) => {
    const nextType = event.target.value;

    setFormData((current) => ({
      ...current,
      type: nextType,
      category: nextType === "investment" ? "" : current.category || defaultCategory,
    }));
  };

  // Valida os campos obrigatórios antes de salvar ou atualizar a movimentação.
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount || !formData.date) {
      showToast("Preencha todos os campos para continuar", "error");
      return;
    }

    if (isInvestmentMode) {
      if (
        !formData.institution ||
        !formData.investmentType ||
        formData.profitability === ""
      ) {
        showToast("Preencha os dados essenciais do investimento", "error");
        return;
      }
    } else if (!formData.category) {
      showToast("Selecione uma categoria para continuar", "error");
      return;
    }

    const payload = {
      id: formData.id,
      description: formData.description,
      amount: formData.amount,
      date: formData.date,
      type: formData.type,
      observation: formData.observation,
      ...(isInvestmentMode
        ? {
            institution: formData.institution,
            investmentType: formData.investmentType,
            profitability: formData.profitability,
            currentValue: formData.currentValue,
            maturityDate: formData.maturityDate,
          }
        : { category: formData.category }),
    };

    if (selectedTransaction) {
      updateTransaction(selectedTransaction.id, payload);
      showToast("Movimentação atualizada com sucesso", "success");
    } else {
      addTransaction(payload);
      showToast("Cadastro realizado com sucesso", "success");
    }

    setFormData(getInitialFormState());
    closeModal();
  };

  // Quando a modal entra em modo de edição, preenche o formulário com os dados da transação selecionada.
  // Quando aberta com modalDefault, usa o tipo pré-definido (ex: 'income' ou 'expense').
  useEffect(() => {
    if (selectedTransaction) {
      setFormData({
        id: selectedTransaction.id,
        description: selectedTransaction.description ?? selectedTransaction.nome ?? "",
        amount: selectedTransaction.amount ?? "",
        date: selectedTransaction.date ?? "",
        type: selectedTransaction.type ?? "income",
        category: selectedTransaction.category || defaultCategory,
        observation: selectedTransaction.observation ?? "",
        institution: selectedTransaction.institution ?? "",
        investmentType: selectedTransaction.investmentType ?? investmentTypes[0],
        profitability: selectedTransaction.profitability ?? "",
        currentValue: selectedTransaction.currentValue ?? "",
        maturityDate: selectedTransaction.maturityDate ?? "",
      });
    } else {
      const initial = getInitialFormState();
      if (modalDefault?.type) {
        initial.type = modalDefault.type;
        // Ajusta categoria padrão ao tipo
        if (modalDefault.type === "investment") {
          initial.category = "";
        }
      }
      setFormData(initial);
    }
  }, [selectedTransaction, modalDefault]);

  // Atualiza a observação e ajusta a altura do textarea conforme o conteúdo cresce.
  const handleObservationChange = (e) => {
    setFormData({ ...formData, observation: e.target.value });

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const renderCategoryField = () => (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-slate-300"
        htmlFor="category"
      >
        Categoria
      </label>

      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={(e) =>
          setFormData({ ...formData, category: e.target.value })
        }
        className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-2 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
      >
        <option value="">Selecione uma categoria</option>

        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );

  const renderInvestmentFields = () => (
    <div className="space-y-3">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            className="mb-1 block text-sm font-medium text-slate-300"
            htmlFor="profitability"
          >
            Rentabilidade esperada (%)
          </label>

          <input
            type="number"
            id="profitability"
            name="profitability"
            step="0.01"
            placeholder="0.00"
            value={formData.profitability}
            onChange={(e) =>
              setFormData({ ...formData, profitability: e.target.value })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-2 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label
            className="mb-1 block text-sm font-medium text-slate-300"
            htmlFor="currentValue"
          >
            Valor atual (opcional)
          </label>

          <input
            type="number"
            id="currentValue"
            name="currentValue"
            step="0.01"
            placeholder="0.00"
            value={formData.currentValue}
            onChange={(e) =>
              setFormData({ ...formData, currentValue: e.target.value })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-2 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            className="mb-1 block text-sm font-medium text-slate-300"
            htmlFor="maturityDate"
          >
            Data de vencimento (opcional)
          </label>

          <input
            type="date"
            id="maturityDate"
            name="maturityDate"
            value={formData.maturityDate}
            onChange={(e) =>
              setFormData({ ...formData, maturityDate: e.target.value })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-2 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label
            className="mb-1 block text-sm font-medium text-slate-300"
            htmlFor="investmentType"
          >
            Tipo de investimento
          </label>

          <select
            id="investmentType"
            name="investmentType"
            value={formData.investmentType}
            onChange={(e) =>
              setFormData({ ...formData, investmentType: e.target.value })
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-2 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
          >
            {investmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <form
      className="space-y-3 rounded-2xl border border-slate-700 bg-slate-800 p-4 shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            className="mb-1 block text-sm font-medium text-slate-300"
            htmlFor="type"
          >
            Tipo
          </label>

          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleTypeChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-2 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
          >
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
            <option value="investment">Investimento</option>
          </select>
        </div>

        <div>
          <label
            className="mb-1 block text-sm font-medium text-slate-300"
            htmlFor="date"
          >
            {isInvestmentMode ? "Data do aporte" : "Data"}
          </label>

          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-2 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      <div>
        <label
          className="mb-1 block text-sm font-medium text-slate-300"
          htmlFor="description"
        >
          {isInvestmentMode ? "Descrição" : "Descrição"}
        </label>

        <input
          type="text"
          id="description"
          name="description"
          placeholder={
            isInvestmentMode
              ? "Descrição do aporte ou aplicação"
              : "Descrição da movimentação"
          }
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-2 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            className="mb-1 block text-sm font-medium text-slate-300"
            htmlFor="amount"
          >
            {isInvestmentMode ? "Valor aplicado" : "Valor"}
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
            className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-2 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
          />
        </div>

        {isInvestmentMode ? (
          <div>
            <label
              className="mb-1 block text-sm font-medium text-slate-300"
              htmlFor="institution"
            >
              Instituição financeira
            </label>

            <input
              type="text"
              id="institution"
              name="institution"
              placeholder="Banco, corretora ou plataforma"
              value={formData.institution}
              onChange={(e) =>
                setFormData({ ...formData, institution: e.target.value })
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-700 px-4 py-2 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
            />
          </div>
        ) : (
          renderCategoryField()
        )}
      </div>

      {isInvestmentMode && renderInvestmentFields()}

      <div>
        <label
          className="mb-1 block text-sm font-medium text-slate-300"
          htmlFor="observation"
        >
          Observação
        </label>

        <textarea
          id="observation"
          name="observation"
          ref={textareaRef}
          rows={1}
          placeholder="Observação da movimentação"
          value={formData.observation || ""}
          onChange={handleObservationChange}
          className="w-full resize-none overflow-hidden rounded-xl border border-slate-700 bg-slate-700 px-4 py-2 text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-primary bg-cyan-500 px-4 py-2 font-medium text-white transition shadow-cyan-500/20 hover:brightness-95"
      >
        {selectedTransaction ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
};

export default CashForm;