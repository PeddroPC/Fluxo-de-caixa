import React from 'react';
import { useModal } from '../context/ModalContext'; // Ajuste o caminho se necessário

const TransactionDetailsModal = () => {
  // Puxando os estados e transação selecionada direto do Contexto
  const { 
    selectedTransaction, 
    isTransactionOpen, 
    closeTransactionModal, // Assumindo que você tem essa função no contexto para fechar
    openModal // Função que abre o modal de edição (já usada no seu CashItem)
  } = useModal();

  // Se estiver fechado:
  if (!isTransactionOpen) return null;

  // Prevenção de erro caso abra sem transação
  if (!selectedTransaction) return null; 

  // Replicando a mesma lógica de formatação do CashItem
  const isIncome = selectedTransaction.type === "income";
  const isInvestment = selectedTransaction.type === "investment";
  
  const title = selectedTransaction.description ?? selectedTransaction.nome ?? "Movimentação";
  const amountPrefix = isInvestment ? "" : isIncome ? "+" : "-";
  
  // Cores dinâmicas
  const amountColor = isInvestment
    ? "text-amber-400"
    : isIncome
      ? "text-green-400"
      : "text-[#ff5f5f]";

  const iconTone = isInvestment
    ? "bg-amber-500/10 text-amber-400"
    : isIncome
      ? "bg-green-500/10 text-green-500"
      : "bg-red-500/10 text-red-500";

  const category = isInvestment 
    ? (selectedTransaction.investmentType || "Investimento") 
    : selectedTransaction.category;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Container do Modal */}
      <div className="w-full max-w-lg bg-[#181d29] rounded-2xl border border-slate-700/50 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-5 border-b border-slate-700/50">
          <h2 className="text-white font-bold text-[1.15rem]">Detalhes da Movimentação</h2>
          <button 
            onClick={closeTransactionModal} // Fechar via contexto
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Fechar modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Conteúdo Principal */}
        <div className="p-6 flex flex-col gap-6">
          
          {/* Linha: Ícone, Título, Data, Tag e Valor */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex items-center gap-4">
              
              {/* Ícone Dinâmico */}
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconTone}`}>
                {isInvestment ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m0 0l-4-4m4 4l4-4" />
                  </svg>
                ) : isIncome ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                  </svg>
                )}
              </div>
              
              {/* Título e Data */}
              <div className="flex flex-col">
                <h3 className="text-white font-bold text-xl">{title}</h3>
                <span className="text-slate-400 text-sm mt-0.5">{selectedTransaction.date}</span>
              </div>
            </div>

            {/* Categoria e Valor */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              {category && category !== "Outros" && (
                <span className="bg-slate-700/60 text-slate-200 text-xs px-2.5 py-1 rounded-md font-medium">
                  {category}
                </span>
              )}
              <span className={`font-bold text-xl tracking-wide ${amountColor}`}>
                {amountPrefix} R$ {Number(selectedTransaction.amount || 0).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Seção de Observações */}
          {selectedTransaction.observation && (
            <div className="flex flex-col gap-2 mt-2">
              <h4 className="text-white font-bold text-sm">Observações:</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedTransaction.observation}
              </p>
            </div>
          )}
          
        </div>

        {/* Rodapé com Botões de Ação */}
        <div className="flex justify-end gap-3 p-5 border-t border-slate-700/50">
          <button 
            onClick={() => {
              closeTransactionModal(); // Fecha este modal de detalhes
              openModal(selectedTransaction); // Abre o modal de edição passando a transação
            }}
            className="px-5 py-2.5 bg-slate-700/50 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Editar
          </button>
          
          <button 
            onClick={() => {
              // Aqui você pode adicionar a lógica de exclusão via contexto ou alert de confirmação
              console.log("Excluir", selectedTransaction.id);
              closeTransactionModal();
            }}
            className="px-5 py-2.5 bg-[#db4a4a] hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Excluir
          </button>
        </div>

      </div>
    </div>
  );
}

export default TransactionDetailsModal;