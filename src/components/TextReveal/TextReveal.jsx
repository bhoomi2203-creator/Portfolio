import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import useReducedMotion from '../../hooks/useReducedMotion'
import './TextReveal.scss'

gsap.registerPlugin(ScrollTrigger)

/**
 * Splits `children` (a plain string) into lines and reveals them with a
 * clipped upward slide, either immediately (`trigger="load"`) or on scroll
 * into view (`trigger="scroll"`, the default).
 *
 * Kept intentionally simple (line-level, not per-character) — swap in a
 * proper SplitText-style utility later if per-character reveals are needed.
 */
export default function TextReveal({
  as: Tag = 'div',
  children,
  trigger = 'scroll',
  delay = 0,
  className = '',
}) {
  const rootRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const lines = String(children).split('\n')

  useEffect(() => {
    const inners = rootRef.current?.querySelectorAll('.text-reveal__inner')
    if (!inners || inners.length === 0) return undefined

    if (reducedMotion) {
      gsap.set(inners, { yPercent: 0 })
      return undefined
    }

    const animProps = {
      yPercent: 0,
      duration: 0.9,
      stagger: 0.07,
      ease: 'power4.out',
      delay,
    }

    let st
    if (trigger === 'scroll') {
      st = gsap.to(inners, {
        ...animProps,
        scrollTrigger: { trigger: rootRef.current, start: 'top 88%' },
      })
    } else {
      st = gsap.to(inners, animProps)
    }

    return () => st?.scrollTrigger?.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tag ref={rootRef} className={`text-reveal ${className}`}>
      {lines.map((line, i) => (
        <span className="text-reveal__line" key={`${line}-${i}`}>
          <span className="text-reveal__inner">{line}</span>
        </span>
      ))}
    </Tag>
  )
}
