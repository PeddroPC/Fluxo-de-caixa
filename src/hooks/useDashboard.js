import { useMemo, useState } from "react";
import useCash from "./useCash";
import useFilters from "./useFilters";
import useModal from "./useModal";
import useToast from "./useToast";

// Hook responsável por reunir os dados e as ações da tela principal do dashboard.
const useDashboard = () => {
  // Consome os estados globais compartilhados pelos providers de cash, filtros, modal e toast.
  const { transactions, removeTransaction, totalIncome, totalExpense, balance } = useCash();
  const { filter, search, sortBy } = useFilters();
  const { openModal } = useModal();
  const { showToast } = useToast();
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Filtra as movimentações com base no tipo e no texto digitado na busca.
  const filteredData = useMemo(
    () =>
      transactions.filter((item) => {
        const matchesFilter = filter === "all" || item.type === filter;
        const matchesSearch = item.description.toLowerCase().includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
      }),
    [transactions, filter, search],
  );

  // Ordena as movimentações filtradas conforme a seleção do usuário.
  const sortedData = useMemo(
    () =>
      [...filteredData].sort((a, b) => {
        if (sortBy === "recent") {
          return new Date(b.date) - new Date(a.date);
        }

        if (sortBy === "oldest") {
          return new Date(a.date) - new Date(b.date);
        }

        if (sortBy === "amountHigh") {
          return Number(b.amount) - Number(a.amount);
        }

        if (sortBy === "amountLow") {
          return Number(a.amount) - Number(b.amount);
        }

        return 0;
      }),
    [filteredData, sortBy],
  );

  // Agrupa os valores por categoria para alimentar o gráfico de despesas.
  const categoryTotals = useMemo(
    () =>
      transactions.reduce((acc, item) => {
        const category = item.category || "Outros";
        acc[category] = (acc[category] || 0) + Number(item.amount);
        return acc;
      }, {}),
    [transactions],
  );

  // Converte o agrupamento em um formato pronto para o componente do gráfico.
  const pieData = useMemo(
    () =>
      Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([label, value]) => ({ label, value })),
    [categoryTotals],
  );

  const handleOpenModal = () => openModal(null);
  const handleDeleteRequest = (id) => setPendingDeleteId(id);

  const confirmDelete = () => {
    if (pendingDeleteId) {
      removeTransaction(pendingDeleteId);
      showToast("Registro excluído com sucesso", "success");
    }

    setPendingDeleteId(null);
  };

  const cancelDelete = () => setPendingDeleteId(null);
  const prediction = (balance + totalIncome * 0.08).toFixed(2);
  const goal = 30;
  const nextDue = "Cartão - 27/05";
  const tip = "Revise as assinaturas e priorize reservas para gastos recorrentes.";

  return {
    balance,
    totalIncome,
    totalExpense,
    sortedData,
    pieData,
    pendingDeleteId,
    handleOpenModal,
    handleDeleteRequest,
    confirmDelete,
    cancelDelete,
    prediction,
    goal,
    nextDue,
    tip,
  };
};

export default useDashboard;