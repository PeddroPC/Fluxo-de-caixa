export const getPreviousPeriod = (period) => {
  const { month, year } = period;

  if (month === 1) {
    return { month: 12, year: year - 1 };
  }

  return { month: month - 1, year };
};

export const getTransactionsByPeriod = (transactions, period) =>
  transactions.filter((item) => {
    const date = new Date(item.date);

    return (
      date.getFullYear() === period.year &&
      date.getMonth() === period.month - 1
    );
  });

export const calculateComparison = (currentValue, previousValue) => {
  const difference = currentValue - previousValue;
  const percent = previousValue === 0 ? 0 : (difference / previousValue) * 100;

  return {
    currentValue,
    previousValue,
    difference,
    percent,
  };
};

export const calculateVariation = (currentValue, previousValue) => {
  const comparison = calculateComparison(currentValue, previousValue);
  const isPositive = comparison.difference >= 0;

  return {
    ...comparison,
    isPositive,
  };
};

export const calculateDashboardSummary = (transactions, selectedPeriod) => {
  const currentPeriod = getTransactionsByPeriod(transactions, selectedPeriod);
  const previousPeriod = getTransactionsByPeriod(
    transactions,
    getPreviousPeriod(selectedPeriod),
  );

  const currentIncome = currentPeriod.reduce(
    (sum, item) => (item.type === "income" ? sum + Number(item.amount || 0) : sum),
    0,
  );

  const currentExpense = currentPeriod.reduce(
    (sum, item) => (item.type === "expense" ? sum + Number(item.amount || 0) : sum),
    0,
  );

  const previousIncome = previousPeriod.reduce(
    (sum, item) => (item.type === "income" ? sum + Number(item.amount || 0) : sum),
    0,
  );

  const previousExpense = previousPeriod.reduce(
    (sum, item) => (item.type === "expense" ? sum + Number(item.amount || 0) : sum),
    0,
  );

  const currentBalance = currentIncome - currentExpense;
  const previousBalance = previousIncome - previousExpense;
  const currentEconomy = currentIncome - currentExpense;
  const previousEconomy = previousIncome - previousExpense;

  const currentInvestments = currentPeriod.filter((item) => item.type === "investment");
  const previousInvestments = previousPeriod.filter((item) => item.type === "investment");

  const currentInvested = currentInvestments.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );
  const previousInvested = previousInvestments.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const currentCurrentValue = currentInvestments.reduce(
    (sum, item) => sum + Number(item.currentValue ?? item.amount ?? 0),
    0,
  );
  const previousCurrentValue = previousInvestments.reduce(
    (sum, item) => sum + Number(item.currentValue ?? item.amount ?? 0),
    0,
  );

  const currentInvestmentProfit = currentCurrentValue - currentInvested;
  const previousInvestmentProfit = previousCurrentValue - previousInvested;

  const categoryTotals = currentPeriod.reduce((acc, item) => {
    if (item.type === "investment") {
      return acc;
    }

    const category = item.category || "Outros";
    acc[category] = (acc[category] || 0) + Number(item.amount);
    return acc;
  }, {});

  return {
    balance: calculateVariation(currentBalance, previousBalance),
    income: calculateVariation(currentIncome, previousIncome),
    expense: calculateVariation(currentExpense, previousExpense),
    economy: calculateVariation(currentEconomy, previousEconomy),
    investment: calculateVariation(currentInvestmentProfit, previousInvestmentProfit),
    categoryTotals,
    recentTransactions: [...currentPeriod].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    ),
  };
};
