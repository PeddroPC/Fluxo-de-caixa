import React from "react";

const SummaryCard = ({
  title,
  currentValue,
  previousValue,
  variationAmount,
  variationPercent,
  isPositive,
  icon,
  accent,
  comparisonLabel,
}) => {
  const IconComponent = icon;
  const trendColor = isPositive ? "text-emerald-400" : "text-rose-400";
  const trendIcon = isPositive ? "▲" : "▼";
  const signedAmount = `${isPositive ? "+" : "-"}R$ ${Math.abs(variationAmount).toFixed(2)}`;
  const signedPercent = `${isPositive ? "+" : "-"}${Math.abs(variationPercent).toFixed(0)}%`;

  return (
    <div className="group flex h-full w-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/20 transition-all hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-slate-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent} text-lg text-white shadow-md`}
          >
            {IconComponent ? <IconComponent size={20} strokeWidth={2} /> : null}
          </span>

          <div>
            <p className="text-[11px] font-medium text-slate-400">{title}</p>
            <p className="mt-1 text-xl font-bold tracking-tight text-white">
              R$ {currentValue.toFixed(2)}
            </p>
          </div>
        </div>

        <div className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${trendColor}`}>
          {trendIcon} {signedPercent}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className={`text-sm font-semibold ${trendColor}`}>{signedAmount}</p>
        <p className="text-sm text-slate-400">{comparisonLabel}</p>
        <p className="text-xs text-slate-500">
          Mês anterior: R$ {previousValue.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;