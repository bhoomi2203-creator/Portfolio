import { useEffect } from 'react'

/**
 * Thin semantic wrapper around useEffect for GSAP setup that should run
 * once on mount and clean up (kill tweens/ScrollTriggers) on unmount.
 * Exists mainly so component code reads as "this effect is GSAP wiring"
 * at a glance.
 */
export function useGsapEffect(effect, deps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, deps)
}
