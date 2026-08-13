import React, { useMemo, useState } from "react";
import useModal from "../hooks/useModal";
import { useCash } from "../context/CashContext";
import { useDate } from "../context/DateContext";
import { useFilters } from "../context/FilterContext";
import InvestmentFilters from "../Components/Investments/InvestmentFilters";
import InvestmentSummary from "../Components/Investments/InvestmentSummary";
import InvestmentList from "../Components/Investments/InvestmentList";
import InvestmentCharts from "../Components/Investments/InvestmentCharts";
import InvestmentInsights from "../Components/Investments/InvestmentInsights";
import useTransactionFilters from "../hooks/useTransactionFilters";
import useRouteFilterReset from "../hooks/useRouteFilterReset";

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

const investmentTypeMap = {
  "Ações": "Ações",
  "Fundos Imobiliários": "Fundo Imobiliário",
  Tesouro: "Renda Fixa",
  CDB: "Renda Fixa",
  LCI: "Renda Fixa",
  LCA: "Renda Fixa",
  ETF: "ETF",
  Criptomoedas: "Criptomoedas",
  Outros: "Outros",
};

const Investimentos = () => {
  const { openModal, openTransactionModal } = useModal();
  const { transactions } = useCash();
  const { prevMonth, nextMonth, selectedPeriod } = useDate();
  const { search, setSearch, showAllPeriods, setShowAllPeriods } = useFilters();
  const [investmentType, setInvestmentType] = useState("Todos");

  const filteredInvestments = useTransactionFilters({
    transactions,
    transactionType: "investment",
    predicate: (item) =>
      investmentType === "Todos" ||
      item.investmentType === investmentType ||
      (investmentType === "Outros" && !Object.values(investmentTypeMap).includes(item.investmentType)),
  });

  useRouteFilterReset({ resetSearch: true, resetShowAllPeriods: false });

  const totalInvested = useMemo(
    () => filteredInvestments.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [filteredInvestments],
  );

  const totalCurrentValue = useMemo(
    () => filteredInvestments.reduce((sum, item) => sum + Number(item.currentValue || 0), 0),
    [filteredInvestments],
  );

  const totalProfit = totalCurrentValue - totalInvested;
  const averageProfitability =
    filteredInvestments.length > 0
      ? filteredInvestments.reduce((sum, item) => sum + Number(item.profitability || 0), 0) /
        filteredInvestments.length
      : 0;

  const largestPosition = useMemo(
    () => filteredInvestments.reduce((prev, current) =>
      !prev || Number(current.amount || 0) > Number(prev.amount || 0) ? current : prev,
    null),
    [filteredInvestments],
  );

  const bestYield = useMemo(
    () => filteredInvestments.reduce((prev, current) =>
      !prev || Number(current.profitability || 0) > Number(prev.profitability || 0) ? current : prev,
    null),
    [filteredInvestments],
  );

  const worstYield = useMemo(
    () => filteredInvestments.reduce((prev, current) =>
      !prev || Number(current.profitability || 0) < Number(prev.profitability || 0) ? current : prev,
    null),
    [filteredInvestments],
  );

  const diversification = useMemo(() => {
    const counts = filteredInvestments.reduce((acc, item) => {
      const label = item.investmentType || "Outros";
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {});

    const total = Object.values(counts).reduce((sum, value) => sum + value, 0);

    return Object.entries(counts).map(([label, count]) => ({
      label,
      count,
      percentage: total > 0 ? ((count / total) * 100).toFixed(0) : 0,
    }));
  }, [filteredInvestments]);

  const patrimonyTimeline = useMemo(
    () => [
      { label: "Jan", value: 120000 },
      { label: "Fev", value: 126000 },
      { label: "Mar", value: 130000 },
      { label: "Abr", value: 136000 },
      { label: "Mai", value: 148000 },
      { label: "Jun", value: 154000 },
      { label: "Jul", value: 163000 },
      { label: "Ago", value: 169000 },
      { label: "Set", value: 176000 },
      { label: "Out", value: 182000 },
      { label: "Nov", value: 191000 },
      { label: "Dez", value: 197000 },
    ],
    [],
  );

  const distributionData = useMemo(() => {
    const amountByType = filteredInvestments.reduce((acc, item) => {
      const label = item.investmentType || "Outros";
      acc[label] = (acc[label] || 0) + Number(item.currentValue || item.amount || 0);
      return acc;
    }, {});

    const total = Object.values(amountByType).reduce((sum, value) => sum + value, 0);

    return Object.entries(amountByType).map(([label, value]) => ({
      label,
      value,
      percentage: total > 0 ? ((value / total) * 100).toFixed(0) : 0,
    }));
  }, [filteredInvestments]);

  const profitabilityData = useMemo(
    () => filteredInvestments.map((item) => ({
      label: item.description,
      value: Number(item.profitability || 0),
    })),
    [filteredInvestments],
  );

  const handleOpenInvestment = (investment) => {
    openTransactionModal(investment);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 lg:p-10 font-sans text-slate-100">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Investimentos</h1>
          <p className="mt-1 text-sm text-slate-400">
            Gerencie sua carteira e acompanhe a evolução do seu patrimônio.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openModal(null, { type: "Investimento" })}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 font-medium text-slate-950 shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-400"
        >
          <span>+</span> Novo Investimento
        </button>
      </div>

      <InvestmentSummary
        totalInvested={totalInvested}
        totalCurrentValue={totalCurrentValue}
        totalProfit={totalProfit}
        averageProfitability={averageProfitability}
      />

      <InvestmentFilters
        searchQuery={search}
        onSearchChange={setSearch}
        investmentType={investmentType}
        onInvestmentTypeChange={setInvestmentType}
        showAllPeriods={showAllPeriods}
        onToggleShowAllPeriods={() => setShowAllPeriods((current) => !current)}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        selectedPeriod={selectedPeriod}
      />

      {/* Gráficos reposicionados para cima com margem inferior para manter o respiro */}
      <div className="mb-8">
        <InvestmentCharts
          patrimonyTimeline={patrimonyTimeline}
          distributionData={distributionData}
          profitabilityData={profitabilityData}
        />
      </div>

      {/* Grid com Lista e Resumo reposicionado para baixo */}
      <div className="grid gap-6 xl:grid-cols-[0.7fr_0.3fr]">
        <InvestmentList
          investments={filteredInvestments}
          onOpenItem={handleOpenInvestment}
        />
        <InvestmentInsights
          largestPosition={largestPosition}
          bestYield={bestYield}
          worstYield={worstYield}
          diversification={diversification}
        />
      </div>
    </div>
  );
};

export default Investimentos;
