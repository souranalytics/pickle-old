import { Event, PrismaClient, User, View } from '@prisma/client'
import chance from 'chance'
import { formatISO, subDays } from 'date-fns'
import { countBy, range, sample } from 'lodash'

import { upstash } from '../@pickle/lib/upstash'
import { DashboardType } from '../@pickle/types/dashboard'

const prisma = new PrismaClient()

const getDate = (start = subDays(new Date(), 30), end = new Date()) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

const getCount = (data: Array<User | Event | View>) =>
  Object.entries(
    countBy(data, item =>
      formatISO(item.createdAt, {
        representation: 'date'
      })
    )
  ).map(([date, count]) => ({
    count,
    date
  }))

const main = async () => {
  await prisma.event.deleteMany()
  await prisma.view.deleteMany()
  await prisma.user.deleteMany()
  await prisma.collaborator.deleteMany()
  await prisma.key.deleteMany()
  await prisma.app.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.plan.deleteMany()

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
      createdAt: getDate(),
      data: {
        city: chance().city(),
        country: chance().country(),
        latitude: chance().latitude(),
        longitude: chance().longitude(),
        state: chance().state()
      },
      id: id,
      meta: {}
    }))
  })

  const users = getCount(await prisma.user.findMany())

  await Promise.all(
    users.map(({ count, date }) =>
      upstash.put(`${app.id}-${DashboardType.user}-${date}`, count)
    )
  )

  await prisma.event.createMany({
    data: range(10000).map(() => {
      const id = sample(userIds) as string

      return {
        appId: app.id,
        createdAt: getDate(),
        data: {},
        meta: {},
        name: sample(['sign_in', 'sign_up', 'sign_out']) as string,
        userId: id
      }
    })
  })

  const events = getCount(await prisma.event.findMany())

  await Promise.all(
    events.map(({ count, date }) =>
      upstash.put(`${app.id}-${DashboardType.event}-${date}`, count)
    )
  )

  await prisma.view.createMany({
    data: range(5000).map(() => {
      const id = sample(userIds) as string

      return {
        appId: app.id,
        createdAt: getDate(),
        data: {},
        meta: {},
        name: sample(['Sign in', 'Sign up', 'Home', 'Profile']) as string,
        userId: id
      }
    })
  })

  const views = getCount(await prisma.view.findMany())

  await Promise.all(
    views.map(({ count, date }) =>
      upstash.put(`${app.id}-${DashboardType.view}-${date}`, count)
    )
  )

  await prisma.$disconnect()

  process.exit(0)
}

main().catch(async error => {
  console.error(error)

  await prisma.$disconnect()

  process.exit(1)
})
