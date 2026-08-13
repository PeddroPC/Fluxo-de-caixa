import React from "react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));

const InvestmentCharts = ({
  patrimonyTimeline,
  distributionData,
  profitabilityData,
}) => (
  <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Performance da Carteira</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Performance da carteira</h2>
      </div>
      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
        Visão geral
      </span>
    </div>

    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Evolução Patrimonial</p>
        <div className="mt-4 space-y-4 text-slate-300">
          <div className="h-60 w-full overflow-hidden rounded-3xl bg-slate-900/80 p-4">
            <div className="h-full w-full rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
              <svg viewBox="0 0 220 120" className="h-full w-full">
                <path
                  d="M10 100 C 50 85 80 90 110 55 C 140 20 170 35 210 40"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M10 95 C 50 75 80 80 110 45 C 140 10 170 25 210 30"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {patrimonyTimeline.map((entry) => (
              <div key={entry.label} className="rounded-3xl bg-slate-900/80 p-3 text-center">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{entry.label}</p>
                <p className="mt-2 text-sm font-semibold text-white">{formatCurrency(entry.value)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Distribuição da carteira</p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {distributionData.map((entry, index) => (
              <div key={entry.label} className="flex items-center gap-3 rounded-3xl bg-slate-900/80 p-3">
                <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: ["#22d3ee", "#14b8a6", "#2563eb", "#38bdf8", "#7dd3fc"][index % 5] }} />
                <div>
                  <p className="text-sm font-semibold text-white">{entry.label}</p>
                  <p className="text-xs text-slate-500">{entry.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Rentabilidade por ativo</p>
          <div className="mt-4 space-y-3">
            {profitabilityData.map((entry) => (
              <div key={entry.label} className="rounded-3xl bg-slate-900/80 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-white">{entry.label}</p>
                  <p className="text-sm font-semibold text-slate-300">{entry.value.toFixed(2)}%</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-400"
                    style={{ width: `${Math.min(entry.value, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default InvestmentCharts;
