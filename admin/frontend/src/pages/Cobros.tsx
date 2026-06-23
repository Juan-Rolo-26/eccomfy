import { useEffect, useState } from 'react';
import { api } from '../api';
import { DollarSign, AlertTriangle, Clock, MessageCircle, CheckCircle } from 'lucide-react';

interface Client {
  id: number;
  company: string;
  contact: string;
  email: string;
  phone: string;
  plan: string;
  monto: number;
  dueDay: number;
  venc: string;
  estado: 'aldia' | 'pendiente' | 'vencido';
  metodo: string;
  domain: string;
  desde: string;
}

const fmt = (n: number) => `$ ${n.toLocaleString('es-AR')}`;

const estadoBadge = (estado: string) => {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    aldia: { bg: 'rgba(52,201,138,0.12)', color: '#34c98a', label: 'Al día' },
    pendiente: { bg: 'rgba(232,181,78,0.12)', color: '#e8b54e', label: 'Pendiente' },
    vencido: { bg: 'rgba(239,106,97,0.12)', color: '#ef6a61', label: 'Vencido' },
  };
  const s = map[estado] || map.pendiente;
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 500,
      background: s.bg, color: s.color,
    }}>
      {s.label}
    </span>
  );
};

const initials = (name: string) =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

const cardStyle: React.CSSProperties = {
  background: '#121917', border: '1px solid #222b29', borderRadius: 12, padding: 20,
};

export default function Cobros() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = () => {
    api.get<{ clients: Client[] }>('/api/clients')
      .then(d => setClients(d.clients))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchClients(); }, []);

  const pending = clients.filter(c => c.estado === 'pendiente');
  const overdue = clients.filter(c => c.estado === 'vencido');
  const actionable = [...overdue, ...pending];

  const totalPending = pending.reduce((s, c) => s + c.monto, 0);
  const totalOverdue = overdue.reduce((s, c) => s + c.monto, 0);
  const totalAll = totalPending + totalOverdue;

  const handleCobrar = async (id: number) => {
    await api.post(`/api/clients/${id}/cobrar`);
    fetchClients();
  };

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 20px' }}>Cobros</h1>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { icon: DollarSign, label: 'Total por cobrar', value: fmt(totalAll), color: '#22c597' },
          { icon: AlertTriangle, label: 'Vencido', value: fmt(totalOverdue), color: '#ef6a61', sub: `${overdue.length} clientes` },
          { icon: Clock, label: 'Pendiente este período', value: fmt(totalPending), color: '#e8b54e', sub: `${pending.length} clientes` },
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
            <div style={{ fontSize: 24, fontWeight: 600 }}>{kpi.value}</div>
            {kpi.sub && <div style={{ fontSize: 12, color: '#7d8884', marginTop: 4 }}>{kpi.sub}</div>}
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#7d8884' }}>Cargando...</div>
        ) : actionable.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center' }}>
            <CheckCircle size={40} color="#34c98a" style={{ marginBottom: 12 }} />
            <div style={{ fontSize: 16, fontWeight: 500, color: '#e9f0ee', marginBottom: 4 }}>
              Todo al día
            </div>
            <div style={{ fontSize: 13, color: '#7d8884' }}>
              No hay cobros pendientes ni vencidos
            </div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #222b29' }}>
                {['Cliente', 'Plan', 'Monto', 'Vencimiento', 'Estado', 'Acciones'].map(h => (
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
              {actionable.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #1a2120' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: 'rgba(34,197,151,0.1)', color: '#22c597',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 600, flexShrink: 0,
                      }}>
                        {initials(c.company)}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: '#e9f0ee' }}>{c.company}</div>
                        <div style={{ fontSize: 11, color: '#7d8884' }}>{c.contact}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#94a09c' }}>{c.plan}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#e9f0ee', fontFamily: "'IBM Plex Mono', monospace" }}>
                    {fmt(c.monto)}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#94a09c' }}>
                    {c.venc ? new Date(c.venc).toLocaleDateString('es-AR') : '-'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>{estadoBadge(c.estado)}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        onClick={() => handleCobrar(c.id)}
                        style={{
                          padding: '5px 12px', background: '#22c597', color: '#0b100f',
                          border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        }}
                      >
                        Cobrar
                      </button>
                      <a
                        href={`https://wa.me/${c.phone?.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener"
                        style={{
                          padding: '5px 10px', background: 'rgba(34,197,151,0.08)',
                          border: '1px solid rgba(34,197,151,0.2)', borderRadius: 6,
                          color: '#22c597', display: 'flex', alignItems: 'center',
                          textDecoration: 'none',
                        }}
                      >
                        <MessageCircle size={14} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
