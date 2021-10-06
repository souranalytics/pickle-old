import { RefObject, useEffect } from 'react'

export const useClickOutside = (
  ref: RefObject<HTMLDivElement>,
  onClick: () => void
): void => {
  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onClick()
      }
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [onClick, ref])
}
