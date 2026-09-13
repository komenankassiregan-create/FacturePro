"use client";

import { use, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { formatCurrency, getWhatsAppLink } from "@/lib/utils";
import { ArrowLeft, Edit, Trash2, Send, Printer, Download, RefreshCw } from "lucide-react";
import { UndoToast } from "@/components/ui/UndoToast";
import { createClient } from "@/lib/supabase/client";

export default function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const supabase = createClient();
  
  const [invoice, setInvoice] = useState<any>(null);
  const [companySettings, setCompanySettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  
  const fetchInvoice = useCallback(async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch Invoice + Client + Items
    const { data, error } = await supabase
      .from('invoices')
      .select('*, clients(*), invoice_items(*)')
      .eq('id', id)
      .single();

    if (data && !error) {
      setInvoice(data);
    }
    
    // Fetch Settings
    const { data: settings } = await supabase
      .from('company_settings')
      .select('*')
      .eq('user_id', user.id)
      .single();
      
    if (settings) {
      setCompanySettings(settings);
    }

    setIsLoading(false);
  }, [id, supabase]);

  useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64 text-muted">Chargement de la facture...</div>;
  }

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <h2 className="text-xl font-medium text-primary">Facture introuvable</h2>
        <Button variant="secondary" onClick={() => router.push("/invoices")}>
          Retour aux factures
        </Button>
      </div>
    );
  }

  const client = invoice.clients;

  const handleDelete = async () => {
    // Soft delete
    const { error } = await supabase
      .from('invoices')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', invoice.id);
      
    if (!error) {
      setIsDeleted(true);
      setToastOpen(true);
    }
  };

  const handleUndo = async () => {
    const { error } = await supabase
      .from('invoices')
      .update({ deleted_at: null })
      .eq('id', invoice.id);
      
    if (!error) {
      setIsDeleted(false);
      setToastOpen(false);
    }
  };

  const handleToastClose = () => {
    setToastOpen(false);
    router.push("/invoices");
  };
  
  const handleStatusChange = async (newStatus: string) => {
    const { error } = await supabase
      .from('invoices')
      .update({ status: newStatus })
      .eq('id', invoice.id);
      
    if (!error) {
      setInvoice({ ...invoice, status: newStatus });
    }
  };

  const waMessage = `Bonjour ${client.name}, voici votre facture ${invoice.invoice_number} d'un montant de ${formatCurrency(invoice.total)}. Merci de votre confiance !`;
  const waLink = getWhatsAppLink(client.phone || "", waMessage);

  if (isDeleted && !toastOpen) {
    return null; 
  }

  const handleDownloadPDF = async () => {
    const element = document.getElementById('invoice-capture');
    if (element) {
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin:       10,
        filename:     `Facture_${invoice.invoice_number}.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, backgroundColor: '#0A0F0D' }, 
        jsPDF:        { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const statusLabels: Record<string, string> = {
    paid: "Payée",
    sent: "Envoyée",
    overdue: "En retard",
    draft: "Brouillon"
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between print:hidden">
        <div className="flex items-center gap-4">
          <Link href="/invoices" className="p-2 -ml-2 text-muted hover:text-primary rounded-full hover:bg-card transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold font-display text-primary">
            Facture {invoice.invoice_number}
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select value={invoice.status} onChange={(e) => handleStatusChange(e.target.value)} className="w-36 py-1.5 h-9 bg-sidebar text-xs">
            <option value="draft">Brouillon</option>
            <option value="sent">Envoyée</option>
            <option value="paid">Payée</option>
            <option value="overdue">En retard</option>
          </Select>
          
          <Button variant="secondary" size="sm" className="gap-2" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            <span className="hidden lg:inline">Imprimer</span>
          </Button>

          <Button variant="secondary" size="sm" className="gap-2" onClick={handleDownloadPDF}>
            <Download className="w-4 h-4" />
            <span className="hidden lg:inline">PDF</span>
          </Button>
          
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="sm" className="gap-2">
              <Send className="w-4 h-4" />
              <span className="hidden lg:inline">Envoyer</span>
            </Button>
          </a>

          <Button variant="ghost" size="icon" className="text-muted hover:text-danger border border-transparent hover:bg-danger/10" onClick={handleDelete} title="Supprimer">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div id="invoice-capture">
        <Card className="p-6 sm:p-12 print:shadow-none print:border-none print:bg-transparent">
        {/* Header Facture */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-12 border-b border-border pb-8">
          <div>
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-xl font-bold text-white mb-4">
              F
            </div>
            <h2 className="text-lg font-semibold text-primary">{companySettings?.company_name || 'FacturePro SARL'}</h2>
            <p className="text-muted text-sm mt-1">{companySettings?.address || '123 Avenue par défaut'}</p>
            {companySettings?.email && <p className="text-muted text-sm mt-2">{companySettings.email}</p>}
            {companySettings?.phone && <p className="text-muted text-sm">{companySettings.phone}</p>}
            {companySettings?.ninea && <p className="text-muted text-sm mt-1">NINEA/RCCM: {companySettings.ninea}</p>}
          </div>
          
          <div className="text-left sm:text-right">
            <h2 className="text-3xl font-display font-bold text-muted mb-4 uppercase tracking-wider">Facture</h2>
            <div className="space-y-1">
              <div className="flex justify-between sm:justify-end gap-8">
                <span className="text-muted">Référence:</span>
                <span className="font-medium text-primary">{invoice.invoice_number}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-8">
                <span className="text-muted">Date d'émission:</span>
                <span className="font-medium text-primary">{new Date(invoice.issue_date).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-8">
                <span className="text-muted">Échéance:</span>
                <span className="font-medium text-primary">{new Date(invoice.due_date).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex justify-between sm:justify-end gap-8 mt-2 pt-2 border-t border-border">
                <span className="text-muted mt-0.5">Statut:</span>
                <Badge variant={invoice.status}>{statusLabels[invoice.status]}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3">Facturé à</h3>
          <p className="text-lg font-medium text-primary">{client.name}</p>
          <p className="text-muted">{client.address}</p>
          <p className="text-muted mt-1">{client.email}</p>
          <p className="text-muted">{client.phone}</p>
        </div>

        {/* Lignes de facture */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border text-muted text-sm">
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium text-right w-24">Quantité</th>
                <th className="pb-3 font-medium text-right w-40">Prix unitaire</th>
                <th className="pb-3 font-medium text-right w-40">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {invoice.invoice_items?.map((item: { id: string, description: string, quantity: number, unit_price: number }) => (
                <tr key={item.id} className="text-primary text-sm">
                  <td className="py-4">{item.description}</td>
                  <td className="py-4 text-right">{item.quantity}</td>
                  <td className="py-4 text-right">{formatCurrency(item.unit_price)}</td>
                  <td className="py-4 text-right font-medium">{formatCurrency(item.quantity * item.unit_price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totaux */}
        <div className="flex justify-end border-t border-border pt-6">
          <div className="w-full max-w-sm space-y-3">
            <div className="flex justify-between text-muted text-sm">
              <span>Sous-total (HT)</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted text-sm">
              <span>TVA ({(invoice.tax_rate).toFixed(1)}%)</span>
              <span>{formatCurrency(invoice.tax_amount)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-primary pt-3 border-t border-border">
              <span>Total TTC</span>
              <span className="text-accent">{formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </div>

        {/* Pied de page bancaire */}
        {(companySettings?.bank_iban || companySettings?.mobile_money_wave) && (
          <div className="mt-16 pt-8 border-t border-border text-sm text-muted">
            <h4 className="font-medium text-primary mb-2">Informations de paiement</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {companySettings.bank_iban && (
                <div>
                  <p><strong>Banque:</strong> {companySettings.bank_name}</p>
                  <p><strong>Titulaire:</strong> {companySettings.bank_account_name}</p>
                  <p><strong>IBAN:</strong> {companySettings.bank_iban}</p>
                </div>
              )}
              <div>
                {companySettings.mobile_money_wave && <p><strong>Wave:</strong> {companySettings.mobile_money_wave}</p>}
                {companySettings.mobile_money_orange && <p><strong>Orange Money:</strong> {companySettings.mobile_money_orange}</p>}
              </div>
            </div>
          </div>
        )}
      </Card>
      </div>

      <UndoToast 
        isOpen={toastOpen}
        message={`Facture ${invoice?.invoice_number} supprimée.`}
        onUndo={handleUndo}
        onClose={handleToastClose}
        duration={5000}
      />
    </div>
  );
}
