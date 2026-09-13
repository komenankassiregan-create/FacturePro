"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./Card";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative z-[101] w-full max-w-lg mx-4">
        <Card className="p-0 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 border-border">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-sidebar">
            <h2 className="text-lg font-semibold text-primary">{title}</h2>
            <button 
              onClick={onClose}
              className="text-muted hover:text-primary transition-colors p-1 rounded-md hover:bg-card"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6 bg-base max-h-[80vh] overflow-y-auto">
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
}
