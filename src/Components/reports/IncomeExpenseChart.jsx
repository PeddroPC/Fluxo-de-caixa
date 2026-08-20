import {
  Bar,
  BarChart,
  CartesianGrid,
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
      <p className="text-lg font-semibold text-white">Sem dados de comparativo</p>
      <p className="mt-2 text-sm text-slate-400">Não há receitas ou despesas registradas para o período.</p>
    </div>
  </div>
);

const IncomeExpenseChart = ({ data }) => {
  const hasValues =
    Array.isArray(data) &&
    data.some(
      (item) => Number(item?.income || 0) > 0 || Number(item?.expense || 0) > 0,
    );

  if (!hasValues) {
    return <EmptyState />;
  }

  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Comparativo</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Receitas × Despesas</h3>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
          Mensal
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "var(--chart-label)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fill: "var(--chart-label)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `R$${Math.abs(value) >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income" name="Receitas" fill="#34d399" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" name="Despesas" fill="#f87171" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
