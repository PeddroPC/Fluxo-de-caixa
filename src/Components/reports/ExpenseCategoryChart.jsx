import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { formatCurrency } from "../../Utils/formatters";

const palette = ["#22d3ee", "#34d399", "#a78bfa", "#fbbf24", "#f87171", "#60a5fa", "#f472b6", "#fb923c"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;

  const item = payload[0]?.payload;
  if (!item) return null;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-200 shadow-xl">
      <p className="font-medium text-white">{item.label}</p>
      <p className="mt-1">{formatCurrency(item.value)}</p>
      <p className="mt-1 text-slate-400">{item.percent.toFixed(1).replace(".", ",")}% do total</p>
    </div>
  );
};

const EmptyState = () => (
  <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 text-center">
    <div>
      <p className="text-lg font-semibold text-white">Sem despesas por categoria</p>
      <p className="mt-2 text-sm text-slate-400">Adicione despesas para visualizar o ranking por categoria.</p>
    </div>
  </div>
);

const ExpenseCategoryChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <EmptyState />;
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const displayData = data.slice(0, 6);

  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Distribuição</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Despesas por categoria</h3>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
          {displayData.length} categorias
        </span>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={displayData} cx="50%" cy="50%" innerRadius={54} outerRadius={82} paddingAngle={2} dataKey="value">
                {displayData.map((entry, index) => (
                  <Cell key={`${entry.label}-${index}`} fill={palette[index % palette.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          {displayData.map((item, index) => (
            <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: palette[index % palette.length] }} />
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{item.percent.toFixed(1).replace(".", ",")}%</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-200">{formatCurrency(item.value)}</p>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(item.value / total) * 100}%`, backgroundColor: palette[index % palette.length] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCategoryChart;
