import React from "react";
import { Target, CheckCircle2, TrendingUp, Wallet } from "lucide-react";
import { formatCurrency } from "../../Utils/formatters";
import { calculateGoalProgress } from "../../Utils/goalEngine";
import GoalProgressBar from "./GoalProgressBar";

// Resumo geral das metas exibido no topo da página de Metas.
const GoalSummary = ({ goals }) => {
  if (!goals || goals.length === 0) return null;

  const totalGoals = goals.length;
  const completedGoals = goals.filter(
    (g) => Number(g.currentAmount) >= Number(g.targetAmount),
  ).length;

  const totalAccumulated = goals.reduce(
    (sum, g) => sum + Number(g.currentAmount || 0),
    0,
  );

  const totalTarget = goals.reduce(
    (sum, g) => sum + Number(g.targetAmount || 0),
    0,
  );

  const overallProgress = totalTarget > 0
    ? Math.min((totalAccumulated / totalTarget) * 100, 100)
    : 0;

  const cards = [
    {
      label: "Total de metas",
      value: totalGoals.toString(),
      subvalue: `${completedGoals} concluída${completedGoals !== 1 ? "s" : ""}`,
      icon: Target,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
    },
    {
      label: "Acumulado",
      value: formatCurrency(totalAccumulated),
      subvalue: `de ${formatCurrency(totalTarget)} em objetivos`,
      icon: Wallet,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
    },
    {
      label: "Concluídas",
      value: `${completedGoals}`,
      subvalue: `de ${totalGoals} meta${totalGoals !== 1 ? "s" : ""}`,
      icon: CheckCircle2,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      label: "Progresso geral",
      value: `${overallProgress.toFixed(1)}%`,
      subvalue: "do total de objetivos",
      icon: TrendingUp,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
  ];

  return (
    <div className="mb-8 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}
                >
                  <Icon size={18} className={card.iconColor} />
                </span>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                    {card.label}
                  </p>
                  <p className="text-xl font-bold text-white">{card.value}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">{card.subvalue}</p>
            </div>
          );
        })}
      </div>

      {/* Barra de progresso geral */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-300">Progresso consolidado de todas as metas</p>
          <p className="text-sm font-bold text-amber-400">{overallProgress.toFixed(1)}%</p>
        </div>
        <GoalProgressBar percent={overallProgress} color="#f59e0b" showLabel={false} />
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>{formatCurrency(totalAccumulated)} acumulado</span>
          <span>objetivo: {formatCurrency(totalTarget)}</span>
        </div>
      </div>
    </div>
  );
};

export default GoalSummary;
