import { GetServerSideProps, NextPage } from 'next'

import { getUser } from '@pickle/lib/auth'
import { prisma } from '@pickle/lib/prisma'

const Dashboard: NextPage = () => null

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await getUser(req)

  if (!user) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: false
      }
    }
  }

  const apps = await prisma.app.findMany({
    orderBy: {
      createdAt: 'asc'
    },
    where: {
      collaborators: {
        some: {
          profile: {
            id: user.id
          }
        }
      }
    }
  })

  if (apps.length === 0) {
    return {
      redirect: {
        destination: '/dashboard/new',
        permanent: false
      }
    }
  }

  const app = apps.find(({ slug }) => slug === req.cookies.app)

  return {
    redirect: {
      destination: `/dashboard/${app?.slug ?? apps[0].slug}`,
      permanent: false
    }
  }
}

export default Dashboard
