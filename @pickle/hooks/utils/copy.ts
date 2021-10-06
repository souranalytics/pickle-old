import { useCallback, useRef, useState } from 'react'

export const useCopy = (
  delay = 3000
): [(data: string) => Promise<void>, boolean] => {
  const timer = useRef<NodeJS.Timeout>()

  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (data: string) => {
      if (timer.current) {
        clearTimeout(timer.current)
      }

      await navigator.clipboard.writeText(data)

      setCopied(true)

      timer.current = setTimeout(() => setCopied(false), delay)
    },
    [delay]
  )

  return [copy, copied]
}
