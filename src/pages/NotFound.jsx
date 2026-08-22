import { Link } from 'react-router-dom'
import './NotFound.scss'

export default function NotFound() {
  return (
    <div className="not-found">
      <span className="eyebrow">404</span>
      <h1>Page not found.</h1>
      <Link to="/">← Back home</Link>
    </div>
  )
}
