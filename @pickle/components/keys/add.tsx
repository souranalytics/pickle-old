import React, { FunctionComponent, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useAddKey } from '@pickle/hooks/keys/add'

import { Button } from '../common/button'
import { Form } from '../common/form'
import { Input } from '../common/input'
import { Message } from '../common/message'
import { Modal } from '../common/modal'

type Props = {
  className?: string
  slug: string

  onAdd: () => void
}

export const KeyAdd: FunctionComponent<Props> = ({
  className,
  onAdd,
  slug
}) => {
  const [visible, setVisible] = useState(false)

  const { addKey, error, loading } = useAddKey(slug)

  const [name, setName] = useState('')

  return (
    <>
      <button
        className={twMerge(
          'bg-emerald-600 transition-colors hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-lg px-3 py-2 font-medium text-sm',
          className
        )}
        onClick={() => setVisible(true)}>
        Add
      </button>

      <Modal
        className="p-6"
        onClose={() => setVisible(false)}
        visible={visible}>
        <h2 className="text-2xl font-semibold">Add a key</h2>

        {error && (
          <Message className="mt-4" type="error">
            {error}
          </Message>
        )}

        <Form
          className="mt-8"
          onSubmit={async () => {
            await addKey(name)

            setName('')
            setVisible(false)

            onAdd()
          }}>
          <Input
            description="Like Staging or Production"
            label="Pick a name for this key"
            onChange={name => setName(name)}
            placeholder="Name"
            required
            type="text"
            value={name}
          />

          <Button className="mt-8" loading={loading}>
            Save
          </Button>
        </Form>
      </Modal>
    </>
  )
}
