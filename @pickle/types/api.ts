import type { Serie } from '@nivo/line'
import {
  App,
  Collaborator,
  Event,
  Key,
  Plan,
  Profile,
  User,
  View
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
  keys: Array<Key>
}

export type KeyResponse = {
  key: Key
}

export type EventsResponse = {
  events: Array<Event>
  next?: number
}

export type EventResponse = {
  event: Event
}

export type ViewsResponse = {
  next?: number
  views: Array<View>
}

export type ViewResponse = {
  view: View
}

export type UsersResponse = {
  next?: string
  users: Array<User>
}

export type UserResponse = {
  user: User
}
