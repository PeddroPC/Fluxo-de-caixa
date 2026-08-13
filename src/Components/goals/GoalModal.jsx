import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useGoals } from "../../context/GoalsContext";
import { useToast } from "../../context/ToastContext";

const COLORS = [
  { label: "Ciano", value: "#22d3ee" },
  { label: "Violeta", value: "#a78bfa" },
  { label: "Verde", value: "#34d399" },
  { label: "Laranja", value: "#fb923c" },
  { label: "Rosa", value: "#f472b6" },
  { label: "Azul", value: "#60a5fa" },
  { label: "Amarelo", value: "#fbbf24" },
];

const CATEGORIES = [
  "Reserva", "Viagem", "Veículo", "Imóvel", "Tecnologia",
  "Educação", "Saúde", "Investimento", "Outros",
];

const getInitialForm = () => ({
  name: "",
  targetAmount: "",
  currentAmount: "",
  deadline: "",
  category: "Outros",
  color: "#22d3ee",
  observation: "",
});

// Modal reutilizável para criar e editar metas financeiras.
const GoalModal = ({ isOpen, onClose, editingGoal }) => {
  const { addGoal, updateGoal } = useGoals();
  const { showToast } = useToast();
  const [form, setForm] = useState(getInitialForm());
  const isEditing = Boolean(editingGoal);

  useEffect(() => {
    if (editingGoal) {
      setForm({
        name: editingGoal.name || editingGoal.title || "",
        targetAmount: editingGoal.targetAmount ?? "",
        currentAmount: editingGoal.currentAmount ?? "",
        deadline: editingGoal.deadline ?? "",
        category: editingGoal.category ?? "Outros",
        color: editingGoal.color ?? "#22d3ee",
        observation: editingGoal.observation ?? "",
      });
    } else {
      setForm(getInitialForm());
    }
  }, [editingGoal, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      showToast("O nome da meta é obrigatório", "error");
      return;
    }
    if (!form.targetAmount || Number(form.targetAmount) <= 0) {
      showToast("O valor objetivo deve ser maior que zero", "error");
      return;
    }
    if (Number(form.currentAmount) < 0) {
      showToast("O valor atual não pode ser negativo", "error");
      return;
    }

    const payload = {
      ...form,
      targetAmount: Number(form.targetAmount),
      currentAmount: Number(form.currentAmount || 0),
    };

    if (isEditing) {
      updateGoal(editingGoal.id, payload);
      showToast("Meta atualizada com sucesso", "success");
    } else {
      addGoal(payload);
      showToast("Meta criada com sucesso", "success");
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[28px] border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/60">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-400/80">
              {isEditing ? "Editar" : "Nova"} Meta
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">
              {isEditing ? "Atualizar objetivo" : "Definir novo objetivo"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Nome */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Nome da meta <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Reserva de emergência, Viagem..."
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 outline-none placeholder-slate-500 transition focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
            />
          </div>

          {/* Valores */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">
                Valor objetivo (R$) <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0,00"
                value={form.targetAmount}
                onChange={(e) => handleChange("targetAmount", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">
                Valor atual (R$)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
                value={form.currentAmount}
                onChange={(e) => handleChange("currentAmount", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>
          </div>

          {/* Prazo e Categoria */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Prazo</label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => handleChange("deadline", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Categoria</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Cor */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Cor da meta</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  title={c.label}
                  onClick={() => handleChange("color", c.value)}
                  className={`h-7 w-7 rounded-full border-2 transition-all ${
                    form.color === c.value
                      ? "scale-110 border-white shadow-lg"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  style={{ background: c.value }}
                />
              ))}
            </div>
          </div>

          {/* Observação */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Observação</label>
            <textarea
              rows={2}
              placeholder="Notas adicionais sobre esta meta..."
              value={form.observation}
              onChange={(e) => handleChange("observation", e.target.value)}
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-slate-100 outline-none placeholder-slate-500 transition focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-700 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-amber-500 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
            >
              {isEditing ? "Salvar alterações" : "Criar meta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalModal;
