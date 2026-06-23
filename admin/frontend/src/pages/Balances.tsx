import { useEffect, useState } from 'react';
import { api } from '../api';

interface DashboardData {
  totalMRR: number;
}

interface Expense {
  id: number;
  category: string;
  detail: string;
  amount: number;
  date: string;
}

const fmt = (n: number) => `$ ${n.toLocaleString('es-AR')}`;

const cardStyle: React.CSSProperties = {
  background: '#121917', border: '1px solid #222b29', borderRadius: 12, padding: 20,
};

export default function Balances() {
  const [mrr, setMrr] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    api.get<DashboardData>('/api/dashboard').then(d => setMrr(d.totalMRR)).catch(console.error);
    api.get<{ expenses: Expense[] }>('/api/expenses').then(d => setExpenses(d.expenses)).catch(console.error);
  }, []);

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

  // Generate 6-month mock data based on current mrr/expenses
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
  const monthsShort = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const factors = [0.82, 0.88, 0.91, 0.95, 0.97, 1.0];
  const expFactors = [0.25, 0.30, 0.28, 0.35, 0.32, totalExpenses > 0 ? totalExpenses / (mrr || 1) : 0.30];

  const data = factors.map((f, i) => {
    const income = Math.round(mrr * f);
    const expense = Math.round(mrr * expFactors[i]);
    const result = income - expense;
    const margin = income > 0 ? ((result / income) * 100).toFixed(1) : '0.0';
    return { month: monthNames[i], monthShort: monthsShort[i], income, expense, result, margin };
  });

  const maxVal = Math.max(...data.map(d => Math.max(d.income, d.expense)));

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 24px' }}>Balances</h1>

      {/* Bar Chart */}
      <div style={{ ...cardStyle, marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 20px' }}>Ingresos vs Egresos (últimos 6 meses)</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, height: 220, padding: '0 20px' }}>
          {data.map(d => (
            <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 180 }}>
                <div style={{
                  width: 24, borderRadius: '4px 4px 0 0',
                  background: '#22c597',
                  height: `${maxVal ? (d.income / maxVal) * 100 : 0}%`,
                  transition: 'height 0.5s',
                }} />
                <div style={{
                  width: 24, borderRadius: '4px 4px 0 0',
                  background: '#ef6a61',
                  height: `${maxVal ? (d.expense / maxVal) * 100 : 0}%`,
                  transition: 'height 0.5s',
                }} />
              </div>
              <span style={{ fontSize: 12, color: '#7d8884' }}>{d.monthShort}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 16, justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#94a09c' }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: '#22c597' }} /> Ingresos
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#94a09c' }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: '#ef6a61' }} /> Egresos
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #222b29' }}>
              {['Mes', 'Ingresos', 'Egresos', 'Resultado', 'Margen'].map(h => (
                <th key={h} style={{
                  padding: '12px 16px', textAlign: 'left', fontSize: 11,
                  fontWeight: 500, color: '#7d8884', textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.month} style={{ borderBottom: '1px solid #1a2120' }}>
                <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, color: '#e9f0ee' }}>{d.month}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#34c98a', fontFamily: "'IBM Plex Mono', monospace" }}>
                  {fmt(d.income)}
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#ef6a61', fontFamily: "'IBM Plex Mono', monospace" }}>
                  {fmt(d.expense)}
                </td>
                <td style={{
                  padding: '12px 16px', fontSize: 13, fontFamily: "'IBM Plex Mono', monospace",
                  color: d.result >= 0 ? '#34c98a' : '#ef6a61',
                }}>
                  {fmt(d.result)}
                </td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#94a09c' }}>{d.margin}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
