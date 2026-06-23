import { useEffect, useState, FormEvent } from 'react';
import { api } from '../api';
import { TrendingDown, TrendingUp, BarChart3, Plus, X } from 'lucide-react';

interface Expense {
  id: number;
  category: string;
  detail: string;
  amount: number;
  date: string;
}

interface DashboardData {
  totalMRR: number;
}

const fmt = (n: number) => `$ ${n.toLocaleString('es-AR')}`;

const categoryIcons: Record<string, string> = {
  'Publicidad Meta Ads': '📢',
  'Publicidad Google Ads': '🌐',
  'Sueldos equipo': '👤',
  'Freelancers': '🤝',
  'Herramientas SaaS': '🔧',
  'Alquiler oficina': '🏢',
  'Servicios': '⚡',
  'Impuestos y contador': '🏛️',
  'Otros': '📋',
};

const categories = ['Publicidad Meta Ads', 'Publicidad Google Ads', 'Sueldos equipo', 'Freelancers', 'Herramientas SaaS', 'Alquiler oficina', 'Servicios', 'Impuestos y contador', 'Otros'];

const cardStyle: React.CSSProperties = {
  background: '#121917', border: '1px solid #222b29', borderRadius: 12, padding: 20,
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px', background: '#0b100f',
  border: '1px solid #222b29', borderRadius: 8, color: '#e9f0ee', fontSize: 13, outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 12, color: '#94a09c', marginBottom: 4,
};

export default function Gastos() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [mrr, setMrr] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ category: 'Publicidad Meta Ads', detail: '', amount: 0, date: new Date().toISOString().slice(0, 10) });

  const fetchData = () => {
    api.get<{ expenses: Expense[] }>('/api/expenses').then(d => setExpenses(d.expenses)).catch(console.error);
    api.get<DashboardData>('/api/dashboard').then(d => setMrr(d.totalMRR)).catch(console.error);
  };

  useEffect(() => { fetchData(); }, []);

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const result = mrr - totalExpenses;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await api.post('/api/expenses', form);
    setShowForm(false);
    setForm({ category: 'Hosting', detail: '', amount: 0, date: new Date().toISOString().slice(0, 10) });
    fetchData();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Gastos</h1>
        <button onClick={() => setShowForm(true)} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 16px', background: '#22c597', color: '#0b100f',
          border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>
          <Plus size={15} /> Registrar gasto
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { icon: TrendingDown, label: 'Egresos del mes', value: fmt(totalExpenses), color: '#ef6a61' },
          { icon: TrendingUp, label: 'Ingresos del mes', value: fmt(mrr), color: '#22c597' },
          { icon: BarChart3, label: 'Resultado neto', value: fmt(result), color: result >= 0 ? '#34c98a' : '#ef6a61' },
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
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
        {expenses.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#7d8884' }}>No hay gastos registrados</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #222b29' }}>
                {['Categoría', 'Fecha', 'Monto'].map(h => (
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
              {expenses.map(exp => (
                <tr key={exp.id} style={{ borderBottom: '1px solid #1a2120' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18 }}>{categoryIcons[exp.category] || '📋'}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: '#e9f0ee' }}>{exp.category}</div>
                        <div style={{ fontSize: 11, color: '#7d8884' }}>{exp.detail}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#94a09c' }}>
                    {new Date(exp.date).toLocaleDateString('es-AR')}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#ef6a61', fontFamily: "'IBM Plex Mono', monospace" }}>
                    {fmt(exp.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
        }}>
          <form onSubmit={handleSubmit} style={{
            width: 420, background: '#121917', borderRadius: 16, padding: 28,
            border: '1px solid #222b29',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Registrar gasto</h2>
              <button type="button" onClick={() => setShowForm(false)} style={{
                background: 'none', border: 'none', color: '#7d8884', cursor: 'pointer', padding: 4, display: 'flex',
              }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Categoría</label>
                <select style={inputStyle} value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Detalle</label>
                <input style={inputStyle} required value={form.detail}
                  onChange={e => setForm({ ...form, detail: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Monto</label>
                  <input type="number" style={inputStyle} required value={form.amount}
                    onChange={e => setForm({ ...form, amount: Number(e.target.value) })} />
                </div>
                <div>
                  <label style={labelStyle}>Fecha</label>
                  <input type="date" style={inputStyle} required value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button type="button" onClick={() => setShowForm(false)} style={{
                flex: 1, padding: '10px', background: 'transparent',
                border: '1px solid #222b29', borderRadius: 8, color: '#94a09c', fontSize: 13, cursor: 'pointer',
              }}>
                Cancelar
              </button>
              <button type="submit" style={{
                flex: 1, padding: '10px', background: '#22c597', color: '#0b100f',
                border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>
                Registrar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
