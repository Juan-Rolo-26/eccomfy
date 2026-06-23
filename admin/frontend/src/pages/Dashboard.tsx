import { useEffect, useState } from 'react';
import { api } from '../api';
import { DollarSign, Users, Clock, AlertTriangle, Download } from 'lucide-react';

interface DashboardData {
  totalMRR: number;
  totalClients: number;
  activeClients: number;
  pendingCount: number;
  pendingAmount: number;
  overdueCount: number;
  overdueAmount: number;
  newClientsThisMonth: number;
}

const fmt = (n: number) => `$ ${n.toLocaleString('es-AR')}`;

const cardStyle: React.CSSProperties = {
  background: '#121917',
  border: '1px solid #222b29',
  borderRadius: 12,
  padding: '20px',
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api.get<DashboardData>('/api/dashboard').then(setData).catch(console.error);
  }, []);

  if (!data) return <div style={{ color: '#7d8884' }}>Cargando...</div>;

  const today = new Date();
  const dateStr = today.toLocaleDateString('es-AR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const total = data.activeClients + data.pendingCount + data.overdueCount;
  const pctActive = total ? (data.activeClients / total) * 100 : 0;
  const pctPending = total ? (data.pendingCount / total) * 100 : 0;
  const pctOverdue = total ? (data.overdueCount / total) * 100 : 0;

  // Mock bar chart data for last 6 months
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const incomeData = [data.totalMRR * 0.8, data.totalMRR * 0.85, data.totalMRR * 0.9, data.totalMRR * 0.95, data.totalMRR * 0.97, data.totalMRR];
  const expenseData = incomeData.map(v => v * 0.3);
  const maxVal = Math.max(...incomeData, ...expenseData);

  const handleExport = () => {
    api.downloadFile('/api/export/clients', 'clientes.xlsx').catch(console.error);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Resumen general</h1>
          <p style={{ fontSize: 13, color: '#7d8884', marginTop: 4, textTransform: 'capitalize' }}>{dateStr}</p>
        </div>
        <button
          onClick={handleExport}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', background: 'rgba(34,197,151,0.12)', color: '#22c597',
            border: '1px solid rgba(34,197,151,0.25)', borderRadius: 8,
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}
        >
          <Download size={15} /> Exportar reporte
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { icon: DollarSign, label: 'Ingresos del mes', value: fmt(data.totalMRR), color: '#22c597' },
          { icon: Users, label: 'Clientes activos', value: `${data.activeClients}`, color: '#22c597', sub: `${data.totalClients} totales` },
          { icon: Clock, label: 'Cobros pendientes', value: `${data.pendingCount}`, color: '#e8b54e', sub: fmt(data.pendingAmount) },
          { icon: AlertTriangle, label: 'Vencidos', value: `${data.overdueCount}`, color: '#ef6a61', sub: fmt(data.overdueAmount) },
        ].map((kpi, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: `${kpi.color}15`, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <kpi.icon size={16} color={kpi.color} />
              </div>
              <span style={{ fontSize: 12, color: '#94a09c' }}>{kpi.label}</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#e9f0ee' }}>{kpi.value}</div>
            {kpi.sub && <div style={{ fontSize: 12, color: '#7d8884', marginTop: 4 }}>{kpi.sub}</div>}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Bar Chart */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 16px' }}>Balance mensual</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 180 }}>
            {months.map((m, i) => (
              <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 150 }}>
                  <div style={{
                    width: 16, borderRadius: '4px 4px 0 0',
                    background: '#22c597',
                    height: `${maxVal ? (incomeData[i] / maxVal) * 100 : 0}%`,
                  }} />
                  <div style={{
                    width: 16, borderRadius: '4px 4px 0 0',
                    background: '#ef6a61',
                    height: `${maxVal ? (expenseData[i] / maxVal) * 100 : 0}%`,
                  }} />
                </div>
                <span style={{ fontSize: 11, color: '#7d8884' }}>{m}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 12, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#94a09c' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: '#22c597' }} /> Ingresos
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#94a09c' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: '#ef6a61' }} /> Egresos
            </div>
          </div>
        </div>

        {/* Estado de la cartera */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 20px' }}>Estado de la cartera</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Al día', count: data.activeClients, pct: pctActive, color: '#34c98a' },
              { label: 'Pendiente', count: data.pendingCount, pct: pctPending, color: '#e8b54e' },
              { label: 'Vencido', count: data.overdueCount, pct: pctOverdue, color: '#ef6a61' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: '#94a09c' }}>{s.label}</span>
                  <span style={{ color: '#e9f0ee', fontWeight: 500 }}>{s.count} ({s.pct.toFixed(0)}%)</span>
                </div>
                <div style={{ height: 6, background: '#1a2120', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 3, transition: 'width 0.5s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reminders */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: 14, fontWeight: 600, margin: '0 0 12px' }}>Recordatorios</h3>
        {data.pendingCount > 0 && (
          <div style={{
            padding: '10px 14px', background: 'rgba(232,181,78,0.08)',
            border: '1px solid rgba(232,181,78,0.2)', borderRadius: 8,
            fontSize: 13, color: '#e8b54e', marginBottom: 8,
          }}>
            Hay {data.pendingCount} cobros pendientes por un total de {fmt(data.pendingAmount)}
          </div>
        )}
        {data.overdueCount > 0 && (
          <div style={{
            padding: '10px 14px', background: 'rgba(239,106,97,0.08)',
            border: '1px solid rgba(239,106,97,0.2)', borderRadius: 8,
            fontSize: 13, color: '#ef6a61',
          }}>
            {data.overdueCount} clientes con pagos vencidos por {fmt(data.overdueAmount)}
          </div>
        )}
        {data.pendingCount === 0 && data.overdueCount === 0 && (
          <div style={{ fontSize: 13, color: '#7d8884' }}>Sin recordatorios pendientes</div>
        )}
      </div>
    </div>
  );
}
