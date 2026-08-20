import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency, getMonthName } from "../../Utils/formatters";

// Tooltip customizado com informacoes de Receitas, Despesas e Saldo
const CashFlowTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  const receitas = payload.find((p) => p.dataKey === "Receitas")?.value ?? 0;
  const despesas = payload.find((p) => p.dataKey === "Despesas")?.value ?? 0;
  const saldo = payload.find((p) => p.dataKey === "Saldo")?.value ?? 0;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-xl text-xs space-y-1.5 min-w-[160px]">
      <p className="mb-2 font-semibold text-slate-200">{label}</p>
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-1.5 text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
          Receitas
        </span>
        <span className="font-semibold text-emerald-400">{formatCurrency(receitas)}</span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-1.5 text-slate-400">
          <span className="h-2 w-2 rounded-full bg-rose-400 shrink-0" />
          Despesas
        </span>
        <span className="font-semibold text-rose-400">{formatCurrency(despesas)}</span>
      </div>
      <div className="my-1 h-px bg-slate-700/60" />
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-1.5 text-slate-400">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shrink-0" />
          Saldo
        </span>
        <span className={`font-bold ${saldo >= 0 ? "text-cyan-400" : "text-rose-400"}`}>
          {formatCurrency(saldo)}
        </span>
      </div>
    </div>
  );
};

const CustomLegend = () => (
  <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-xs text-slate-400">
    <span className="flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500/80" />
      Receitas
    </span>
    <span className="flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-sm bg-rose-500/70" />
      Despesas
    </span>
    <span className="flex items-center gap-1.5">
      <span className="inline-block h-0.5 w-4 rounded bg-cyan-400" />
      Saldo
    </span>
  </div>
);

/**
 * Grafico de Fluxo de Caixa dos ultimos 6 meses.
 * Combina barras de Receitas e Despesas com linha de Saldo acumulado.
 *
 * Props:
 * - data: Array<{ name: string, Receitas: number, Despesas: number, Saldo: number }>
 */
const CashFlowChart = ({ data = [] }) => {
  const hasData = data.some((d) => d.Receitas > 0 || d.Despesas > 0);

  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Evolucao financeira
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">Fluxo de Caixa</h3>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
          Ultimos 6 meses
        </span>
      </div>

      {!hasData ? (
        <div className="flex h-52 items-center justify-center">
          <p className="text-sm text-slate-500">Sem movimentacoes para exibir</p>
        </div>
      ) : (
        <>
          <div className="h-52 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} barCategoryGap="28%" barGap={3} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "var(--chart-label)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "var(--chart-label)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={54}
                  tickFormatter={(v) =>
                    v >= 1000 ? `R$${(v / 1000).toFixed(0)}k` : `R$${v}`
                  }
                />
                <Tooltip content={<CashFlowTooltip />} cursor={{ fill: "var(--chart-grid)" }} />
                <Bar dataKey="Receitas" fill="#34d399" radius={[5, 5, 0, 0]} opacity={0.85} />
                <Bar dataKey="Despesas" fill="#f87171" radius={[5, 5, 0, 0]} opacity={0.75} />
                <Line
                  type="monotone"
                  dataKey="Saldo"
                  stroke="#22d3ee"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#22d3ee", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#22d3ee", strokeWidth: 0 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <CustomLegend />
        </>
      )}
    </div>
  );
};

export default CashFlowChart;
