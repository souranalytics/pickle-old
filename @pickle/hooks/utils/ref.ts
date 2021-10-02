import { ForwardedRef, RefObject, useEffect, useRef } from 'react'

export const useForwardedRef = <T>(ref: ForwardedRef<T>): RefObject<T> => {
  const innerRef = useRef<T>(null)

  useEffect(() => {
    if (typeof ref === 'function') {
      ref(innerRef.current)
    } else if (ref) {
      ref.current = innerRef.current
    }
  }, [ref])

  return innerRef
}
