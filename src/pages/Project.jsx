import { useParams, Link, Navigate } from 'react-router-dom'
import { getProjectBySlug } from '../data/projects'
import ImageReveal from '../components/ImageReveal'
import './Project.scss'

/**
 * /project/:slug — reads from data/projects.js. Redirects to 404 if the
 * slug doesn't resolve, rather than rendering an empty page.
 *
 * This is a structural placeholder: hero/overview/process/gallery blocks
 * are stubbed with the fields projects.js already provides, ready to be
 * expanded section-by-section later without changing the route or data
 * shape.
 */
export default function Project() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <Navigate to="/404" replace />

  return (
    <article className="project-page">
      <div className="container project-page__head">
        <Link to="/" className="project-page__back">
          ← Back
        </Link>
        <span className="project-page__index">{project.index}</span>
      </div>

      <div className="container">
        <h1 className="project-page__title">{project.title}</h1>
        <p className="project-page__summary">{project.summary}</p>

        <dl className="project-page__meta">
          <div>
            <dt>Category</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>Services</dt>
            <dd>{project.services.join(', ')}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
        </dl>
      </div>

      <div className="container">
        <ImageReveal src={project.image} alt={project.title} ratio="16 / 9" />
      </div>
    </article>
  )
}
