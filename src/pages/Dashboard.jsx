import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Target, ArrowRight } from "lucide-react";
import CashModes from "../Components/CashModes";
import DashboardHeader from "../Components/DashboardHeader";
import SummaryCard from "../Components/SummaryCard";
import PieChartCard from "../Components/PieChartCard";
import InsightCard from "../Components/InsightCard";
import useDashboard from "../hooks/useDashboard";
import useModal from "../hooks/useModal";
import useRouteFilterReset from "../hooks/useRouteFilterReset";
import { useCash } from "../context/CashContext";
import { useGoals } from "../context/GoalsContext";
import { formatCurrency, getMonthName } from "../Utils/formatters";
import { getTransactionsByPeriod } from "../features/dashboard/calculations";
import { calculateGoalProgress } from "../Utils/goalEngine";

// Tooltip customizado para o gráfico de barras
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 shadow-xl text-xs">
      <p className="mb-1.5 font-medium text-slate-300">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: entry.fill }} />
          <span className="text-slate-400">{entry.name}:</span>
          <span className="font-semibold text-white">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const {
    balanceValue,
    summaryCards,
    investmentSummary,
    recentTransactions,
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
  } = useDashboard();

  const { openTransactionModal } = useModal();
  const { transactions } = useCash();
  const { goals } = useGoals();

  useRouteFilterReset({ resetSearch: true, resetShowAllPeriods: false });

  // Dados para o gráfico de receitas x despesas dos últimos 6 meses
  const barChartData = useMemo(() => {
    const today = new Date();
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const period = { month: d.getMonth() + 1, year: d.getFullYear() };
      const periodTxs = getTransactionsByPeriod(transactions, period);

      const income = periodTxs
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

      const expense = periodTxs
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

      months.push({
        name: getMonthName(period.month),
        Receitas: income,
        Despesas: expense,
      });
    }

    return months;
  }, [transactions]);

  // Resumo de metas para o widget do dashboard
  const goalsSummary = useMemo(() => {
    if (!goals || goals.length === 0) return null;
    const active = goals.filter((g) => calculateGoalProgress(g) < 100);
    const totalAccumulated = goals.reduce((sum, g) => sum + Number(g.currentAmount || 0), 0);
    const totalTarget = goals.reduce((sum, g) => sum + Number(g.targetAmount || 0), 0);
    const overallPct = totalTarget > 0 ? (totalAccumulated / totalTarget) * 100 : 0;
    return { activeCount: active.length, totalAccumulated, totalTarget, overallPct };
  }, [goals]);

  return (
    <>
      <DashboardHeader
        onAdd={handleOpenModal}
        onReset={() => {
          localStorage.clear();
          window.location.reload();
        }}
      />
      <CashModes />

      {/* ── Seção 1: Cards de resumo + portfólio ─────────────────── */}
      <section className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Resumo executivo</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Visão consolidada de {periodLabel}
            </h2>
          </div>
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
            Comparativo com o mês anterior
          </span>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="grid h-min content-start gap-4 sm:grid-cols-2">
            {summaryCards.map((card) => (
              <SummaryCard key={card.title} {...card} />
            ))}
          </div>

          {/* Widget de Portfólio */}
          <div className="rounded-[24px] border border-slate-800 bg-slate-950/70 p-5">
            <p className="text-sm text-slate-400">Resumo dos investimentos</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Performance do portfólio</h3>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-sm text-slate-400">Valor atual</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {formatCurrency(investmentSummary.currentValue)}
              </p>
              <p className="mt-3 text-xs text-slate-400">{investmentSummary.comparisonLabel}</p>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
              <div>
                <p className="text-sm text-slate-400">Variação</p>
                <p className={`mt-1 text-base font-semibold ${investmentSummary.isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                  {investmentSummary.isPositive ? "+" : "-"}{formatCurrency(Math.abs(investmentSummary.variationAmount))}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${investmentSummary.isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                {investmentSummary.isPositive ? "▲" : "▼"} {Math.abs(investmentSummary.variationPercent).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Seção 2: Gráfico receitas x despesas ─────────────────── */}
      <section className="mt-6 rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Evolução financeira</p>
            <h3 className="mt-1 text-xl font-semibold text-white">Receitas × Despesas</h3>
          </div>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
            Últimos 6 meses
          </span>
        </div>

        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} barCategoryGap="30%" barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#1e293b50" }} />
              <Bar dataKey="Receitas" fill="#34d399" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Despesas" fill="#f87171" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ── Seção 3: Distribuição de despesas + Insights/Recentes ─── */}
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <PieChartCard
          title="Distribuição das despesas"
          data={pieData}
          subtitle={
            topCategory !== "Nenhuma despesa"
              ? `Categoria principal: ${topCategory}`
              : "Nenhuma despesa neste período"
          }
        />

        <div className="grid gap-6">
          {/* Widget de Insights Financeiros */}
          <InsightCard
            balance={balanceValue.toFixed(2)}
            goal={goal}
            nextDue={nextDue}
            tip={tip}
            prediction={prediction}
            investments={[]}
            totalInvested={investmentSummary.currentValue}
            totalCurrentValue={investmentSummary.currentValue}
            totalProfit={investmentSummary.variationAmount}
            profitabilityPercentage={investmentSummary.variationPercent}
          />

          {/* Widget de Atividades Recentes */}
          <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Últimas movimentações</p>
                <h3 className="mt-1 text-lg font-semibold text-white">Atividades recentes</h3>
              </div>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                {recentTransactions.length} itens
              </span>
            </div>

            <div className="space-y-2">
              {recentTransactions.length === 0 ? (
                <p className="py-6 text-center text-sm text-slate-500">
                  Nenhuma movimentação neste período
                </p>
              ) : (
                recentTransactions.map((item) => {
                  const isIncome = item.type === "income";
                  const isInvestment = item.type === "investment";
                  const amountColor = isIncome
                    ? "text-emerald-400"
                    : isInvestment
                    ? "text-cyan-400"
                    : "text-rose-400";
                  const bgColor = isIncome
                    ? "bg-emerald-500/10"
                    : isInvestment
                    ? "bg-cyan-500/10"
                    : "bg-rose-500/10";

                  return (
                    <div
                      key={item.id}
                      onClick={() => openTransactionModal(item)}
                      className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 transition-colors hover:bg-slate-800/60"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`h-2 w-2 shrink-0 rounded-full ${bgColor} border ${isIncome ? "border-emerald-500/30" : isInvestment ? "border-cyan-500/30" : "border-rose-500/30"}`} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">
                            {item.description}
                          </p>
                          <p className="text-xs text-slate-500">
                            {item.category || "Sem categoria"}
                          </p>
                        </div>
                      </div>
                      <div className="ml-3 shrink-0 text-right">
                        <p className={`text-sm font-semibold ${amountColor}`}>
                          {isIncome ? "+" : "-"}{formatCurrency(item.amount)}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {new Date(item.date + "T12:00:00").toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Seção 4: Resumo de metas ────────────────────────────── */}
      {goalsSummary && (
        <section className="mt-6 rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
                <Target size={18} className="text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Planejamento</p>
                <h3 className="text-lg font-semibold text-white">Metas Financeiras</h3>
              </div>
            </div>
            <Link
              to="/metas"
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:border-amber-500/40 hover:text-amber-400"
            >
              Ver metas <ArrowRight size={12} />
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-950/60 px-4 py-3">
              <p className="text-xs text-slate-500">Metas ativas</p>
              <p className="mt-1 text-xl font-bold text-white">{goalsSummary.activeCount}</p>
            </div>
            <div className="rounded-2xl bg-slate-950/60 px-4 py-3">
              <p className="text-xs text-slate-500">Acumulado</p>
              <p className="mt-1 text-xl font-bold text-amber-400">
                {formatCurrency(goalsSummary.totalAccumulated)}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-950/60 px-4 py-3">
              <p className="text-xs text-slate-500">Progresso geral</p>
              <p className="mt-1 text-xl font-bold text-white">
                {goalsSummary.overallPct.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Mini barra de progresso */}
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-700"
              style={{ width: `${Math.min(goalsSummary.overallPct, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {formatCurrency(goalsSummary.totalAccumulated)} de{" "}
            {formatCurrency(goalsSummary.totalTarget)} em objetivos
          </p>
        </section>
      )}

      {/* Confirmação de exclusão */}
      {pendingDeleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/60">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-400">
              Confirmar exclusão
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Deseja excluir este registro?
            </h3>
            <p className="mt-2 text-sm text-slate-400">Esta ação não poderá ser desfeita.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
