import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import mockGoals from "../data/mockGoals";

const GoalsContext = createContext(null);
const storageKey = "goals";

const normalizeGoal = (goal) => ({
  ...goal,
  name: goal.name || goal.title || "Meta sem nome",
  currentAmount: Number(goal.currentAmount || 0),
  targetAmount: Number(goal.targetAmount || 0),
});

const getInitialGoals = () => {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length > 0
        ? parsed.map(normalizeGoal)
        : mockGoals.map(normalizeGoal);
    } catch (error) {
      console.error("Não foi possível carregar as metas salvas.", error);
    }
  }
  return mockGoals.map(normalizeGoal);
};

// Provider responsável por armazenar e manipular as metas financeiras do app.
export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState(() => getInitialGoals());

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(goals));
  }, [goals]);

  const addGoal = useCallback((goal) => {
    const newGoal = normalizeGoal({
      ...goal,
      id: Date.now(),
      createdAt: new Date().toISOString().split("T")[0],
    });
    setGoals((prev) => [...prev, newGoal]);
  }, []);

  const updateGoal = useCallback((id, updatedGoal) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id ? normalizeGoal({ ...goal, ...updatedGoal }) : goal,
      ),
    );
  }, []);

  const deleteGoal = useCallback((id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  }, []);

  /**
   * Adiciona um aporte ao valor atual de uma meta.
   * Preparado para futuramente receber aportes do fluxo financeiro.
   */
  const addContribution = useCallback((id, amount) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id
          ? normalizeGoal({
              ...goal,
              currentAmount: Number(goal.currentAmount) + Number(amount),
            })
          : goal,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({
      goals,
      addGoal,
      updateGoal,
      deleteGoal,
      addContribution,
    }),
    [goals, addGoal, updateGoal, deleteGoal, addContribution],
  );

  return <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>;
};

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error("useGoals must be used within a GoalsProvider");
  }
  return context;
};