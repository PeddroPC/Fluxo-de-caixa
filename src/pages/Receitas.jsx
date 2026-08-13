import React, { useMemo } from "react";
import { Plus, TrendingUp, BarChart2, Layers, ArrowUpRight, ArrowDownRight } from "lucide-react";
import useModal from "../hooks/useModal";
import useFilteredTransactions from "../hooks/useFilteredTransactions";
import useRouteFilterReset from "../hooks/useRouteFilterReset";
import CashModes from "../Components/CashModes";
import PieChartCard from "../Components/PieChartCard";
import { useCash } from "../context/CashContext";
import { useDate } from "../context/DateContext";
import { formatCurrency, formatDate, getMonthName } from "../Utils/formatters";
import { getTransactionsByPeriod, getPreviousPeriod } from "../features/dashboard/calculations";

// Card de KPI com comparação semântica com mês anterior
const KpiCard = ({ label, value, icon: Icon, comparison, accentColor, subValue }) => {
  const diff = comparison?.difference ?? 0;
  const percent = comparison?.percent ?? 0;
  // Para receita: aumento = positivo; redução = negativo
  const isGood = diff >= 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentColor}/10`}>
          <Icon size={18} className={accentColor} />
        </div>
        {comparison && (
          <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${isGood ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
            {isGood ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
            {Math.abs(percent).toFixed(1)}%
          </span>
        )}
      </div>
      <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
      {comparison && (
        <p className={`mt-1.5 text-xs ${isGood ? "text-emerald-400" : "text-rose-400"}`}>
          {isGood ? "+" : ""}{formatCurrency(diff)} vs. mês anterior
        </p>
      )}
      {subValue && !comparison && (
        <p className="mt-1.5 text-xs text-slate-500">{subValue}</p>
      )}
    </div>
  );
};

// Estado vazio
const EmptyState = ({ onAdd }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
      <TrendingUp size={28} className="text-emerald-400" />
    </div>
    <h3 className="text-lg font-semibold text-white">Nenhuma receita neste período</h3>
    <p className="mt-2 max-w-sm text-sm text-slate-400">
      Você não possui receitas registradas para este mês. Registre sua primeira entrada.
    </p>
    <button
      onClick={onAdd}
      className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
    >
      <Plus size={15} />
      Nova Receita
    </button>
  </div>
);

const Receitas = () => {
  const { openModal, openTransactionModal } = useModal();
  const { transactions } = useCash();
  const { selectedPeriod } = useDate();

  const filteredTransactions = useFilteredTransactions("income");
  useRouteFilterReset({ resetSearch: true, resetShowAllPeriods: false });

  const handleOpenReceitaModal = () => openModal(null, { type: "Receita" });

  // KPIs do período atual
  const totalReceitas = useMemo(
    () => filteredTransactions.reduce((acc, item) => acc + Number(item.amount || 0), 0),
    [filteredTransactions],
  );

  const maiorReceita = useMemo(() => {
    if (filteredTransactions.length === 0) return null;
    return filteredTransactions.reduce((max, item) =>
      Number(item.amount) > Number(max.amount) ? item : max,
    );
  }, [filteredTransactions]);

  // Comparação com mês anterior (receitas)
  const prevPeriod = useMemo(() => getPreviousPeriod(selectedPeriod), [selectedPeriod]);
  const prevTransactions = useMemo(
    () => getTransactionsByPeriod(transactions, prevPeriod).filter((t) => t.type === "income"),
    [transactions, prevPeriod],
  );
  const totalPrevReceitas = useMemo(
    () => prevTransactions.reduce((acc, t) => acc + Number(t.amount || 0), 0),
    [prevTransactions],
  );

  const comparison = useMemo(() => {
    const difference = totalReceitas - totalPrevReceitas;
    const percent = totalPrevReceitas === 0 ? 0 : (difference / totalPrevReceitas) * 100;
    return { difference, percent };
  }, [totalReceitas, totalPrevReceitas]);

  // Distribuição por categoria para o PieChart
  const categoryData = useMemo(() => {
    const totals = filteredTransactions.reduce((acc, item) => {
      const cat = item.category || "Outros";
      acc[cat] = (acc[cat] || 0) + Number(item.amount || 0);
      return acc;
    }, {});
    return Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({ label, value }));
  }, [filteredTransactions]);

  const prevMonthName = getMonthName(prevPeriod.month);

  return (
    <div className="min-h-screen bg-slate-950 pb-12 font-sans text-slate-100">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-400/80">Entradas</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Receitas</h1>
          <p className="mt-1 text-sm text-slate-400">
            Detalhamento das suas entradas e recebimentos.
          </p>
        </div>
        <button
          onClick={handleOpenReceitaModal}
          className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
        >
          <Plus size={15} />
          Nova Receita
        </button>
      </div>

      {/* KPIs */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total recebido"
          value={formatCurrency(totalReceitas)}
          icon={TrendingUp}
          accentColor="text-emerald-400"
          comparison={comparison}
        />
        <KpiCard
          label="Lançamentos"
          value={`${filteredTransactions.length}`}
          icon={BarChart2}
          accentColor="text-cyan-400"
          subValue="entradas neste período"
        />
        <KpiCard
          label="Maior receita"
          value={maiorReceita ? formatCurrency(maiorReceita.amount) : "R$ 0,00"}
          icon={ArrowUpRight}
          accentColor="text-violet-400"
          subValue={maiorReceita?.description ?? "—"}
        />
        <KpiCard
          label="Mês anterior"
          value={formatCurrency(totalPrevReceitas)}
          icon={Layers}
          accentColor="text-slate-400"
          subValue={`Total em ${prevMonthName}`}
        />
      </div>

      {/* Controles de filtro */}
      <CashModes />

      {/* Conteúdo principal */}
      {filteredTransactions.length === 0 ? (
        <EmptyState onAdd={handleOpenReceitaModal} />
      ) : (
        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
          {/* Lista de receitas */}
          <div className="rounded-[24px] border border-slate-800 bg-slate-900/70 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <h2 className="text-base font-semibold text-white">Lançamentos</h2>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                {filteredTransactions.length} entradas
              </span>
            </div>

            <div className="divide-y divide-slate-800/60">
              {filteredTransactions.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openTransactionModal(item)}
                  className="flex cursor-pointer items-center justify-between px-5 py-4 transition-colors hover:bg-slate-800/40"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                      <TrendingUp size={16} className="text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-200">
                        {item.description}
                      </p>
                      <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                        <span>{formatDate(item.date)}</span>
                        {item.category && (
                          <>
                            <span>•</span>
                            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">
                              {item.category}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="ml-4 shrink-0 text-base font-bold text-emerald-400">
                    + {formatCurrency(item.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Distribuição por categoria */}
          <div>
            <PieChartCard
              title="Distribuição de receitas"
              data={categoryData}
              subtitle={categoryData[0] ? `Principal: ${categoryData[0].label}` : undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Receitas;
