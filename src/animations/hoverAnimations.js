import gsap from 'gsap'

/** Standard link/row hover: horizontal shift + color handled via CSS class toggle. */
export function hoverShift(el, { active, x = 12, duration = 0.4 } = {}) {
  if (!el) return
  gsap.to(el, { x: active ? x : 0, duration, ease: 'power3.out' })
}

/** Image scale-in on card hover, paired with a CSS transform-origin set by the caller. */
export function hoverImageScale(el, { active, scale = 1.08, duration = 0.6 } = {}) {
  if (!el) return
  gsap.to(el, { scale: active ? scale : 1, duration, ease: 'power3.out' })
}

/** Cursor-follow preview panel used by ProjectCard/SelectedWorks list rows. */
export function bindCursorFollow(el, previewEl) {
  if (!el || !previewEl) return () => {}

  const handleMove = (e) => {
    previewEl.style.left = `${e.clientX}px`
    previewEl.style.top = `${e.clientY}px`
  }

  el.addEventListener('mousemove', handleMove)
  return () => el.removeEventListener('mousemove', handleMove)
}
