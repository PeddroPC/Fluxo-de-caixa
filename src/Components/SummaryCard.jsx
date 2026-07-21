import React from "react";

const SummaryCard = ({ title, value, subtext, icon, accent }) => {
  return (
    <div className="group rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20 transition hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${accent} text-xl text-white shadow-lg shadow-slate-950/20`}>
          {icon}
        </span>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-400">
          {subtext}
        </span>
      </div>
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-white">R$ {value}</p>
    </div>
  );
};

export default SummaryCard;
