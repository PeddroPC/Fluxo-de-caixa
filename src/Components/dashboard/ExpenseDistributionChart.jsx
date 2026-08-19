import React, { useMemo } from "react";
import PieChartCard from "../PieChartCard";

const CHART_COLORS = [
  "#22d3ee", // cyan-400
  "#a78bfa", // violet-400
  "#34d399", // emerald-400
  "#fb923c", // orange-400
  "#f472b6", // pink-400
  "#60a5fa", // blue-400
];

const MAX_CATEGORIES = 5;

/**
 * Wrapper semantico para o grafico de distribuicao de despesas.
 * Limita as categorias as top 5 e agrupa o restante em "Outros".
 *
 * Props:
 * - pieData: Array<{ label: string, value: number }> - dados ja ordenados por valor
 */
const ExpenseDistributionChart = ({ pieData = [] }) => {
  const processedData = useMemo(() => {
    if (!pieData || pieData.length === 0) return [];

    // Ja vem ordenado por valor (do useDashboard). Limitar ao top 5.
    const top = pieData.slice(0, MAX_CATEGORIES);
    const rest = pieData.slice(MAX_CATEGORIES);

    if (rest.length > 0) {
      const othersValue = rest.reduce((sum, item) => sum + item.value, 0);
      return [...top, { label: "Outros", value: othersValue }];
    }

    return top;
  }, [pieData]);

  const topCategory = processedData[0]?.label ?? null;

  return (
    <PieChartCard
      title="Despesas por categoria"
      data={processedData}
      subtitle={
        topCategory
          ? `Principal: ${topCategory}`
          : "Sem despesas neste periodo"
      }
    />
  );
};

export default ExpenseDistributionChart;
