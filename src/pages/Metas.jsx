import React, { useMemo, useState } from "react";
import { Target, Plus } from "lucide-react";
import { useGoals } from "../context/GoalsContext";
import { useToast } from "../context/ToastContext";
import GoalCard from "../Components/goals/GoalCard";
import GoalModal from "../Components/goals/GoalModal";
import GoalSummary from "../Components/goals/GoalSummary";
import GoalInsights from "../Components/goals/GoalInsights";
import GoalFilter from "../Components/goals/GoalFilter";
import { filterGoalsByStatus, calculateGoalProgress } from "../Utils/goalEngine";

// Estado vazio quando não há metas cadastradas.
const EmptyGoalsState = ({ onCreateFirst }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500/10 border border-amber-500/20">
      <Target size={36} className="text-amber-400" />
    </div>
    <h3 className="text-xl font-semibold text-white">Nenhuma meta definida</h3>
    <p className="mt-2 max-w-sm text-sm text-slate-400">
      Você ainda não possui metas financeiras. Defina um objetivo e acompanhe
      seu progresso até conquistá-lo.
    </p>
    <button
      onClick={onCreateFirst}
      className="mt-6 flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
    >
      <Plus size={16} />
      Criar primeira meta
    </button>
  </div>
);

// Estado vazio quando o filtro não retorna resultados.
const EmptyFilterState = ({ filter, onClearFilter }) => {
  const labels = {
    active: "em andamento",
    completed: "concluídas",
    overdue: "atrasadas",
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-slate-400">
        Nenhuma meta {labels[filter] ?? ""} encontrada.
      </p>
      <button
        onClick={onClearFilter}
        className="mt-3 text-sm text-amber-400 underline underline-offset-2 transition hover:text-amber-300"
      >
        Ver todas as metas
      </button>
    </div>
  );
};

const Metas = () => {
  const { goals, deleteGoal } = useGoals();
  const { showToast } = useToast();

  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Contagem de metas por status para os badges do filtro.
  const filterCounts = useMemo(() => {
    const today = new Date();
    return {
      all: goals.length,
      active: goals.filter((g) => {
        const pct = calculateGoalProgress(g);
        const deadline = g.deadline ? new Date(g.deadline) : null;
        const isOverdue = deadline && deadline < today && pct < 100;
        return pct < 100 && !isOverdue;
      }).length,
      completed: goals.filter((g) => calculateGoalProgress(g) >= 100).length,
      overdue: goals.filter((g) => {
        const pct = calculateGoalProgress(g);
        const deadline = g.deadline ? new Date(g.deadline) : null;
        return deadline && deadline < today && pct < 100;
      }).length,
    };
  }, [goals]);

  const filteredGoals = useMemo(
    () => filterGoalsByStatus(goals, activeFilter),
    [goals, activeFilter],
  );

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGoal(null);
  };

  const handleDeleteRequest = (id) => setPendingDeleteId(id);

  const confirmDelete = () => {
    if (pendingDeleteId) {
      deleteGoal(pendingDeleteId);
      showToast("Meta excluída", "success");
    }
    setPendingDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-12 font-sans text-slate-100">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-amber-400/80">Planejamento</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Metas Financeiras
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Defina objetivos e acompanhe seu progresso.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingGoal(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
        >
          <Plus size={16} />
          Nova Meta
        </button>
      </div>

      {goals.length === 0 ? (
        <EmptyGoalsState onCreateFirst={() => setIsModalOpen(true)} />
      ) : (
        <>
          {/* Resumo */}
          <GoalSummary goals={goals} />

          {/* Layout principal: grid com insights lateral */}
          <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
            {/* Coluna principal: filtros + cards */}
            <div>
              {/* Filtros */}
              <div className="mb-6">
                <GoalFilter
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  counts={filterCounts}
                />
              </div>

              {/* Grid de cards */}
              {filteredGoals.length === 0 ? (
                <EmptyFilterState
                  filter={activeFilter}
                  onClearFilter={() => setActiveFilter("all")}
                />
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  {filteredGoals.map((goal) => (
                    <GoalCard
                      key={goal.id}
                      goal={goal}
                      onEdit={handleEdit}
                      onDelete={handleDeleteRequest}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Coluna lateral: insights */}
            <div className="xl:pt-[52px]">
              <GoalInsights goals={goals} />
            </div>
          </div>
        </>
      )}

      {/* Modal de criação/edição */}
      <GoalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingGoal={editingGoal}
      />

      {/* Confirmação de exclusão */}
      {pendingDeleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-400">
              Confirmar exclusão
            </p>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Excluir esta meta?
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Esta ação não poderá ser desfeita.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setPendingDeleteId(null)}
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Metas;
