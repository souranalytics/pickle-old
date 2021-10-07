import type { icons } from '@pickle/components/common/icon'

export type IconName = keyof typeof icons

export type SideBarLinks = Array<
  Array<{
    href: string
    icon: IconName
    label: string
  }>
>

export type Heading = {
  anchor: string
  level: number
  title: string
}
