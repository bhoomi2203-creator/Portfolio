import { useState } from 'react'
import TextReveal from '../components/TextReveal'
import MagneticButton from '../components/MagneticButton'
import './Contact.scss'

export default function Contact() {
  const [hovering, setHovering] = useState(false)

  return (
    <section id="contact" className="section contact on-dark">
      <span className="eyebrow">Get in touch</span>

      <h2
        className={`contact__title ${hovering ? 'contact__title--hover' : ''}`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <TextReveal as="span" trigger="scroll">
          {"Let's\nmake\nsomething"}
        </TextReveal>
        <span className="contact__title-accent">good.</span>
      </h2>

      <div className="contact__bottom">
        <MagneticButton href="mailto:hello@kairenner.com" className="contact__email" strength={0.25}>

        </MagneticButton>
        <div className="contact__social">
          <a href="#top">Instagram</a>
          <a href="#top">LinkedIn</a>
          <a href="#top">Are.na</a>
        </div>
      </div>
    </section>
  )
}
