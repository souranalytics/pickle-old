import { formatISO } from 'date-fns'
import Redis from 'ioredis'

import { DashboardType } from '@pickle/types/dashboard'

class Upstash {
  client = new Redis(process.env.REDIS_URL)

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key)

    if (value === null) {
      return null
    }

    return JSON.parse(value)
  }

  async getMultiple<T>(keys: Array<string>): Promise<Array<T>> {
    const values = await this.client.mget(keys)

    return values.map(value => {
      if (value === null) {
        return null
      }

      return JSON.parse(value)
    })
  }

  async put<T>(key: string, value: T): Promise<Upstash> {
    await this.client.set(key, JSON.stringify(value))

    return this
  }

  async increment(
    appId: number,
    type: DashboardType,
    date = new Date()
  ): Promise<Upstash> {
    const key = `${appId}-${type}-${formatISO(date, {
      representation: 'date'
    })}`

    const exists = await this.get<number>(key)

    if (exists === null) {
      await this.put(key, 0)
    }

    await this.client.incr(key)

    return this
  }

  async putWithExpiry<T>(
    key: string,
    value: T,
    expiry: number
  ): Promise<Upstash> {
    await this.client.set(key, JSON.stringify(value), 'ex', expiry)

    return this
  }

  async remove(key: string): Promise<Upstash> {
    await this.client.del(key)

    return this
  }
}

export const upstash = new Upstash()
