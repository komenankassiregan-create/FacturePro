import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(amount).replace('XOF', 'FCFA');
}

export function generateInvoiceNumber(prefix = 'FAC', date = new Date()) {
  const year = date.getFullYear();
  const randomId = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomId}`;
}

export function getWhatsAppLink(phone: string, text: string) {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  // Si le numéro commence par +, on enlève le + pour wa.me
  const finalPhone = cleanPhone.startsWith('+') ? cleanPhone.substring(1) : cleanPhone;
  return `https://wa.me/${finalPhone}?text=${encodeURIComponent(text)}`;
}
