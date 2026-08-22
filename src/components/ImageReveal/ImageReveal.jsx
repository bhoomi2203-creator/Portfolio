import { useRef } from 'react'
import { revealImage } from '../../animations/scrollAnimations'
import { useGsapEffect } from '../../hooks/useGsapEffect'
import './ImageReveal.scss'

/**
 * Clip-path wipe reveal for images as they scroll into view. Wrap any
 * <img> (or background-image div) in this to get the effect for free.
 */
export default function ImageReveal({ src, alt = '', className = '', ratio = '4 / 3' }) {
  const imgRef = useRef(null)

  useGsapEffect(() => {
    const st = revealImage(imgRef.current)
    return () => st?.scrollTrigger?.kill()
  }, [])

  return (
    <div className={`image-reveal ${className}`} style={{ aspectRatio: ratio }}>
      <img ref={imgRef} src={src} alt={alt} loading="lazy" />
    </div>
  )
}
