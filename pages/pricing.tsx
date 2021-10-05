import { Plan } from '@prisma/client'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

import { Footer } from '@pickle/components/common/footer'
import { Header } from '@pickle/components/common/header'
import { PlanCard } from '@pickle/components/pricing/plan'
import { prisma } from '@pickle/lib/prisma'

type Props = {
  plans: Array<Plan>
}

const Pricing: NextPage<Props> = ({ plans }) => (
  <>
    <Head>
      <title>Pricing: Pickle</title>
    </Head>

    <Header />

    <main>
      <section className="text-center">
        <h1 className="text-6xl font-bold">Pricing</h1>
        <p className="mt-4 text-2xl font-medium">Simple, transparent pricing</p>
        <p className="mt-8 text-lg">
          Free to use during the{' '}
          <Link href="https://supabase.io/blog/2021/09/28/supabase-hacktoberfest-hackathon-2021">
            <a>Supabase hackathon</a>
          </Link>
          .
        </p>
      </section>

      <section className="flex flex-col mt-8 lg:justify-center lg:flex-row lg:mt-16">
        {plans.map(plan => (
          <PlanCard
            className="mt-8 lg:mt-0 lg:ml-16 first:mt-0 lg:first:ml-0"
            key={plan.id}
            plan={plan}
          />
        ))}
      </section>
    </main>

    <Footer />
  </>
)

export const getStaticProps: GetStaticProps<Props> = async () => {
  const plans = await prisma.plan.findMany({
    orderBy: {
      price: 'asc'
    },
    where: {
      visible: true
    }
  })

  return {
    props: {
      plans
    }
  }
}

export default Pricing
