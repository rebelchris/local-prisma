import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = fastify();

interface IByIdParam {
  id: number;
}
interface IUserBodyParam {
  name: string;
  hobbies: string;
}

app.get('/users', async (request, reply) => {
  const allUsersAndHobbies = await prisma.user.findMany({
    include: {
      hobbies: true,
    },
  });
  reply.send(allUsersAndHobbies);
});

app.get<{ Params: IByIdParam }>('/user/:id', async (request, reply) => {
  const { id } = request.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      hobbies: true,
    },
  });
  reply.send(user);
});

app.get('/hobbies', async (request, reply) => {
  const allHobbies = await prisma.hobby.findMany();
  reply.send(allHobbies);
});

app.get<{ Params: IByIdParam }>('/hobby/:id', async (request, reply) => {
  const { id } = request.params;
  const hobbby = await prisma.hobby.findUnique({
    where: { id: Number(id) },
  });
  reply.send(hobbby);
});

app.post<{ Body: IUserBodyParam }>('/user', async (request, reply) => {
  const { name, hobbies } = request.body;
  const user = await prisma.user.create({
    data: {
      name,
      hobbies: {
        create: hobbies.split(';').map((hobby) => ({
          name: hobby,
        })),
      },
    },
  });
  reply.send(user);
});

app.put<{ Body: IUserBodyParam; Params: IByIdParam }>(
  '/user/:id',
  async (request, reply) => {
    const { id } = request.params;
    const { name } = request.body;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
      },
    });
    reply.send(user);
  }
);

app.delete<{ Params: IByIdParam }>('/hobby/:id', async (request, reply) => {
  const { id } = request.params;
  await prisma.hobby.delete({
    where: { id: Number(id) },
  });
  reply.send('hobby removed');
});

app.listen(3000);
