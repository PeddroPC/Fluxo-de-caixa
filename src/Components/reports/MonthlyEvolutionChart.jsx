import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../../Utils/formatters";

const CustomTooltip = ({ active, payload, label }) => {
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

const EmptyState = () => (
  <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 text-center">
    <div>
      <p className="text-lg font-semibold text-white">Sem dados para visualizar</p>
      <p className="mt-2 text-sm text-slate-400">Registre movimentações para acompanhar a evolução financeira.</p>
    </div>
  </div>
);

const MonthlyEvolutionChart = ({ data }) => {
  const hasValues =
    Array.isArray(data) &&
    data.some(
      (item) =>
        Number(item?.income || 0) > 0 ||
        Number(item?.expense || 0) > 0 ||
        Number(item?.balance || 0) !== 0,
    );

  if (!hasValues) {
    return <EmptyState />;
  }

  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Evolução financeira</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Receitas, despesas e saldo</h3>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
          Últimos 6 meses
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "var(--chart-label)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fill: "var(--chart-label)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `R$${Math.abs(value) >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "var(--text-secondary)", fontSize: "11px" }} />
            <Line type="monotone" dataKey="income" name="Receitas" stroke="#34d399" strokeWidth={3} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="expense" name="Despesas" stroke="#f87171" strokeWidth={3} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="balance" name="Saldo" stroke="#38bdf8" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyEvolutionChart;
