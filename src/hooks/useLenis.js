import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import useReducedMotion from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Owns the single Lenis instance for the app, drives it from GSAP's ticker
 * (so Lenis and ScrollTrigger stay in sync), and skips smoothing entirely
 * when the user prefers reduced motion.
 *
 * Mount this once, near the root (see App.jsx).
 */
export default function useLenis() {
  const lenisRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  return lenisRef
}
