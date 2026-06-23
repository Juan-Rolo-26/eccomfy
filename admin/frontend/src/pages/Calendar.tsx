import { useEffect, useState } from 'react';
import { api } from '../api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Client {
  id: number;
  company: string;
  dueDay: number;
  estado: 'aldia' | 'pendiente' | 'vencido';
  monto: number;
}

const cardStyle: React.CSSProperties = {
  background: '#121917', border: '1px solid #222b29', borderRadius: 12, padding: 20,
};

const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const estadoColor: Record<string, string> = {
  aldia: '#34c98a',
  pendiente: '#e8b54e',
  vencido: '#ef6a61',
};

export default function Calendar() {
  const [clients, setClients] = useState<Client[]>([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    api.get<{ clients: Client[] }>('/api/clients')
      .then(d => setClients(d.clients))
      .catch(console.error);
  }, []);

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  // Monday = 0, Sunday = 6
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  // Build calendar grid
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  // Group clients by dueDay
  const byDay: Record<number, Client[]> = {};
  clients.forEach(c => {
    if (!byDay[c.dueDay]) byDay[c.dueDay] = [];
    byDay[c.dueDay].push(c);
  });

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const monthName = date.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });

  const prevMonth = () => setDate(new Date(year, month - 1, 1));
  const nextMonth = () => setDate(new Date(year, month + 1, 1));

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 24px' }}>Calendario de cobros</h1>

      <div style={cardStyle}>
        {/* Month nav */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
        }}>
          <button onClick={prevMonth} style={{
            background: 'none', border: '1px solid #222b29', borderRadius: 8,
            color: '#94a09c', cursor: 'pointer', padding: '6px 10px', display: 'flex',
          }}>
            <ChevronLeft size={16} />
          </button>
          <span style={{ fontSize: 16, fontWeight: 600, textTransform: 'capitalize' }}>{monthName}</span>
          <button onClick={nextMonth} style={{
            background: 'none', border: '1px solid #222b29', borderRadius: 8,
            color: '#94a09c', cursor: 'pointer', padding: '6px 10px', display: 'flex',
          }}>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Weekday headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, marginBottom: 4 }}>
          {weekdays.map(w => (
            <div key={w} style={{
              textAlign: 'center', padding: '8px 0', fontSize: 11,
              fontWeight: 600, color: '#7d8884', textTransform: 'uppercase',
            }}>
              {w}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
          {cells.map((day, i) => {
            const dayClients = day ? (byDay[day] || []) : [];
            return (
              <div
                key={i}
                style={{
                  minHeight: 80,
                  padding: 8,
                  background: day ? '#0e1413' : 'transparent',
                  borderRadius: 6,
                  border: day && isToday(day) ? '1px solid #22c597' : '1px solid transparent',
                }}
              >
                {day && (
                  <>
                    <div style={{
                      fontSize: 13, fontWeight: isToday(day) ? 600 : 400,
                      color: isToday(day) ? '#22c597' : '#94a09c',
                      marginBottom: 6,
                    }}>
                      {day}
                    </div>
                    {dayClients.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {dayClients.slice(0, 3).map(c => (
                          <div key={c.id} style={{
                            display: 'flex', alignItems: 'center', gap: 4,
                            fontSize: 10, color: '#94a09c',
                          }}>
                            <div style={{
                              width: 6, height: 6, borderRadius: '50%',
                              background: estadoColor[c.estado] || '#7d8884',
                              flexShrink: 0,
                            }} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {c.company}
                            </span>
                          </div>
                        ))}
                        {dayClients.length > 3 && (
                          <div style={{ fontSize: 10, color: '#7d8884' }}>
                            +{dayClients.length - 3} más
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 16, marginTop: 16, justifyContent: 'center' }}>
          {[
            { label: 'Al día', color: '#34c98a' },
            { label: 'Pendiente', color: '#e8b54e' },
            { label: 'Vencido', color: '#ef6a61' },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#94a09c' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
