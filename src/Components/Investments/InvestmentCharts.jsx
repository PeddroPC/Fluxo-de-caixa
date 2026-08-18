import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
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

const InvestmentCharts = ({ patrimonyTimeline, distributionData, profitabilityData }) => {
  const hasTimeline = Array.isArray(patrimonyTimeline) && patrimonyTimeline.length > 0;
  const hasDistribution = Array.isArray(distributionData) && distributionData.length > 0;

  return (
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
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Evolução patrimonial</p>
          {hasTimeline ? (
            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={patrimonyTimeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="investmentFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="value" name="Patrimônio" stroke="#38bdf8" fill="url(#investmentFill)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="mt-4 flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 text-center">
              <div>
                <p className="text-lg font-semibold text-white">Sem histórico</p>
                <p className="mt-2 text-sm text-slate-400">Registre aportes para seguir a evolução.</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Distribuição da carteira</p>
            {hasDistribution ? (
              <div className="mt-5 grid gap-4">
                {distributionData.map((entry, index) => (
                  <div key={entry.label} className="rounded-3xl bg-slate-900/80 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: ["#22d3ee", "#14b8a6", "#2563eb", "#38bdf8", "#7dd3fc"][index % 5] }} />
                        <span className="text-sm font-medium text-white">{entry.label}</span>
                      </div>
                      <span className="text-xs text-slate-300">{entry.percentage}%</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <div className="h-2 flex-1 rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${entry.percentage}%`, backgroundColor: ["#22d3ee", "#14b8a6", "#2563eb", "#38bdf8", "#7dd3fc"][index % 5] }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-slate-200">{formatCurrency(entry.value)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-4 text-center text-sm text-slate-400">
                Ainda não há distribuição para mostrar.
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Rentabilidade por ativo</p>
            {profitabilityData && profitabilityData.length > 0 ? (
              <div className="mt-4 h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitabilityData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="label" type="category" tick={{ fill: "#cbd5e1", fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
                    <Tooltip formatter={(value) => [`${Number(value).toFixed(2)}%`, "Rentabilidade"]} />
                    <Bar dataKey="value" fill="#34d399" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-4 text-center text-sm text-slate-400">
                Nenhum ativo com rentabilidade informada.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCharts;
