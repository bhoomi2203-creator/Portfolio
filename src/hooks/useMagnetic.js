import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import useReducedMotion from './useReducedMotion'

/**
 * Attaches a magnetic-follow effect to the returned ref: the element eases
 * toward the cursor within `strength`, and snaps back on mouse leave.
 * No-ops on touch devices and when reduced motion is preferred.
 */
export default function useMagnetic({ strength = 0.4 } = {}) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion) return undefined
    if (window.matchMedia('(hover: none)').matches) return undefined

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      gsap.to(el, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.6,
        ease: 'power3.out',
      })
    }

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [strength, reducedMotion])

  return ref
}
