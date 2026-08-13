import { useMemo, useState } from "react";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import useCash from "./useCash";
import useDate from "./useDate";
import useFilters from "./useFilters";
import useModal from "./useModal";
import useToast from "./useToast";
import {
  calculateDashboardSummary,
  getPreviousPeriod,
  getTransactionsByPeriod,
} from "../features/dashboard/calculations";

const monthNames = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

// Hook responsável por reunir os dados e as ações da tela principal do dashboard.
const useDashboard = () => {
  const { transactions, removeTransaction } = useCash();
  const { filter, search, sortBy } = useFilters();
  const { openModal } = useModal();
  const { showToast } = useToast();
  const { selectedPeriod } = useDate();
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const periodTransactions = useMemo(
    () => getTransactionsByPeriod(transactions, selectedPeriod),
    [transactions, selectedPeriod],
  );

  const filteredData = useMemo(
    () =>
      periodTransactions.filter((item) => {
        const description = item.description ?? item.nome ?? "";
        const matchesFilter = filter === "all" || item.type === filter;
        const matchesSearch = description.toLowerCase().includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
      }),
    [periodTransactions, filter, search],
  );

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

  const summary = useMemo(
    () => calculateDashboardSummary(transactions, selectedPeriod),
    [transactions, selectedPeriod],
  );

  const pieData = useMemo(
    () =>
      Object.entries(summary.categoryTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([label, value]) => ({ label, value })),
    [summary.categoryTotals],
  );

  const previousPeriod = useMemo(() => getPreviousPeriod(selectedPeriod), [selectedPeriod]);
  const periodLabel = `${monthNames[selectedPeriod.month - 1]} ${selectedPeriod.year}`;
  const previousPeriodLabel = `${monthNames[previousPeriod.month - 1]} ${previousPeriod.year}`;

  const summaryCards = [
    {
      title: "Saldo Atual",
      icon: Wallet,
      accent: "bg-cyan-500",
      currentValue: summary.balance.currentValue,
      previousValue: summary.balance.previousValue,
      variationAmount: summary.balance.difference,
      variationPercent: summary.balance.percent,
      isPositive: summary.balance.isPositive,
      comparisonLabel: `Comparado com ${previousPeriodLabel}`,
    },
    {
      title: "Receitas do período",
      icon: TrendingUp,
      accent: "bg-emerald-500",
      currentValue: summary.income.currentValue,
      previousValue: summary.income.previousValue,
      variationAmount: summary.income.difference,
      variationPercent: summary.income.percent,
      isPositive: summary.income.isPositive,
      comparisonLabel: `Comparado com ${previousPeriodLabel}`,
    },
    {
      title: "Despesas do período",
      icon: TrendingDown,
      accent: "bg-rose-500",
      currentValue: summary.expense.currentValue,
      previousValue: summary.expense.previousValue,
      variationAmount: summary.expense.difference,
      variationPercent: summary.expense.percent,
      isPositive: summary.expense.isPositive,
      comparisonLabel: `Comparado com ${previousPeriodLabel}`,
    },
    {
      title: "Economia",
      icon: PiggyBank,
      accent: "bg-sky-500",
      currentValue: summary.economy.currentValue,
      previousValue: summary.economy.previousValue,
      variationAmount: summary.economy.difference,
      variationPercent: summary.economy.percent,
      isPositive: summary.economy.isPositive,
      comparisonLabel: `Comparado com ${previousPeriodLabel}`,
    },
  ];

  const topCategory = pieData[0]?.label ?? "Nenhuma despesa";

  const investmentSummary = {
    title: "Resumo dos investimentos",
    currentValue: summary.investment.currentValue,
    previousValue: summary.investment.previousValue,
    variationAmount: summary.investment.difference,
    variationPercent: summary.investment.percent,
    isPositive: summary.investment.isPositive,
    comparisonLabel: `Comparado com ${previousPeriodLabel}`,
  };

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
  const prediction = (summary.balance.currentValue + summary.income.currentValue * 0.08).toFixed(2);
  const goal = 30;
  const nextDue = "Cartão - 27/05";
  const tip = "Revise as assinaturas e priorize reservas para gastos recorrentes.";

  return {
    balanceValue: summary.balance.currentValue,
    summaryCards,
    investmentSummary,
    recentTransactions: summary.recentTransactions.slice(0, 5),
    sortedData,
    pieData,
    topCategory,
    periodLabel,
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