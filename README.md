# 💰 Fluxo de Caixa Pessoal

Aplicação web para **controle e análise financeira pessoal**, desenvolvida em React.

O projeto permite registrar receitas, despesas e investimentos, acompanhar metas financeiras, analisar o comportamento financeiro ao longo dos meses e visualizar indicadores através de gráficos e relatórios.

> **Objetivo do projeto:** além de ser uma aplicação funcional de controle financeiro, este projeto foi desenvolvido como prática de arquitetura React, gerenciamento de estado, Context API, Hooks, componentes reutilizáveis e visualização de dados.

---

## 📸 Visão geral

A aplicação é organizada em diferentes áreas para separar o registro das movimentações da análise financeira.

### Principais módulos

* 📊 Dashboard
* 💰 Receitas
* 💸 Despesas
* 📈 Investimentos
* 🎯 Metas
* 📋 Relatórios
* 📅 Filtro por período
* 🔎 Busca e ordenação
* 📝 Detalhes das movimentações
* ✏️ Edição de movimentações
* 🗑️ Exclusão de movimentações
* 🔔 Sistema de notificações
* 💾 Persistência dos dados

---

# 🚀 Funcionalidades

## 📊 Dashboard

O Dashboard funciona como uma visão geral da situação financeira.

Apresenta indicadores como:

* saldo;
* receitas;
* despesas;
* economia;
* investimentos;
* comparações entre períodos;
* gráficos;
* indicadores financeiros;
* movimentações recentes;
* insights.

A ideia do Dashboard é fornecer uma **visão rápida**, enquanto informações mais detalhadas ficam disponíveis nas páginas específicas.

---

# 💰 Receitas

Página destinada ao gerenciamento das entradas financeiras.

É possível:

* adicionar receitas;
* editar receitas;
* excluir receitas;
* visualizar detalhes;
* pesquisar movimentações;
* ordenar por data ou valor;
* filtrar por mês/ano;
* visualizar total de receitas;
* visualizar quantidade de lançamentos;
* identificar a maior receita do período.

Exemplos:

* salário;
* freelance;
* bônus;
* vendas;
* dividendos;
* outros recebimentos.

---

# 💸 Despesas

Página destinada ao controle das saídas financeiras.

Permite:

* adicionar despesas;
* editar despesas;
* excluir despesas;
* visualizar detalhes;
* pesquisar;
* ordenar;
* filtrar por período;
* analisar categorias;
* visualizar total gasto.

Exemplos:

* alimentação;
* moradia;
* transporte;
* educação;
* saúde;
* assinaturas;
* lazer.

---

# 📈 Investimentos

Investimentos possuem tratamento diferente de uma despesa tradicional.

Ao realizar um investimento, o dinheiro é retirado do fluxo de caixa disponível, mas **não necessariamente representa perda patrimonial**.

Exemplo:

```text
Conta bancária
- R$ 1.000

Investimento
+ R$ 1.000

Patrimônio
+ R$ 1.000
```

Por isso, investimentos possuem informações específicas, como:

* tipo de investimento;
* valor investido;
* valor atual;
* rentabilidade;
* lucro/prejuízo;
* data;
* observações.

Exemplo de objeto:

```js
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
}
```

A página de investimentos possui foco maior em:

* evolução;
* rentabilidade;
* patrimônio investido;
* lucro/prejuízo;
* gráficos;
* previsões;
* análise da carteira.

---

# 🎯 Metas

A página de metas permite transformar objetivos financeiros em objetivos acompanháveis.

Exemplos:

```text
Reserva de emergência
R$ 5.000 / R$ 10.000

Viagem
R$ 2.000 / R$ 5.000

Novo computador
R$ 3.500 / R$ 6.000
```

Cada meta pode apresentar:

* nome;
* valor objetivo;
* valor acumulado;
* progresso;
* percentual concluído;
* prazo;
* status.

A ideia é permitir acompanhar visualmente a evolução dos objetivos.

---

# 📋 Relatórios

A página de relatórios possui uma finalidade diferente do Dashboard.

Enquanto o Dashboard apresenta um **resumo geral**, os Relatórios possuem foco em análise histórica.

Entre os indicadores:

* receitas;
* despesas;
* saldo;
* taxa de economia;
* investimentos;
* comparação com períodos anteriores;
* evolução mensal;
* receitas x despesas;
* despesas por categoria;
* evolução dos investimentos;
* insights financeiros.

### Exemplos de análises

```text
Receitas
↑ 12,5% em relação ao mês anterior

Despesas
↓ 8,2%

Saldo
↑ 31,4%

Economia
44,8%
```

Também são utilizados gráficos para identificar tendências e padrões financeiros.

---

# 📅 Controle por período

A aplicação possui um `DateContext` responsável pelo período selecionado.

Exemplo:

```text
<  Jul 2026  >
```

Ao alterar o período, os componentes que utilizam o contexto podem atualizar seus dados automaticamente.

O período é representado por:

```js
{
  month: 7,
  year: 2026
}
```

O mês é tratado internamente de acordo com a convenção utilizada pela aplicação.

Esse mecanismo é utilizado para:

* Dashboard;
* Receitas;
* Despesas;
* Relatórios;
* gráficos;
* cálculos comparativos.

---

# 🔎 Filtros

O projeto possui um `FilterContext` responsável por estados relacionados à filtragem e ordenação.

Entre eles:

### Pesquisa

Permite pesquisar pela descrição da movimentação.

Exemplo:

```js
const normalizedSearch = search.trim().toLowerCase();
```

Isso permite realizar uma busca sem depender de letras maiúsculas ou minúsculas.

### Ordenação

Opções disponíveis:

* mais recente;
* mais antigo;
* maior valor;
* menor valor.

---

# 📝 Detalhes das movimentações

As movimentações podem ser selecionadas para abrir um modal com informações detalhadas.

O modal apresenta:

* descrição;
* data;
* tipo;
* categoria;
* valor;
* observação;
* informações específicas do investimento.

Também existem ações para:

* editar;
* excluir.

---

# ✏️ Formulário de movimentações

O formulário é reutilizado para diferentes operações.

Dependendo do contexto, ele pode funcionar como:

```text
Adicionar
      ↓
Formulário vazio
      ↓
addTransaction()
```

ou:

```text
Editar
      ↓
Formulário preenchido
      ↓
updateTransaction()
```

Isso evita criar componentes separados para adicionar e editar movimentações.

---

# 🧠 Arquitetura

O projeto utiliza principalmente:

* React;
* Context API;
* Hooks;
* componentes reutilizáveis;
* `useMemo`;
* `useCallback`;
* Tailwind CSS.

A aplicação foi estruturada para separar responsabilidades.

---

## Contexts

### CashContext

Responsável pelo estado principal das movimentações.

Concentra operações como:

```text
transactions
addTransaction()
updateTransaction()
deleteTransaction()
```

Também disponibiliza dados derivados utilizados pelas páginas financeiras.

---

### DateContext

Responsável pelo período selecionado.

Exemplo:

```text
selectedPeriod
prevMonth()
nextMonth()
```

Permite que diferentes páginas trabalhem com o mesmo período.

---

### FilterContext

Responsável por filtros de visualização.

Exemplos:

```text
search
sortBy
setSearch()
setSortBy()
```

---

### ModalContext

Responsável pelo gerenciamento dos modais.

Controla:

```text
modal de formulário
modal de detalhes
transação selecionada
abertura
fechamento
```

---

### ToastContext

Responsável pelas notificações da aplicação.

Exemplos:

```text
Movimentação adicionada
Movimentação atualizada
Erro ao preencher formulário
```

---

# 🪝 Hooks

Os Hooks personalizados funcionam como uma camada de acesso aos Contexts.

Exemplos:

```js
useCash()
useDate()
useFilters()
useModal()
useToast()
```

A ideia é evitar que cada componente precise conhecer diretamente todos os detalhes da implementação dos Contexts.

Exemplo:

```js
const { transactions, addTransaction } = useCash();
```

Em vez de acessar diretamente:

```js
useContext(CashContext);
```

---

# 🔄 Fluxo de dados

A estrutura principal segue uma lógica semelhante a:

```text
              App
               │
        ┌──────┴──────┐
        │  Providers  │
        └──────┬──────┘
               │
      ┌────────┼─────────┐
      │        │         │
     Cash     Date     Filter
      │        │         │
      └────────┼─────────┘
               │
          Components
               │
       ┌───────┼────────┐
       │       │        │
   Dashboard Receitas Despesas
       │
   Relatórios
       │
 Investimentos
       │
     Metas
```

---

# 💾 Persistência

As movimentações podem ser persistidas no `localStorage`.

Isso permite que os dados permaneçam disponíveis mesmo após atualizar a página.

Fluxo:

```text
Usuário
   ↓
Componente
   ↓
useCash()
   ↓
CashContext
   ↓
setTransactions()
   ↓
localStorage
```

Ao iniciar a aplicação:

```text
localStorage
      ↓
CashContext
      ↓
transactions
      ↓
componentes
```

---

# 📊 Dados derivados

Uma das principais características da aplicação é evitar armazenar informações que podem ser calculadas a partir das transações.

Por exemplo:

```js
totalIncome
totalExpense
balance
economy
```

são derivados de:

```js
transactions
```

Isso reduz o risco de manter estados inconsistentes.

---

# 🧮 Exemplo de cálculo

O saldo pode ser conceitualmente representado como:

```text
Saldo = Receitas - Despesas - Investimentos
```

Porém, investimentos também são considerados na análise patrimonial.

Por isso o projeto diferencia:

```text
Fluxo de caixa
```

de:

```text
Patrimônio
```

Essa separação é importante para evitar interpretar um investimento como uma perda financeira definitiva.

---

# 📁 Estrutura de pastas

A estrutura pode seguir aproximadamente:

```text
src/
│
├── Components/
│   ├── CashItem/
│   ├── CashForm/
│   ├── CashModes/
│   ├── SummaryCard/
│   ├── Charts/
│   └── ...
│
├── context/
│   ├── CashContext.jsx
│   ├── DateContext.jsx
│   ├── FilterContext.jsx
│   ├── ModalContext.jsx
│   ├── ToastContext.jsx
│   └── ...
│
├── hooks/
│   ├── useCash.js
│   ├── useDate.js
│   ├── useFilters.js
│   ├── useModal.js
│   ├── useToast.js
│   └── ...
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Receitas.jsx
│   ├── Despesas.jsx
│   ├── Investimentos.jsx
│   ├── Metas.jsx
│   └── Relatorios.jsx
│
├── data/
│   └── mockTransactions.js
│
├── providers/
│   └── AppProviders.jsx
│
└── App.jsx
```

A estrutura exata pode variar conforme a evolução do projeto.

---

# 🎨 Interface

A aplicação utiliza uma interface baseada em tema escuro.

Principais características:

* Tailwind CSS;
* `slate-900`;
* `slate-800`;
* bordas discretas;
* cards arredondados;
* feedback visual por cores;
* layouts responsivos.

### Convenção visual

🟢 Receitas / resultados positivos

🔴 Despesas / resultados negativos

🟡 Investimentos

🔵 Informações neutras

---

# 📱 Responsividade

A interface foi desenvolvida considerando:

* desktop;
* tablet;
* mobile.

Os componentes utilizam classes responsivas do Tailwind:

```text
sm:
md:
lg:
xl:
```

Cards, listas, filtros e gráficos devem se adaptar ao tamanho da tela.

---

# 🛠️ Tecnologias

### Frontend

* React
* JavaScript
* Tailwind CSS
* HTML
* CSS

### Gerenciamento de estado

* React Context API
* React Hooks

### Persistência

* LocalStorage

### Visualização

* Biblioteca de gráficos utilizada pelo projeto
* SVG / Lucide Icons

---

# ▶️ Executando o projeto

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta:

```bash
cd fluxo-de-caixa
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

A aplicação será disponibilizada no endereço informado pelo Vite.

---

# 🧪 Dados de desenvolvimento

Durante o desenvolvimento, o projeto utiliza dados mockados para facilitar testes.

Exemplo:

```js
{
  id: 1,
  description: "Salário",
  amount: 5000,
  date: "2026-08-01",
  type: "income",
  category: "Trabalho"
}
```

Os mocks permitem testar:

* filtros;
* gráficos;
* comparações mensais;
* relatórios;
* metas;
* investimentos;
* dashboard.

---

# 🗺️ Roadmap

Funcionalidades já implementadas:

* [x] Dashboard
* [x] Receitas
* [x] Despesas
* [x] Investimentos
* [x] Metas
* [x] Relatórios
* [x] Filtro por mês/ano
* [x] Busca
* [x] Ordenação
* [x] Modal de detalhes
* [x] Edição
* [x] Exclusão
* [x] Context API
* [x] Hooks personalizados
* [x] Persistência local
* [x] Gráficos
* [x] Comparação entre períodos

Possíveis evoluções:

* [ ] Contas / carteiras
* [ ] Patrimônio líquido
* [ ] Lançamentos recorrentes
* [ ] Parcelamentos
* [ ] Importação de dados
* [ ] Exportação para CSV/Excel
* [ ] Backup dos dados
* [ ] Autenticação
* [ ] Banco de dados
* [ ] Backend/API
* [ ] Sincronização entre dispositivos
* [ ] PWA
* [ ] Notificações financeiras

---

# 🧠 Objetivo de aprendizado

Este projeto também funciona como um laboratório para aprofundamento em React.

Os principais conceitos praticados são:

### React

* componentes;
* props;
* estado;
* eventos;
* renderização condicional;
* listas;
* formulários;
* `useState`;
* `useEffect`;
* `useMemo`;
* `useCallback`;
* `useRef`.

### Arquitetura

* Context API;
* Hooks personalizados;
* separação de responsabilidades;
* componentes reutilizáveis;
* gerenciamento de estado global;
* dados derivados.

### Frontend

* Tailwind CSS;
* responsividade;
* modais;
* gráficos;
* dashboards;
* UX;
* estados vazios;
* feedback visual.

### Lógica

* manipulação de arrays;
* `map`;
* `filter`;
* `reduce`;
* ordenação;
* agrupamento por período;
* cálculos financeiros;
* comparação entre períodos.

---

# 📌 Princípios do projeto

O projeto busca seguir alguns princípios:

### 1. Componentes reutilizáveis

Evitar duplicação de lógica e interface.

### 2. Estado centralizado quando necessário

Informações compartilhadas entre páginas devem utilizar Context/Hooks quando isso realmente fizer sentido.

### 3. Dados derivados

Evitar armazenar no estado aquilo que pode ser calculado a partir de outros dados.

### 4. Separação de responsabilidades

Cada Context, Hook e componente deve possuir uma responsabilidade clara.

### 5. Interface orientada a dados

Gráficos, indicadores e insights devem ser derivados dos dados reais da aplicação.

### 6. Evolução incremental

Novas funcionalidades devem aproveitar a arquitetura existente em vez de criar estruturas paralelas desnecessárias.

---

# 📈 Evolução do projeto

O projeto começou como um simples controle de movimentações financeiras e evoluiu para uma aplicação mais completa de análise financeira pessoal.

A evolução pode ser resumida:

```text
Movimentações
      ↓
Receitas / Despesas
      ↓
Dashboard
      ↓
Context API
      ↓
Hooks personalizados
      ↓
Filtro por período
      ↓
Investimentos
      ↓
Metas
      ↓
Relatórios
      ↓
Análise financeira
```

O objetivo futuro é evoluir de um simples **controle de fluxo de caixa** para uma ferramenta completa de **gestão financeira pessoal**.

---

## 👨‍💻 Desenvolvimento

Projeto desenvolvido como prática de desenvolvimento frontend com React, com foco em:

**React + Hooks + Context API + Tailwind CSS + arquitetura de componentes + análise de dados financeiros.**

---

## 📄 Licença

Projeto desenvolvido para fins de estudo e desenvolvimento pessoal.

A licença pode ser definida conforme a necessidade de publicação do projeto.
