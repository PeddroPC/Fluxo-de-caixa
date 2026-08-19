import React from "react";
import { Calendar, AlertCircle, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "../../Utils/formatters";
import EmptyState from "./EmptyState";

/**
 * Retorna o status visual de um vencimento baseado na data.
 * Compara apenas a parte de data (sem hora) para evitar problemas de timezone.
 */
const getBillStatus = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  const billDate = new Date(year, month - 1, day);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffMs = billDate - today;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      label: `Vencido ha ${Math.abs(diffDays)} dia${Math.abs(diffDays) !== 1 ? "s" : ""}`,
      badge: "Atrasado",
      dotClass: "bg-rose-500",
      badgeClass: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
      textClass: "text-rose-400",
      priority: 0,
    };
  }

  if (diffDays === 0) {
    return {
      label: "Vence hoje",
      badge: "Hoje",
      dotClass: "bg-amber-400",
      badgeClass: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      textClass: "text-amber-400",
      priority: 1,
    };
  }

  if (diffDays <= 3) {
    return {
      label: `Vence em ${diffDays} dia${diffDays !== 1 ? "s" : ""}`,
      badge: `${diffDays}d`,
      dotClass: "bg-orange-400",
      badgeClass: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
      textClass: "text-orange-400",
      priority: 2,
    };
  }

  return {
    label: `Vence em ${diffDays} dias`,
    badge: `${diffDays}d`,
    dotClass: "bg-slate-600",
    badgeClass: "bg-slate-700/60 text-slate-400 border border-slate-700",
    textClass: "text-slate-400",
    priority: 3,
  };
};

/**
 * Lista de proximos vencimentos do periodo atual.
 * Exibe despesas futuras do mes selecionado, ordenadas por data.
 *
 * Props:
 * - transactions: Array — transacoes futuras do periodo (type === 'expense')
 * - onTransactionClick: fn — abre o modal de detalhes
 */
const UpcomingBills = ({ transactions = [], onTransactionClick }) => {
  const hasItems = transactions.length > 0;

  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Pagamentos
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            Proximos vencimentos
          </h3>
        </div>
        {hasItems && (
          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
            {transactions.length} {transactions.length === 1 ? "conta" : "contas"}
          </span>
        )}
      </div>

      {/* Lista ou empty state */}
      {!hasItems ? (
        <EmptyState
          icon={<CheckCircle2 />}
          title="Sem vencimentos no periodo"
          description="Nenhuma despesa pendente foi encontrada para os proximos dias."
          compact
        />
      ) : (
        <ul className="space-y-2">
          {transactions.map((item) => {
            const status = getBillStatus(item.date);
            return (
              <li
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => onTransactionClick?.(item)}
                onKeyDown={(e) => e.key === "Enter" && onTransactionClick?.(item)}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 transition-colors hover:bg-slate-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                aria-label={`${item.description} — ${formatCurrency(item.amount)} — ${status.label}`}
              >
                {/* Lado esquerdo */}
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${status.dotClass}`}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {item.description}
                    </p>
                    <p className={`text-xs ${status.textClass}`}>
                      {status.label}
                    </p>
                  </div>
                </div>

                {/* Lado direito */}
                <div className="ml-3 flex shrink-0 flex-col items-end gap-1">
                  <p className="text-sm font-semibold text-rose-400">
                    {formatCurrency(item.amount)}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${status.badgeClass}`}
                  >
                    {status.badge}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Rodape com link para despesas */}
      <div className="mt-4 flex justify-end">
        <Link
          to="/despesas"
          className="flex items-center gap-1 text-xs text-slate-500 transition hover:text-slate-300"
        >
          Ver todas as despesas <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
};

export default UpcomingBills;
