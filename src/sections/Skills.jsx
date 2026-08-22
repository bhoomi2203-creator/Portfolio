import { useState } from 'react'
import TextReveal from '../components/TextReveal'
import './Skills.scss'

const SKILLS = [
  { name: 'UI / UX', desc: 'Interfaces that hold up under real use — flows, states, and the small decisions in between.' },
  { name: 'Web design', desc: 'Editorial-first layouts built around type and rhythm, not templates.' },
  { name: 'Development', desc: 'React, GSAP, and enough backend to ship the whole thing myself.' },
  { name: 'Motion', desc: 'Scroll- and cursor-driven animation that earns its place, never just decoration.' },
  { name: 'Branding', desc: 'Identity systems designed to survive contact with a real product.' },
]

export default function Skills() {
  const [active, setActive] = useState(0)

  return (
    <section id="skills" className="section skills">
      <div className="container skills__head">
        <span className="eyebrow">Capabilities</span>
        <TextReveal as="h2" className="skills__heading">
          What I bring
        </TextReveal>
      </div>

      <div className="container skills__grid">
        <ul className="skills__list">
          {SKILLS.map((skill, i) => (
            <li
              key={skill.name}
              className={i === active ? 'active' : ''}
              onMouseEnter={() => setActive(i)}
            >
              <div className="skills__row">
                <span className="skills__name">{skill.name}</span>
                <span className="skills__num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="skills__desc">{skill.desc}</p>
            </li>
          ))}
        </ul>

        <div className="skills__visual" aria-hidden="true">
          <span>{SKILLS[active].name}</span>
        </div>
      </div>
    </section>
  )
}
