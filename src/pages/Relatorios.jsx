import {
  ArrowLeft,
  ArrowRight,
  PiggyBank,
  TrendingDown,
  TrendingUp,
  Wallet,
  Landmark,
} from "lucide-react";
import ReportSummaryCard from "../Components/reports/ReportSummary";
import MonthlyEvolutionChart from "../Components/reports/MonthlyEvolutionChart";
import IncomeExpenseChart from "../Components/reports/IncomeExpenseChart";
import ExpenseCategoryChart from "../Components/reports/ExpenseCategoryChart";
import InvestmentPerformance from "../Components/reports/InvestmentPerformance";
import FinancialInsights from "../Components/reports/FinancialInsights";
import EconomyTrendChart from "../Components/reports/EconomyTrendChart";
import useReports from "../hooks/useReports";

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

const summaryIcons = {
  income: TrendingUp,
  expense: TrendingDown,
  balance: Wallet,
  economy: PiggyBank,
  investment: Landmark,
};

const Relatorios = () => {
  const {
    selectedPeriod,
    prevMonth,
    nextMonth,
    summaryCards,
    historyData,
    expenseCategoryData,
    investmentSummary,
    insights,
  } = useReports();

  const monthLabel = `${monthNames[selectedPeriod.month - 1]} ${selectedPeriod.year}`;
  const hasContent = historyData.some((item) => item.income || item.expense || item.balance || item.invested);

  const investmentChartData = historyData.map((item) => ({
    label: item.label,
    investido: item.invested,
    valorAtual: item.currentValue,
  }));

  return (
    <div className="space-y-6 pb-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-400/80">Relatórios</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Análise financeira histórica</h1>
          <p className="mt-1 text-sm text-slate-400">Evolução, comparação entre períodos e comportamento financeiro ao longo do tempo.</p>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-2 shadow-lg shadow-slate-950/20">
          <button
            type="button"
            onClick={prevMonth}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition hover:border-slate-500 hover:text-white"
            aria-label="Mês anterior"
          >
            <ArrowLeft size={14} />
          </button>
          <span className="min-w-[94px] text-center text-sm font-medium text-white">{monthLabel}</span>
          <button
            type="button"
            onClick={nextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 transition hover:border-slate-500 hover:text-white"
            aria-label="Próximo mês"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {summaryCards.map((card) => {
          const Icon = summaryIcons[card.key] || Wallet;

          return (
            <ReportSummaryCard
              key={card.key}
              label={card.label}
              value={card.value}
              comparison={card.comparison}
              accent={card.accent}
              icon={Icon}
              type={card.key}
            />
          );
        })}
      </div>

      {!hasContent ? (
        <div className="rounded-[28px] border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center">
          <p className="text-xl font-semibold text-white">Ainda não há dados para análise</p>
          <p className="mt-2 text-sm text-slate-400">Adicione receitas, despesas ou investimentos para gerar o relatório financeiro.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 xl:grid-cols-2">
            <MonthlyEvolutionChart data={historyData.map((item) => ({
              label: item.label,
              income: item.income,
              expense: item.expense,
              balance: item.balance,
            }))} />
            <IncomeExpenseChart data={historyData.map((item) => ({
              label: item.label,
              income: item.income,
              expense: item.expense,
            }))} />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <ExpenseCategoryChart data={expenseCategoryData.map((item) => ({
              label: item.label,
              value: item.value,
              percent: item.percent,
            }))} />
            <div className="space-y-6">
              <InvestmentPerformance data={investmentChartData} summary={investmentSummary} />
              <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Taxa de economia</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">Evolução histórica</h3>
                  </div>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
                    Mensal
                  </span>
                </div>

                <div className="mb-4 flex items-end justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Atual</p>
                    <p className="mt-2 text-3xl font-bold text-amber-300">
                      {historyData.at(-1)?.economy?.toFixed(1)?.replace(".", ",") ?? "0,0"}%
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
                    {historyData.at(-1)?.economy >= historyData.at(-2)?.economy ? "↑" : "↓"} {(Math.abs((historyData.at(-1)?.economy || 0) - (historyData.at(-2)?.economy || 0))).toFixed(1).replace(".", ",")}%
                  </span>
                </div>

                <EconomyTrendChart data={historyData.map((item) => ({
                  label: item.label,
                  economy: Number(item.economy || 0),
                  income: Number(item.income || 0),
                }))} />
              </div>
            </div>
          </div>

          <FinancialInsights insights={insights} />
        </>
      )}
    </div>
  );
};

export default Relatorios;
