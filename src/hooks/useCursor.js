import { useContext } from 'react'
import { CursorContext } from '../components/CustomCursor/CursorContext'

/**
 * Lets any component set the cursor's variant/label, e.g.:
 *   const { setCursor, resetCursor } = useCursor()
 *   <div onMouseEnter={() => setCursor('view', 'View project')} onMouseLeave={resetCursor}>
 */
export default function useCursor() {
  const ctx = useContext(CursorContext)
  if (!ctx) {
    // Safe no-op fallback so components work even outside the provider (e.g. in tests).
    return { setCursor: () => {}, resetCursor: () => {} }
  }
  return ctx
}
