import { Card } from "@/components/ui/Card";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const statusLabels: Record<string, string> = {
  paid: "Payée",
  sent: "Envoyée",
  overdue: "En retard",
  draft: "Brouillon"
};

export function RecentInvoices({ invoices }: { invoices: any[] }) {
  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-primary">Dernières Factures</h3>
        <Link href="/invoices">
          <Button variant="ghost" size="sm" className="text-accent hover:text-accent-muted">
            Voir tout
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-muted uppercase bg-sidebar/50 rounded-t-lg">
            <tr>
              <th className="px-4 py-3 font-medium rounded-tl-lg">Client</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Montant</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 rounded-tr-lg"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted">
                  Aucune facture récente
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-sidebar/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-primary">{invoice.clients?.name || 'Inconnu'}</div>
                    <div className="text-xs text-muted">{invoice.invoice_number}</div>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(invoice.issue_date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3 font-medium text-primary">
                    {formatCurrency(invoice.total)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={invoice.status as BadgeVariant}>{statusLabels[invoice.status]}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/invoices/${invoice.id}`}>
                      <button className="p-2 text-muted hover:text-primary rounded-md hover:bg-sidebar transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
