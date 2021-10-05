import { PlusCircleIcon } from '@heroicons/react/solid'
import React, { FunctionComponent, useState } from 'react'

import { Modal } from '../common/modal'

type Props = {
  className?: string
}

export const NewApp: FunctionComponent<Props> = ({ className }) => {
  const [visible, setVisible] = useState(false)

  const [name, setName] = useState('')
  const [planId, setPlanId] = useState()

  return (
    <>
      <button className={className} onClick={() => setVisible(true)}>
        <PlusCircleIcon className="w-6 h-6 text-emerald-600" />
      </button>

      <Modal onClose={() => setVisible(false)} visible={visible}></Modal>
    </>
  )
}
