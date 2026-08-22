import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Project from './pages/Project'
import NotFound from './pages/NotFound'
import useLenis from './hooks/useLenis'
import { bindScrollProgress } from './animations/scrollAnimations'
import { useGsapEffect } from './hooks/useGsapEffect'

export default function App() {
  const [preloading, setPreloading] = useState(true)
  const [heroReady, setHeroReady] = useState(false)

  // Single Lenis instance for the whole app — see hooks/useLenis.
  useLenis()

  useGsapEffect(() => {
    const trigger = bindScrollProgress()
    return () => trigger.kill()
  }, [])

  return (
    <CustomCursor>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {preloading && (
        <Preloader
          onComplete={() => {
            setPreloading(false)
            setHeroReady(true)
          }}
        />
      )}

      <Navbar />

      <main id="main">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home heroReady={heroReady} />} />
            <Route path="/project/:slug" element={<Project />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>

      <Footer />
    </CustomCursor>
  )
}
