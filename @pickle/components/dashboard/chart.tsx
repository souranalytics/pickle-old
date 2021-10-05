import { ResponsiveLine } from '@nivo/line'
import { format, parseISO } from 'date-fns'
import startCase from 'lodash/startCase'
import millify from 'millify'
import pluralize from 'pluralize'
import React, { FunctionComponent } from 'react'
import useSWR from 'swr'
import { twMerge } from 'tailwind-merge'

import { DashboardResponse } from '@pickle/types/api'
import { DashboardInterval, DashboardType } from '@pickle/types/dashboard'

import { Spinner } from '../common/spinner'

type Props = {
  className?: string
  interval: DashboardInterval
  slug: string
  type: DashboardType
}

export const Chart: FunctionComponent<Props> = ({
  className,
  interval,
  slug,
  type
}) => {
  const { data } = useSWR<DashboardResponse>(
    `/dashboard?slug=${slug}&type=${type}&interval=${interval}`
  )

  const color =
    type === 'event' ? '#0284c7' : type === 'screen' ? '#4f46e5' : '#9333ea'

  return (
    <div
      className={twMerge(
        'flex flex-col bg-white rounded-lg shadow',
        className
      )}>
      <div className="p-3 font-semibold border-b border-gray-100">
        {startCase(pluralize(type))}
      </div>
      <div className="flex flex-1">
        {data ? (
          <ResponsiveLine
            axisBottom={null}
            axisLeft={null}
            colors={color}
            crosshairType="x"
            data={data.data}
            enableGridX={false}
            enableGridY={false}
            enablePoints={false}
            enableSlices="x"
            isInteractive
            margin={{
              top: 10
            }}
            sliceTooltip={({ slice }) => (
              <div
                className="flex items-center p-2 text-white rounded"
                style={{
                  backgroundColor: color
                }}>
                <span className="text-xl font-semibold leading-none">
                  {millify(slice.points[0].data.y as number)}
                </span>
                <span className="ml-2 text-sm font-medium leading-none">
                  {format(parseISO(slice.points[0].data.x as string), 'MMM d')}
                </span>
              </div>
            )}
            theme={{
              axis: {
                ticks: {
                  line: {
                    stroke: '#e4e4e7'
                  }
                }
              },
              crosshair: {
                line: {
                  stroke: '#a1a1aa'
                }
              },
              fontFamily: 'Satoshi'
            }}
            useMesh
          />
        ) : (
          <Spinner className="self-center mx-auto" />
        )}
      </div>
    </div>
  )
}
