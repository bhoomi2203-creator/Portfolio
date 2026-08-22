import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Generic "reveal on scroll" used across sections: fade + rise, staggered.
 * Pass an array of elements (or a single element) and optional overrides.
 */
export function revealOnScroll(targets, { y = 24, stagger = 0.06, start = 'top 85%', trigger } = {}) {
  if (!targets || (Array.isArray(targets) && targets.length === 0)) return null

  return gsap.from(targets, {
    opacity: 0,
    y,
    duration: 0.8,
    ease: 'power3.out',
    stagger,
    scrollTrigger: {
      trigger: trigger || (Array.isArray(targets) ? targets[0] : targets),
      start,
    },
  })
}

/** Clip-path wipe reveal, used for images (About portrait, project heroes). */
export function revealImage(target, { start = 'top 80%' } = {}) {
  if (!target) return null

  return gsap.from(target, {
    clipPath: 'inset(0 0 100% 0)',
    duration: 1,
    ease: 'power4.inOut',
    scrollTrigger: { trigger: target, start },
  })
}

/** Registers a global scroll-progress driven CSS variable (--scroll-progress, 0–1). */
export function bindScrollProgress() {
  return ScrollTrigger.create({
    start: 0,
    end: () => document.documentElement.scrollHeight - window.innerHeight,
    onUpdate: (self) => {
      document.documentElement.style.setProperty('--scroll-progress', self.progress.toFixed(4))
    },
  })
}

export { ScrollTrigger }
