import highlighter from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'

highlighter.registerLanguage('typescript', typescript)

export const highlight = (selector = 'code'): void =>
  document
    .querySelectorAll<HTMLElement>(selector)
    .forEach(element => highlighter.highlightElement(element))
