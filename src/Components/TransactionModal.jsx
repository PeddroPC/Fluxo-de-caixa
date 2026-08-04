import useModal from "../hooks/useModal";
import CashForm from "./CashForm";

const TransactionModal = () => {
  const { isOpen, selectedTransaction, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 pt-20 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[32px] border border-slate-800 bg-slate-950 p-6 shadow-2xl shadow-slate-950/60 animate-slide-down">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {selectedTransaction ? "Editar movimentação" : "Nova movimentação"}
          </h2>
          <button onClick={closeModal} className="text-slate-400 transition hover:text-white">
            ✕
          </button>
        </div>
        <CashForm />
      </div>
    </div>
  );
};

export default TransactionModal;