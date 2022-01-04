import { PrismaClient, Prisma } from '@prisma/client'
// import faker from 'faker'

const prisma = new PrismaClient()

const productData: Prisma.ProductCreateInput[] = [
  {
    name: 'Product l',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae a quis nostrum dolorem error eligendi corrupti eveniet praesentium. Itaque, sint?',
    descriptionShort:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, obcaecati?',
    price: 1200,
  },
  {
    name: 'Product ll',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae a quis nostrum dolorem error eligendi corrupti eveniet praesentium. Itaque, sint?',
    descriptionShort:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, obcaecati?',
    price: 4000.5,
  },
  {
    name: 'Product lll',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae a quis nostrum dolorem error eligendi corrupti eveniet praesentium. Itaque, sint?',
    descriptionShort:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, obcaecati?',
    price: 6000,
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of productData) {
    const product = await prisma.product.create({
      data: u,
    })
    console.log(`Created user with id: ${product.id}`)
  }
  // const product = await prisma.product.createMany({
  //   data: [
  //     {
  //       name: <string>: faker.product.productName,
  //     },
  //   ],
  // })
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
