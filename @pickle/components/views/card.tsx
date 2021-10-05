import { View } from '@prisma/client'
import { format, parseISO } from 'date-fns'
import React, { FunctionComponent, useState } from 'react'

import { Icon } from '../common/icon'
import { Modal } from '../common/modal'

type Props = {
  view: View
}

export const ViewCard: FunctionComponent<Props> = ({ view }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <tr>
        <td>{view.name}</td>
        <td>{view.userId}</td>
        <td>{format(parseISO(view.createdAt as unknown as string), 'PPpp')}</td>
        <td className="w-0 py-0">
          <button className="text-gray-600" onClick={() => setVisible(true)}>
            <Icon name="view" />
          </button>
        </td>
      </tr>

      <Modal
        className="p-4 text-sm"
        onClose={() => setVisible(false)}
        visible={visible}>
        <div className="font-medium text-gray-600">Name</div>
        <div className="p-3 mt-2 overflow-auto font-mono bg-gray-100 rounded-lg">
          {view.name}
        </div>

        <div className="mt-4 font-medium text-gray-600">User</div>
        <div className="p-3 mt-2 overflow-auto font-mono bg-gray-100 rounded-lg">
          {view.userId}
        </div>

        <div className="mt-4 font-medium text-gray-600">Data</div>
        <pre className="p-3 mt-2 overflow-auto font-mono bg-gray-100 rounded-lg">
          {JSON.stringify(view.data, null, 2)}
        </pre>

        <div className="mt-4 font-medium text-gray-600">Meta</div>
        <pre className="p-3 mt-2 overflow-auto font-mono bg-gray-100 rounded-lg">
          {JSON.stringify(view.meta, null, 2)}
        </pre>
      </Modal>
    </>
  )
}
