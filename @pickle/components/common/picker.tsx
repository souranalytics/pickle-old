import React, { FunctionComponent, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Icon } from './icon'

type Props = {
  className?: string
  data: Array<{ label: string; value: string }>
  direction?: 'left' | 'right'
  placeholder?: string
  value?: string

  onChange: (value: string) => void
}

export const Picker: FunctionComponent<Props> = ({
  className,
  data,
  direction = 'left',
  onChange,
  placeholder,
  value
}) => {
  const [visible, setVisible] = useState(false)

  const item = data.find(data => data.value === value)

  return (
    <div className={twMerge('relative', className)}>
      <button
        className={twMerge(
          'flex items-center justify-between font-medium text-white px-3 py-2 w-full',
          visible ? 'bg-primary-500 rounded-t-lg' : 'bg-primary-600 rounded-lg'
        )}
        onClick={() => setVisible(!visible)}>
        <span className="flex-1 text-left overflow-ellipsis">
          {item?.label ?? placeholder}
        </span>

        <Icon
          className={twMerge(
            'ml-2 transition-transform',
            visible && 'rotate-180'
          )}
          name="expand"
        />
      </button>

      <div
        className={twMerge(
          'absolute min-w-full bg-primary-500 rounded-b-lg overflow-hidden flex flex-col transition-all origin-top z-10',
          visible
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'pointer-events-none opacity-0 -translate-y-8',
          direction === 'left' ? 'left-0' : 'right-0'
        )}>
        {data.map(({ label, value }) => (
          <button
            className="px-3 py-2 text-left text-white whitespace-pre hover:bg-primary-600"
            key={value}
            onClick={() => {
              onChange(value)

              setVisible(false)
            }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
