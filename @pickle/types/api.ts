import type { Serie } from '@nivo/line'
import { App, Event, Plan, Profile, Screen, User } from '@prisma/client'

export type ApiError = {
  code: number
  message: string
}

export type ProfileResponse = {
  profile: Profile | null
}

export type PlansResponse = {
  plans: Array<Plan>
}

export type DashboardResponse = {
  data: Array<Serie>
}

export type AppsResponse = {
  apps: Array<App>
}

export type AppResponse = {
  app: App
}

export type EventResponse = {
  event: Event
}

export type ScreenResponse = {
  screen: Screen
}

export type UserResponse = {
  user: User
}
