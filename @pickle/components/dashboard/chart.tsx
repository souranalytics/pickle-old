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
    type === DashboardType.event
      ? '#059669' // emerald
      : type === DashboardType.view
      ? '#0369a1' // sky
      : '#6d28d9' // violet

  return (
    <div
      className={twMerge(
        'flex flex-col bg-white rounded-lg shadow h-60',
        className
      )}>
      <div className="flex items-center justify-between border-b border-gray-100">
        <div className="p-3 font-semibold">{startCase(pluralize(type))}</div>
        {data && (
          <div
            className="px-3 font-mono text-xl font-semibold"
            title={data.data.count.toLocaleString('en-US')}>
            {millify(data.data.count)}
          </div>
        )}
      </div>

      <div className="flex flex-1">
        {data ? (
          <ResponsiveLine
            axisBottom={null}
            axisLeft={null}
            colors={color}
            crosshairType="x"
            data={[data.data]}
            enableGridX={false}
            enableGridY={false}
            enableSlices="x"
            margin={{
              bottom: 10,
              left: 10,
              right: 10,
              top: 10
            }}
            sliceTooltip={({ slice }) => (
              <div
                className={twMerge(
                  'p-3 text-center text-white rounded-lg ring-2',
                  type === DashboardType.event
                    ? 'bg-emerald-600 ring-emerald-800'
                    : type === DashboardType.view
                    ? 'bg-sky-600 ring-sky-800'
                    : 'bg-violet-600 ring-violet-800'
                )}>
                <div className="font-mono text-xl font-semibold leading-none">
                  {millify(slice.points[0].data.y as number)}
                </div>
                <div className="mt-2 text-sm font-medium leading-none">
                  {format(parseISO(slice.points[0].data.x as string), 'MMM d')}
                </div>
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
              }
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
