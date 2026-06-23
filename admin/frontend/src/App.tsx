import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Cobros from './pages/Cobros';
import Gastos from './pages/Gastos';
import Balances from './pages/Balances';
import Calendar from './pages/Calendar';
import Metodos from './pages/Metodos';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  if (loading) return <div style={{ background: '#0b100f', minHeight: '100vh' }} />;
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="clientes" element={<Clients />} />
        <Route path="cobros" element={<Cobros />} />
        <Route path="calendario" element={<Calendar />} />
        <Route path="gastos" element={<Gastos />} />
        <Route path="balances" element={<Balances />} />
        <Route path="metodos" element={<Metodos />} />
      </Route>
    </Routes>
  );
}
