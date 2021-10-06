import { NextPage } from 'next'
import React from 'react'

import {
  ArrowIcon,
  ExpandIcon,
  Icon,
  icons,
  MenuIcon
} from '@pickle/components/common/icon'
import { IconName } from '@pickle/types/components'

export const Icons: NextPage = () => (
  <div className="m-8">
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
      {Object.keys(icons).map(name => (
        <div className="flex items-center" key={name}>
          <Icon name={name as IconName} size={32} />
          <span className="ml-4">{name}</span>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-8 mt-16 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
      <div className="flex items-center">
        <ExpandIcon size={32} />
        <span className="ml-4">closed</span>
      </div>

      <div className="flex items-center">
        <ExpandIcon open size={32} />
        <span className="ml-4">open</span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-8 mt-16 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
      <div className="flex items-center">
        <ArrowIcon direction="up" size={32} />
        <span className="ml-4">up</span>
      </div>

      <div className="flex items-center">
        <ArrowIcon direction="down" size={32} />
        <span className="ml-4">down</span>
      </div>

      <div className="flex items-center">
        <ArrowIcon direction="left" size={32} />
        <span className="ml-4">left</span>
      </div>

      <div className="flex items-center">
        <ArrowIcon direction="right" size={32} />
        <span className="ml-4">right</span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-8 mt-16 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
      <div className="flex items-center">
        <MenuIcon size={32} />
        <span className="ml-4">closed</span>
      </div>

      <div className="flex items-center">
        <MenuIcon open size={32} />
        <span className="ml-4">open</span>
      </div>
    </div>
  </div>
)

export default Icons
