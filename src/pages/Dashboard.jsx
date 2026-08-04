import React from "react";
import CashForm from "../Components/CashForm";
import CashModes from "../Components/CashModes";
import DashboardHeader from "../Components/DashboardHeader";
import SummaryCard from "../Components/SummaryCard";
import PieChartCard from "../Components/PieChartCard";
import InsightCard from "../Components/InsightCard";
import useDashboard from "../hooks/useDashboard";
import useModal from "../hooks/useModal";
import CashList from "../Components/CashList";
import TransactionDetailsModal from "../Components/TransactionDetailsModal";

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

  const { isOpen, selectedTransaction, closeModal } = useModal();

  return (
    <>
      <DashboardHeader onAdd={handleOpenModal} onReset={() => { localStorage.clear(); window.location.reload(); }} />
      <CashModes />

      <section className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Resumo executivo</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Visão consolidada de {periodLabel}</h2>
          </div>
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-300">
            Comparativo com o mês anterior
          </span>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="grid h-min content-start gap-4 sm:grid-cols-2">
            {summaryCards.map((card) => (
              <SummaryCard key={card.title} {...card} />
            ))}
          </div>

          <div className="rounded-[24px] border border-slate-800 bg-slate-950/70 p-5">
            <p className="text-sm text-slate-400">Resumo dos investimentos</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Performance do portfólio</h3>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-sm text-slate-400">Valor atual</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                R$ {investmentSummary.currentValue.toFixed(2)}
              </p>
              <p className="mt-3 text-sm text-slate-400">{investmentSummary.comparisonLabel}</p>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
              <div>
                <p className="text-sm text-slate-400">Variação</p>
                <p className={`mt-1 text-base font-semibold ${investmentSummary.isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                  {investmentSummary.isPositive ? "+" : "-"}R$ {Math.abs(investmentSummary.variationAmount).toFixed(2)}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${investmentSummary.isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                {investmentSummary.isPositive ? "▲" : "▼"} {Math.abs(investmentSummary.variationPercent).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <PieChartCard
          title="Distribuição das despesas"
          data={pieData}
          subtitle={topCategory !== "Nenhuma despesa" ? `Categoria principal: ${topCategory}` : "Nenhuma despesa neste período"}
        />

        <div className="grid gap-6">
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

          <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Últimas movimentações</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Atividades recentes</h3>
              </div>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
                {recentTransactions.length} itens
              </span>
            </div>

            <div className="space-y-3">
              {recentTransactions.map((item) => {
                const isIncome = item.type === "income";
                const isInvestment = item.type === "investment";
                const amountColor = isIncome
                  ? "text-emerald-400"
                  : isInvestment
                    ? "text-cyan-400"
                    : "text-rose-400";

                return (
                  <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-white">{item.description}</p>
                      <p className="text-xs text-slate-500">{item.category || "Sem categoria"}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${amountColor}`}>
                        {isIncome ? "+" : "-"}R$ {Number(item.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(item.date).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {pendingDeleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/60">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-rose-400">Confirmar exclusão</p>
            <h3 className="mt-3 text-xl font-semibold text-white">Deseja excluir este registro?</h3>
            <p className="mt-2 text-sm text-slate-400">Esta ação não poderá ser desfeita.</p>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={cancelDelete} className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800">Cancelar</button>
              <button onClick={confirmDelete} className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600">Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 pt-20 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[32px] border border-slate-800 bg-slate-950 p-6 shadow-2xl shadow-slate-950/60 animate-slide-down">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">{selectedTransaction ? "Editar movimentação" : "Nova movimentação"}</h2>
              <button onClick={closeModal} className="text-slate-400 transition hover:text-white">✕</button>
            </div>

            <CashForm />
          </div>
        </div>
      )}

      <TransactionDetailsModal />
    </>
  );
};

export default Dashboard;
