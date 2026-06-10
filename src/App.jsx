import { useEffect, useState } from "react";
import CashForm from "./Components/CashForm";
import CashList from "./Components/CashList";
import CashSumary from "./Components/CashSumary";
import mockTransactions from "./data/mockTransactions";
import CashModes from "./Components/CashModes";

function App() {
  /***Aqui esta o "banco" com todo o processo de localStorage para não apagar os dados ao recarregar a página */
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("transactions");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return parsedData.length > 0 ? parsedData : mockTransactions;
    }
    return mockTransactions;
  });
  // Sempre que o estado 'data' for atualizado, ele será salvo no localStorage, isso é useEffect para garantir que as transações sejam persistentes mesmo após recarregar a página.
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(data));
  }, [data]);

  // Função para adicionar uma nova transação ao estado 'data'
  const addData = (newData) => {
    setData((prevData) => [...prevData, newData]);
  };
  // Função para remover uma transação do estado 'data' com base no ID
  const removeData = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };
  const editData = (id, updatedData) => {
    console.log(
      "sortedData",
      sortedData.map((item) => item.id),
    );
    setData((prevData) =>
      prevData.map((item) =>
        String(item.id) === String(id) ? updatedData : item,
      ),
    );
    setSelectedTransaction(updatedData);
  };
  const [editingTransaction, setEditingTransaction] = useState(null);
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  /**
   * Estados para controle de busca, filtro e ordenação
   * filtredData é o resultado da aplicação do filtro e da busca sobre os dados originais, ele é usado para exibir a lista de transações filtrada e ordenada.
   * totalIncome, totalExpense e balance são calculados a partir dos dados originais para mostrar o resumo financeiro.
   * sortBy é usado para determinar a ordem de exibição das transações (recente, mais antigo, valor alto para baixo, valor baixo para alto).
   * O componente CashModes recebe esses estados e funções para permitir que o usuário interaja com os filtros e ordenação.
   * O componente CashList recebe os dados filtrados e ordenados para exibir a lista de transações de acordo com as preferências do usuário.
   * O componente CashSumary recebe os totais calculados para mostrar um resumo financeiro geral.
   */
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtredData = data.filter((item) => {
    const matchesFilter = filter === "all" || item.type === filter;
    const matchesSearch = item.description
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  /**
   * Cálculo do total de receitas, despesas e saldo com base nos dados originais (não filtrados) para garantir que o resumo financeiro
   */
  const totalIncome = data.reduce((total, item) => {
    return item.type === "income" ? total + Number(item.amount) : total;
  }, 0);
  const totalExpense = data.reduce((total, item) => {
    return item.type === "expense" ? total + Number(item.amount) : total;
  }, 0);
  const balance = totalIncome - totalExpense;

  // O estado sortBy é usado para determinar a ordem de exibição das transações, e o array sortedData é criado a partir do array filtredData, ordenando as transações de acordo com a preferência do usuário (recente, mais antigo, valor alto para baixo, valor baixo para alto).
  const [sortBy, setSortBy] = useState("recent");
  const sortedData = [...filtredData].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === "amountHigh") {
      return Number(b.amount) - Number(a.amount);
    } else if (sortBy === "amountLow") {
      return Number(a.amount) - Number(b.amount);
    }
    return 0;
  });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* O botão "Add Transaction" é usado para mostrar o formulário de adição de transações, e o estado showForm controla a exibição desse formulário. Quando showForm é true, um modal é exibido com o componente CashForm para permitir que o usuário adicione uma nova transação. */}
      <button
        className="mb-6 rounded-full bg-blue-600 px-4 py-2 text-white"
        onClick={() => setShowForm(true)}
      >
        Add Transaction
      </button>
      {/* O modal para adição de transações é exibido quando showForm é true, e ele contém o componente CashForm para permitir que o usuário insira os detalhes da nova transação. O modal também inclui um botão para fechar o formulário, definindo showForm como false. */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-20">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl animate-slide-down">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingTransaction ? "Edit Transaction" : "New Transaction"}
              </h2>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingTransaction(null);
                }}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <CashForm
              addData={addData}
              editData={editData}
              editingTransaction={editingTransaction}
              setSelectedTransaction={setSelectedTransaction}
              setShowForm={setShowForm}
              setEditingTransaction={setEditingTransaction}
            />
          </div>
        </div>
      )}
      <CashSumary
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
        data={data}
      />
      <CashModes
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {/* O componente CashList recebe os dados filtrados e ordenados para exibir a lista de transações de acordo com as preferências do usuário. */}
      {selectedTransaction && (
        <div className="mt-4 rounded-2xl border border-gray-300 bg-white p-4 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">
            {selectedTransaction.description}
          </h3>
          <p className="text-sm text-gray-500">{selectedTransaction.date}</p>
          <p
            className={`text-xl font-bold ${
              selectedTransaction.type === "income"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {selectedTransaction.type === "income" ? "+" : "-"} $
            {Number(selectedTransaction.amount).toFixed(2)}
          </p>
        </div>
      )}
      <CashList
        data={sortedData}
        removeData={removeData}
        setSelectedTransaction={setSelectedTransaction}
        handleEdit={handleEdit}
        editingTransaction={editingTransaction}
      />
    </div>
  );
}

export default App;
