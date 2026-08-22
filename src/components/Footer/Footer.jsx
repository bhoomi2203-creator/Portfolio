import './Footer.scss'

export default function Footer() {
  const year = new Date().getFullYear()

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer on-dark">
      <span></span>
      <button type="button" onClick={handleBackToTop}>
        Back to top ↑
      </button>
    </footer>
  )
}
