import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: React.ElementType;
}

export function StatCard({ title, value, trend, trendUp, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <h3 className="text-2xl font-display font-bold text-primary mt-2">{value}</h3>
          
          {trend && (
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                trendUp ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
              )}>
                {trendUp ? "+" : "-"}{trend}
              </span>
              <span className="text-xs text-muted">vs mois précédent</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-xl bg-sidebar border border-border">
          <Icon className="w-5 h-5 text-accent" />
        </div>
      </div>
    </Card>
  );
}
