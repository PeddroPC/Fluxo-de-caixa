import React from "react";
import { Pencil, Trash2, Calendar, Target } from "lucide-react";
import GoalProgressBar from "./GoalProgressBar";
import {
  calculateGoalProgress,
  calculateRemainingAmount,
  calculateMonthlyNeeded,
  getGoalStatus,
} from "../../Utils/goalEngine";
import { formatCurrency, formatShortDate } from "../../Utils/formatters";

const GoalCard = ({ goal, onEdit, onDelete, onContribute }) => {
  const progress = calculateGoalProgress(goal);
  const remaining = calculateRemainingAmount(goal);
  const monthlyNeeded = calculateMonthlyNeeded(goal);
  const status = getGoalStatus(goal);
  const isCompleted = progress >= 100;
  const overshoot = Number(goal.currentAmount) - Number(goal.targetAmount);

  return (
    <div
      className={`group relative flex flex-col rounded-[24px] border bg-slate-900/70 p-5 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${status.borderColor}`}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Indicador de cor da meta */}
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: `${goal.color || "#22d3ee"}20`, border: `1px solid ${goal.color || "#22d3ee"}40` }}
          >
            <Target size={18} style={{ color: goal.color || "#22d3ee" }} />
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-tight text-white">{goal.name || goal.title}</h3>
            {goal.category && (
              <span className="mt-0.5 inline-block rounded-md bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                {goal.category}
              </span>
            )}
          </div>
        </div>

        {/* Status badge */}
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${status.bgColor} ${status.textColor}`}>
          {status.label}
        </span>
      </div>

      {/* Valores */}
      <div className="mb-4">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-bold text-white">
              {formatCurrency(goal.currentAmount)}
            </span>
          </div>
          <span className="text-sm text-slate-500">
            de {formatCurrency(goal.targetAmount)}
          </span>
        </div>

        {/* Progresso */}
        <div className="mt-3">
          <GoalProgressBar
            percent={progress}
            color={goal.color || "#22d3ee"}
            showLabel={true}
          />
        </div>
      </div>

      {/* Meta concluída — destaque especial */}
      {isCompleted ? (
        <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-center">
          <p className="text-sm font-semibold text-emerald-400">🎉 Meta atingida!</p>
          {overshoot > 0 && (
            <p className="mt-0.5 text-xs text-emerald-300/70">
              +{formatCurrency(overshoot)} além do objetivo
            </p>
          )}
        </div>
      ) : (
        <div className="mb-4 space-y-2">
          {/* Faltam */}
          <div className="flex items-center justify-between rounded-xl bg-slate-950/60 px-3 py-2">
            <span className="text-xs text-slate-500">Faltam</span>
            <span className="text-sm font-semibold text-slate-200">{formatCurrency(remaining)}</span>
          </div>

          {/* Prazo */}
          {goal.deadline && (
            <div className="flex items-center justify-between rounded-xl bg-slate-950/60 px-3 py-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar size={11} />
                Prazo
              </div>
              <span className={`text-xs font-medium ${status.textColor}`}>
                {formatShortDate(goal.deadline)}
              </span>
            </div>
          )}

          {/* Necessário por mês */}
          {monthlyNeeded !== null && monthlyNeeded > 0 && (
            <div className="rounded-xl bg-slate-950/60 px-3 py-2">
              <p className="text-[10px] text-slate-500">Para concluir no prazo</p>
              <p className="text-xs font-semibold text-slate-300">
                ≈ {formatCurrency(monthlyNeeded)}/mês
              </p>
            </div>
          )}
        </div>
      )}

      {/* Observação */}
      {goal.observation && (
        <p className="mb-4 text-xs text-slate-500 line-clamp-2">{goal.observation}</p>
      )}

      {/* Ações */}
      <div className="mt-auto flex items-center gap-2 border-t border-slate-800 pt-4">
        {onContribute && !isCompleted && (
          <button
            onClick={() => onContribute(goal)}
            className="flex-1 rounded-xl bg-slate-800 py-2 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            + Aporte
          </button>
        )}
        <button
          onClick={() => onEdit(goal)}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-slate-400 transition hover:bg-slate-700 hover:text-white"
          title="Editar meta"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(goal.id)}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 transition hover:bg-rose-500/20"
          title="Excluir meta"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default GoalCard;
