import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import ReactDOM from "react-dom";

type ToastType = "info" | "success" | "error";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  show: (
    message: string,
    options?: { type?: ToastType; duration?: number }
  ) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const timeoutRefs = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id]);
      delete timeoutRefs.current[id];
    }
  }, []);

  const show = useCallback(
    (message: string, options?: { type?: ToastType; duration?: number }) => {
      const id = `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;
      const toast: Toast = {
        id,
        message,
        type: options?.type ?? "info",
        duration: options?.duration ?? 3000,
      };
      setToasts((prev) => [...prev, toast]);

      timeoutRefs.current[id] = setTimeout(
        () => removeToast(id),
        toast.duration
      );
    },
    [removeToast]
  );

  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(clearTimeout);
      timeoutRefs.current = {};
    };
  }, []);

  const portalRoot =
    typeof document !== "undefined"
      ? document.getElementById("toast-root") ??
        (() => {
          const el = document.createElement("div");
          el.id = "toast-root";
          document.body.appendChild(el);
          return el;
        })()
      : null;

  const toastElements = (
    <div
      className="toast-viewport"
      role="region"
      aria-live="assertive"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          role="alert"
          aria-atomic="true"
        >
          <div className="toast-message">{toast.message}</div>
          <button
            className="toast-close"
            aria-label="Close notification"
            onClick={() => removeToast(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {portalRoot && ReactDOM.createPortal(toastElements, portalRoot)}
    </ToastContext.Provider>
  );
};
