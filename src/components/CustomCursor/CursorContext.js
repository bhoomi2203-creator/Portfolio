import { createContext } from 'react'

/**
 * @typedef {Object} CursorContextValue
 * @property {(variant: string, label?: string) => void} setCursor
 * @property {() => void} resetCursor
 */
export const CursorContext = createContext(null)
