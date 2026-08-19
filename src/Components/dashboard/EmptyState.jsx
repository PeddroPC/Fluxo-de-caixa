import React from "react";
import { Link } from "react-router-dom";

/**
 * Componente generico de empty state contextual.
 * Nunca exibe apenas "Nenhum dado encontrado".
 * Sempre oferece contexto e orientacao ao usuario.
 *
 * Props:
 * - icon: ReactNode - icone Lucide (opcional)
 * - title: string - titulo principal
 * - description: string - descricao explicativa
 * - action: { label: string, to?: string, onClick?: fn } - CTA (opcional)
 * - compact: boolean - versao compacta para espacos menores
 */
const EmptyState = ({ icon, title, description, action, compact = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        compact ? "py-6 px-4" : "py-10 px-6"
      }`}
    >
      {icon && (
        <div
          className={`mb-3 flex items-center justify-center rounded-2xl bg-slate-800/60 text-slate-500 ${
            compact ? "h-10 w-10" : "h-14 w-14"
          }`}
        >
          {React.cloneElement(icon, {
            size: compact ? 18 : 24,
            strokeWidth: 1.5,
          })}
        </div>
      )}

      <p
        className={`font-medium text-slate-300 ${
          compact ? "text-sm" : "text-base"
        }`}
      >
        {title}
      </p>

      {description && (
        <p
          className={`mt-1 text-slate-500 ${
            compact ? "text-xs" : "text-sm"
          } max-w-[260px]`}
        >
          {description}
        </p>
      )}

      {action && (
        <div className="mt-4">
          {action.to ? (
            <Link
              to={action.to}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-400"
            >
              {action.label}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-400"
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
