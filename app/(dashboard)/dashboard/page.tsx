import { StatCard } from "@/components/dashboard/StatCard";
import { CashflowChart } from "@/components/dashboard/CashflowChart";
import { StatusPieChart } from "@/components/dashboard/StatusPieChart";
import { RecentInvoices } from "@/components/dashboard/RecentInvoices";
import { FileText, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let totalInvoices = 0;
  let totalBilled = 0;
  let totalPaid = 0;
  let totalPending = 0;
  let totalOverdue = 0;
  
  let recentInvoices: any[] = [];
  
  if (user) {
    const { data: invoices } = await supabase
      .from('invoices')
      .select('*, clients(name)')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (invoices) {
      totalInvoices = invoices.length;
      recentInvoices = invoices.slice(0, 5);

      invoices.forEach(inv => {
        totalBilled += inv.total;
        if (inv.status === 'paid') totalPaid += inv.total;
        if (inv.status === 'sent') totalPending += inv.total;
        if (inv.status === 'overdue') totalOverdue += inv.total;
      });
    }
  }

  const pieData = [
    { name: 'Payé', value: totalPaid, color: 'var(--color-success)' },
    { name: 'En Attente', value: totalPending, color: 'var(--color-warning)' },
    { name: 'En Retard', value: totalOverdue, color: 'var(--color-danger)' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-primary">Tableau de bord</h1>
        <p className="text-muted mt-1">Bienvenue sur FacturePro. Voici un résumé de votre activité.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Factures"
          value={totalInvoices.toString()}
          trend="12%"
          trendUp={true}
          icon={FileText}
        />
        <StatCard
          title="Montant Facturé"
          value={formatCurrency(totalBilled)}
          trend="8.5%"
          trendUp={true}
          icon={TrendingUp}
        />
        <StatCard
          title="Montant Payé"
          value={formatCurrency(totalPaid)}
          trend="15%"
          trendUp={true}
          icon={CheckCircle}
        />
        <StatCard
          title="En Attente"
          value={formatCurrency(totalPending)}
          trend="2%"
          trendUp={false}
          icon={Clock}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CashflowChart />
        </div>
        <div>
          <StatusPieChart data={pieData} />
        </div>
      </div>

      {/* Recent Invoices */}
      <div>
        <RecentInvoices invoices={recentInvoices} />
      </div>
    </div>
  );
}
