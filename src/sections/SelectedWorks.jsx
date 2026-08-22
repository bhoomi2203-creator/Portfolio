import projects from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import TextReveal from '../components/TextReveal'
import './SelectedWorks.scss'

export default function SelectedWorks() {
  return (
    <section id="work" className="section works">
      <div className="container works__head">
        <div>
          <span className="eyebrow">Selected work</span>
          <TextReveal as="h2" className="works__heading">
            Recent{'\n'}projects
          </TextReveal>
        </div>
        <span className="works__count">( {String(projects.length).padStart(2, '0')} )</span>
      </div>

      <div className="container">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
