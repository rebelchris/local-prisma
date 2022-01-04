import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const allUsersAndHobbies = await prisma.user.findMany({
    include: {
      hobbies: true,
    },
  });
  console.dir(allUsersAndHobbies, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
