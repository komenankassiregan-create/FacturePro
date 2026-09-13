"use client";

import { Card } from "@/components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Fév', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Avr', income: 2780, expense: 3908 },
  { name: 'Mai', income: 1890, expense: 4800 },
  { name: 'Juin', income: 2390, expense: 3800 },
  { name: 'Juil', income: 3490, expense: 4300 },
  { name: 'Août', income: 5490, expense: 2300 },
  { name: 'Sep', income: 4490, expense: 3300 },
  { name: 'Oct', income: 6490, expense: 1300 },
  { name: 'Nov', income: 5490, expense: 2300 },
  { name: 'Déc', income: 7490, expense: 3300 },
];

export function CashflowChart() {
  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-primary">Cashflow (En milliers FCFA)</h3>
      </div>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--color-muted)', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--color-muted)', fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: 'var(--color-sidebar)' }}
              contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--color-primary)' }}
            />
            <Bar dataKey="income" fill="var(--color-success)" radius={[4, 4, 0, 0]} name="Revenus" />
            <Bar dataKey="expense" fill="var(--color-danger)" radius={[4, 4, 0, 0]} name="Dépenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
