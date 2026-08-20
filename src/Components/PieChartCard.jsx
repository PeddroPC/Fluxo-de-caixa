import React from "react";

const chartColors = [
  "#22d3ee", // cyan-400
  "#a78bfa", // violet-400
  "#34d399", // emerald-400
  "#fb923c", // orange-400
  "#f472b6", // pink-400
  "#60a5fa", // blue-400
];

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-10 text-center">
    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/60">
      <svg className="h-7 w-7 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    </div>
    <p className="text-sm font-medium text-slate-400">Sem dados neste período</p>
    <p className="mt-1 text-xs text-slate-600">Registre movimentações para ver a distribuição</p>
  </div>
);

// Componente que monta um gráfico de pizza a partir de dados agregados por categoria.
const PieChartCard = ({ title, data, subtitle }) => {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
        <div className="mb-4">
          <p className="text-sm text-slate-400">{title}</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Gastos por categoria</h3>
        </div>
        <EmptyState />
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Gastos por categoria</h3>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
          {data.length} categorias
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 lg:flex-row">
        {/* Gráfico de pizza SVG */}
        <div className="relative h-40 w-40 shrink-0">
          <svg viewBox="0 0 32 32" className="h-full w-full -rotate-90">
            {data.reduce(
              (acc, item, index) => {
                const start = acc.total / total;
                const end = (acc.total + item.value) / total;
                const largeArc = end - start > 0.5 ? 1 : 0;
                const x1 = 16 + 16 * Math.cos(2 * Math.PI * start);
                const y1 = 16 + 16 * Math.sin(2 * Math.PI * start);
                const x2 = 16 + 16 * Math.cos(2 * Math.PI * end);
                const y2 = 16 + 16 * Math.sin(2 * Math.PI * end);
                const path = `M16 16 L ${x1} ${y1} A 16 16 0 ${largeArc} 1 ${x2} ${y2} Z`;
                acc.total += item.value;
                acc.paths.push(
                  <path
                    key={item.label}
                    d={path}
                    fill={chartColors[index % chartColors.length]}
                    className="transition-opacity hover:opacity-80"
                  />,
                );
                return acc;
              },
              { total: 0, paths: [] },
            ).paths}
            {/* Anel interno */}
            <circle cx="16" cy="16" r="7" fill="var(--background)" />
          </svg>
          {/* Label central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[10px] text-slate-500">Total</p>
            <p className="text-xs font-bold text-white">
              {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
        </div>

        {/* Legenda */}
        <div className="w-full space-y-2">
          {data.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-950/50 px-3 py-2"
            >
              <div className="flex items-center gap-2.5">
                <span
                  style={{ background: chartColors[index % chartColors.length] }}
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                />
                <div>
                  <p className="text-xs font-medium text-white">{item.label}</p>
                  <p className="text-[10px] text-slate-500">
                    {((item.value / total) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <p className="text-xs font-semibold text-slate-200">
                {item.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
