import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

// For a single table it is probably better to just put it all in the main()
// But I wanted to write it as if the scale of the app is a bit bigger

async function schedule() {
  await prisma.schedule.upsert({
    where: {
      id: 1,
    },
    create: {
      id: 1,
      startHour: 11,
      endHour: 23,
    },
    update: {
      id: 1,
      startHour: 11,
      endHour: 23,
    },
  });
};

async function main() {
  try {
    await schedule();
    console.log('Seeded schedule successfully');
  } catch (err) {
    console.error(`Error seeding schedule: ${err}`);
    console.log('Aborting');
    return;
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  });

