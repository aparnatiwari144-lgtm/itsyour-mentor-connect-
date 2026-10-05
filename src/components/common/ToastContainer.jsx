import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isInfo = toast.type === 'info';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-2xl shadow-card border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-top-2 ${
              isSuccess
                ? 'bg-white/95 border-emerald-200 text-slate-800'
                : isError
                ? 'bg-white/95 border-rose-300 text-slate-800'
                : 'bg-white/95 border-rose-100 text-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-1.5 rounded-xl ${
                  isSuccess
                    ? 'bg-emerald-100 text-emerald-700'
                    : isError
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-brand-roseLight text-brand-rose'
                }`}
              >
                {isSuccess && <CheckCircle2 className="w-4 h-4" />}
                {isError && <AlertCircle className="w-4 h-4" />}
                {isInfo && <Info className="w-4 h-4" />}
              </div>
              <p className="text-xs sm:text-sm font-medium leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors ml-2"
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
