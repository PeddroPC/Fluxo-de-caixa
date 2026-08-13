// Dados mockados para metas financeiras com todos os campos necessários.
const mockGoals = [
  {
    id: 1,
    name: "Reserva de emergência",
    targetAmount: 10000,
    currentAmount: 3500,
    deadline: "2026-12-31",
    category: "Reserva",
    color: "#22d3ee",
    observation: "Construir uma reserva equivalente a 6 meses de despesas.",
    createdAt: "2026-01-01",
  },
  {
    id: 2,
    name: "Viagem para Europa",
    targetAmount: 15000,
    currentAmount: 12300,
    deadline: "2026-10-01",
    category: "Viagem",
    color: "#a78bfa",
    observation: "Viagem de férias de fim de ano para Portugal e Espanha.",
    createdAt: "2026-03-01",
  },
  {
    id: 3,
    name: "Comprar um notebook",
    targetAmount: 5000,
    currentAmount: 5000,
    deadline: "2026-07-31",
    category: "Tecnologia",
    color: "#34d399",
    observation: "Notebook para trabalho remoto.",
    createdAt: "2026-02-01",
  },
  {
    id: 4,
    name: "Entrada do carro",
    targetAmount: 20000,
    currentAmount: 4200,
    deadline: "2027-06-30",
    category: "Veículo",
    color: "#fb923c",
    observation: "Juntar para a entrada de um carro 0km.",
    createdAt: "2026-04-01",
  },
];

export default mockGoals;