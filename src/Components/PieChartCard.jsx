import React from "react";

const chartColors = ["#22d3ee", "#14b8a6", "#2563eb", "#38bdf8", "#7dd3fc"];

const PieChartCard = ({ title, data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Gastos por categoria</h3>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
          Total {data.length}
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 lg:flex-row">
        <div className="relative h-48 w-48">
          <svg viewBox="0 0 32 32" className="h-full w-full">
            {data.reduce((acc, item, index) => {
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
                <path key={item.label} d={path} fill={chartColors[index % chartColors.length]} />,
              );
              return acc;
            }, { total: 0, paths: [] }).paths}
          </svg>
        </div>

        <div className="grid w-full gap-3">
          {data.map((item, index) => (
            <div key={item.label} className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3">
              <div className="flex items-center gap-3">
                <span style={{ background: chartColors[index % chartColors.length] }} className="h-3.5 w-3.5 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-slate-500">{((item.value / total) * 100).toFixed(0)}%</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-100">R$ {item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
