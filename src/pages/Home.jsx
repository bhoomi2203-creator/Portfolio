import { useState } from 'react'
import Hero from '../sections/Hero'
import SelectedWorks from '../sections/SelectedWorks'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Experiments from '../sections/Experiments'
import Contact from '../sections/Contact'

/**
 * `heroReady` is flipped true by App.jsx once the preloader exits, so the
 * hero's entrance timeline never races the preloader's wipe-away.
 */
export default function Home({ heroReady }) {
  return (
    <>
      <Hero play={heroReady} />
      <SelectedWorks />
      <About />
      <Skills />
      <Experiments />
      <Contact />
    </>
  )
}
