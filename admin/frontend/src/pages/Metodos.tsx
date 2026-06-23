import { useEffect, useState } from 'react';
import { api } from '../api';
import { CreditCard, Landmark, Smartphone, DollarSign, Wallet } from 'lucide-react';

interface Client {
  id: number;
  company: string;
  monto: number;
  metodo: string;
  estado: string;
}

const fmt = (n: number) => `$ ${n.toLocaleString('es-AR')}`;

const metodoIcons: Record<string, React.ReactNode> = {
  'Transferencia bancaria': <Landmark size={20} />,
  'Mercado Pago': <Smartphone size={20} />,
  'Débito automático': <CreditCard size={20} />,
  'Efectivo': <Wallet size={20} />,
};

const metodoColors: Record<string, string> = {
  'Transferencia bancaria': '#22c597',
  'Mercado Pago': '#00b4ff',
  'Débito automático': '#a78bfa',
  'Efectivo': '#e8b54e',
};

const cardStyle: React.CSSProperties = {
  background: '#121917', border: '1px solid #222b29', borderRadius: 12, padding: 20,
};

export default function Metodos() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    api.get<{ clients: Client[] }>('/api/clients')
      .then(d => setClients(d.clients))
      .catch(console.error);
  }, []);

  // Group by method
  const grouped: Record<string, { count: number; total: number }> = {};
  clients.forEach(c => {
    if (!grouped[c.metodo]) grouped[c.metodo] = { count: 0, total: 0 };
    grouped[c.metodo].count++;
    grouped[c.metodo].total += c.monto;
  });

  const methods = Object.entries(grouped).sort((a, b) => b[1].total - a[1].total);
  const totalClients = clients.length;

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 24px' }}>Métodos de pago</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {methods.map(([method, data]) => {
          const pct = totalClients ? (data.count / totalClients) * 100 : 0;
          const color = metodoColors[method] || '#22c597';
          const icon = metodoIcons[method] || <CreditCard size={20} />;

          return (
            <div key={method} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: `${color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: color,
                }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#e9f0ee' }}>{method}</div>
                  <div style={{ fontSize: 12, color: '#7d8884' }}>
                    {data.count} {data.count === 1 ? 'cliente' : 'clientes'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <span style={{ fontSize: 20, fontWeight: 600, fontFamily: "'IBM Plex Mono', monospace", color: '#e9f0ee' }}>
                  {fmt(data.total)}
                </span>
                <span style={{ fontSize: 13, fontWeight: 500, color }}>
                  {pct.toFixed(0)}%
                </span>
              </div>

              <div style={{ height: 6, background: '#1a2120', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${pct}%`,
                  background: color,
                  borderRadius: 3,
                  transition: 'width 0.5s',
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {methods.length === 0 && (
        <div style={{ ...cardStyle, textAlign: 'center', padding: 60, color: '#7d8884' }}>
          No hay datos de métodos de pago
        </div>
      )}
    </div>
  );
}
