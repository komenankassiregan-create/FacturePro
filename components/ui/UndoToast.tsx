import * as React from "react";
import { useEffect } from "react";
import { X, RotateCcw } from "lucide-react";
import { Button } from "./Button";

interface UndoToastProps {
  isOpen: boolean;
  message: string;
  onUndo: () => void;
  onClose: () => void;
  duration?: number;
}

export function UndoToast({ isOpen, message, onUndo, onClose, duration = 5000 }: UndoToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="flex items-center gap-4 bg-sidebar border border-border shadow-lg rounded-lg px-4 py-3 min-w-[300px] max-w-sm">
        <span className="text-sm font-medium text-primary flex-1">{message}</span>
        <Button variant="ghost" size="sm" onClick={onUndo} className="h-8 text-accent hover:text-accent-muted gap-2">
          <RotateCcw className="w-3.5 h-3.5" />
          Annuler
        </Button>
        <button onClick={onClose} className="text-muted hover:text-primary transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
