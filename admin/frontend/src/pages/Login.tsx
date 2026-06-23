import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.endsWith('@gmail.com')) {
      setError('El email debe ser @gmail.com');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0b100f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <form onSubmit={handleSubmit} style={{
        width: 400,
        background: '#121917',
        borderRadius: 16,
        padding: 40,
        border: '1px solid #222b29',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#22c597',
            letterSpacing: '-0.5px',
          }}>
            eccomfy
          </div>
          <div style={{ fontSize: 13, color: '#7d8884', marginTop: 4 }}>
            Panel de administración
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,106,97,0.12)',
            border: '1px solid rgba(239,106,97,0.3)',
            color: '#ef6a61',
            padding: '10px 14px',
            borderRadius: 8,
            fontSize: 13,
            marginBottom: 20,
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, color: '#94a09c', marginBottom: 6 }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@gmail.com"
            required
            style={{
              width: '100%',
              padding: '10px 14px',
              background: '#0b100f',
              border: '1px solid #222b29',
              borderRadius: 8,
              color: '#e9f0ee',
              fontSize: 14,
              outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = '#22c597'}
            onBlur={e => e.target.style.borderColor = '#222b29'}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, color: '#94a09c', marginBottom: 6 }}>
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{
              width: '100%',
              padding: '10px 14px',
              background: '#0b100f',
              border: '1px solid #222b29',
              borderRadius: 8,
              color: '#e9f0ee',
              fontSize: 14,
              outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = '#22c597'}
            onBlur={e => e.target.style.borderColor = '#222b29'}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px 0',
            background: '#22c597',
            color: '#0b100f',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
}
