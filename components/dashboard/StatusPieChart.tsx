"use client";

import { Card } from "@/components/ui/Card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export function StatusPieChart({ data }: { data: { name: string, value: number, color: string }[] }) {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-primary">Statut des Factures</h3>
      </div>
      <div className="text-center mb-4">
        <p className="text-2xl font-bold font-display text-primary">
          {new Intl.NumberFormat('fr-FR').format(total)} FCFA
        </p>
        <p className="text-xs text-muted">Total Facturé</p>
      </div>
      <div className="flex-1 min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${new Intl.NumberFormat('fr-FR').format(value)} FCFA`, 'Montant']}
              contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--color-primary)' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', color: 'var(--color-muted)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
