import type { Serie } from '@nivo/line'
import {
  App,
  Collaborator,
  Event,
  Plan,
  Prisma,
  Profile,
  Screen,
  User
} from '@prisma/client'

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

export type CollaboratorsResponse = {
  collaborators: Array<
    Collaborator & {
      profile: Profile
    }
  >
}

export type CollaboratorResponse = {
  collaborator: Collaborator & {
    profile: Profile
  }
}

export type KeysResponse = {
  keys: Array<Prisma.Key>
}

export type KeyResponse = {
  key: Prisma.Key
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
