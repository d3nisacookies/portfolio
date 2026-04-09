import { House } from 'lucide-react'
import { Suspense, lazy, useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'

const HomeMenuPage = lazy(() => import('./pages/HomeMenuPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ResumePage = lazy(() => import('./pages/ResumePage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

const routeTransitionMap: Record<string, string> = {
  '/': 'transition-home',
  '/about': 'transition-about',
  '/resume': 'transition-resume',
  '/projects': 'transition-projects',
  '/contact': 'transition-contact',
}

function AppLayout() {
  const location = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const transitionType = routeTransitionMap[location.pathname] ?? 'transition-home'

  useEffect(() => {
    setIsTransitioning(true)
    const timeoutId = window.setTimeout(() => {
      setIsTransitioning(false)
    }, 640)

    return () => window.clearTimeout(timeoutId)
  }, [location.pathname])

  return (
    <div className="site-shell">
      <div
        className={`route-transition ${transitionType} ${isTransitioning ? 'is-active' : ''}`}
        aria-hidden="true"
      >
        <span className="transition-slice transition-slice-red" />
        <span className="transition-slice transition-slice-white" />
        <span className="transition-slice transition-slice-black" />
      </div>

      <header className="site-header">
        <Link to="/" className="brand-mark">
          AUNG KAUNG
        </Link>
        <Link to="/" className="home-link" aria-label="Back to home menu">
          <House className="h-4 w-4" />
          Home Menu
        </Link>
      </header>

      <main className="site-main" key={location.pathname}>
        <Suspense fallback={<section className="content-page p5-enter">Loading menu...</section>}>
          <Routes>
            <Route path="/" element={<HomeMenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default AppLayout
