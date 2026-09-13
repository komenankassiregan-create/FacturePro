"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { formatCurrency, generateInvoiceNumber, getWhatsAppLink } from "@/lib/utils";
import { ArrowLeft, Plus, Trash2, Save, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
}

export default function NewInvoicePage() {
  const supabase = createClient();
  const router = useRouter();
  
  const [clients, setClients] = useState<any[]>([]);
  const [taxRate, setTaxRate] = useState(0.18);
  const [isSaving, setIsSaving] = useState(false);
  
  const [clientId, setClientId] = useState("");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [invoiceNumber] = useState(generateInvoiceNumber());
  
  const [items, setItems] = useState<LineItem[]>([
    { id: "1", description: "", quantity: 1, unit_price: 0 }
  ]);

  const fetchData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch clients
    const { data: clientsData } = await supabase
      .from('clients')
      .select('id, name, phone')
      .is('deleted_at', null)
      .order('name');
      
    if (clientsData) setClients(clientsData);

    // Fetch tax rate from settings
    const { data: settingsData } = await supabase
      .from('company_settings')
      .select('default_tax_rate')
      .eq('user_id', user.id)
      .single();
      
    if (settingsData && settingsData.default_tax_rate) {
      setTaxRate(settingsData.default_tax_rate / 100);
    }
  }, [supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addLine = () => {
    setItems([...items, { id: Date.now().toString(), description: "", quantity: 1, unit_price: 0 }]);
  };

  const removeLine = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateLine = (id: string, field: keyof LineItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0);
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const handleSave = async (status: "draft" | "sent") => {
    if (!clientId) {
      alert("Veuillez sélectionner un client.");
      return;
    }
    
    if (!dueDate) {
      alert("Veuillez définir une date d'échéance.");
      return;
    }
    
    if (items.some(i => !i.description)) {
      alert("Toutes les lignes doivent avoir une description.");
      return;
    }

    setIsSaving(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Insert Invoice
    const { data: invoiceData, error: invoiceError } = await supabase
      .from('invoices')
      .insert({
        user_id: user.id,
        client_id: clientId,
        invoice_number: invoiceNumber,
        issue_date: issueDate,
        due_date: dueDate,
        status: status,
        subtotal: subtotal,
        tax_rate: taxRate * 100,
        tax_amount: taxAmount,
        total: total,
      })
      .select()
      .single();

    if (invoiceError || !invoiceData) {
      alert("Erreur lors de la création de la facture: " + (invoiceError?.message || "Erreur inconnue"));
      setIsSaving(false);
      return;
    }

    // Insert Items
    const itemsToInsert = items.map(item => ({
      invoice_id: invoiceData.id,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price
    }));

    const { error: itemsError } = await supabase
      .from('invoice_items')
      .insert(itemsToInsert);

    if (itemsError) {
      alert("Erreur lors de la sauvegarde des lignes: " + itemsError.message);
    } else {
      if (status === "sent") {
        const client = clients.find(c => c.id === clientId);
        if (client && client.phone) {
          const waMessage = `Bonjour ${client.name}, voici votre facture ${invoiceNumber} d'un montant de ${formatCurrency(total)}. Merci de votre confiance !`;
          const waLink = getWhatsAppLink(client.phone, waMessage);
          window.open(waLink, '_blank');
        }
      }
      router.push("/invoices");
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <Link href="/invoices" className="p-2 -ml-2 text-muted hover:text-primary rounded-full hover:bg-card transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold font-display text-primary">Nouvelle Facture</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => handleSave("draft")} disabled={isSaving} className="gap-2">
            <Save className="w-4 h-4" />
            {isSaving ? "Sauvegarde..." : "Brouillon"}
          </Button>
          <Button variant="primary" onClick={() => handleSave("sent")} disabled={isSaving} className="gap-2">
            <Send className="w-4 h-4" />
            {isSaving ? "Sauvegarde..." : "Envoyer"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-primary mb-4">Informations Générales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary">Client</label>
                <Select value={clientId} onChange={e => setClientId(e.target.value)}>
                  <option value="" disabled>Sélectionner un client...</option>
                  {clients.map(c => (
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
              {/* Header Desktop */}
              <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-medium text-muted uppercase">
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-right">Qté</div>
                <div className="col-span-3 text-right">Prix Unit.</div>
                <div className="col-span-1"></div>
              </div>

              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start sm:items-center bg-sidebar/30 p-4 sm:p-0 sm:bg-transparent rounded-lg">
                  <div className="sm:col-span-6 space-y-1 sm:space-y-0">
                    <label className="text-xs text-muted sm:hidden uppercase">Description</label>
                    <Input 
                      placeholder="Description de l'article ou service"
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

        {/* Sidebar Totals */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <h3 className="text-lg font-semibold text-primary mb-4">Résumé</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-muted text-sm">
                <span>Sous-total (HT)</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted text-sm pb-3 border-b border-border">
                <span>TVA ({(taxRate * 100).toFixed(1)}%)</span>
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
