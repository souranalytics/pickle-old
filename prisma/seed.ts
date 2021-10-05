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
        collaborators: 1,
        events: 10_000,
        id: 'free',
        name: 'Free',
        price: 0,
        views: 5_000,
        visible: true
      },
      {
        collaborators: 3,
        events: 100_000,
        id: 'nano',
        name: 'Nano',
        price: 10,
        views: 50_000,
        visible: true
      },
      {
        collaborators: 5,
        events: 500_000,
        id: 'micro',
        name: 'Micro',
        price: 30,
        views: 250_000,
        visible: true
      },
      {
        collaborators: 10,
        events: 1_000_000,
        id: 'small',
        name: 'Small',
        price: 50,
        views: 500_000,
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
        create: {
          name: 'Test'
        }
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

  const userIds = range(2000).map(() => chance().guid())

  await prisma.user.createMany({
    data: userIds.map(id => ({
      anonymousId: id,
      appId: app.id,
      createdAt: getDate(subDays(new Date(), 30), new Date()),
      data: {},
      id: id,
      meta: {}
    }))
  })

  await prisma.event.createMany({
    data: range(10000).map(() => {
      const id = sample(userIds) as string

      return {
        appId: app.id,
        createdAt: getDate(subDays(new Date(), 30), new Date()),
        data: {},
        meta: {},
        name: sample(['sign_in', 'sign_up', 'sign_out']) as string,
        userId: id
      }
    })
  })

  await prisma.view.createMany({
    data: range(5000).map(() => {
      const id = sample(userIds) as string

      return {
        appId: app.id,
        createdAt: getDate(subDays(new Date(), 30), new Date()),
        data: {},
        meta: {},
        name: sample(['Sign in', 'Sign up', 'Home', 'Profile']) as string,
        userId: id
      }
    })
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
