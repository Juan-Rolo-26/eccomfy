import { useEffect, useState, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import {
  Plus, X, Mail, Phone, Globe, Edit2, Trash2, MessageCircle,
} from 'lucide-react';

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

const plans = ['Community Basic', 'Community Pro', 'Ads Management', 'E-commerce 360', 'Branding Full', 'SEO + Contenido'];
const metodos = ['Transferencia bancaria', 'Mercado Pago', 'Débito automático', 'Efectivo'];

const emptyForm = {
  company: '', contact: '', email: '', phone: '',
  plan: 'Community Basic', monto: 45000, dueDay: 1, metodo: 'Transferencia bancaria', domain: '',
};

const planPrices: Record<string, number> = {
  'Community Basic': 45000, 'Community Pro': 85000, 'Ads Management': 120000,
  'E-commerce 360': 185000, 'Branding Full': 150000, 'SEO + Contenido': 95000,
};

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

export default function Clients() {
  const [searchParams] = useSearchParams();
  const [clients, setClients] = useState<Client[]>([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selected, setSelected] = useState<Client | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const fetchClients = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (filter) params.set('estado', filter);
    api.get<{ clients: Client[] }>(`/api/clients?${params}`)
      .then(d => setClients(d.clients))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchClients(); }, [filter, search]);

  useEffect(() => {
    const s = searchParams.get('search');
    if (s) setSearch(s);
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && selected) {
        await api.put(`/api/clients/${selected.id}`, form);
      } else {
        await api.post('/api/clients', form);
      }
      setShowForm(false);
      setEditMode(false);
      setForm(emptyForm);
      setSelected(null);
      fetchClients();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este cliente?')) return;
    await api.del(`/api/clients/${id}`);
    setSelected(null);
    fetchClients();
  };

  const handleCobrar = async (id: number) => {
    await api.post(`/api/clients/${id}/cobrar`);
    fetchClients();
    setSelected(null);
  };

  const openEdit = (c: Client) => {
    setForm({
      company: c.company, contact: c.contact, email: c.email, phone: c.phone,
      plan: c.plan, monto: c.monto, dueDay: c.dueDay, metodo: c.metodo, domain: c.domain,
    });
    setEditMode(true);
    setShowForm(true);
  };

  const openNew = () => {
    setForm(emptyForm);
    setEditMode(false);
    setShowForm(true);
    setSelected(null);
  };

  const tabs = [
    { key: '', label: 'Todos' },
    { key: 'aldia', label: 'Al día' },
    { key: 'pendiente', label: 'Pendientes' },
    { key: 'vencido', label: 'Vencidos' },
  ];

  const formatDate = (iso: string) => {
    if (!iso) return '-';
    return new Date(iso).toLocaleDateString('es-AR');
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Clientes</h1>
          <p style={{ fontSize: 13, color: '#7d8884', marginTop: 4 }}>{clients.length} clientes</p>
        </div>
        <button onClick={openNew} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 16px', background: '#22c597', color: '#0b100f',
          border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>
          <Plus size={15} /> Nuevo cliente
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            style={{
              padding: '6px 14px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer',
              background: filter === t.key ? 'rgba(34,197,151,0.12)' : 'transparent',
              color: filter === t.key ? '#22c597' : '#94a09c',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Buscar por nombre, dominio o contacto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, maxWidth: 360 }}
        />
      </div>

      {/* Table */}
      <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#7d8884' }}>Cargando...</div>
        ) : clients.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#7d8884' }}>No se encontraron clientes</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #222b29' }}>
                {['Cliente', 'Plan', 'Monto', 'Día cobro', 'Vencimiento', 'Método', 'Estado'].map(h => (
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
              {clients.map(c => (
                <tr
                  key={c.id}
                  onClick={() => setSelected(c)}
                  style={{
                    borderBottom: '1px solid #1a2120', cursor: 'pointer',
                    background: selected?.id === c.id ? 'rgba(34,197,151,0.05)' : 'transparent',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={e => (e.currentTarget.style.background = selected?.id === c.id ? 'rgba(34,197,151,0.05)' : 'transparent')}
                >
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
                        <div style={{ fontSize: 11, color: '#7d8884' }}>{c.domain}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#94a09c' }}>{c.plan}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#e9f0ee', fontFamily: "'IBM Plex Mono', monospace" }}>{fmt(c.monto)}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#94a09c' }}>{c.dueDay}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#94a09c' }}>{formatDate(c.venc)}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#94a09c' }}>{c.metodo}</td>
                  <td style={{ padding: '12px 16px' }}>{estadoBadge(c.estado)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Slide-over panel */}
      {selected && !showForm && (
        <div style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: 400,
          background: '#121917', borderLeft: '1px solid #222b29',
          zIndex: 100, overflowY: 'auto', padding: 24,
          boxShadow: '-8px 0 32px rgba(0,0,0,0.3)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>{selected.company}</h2>
            <button onClick={() => setSelected(null)} style={{
              background: 'none', border: 'none', color: '#7d8884', cursor: 'pointer', padding: 4, display: 'flex',
            }}>
              <X size={18} />
            </button>
          </div>

          {/* Status badge */}
          <div style={{ marginBottom: 20 }}>{estadoBadge(selected.estado)}</div>

          {/* Info sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {[
              { icon: <Mail size={14} />, label: 'Email', value: selected.email },
              { icon: <Phone size={14} />, label: 'Teléfono', value: selected.phone },
              { icon: <Globe size={14} />, label: 'Dominio', value: selected.domain },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#7d8884' }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: '#7d8884' }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: '#e9f0ee' }}>{item.value || '-'}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#0e1413', borderRadius: 10, padding: 16, marginBottom: 20, border: '1px solid #222b29' }}>
            <div style={{ fontSize: 12, color: '#7d8884', marginBottom: 4 }}>Plan y facturación</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
              <div>
                <div style={{ fontSize: 11, color: '#7d8884' }}>Plan</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{selected.plan}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#7d8884' }}>Monto</div>
                <div style={{ fontSize: 14, fontWeight: 500, fontFamily: "'IBM Plex Mono', monospace" }}>{fmt(selected.monto)}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#7d8884' }}>Día de cobro</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{selected.dueDay}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#7d8884' }}>Método</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{selected.metodo}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#7d8884' }}>Cliente desde</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  {selected.desde ? new Date(selected.desde).toLocaleDateString('es-AR') : '-'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#7d8884' }}>Contacto</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{selected.contact}</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            <button
              onClick={() => handleCobrar(selected.id)}
              style={{
                width: '100%', padding: '10px', background: '#22c597', color: '#0b100f',
                border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Registrar cobro del mes
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <a
                href={`https://wa.me/${selected.phone?.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener"
                style={{
                  flex: 1, padding: '8px', background: 'rgba(34,197,151,0.08)',
                  border: '1px solid rgba(34,197,151,0.2)', borderRadius: 8,
                  fontSize: 12, color: '#22c597', textAlign: 'center', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a
                href={`mailto:${selected.email}`}
                style={{
                  flex: 1, padding: '8px', background: 'rgba(148,160,156,0.08)',
                  border: '1px solid #222b29', borderRadius: 8,
                  fontSize: 12, color: '#94a09c', textAlign: 'center', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <Mail size={14} /> Email
              </a>
            </div>
          </div>

          {/* Edit / Delete */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => openEdit(selected)}
              style={{
                flex: 1, padding: '8px', background: 'rgba(148,160,156,0.08)',
                border: '1px solid #222b29', borderRadius: 8, fontSize: 12,
                color: '#94a09c', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <Edit2 size={13} /> Editar
            </button>
            <button
              onClick={() => handleDelete(selected.id)}
              style={{
                flex: 1, padding: '8px', background: 'rgba(239,106,97,0.08)',
                border: '1px solid rgba(239,106,97,0.2)', borderRadius: 8, fontSize: 12,
                color: '#ef6a61', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
            >
              <Trash2 size={13} /> Eliminar
            </button>
          </div>
        </div>
      )}

      {/* New / Edit Modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
        }}>
          <form onSubmit={handleSubmit} style={{
            width: 480, background: '#121917', borderRadius: 16, padding: 28,
            border: '1px solid #222b29', maxHeight: '90vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
                {editMode ? 'Editar cliente' : 'Nuevo cliente'}
              </h2>
              <button type="button" onClick={() => { setShowForm(false); setEditMode(false); }} style={{
                background: 'none', border: 'none', color: '#7d8884', cursor: 'pointer', padding: 4, display: 'flex',
              }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Empresa</label>
                <input style={inputStyle} required value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Contacto</label>
                <input style={inputStyle} required value={form.contact}
                  onChange={e => setForm({ ...form, contact: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" style={inputStyle} required value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Teléfono</label>
                  <input style={inputStyle} value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Plan</label>
                  <select style={inputStyle} value={form.plan}
                    onChange={e => setForm({ ...form, plan: e.target.value, monto: planPrices[e.target.value] || form.monto })}>
                    {plans.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Monto</label>
                  <input type="number" style={inputStyle} required value={form.monto}
                    onChange={e => setForm({ ...form, monto: Number(e.target.value) })} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Día de cobro</label>
                  <input type="number" min={1} max={31} style={inputStyle} required value={form.dueDay}
                    onChange={e => setForm({ ...form, dueDay: Number(e.target.value) })} />
                </div>
                <div>
                  <label style={labelStyle}>Método de pago</label>
                  <select style={inputStyle} value={form.metodo}
                    onChange={e => setForm({ ...form, metodo: e.target.value })}>
                    {metodos.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Dominio</label>
                <input style={inputStyle} value={form.domain} placeholder="ejemplo.com"
                  onChange={e => setForm({ ...form, domain: e.target.value })} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button type="button" onClick={() => { setShowForm(false); setEditMode(false); }} style={{
                flex: 1, padding: '10px', background: 'transparent',
                border: '1px solid #222b29', borderRadius: 8, color: '#94a09c',
                fontSize: 13, cursor: 'pointer',
              }}>
                Cancelar
              </button>
              <button type="submit" style={{
                flex: 1, padding: '10px', background: '#22c597', color: '#0b100f',
                border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>
                {editMode ? 'Guardar cambios' : 'Crear cliente'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
