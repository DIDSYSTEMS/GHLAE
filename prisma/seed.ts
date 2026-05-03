const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const productsData = require('../src/data/products.json');
const servicesData = require('../src/data/services.json');

const seedPrisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await seedPrisma.user.upsert({
    where: { email: 'admin@ghlae.com' },
    update: {},
    create: {
      email: 'admin@ghlae.com',
      password: hashedPassword,
      name: 'GHLAE Admin',
    },
  });

  console.log('Admin user created');

  // Seed Agro Products
  for (const product of productsData.agroProducts) {
    await seedPrisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        unit: product.unit,
        image: product.image,
        type: 'AGRO',
      },
    });
  }

  // Seed Auto Products
  for (const auto of productsData.autos) {
    await seedPrisma.product.upsert({
      where: { id: auto.id },
      update: {},
      create: {
        id: auto.id,
        name: auto.name,
        category: auto.category,
        price: auto.price,
        unit: 'unit',
        image: auto.image,
        type: 'AUTO',
        specs: JSON.stringify(auto.specs),
      },
    });
  }

  console.log('Products seeded');

  // Seed Logistics Services
  for (const service of servicesData.logistics) {
    await seedPrisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: {
        id: service.id,
        title: service.title,
        description: service.description,
        icon: service.icon,
        category: 'LOGISTICS',
      },
    });
  }

  // Seed Agro Services
  for (const service of servicesData.agro) {
    await seedPrisma.service.upsert({
      where: { id: service.id },
      update: {},
      create: {
        id: service.id,
        title: service.title,
        description: service.description,
        icon: service.icon,
        category: 'AGRO',
      },
    });
  }

  console.log('Services seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await seedPrisma.$disconnect();
  });

export {};
