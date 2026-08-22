import ImageReveal from '../components/ImageReveal'
import TextReveal from '../components/TextReveal'
import './About.scss'

const TIMELINE = [
  { year: 2026, role: 'Independent', detail: 'Interactive design & front-end development for studios and startups' },
  { year: 2023, role: 'Senior Designer, Ferra', detail: "Led motion systems for the product's marketing site" },
  { year: 2020, role: 'Design + Dev, Northline', detail: 'First studio job — branding into build, start to finish' },
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__head">
        <span className="eyebrow">About</span>
        <TextReveal as="h2" className="about__heading">
          The desk view
        </TextReveal>
      </div>

      <div className="container about__grid">
        <ImageReveal
          className="about__portrait"
          src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=700&q=70"
          alt="Portrait"
          ratio="3 / 4"
        />

        <div>
          <p className="about__lede">I think in frames per second before I think in pixels.</p>
          <p>
            Six years moving between graphic design, front-end development, and motion — mostly
            because I get bored fast and like solving the seam between disciplines.
          </p>

          <ul className="about__timeline">
            {TIMELINE.map((row) => (
              <li key={row.year}>
                <span className="about__year">{row.year}</span>
                <div>
                  <b>{row.role}</b>
                  <span>{row.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
