import { PrismaClient } from '@prisma/client'
import chance from 'chance'
import { subDays } from 'date-fns'
import { range, sample } from 'lodash'

const prisma = new PrismaClient()

const main = async () => {
  const getDate = (start: Date, end: Date) =>
    new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )

  await prisma.plan.createMany({
    data: [
      {
        events: 10_000,
        id: 'free',
        name: 'Free',
        price: 0,
        screens: 5_000,
        visible: true
      },
      {
        events: 100_000,
        id: 'nano',
        name: 'Nano',
        price: 10,
        screens: 50_000,
        visible: true
      },
      {
        events: 500_000,
        id: 'micro',
        name: 'Micro',
        price: 30,
        screens: 250_000,
        visible: true
      },
      {
        events: 1_000_000,
        id: 'small',
        name: 'Small',
        price: 50,
        screens: 500_000,
        visible: true
      }
    ]
  })

  const user = await prisma.profile.create({
    data: {
      email: process.env.SEED_USER_EMAIL as string,
      id: process.env.SEED_USER_ID as string,
      name: process.env.SEED_USER_NAME as string
    }
  })

  const app = await prisma.app.create({
    data: {
      collaborators: {
        create: {
          profile: {
            connect: {
              id: user.id
            }
          },
          role: 'owner'
        }
      },
      keys: {
        create: {}
      },
      name: 'Test',
      plan: {
        connect: {
          id: 'small'
        }
      },
      slug: 'test'
    }
  })

  await prisma.event.createMany({
    data: range(10000).map(() => ({
      appId: app.id,
      createdAt: getDate(subDays(new Date(), 30), new Date()),
      data: {},
      name: sample(['sign_in', 'sign_out', 'sign_up']) as string
    }))
  })

  await prisma.screen.createMany({
    data: range(5000).map(() => ({
      appId: app.id,
      createdAt: getDate(subDays(new Date(), 30), new Date()),
      data: {},
      name: sample(['sign_in', 'sign_up', 'profile']) as string
    }))
  })

  await prisma.user.createMany({
    data: range(2000).map(() => ({
      appId: app.id,
      createdAt: getDate(subDays(new Date(), 30), new Date()),
      data: {},
      id: chance().guid()
    }))
  })
}

main()
  .catch(error => {
    console.error(error)

    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
