const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean existing data
  await prisma.payment.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  // ─── Create admin user ───
  const hashedPassword = await bcrypt.hash('Islas-caiman123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'eccomfyarg@gmail.com',
      password: hashedPassword,
      name: 'Juan Pablo',
      role: 'ADMIN'
    }
  });
  console.log(`Admin user created: ${admin.email}`);

  console.log('\nBase de datos limpia. Solo cuenta admin creada.');
  console.log('Login: eccomfyarg@gmail.com / Islas-caiman123');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
