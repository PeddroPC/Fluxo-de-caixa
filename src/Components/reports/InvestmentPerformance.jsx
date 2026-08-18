import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency, formatPercent } from "../../Utils/formatters";

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 shadow-xl">
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-xs text-slate-200">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}
          </span>
          <span className="font-semibold text-white">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
};

const CardMetric = ({ label, value, tone }) => (
  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
    <p className={`mt-2 text-lg font-semibold ${tone}`}>{value}</p>
  </div>
);

const InvestmentPerformance = ({ data, summary }) => {
  const hasValues = Array.isArray(data) && data.some((item) => item.invested || item.currentValue || item.profit);

  if (!hasValues) {
    return (
      <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Evolução dos investimentos</p>
        <div className="mt-6 flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 text-center">
          <div>
            <p className="text-lg font-semibold text-white">Nenhum dado de investimento</p>
            <p className="mt-2 text-sm text-slate-400">Registre aportes para acompanhar rentabilidade.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Investimentos</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Evolução dos investimentos</h3>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
          Rentabilidade
        </span>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <CardMetric label="Total investido" value={formatCurrency(summary.totalInvested)} tone="text-white" />
        <CardMetric label="Valor atual" value={formatCurrency(summary.totalCurrentValue)} tone="text-cyan-400" />
        <CardMetric label="Lucro / prejuízo" value={formatCurrency(summary.profit)} tone={summary.profit >= 0 ? "text-emerald-400" : "text-rose-400"} />
        <CardMetric label="Rentabilidade" value={formatPercent(summary.profitability, 1)} tone={summary.profit >= 0 ? "text-emerald-400" : "text-rose-400"} />
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="investedFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="currentFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="investido" name="Investido" stroke="#a78bfa" fill="url(#investedFill)" strokeWidth={2.5} />
            <Area type="monotone" dataKey="valorAtual" name="Valor atual" stroke="#38bdf8" fill="url(#currentFill)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InvestmentPerformance;
