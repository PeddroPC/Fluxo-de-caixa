import React from "react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));

const formatPercent = (value) => `${Number(value || 0).toFixed(2).replace(".", ",")}%`;

const InvestmentSummary = ({
  totalInvested,
  totalCurrentValue,
  totalProfit,
  profitabilityPercentage,
}) => {
  const isPositive = totalProfit >= 0;

  return (
    <div className="space-y-4 text-sm text-slate-300">
      <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-100">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
          Patrimônio investido
        </p>
        <p className="mt-2 text-lg font-semibold">{formatCurrency(totalInvested)}</p>
      </div>

      <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-100">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
          Valor atual da carteira
        </p>
        <p className="mt-2 text-lg font-semibold">{formatCurrency(totalCurrentValue)}</p>
      </div>

      <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Lucro / Prejuízo
            </p>
            <p
              className={`mt-2 text-lg font-semibold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}
            >
              {isPositive ? "↗" : "↘"} {formatCurrency(totalProfit)}
            </p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
            {isPositive ? "Lucro" : "Prejuízo"}
          </span>
        </div>
      </div>

      {/* Card de Rentabilidade Atualizado com o Gráfico */}
      <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-100 flex flex-col">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Rentabilidade geral
          </p>
          <p
            className={`text-lg font-semibold tracking-wide ${profitabilityPercentage >= 0 ? "text-emerald-400" : "text-rose-400"}`}
          >
            {formatPercent(profitabilityPercentage)}
          </p>
        </div>

        {/* Container do Gráfico */}
        <div className="relative mt-4 h-16 w-full">
          <svg
            viewBox="0 0 100 40"
            className="h-full w-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Linhas de Grade Horizontais */}
            <line x1="0" y1="5" x2="100" y2="5" className="stroke-slate-700/50" strokeWidth="0.5" />
            <line x1="0" y1="20" x2="100" y2="20" className="stroke-slate-700/50" strokeWidth="0.5" />
            <line x1="0" y1="35" x2="100" y2="35" className="stroke-slate-700/50" strokeWidth="0.5" />
            
            {/* Linha de Evolução (Laranja) */}
            <path
              d="M 0,25 L 15,20 L 30,22 L 45,18 L 55,28 L 65,5 L 75,25 L 85,35 L 100,20"
              fill="none"
              stroke="#22d3ee" /* Tailwind orange-600 */
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Eixo X - Legendas de Tempo */}
        <div className="mt-2 flex justify-between px-1 text-[11px] font-medium text-slate-500">
          <span>Jan</span>
          <span>Mar</span>
          <span>Jun</span>
          <span>Jul</span>
        </div>
      </div>
    </div>
  );
};

const GenericSummary = ({ balance, goal, nextDue, tip, prediction }) => (
  <div className="space-y-4 text-sm text-slate-300">
    <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-100">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Saldo previsto</p>
      <p className="mt-2 text-lg font-semibold">R$ {prediction}</p>
    </div>

    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl bg-slate-950/80 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Meta mensal</p>
        <p className="mt-2 text-base font-semibold text-white">{goal}%</p>
      </div>
      <div className="rounded-3xl bg-slate-950/80 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Próximo vencimento</p>
        <p className="mt-2 text-base font-semibold text-white">{nextDue}</p>
      </div>
    </div>

    <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Dica</p>
      <p className="mt-2 text-sm">{tip}</p>
    </div>
  </div>
);

const EmptyInvestmentsState = () => (
  <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/60 p-6 text-center text-slate-400">
    <p className="text-lg font-semibold text-slate-200">Nenhum investimento adicionado ainda</p>
    <p className="mt-2 text-sm">
      Cadastre seus aportes para acompanhar patrimônio, rentabilidade e evolução da carteira.
    </p>
  </div>
);

const InsightCard = ({
  balance,
  goal,
  nextDue,
  tip,
  prediction,
  investments = [],
  totalInvested = 0,
  totalCurrentValue = 0,
  totalProfit = 0,
  profitabilityPercentage = 0,
}) => {
  const hasInvestments = investments.length > 0;

  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">
            {hasInvestments ? "Carteira" : "Insights Financeiros"}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            {hasInvestments ? "Resumo da carteira" : "Resumo do mês"}
          </h3>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
          {hasInvestments ? "Investimentos" : "Projeções"}
        </span>
      </div>

      {hasInvestments ? (
        <InvestmentSummary
          totalInvested={totalInvested}
          totalCurrentValue={totalCurrentValue}
          totalProfit={totalProfit}
          profitabilityPercentage={profitabilityPercentage}
        />
      ) : (
        <>
          <EmptyInvestmentsState />
          <div className="mt-4">
            <GenericSummary
              balance={balance}
              goal={goal}
              nextDue={nextDue}
              tip={tip}
              prediction={prediction}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default InsightCard;