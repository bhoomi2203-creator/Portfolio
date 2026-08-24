import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Hero.scss'

const KEYWORDS = [
  {
    text: 'CREATIVE',
    top: '15%',
    left: '7%',
    depth: 0.55,
    rotate: -8,
  },
  {
    text: 'DEVELOPER',
    top: '22%',
    right: '7%',
    depth: 0.9,
    rotate: 6,
  },
  {
    text: '</CODE>',
    top: '48%',
    left: '4%',
    depth: 1.15,
    rotate: -5,
  },
  {
    text: 'DESIGN',
    top: '53%',
    right: '5%',
    depth: 0.95,
    rotate: 5,
  },
  {
    text: 'MOTION',
    top: '76%',
    left: '8%',
    depth: 0.7,
    rotate: -6,
  },
  {
    text: 'PIXELS ✦',
    top: '80%',
    right: '8%',
    depth: 0.85,
    rotate: 4,
  },
]

const COLOR_CYCLE = [
  '#e63946',
  '#2a9d8f',
  '#457b9d',
  '#8338ec',
  '#f4a261',
  '#e9c46a',
]

// How long to wait, after the preloader reports done, before the
// hero animation timeline actually starts. Tweak this one number.
const POST_INTRO_DELAY_MS = 2500

// Path to the background video. Swap this for your own file in /public.
const BG_VIDEO_SRC = '/hero-bg.mp4'

export default function Hero({ introComplete = true }) {
  const heroRef = useRef(null)
  const portfolioRef = useRef(null)
  const identityRef = useRef(null)
  const nameRef = useRef(null)
  const linkedinRef = useRef(null)
  const imageRef = useRef(null)
  const imageInnerRef = useRef(null)
  const metaRef = useRef(null)
  const glowRef = useRef(null)
  const videoRef = useRef(null)

  const keywordRefs = useRef([])
  const keywordTextRefs = useRef([])

  // Belt-and-braces: some browsers (Safari in particular) can ignore
  // the `autoPlay` attribute on first paint. Calling .play() explicitly
  // covers that; the .catch() just swallows the "autoplay blocked"
  // rejection some browsers throw if the tab isn't focused yet.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playPromise = video.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (!introComplete) return

    const hero = heroRef.current
    const portfolio = portfolioRef.current
    const identity = identityRef.current
    const name = nameRef.current
    const linkedin = linkedinRef.current
    const image = imageRef.current
    const imageInner = imageInnerRef.current
    const meta = metaRef.current
    const glow = glowRef.current

    const keywords = keywordRefs.current.filter(Boolean)
    const keywordTexts = keywordTextRefs.current.filter(Boolean)

    if (!hero || !image || !imageInner) return

    // =========================================
    // RESET
    // This runs immediately (not after the delay) so every element
    // is already hidden/positioned correctly while we wait out the
    // post-intro pause. Prevents any flash of unstyled content.
    // =========================================

    gsap.killTweensOf([
      portfolio,
      identity,
      name,
      linkedin,
      image,
      imageInner,
      meta,
      glow,
      ...keywords,
      ...keywordTexts,
    ])

    keywordTexts.forEach((el) => {
      el.textContent = ''
    })

    gsap.set(portfolio, {
      opacity: 0,
      y: -30,
    })

    gsap.set(identity, {
      opacity: 1,
    })

    gsap.set(name, {
      opacity: 0,
      y: 20,
    })

    gsap.set(linkedin, {
      opacity: 0,
      y: 15,
    })

    gsap.set(image, {
      yPercent: 115,
      opacity: 0,
      scale: 0.92,
    })

    gsap.set(keywords, {
      opacity: 0,
      scale: 0.75,
    })

    gsap.set(meta, {
      opacity: 0,
      y: 15,
    })

    // Declared up here so cleanup can always reach them, whether or
    // not the delayed timeline has actually fired yet.
    let tl = null
    let listenersAttached = false
    let handleImageMove
    let handleImageLeave
    let handleHeroMove

    // =========================================
    // WAIT, THEN BUILD + PLAY THE TIMELINE
    // =========================================

    const delayId = setTimeout(() => {
      // =========================================
      // MASTER TIMELINE
      // =========================================

      tl = gsap.timeline()

      // -----------------------------------------
      // PORTFOLIO
      // -----------------------------------------

      tl.to(portfolio, {
        opacity: 1,
        y: 0,
        duration: 1.6,
        ease: 'power2.out',
      })

      // -----------------------------------------
      // NAME
      // -----------------------------------------

      tl.to(
        name,
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
        },
        '-=0.9'
      )

      // -----------------------------------------
      // LINKEDIN
      // -----------------------------------------

      tl.to(
        linkedin,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.9'
      )

      // =========================================
      // IMAGE COMES FROM BELOW
      // Slowed way down so it drifts up rather than sliding in.
      // =========================================

      tl.to(
        image,
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 3.8,
          ease: 'power2.out',
        },
        '+=0.2'
      )

      // Small final settling motion
      tl.to(image, {
        y: -10,
        duration: 0.6,
        ease: 'power2.out',
      })

      tl.to(image, {
        y: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      })

      // =========================================
      // AFTER IMAGE LANDS
      // =========================================

      tl.add('heroAlive')

      // Meta appears
      tl.to(
        meta,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        'heroAlive+=0.15'
      )

      // =========================================
      // KEYWORD ENTRANCE
      // =========================================

      tl.to(
        keywords,
        {
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: 'back.out(1.8)',
          stagger: 0.12,
        },
        'heroAlive+=0.25'
      )

      // =========================================
      // TYPEWRITER
      // =========================================

      tl.call(
        () => {
          keywords.forEach((keyword, i) => {
            const textElement = keywordTexts[i]
            const fullText = KEYWORDS[i].text

            if (!textElement) return

            const proxy = {
              value: 0,
            }

            gsap.to(proxy, {
              value: fullText.length,

              duration: Math.max(
                0.7,
                fullText.length * 0.075
              ),

              delay: i * 0.18,

              ease: 'none',

              onUpdate: () => {
                const currentLength = Math.floor(proxy.value)

                textElement.textContent =
                  fullText.slice(0, currentLength)
              },

              onComplete: () => {
                // =================================
                // FLOATING MOTION
                // =================================

                gsap.to(keyword, {
                  y: i % 2 === 0 ? -10 : 10,
                  rotation:
                    KEYWORDS[i].rotate +
                    (i % 2 === 0 ? 2 : -2),

                  duration: 2.4 + i * 0.25,

                  ease: 'sine.inOut',

                  yoyo: true,
                  repeat: -1,

                  overwrite: false,
                })

                // =================================
                // COLOR CYCLE
                // =================================

                gsap.to(textElement, {
                  keyframes: COLOR_CYCLE.map((color) => ({
                    color,
                  })),

                  duration: 8 + i,

                  ease: 'sine.inOut',

                  repeat: -1,

                  repeatDelay: 0.2,
                })
              },
            })
          })
        },
        [],
        'heroAlive+=0.45'
      )

      // =========================================
      // IMAGE HOVER
      // =========================================

      handleImageMove = (event) => {
        const rect = image.getBoundingClientRect()

        const mouseX =
          event.clientX - rect.left

        const mouseY =
          event.clientY - rect.top

        const normalizedX =
          mouseX / rect.width - 0.5

        const normalizedY =
          mouseY / rect.height - 0.5

        const rotateY =
          normalizedX * 10

        const rotateX =
          normalizedY * -8

        gsap.to(imageInner, {
          x: normalizedX * 12,
          y: normalizedY * 8,

          rotationY: rotateY,
          rotationX: rotateX,

          scale: 1.025,

          duration: 0.55,

          ease: 'power3.out',

          overwrite: 'auto',
        })
      }

      handleImageLeave = () => {
        gsap.to(imageInner, {
          x: 0,
          y: 0,

          rotationX: 0,
          rotationY: 0,

          scale: 1,

          duration: 0.9,

          ease: 'power3.out',

          overwrite: 'auto',
        })
      }

      // =========================================
      // HERO MOUSE MOVEMENT
      // =========================================

      handleHeroMove = (event) => {
        const rect =
          hero.getBoundingClientRect()

        const mouseX =
          event.clientX - rect.left

        const mouseY =
          event.clientY - rect.top

        const centerX =
          mouseX - rect.width / 2

        const centerY =
          mouseY - rect.height / 2

        // ---------------------------------------
        // GLOW
        // ---------------------------------------

        if (glow) {
          gsap.to(glow, {
            '--x': `${mouseX}px`,
            '--y': `${mouseY}px`,

            duration: 0.45,

            ease: 'power2.out',

            overwrite: 'auto',
          })
        }

        // ---------------------------------------
        // KEYWORD PARALLAX
        // ---------------------------------------

        keywords.forEach((keyword, i) => {
          const depth =
            KEYWORDS[i].depth

          gsap.to(keyword, {
            x:
              (centerX /
                rect.width) *
              45 *
              depth,

            duration: 1,

            ease: 'power3.out',

            overwrite: false,
          })
        })

        // ---------------------------------------
        // VERY SUBTLE IMAGE PARALLAX
        // ---------------------------------------

        gsap.to(image, {
          x:
            (centerX /
              rect.width) *
            8,

          duration: 1.2,

          ease: 'power3.out',

          overwrite: 'auto',
        })
      }

      // =========================================
      // LISTENERS
      // =========================================

      image.addEventListener(
        'mousemove',
        handleImageMove
      )

      image.addEventListener(
        'mouseleave',
        handleImageLeave
      )

      hero.addEventListener(
        'mousemove',
        handleHeroMove
      )

      listenersAttached = true
    }, POST_INTRO_DELAY_MS)

    // =========================================
    // CLEANUP
    // =========================================

    return () => {
      clearTimeout(delayId)

      if (tl) {
        tl.kill()
      }

      if (listenersAttached) {
        image.removeEventListener(
          'mousemove',
          handleImageMove
        )

        image.removeEventListener(
          'mouseleave',
          handleImageLeave
        )

        hero.removeEventListener(
          'mousemove',
          handleHeroMove
        )
      }

      gsap.killTweensOf([
        portfolio,
        identity,
        name,
        linkedin,
        image,
        imageInner,
        meta,
        glow,
        ...keywords,
        ...keywordTexts,
      ])
    }
  }, [introComplete])

  return (
    <section
      className="hero"
      ref={heroRef}
    >
      {/* =====================================
          BACKGROUND VIDEO
      ===================================== */}

      <video
        ref={videoRef}
        className="hero__bg-video"
        src={BG_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="hero__bg-overlay" />

      {/* CURSOR GLOW */}
      <div
        className="hero__glow"
        ref={glowRef}
      />

      {/* =====================================
          TOP CENTER PORTFOLIO
      ===================================== */}

      <div
        ref={portfolioRef}
        className="hero__portfolio"
      >
        PORTFOLIO
      </div>

      {/* =====================================
          CENTERED IDENTITY
      ===================================== */}

    <div
  ref={identityRef}
  className="hero__identity"
>
  <h1
    ref={nameRef}
    className="hero__name"
  >
    <span>BHOOMI</span>
    <span>CHAUDHARY</span>
  </h1>

  <a
    ref={linkedinRef}
    className="hero__linkedin"
    href="YOUR_ACTUAL_LINKEDIN_URL"
    target="_blank"
    rel="noopener noreferrer"
  >
    LINKEDIN ↗
  </a>
</div>
      {/* =====================================
          IMAGE + KEYWORDS
      ===================================== */}

      <div className="hero__stage">

        <div className="hero__keywords">
          {KEYWORDS.map((keyword, i) => (
            <span
              key={keyword.text}
              ref={(element) => {
                keywordRefs.current[i] =
                  element
              }}
              className="hero__keyword"
              style={{
                top: keyword.top,
                left: keyword.left,
                right: keyword.right,
                '--rotation': `${keyword.rotate}deg`,
              }}
            >
              <span
                ref={(element) => {
                  keywordTextRefs.current[i] =
                    element
                }}
                className="hero__keyword-text"
              />

              <span className="hero__keyword-cursor" />
            </span>
          ))}
        </div>

        <div
          ref={imageRef}
          className="hero__image-wrapper"
        >
          <div
            ref={imageInnerRef}
            className="hero__image-inner"
          >
            <img
              src="/bhoomi.png"
              alt="Bhoomi Chaudhary"
              className="hero__image"
            />
          </div>
        </div>

      </div>

      {/* =====================================
          META
      ===================================== */}

      <div
        ref={metaRef}
        className="hero__meta"
      >
        <span>
          CREATIVE DEVELOPER
        </span>

        <span>
          DELHI / INDIA
        </span>
      </div>

      {/* =====================================
          SCROLL
      ===================================== */}

      <div className="hero__scroll">
        SCROLL TO EXPLORE ↓
      </div>
    </section>
  )
}