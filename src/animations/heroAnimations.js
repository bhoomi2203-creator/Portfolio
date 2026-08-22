import gsap from 'gsap'

/**
 * Plays the hero's entrance timeline. Call once, after the preloader exits.
 * `refs` is an object of DOM nodes gathered by the Hero section.
 */
export function playHeroIntro(refs, { reducedMotion = false } = {}) {
  const { lines = [], eyebrow, sub, floatObjects = [] } = refs

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

  if (reducedMotion) {
    tl.set([eyebrow, sub, ...lines, ...floatObjects], { opacity: 1, y: 0, yPercent: 0 })
    return tl
  }

  tl.to(lines, { yPercent: 0, duration: 0.9, stagger: 0.08 })
    .fromTo(eyebrow, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
    .fromTo(sub, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.45)
    .fromTo(
      floatObjects,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
      0.55
    )

  return tl
}

/**
 * Subtle multi-layer parallax for floating hero objects, driven by pointer
 * position. Returns a cleanup function.
 */
export function bindHeroParallax(container, floatObjects, { reducedMotion = false } = {}) {
  if (reducedMotion || !container || floatObjects.length === 0) return () => {}
  if (window.matchMedia('(hover: none)').matches) return () => {}

  const handleMove = (e) => {
    const { innerWidth, innerHeight } = window
    const dx = (e.clientX - innerWidth / 2) / (innerWidth / 2)
    const dy = (e.clientY - innerHeight / 2) / (innerHeight / 2)

    floatObjects.forEach((el) => {
      const depth = parseFloat(el.dataset.depth || '0.3')
      gsap.to(el, { x: dx * 30 * depth, y: dy * 20 * depth, duration: 0.8, ease: 'power2.out' })
    })
  }

  window.addEventListener('mousemove', handleMove)
  return () => window.removeEventListener('mousemove', handleMove)
}
