import React from "react";
import { ArrowRight, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "../../Utils/formatters";
import EmptyState from "./EmptyState";

/**
 * Icone e cores por tipo de transacao.
 */
const getTypeStyle = (type) => {
  if (type === "income") {
    return {
      Icon: TrendingUp,
      iconClass: "text-emerald-400 bg-emerald-500/10",
      amountClass: "text-emerald-400",
      prefix: "+",
    };
  }
  if (type === "investment") {
    return {
      Icon: BarChart3,
      iconClass: "text-cyan-400 bg-cyan-500/10",
      amountClass: "text-cyan-400",
      prefix: "",
    };
  }
  return {
    Icon: TrendingDown,
    iconClass: "text-rose-400 bg-rose-500/10",
    amountClass: "text-rose-400",
    prefix: "-",
  };
};

/**
 * Lista das ultimas transacoes do periodo selecionado.
 * Clicavel para abrir o modal de detalhes.
 *
 * Props:
 * - transactions: Array — ultimas 7 transacoes do periodo
 * - onTransactionClick: fn — abre o TransactionDetailsModal
 */
const RecentTransactions = ({ transactions = [], onTransactionClick }) => {
  const hasItems = transactions.length > 0;

  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Atividade
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            Ultimas movimentacoes
          </h3>
        </div>
        {hasItems && (
          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
            {transactions.length} itens
          </span>
        )}
      </div>

      {/* Lista ou empty state */}
      {!hasItems ? (
        <EmptyState
          icon={<TrendingUp />}
          title="Sem movimentacoes"
          description="Registre sua primeira receita ou despesa para comecar a acompanhar seu fluxo."
          action={{ label: "Adicionar movimentacao", to: "/receitas" }}
          compact
        />
      ) : (
        <ul className="space-y-2">
          {transactions.map((item) => {
            const { Icon, iconClass, amountClass, prefix } = getTypeStyle(item.type);
            const description =
              item.description ?? item.nome ?? "Movimentacao";

            return (
              <li
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => onTransactionClick?.(item)}
                onKeyDown={(e) => e.key === "Enter" && onTransactionClick?.(item)}
                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 transition-colors hover:bg-slate-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                aria-label={`${description} — ${formatCurrency(item.amount)}`}
              >
                {/* Icone de tipo */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
                  aria-hidden="true"
                >
                  <Icon size={15} strokeWidth={2} />
                </div>

                {/* Descricao e categoria */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {description}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.category ?? "Sem categoria"}
                  </p>
                </div>

                {/* Valor e data */}
                <div className="ml-2 shrink-0 text-right">
                  <p className={`text-sm font-semibold ${amountClass}`}>
                    {prefix}
                    {formatCurrency(item.amount)}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {formatDate(item.date)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Link para todas */}
      {hasItems && (
        <div className="mt-4 flex justify-end">
          <Link
            to="/receitas"
            className="flex items-center gap-1 text-xs text-slate-500 transition hover:text-slate-300"
          >
            Ver todas as movimentacoes <ArrowRight size={12} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
