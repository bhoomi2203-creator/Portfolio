import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { CursorContext } from './CursorContext'
import useReducedMotion from '../../hooks/useReducedMotion'
import './CustomCursor.scss'

/**
 * Custom hand-drawn star cursor.
 *
 * Keeps the existing CursorContext API so other components can still
 * call setCursor() / resetCursor() without knowing how the cursor works.
 */
export default function CustomCursor({ children }) {
  const starRef = useRef(null)
  const labelRef = useRef(null)

  const [variant, setVariant] = useState('default')

  const reducedMotion = useReducedMotion()

  const isTouch = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none)').matches,
    []
  )

  const disabled = reducedMotion || isTouch

  useEffect(() => {
    if (disabled) return undefined

    document.body.classList.add('cursor-active')

    let mouseX = 0
    let mouseY = 0

    let starX = 0
    let starY = 0

    const handleMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const tick = () => {
      // Slight delay creates a soft hand-drawn/trailing feeling.
      starX += (mouseX - starX) * 0.18
      starY += (mouseY - starY) * 0.18

      if (starRef.current) {
        starRef.current.style.left = `${starX}px`
        starRef.current.style.top = `${starY}px`
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

    if (labelRef.current) {
      labelRef.current.textContent = label
    }
  }

  const resetCursor = () => {
    setCursor('default')
  }

  const contextValue = useMemo(
    () => ({
      setCursor,
      resetCursor,
    }),
    []
  )

  return (
    <CursorContext.Provider value={contextValue}>
      {!disabled && (
        <div
          ref={starRef}
          className={`cursor-star cursor-star--${variant}`}
          aria-hidden="true"
        >
          <svg
            className="cursor-star__svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="cursor-star__path"
              d="
                M 50 3
                C 53 23, 55 39, 62 45
                C 70 52, 84 48, 97 50
                C 80 54, 67 58, 61 66
                C 55 74, 55 88, 50 97
                C 46 82, 44 69, 37 62
                C 30 55, 16 54, 3 50
                C 20 46, 34 44, 40 37
                C 46 30, 47 15, 50 3
                Z
              "
            />
          </svg>

          <span
            ref={labelRef}
            className="cursor-star__label"
          />
        </div>
      )}

      {children}
    </CursorContext.Provider>
  )
}