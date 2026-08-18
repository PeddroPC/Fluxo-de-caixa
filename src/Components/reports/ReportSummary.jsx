import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { formatCurrency } from "../../Utils/formatters";

const palette = {
  emerald: {
    ring: "border-emerald-500/20",
    icon: "bg-emerald-500/10 text-emerald-400",
    text: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400",
  },
  rose: {
    ring: "border-rose-500/20",
    icon: "bg-rose-500/10 text-rose-400",
    text: "text-rose-400",
    badge: "bg-rose-500/10 text-rose-400",
  },
  cyan: {
    ring: "border-cyan-500/20",
    icon: "bg-cyan-500/10 text-cyan-400",
    text: "text-cyan-400",
    badge: "bg-cyan-500/10 text-cyan-400",
  },
  amber: {
    ring: "border-amber-500/20",
    icon: "bg-amber-500/10 text-amber-400",
    text: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-400",
  },
  violet: {
    ring: "border-violet-500/20",
    icon: "bg-violet-500/10 text-violet-400",
    text: "text-violet-400",
    badge: "bg-violet-500/10 text-violet-400",
  },
};

const formatMetricValue = (type, value) => {
  if (type === "economy") {
    return `${Number(value || 0).toFixed(1).replace(".", ",")}%`;
  }

  return formatCurrency(value);
};

const ReportSummaryCard = ({ label, value, comparison, accent, icon: Icon, type }) => {
  const tone = palette[accent] || palette.cyan;
  const percent = Number(comparison?.percent || 0);
  const difference = Number(comparison?.difference || 0);
  const isPositive = comparison ? comparison.isPositive : true;
  const neutral = percent === 0 && difference === 0;
  const absPercent = Math.abs(percent);

  const DirectionIcon = neutral ? Minus : isPositive ? ArrowUpRight : ArrowDownRight;
  const valueColor = neutral ? "text-slate-300" : isPositive ? tone.text : tone.text;

  const trendText = neutral
    ? "sem alteração neste mês"
    : `${isPositive ? "↑" : "↓"} ${absPercent.toFixed(1).replace(".", ",")}% vs mês anterior`;

  return (
    <div className={`rounded-[24px] border bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20 ${tone.ring}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone.icon}`}>
            <Icon size={18} strokeWidth={2} />
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{formatMetricValue(type, value)}</p>
          </div>
        </div>

        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${neutral ? "bg-slate-800 text-slate-300" : tone.badge}`}>
          <DirectionIcon size={12} />
          {neutral ? "0%" : `${absPercent.toFixed(1).replace(".", ",")}%`}
        </span>
      </div>

      <div className={`mt-4 flex items-center justify-between text-xs ${neutral ? "text-slate-400" : valueColor}`}>
        <span>{trendText}</span>
        <span>{neutral ? "—" : `${difference >= 0 ? "+" : "-"}${formatCurrency(Math.abs(difference))}`}</span>
      </div>
    </div>
  );
};

export default ReportSummaryCard;
