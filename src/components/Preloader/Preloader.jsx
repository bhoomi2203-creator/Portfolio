import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import useReducedMotion from '../../hooks/useReducedMotion'
import './Preloader.scss'

export default function Preloader({ onComplete }) {
  const [visible, setVisible] = useState(true)

  const rootRef = useRef(null)
  const videoRef = useRef(null)

  const reducedMotion = useReducedMotion()

  const finishPreloader = () => {
    if (!rootRef.current) return

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false)
        onComplete?.()
      },
    })

    tl.to(rootRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: reducedMotion ? 0.2 : 1,
      ease: 'power4.inOut',
    })
  }

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    // Reduced motion: skip video
    if (reducedMotion) {
      finishPreloader()
      return
    }

    const handleEnded = () => {
      console.log('VIDEO FINISHED')
      finishPreloader()
    }

    const handleError = () => {
      console.error('Preloader video failed to load')
      finishPreloader()
    }

    video.addEventListener('ended', handleEnded)
    video.addEventListener('error', handleError)

    // Make sure video starts from beginning
    video.currentTime = 0

    video
      .play()
      .then(() => {
        console.log('VIDEO STARTED')
      })
      .catch((error) => {
        console.error('VIDEO PLAY ERROR:', error)
      })

    return () => {
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('error', handleError)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  if (!visible) return null

  return (
    <div
      ref={rootRef}
      className="preloader"
      role="status"
      aria-label="Loading portfolio"
    >
      <video
        ref={videoRef}
        className="preloader__video"
        src="/preloader.mp4"
        muted
        autoPlay
        playsInline
        preload="auto"
      />

      <div className="preloader__overlay">
        <span>Portfolio</span>
        <span>2026</span>
      </div>
    </div>
  )
}