import { format, parseISO } from 'date-fns'
import React, { FunctionComponent, useState } from 'react'

import { User } from '@pickle/types/prisma'

import { Icon } from '../common/icon'
import { Modal } from '../common/modal'

type Props = {
  user: User
}

export const UserCard: FunctionComponent<Props> = ({ user }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <tr>
        <td>{user.id}</td>
        <td>{format(parseISO(user.updatedAt as unknown as string), 'PPpp')}</td>
        <td>{format(parseISO(user.createdAt as unknown as string), 'PPpp')}</td>
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
        <div className="font-medium text-gray-600">ID</div>
        <div className="p-3 mt-2 overflow-auto font-mono bg-gray-100 rounded-lg">
          {user.id}
        </div>

        <div className="mt-4 font-medium text-gray-600">Created</div>
        <div className="mt-2 overflow-auto">
          {format(parseISO(user.createdAt as unknown as string), 'PPpp')}
        </div>

        <div className="mt-4 font-medium text-gray-600">Updated</div>
        <div className="mt-2 overflow-auto">
          {format(parseISO(user.updatedAt as unknown as string), 'PPpp')}
        </div>

        <div className="mt-4 font-medium text-gray-600">Data</div>
        <pre className="p-3 mt-2 overflow-auto font-mono bg-gray-100 rounded-lg">
          {JSON.stringify(user.data, null, 2)}
        </pre>

        <div className="mt-4 font-medium text-gray-600">Meta</div>
        <pre className="p-3 mt-2 overflow-auto font-mono bg-gray-100 rounded-lg">
          {JSON.stringify(user.meta, null, 2)}
        </pre>
      </Modal>
    </>
  )
}
