import type { icons } from '@pickle/components/common/icon'

export type IconName = keyof typeof icons

export type SideBarLinks = Array<
  Array<{
    href: string
    icon: IconName
    label: string
  }>
>

export type Asset = {
  url: string
  height: number
  width: number
}
