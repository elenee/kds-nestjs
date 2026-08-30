import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const existingAdmin = await prisma.user.findUnique({ where: { username: 'admin' } });
  if (existingAdmin) {
    console.log('Admin already exists, skipping seed.');
    return;
  }
  const password = process.env.ADMIN_PASSWORD!;

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin account created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });