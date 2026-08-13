import React from "react";

const FILTERS = [
  { key: "all", label: "Todas" },
  { key: "active", label: "Em andamento" },
  { key: "completed", label: "Concluídas" },
  { key: "overdue", label: "Atrasadas" },
];

// Componente de abas para filtrar metas por status.
const GoalFilter = ({ activeFilter, onFilterChange, counts }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => {
        const count = counts?.[f.key] ?? 0;
        const isActive = activeFilter === f.key;

        return (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                : "border border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200"
            }`}
          >
            {f.label}
            {count > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  isActive ? "bg-amber-500/20 text-amber-300" : "bg-slate-800 text-slate-500"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default GoalFilter;
