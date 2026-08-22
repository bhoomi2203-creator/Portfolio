import './FloatingObject.scss'

/**
 * A single parallax-able decorative object (polaroid, sticky note, tag).
 * `depth` (0–1) controls how far it drifts under hero parallax — see
 * animations/heroAnimations.js bindHeroParallax, which reads data-depth.
 * Positioning is handled by the caller via className/style since placement
 * is layout-specific per section.
 */
export default function FloatingObject({ depth = 0.3, className = '', style, children }) {
  return (
    <div className={`floating-object ${className}`} style={style} data-depth={depth}>
      {children}
    </div>
  )
}
