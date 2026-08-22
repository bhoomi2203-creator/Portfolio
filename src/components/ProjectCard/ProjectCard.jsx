import { Link } from 'react-router-dom'
import useCursor from '../../hooks/useCursor'
import './ProjectCard.scss'

/**
 * Single project row used by SelectedWorks. Deliberately plain now (an
 * editorial list row) — designed to grow a hover image-preview, tilt, and
 * drag behavior in later passes without changing its public API.
 */
export default function ProjectCard({ project }) {
  const { setCursor, resetCursor } = useCursor()

  return (
    <Link
      to={`/project/${project.slug}`}
      className="project-card"
      onMouseEnter={() => setCursor('view', 'View')}
      onMouseLeave={resetCursor}
    >
      <span className="project-card__index">{project.index}</span>
      <span className="project-card__title">{project.title}</span>
      <span className="project-card__meta">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </span>
    </Link>
  )
}
