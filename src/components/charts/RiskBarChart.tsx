import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { name: 'Market Risk', value: 35 },
  { name: 'Technical Risk', value: 55 },
  { name: 'Financial Risk', value: 40 },
  { name: 'Regulatory Risk', value: 25 },
  { name: 'Competition Risk', value: 60 },
];

const getBarColor = (value: number) => {
  if (value >= 60) return 'hsl(var(--destructive))';
  if (value >= 40) return 'hsl(var(--warning))';
  return 'hsl(var(--success))';
};

export default function RiskBarChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
          />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
