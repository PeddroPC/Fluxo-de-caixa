import { useMemo } from "react";
import CashForm from "./Components/CashForm";
import CashList from "./Components/CashList";
import CashModes from "./Components/CashModes";
import Sidebar from "./Components/Sidebar";
import DashboardHeader from "./Components/DashboardHeader";
import SummaryCard from "./Components/SummaryCard";
import PieChartCard from "./Components/PieChartCard";
import InsightCard from "./Components/InsightCard";
import useCash from "./hooks/useCash";
import useFilters from "./hooks/useFilters";
import useModal from "./hooks/useModal";

function App() {
  const { transactions, removeTransaction, totalIncome, totalExpense, balance } = useCash();

  const { filter, search, sortBy } = useFilters();
  const { isOpen, selectedTransaction, openModal, closeModal } = useModal();

  const filteredData = useMemo(
    () =>
      transactions.filter((item) => {
        const matchesFilter = filter === "all" || item.type === filter;
        const matchesSearch = item.description.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
      }),
    [transactions, filter, search],
  );

  const sortedData = useMemo(
    () =>
      [...filteredData].sort((a, b) => {
        if (sortBy === "recent") {
          return new Date(b.date) - new Date(a.date);
        }
        if (sortBy === "oldest") {
          return new Date(a.date) - new Date(b.date);
        }
        if (sortBy === "amountHigh") {
          return Number(b.amount) - Number(a.amount);
        }
        if (sortBy === "amountLow") {
          return Number(a.amount) - Number(b.amount);
        }
        return 0;
      }),
    [filteredData, sortBy],
  );

  const categoryMap = {
    salary: "Salário",
    freelance: "Freelance",
    bonus: "Bônus",
    pix: "Receita",
    mercado: "Mercado",
    restaurante: "Alimentação",
    farmácia: "Saúde",
    aluguel: "Moradia",
    energia: "Contas",
    água: "Contas",
    curso: "Educação",
    seguro: "Seguro",
    academia: "Saúde",
    uber: "Transporte",
    gasolina: "Transporte",
    netflix: "Streaming",
    spotify: "Streaming",
    youtube: "Streaming",
    carbur: "Transporte",
  };

  const normalizeCategory = (description) => {
    const normalized = description.toLowerCase();
    const foundKey = Object.keys(categoryMap).find((key) => normalized.includes(key));
    return categoryMap[foundKey] || (normalized.includes("salário") ? "Salário" : "Outros");
  };

  const categoryTotals = useMemo(
    () =>
      transactions.reduce((acc, item) => {
        const category = normalizeCategory(item.description);
        acc[category] = (acc[category] || 0) + Number(item.amount);
        return acc;
      }, {}),
    [transactions],
  );

  const pieData = useMemo(
    () =>
      Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([label, value]) => ({ label, value })),
    [categoryTotals],
  );

  const handleEdit = (transaction) => openModal(transaction);
  const handleOpenModal = () => openModal(null);
  const prediction = (balance + totalIncome * 0.08).toFixed(2);
  const goal = 30;
  const nextDue = "Cartão - 27/05";
  const tip = "Revise as assinaturas e priorize reservas para gastos recorrentes.";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 p-8 lg:p-10">
          <DashboardHeader
            onAdd={handleOpenModal}
            onReset={() => {
              localStorage.clear();
              window.location.reload();
            }}
          />

          <CashModes />

          <section className="grid gap-6 xl:grid-cols-[1fr_auto]">
            <div className="grid gap-6 sm:grid-cols-2">
              <SummaryCard
                title="Saldo Atual"
                subtext="Visão geral"
                value={balance.toFixed(2)}
                icon="💎"
                accent="bg-cyan-500"
              />
              <SummaryCard
                title="Receitas do mês"
                subtext="Entradas"
                value={totalIncome.toFixed(2)}
                icon="⬆️"
                accent="bg-emerald-500"
              />
              <SummaryCard
                title="Despesas do mês"
                subtext="Saídas"
                value={totalExpense.toFixed(2)}
                icon="⬇️"
                accent="bg-rose-500"
              />
              <SummaryCard
                title="Economia do mês"
                subtext="Saldo líquido"
                value={(totalIncome - totalExpense).toFixed(2)}
                icon="💼"
                accent="bg-sky-500"
              />
            </div>

            <div className="grid gap-6">
              <PieChartCard title="Gastos por categoria" data={pieData} />
            </div>
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
            <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Últimas Movimentações</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Atividades recentes</h2>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">
                  {sortedData.length} itens
                </span>
              </div>
              <div className="space-y-4">
                <CashList data={sortedData.slice(0, 6)} onDelete={removeTransaction} onEdit={handleEdit} />
              </div>
            </div>

            <div className="grid gap-6">
              <InsightCard
                balance={balance.toFixed(2)}
                goal={goal}
                nextDue={nextDue}
                tip={tip}
                prediction={prediction}
              />
            </div>
          </section>

          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 pt-20 backdrop-blur-sm">
              <div className="w-full max-w-2xl rounded-[32px] border border-slate-800 bg-slate-950 p-6 shadow-2xl shadow-slate-950/60 animate-slide-down">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    {selectedTransaction ? "Editar movimentação" : "Nova movimentação"}
                  </h2>
                  <button onClick={closeModal} className="text-slate-400 transition hover:text-white">
                    ✕
                  </button>
                </div>

                <CashForm />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
