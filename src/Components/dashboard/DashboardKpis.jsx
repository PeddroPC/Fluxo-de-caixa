import React from "react";
import { Wallet, TrendingUp, TrendingDown, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatCurrency } from "../../Utils/formatters";

/**
 * Card KPI individual.
 * Exibe valor principal, label, variacao percentual e contexto.
 */
const KpiCard = ({
  label,
  value,
  icon: Icon,
  iconClass,
  isPositive,
  variationPercent,
  variationLabel,
  contextText,
  alertText,
}) => {
  const showVariation = variationPercent !== undefined && variationPercent !== null;
  const VariationIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  const variationColor = isPositive ? "text-emerald-400" : "text-rose-400";
  const variationBg = isPositive ? "bg-emerald-500/10" : "bg-rose-500/10";

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20 transition-all hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900">
      {/* Header: label + icone */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClass}`}
          aria-hidden="true"
        >
          <Icon size={17} strokeWidth={2} />
        </div>
      </div>

      {/* Valor principal */}
      <div className="mt-3">
        <p className="text-2xl font-bold tracking-tight text-white">
          {formatCurrency(value)}
        </p>
      </div>

      {/* Variacao e contexto */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {showVariation && (
          <span
            className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${variationColor} ${variationBg}`}
          >
            <VariationIcon size={11} strokeWidth={2.5} />
            {Math.abs(variationPercent).toFixed(1)}%
          </span>
        )}
        {variationLabel && (
          <span className="text-xs text-slate-500 truncate">{variationLabel}</span>
        )}
      </div>

      {/* Alerta (ex: acima da media) */}
      {alertText && (
        <p className="mt-2 text-xs text-amber-400/80">{alertText}</p>
      )}

      {/* Texto de contexto adicional */}
      {contextText && (
        <p className="mt-2 text-xs text-slate-500">{contextText}</p>
      )}
    </div>
  );
};

/**
 * Grid dos 4 KPI cards principais do Dashboard.
 *
 * Props:
 * - summary: objeto com balance, income, expense, economy
 * - upcomingCount: numero de contas a vencer
 * - upcomingTotal: valor total das contas a vencer
 * - previousPeriodLabel: string para o label de comparacao
 * - hasOverdueItems: boolean - se tem itens atrasados
 */
const DashboardKpis = ({
  summary,
  upcomingCount = 0,
  upcomingTotal = 0,
  previousPeriodLabel = "mes anterior",
  hasOverdueItems = false,
}) => {
  const { balance, income, expense } = summary;

  // Detectar se despesas estao acima da media (acima do mes anterior)
  const expenseAboveAverage =
    !expense.isPositive && expense.previousValue > 0 && expense.currentValue > expense.previousValue;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Saldo atual */}
      <KpiCard
        label="Saldo atual"
        value={balance.currentValue}
        icon={Wallet}
        iconClass="bg-cyan-500/10 text-cyan-400"
        isPositive={balance.isPositive}
        variationPercent={balance.percent}
        variationLabel={`vs ${previousPeriodLabel}`}
      />

      {/* Card 2: Receitas do mes */}
      <KpiCard
        label="Receitas"
        value={income.currentValue}
        icon={TrendingUp}
        iconClass="bg-emerald-500/10 text-emerald-400"
        isPositive={income.isPositive}
        variationPercent={income.percent}
        variationLabel={`vs ${previousPeriodLabel}`}
      />

      {/* Card 3: Despesas do mes */}
      <KpiCard
        label="Despesas"
        value={expense.currentValue}
        icon={TrendingDown}
        iconClass="bg-rose-500/10 text-rose-400"
        isPositive={expense.isPositive}
        variationPercent={expense.percent}
        variationLabel={`vs ${previousPeriodLabel}`}
        alertText={
          expenseAboveAverage
            ? `Acima do mes anterior`
            : undefined
        }
      />

      {/* Card 4: A pagar */}
      <KpiCard
        label="A pagar"
        value={upcomingTotal}
        icon={Calendar}
        iconClass={
          hasOverdueItems
            ? "bg-rose-500/10 text-rose-400"
            : "bg-amber-500/10 text-amber-400"
        }
        isPositive={!hasOverdueItems}
        contextText={
          upcomingCount > 0
            ? `${upcomingCount} conta${upcomingCount !== 1 ? "s" : ""} pendente${upcomingCount !== 1 ? "s" : ""}`
            : "Sem vencimentos proximos"
        }
        alertText={hasOverdueItems ? "Ha itens em atraso" : undefined}
      />
    </div>
  );
};

export default DashboardKpis;
