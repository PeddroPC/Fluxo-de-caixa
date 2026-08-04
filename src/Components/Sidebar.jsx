import React from "react";
import { NavLink } from "react-router-dom";

// Menu lateral com rotas para as páginas principais.
const navItems = [
  { label: "Dashboard", icon: "📊", to: "/" },
  { label: "Receitas", icon: "💰", to: "/receitas" },
  { label: "Despesas", icon: "🛒", to: "/despesas" },
  { label: "Fluxo de Caixa", icon: "📈", to: "/" },
  { label: "Relatórios", icon: "📑", to: "/relatorios" },
  { label: "Configurações", icon: "⚙️", to: "/" },
];

const Sidebar = () => {
  return (
    <aside className="w-72 shrink-0 border-r border-slate-800 bg-slate-950 p-6 text-slate-200">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-xl shadow-md shadow-cyan-500/20">
          💼
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Sistema</p>
          <h1 className="text-xl font-semibold text-white">Fluxo de Caixa</h1>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                isActive
                  ? "bg-slate-800 text-white shadow-lg shadow-slate-900/40"
                  : "hover:bg-slate-900 hover:text-white text-slate-400"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
