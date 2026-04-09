import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const menuItems = [
  { label: 'About Me', to: '/about', accent: 'red' },
  { label: 'Resume', to: '/resume', accent: 'white' },
  { label: 'Projects', to: '/projects', accent: 'red' },
  { label: 'Contact', to: '/contact', accent: 'white' },
] as const

const callingCardByRoute: Record<string, { codename: string; headline: string; note: string }> = {
  '/about': {
    codename: 'Target Profile',
    headline: 'Steal The Truth',
    note: 'The truth shall be revealed by a click of a button.',
  },
  '/resume': {
    codename: 'Target Resume',
    headline: 'Expose The Record',
    note: 'Accomplishments in life can make you grow and become a better person.',
  },
  '/projects': {
    codename: 'Target Projects',
    headline: 'Reveal The Work',
    note: 'Missions in life that are completed and proudest to present',
  },
  '/contact': {
    codename: 'Target Contact',
    headline: 'Open Negotiations',
    note: 'Socials and networks are an important asset to have in life.',
  },
}

function HomeMenuPage() {
  const navigate = useNavigate()
  const [activeRoute, setActiveRoute] = useState('/about')
  const [stampRoute, setStampRoute] = useState<string | null>(null)
  const [isStamping, setIsStamping] = useState(false)
  const stampTimerRef = useRef<number | null>(null)

  const activeCard = useMemo(() => callingCardByRoute[activeRoute] ?? callingCardByRoute['/about'], [activeRoute])

  useEffect(() => {
    return () => {
      if (stampTimerRef.current !== null) {
        window.clearTimeout(stampTimerRef.current)
      }
    }
  }, [])

  const handleSelect = (route: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (isStamping) {
      return
    }

    setActiveRoute(route)
    setStampRoute(route)
    setIsStamping(true)

    if (stampTimerRef.current !== null) {
      window.clearTimeout(stampTimerRef.current)
    }

    stampTimerRef.current = window.setTimeout(() => {
      navigate(route)
    }, 440)
  }

  const routeKey = activeRoute === '/' ? 'home' : activeRoute.slice(1)

  return (
    <section className="page-wrap p5-enter">
      <div className="hero-copy">
        <p className="hero-tag">Portfolio</p>
        <h1 className="hero-title">Choose Your Route</h1>
        <p className="hero-subtitle">
          Welcome to my portfolio. Feel free to explore around.
        </p>
      </div>

      <article
        className={`calling-card-wrap calling-card-${routeKey} ${isStamping ? 'is-stamping' : ''}`}
        aria-live="polite"
      >
        <div className="calling-card-stamp">Confidential</div>
        <p className="calling-card-code">{activeCard.codename}</p>
        <h2 className="calling-card-title">{activeCard.headline}</h2>
        <p className="calling-card-note">{activeCard.note}</p>
        <p className="calling-card-sig">- Phantom Portfolio Division</p>
        <div className={`impact-stamp ${isStamping ? 'is-visible' : ''}`}>
          {stampRoute ? `${stampRoute.slice(1).toUpperCase()} UNLOCKED` : 'UNLOCKED'}
        </div>
      </article>

      <nav className="pause-menu" aria-label="Main portfolio menu">
        {menuItems.map((item, index) => (
          <Link
            key={item.to}
            to={item.to}
            className={`menu-option ${item.accent === 'red' ? 'menu-option-red' : 'menu-option-white'}`}
            style={{ animationDelay: `${index * 90}ms` }}
            onMouseEnter={() => setActiveRoute(item.to)}
            onFocus={() => setActiveRoute(item.to)}
            onClick={handleSelect(item.to)}
          >
            <span className="menu-index">0{index + 1}</span>
            <span className="menu-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </section>
  )
}

export default HomeMenuPage
