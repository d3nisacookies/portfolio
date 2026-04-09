import { useState } from 'react'

type Project = {
  codename: string
  title: string
  details: string
  tags: string[]
  repo: string
  featuredLabel?: string
  difficulty: number
  spotlight?: boolean
}

type ReadmeEntry = {
  loading: boolean
  content: string | null
  error: string | null
}

const projectsPlaceholder: Project[] = [
  {
    codename: 'Mission 01',
    title: 'bottleNex-web',
    details:
      'Final year project web interface focused on product workflows, user interaction flows, and feature delivery in a collaborative setting.',
    tags: ['JavaScript', 'Web App', 'Final Year Project'],
    repo: 'https://github.com/d3nisacookies/bottleNex-web',
    featuredLabel: 'Featured: Final Year Project',
    difficulty: 5,
    spotlight: true,
  },
  {
    codename: 'Mission 02',
    title: 'BottleNex-app',
    details:
      'Final year project application component that complements the web platform with structured business logic and integrated feature modules.',
    tags: ['Java', 'App Development', 'Final Year Project'],
    repo: 'https://github.com/d3nisacookies/BottleNex-app',
    featuredLabel: 'Featured: Final Year Project',
    difficulty: 5,
    spotlight: true,
  },
  {
    codename: 'Mission 03',
    title: 'fract-ol',
    details:
      'Developed an interactive fractal renderer focused on graphics fundamentals, viewport math, and smooth zoom navigation.',
    tags: ['C', 'Graphics', 'Fractals', 'Math'],
    repo: 'https://github.com/d3nisacookies/fract-ol',
    featuredLabel: 'Featured: Recent + Hard',
    difficulty: 4.5,
    spotlight: true,
  },
  {
    codename: 'Mission 04',
    title: 'push_swap',
    details:
      'Implemented constrained-operation sorting with algorithmic strategy tuning and operation count optimization.',
    tags: ['C', 'Algorithms', 'Sorting', 'Optimization'],
    repo: 'https://github.com/d3nisacookies/push_swap',
    featuredLabel: 'Featured: Recent + Hard',
    difficulty: 4.5,
    spotlight: true,
  },
  {
    codename: 'Mission 05',
    title: 'ft_printf',
    details:
      'Recreated key printf formatting behavior from scratch with custom parsing and robust conversion handling in C.',
    tags: ['C', 'Parsing', 'Formatting', 'Systems'],
    repo: 'https://github.com/d3nisacookies/ft_printf',
    difficulty: 3,
  },
  {
    codename: 'Mission 06',
    title: 'minitalk',
    details:
      'Created process-to-process communication over Unix signals with robust message framing and delivery handling.',
    tags: ['C', 'Unix Signals', 'IPC', 'Systems'],
    repo: 'https://github.com/d3nisacookies/minitalk',
    difficulty: 3,
  },
  {
    codename: 'Mission 07',
    title: 'libft',
    details:
      'Built a foundational C utility library with reusable functions across string handling, memory, and linked list operations.',
    tags: ['C', 'Library Design', 'Memory', 'Utilities'],
    repo: 'https://github.com/d3nisacookies/libft',
    difficulty: 2,
  },
]

function getDiamondState(rating: number, index: number): 'filled' | 'half' | 'empty' {
  if (rating >= index) {
    return 'filled'
  }

  if (rating >= index - 0.5) {
    return 'half'
  }

  return 'empty'
}

function getReadmeCandidates(repoUrl: string): string[] {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/i)
  if (!match) {
    return []
  }

  const owner = match[1]
  const repo = match[2].replace(/\.git$/i, '')
  const branches = ['main', 'master']
  const files = ['README.md', 'readme.md', 'README.MD']

  return branches.flatMap((branch) =>
    files.map((file) => `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`),
  )
}

function ProjectsPage() {
  const [openReadmes, setOpenReadmes] = useState<Record<string, boolean>>({})
  const [readmeByMission, setReadmeByMission] = useState<Record<string, ReadmeEntry>>({})

  const loadReadme = async (project: Project): Promise<void> => {
    const current = readmeByMission[project.codename]
    if (current?.loading || current?.content) {
      return
    }

    setReadmeByMission((prev) => ({
      ...prev,
      [project.codename]: {
        loading: true,
        content: null,
        error: null,
      },
    }))

    const candidates = getReadmeCandidates(project.repo)
    let content: string | null = null

    for (const url of candidates) {
      try {
        const response = await fetch(url)
        if (response.ok) {
          content = await response.text()
          if (content.trim().length > 0) {
            break
          }
        }
      } catch {
        // Continue to next candidate path.
      }
    }

    setReadmeByMission((prev) => ({
      ...prev,
      [project.codename]: {
        loading: false,
        content,
        error: content ? null : 'README not found in main/master branch.',
      },
    }))
  }

  const handleReadmeToggle = (project: Project) => {
    const willOpen = !openReadmes[project.codename]
    setOpenReadmes((prev) => ({
      ...prev,
      [project.codename]: willOpen,
    }))

    if (willOpen) {
      void loadReadme(project)
    }
  }

  return (
    <section className="content-page p5-enter">
      <p className="section-tag">Projects</p>
      <h2 className="section-title">Completed Missions</h2>
      <p className="section-text">Each mission is a standalone card with room for project story, stack, and links.</p>

      <div className="projects-stack">
        {projectsPlaceholder.map((project, index) => (
          <article
            key={project.codename}
            className={`mission-card ${project.featuredLabel ? 'mission-card-featured' : ''} ${project.spotlight ? 'mission-card-spotlight' : ''}`}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <span className="mission-slash" aria-hidden="true" />
            <p className="project-code">{project.codename}</p>
            {project.featuredLabel && <p className="mission-priority">{project.featuredLabel}</p>}
            <h3 className="mission-title">{project.title}</h3>
            <p className="mission-body">{project.details}</p>
            <div className="mission-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="mission-tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mission-footer">
              <div className="mission-actions">
                <a className="mission-link" href={project.repo} target="_blank" rel="noreferrer">
                  Open Repository
                </a>
                <button
                  type="button"
                  className="mission-readme-btn"
                  onClick={() => handleReadmeToggle(project)}
                >
                  {openReadmes[project.codename] ? 'Hide README' : 'View README'}
                </button>
              </div>
              <div className="mission-difficulty" aria-label={`Difficulty ${project.difficulty}/5`}>
                <span className="difficulty-diamonds" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span
                      key={value}
                      className={`difficulty-diamond ${getDiamondState(project.difficulty, value)}`}
                    />
                  ))}
                </span>
                <span className="difficulty-label">Difficulty</span>
                <span className="difficulty-value">{project.difficulty}/5</span>
              </div>
            </div>

            {openReadmes[project.codename] && (
              <div className="mission-readme-panel">
                {readmeByMission[project.codename]?.loading && (
                  <p className="mission-readme-meta">Loading README...</p>
                )}
                {!readmeByMission[project.codename]?.loading &&
                  readmeByMission[project.codename]?.error && (
                    <p className="mission-readme-meta">{readmeByMission[project.codename]?.error}</p>
                  )}
                {!readmeByMission[project.codename]?.loading &&
                  !readmeByMission[project.codename]?.error &&
                  readmeByMission[project.codename]?.content && (
                    <pre className="mission-readme-content">{readmeByMission[project.codename]?.content}</pre>
                  )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProjectsPage
