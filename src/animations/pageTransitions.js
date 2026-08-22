/**
 * Shared timing/easing tokens for route transitions, consumed by
 * components/PageTransition via Framer Motion's AnimatePresence.
 *
 * Kept framework-agnostic (plain variant objects) so the same curves can
 * later drive a GSAP-based shared-element transition for project pages
 * without rewriting this file.
 */

export const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] },
  },
}

/** Used for the full-screen wipe layer that covers content mid-transition. */
export const wipeVariants = {
  initial: { scaleY: 0 },
  animate: {
    scaleY: 0,
    transition: { duration: 0.01 },
  },
  covered: {
    scaleY: 1,
    transition: { duration: 0.5, ease: [0.85, 0, 0.15, 1] },
  },
}
