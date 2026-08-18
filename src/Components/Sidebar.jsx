import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  FileBarChart2,
} from "lucide-react";
import logo from "../assets/logo.png";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/",
    accentColor: "text-cyan-400",
    activeBg: "bg-cyan-500/10",
    activeBorder: "border-l-2 border-cyan-500",
  },
  {
    label: "Receitas",
    icon: TrendingUp,
    to: "/receitas",
    accentColor: "text-emerald-400",
    activeBg: "bg-emerald-500/10",
    activeBorder: "border-l-2 border-emerald-500",
  },
  {
    label: "Despesas",
    icon: TrendingDown,
    to: "/despesas",
    accentColor: "text-rose-400",
    activeBg: "bg-rose-500/10",
    activeBorder: "border-l-2 border-rose-500",
  },
  {
    label: "Relatórios",
    icon: FileBarChart2,
    to: "/relatorios",
    accentColor: "text-violet-400",
    activeBg: "bg-violet-500/10",
    activeBorder: "border-l-2 border-violet-500",
  },
  {
    label: "Investimentos",
    icon: BarChart3,
    to: "/investimentos",
    accentColor: "text-violet-400",
    activeBg: "bg-violet-500/10",
    activeBorder: "border-l-2 border-violet-500",
  },
  {
    label: "Metas",
    icon: Target,
    to: "/metas",
    accentColor: "text-amber-400",
    activeBg: "bg-amber-500/10",
    activeBorder: "border-l-2 border-amber-500",
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-950 flex flex-col">
      {/* Logo */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 shadow-lg shadow-cyan-500/20">
            <img src={logo} alt="CashPilot" className="h-7 w-7 object-contain" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Sistema</p>
            <h1 className="text-lg font-bold text-white leading-tight">CashPilot</h1>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 mb-4 h-px bg-slate-800" />

      {/* Nav label */}
      <p className="mx-6 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
        Navegação
      </p>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150 ${
                  isActive
                    ? `${item.activeBg} ${item.accentColor} font-medium`
                    : "text-slate-500 hover:bg-slate-900 hover:text-slate-200"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? `${item.activeBg} ${item.accentColor}`
                        : "bg-slate-900 text-slate-500 group-hover:text-slate-300"
                    }`}
                  >
                    <Icon size={16} strokeWidth={2} />
                  </span>
                  <span className="text-sm">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 mx-3 mb-4 mt-4 rounded-xl bg-slate-900/50 border border-slate-800">
        <p className="text-[10px] text-slate-500 leading-relaxed">
          Controle financeiro pessoal. Todos os dados ficam armazenados localmente.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
