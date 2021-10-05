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

    <main className="flex flex-col items-center justify-center">
      <section className="text-center">
        <h1 className="text-6xl font-bold">Pricing</h1>
        <p className="mt-4 text-2xl font-medium">Simple and transparent </p>
      </section>

      <section className="grid grid-cols-2 gap-8 mt-8 lg:grid-cols-4 lg:mt-16">
        {plans.map(plan => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </section>

      <section className="flex justify-center mt-8 lg:mt-16">
        <Link href="/auth/sign-up">
          <a className="text-xl !rounded-full button">Get started for free</a>
        </Link>
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
