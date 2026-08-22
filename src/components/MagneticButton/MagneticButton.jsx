import useMagnetic from '../../hooks/useMagnetic'
import './MagneticButton.scss'

/**
 * A button/link that eases toward the cursor while hovered. Renders an <a>
 * when `href` is given, otherwise a <button>. Pass `strength` (0–1) to
 * tune the pull; defaults suit nav-scale controls.
 */
export default function MagneticButton({
  href,
  children,
  strength = 0.4,
  className = '',
  ...rest
}) {
  const ref = useMagnetic({ strength })
  const Tag = href ? 'a' : 'button'

  return (
    <Tag ref={ref} href={href} className={`magnetic-btn ${className}`} {...rest}>
      <span className="magnetic-btn__inner">{children}</span>
    </Tag>
  )
}
