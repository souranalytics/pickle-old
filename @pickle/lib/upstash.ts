import Redis from 'ioredis'

class Upstash {
  client = new Redis(process.env.REDIS_URL)

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key)

    if (!value) {
      return null
    }

    return JSON.parse(value)
  }

  async put<T>(key: string, value: T): Promise<Upstash> {
    await this.client.set(key, JSON.stringify(value))

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
