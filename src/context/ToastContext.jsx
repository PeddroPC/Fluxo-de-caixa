import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

const ToastContext = createContext(null);

const toastStyles = {
  success: "border-emerald-500/40 bg-emerald-500/15 text-emerald-200",
  error: "border-rose-500/40 bg-rose-500/15 text-rose-200",
  info: "border-sky-500/40 bg-sky-500/15 text-sky-200",
};

const ToastViewport = ({ toast, hideToast }) => {
  if (!toast.open) {
    return null;
  }

  const toneClass = toastStyles[toast.type] || toastStyles.info;

  return (
    <div className="fixed bottom-5 right-5 z-[70] max-w-sm">
      <div
        className={`rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur ${toneClass}`}
        role="status"
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/25 text-sm font-semibold">
            {toast.type === "success" ? "✓" : toast.type === "error" ? "!" : "i"}
          </div>

          <div className="flex-1">
            <p className="font-semibold">
              {toast.type === "success"
                ? "Tudo certo"
                : toast.type === "error"
                  ? "Atenção"
                  : "Aviso"}
            </p>
            <p className="mt-1 text-sm opacity-90">{toast.message}</p>
          </div>

          <button
            type="button"
            onClick={hideToast}
            className="text-sm font-medium opacity-80 transition hover:opacity-100"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ open: false, message: "", type: "info" });
  const timeoutRef = useRef(null);

  const showToast = useCallback((message, type = "info") => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setToast({ open: true, message, type });
    timeoutRef.current = window.setTimeout(() => {
      setToast((current) => ({ ...current, open: false }));
    }, 3000);
  }, []);

  const hideToast = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setToast((current) => ({ ...current, open: false }));
  }, []);

  const value = useMemo(
    () => ({ toast, showToast, hideToast }),
    [toast, showToast, hideToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toast={toast} hideToast={hideToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
