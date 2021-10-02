import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
  useState
} from 'react'
import { twMerge } from 'tailwind-merge'

import { useForwardedRef } from '@pickle/hooks/utils/ref'
import { validateInput } from '@pickle/lib/validators'

type Props = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'accept'
  | 'className'
  | 'maxLength'
  | 'minLength'
  | 'multiple'
  | 'placeholder'
  | 'required'
  | 'type'
  | 'value'
> & {
  description?: ReactNode
  label?: string

  onChange?: (value: string) => void
}

const InputV: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { className, description, label, onChange, placeholder, ...props },
  outerRef
) => {
  const ref = useForwardedRef(outerRef)

  const [touched, setTouched] = useState(false)

  return (
    <label className={twMerge('block', className)}>
      <div className="font-medium text-gray-600">{label ?? placeholder}</div>
      <input
        {...props}
        className={twMerge(
          'p-3 mt-2 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-2 w-full',
          touched && ref.current?.validationMessage
            ? 'ring-rose-600'
            : 'ring-primary-600'
        )}
        onChange={event => {
          setTouched(true)
          validateInput(ref.current)

          onChange?.(event.target.value)
        }}
        placeholder={placeholder}
        ref={ref}
      />

      {description && (
        <div className="mt-2 text-sm text-gray-600">{description}</div>
      )}

      {touched && ref.current?.validationMessage && (
        <div className="mt-2 text-sm font-medium text-rose-600">
          {ref.current.validationMessage}
        </div>
      )}
    </label>
  )
}

export const Input = forwardRef(InputV)
