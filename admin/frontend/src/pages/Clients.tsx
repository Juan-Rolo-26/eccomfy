import { useEffect, useState, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import {
  Plus, X, Mail, Phone, Globe, Edit2, Trash2, MessageCircle,
} from 'lucide-react';

interface ServiceItem {
  id?: number;
  service: string;
  price: number;
  type: 'monthly' | 'onetime';
  paid?: boolean;
}

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
  services?: ServiceItem[];
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

const SERVICES_CATALOG: { name: string; defaultPrice: number; type: 'monthly' | 'onetime' }[] = [
  { name: 'Desarrollo Web', defaultPrice: 0, type: 'onetime' },
  { name: 'Software', defaultPrice: 0, type: 'onetime' },
  { name: 'Branding', defaultPrice: 0, type: 'onetime' },
  { name: 'Hosting', defaultPrice: 0, type: 'monthly' },
  { name: 'Dominio', defaultPrice: 0, type: 'monthly' },
  { name: 'Community Manager', defaultPrice: 0, type: 'monthly' },
  { name: 'Marketing', defaultPrice: 0, type: 'monthly' },
  { name: 'Grabaciones y Videos', defaultPrice: 0, type: 'monthly' },
  { name: 'SEO', defaultPrice: 0, type: 'monthly' },
  { name: 'Mantenimiento', defaultPrice: 0, type: 'monthly' },
];

const metodos = ['Transferencia bancaria', 'Mercado Pago', 'Débito automático', 'Efectivo'];

interface FormState {
  company: string;
  contact: string;
  email: string;
  phone: string;
  dueDay: number;
  metodo: string;
  domain: string;
  services: ServiceItem[];
}

const emptyForm: FormState = {
  company: '', contact: '', email: '', phone: '',
  dueDay: 1, metodo: 'Transferencia bancaria', domain: '',
  services: [],
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
  const [form, setForm] = useState<FormState>(emptyForm);
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

  const toggleService = (svcName: string) => {
    const exists = form.services.find(s => s.service === svcName);
    if (exists) {
      setForm({ ...form, services: form.services.filter(s => s.service !== svcName) });
    } else {
      const catalog = SERVICES_CATALOG.find(c => c.name === svcName)!;
      setForm({
        ...form,
        services: [...form.services, { service: svcName, price: catalog.defaultPrice, type: catalog.type }],
      });
    }
  };

  const updateServicePrice = (svcName: string, price: number) => {
    setForm({
      ...form,
      services: form.services.map(s => s.service === svcName ? { ...s, price } : s),
    });
  };

  const monthlyTotal = form.services.filter(s => s.type === 'monthly').reduce((sum, s) => sum + s.price, 0);
  const onetimeTotal = form.services.filter(s => s.type === 'onetime').reduce((sum, s) => sum + s.price, 0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        company: form.company,
        contact: form.contact,
        email: form.email,
        phone: form.phone,
        dueDay: form.dueDay,
        metodo: form.metodo,
        domain: form.domain,
        services: form.services,
      };
      if (editMode && selected) {
        await api.put(`/api/clients/${selected.id}`, payload);
      } else {
        await api.post('/api/clients', payload);
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
      dueDay: c.dueDay, metodo: c.metodo, domain: c.domain,
      services: (c.services || []).map(s => ({ service: s.service, price: s.price, type: s.type, paid: s.paid })),
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
                {['Cliente', 'Servicios', 'Mensual', 'Día cobro', 'Vencimiento', 'Método', 'Estado'].map(h => (
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
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#94a09c', maxWidth: 200 }}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.plan || '-'}
                    </div>
                  </td>
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
          position: 'fixed', top: 0, right: 0, bottom: 0, width: 420,
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

          <div style={{ marginBottom: 20 }}>{estadoBadge(selected.estado)}</div>

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

          {/* Servicios contratados */}
          {selected.services && selected.services.length > 0 && (
            <div style={{ background: '#0e1413', borderRadius: 10, padding: 16, marginBottom: 16, border: '1px solid #222b29' }}>
              <div style={{ fontSize: 12, color: '#7d8884', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Servicios contratados</div>

              {selected.services.filter(s => s.type === 'monthly').length > 0 && (
                <>
                  <div style={{ fontSize: 11, color: '#22c597', marginBottom: 6, fontWeight: 500 }}>Mensuales</div>
                  {selected.services.filter(s => s.type === 'monthly').map((s, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #1a2120', fontSize: 13 }}>
                      <span style={{ color: '#e9f0ee' }}>{s.service}</span>
                      <span style={{ color: '#22c597', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}>{fmt(s.price)}/mes</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0 4px', fontSize: 13, fontWeight: 600 }}>
                    <span style={{ color: '#94a09c' }}>Total mensual</span>
                    <span style={{ color: '#e9f0ee', fontFamily: "'IBM Plex Mono', monospace" }}>{fmt(selected.monto)}</span>
                  </div>
                </>
              )}

              {selected.services.filter(s => s.type === 'onetime').length > 0 && (
                <>
                  <div style={{ fontSize: 11, color: '#e8b54e', marginTop: 12, marginBottom: 6, fontWeight: 500 }}>Pago único</div>
                  {selected.services.filter(s => s.type === 'onetime').map((s, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #1a2120', fontSize: 13 }}>
                      <span style={{ color: '#e9f0ee' }}>{s.service}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: '#e8b54e', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500 }}>{fmt(s.price)}</span>
                        <span style={{
                          fontSize: 10, padding: '2px 6px', borderRadius: 4,
                          background: s.paid ? 'rgba(52,201,138,0.12)' : 'rgba(239,106,97,0.12)',
                          color: s.paid ? '#34c98a' : '#ef6a61',
                        }}>
                          {s.paid ? 'Pagado' : 'Pendiente'}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          <div style={{ background: '#0e1413', borderRadius: 10, padding: 16, marginBottom: 20, border: '1px solid #222b29' }}>
            <div style={{ fontSize: 12, color: '#7d8884', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Facturación</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
            width: 560, background: '#121917', borderRadius: 16, padding: 28,
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
                  <input type="email" style={inputStyle} value={form.email}
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

              {/* Servicios */}
              <div>
                <label style={{ ...labelStyle, fontSize: 13, fontWeight: 600, color: '#e9f0ee', marginBottom: 10 }}>
                  Servicios contratados
                </label>

                <div style={{ fontSize: 11, color: '#e8b54e', fontWeight: 500, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Pago único
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                  {SERVICES_CATALOG.filter(s => s.type === 'onetime').map(svc => {
                    const active = form.services.some(s => s.service === svc.name);
                    const current = form.services.find(s => s.service === svc.name);
                    return (
                      <div key={svc.name} style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                        background: active ? 'rgba(232,181,78,0.08)' : '#0b100f',
                        border: `1px solid ${active ? 'rgba(232,181,78,0.3)' : '#222b29'}`,
                        borderRadius: 8,
                      }}>
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => toggleService(svc.name)}
                          style={{ accentColor: '#e8b54e' }}
                        />
                        <span style={{ flex: 1, fontSize: 13, color: active ? '#e9f0ee' : '#7d8884' }}>{svc.name}</span>
                        {active && (
                          <input
                            type="number"
                            value={current?.price || 0}
                            onChange={e => updateServicePrice(svc.name, Number(e.target.value))}
                            placeholder="Precio"
                            style={{ ...inputStyle, width: 120, textAlign: 'right' }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{ fontSize: 11, color: '#22c597', fontWeight: 500, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Mensuales
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {SERVICES_CATALOG.filter(s => s.type === 'monthly').map(svc => {
                    const active = form.services.some(s => s.service === svc.name);
                    const current = form.services.find(s => s.service === svc.name);
                    return (
                      <div key={svc.name} style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                        background: active ? 'rgba(34,197,151,0.06)' : '#0b100f',
                        border: `1px solid ${active ? 'rgba(34,197,151,0.25)' : '#222b29'}`,
                        borderRadius: 8,
                      }}>
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => toggleService(svc.name)}
                          style={{ accentColor: '#22c597' }}
                        />
                        <span style={{ flex: 1, fontSize: 13, color: active ? '#e9f0ee' : '#7d8884' }}>{svc.name}</span>
                        {active && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <input
                              type="number"
                              value={current?.price || 0}
                              onChange={e => updateServicePrice(svc.name, Number(e.target.value))}
                              placeholder="$/mes"
                              style={{ ...inputStyle, width: 120, textAlign: 'right' }}
                            />
                            <span style={{ fontSize: 11, color: '#7d8884' }}>/mes</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Resumen de costos */}
              {form.services.length > 0 && (
                <div style={{
                  background: '#0e1413', borderRadius: 10, padding: 14,
                  border: '1px solid #222b29',
                }}>
                  <div style={{ fontSize: 12, color: '#7d8884', marginBottom: 8, fontWeight: 600 }}>Resumen</div>
                  {monthlyTotal > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                      <span style={{ color: '#94a09c' }}>Total mensual</span>
                      <span style={{ color: '#22c597', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{fmt(monthlyTotal)}/mes</span>
                    </div>
                  )}
                  {onetimeTotal > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span style={{ color: '#94a09c' }}>Total pago único</span>
                      <span style={{ color: '#e8b54e', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{fmt(onetimeTotal)}</span>
                    </div>
                  )}
                </div>
              )}
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
