import React from "react";

/**
 * Barra de progresso visual reutilizável para metas financeiras.
 * Limita o percentual exibido a 100% mesmo quando a meta foi ultrapassada.
 */
const GoalProgressBar = ({ percent, color = "#22d3ee", showLabel = true }) => {
  const clamped = Math.min(Math.max(Number(percent) || 0, 0), 100);

  return (
    <div className="space-y-1.5">
      {showLabel && (
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Progresso</span>
          <span className="font-semibold text-slate-200">{clamped.toFixed(0)}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${clamped}%`,
            background: `${color}`,
            boxShadow: `0 0 8px ${color}55`,
          }}
        />
      </div>
    </div>
  );
};

export default GoalProgressBar;
