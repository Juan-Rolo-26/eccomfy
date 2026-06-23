import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Receipt,
  CalendarDays,
  Wallet,
  BarChart3,
  CreditCard,
  Search,
  Bell,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Resumen' },
  { to: '/clientes', icon: Users, label: 'Clientes' },
  { to: '/cobros', icon: Receipt, label: 'Cobros' },
  { to: '/calendario', icon: CalendarDays, label: 'Calendario' },
  { to: '/gastos', icon: Wallet, label: 'Gastos' },
  { to: '/balances', icon: BarChart3, label: 'Balances' },
  { to: '/metodos', icon: CreditCard, label: 'Métodos de pago' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'AD';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0b100f' }}>
      {/* Sidebar */}
      <aside style={{
        width: 252,
        minWidth: 252,
        background: '#0e1413',
        borderRight: '1px solid #222b29',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px 20px' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#22c597', letterSpacing: '-0.5px' }}>
            eccomfy
          </div>
          <div style={{ fontSize: 11, color: '#7d8884', marginTop: 2 }}>
            admin.eccomfyarg.com
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 500,
                color: isActive ? '#e9f0ee' : '#94a09c',
                background: isActive ? 'rgba(34,197,151,0.12)' : 'transparent',
                transition: 'all 0.15s',
              })}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid #222b29',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(34,197,151,0.15)',
            color: '#22c597',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 600,
            flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#e9f0ee', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'Admin'}
            </div>
            <div style={{ fontSize: 11, color: '#7d8884' }}>Administrador</div>
          </div>
          <button
            onClick={handleLogout}
            title="Cerrar sesión"
            style={{
              background: 'none',
              border: 'none',
              color: '#7d8884',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header */}
        <header style={{
          height: 56,
          background: '#0e1413',
          borderBottom: '1px solid #222b29',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: 16,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <div style={{
            flex: 1,
            maxWidth: 400,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#121917',
            borderRadius: 8,
            padding: '0 12px',
            border: '1px solid #222b29',
          }}>
            <Search size={16} color="#7d8884" />
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && search.trim()) {
                  navigate(`/clientes?search=${encodeURIComponent(search.trim())}`);
                }
              }}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#e9f0ee',
                fontSize: 13,
                padding: '8px 0',
                outline: 'none',
              }}
            />
          </div>
          <button style={{
            background: 'none',
            border: 'none',
            color: '#94a09c',
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
          }}>
            <Bell size={18} />
          </button>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
