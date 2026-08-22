/**
 * Central project data. Every project card and the /project/:slug route
 * read from here — never hardcode project copy inside components.
 */
const projects = [
  {
    slug: 'northline-studio',
    index: '01',
    title: 'Northline Studio',
    category: 'Branding',
    services: ['Identity', 'Art direction'],
    year: 2026,
    summary: 'A print-first identity system rebuilt for a design studio moving into motion work.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=70',
    gallery: [],
  },
  {
    slug: 'ferra-motion-engine',
    index: '02',
    title: 'Ferra Motion Engine',
    category: 'Web · Motion',
    services: ['Web design', 'Front-end build', 'Motion system'],
    year: 2025,
    summary: 'Marketing site and scroll-driven motion system for a developer tooling startup.',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=70',
    gallery: [],
  },
  {
    slug: 'museum-of-small-things',
    index: '03',
    title: 'Museum of Small Things',
    category: 'Interactive',
    services: ['Concept', 'Interactive build'],
    year: 2025,
    summary: 'A browser-based miniature exhibit — object photography paired with cursor-driven interaction.',
    image: 'https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?w=1200&q=70',
    gallery: [],
  },
  {
    slug: 'paper-and-pixel-zine',
    index: '04',
    title: 'Paper & Pixel Zine',
    category: 'Editorial',
    services: ['Editorial design', 'Type system'],
    year: 2024,
    summary: 'A quarterly self-published zine on the seams between print and screen design.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=70',
    gallery: [],
  },
]

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug)

export default projects
