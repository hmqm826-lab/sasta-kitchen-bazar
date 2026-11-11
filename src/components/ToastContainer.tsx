import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
              isSuccess
                ? 'bg-[#173D30] text-white border-emerald-600/40 shadow-emerald-950/20'
                : isError
                ? 'bg-rose-900 text-white border-rose-700 shadow-rose-950/20'
                : isInfo
                ? 'bg-[#292929] text-white border-neutral-700 shadow-black/20'
                : 'bg-amber-900 text-white border-amber-700'
            }`}
          >
            <div className="mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#F5A623]" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-300" />}
              {isInfo && <Info className="w-5 h-5 text-emerald-400" />}
            </div>

            <div className="flex-1">
              <p className="font-semibold text-sm leading-tight">{toast.title}</p>
              <p className="text-xs text-stone-200 mt-1 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-300 hover:text-white p-1 rounded-md transition"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
