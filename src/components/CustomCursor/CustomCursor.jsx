import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { CursorContext } from './CursorContext'
import useReducedMotion from '../../hooks/useReducedMotion'
import './CustomCursor.scss'

/**
 * Renders the custom cursor (dot + trailing ring) and provides the
 * CursorContext so any component can call useCursor() to request a
 * variant/label without knowing about the DOM implementation.
 *
 * Automatically disables itself on touch devices and honors reduced motion
 * by rendering nothing at all (native cursor stays visible in both cases).
 */
export default function CustomCursor({ children }) {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const [variant, setVariant] = useState('default')
  const reducedMotion = useReducedMotion()

  const isTouch = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches,
    []
  )

  const disabled = reducedMotion || isTouch

  useEffect(() => {
    if (disabled) return undefined

    document.body.classList.add('cursor-active')

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const handleMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`
        dotRef.current.style.top = `${mouseY}px`
      }
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top = `${ringY}px`
      }
    }

    window.addEventListener('mousemove', handleMove)
    gsap.ticker.add(tick)

    return () => {
      document.body.classList.remove('cursor-active')
      window.removeEventListener('mousemove', handleMove)
      gsap.ticker.remove(tick)
    }
  }, [disabled])

  const setCursor = (nextVariant, label = '') => {
    setVariant(nextVariant)
    if (labelRef.current) labelRef.current.textContent = label
  }

  const resetCursor = () => setCursor('default')

  const contextValue = useMemo(() => ({ setCursor, resetCursor }), [])

  return (
    <CursorContext.Provider value={contextValue}>
      {!disabled && (
        <>
          <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
          <div ref={ringRef} className={`cursor-ring cursor-ring--${variant}`} aria-hidden="true">
            <span ref={labelRef} className="cursor-ring__label" />
          </div>
        </>
      )}
      {children}
    </CursorContext.Provider>
  )
}
