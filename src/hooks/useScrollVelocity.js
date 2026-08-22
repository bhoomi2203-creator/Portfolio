import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref-backed velocity value (roughly px/frame, signed) derived from
 * window scroll position. Read velocityRef.current inside rAF/GSAP loops to
 * avoid re-render churn; the returned `direction` state is for simpler,
 * lower-frequency UI needs (e.g. nav show/hide).
 */
export default function useScrollVelocity() {
  const velocityRef = useRef(0)
  const lastY = useRef(typeof window !== 'undefined' ? window.scrollY : 0)
  const [direction, setDirection] = useState('down')

  useEffect(() => {
    let frame

    const measure = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      velocityRef.current = delta
      if (Math.abs(delta) > 2) {
        setDirection(delta > 0 ? 'down' : 'up')
      }
      lastY.current = y
      frame = requestAnimationFrame(measure)
    }

    frame = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(frame)
  }, [])

  return { velocityRef, direction }
}
