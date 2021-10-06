import React, { FunctionComponent, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useAddCollaborator } from '@pickle/hooks/collaborators/add'

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

export const CollaboratorAdd: FunctionComponent<Props> = ({
  className,
  onAdd,
  slug
}) => {
  const [visible, setVisible] = useState(false)

  const { addCollaborator, error, loading } = useAddCollaborator(slug)

  const [email, setEmail] = useState('')

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
        <h2 className="text-2xl font-semibold">Add a collaborator</h2>

        {error && (
          <Message className="mt-4" type="error">
            {error}
          </Message>
        )}

        <Form
          className="mt-8"
          onSubmit={async () => {
            const done = await addCollaborator(email)

            if (!done) {
              return
            }

            setEmail('')
            setVisible(false)

            onAdd()
          }}>
          <Input
            label="What's their email?"
            onChange={email => setEmail(email)}
            placeholder="Email"
            required
            type="email"
            value={email}
          />

          <Button className="mt-8" loading={loading}>
            Save
          </Button>
        </Form>
      </Modal>
    </>
  )
}
