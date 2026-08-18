import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  const item = payload[0];
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 shadow-xl">
      <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-white">{item.value.toFixed(1).replace(".", ",")}%</p>
      <p className="mt-1 text-[11px] text-slate-400">{formatCurrency(item.payload.income)} em receitas</p>
    </div>
  );
};

const EconomyTrendChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 text-center">
        <div>
          <p className="text-lg font-semibold text-white">Sem histórico de economia</p>
          <p className="mt-2 text-sm text-slate-400">Registre receitas e despesas para acompanhar a tendência.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="economy" name="Economia" stroke="#fbbf24" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EconomyTrendChart;
