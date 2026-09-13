"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { mockClients, mockInvoices } from "@/lib/mock-data";
import { formatCurrency, getWhatsAppLink } from "@/lib/utils";
import { ArrowLeft, Plus, Trash2, Save, Send } from "lucide-react";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
}

export default function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const invoice = mockInvoices.find(i => i.id === id);

  const [clientId, setClientId] = useState(invoice?.client_id || "");
  const [issueDate, setIssueDate] = useState(invoice?.issue_date || new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState(invoice?.due_date || "");
  const [invoiceNumber] = useState(invoice?.invoice_number || "");
  
  const [items, setItems] = useState<LineItem[]>(
    invoice?.items.length 
      ? invoice.items 
      : [{ id: "1", description: "", quantity: 1, unit_price: 0 }]
  );

  if (!invoice) {
    return <div className="text-primary text-center mt-12">Facture introuvable</div>;
  }

  const addLine = () => {
    setItems([...items, { id: Date.now().toString(), description: "", quantity: 1, unit_price: 0 }]);
  };

  const removeLine = (lineId: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== lineId));
    }
  };

  const updateLine = (lineId: string, field: keyof LineItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === lineId) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0);
  const taxRate = 0.18;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const handleSave = (status: "draft" | "sent") => {
    if (!clientId) {
      alert("Veuillez sélectionner un client.");
      return;
    }

    if (status === "sent") {
      const client = mockClients.find(c => c.id === clientId);
      if (client) {
        const waMessage = `Bonjour ${client.name}, voici votre facture ${invoiceNumber} d'un montant de ${formatCurrency(total)}. Merci de votre confiance !`;
        const waLink = getWhatsAppLink(client.phone || "", waMessage);
        window.open(waLink, '_blank');
      }
    }

    router.push(`/invoices/${id}`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/invoices/${id}`} className="p-2 -ml-2 text-muted hover:text-primary rounded-full hover:bg-card transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold font-display text-primary">Modifier Facture</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => handleSave("draft")} className="gap-2">
            <Save className="w-4 h-4" />
            Enregistrer
          </Button>
          <Button variant="primary" onClick={() => handleSave("sent")} className="gap-2">
            <Send className="w-4 h-4" />
            Envoyer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-primary mb-4">Informations Générales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">Client</label>
                <Select value={clientId} onChange={e => setClientId(e.target.value)}>
                  <option value="" disabled>Sélectionner un client...</option>
                  {mockClients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">Numéro de facture</label>
                <Input value={invoiceNumber} disabled className="bg-sidebar/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">Date d'émission</label>
                <Input type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">Date d'échéance</label>
                <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-primary mb-4">Lignes de Facturation</h3>
            
            <div className="space-y-4">
              <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-medium text-muted uppercase">
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-right">Qté</div>
                <div className="col-span-3 text-right">Prix Unit.</div>
                <div className="col-span-1"></div>
              </div>

              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start sm:items-center bg-sidebar/30 p-4 sm:p-0 sm:bg-transparent rounded-lg">
                  <div className="sm:col-span-6 space-y-1 sm:space-y-0">
                    <label className="text-xs text-muted sm:hidden uppercase">Description</label>
                    <Input 
                      placeholder="Description"
                      value={item.description}
                      onChange={e => updateLine(item.id, "description", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1 sm:space-y-0">
                    <label className="text-xs text-muted sm:hidden uppercase">Qté</label>
                    <Input 
                      type="number" 
                      min="1"
                      value={item.quantity}
                      onChange={e => updateLine(item.id, "quantity", parseInt(e.target.value) || 0)}
                      className="text-right"
                    />
                  </div>
                  <div className="sm:col-span-3 space-y-1 sm:space-y-0">
                    <label className="text-xs text-muted sm:hidden uppercase">Prix Unit.</label>
                    <Input 
                      type="number" 
                      min="0"
                      value={item.unit_price}
                      onChange={e => updateLine(item.id, "unit_price", parseFloat(e.target.value) || 0)}
                      className="text-right"
                    />
                  </div>
                  <div className="sm:col-span-1 flex justify-end pt-6 sm:pt-0">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted hover:text-danger hover:bg-danger/10"
                      onClick={() => removeLine(item.id)}
                      disabled={items.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" onClick={addLine} className="mt-4 text-accent hover:text-accent-muted gap-2">
              <Plus className="w-4 h-4" />
              Ajouter une ligne
            </Button>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <h3 className="text-lg font-semibold text-primary mb-4">Résumé</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-muted text-sm">
                <span>Sous-total (HT)</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted text-sm pb-3 border-b border-border">
                <span>TVA (18%)</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-primary pt-3 border-t border-border">
                <span>Total TTC</span>
                <span className="text-accent">{formatCurrency(total)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
