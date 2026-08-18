import { useMemo } from "react";
import { useCash } from "../context/CashContext";
import { useDate } from "../context/DateContext";
import {
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

const safeNumber = (value) => Number(value || 0);

const getComparison = (currentValue, previousValue, positiveIsHigher = true) => {
  const difference = currentValue - previousValue;
  const percent = previousValue === 0 ? 0 : (difference / previousValue) * 100;
  const isPositive = positiveIsHigher ? difference >= 0 : difference <= 0;

  return { currentValue, previousValue, difference, percent, isPositive };
};

const getPeriodAmounts = (transactions, period) => {
  const periodTransactions = getTransactionsByPeriod(transactions, period);

  const income = periodTransactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + safeNumber(item.amount), 0);

  const expense = periodTransactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + safeNumber(item.amount), 0);

  const investments = periodTransactions.filter((item) => item.type === "investment");
  const invested = investments.reduce((sum, item) => sum + safeNumber(item.amount), 0);
  const currentValue = investments.reduce(
    (sum, item) => sum + safeNumber(item.currentValue ?? item.amount),
    0,
  );

  const balance = income - expense;
  const economy = income > 0 ? (balance / income) * 100 : 0;
  const profit = currentValue - invested;

  return {
    income,
    expense,
    balance,
    economy,
    invested,
    currentValue,
    profit,
    categoryTotals: periodTransactions
      .filter((item) => item.type === "expense")
      .reduce((acc, item) => {
        const category = item.category || "Outros";
        acc[category] = (acc[category] || 0) + safeNumber(item.amount);
        return acc;
      }, {}),
  };
};

const buildHistory = (transactions, selectedPeriod, months = 6) => {
  const history = [];

  for (let offset = months - 1; offset >= 0; offset -= 1) {
    const date = new Date(selectedPeriod.year, selectedPeriod.month - 1 - offset, 1);
    const period = {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };

    const totals = getPeriodAmounts(transactions, period);
    history.push({
      key: `${period.year}-${String(period.month).padStart(2, "0")}`,
      label: monthNames[period.month - 1],
      year: period.year,
      income: totals.income,
      expense: totals.expense,
      balance: totals.balance,
      economy: totals.economy,
      invested: totals.invested,
      currentValue: totals.currentValue,
      profit: totals.profit,
    });
  }

  return history;
};

export const useReports = () => {
  const { transactions } = useCash();
  const { selectedPeriod, prevMonth, nextMonth } = useDate();

  const previousPeriod = useMemo(
    () => getPreviousPeriod(selectedPeriod),
    [selectedPeriod],
  );

  const currentPeriodSummary = useMemo(
    () => getPeriodAmounts(transactions, selectedPeriod),
    [transactions, selectedPeriod],
  );

  const previousPeriodSummary = useMemo(
    () => getPeriodAmounts(transactions, previousPeriod),
    [transactions, previousPeriod],
  );

  const historyData = useMemo(
    () => buildHistory(transactions, selectedPeriod, 6),
    [transactions, selectedPeriod],
  );

  const expenseCategoryData = useMemo(() => {
    const entries = Object.entries(currentPeriodSummary.categoryTotals || {})
      .sort(([, a], [, b]) => Number(b) - Number(a))
      .map(([label, value]) => ({
        label,
        value: Number(value),
      }));

    const total = entries.reduce((sum, item) => sum + item.value, 0);

    return entries.map((item) => ({
      ...item,
      percent: total > 0 ? (item.value / total) * 100 : 0,
    }));
  }, [currentPeriodSummary.categoryTotals]);

  const summaryCards = useMemo(
    () => [
      {
        key: "income",
        label: "Total de Receitas",
        value: currentPeriodSummary.income,
        comparison: getComparison(
          currentPeriodSummary.income,
          previousPeriodSummary.income,
          true,
        ),
        accent: "emerald",
      },
      {
        key: "expense",
        label: "Total de Despesas",
        value: currentPeriodSummary.expense,
        comparison: getComparison(
          currentPeriodSummary.expense,
          previousPeriodSummary.expense,
          false,
        ),
        accent: "rose",
      },
      {
        key: "balance",
        label: "Saldo do período",
        value: currentPeriodSummary.balance,
        comparison: getComparison(
          currentPeriodSummary.balance,
          previousPeriodSummary.balance,
          true,
        ),
        accent: "cyan",
      },
      {
        key: "economy",
        label: "Taxa de economia",
        value: currentPeriodSummary.economy,
        comparison: getComparison(
          currentPeriodSummary.economy,
          previousPeriodSummary.economy,
          true,
        ),
        accent: "amber",
      },
      {
        key: "investment",
        label: "Total Investido",
        value: currentPeriodSummary.invested,
        comparison: getComparison(
          currentPeriodSummary.invested,
          previousPeriodSummary.invested,
          true,
        ),
        accent: "violet",
      },
    ],
    [currentPeriodSummary, previousPeriodSummary],
  );

  const investmentSummary = useMemo(() => {
    const totalInvested = transactions
      .filter((item) => item.type === "investment")
      .reduce((sum, item) => sum + safeNumber(item.amount), 0);

    const totalCurrentValue = transactions
      .filter((item) => item.type === "investment")
      .reduce(
        (sum, item) => sum + safeNumber(item.currentValue ?? item.amount),
        0,
      );

    const profit = totalCurrentValue - totalInvested;
    const profitability = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;

    return {
      totalInvested,
      totalCurrentValue,
      profit,
      profitability,
    };
  }, [transactions]);

  const insights = useMemo(() => {
    const lines = [];
    const expandedTotal = expenseCategoryData.reduce((sum, item) => sum + item.value, 0);
    const topCategory = expenseCategoryData[0];

    if (currentPeriodSummary.expense > 0 && previousPeriodSummary.expense > 0) {
      const expenseDelta = getComparison(
        currentPeriodSummary.expense,
        previousPeriodSummary.expense,
        false,
      );
      const signal = expenseDelta.isPositive ? "diminuíram" : "aumentaram";
      lines.push(
        `Suas despesas ${signal} ${Math.abs(expenseDelta.percent).toFixed(1).replace(".", ",")}% em relação ao mês anterior.`,
      );
    }

    if (topCategory) {
      const share = topCategory.percent || 0;
      lines.push(
        `${topCategory.label} representa ${share.toFixed(1).replace(".", ",")}% das suas despesas.`,
      );
    }

    if (currentPeriodSummary.income > 0) {
      lines.push(
        `Você economizou ${currentPeriodSummary.economy.toFixed(1).replace(".", ",")}% da sua renda neste período.`,
      );
    }

    if (currentPeriodSummary.expense > 0 && topCategory) {
      lines.push(
        `Seu maior gasto foi ${topCategory.label}.`,
      );
    }

    if (investmentSummary.profit !== 0) {
      const direction = investmentSummary.profit >= 0 ? "cresceram" : "caíram";
      lines.push(
        `Seus investimentos ${direction} ${Math.abs(investmentSummary.profit).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} no período.`,
      );
    }

    if (!expandedTotal && !topCategory && currentPeriodSummary.income === 0 && currentPeriodSummary.expense === 0) {
      lines.push("Ainda não há movimentações para este período. Adicione transações para gerar insights automáticos.");
    }

    return lines.slice(0, 5);
  }, [currentPeriodSummary, previousPeriodSummary, expenseCategoryData, investmentSummary]);

  return {
    selectedPeriod,
    prevMonth,
    nextMonth,
    summaryCards,
    historyData,
    expenseCategoryData,
    investmentSummary,
    insights,
    currentPeriodSummary,
    previousPeriodSummary,
  };
};

export default useReports;
