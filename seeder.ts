// seeds/todoSeed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.todo.createMany({
    data: [
      {
        id: '1',
        title: 'Complete homework',
        content: 'Finish math and science assignments',
        completed: false,
        userId: '1', // Replace with actual user ID from your User model
      },
      {
        id: '2',
        title: 'Buy groceries',
        content: 'Milk, eggs, bread, fruits',
        completed: false,
        userId: '2', // Replace with actual user ID
      },
      // Add more todos as needed
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
