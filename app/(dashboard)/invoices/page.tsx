"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string;
  issue_date: string;
  due_date: string;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue";
  clients?: { name: string };
}

export default function InvoicesPage() {
  const supabase = createClient();
  const router = useRouter();
  
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"draft" | "sent" | "paid" | "overdue" | "all">("all");

  const statusLabels: Record<string, string> = {
    all: "Toutes",
    paid: "Payée",
    sent: "Envoyée",
    overdue: "En retard",
    draft: "Brouillon"
  };

  const fetchInvoices = useCallback(async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('invoices')
      .select('*, clients(name)')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setInvoices(data as unknown as Invoice[]);
    }
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const filteredInvoices = invoices.filter(invoice => {
    const clientName = invoice.clients?.name || "";
    const matchesSearch = clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          invoice.invoice_number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-primary">Factures</h1>
          <p className="text-muted mt-1">Gérez vos factures et suivez les paiements.</p>
        </div>
        <Link href="/invoices/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Créer une facture
          </Button>
        </Link>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-sidebar/30">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted">
              <Search className="w-4 h-4" />
            </div>
            <Input 
              type="text" 
              placeholder="Rechercher (N° ou client)..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {["all", "draft", "sent", "paid", "overdue"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  statusFilter === status 
                    ? "bg-accent text-white" 
                    : "bg-sidebar text-muted hover:bg-card hover:text-primary border border-border"
                }`}
              >
                {statusLabels[status]}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted uppercase bg-sidebar/50">
              <tr>
                <th className="px-6 py-4 font-medium rounded-tl-lg">N° Facture</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Émission</th>
                <th className="px-6 py-4 font-medium">Échéance</th>
                <th className="px-6 py-4 font-medium">Montant</th>
                <th className="px-6 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 text-right rounded-tr-lg"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-muted">
                    Chargement des factures...
                  </td>
                </tr>
              ) : filteredInvoices.map((invoice) => {
                return (
                  <tr 
                    key={invoice.id} 
                    className="hover:bg-sidebar/30 transition-colors cursor-pointer"
                    onClick={() => router.push(`/invoices/${invoice.id}`)}
                  >
                    <td className="px-6 py-4 font-medium text-primary">
                      {invoice.invoice_number}
                    </td>
                    <td className="px-6 py-4 text-primary">
                      {invoice.clients?.name || "Client Inconnu"}
                    </td>
                    <td className="px-6 py-4 text-muted">
                      {new Date(invoice.issue_date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-muted">
                      {new Date(invoice.due_date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 font-medium text-primary">
                      {formatCurrency(invoice.total)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={invoice.status}>{statusLabels[invoice.status]}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-muted hover:text-primary rounded-md hover:bg-sidebar transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              
              {!isLoading && filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-muted">
                    Aucune facture trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
