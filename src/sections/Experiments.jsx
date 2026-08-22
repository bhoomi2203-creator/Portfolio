import TextReveal from '../components/TextReveal'
import './Experiments.scss'

/**
 * Placeholder playground. Intentionally sparse — this is where
 * magnetic typography, liquid image distortion, text scrambling, and R3F
 * experiments get added incrementally in later passes.
 */
export default function Experiments() {
  return (
    <section id="experiments" className="section experiments">
      <div className="container">
        <span className="eyebrow">Playground</span>
        <TextReveal as="h2" className="experiments__heading">
          Experiments
        </TextReveal>
        <p className="experiments__note">
          A running log of interaction studies — coming soon.
        </p>
      </div>
    </section>
  )
}
