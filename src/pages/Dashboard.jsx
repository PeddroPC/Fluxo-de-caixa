import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Target, ArrowRight } from "lucide-react";

import DashboardHeader from "../Components/DashboardHeader";
import DashboardKpis from "../Components/dashboard/DashboardKpis";
import CashFlowChart from "../Components/dashboard/CashFlowChart";
import ExpenseDistributionChart from "../Components/dashboard/ExpenseDistributionChart";
import UpcomingBills from "../Components/dashboard/UpcomingBills";
import RecentTransactions from "../Components/dashboard/RecentTransactions";
import TransactionDetailsModal from "../Components/TransactionDetailsModal";

import useDashboard from "../hooks/useDashboard";
import useModal from "../hooks/useModal";
import useRouteFilterReset from "../hooks/useRouteFilterReset";
import { useGoals } from "../context/GoalsContext";
import { formatCurrency } from "../Utils/formatters";
import { calculateGoalProgress } from "../Utils/goalEngine";

/**
 * Dashboard principal do CashPilot.
 * Funciona como central de controle financeiro: o usuario deve conseguir
 * responder as principais perguntas financeiras em poucos segundos.
 *
 * Hierarquia visual:
 *   DINHEIRO -> FLUXO -> ALERTAS -> CONTEXTO -> ACAO
 */
const Dashboard = () => {
  const {
    summary,
    pieData,
    recentTransactions,
    cashFlowData,
    upcomingTransactions,
    upcomingTotal,
    hasOverdueItems,
    previousPeriodLabel,
    pendingDeleteId,
    openIncomeModal,
    openExpenseModal,
    confirmDelete,
    cancelDelete,
  } = useDashboard();

  const { openTransactionModal } = useModal();
  const { goals } = useGoals();

  useRouteFilterReset({ resetSearch: true, resetShowAllPeriods: false });

  // Resumo de metas para o widget compacto
  const goalsSummary = useMemo(() => {
    if (!goals || goals.length === 0) return null;
    const active = goals.filter((g) => calculateGoalProgress(g) < 100);
    const totalAccumulated = goals.reduce((sum, g) => sum + Number(g.currentAmount || 0), 0);
    const totalTarget = goals.reduce((sum, g) => sum + Number(g.targetAmount || 0), 0);
    const overallPct = totalTarget > 0 ? (totalAccumulated / totalTarget) * 100 : 0;
    return { activeCount: active.length, totalAccumulated, totalTarget, overallPct };
  }, [goals]);

  return (
    <div className="space-y-6">
      {/* 1. Header: saudacao + seletor de periodo + acoes rapidas */}
      <DashboardHeader
        onAddIncome={openIncomeModal}
        onAddExpense={openExpenseModal}
      />

      {/* 2. KPIs: os 4 indicadores financeiros principais */}
      <DashboardKpis
        summary={summary}
        upcomingCount={upcomingTransactions.length}
        upcomingTotal={upcomingTotal}
        previousPeriodLabel={previousPeriodLabel}
        hasOverdueItems={hasOverdueItems}
      />

      {/* 3. Graficos: Fluxo de Caixa + Distribuicao de despesas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <CashFlowChart data={cashFlowData} />
        <ExpenseDistributionChart pieData={pieData} />
      </div>

      {/* 4. Atividade: Proximos vencimentos + Ultimas movimentacoes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UpcomingBills
          transactions={upcomingTransactions}
          onTransactionClick={openTransactionModal}
        />
        <RecentTransactions
          transactions={recentTransactions}
          onTransactionClick={openTransactionModal}
        />
      </div>

      {/* 5. Widget de Metas (condicional — somente se houver metas cadastradas) */}
      {goalsSummary && (
        <section className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10">
                <Target size={17} className="text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Planejamento
                </p>
                <h3 className="text-base font-semibold text-white">Metas Financeiras</h3>
              </div>
            </div>
            <Link
              to="/metas"
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:border-amber-500/40 hover:text-amber-400"
            >
              Ver metas <ArrowRight size={12} />
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
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

          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-700"
              style={{ width: `${Math.min(goalsSummary.overallPct, 100)}%` }}
              role="progressbar"
              aria-valuenow={Math.round(goalsSummary.overallPct)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {formatCurrency(goalsSummary.totalAccumulated)} de{" "}
            {formatCurrency(goalsSummary.totalTarget)} em objetivos
          </p>
        </section>
      )}

      {/* Modal de detalhes de transacao */}
      <TransactionDetailsModal />

      {/* Confirmacao de exclusao */}
      {pendingDeleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/60">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-400">
              Confirmar exclusao
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Deseja excluir este registro?
            </h3>
            <p className="mt-2 text-sm text-slate-400">Esta acao nao podera ser desfeita.</p>
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
    </div>
  );
};

export default Dashboard;
