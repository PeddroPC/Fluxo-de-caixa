export const mockTransactions = [
  // --- JANEIRO 2026: Início de ano (Mês com déficit devido a impostos e anuidades) ---
  {
    id: 1,
    description: "Salário Analista de Dados",
    amount: 5200.00,
    date: "2026-01-05",
    type: "income",
    category: "Salário",
    observation: "Pagamento referente a dezembro com reajuste-base."
  },
  {
    id: 2,
    description: "Aluguel e Condomínio",
    amount: 1250.00,
    date: "2026-01-10",
    type: "expense",
    category: "Moradia",
    observation: "Repasse mensal imobiliária, inclui água."
  },
  {
    id: 3,
    description: "IPVA Ford New Fiesta",
    amount: 1850.00,
    date: "2026-01-15",
    type: "expense",
    category: "Transporte",
    observation: "Cota única com 3% de desconto."
  },
  {
    id: 4,
    description: "Mensalidade Unicesumar",
    amount: 420.00,
    date: "2026-01-20",
    type: "expense",
    category: "Educação",
    observation: "Curso de Administração - Semestre 3."
  },
  {
    id: 5,
    description: "Supermercado (Dieta/Hipertrofia)",
    amount: 680.50,
    date: "2026-01-22",
    type: "expense",
    category: "Alimentação",
    observation: "Compra focada em proteínas, frango e ovos para o mês."
  },
  {
    id: 6,
    description: "Mensalidade Academia",
    amount: 130.00,
    date: "2026-01-08",
    type: "expense",
    category: "Saúde",
    observation: "Plano anual parcelado."
  },
  {
    id: 7,
    description: "Gasolina Comum",
    amount: 250.00,
    date: "2026-01-12",
    type: "expense",
    category: "Transporte",
    observation: "Tanque cheio para rodar na cidade."
  },
  {
    id: 8,
    description: "Seguro Auto (1/4)",
    amount: 450.00,
    date: "2026-01-25",
    type: "expense",
    category: "Transporte",
    observation: "Primeira parcela da renovação anual."
  },
  {
    id: 9,
    description: "Material Didático e Livros",
    amount: 210.00,
    date: "2026-01-18",
    type: "expense",
    category: "Educação",
    observation: "Livros de gestão financeira para a faculdade."
  },
  {
    id: 10,
    description: "Jantar com a Namorada",
    amount: 185.00,
    date: "2026-01-28",
    type: "expense",
    category: "Restaurante",
    observation: "Comemoração de início de ano, rodízio de massas."
  },
  {
    id: 11,
    description: "Tesouro Selic 2029",
    amount: 300.00,
    date: "2026-01-29",
    type: "investment",
    category: "Investimentos",
    observation: "Aporte para reforçar a reserva de emergência.",
    investmentType: "Renda Fixa",
    profitability: 4.8,
    currentValue: 314.40
  },
  {
    id: 12,
    description: "Farmácia (Suplementos)",
    amount: 220.00,
    date: "2026-01-03",
    type: "expense",
    category: "Saúde",
    observation: "Creatina e Whey Protein."
  },

  // --- FEVEREIRO 2026: Mês curto, desenvolvimento de projeto extra ---
  {
    id: 13,
    description: "Salário Analista de Dados",
    amount: 5200.00,
    date: "2026-02-05",
    type: "income",
    category: "Salário",
    observation: "Folha padrão."
  },
  {
    id: 14,
    description: "Freelance - Plataforma de Leads Automotivos",
    amount: 1500.00,
    date: "2026-02-12",
    type: "income",
    category: "Freelance",
    observation: "Entrega do MVP (React/Spring Boot) para o cliente."
  },
  {
    id: 15,
    description: "Hospedagem e Domínio AWS",
    amount: 120.00,
    date: "2026-02-10",
    type: "expense",
    category: "Moradia",
    observation: "Custos de infraestrutura do projeto de leads."
  },
  {
    id: 16,
    description: "Aluguel e Condomínio",
    amount: 1250.00,
    date: "2026-02-10",
    type: "expense",
    category: "Moradia",
    observation: "Boleto mensal padrão."
  },
  {
    id: 17,
    description: "Mensalidade Unicesumar",
    amount: 420.00,
    date: "2026-02-20",
    type: "expense",
    category: "Educação",
    observation: "Boleto faculdade."
  },
  {
    id: 18,
    description: "Mensalidade Academia",
    amount: 130.00,
    date: "2026-02-08",
    type: "expense",
    category: "Saúde",
    observation: "Débito automático."
  },
  {
    id: 19,
    description: "Supermercado (Reposição)",
    amount: 480.00,
    date: "2026-02-15",
    type: "expense",
    category: "Alimentação",
    observation: "Compras semanais e produtos de limpeza."
  },
  {
    id: 20,
    description: "Gasolina Comum",
    amount: 200.00,
    date: "2026-02-02",
    type: "expense",
    category: "Transporte",
    observation: "Abastecimento quinzenal."
  },
  {
    id: 21,
    description: "FII MXRF11",
    amount: 400.00,
    date: "2026-02-18",
    type: "investment",
    category: "Investimentos",
    observation: "Compra de cotas no mercado fracionário.",
    investmentType: "Fundo Imobiliário",
    profitability: 1.2,
    currentValue: 404.80
  },
  {
    id: 22,
    description: "Overtime Suporte Medicator",
    amount: 350.00,
    date: "2026-02-28",
    type: "income",
    category: "Bônus",
    observation: "Horas extras para restore de banco de dados na Filial 2."
  },
  {
    id: 23,
    description: "Pizza Delivery",
    amount: 85.00,
    date: "2026-02-27",
    type: "expense",
    category: "Delivery",
    observation: "Jantar após finalização do script de restore."
  },

  // --- MARÇO 2026: Aumento de receitas (Bônus corporativo) ---
  {
    id: 24,
    description: "Salário Promovido",
    amount: 5800.00,
    date: "2026-03-05",
    type: "income",
    category: "Salário",
    observation: "Aumento salarial aprovado em avaliação de desempenho."
  },
  {
    id: 25,
    description: "PLR / Bônus Anual",
    amount: 2500.00,
    date: "2026-03-10",
    type: "income",
    category: "Bônus",
    observation: "Participação nos lucros referente ao atingimento de metas de dados."
  },
  {
    id: 26,
    description: "Aluguel e Condomínio",
    amount: 1250.00,
    date: "2026-03-10",
    type: "expense",
    category: "Moradia",
    observation: "Pagamento em dia."
  },
  {
    id: 27,
    description: "Mensalidade Unicesumar",
    amount: 420.00,
    date: "2026-03-20",
    type: "expense",
    category: "Educação",
    observation: "Fatura Março."
  },
  {
    id: 28,
    description: "Materiais Workshop Home Office",
    amount: 310.00,
    date: "2026-03-12",
    type: "expense",
    category: "Educação",
    observation: "Impressão de layouts e itens de ergonomia para projeto de extensão."
  },
  {
    id: 29,
    description: "Supermercado (Meal Prep)",
    amount: 620.00,
    date: "2026-03-18",
    type: "expense",
    category: "Alimentação",
    observation: "Compras pesadas para marmitas do mês."
  },
  {
    id: 30,
    description: "CDB 105% CDI Liquidez Diária",
    amount: 1500.00,
    date: "2026-03-15",
    type: "investment",
    category: "Investimentos",
    observation: "Alocação do bônus anual.",
    investmentType: "Renda Fixa",
    profitability: 3.5,
    currentValue: 1552.50
  },
  {
    id: 31,
    description: "ETF IVVB11",
    amount: 800.00,
    date: "2026-03-15",
    type: "investment",
    category: "Investimentos",
    observation: "Diversificação internacional atrelada ao S&P 500.",
    investmentType: "ETF",
    profitability: -1.5,
    currentValue: 788.00
  },
  {
    id: 32,
    description: "Mensalidade Academia",
    amount: 130.00,
    date: "2026-03-08",
    type: "expense",
    category: "Saúde",
    observation: "Débito mensal."
  },
  {
    id: 33,
    description: "Café com equipe",
    amount: 45.00,
    date: "2026-03-22",
    type: "expense",
    category: "Padaria",
    observation: "Café da tarde com Rodrigo e Giulia após reunião."
  },
  {
    id: 34,
    description: "Pacote Streaming",
    amount: 55.90,
    date: "2026-03-11",
    type: "expense",
    category: "Streaming",
    observation: "Spotify e Netflix."
  },
  {
    id: 35,
    description: "Gasolina Aditivada",
    amount: 220.00,
    date: "2026-03-28",
    type: "expense",
    category: "Transporte",
    observation: "Tanque cheio."
  },

  // --- ABRIL 2026: Despesas extras e impostos ---
  {
    id: 36,
    description: "Salário Mensal",
    amount: 5800.00,
    date: "2026-04-05",
    type: "income",
    category: "Salário",
    observation: "Recebimento padrão."
  },
  {
    id: 37,
    description: "Aluguel e Condomínio",
    amount: 1250.00,
    date: "2026-04-10",
    type: "expense",
    category: "Moradia",
    observation: "Boleto mensal."
  },
  {
    id: 38,
    description: "Sessão Tatuagem Antebraço",
    amount: 850.00,
    date: "2026-04-15",
    type: "expense",
    category: "Lazer",
    observation: "Sessão de sombreamento conforme sketch aprovado."
  },
  {
    id: 39,
    description: "Mensalidade Unicesumar",
    amount: 420.00,
    date: "2026-04-20",
    type: "expense",
    category: "Educação",
    observation: "Fatura Abril."
  },
  {
    id: 40,
    description: "Supermercado Geral",
    amount: 580.00,
    date: "2026-04-12",
    type: "expense",
    category: "Alimentação",
    observation: "Compra mensal."
  },
  {
    id: 41,
    description: "Mensalidade Academia",
    amount: 130.00,
    date: "2026-04-08",
    type: "expense",
    category: "Saúde",
    observation: "Manutenção do plano."
  },
  {
    id: 42,
    description: "Gasolina Comum",
    amount: 210.00,
    date: "2026-04-25",
    type: "expense",
    category: "Transporte",
    observation: "Abastecimento normal."
  },
  {
    id: 43,
    description: "Consultoria Fiscal IBS/CBS",
    amount: 250.00,
    date: "2026-04-18",
    type: "expense",
    category: "Outros",
    observation: "Treinamento online para atualizar regras tributárias do sistema farmacêutico."
  },
  {
    id: 44,
    description: "Ações ITSA4",
    amount: 250.00,
    date: "2026-04-22",
    type: "investment",
    category: "Investimentos",
    observation: "Aporte focado em dividendos.",
    investmentType: "Ações",
    profitability: 2.1,
    currentValue: 255.25
  },
  {
    id: 45,
    description: "Farmácia (Cicatrização)",
    amount: 85.00,
    date: "2026-04-16",
    type: "expense",
    category: "Saúde",
    observation: "Pomada e sabonete neutro para cuidados com a tattoo."
  },
  {
    id: 46,
    description: "Cinema + Pipoca",
    amount: 110.00,
    date: "2026-04-04",
    type: "expense",
    category: "Cinema",
    observation: "Sessão final de semana com a namorada."
  },

  // --- MAIO 2026: Mês equilibrado e manutenção do veículo ---
  {
    id: 47,
    description: "Salário Mensal",
    amount: 5800.00,
    date: "2026-05-05",
    type: "income",
    category: "Salário",
    observation: "Folha de pagamento normal."
  },
  {
    id: 48,
    description: "Aluguel e Condomínio",
    amount: 1250.00,
    date: "2026-05-10",
    type: "expense",
    category: "Moradia",
    observation: "Fixo mensal."
  },
  {
    id: 49,
    description: "Revisão e Troca de Óleo New Fiesta",
    amount: 320.00,
    date: "2026-05-14",
    type: "expense",
    category: "Manutenção",
    observation: "Troca de óleo, filtros e revisão básica de freios."
  },
  {
    id: 50,
    description: "Presente Dia das Mães",
    amount: 250.00,
    date: "2026-05-08",
    type: "expense",
    category: "Presentes",
    observation: "Perfume e flores."
  },
  {
    id: 51,
    description: "Mensalidade Unicesumar",
    amount: 420.00,
    date: "2026-05-20",
    type: "expense",
    category: "Educação",
    observation: "Mensalidade regular."
  },
  {
    id: 52,
    description: "Supermercado (Atacarejo)",
    amount: 650.00,
    date: "2026-05-06",
    type: "expense",
    category: "Alimentação",
    observation: "Compra em volume para baratear dieta."
  },
  {
    id: 53,
    description: "Mensalidade Academia",
    amount: 130.00,
    date: "2026-05-08",
    type: "expense",
    category: "Saúde",
    observation: "Plano recorrente."
  },
  {
    id: 54,
    description: "Gasolina Comum",
    amount: 240.00,
    date: "2026-05-16",
    type: "expense",
    category: "Transporte",
    observation: "Enchendo o tanque."
  },
  {
    id: 55,
    description: "Tesouro IPCA+ 2035",
    amount: 400.00,
    date: "2026-05-25",
    type: "investment",
    category: "Investimentos",
    observation: "Proteção contra inflação de longo prazo.",
    investmentType: "Renda Fixa",
    profitability: 5.5,
    currentValue: 422.00
  },
  {
    id: 56,
    description: "FII HGLG11",
    amount: 350.00,
    date: "2026-05-26",
    type: "investment",
    category: "Investimentos",
    observation: "Fundo de logística, foco em proventos.",
    investmentType: "Fundo Imobiliário",
    profitability: 0.8,
    currentValue: 352.80
  },
  {
    id: 57,
    description: "Padaria (Café da Manhã)",
    amount: 60.00,
    date: "2026-05-18",
    type: "expense",
    category: "Padaria",
    observation: "Café da manhã reforçado pós-treino no final de semana."
  },

  // --- JUNHO 2026: Mês romântico e viagem curta ---
  {
    id: 58,
    description: "Salário Mensal",
    amount: 5800.00,
    date: "2026-06-05",
    type: "income",
    category: "Salário",
    observation: "Crédito na conta."
  },
  {
    id: 59,
    description: "Aluguel e Condomínio",
    amount: 1250.00,
    date: "2026-06-10",
    type: "expense",
    category: "Moradia",
    observation: "Quitado."
  },
  {
    id: 60,
    description: "Hospedagem Viagem Casal",
    amount: 1200.00,
    date: "2026-06-11",
    type: "expense",
    category: "Viagens",
    observation: "Reserva de Airbnb na serra para o feriado/dia dos namorados."
  },
  {
    id: 61,
    description: "Presente Dia dos Namorados",
    amount: 350.00,
    date: "2026-06-12",
    type: "expense",
    category: "Presentes",
    observation: "Kit especial."
  },
  {
    id: 62,
    description: "Restaurantes na Viagem",
    amount: 480.00,
    date: "2026-06-13",
    type: "expense",
    category: "Restaurante",
    observation: "Almoços e fondues durante a viagem."
  },
  {
    id: 63,
    description: "PIX Recebido - Silmara",
    amount: 65.00,
    date: "2026-06-08",
    type: "income",
    category: "PIX recebido",
    observation: "Divisão de conta do almoço de equipe."
  },
  {
    id: 64,
    description: "Gasolina (Estrada)",
    amount: 350.00,
    date: "2026-06-10",
    type: "expense",
    category: "Transporte",
    observation: "Abastecimento focado na viagem, aditivada."
  },
  {
    id: 65,
    description: "Pedágios",
    amount: 85.00,
    date: "2026-06-14",
    type: "expense",
    category: "Transporte",
    observation: "Tags de pedágio via Sem Parar."
  },
  {
    id: 66,
    description: "Mensalidade Unicesumar",
    amount: 420.00,
    date: "2026-06-20",
    type: "expense",
    category: "Educação",
    observation: "Mensalidade regular."
  },
  {
    id: 67,
    description: "Supermercado Básico",
    amount: 450.00,
    date: "2026-06-18",
    type: "expense",
    category: "Alimentação",
    observation: "Compras mais leves devido aos dias fora de casa."
  },
  {
    id: 68,
    description: "Mensalidade Academia",
    amount: 130.00,
    date: "2026-06-08",
    type: "expense",
    category: "Saúde",
    observation: "Sem interrupções."
  },
  {
    id: 69,
    description: "ETF BOVA11",
    amount: 200.00,
    date: "2026-06-25",
    type: "investment",
    category: "Investimentos",
    observation: "Pequeno aporte para não passar o mês em branco.",
    investmentType: "ETF",
    profitability: -2.3,
    currentValue: 195.40
  },

  // --- JULHO 2026: 13º Salário, Upgrade de Setup/Carro ---
  {
    id: 70,
    description: "Salário Mensal",
    amount: 5800.00,
    date: "2026-07-05",
    type: "income",
    category: "Salário",
    observation: "Pagamento mensal."
  },
  {
    id: 71,
    description: "Primeira Parcela 13º Salário",
    amount: 2900.00,
    date: "2026-07-15",
    type: "income",
    category: "Décimo terceiro",
    observation: "Adiantamento corporativo aprovado."
  },
  {
    id: 72,
    description: "Scanner ELM 327 + Monitor Ultrawide",
    amount: 1450.00,
    date: "2026-07-18",
    type: "expense",
    category: "Eletrônicos",
    observation: "Scanner para mapear módulos do Fiesta e monitor para otimizar queries SQL no home office."
  },
  {
    id: 73,
    description: "Cashback Cartão de Crédito",
    amount: 45.50,
    date: "2026-07-22",
    type: "income",
    category: "Cashback",
    observation: "Resgate de pontos da compra dos eletrônicos."
  },
  {
    id: 74,
    description: "Aluguel e Condomínio",
    amount: 1250.00,
    date: "2026-07-10",
    type: "expense",
    category: "Moradia",
    observation: "Fixo."
  },
  {
    id: 75,
    description: "Mensalidade Unicesumar",
    amount: 420.00,
    date: "2026-07-20",
    type: "expense",
    category: "Educação",
    observation: "Mais um mês garantido."
  },
  {
    id: 76,
    description: "Supermercado Mensal",
    amount: 520.00,
    date: "2026-07-08",
    type: "expense",
    category: "Alimentação",
    observation: "Retomada da rotina forte de treinos."
  },
  {
    id: 77,
    description: "Gasolina Comum",
    amount: 230.00,
    date: "2026-07-14",
    type: "expense",
    category: "Transporte",
    observation: "Ciclo urbano."
  },
  {
    id: 78,
    description: "FII VISC11",
    amount: 500.00,
    date: "2026-07-25",
    type: "investment",
    category: "Investimentos",
    observation: "Aproveitando a queda do fundo de shoppings.",
    investmentType: "Fundo Imobiliário",
    profitability: 3.1,
    currentValue: 515.50
  },
  {
    id: 79,
    description: "Ações WEGE3",
    amount: 400.00,
    date: "2026-07-25",
    type: "investment",
    category: "Investimentos",
    observation: "Composição de carteira de valor.",
    investmentType: "Ações",
    profitability: 6.4,
    currentValue: 425.60
  },
  {
    id: 80,
    description: "Delivery (Sushi)",
    amount: 140.00,
    date: "2026-07-19",
    type: "expense",
    category: "Delivery",
    observation: "Comemoração das novas peças do setup."
  },
  {
    id: 81,
    description: "Jogos na Steam (Promo de Inverno)",
    amount: 120.00,
    date: "2026-07-02",
    type: "expense",
    category: "Jogos",
    observation: "Pacote de jogos indie."
  },
  {
    id: 82,
    description: "Mensalidade Academia",
    amount: 130.00,
    date: "2026-07-08",
    type: "expense",
    category: "Saúde",
    observation: "Ok."
  },

  // --- AGOSTO 2026: Foco em acumulação e saúde ---
  {
    id: 83,
    description: "Salário Mensal",
    amount: 5800.00,
    date: "2026-08-05",
    type: "income",
    category: "Salário",
    observation: "Pagamento regular."
  },
  {
    id: 84,
    description: "Consultoria SQL / Otimização de BD",
    amount: 1200.00,
    date: "2026-08-12",
    type: "income",
    category: "Freelance",
    observation: "Job extra criando rotinas para limpeza de banco MySQL de antigo cliente."
  },
  {
    id: 85,
    description: "CDB 110% CDI (Sofisa)",
    amount: 2500.00,
    date: "2026-08-15",
    type: "investment",
    category: "Investimentos",
    observation: "Guarda estrutural após freelas e adiantamento do mês anterior.",
    investmentType: "Renda Fixa",
    profitability: 1.1,
    currentValue: 2527.50
  },
  {
    id: 86,
    description: "Tesouro IPCA+ 2045",
    amount: 1000.00,
    date: "2026-08-16",
    type: "investment",
    category: "Investimentos",
    observation: "Foco total na aposentadoria.",
    investmentType: "Renda Fixa",
    profitability: 0.5,
    currentValue: 1005.00
  },
  {
    id: 87,
    description: "FII KNCR11",
    amount: 300.00,
    date: "2026-08-20",
    type: "investment",
    category: "Investimentos",
    observation: "Fundo de papel indexado ao CDI.",
    investmentType: "Fundo Imobiliário",
    profitability: 1.0,
    currentValue: 303.00
  },
  {
    id: 88,
    description: "Sessão Tatuagem Peitoral",
    amount: 600.00,
    date: "2026-08-22",
    type: "expense",
    category: "Lazer",
    observation: "Início do novo projeto de estêncil no peito."
  },
  {
    id: 89,
    description: "Aluguel e Condomínio",
    amount: 1250.00,
    date: "2026-08-10",
    type: "expense",
    category: "Moradia",
    observation: "Conta quitada."
  },
  {
    id: 90,
    description: "Mensalidade Unicesumar",
    amount: 420.00,
    date: "2026-08-20",
    type: "expense",
    category: "Educação",
    observation: "Estudos em dia."
  },
  {
    id: 91,
    description: "Supermercado (Dieta Forte)",
    amount: 580.00,
    date: "2026-08-08",
    type: "expense",
    category: "Alimentação",
    observation: "Bulking season."
  },
  {
    id: 92,
    description: "Gasolina Aditivada",
    amount: 210.00,
    date: "2026-08-18",
    type: "expense",
    category: "Transporte",
    observation: "Rotina padrão."
  },
  {
    id: 93,
    description: "Mensalidade Academia",
    amount: 130.00,
    date: "2026-08-08",
    type: "expense",
    category: "Saúde",
    observation: "Meta: ganhar massa magra."
  },
  {
    id: 94,
    description: "Barbearia",
    amount: 65.00,
    date: "2026-08-14",
    type: "expense",
    category: "Saúde",
    observation: "Corte cabelo e barba."
  },
  {
    id: 95,
    description: "Pacote Streaming",
    amount: 55.90,
    date: "2026-08-11",
    type: "expense",
    category: "Streaming",
    observation: "Renovação."
  },
  {
    id: 96,
    description: "Consulta Exame de Sangue",
    amount: 150.00,
    date: "2026-08-26",
    type: "expense",
    category: "Exames",
    observation: "Exames de rotina (colesterol, testosterona, vitaminas)."
  }
];

export default mockTransactions;