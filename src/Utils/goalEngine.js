/**
 * Motor de cálculo para metas financeiras.
 * Centraliza toda a lógica derivada de uma meta, evitando que as páginas
 * contenham cálculos financeiros embutidos no JSX.
 */

/**
 * Calcula o percentual de progresso de uma meta (limitado a 100%).
 * @param {{ currentAmount: number, targetAmount: number }} goal
 * @returns {number} percentual entre 0 e 100
 */
export const calculateGoalProgress = (goal) => {
  if (!goal.targetAmount || goal.targetAmount <= 0) return 0;
  const raw = (Number(goal.currentAmount || 0) / Number(goal.targetAmount)) * 100;
  return Math.min(raw, 100);
};

/**
 * Calcula o valor ainda necessário para atingir a meta.
 * @param {{ currentAmount: number, targetAmount: number }} goal
 * @returns {number}
 */
export const calculateRemainingAmount = (goal) => {
  const remaining = Number(goal.targetAmount || 0) - Number(goal.currentAmount || 0);
  return Math.max(remaining, 0);
};

/**
 * Calcula o valor que precisaria ser guardado mensalmente para atingir
 * a meta dentro do prazo. Retorna null se o prazo já passou ou não há prazo.
 * @param {{ currentAmount: number, targetAmount: number, deadline: string }} goal
 * @returns {number | null}
 */
export const calculateMonthlyNeeded = (goal) => {
  if (!goal.deadline) return null;

  const remaining = calculateRemainingAmount(goal);
  if (remaining <= 0) return 0;

  const today = new Date();
  const deadline = new Date(goal.deadline);

  // Calcular meses restantes
  const monthsLeft =
    (deadline.getFullYear() - today.getFullYear()) * 12 +
    (deadline.getMonth() - today.getMonth());

  if (monthsLeft <= 0) return null; // prazo ultrapassado

  return remaining / monthsLeft;
};

/**
 * Determina o status textual e a cor semântica de uma meta.
 * @param {{ currentAmount: number, targetAmount: number, deadline: string }} goal
 * @returns {{ label: string, color: string, bgColor: string, textColor: string }}
 */
export const getGoalStatus = (goal) => {
  const progress = calculateGoalProgress(goal);
  const today = new Date();
  const deadline = goal.deadline ? new Date(goal.deadline) : null;
  const isOverdue = deadline && deadline < today && progress < 100;
  const monthsLeft = deadline
    ? (deadline.getFullYear() - today.getFullYear()) * 12 +
      (deadline.getMonth() - today.getMonth())
    : Infinity;

  if (progress >= 100) {
    return {
      label: "Concluída",
      color: "emerald",
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500/30",
    };
  }

  if (isOverdue) {
    return {
      label: "Prazo ultrapassado",
      color: "rose",
      bgColor: "bg-rose-500/10",
      textColor: "text-rose-400",
      borderColor: "border-rose-500/30",
    };
  }

  if (monthsLeft <= 2 && progress < 100) {
    return {
      label: "Prazo próximo",
      color: "amber",
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-400",
      borderColor: "border-amber-500/30",
    };
  }

  if (progress >= 80) {
    return {
      label: "Quase lá!",
      color: "cyan",
      bgColor: "bg-cyan-500/10",
      textColor: "text-cyan-400",
      borderColor: "border-cyan-500/30",
    };
  }

  return {
    label: "Em andamento",
    color: "slate",
    bgColor: "bg-slate-500/10",
    textColor: "text-slate-400",
    borderColor: "border-slate-700",
  };
};

/**
 * Gera insights contextuais derivados dos dados reais das metas.
 * Retorna um array de objetos de insight para exibição na UI.
 * @param {Array} goals
 * @returns {Array<{ icon: string, title: string, body: string, type: string }>}
 */
export const getGoalInsights = (goals) => {
  if (!goals || goals.length === 0) return [];

  const insights = [];
  const today = new Date();

  // Meta concluída
  const completed = goals.find((g) => Number(g.currentAmount) >= Number(g.targetAmount));
  if (completed) {
    insights.push({
      icon: "🎯",
      title: "Meta concluída",
      body: `Parabéns! Você atingiu sua meta "${completed.name || completed.title}".`,
      type: "success",
    });
  }

  // Meta mais próxima do objetivo (excluindo concluídas)
  const incomplete = goals.filter((g) => Number(g.currentAmount) < Number(g.targetAmount));
  if (incomplete.length > 0) {
    const closest = incomplete.reduce((prev, curr) => {
      const prevPct = calculateGoalProgress(prev);
      const currPct = calculateGoalProgress(curr);
      return currPct > prevPct ? curr : prev;
    });

    const pct = calculateGoalProgress(closest).toFixed(0);
    if (pct > 0) {
      insights.push({
        icon: "🚀",
        title: "Meta mais próxima",
        body: `"${closest.name || closest.title}" está ${pct}% concluída.`,
        type: "info",
      });
    }
  }

  // Meta com prazo crítico
  const urgent = goals
    .filter((g) => g.deadline && Number(g.currentAmount) < Number(g.targetAmount))
    .find((g) => {
      const deadline = new Date(g.deadline);
      const monthsLeft =
        (deadline.getFullYear() - today.getFullYear()) * 12 +
        (deadline.getMonth() - today.getMonth());
      return monthsLeft <= 2 && monthsLeft > 0;
    });

  if (urgent) {
    const monthly = calculateMonthlyNeeded(urgent);
    if (monthly !== null && monthly > 0) {
      const monthlyFormatted = monthly.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      insights.push({
        icon: "⚠",
        title: "Atenção ao prazo",
        body: `"${urgent.name || urgent.title}" precisa de ~${monthlyFormatted}/mês para ser concluída no prazo.`,
        type: "warning",
      });
    }
  }

  return insights;
};

/**
 * Filtra metas por status.
 * @param {Array} goals
 * @param {"all" | "active" | "completed" | "overdue"} filter
 * @returns {Array}
 */
export const filterGoalsByStatus = (goals, filter) => {
  if (!goals) return [];
  if (filter === "all") return goals;

  return goals.filter((goal) => {
    const progress = calculateGoalProgress(goal);
    const today = new Date();
    const deadline = goal.deadline ? new Date(goal.deadline) : null;
    const isOverdue = deadline && deadline < today && progress < 100;

    if (filter === "completed") return progress >= 100;
    if (filter === "overdue") return isOverdue;
    if (filter === "active") return progress < 100 && !isOverdue;
    return true;
  });
};