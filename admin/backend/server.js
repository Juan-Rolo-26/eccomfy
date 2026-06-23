const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'eccomfy-admin-secret-2026';

// Middleware
app.use(cors({ origin: ['http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'], credentials: true }));
app.use(express.json());

// Auth middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

// ─── AUTH ────────────────────────────────────────────────────────────────────

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    if (!email.endsWith('@gmail.com')) {
      return res.status(400).json({ error: 'Solo se permiten emails @gmail.com' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ─── CLIENTS ─────────────────────────────────────────────────────────────────

app.get('/api/clients', authMiddleware, async (req, res) => {
  try {
    const { search, estado } = req.query;
    const where = {};

    if (estado) {
      where.estado = estado;
    }

    if (search) {
      where.OR = [
        { company: { contains: search } },
        { contact: { contains: search } },
        { email: { contains: search } },
        { domain: { contains: search } },
      ];
    }

    const clients = await prisma.client.findMany({
      where,
      orderBy: { company: 'asc' },
      include: { payments: { orderBy: { date: 'desc' }, take: 5 } }
    });

    res.json({ clients });
  } catch (err) {
    console.error('Get clients error:', err);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

app.post('/api/clients', authMiddleware, async (req, res) => {
  try {
    const { company, contact, email, phone, plan, monto, dueDay, venc, estado, metodo, domain, desde } = req.body;

    const now = new Date();
    const nextDue = new Date(now.getFullYear(), now.getMonth() + 1, parseInt(dueDay) || 1);
    const client = await prisma.client.create({
      data: {
        company,
        contact,
        email: email || '',
        phone: phone || '',
        plan,
        monto: parseFloat(monto) || 0,
        dueDay: parseInt(dueDay) || 1,
        venc: venc ? new Date(venc) : nextDue,
        estado: estado || 'aldia',
        metodo,
        domain: domain || '',
        desde: desde ? new Date(desde) : now,
      }
    });

    res.status(201).json(client);
  } catch (err) {
    console.error('Create client error:', err);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
});

app.put('/api/clients/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (data.monto !== undefined) data.monto = parseFloat(data.monto);
    if (data.dueDay !== undefined) data.dueDay = parseInt(data.dueDay);
    if (data.venc) data.venc = new Date(data.venc);
    if (data.desde) data.desde = new Date(data.desde);

    // Remove fields that shouldn't be updated directly
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.payments;

    const client = await prisma.client.update({
      where: { id: parseInt(id) },
      data
    });

    res.json(client);
  } catch (err) {
    console.error('Update client error:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
});

app.delete('/api/clients/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.client.delete({ where: { id: parseInt(id) } });

    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (err) {
    console.error('Delete client error:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
});

app.post('/api/clients/:id/cobrar', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const client = await prisma.client.findUnique({ where: { id: parseInt(id) } });
    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const now = new Date();
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const monthLabel = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    // Advance venc to next month
    const nextVenc = new Date(client.venc);
    nextVenc.setMonth(nextVenc.getMonth() + 1);

    const [updatedClient, payment] = await prisma.$transaction([
      prisma.client.update({
        where: { id: parseInt(id) },
        data: {
          estado: 'aldia',
          venc: nextVenc
        }
      }),
      prisma.payment.create({
        data: {
          clientId: parseInt(id),
          amount: client.monto,
          date: now,
          metodo: client.metodo,
          month: monthLabel
        }
      })
    ]);

    res.json({ client: updatedClient, payment });
  } catch (err) {
    console.error('Cobrar error:', err);
    res.status(500).json({ error: 'Error al registrar cobro' });
  }
});

// ─── EXPENSES ────────────────────────────────────────────────────────────────

app.get('/api/expenses', authMiddleware, async (req, res) => {
  try {
    const { month, year } = req.query;
    const where = {};

    if (month && year) {
      const m = parseInt(month) - 1; // JS months are 0-indexed
      const y = parseInt(year);
      const start = new Date(y, m, 1);
      const end = new Date(y, m + 1, 1);
      where.date = { gte: start, lt: end };
    } else if (year) {
      const y = parseInt(year);
      const start = new Date(y, 0, 1);
      const end = new Date(y + 1, 0, 1);
      where.date = { gte: start, lt: end };
    }

    const expenses = await prisma.expense.findMany({
      where,
      orderBy: { date: 'desc' }
    });

    res.json({ expenses });
  } catch (err) {
    console.error('Get expenses error:', err);
    res.status(500).json({ error: 'Error al obtener gastos' });
  }
});

app.post('/api/expenses', authMiddleware, async (req, res) => {
  try {
    const { category, detail, amount, icon, date } = req.body;

    const expense = await prisma.expense.create({
      data: {
        category,
        detail,
        amount: parseFloat(amount),
        icon: icon || '💰',
        date: new Date(date),
      }
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error('Create expense error:', err);
    res.status(500).json({ error: 'Error al crear gasto' });
  }
});

app.delete('/api/expenses/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.expense.delete({ where: { id: parseInt(id) } });

    res.json({ message: 'Gasto eliminado correctamente' });
  } catch (err) {
    console.error('Delete expense error:', err);
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Gasto no encontrado' });
    }
    res.status(500).json({ error: 'Error al eliminar gasto' });
  }
});

// ─── DASHBOARD ───────────────────────────────────────────────────────────────

app.get('/api/dashboard', authMiddleware, async (req, res) => {
  try {
    const clients = await prisma.client.findMany();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const activeClients = clients.filter(c => c.estado === 'aldia');
    const pendingClients = clients.filter(c => c.estado === 'pendiente');
    const overdueClients = clients.filter(c => c.estado === 'vencido');
    const newClientsThisMonth = clients.filter(c => new Date(c.createdAt) >= startOfMonth);

    const totalMRR = activeClients.reduce((sum, c) => sum + c.monto, 0);
    const pendingAmount = pendingClients.reduce((sum, c) => sum + c.monto, 0);
    const overdueAmount = overdueClients.reduce((sum, c) => sum + c.monto, 0);

    res.json({
      totalMRR,
      activeClients: activeClients.length,
      pendingCount: pendingClients.length,
      pendingAmount,
      overdueCount: overdueClients.length,
      overdueAmount,
      newClientsThisMonth: newClientsThisMonth.length,
      totalClients: clients.length
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Error al obtener dashboard' });
  }
});

// ─── EXPORT ──────────────────────────────────────────────────────────────────

app.get('/api/export/clients', authMiddleware, async (req, res) => {
  try {
    const clients = await prisma.client.findMany({ orderBy: { company: 'asc' } });

    const data = clients.map(c => ({
      'Empresa': c.company,
      'Contacto': c.contact,
      'Email': c.email,
      'Teléfono': c.phone,
      'Plan': c.plan,
      'Monto': c.monto,
      'Día de Cobro': c.dueDay,
      'Vencimiento': new Date(c.venc).toLocaleDateString('es-AR'),
      'Estado': c.estado,
      'Método de Pago': c.metodo,
      'Dominio': c.domain,
      'Cliente Desde': new Date(c.desde).toLocaleDateString('es-AR'),
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    // Set column widths
    ws['!cols'] = [
      { wch: 25 }, // Empresa
      { wch: 20 }, // Contacto
      { wch: 28 }, // Email
      { wch: 16 }, // Teléfono
      { wch: 22 }, // Plan
      { wch: 12 }, // Monto
      { wch: 14 }, // Día de Cobro
      { wch: 14 }, // Vencimiento
      { wch: 12 }, // Estado
      { wch: 22 }, // Método de Pago
      { wch: 25 }, // Dominio
      { wch: 14 }, // Cliente Desde
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Clientes');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=clientes-eccomfy.xlsx');
    res.send(buffer);
  } catch (err) {
    console.error('Export error:', err);
    res.status(500).json({ error: 'Error al exportar clientes' });
  }
});

// ─── START SERVER ────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Eccomfy Admin API running on http://localhost:${PORT}`);
});
