import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './SelectedWorks.scss'


// Swap in your real projects/links. `index` is shown on the folder tab —
// keep it as an actual position marker (these ARE your top projects in
// order), not decoration.
const PROJECTS = [
  {
    id: 'northline-studio',
    index: '01',
    title: 'Northline Studio',
    category: 'BRANDING',
    year: '2026',
    description:
      'A full identity system for a boutique architecture practice — wordmark, signage, and a print-first collateral suite built to hold up on a business card and a building façade alike.',
    tags: ['Branding', 'Art Direction', 'Print'],
    link: 'https://your-case-study-link.com/northline-studio',
  },
  {
    id: 'weave-collective',
    index: '02',
    title: 'Weave Collective',
    category: 'WEB DESIGN',
    year: '2025',
    description:
      'A commerce site for a textiles studio, built around a slow-scroll product story and a fabric configurator people actually use before they buy.',
    tags: ['Web Design', 'Development', 'E-commerce'],
    link: 'https://your-case-study-link.com/weave-collective',
  },
  {
    id: 'lumen-atlas',
    index: '03',
    title: 'Lumen Atlas',
    category: 'PRODUCT DESIGN',
    year: '2025',
    description:
      'An internal tool redesign for a lighting manufacturer — a decade of legacy workflows simplified into one dashboard their ops team opens every morning.',
    tags: ['Product Design', 'UX Research'],
    link: 'https://your-case-study-link.com/lumen-atlas',
  },
]

export default function SelectedWorks() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const overlayRef = useRef(null)
  const detailRef = useRef(null)

  // `activeIndex` drives which project is "open" logically.
  // `renderedIndex` keeps the detail card mounted a moment longer so the
  // close animation can play before it unmounts.
  const [activeIndex, setActiveIndex] = useState(null)
  const [renderedIndex, setRenderedIndex] = useState(null)
  const originRect = useRef(null)

  // =========================================
  // FOLDERS ARRIVE — once, when the section scrolls into view
  // =========================================

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)
    if (!cards.length) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      gsap.set(cards, { y: 0, opacity: 1, scale: 1, rotate: 0 })
      return
    }

    gsap.set(cards, {
      y: 140,
      opacity: 0,
      scale: 0.9,
      rotate: (i) => (i % 2 === 0 ? -4 : 4),
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          gsap.to(cards, {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.1,
            ease: 'back.out(1.5)',
            stagger: 0.16,
          })

          observer.disconnect()
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  // =========================================
  // OPEN A FOLDER
  // =========================================

  const openProject = (index) => {
    const card = cardRefs.current[index]
    if (!card) return

    originRect.current = card.getBoundingClientRect()
    setRenderedIndex(index)
    setActiveIndex(index)
  }

  const closeProject = () => {
    setActiveIndex(null)
    // renderedIndex clears itself once the close tween finishes, below
  }

  // =========================================
  // DETAIL CARD MORPHS FROM / BACK INTO THE FOLDER
  // =========================================

  useLayoutEffect(() => {
    const detail = detailRef.current
    const overlay = overlayRef.current
    const rect = originRect.current

    if (renderedIndex === null || !detail || !overlay || !rect) return

    const isOpening = activeIndex === renderedIndex

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // Skip the rect-morph entirely — just fade the centered card in/out.
      gsap.set(detail, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        width: 'min(620px, 88vw)',
        height: 'min(70vh, 560px)',
        borderRadius: 26,
      })

      if (isOpening) {
        gsap.set(overlay, { pointerEvents: 'auto' })
        gsap.fromTo(
          [overlay, detail],
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power1.out' }
        )
      } else {
        gsap.to([overlay, detail], {
          opacity: 0,
          duration: 0.2,
          ease: 'power1.in',
          onComplete: () => {
            overlay.style.pointerEvents = 'none'
            setRenderedIndex(null)
          },
        })
      }

      return
    }

    if (isOpening) {
      gsap.set(detail, {
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        xPercent: 0,
        yPercent: 0,
        borderRadius: 20,
      })

      gsap.set(overlay, { opacity: 0, pointerEvents: 'auto' })

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
      })

      gsap.to(detail, {
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        width: 'min(620px, 88vw)',
        height: 'min(70vh, 560px)',
        borderRadius: 26,
        duration: 0.7,
        ease: 'power3.inOut',
      })
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          overlay.style.pointerEvents = 'none'
        },
      })

      gsap.to(detail, {
        top: rect.top,
        left: rect.left,
        xPercent: 0,
        yPercent: 0,
        width: rect.width,
        height: rect.height,
        borderRadius: 20,
        duration: 0.55,
        ease: 'power3.inOut',
        onComplete: () => setRenderedIndex(null),
      })
    }
  }, [activeIndex, renderedIndex])

  // Escape key closes the open project
  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeProject()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex])

  const activeProject = renderedIndex !== null ? PROJECTS[renderedIndex] : null
  const totalSlots = PROJECTS.length + 1 // + the trailing "more" folder

  return (
    <section className="work" ref={sectionRef}>
      <div className="work__head">
        <span className="work__heading">SELECTED WORK</span>
        <span className="work__count">
          ( {String(totalSlots).padStart(2, '0')} )
        </span>
      </div>

      <div className="work__divider" />

      <div className="work__folders">
        {PROJECTS.map((project, i) => (
          <button
            key={project.id}
            type="button"
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="work__folder"
            onClick={() => openProject(i)}
            aria-haspopup="dialog"
          >
            <span className="work__folder-tab" />

            <div className="work__folder-top">
              <span className="work__folder-index">{project.index}</span>
              <span className="work__folder-year">{project.year}</span>
            </div>

            <span className="work__folder-title">{project.title}</span>

            <span className="work__folder-category">{project.category}</span>
          </button>
        ))}

        {/* Arrives with the same stagger — deliberately the last one down */}
        <a
          href="/work"
          className="work__folder work__folder--more"
          ref={(el) => {
            cardRefs.current[PROJECTS.length] = el
          }}
        >
          <span className="work__folder-tab" />
          <span className="work__folder-more-icon">+</span>
          <span className="work__folder-title">More Work</span>
          <span className="work__folder-category">VIEW ALL PROJECTS</span>
        </a>
      </div>

      {/* =====================================
          DETAIL OVERLAY — morphs out of the clicked folder
      ===================================== */}

      {renderedIndex !== null && (
        <div
          className="work__overlay"
          ref={overlayRef}
          onClick={closeProject}
          role="presentation"
        >
          <div
            className="work__detail"
            ref={detailRef}
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="work__detail-close"
              onClick={closeProject}
              aria-label="Close project detail"
            >
              ✕
            </button>

            <span className="work__detail-index">{activeProject.index}</span>

            <h3 className="work__detail-title">{activeProject.title}</h3>

            <p className="work__detail-description">
              {activeProject.description}
            </p>

            <div className="work__detail-tags">
              {activeProject.tags.map((tag) => (
                <span key={tag} className="work__detail-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="work__detail-footer">
              <span className="work__detail-meta">
                {activeProject.category} · {activeProject.year}
              </span>

              <a
                className="work__detail-link"
                href={activeProject.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}