import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollVelocity from '../../hooks/useScrollVelocity'
import './Navbar.scss'

const LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#experiments', label: 'Experiments' },
  { href: '/#contact', label: 'Contact' },
]

/**
 * Floating nav: hides on scroll-down, reappears on scroll-up, gains a
 * paper backdrop once past the hero. Mobile collapses to a full-screen
 * menu overlay.
 */
export default function Navbar() {
  const { direction } = useScrollVelocity()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen)
  }, [menuOpen])

  const hidden = direction === 'down' && scrolled && !menuOpen

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''}`}>
        <Link to="/" className="navbar__logo">
           <em></em>
        </Link>

        <ul className="navbar__links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <ul>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
