import React from "react";
import { getGoalInsights } from "../../Utils/goalEngine";

const insightStyles = {
  success: "border-emerald-500/20 bg-emerald-500/8",
  info: "border-cyan-500/20 bg-cyan-500/8",
  warning: "border-amber-500/20 bg-amber-500/8",
};

// Exibe insights financeiros derivados dos dados reais das metas.
// Os insights são gerados dinamicamente pelo goalEngine — nenhum texto é estático.
const GoalInsights = ({ goals }) => {
  const insights = getGoalInsights(goals);

  if (!insights || insights.length === 0) return null;

  return (
    <div className="rounded-[24px] border border-slate-800 bg-slate-900/70 p-5">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Análise automática</p>
        <h3 className="mt-1 text-base font-semibold text-white">Insights das metas</h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`rounded-2xl border px-4 py-3 ${insightStyles[insight.type] || insightStyles.info}`}
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-lg leading-none">{insight.icon}</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  {insight.title}
                </p>
                <p className="mt-0.5 text-sm text-slate-400 leading-relaxed">
                  {insight.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalInsights;
