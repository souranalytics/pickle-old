import { NextPage } from 'next'
import React from 'react'

import { Icon, icons } from '@pickle/components/common/icon'
import { IconName } from '@pickle/types/components'

export const Icons: NextPage = () => (
  <div className="grid grid-cols-2 gap-8 m-8 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
    {Object.keys(icons).map(name => (
      <div className="flex items-center" key={name}>
        <Icon name={name as IconName} size={32} />
        <span className="ml-4">{name}</span>
      </div>
    ))}
  </div>
)

export default Icons
