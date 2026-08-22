import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { pageVariants } from '../../animations/pageTransitions'
import './PageTransition.scss'

/**
 * Wraps <Routes> output. Keyed by pathname so Framer Motion treats each
 * route as a distinct tree and runs exit/enter transitions between them.
 *
 * This is the seam where a future GSAP shared-element transition (thumbnail
 * -> project hero) can be swapped in without touching route components —
 * see animations/pageTransitions.js.
 */
export default function PageTransition({ children }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="page-transition"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
