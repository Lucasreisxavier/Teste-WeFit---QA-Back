import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.movie.create({
    data: {
      name: 'Viúva Negra',
      imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/viuva-negra.png',
      price: 9.99,
      quantity: 10,
    },
  });

  await prisma.movie.create({
    data: {
      name: 'Homem Aranha',
      imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/spider-man.png',
      price: 29.9,
      quantity: 10,
    },
  });

  await prisma.movie.create({
    data: {
      name: 'Shang-Chi',
      imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/shang-chi.png',
      price: 30.99,
      quantity: 10,
    },
  });

  await prisma.movie.create({
    data: {
      name: 'Morbius',
      imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/morbius-1.png',
      price: 9.99,
      quantity: 10,
    },
  });

  await prisma.movie.create({
    data: {
      name: 'O Batman',
      imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/the-batman.png',
      price: 30.99,
      quantity: 10,
    },
  });

  await prisma.movie.create({
    data: {
      name: 'Eternos',
      imageUrl: 'https://wefit-react-web-test.s3.amazonaws.com/eternals.png',
      price: 29.99,
      quantity: 10,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
