import { Sparkles } from "lucide-react";

const FinancialInsights = ({ insights }) => {
  if (!Array.isArray(insights) || insights.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
          <Sparkles size={18} />
        </span>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Insights</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Insights do período</h3>
        </div>
      </div>

      <ul className="space-y-3">
        {insights.map((item, index) => (
          <li key={`${item}-${index}`} className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-200">
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FinancialInsights;
