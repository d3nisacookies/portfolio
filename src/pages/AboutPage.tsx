import { useEffect, useState } from 'react'
import profilePhoto from '../assets/Me.jpg'
import buildAndCollaborateOne from '../assets/Build and colaborate-1.JPG'
import buildPhoto from '../assets/Build and collaborate-3.JPG'
import collaboratePhoto from '../assets/Build and collaborate-4.JPG'
import buildAndCollaborateSix from '../assets/Build and collaborate-6.jpg'
import careerDirectionImage from '../assets/career_direction.png'

const GALLERY_SWITCH_MS = 3200

const aboutProfile = {
  intro:
    'I am a Computer Science (Big Data) student focused on data analysis, machine learning, and building useful products.',
}

type AboutChapter = {
  header: string
  subheader: string
  body: string
  imageHint: string
  imageSrc?: string
  imageAlt?: string
  imageGallery?: Array<{
    src: string
    alt: string
    label: string
  }>
  careerInfo?: {
    shortTerm: string
    longTerm: string
    targetRoles: string[]
    targetIndustries: string[]
    growingSkills: string[]
    openTo: string
  }
}

const aboutChapters: AboutChapter[] = [
  {
    header: 'Education',
    subheader: 'Current Journey',
    body: 'I am currently a student at 42 Singapore, where I focus on building strong problem-solving skills through hands-on projects. I graduated with a Bachelor of Computer Science (Big Data) from the University of Wollongong (SIM), where I developed a foundation in data analysis, machine learning, and software development.',
    imageHint: 'Here is a picture of me.',
    imageSrc: profilePhoto,
    imageAlt: 'Portrait of Aung Kaung.',
  },
  {
    header: 'Career Direction',
    subheader: 'What I Am Building Toward',
    body: '',
    imageHint: 'Career direction visual.',
    imageSrc: careerDirectionImage,
    imageAlt: 'Career direction and roadmap visual',
    careerInfo: {
      // ── Edit your career info here ─────────────────────────────────
      shortTerm:
        'Strengthen my full-stack engineering and machine learning skills by building and deploying real-world applications. I aim to gain hands-on experience through internships, improve my system design fundamentals, and deepen my understanding of scalable data pipelines and model integration.',
      longTerm:
        'Design and build scalable, data-driven systems that solve real-world problems at scale. I am particularly interested in developing intelligent platforms for smart cities, traffic optimization, and data-centric applications that combine machine learning with robust backend systems.',
      targetRoles: [
        'Software Engineer',
        'Data Engineer',
        'ML Engineer',
      ],
      targetIndustries: [
        'Smart Cities',
        'Logistics & Traffic',
        'Fintech',
        'Data Platforms',
      ],
      growingSkills: [
        'PyTorch',
        'Next.js',
        'Docker & Kubernetes',
        'System Design',
        'C language'
      ],
      openTo: 'Open to internships & full-time roles',
      // ──────────────────────────────────────────────────────────────
    },
  },
  {
    header: 'How i build and collaborate.',
    subheader: 'How I Work',
    body: 'I approach engineering problems with a structured and analytical mindset, breaking complex tasks into manageable components. I have experience working with Python, Java, and JavaScript, and I enjoy building systems that combine data processing with user-facing applications. I am comfortable learning new technologies quickly and have worked on projects involving machine learning, data analysis, and full-stack development. I also value teamwork and have demonstrated leadership and coordination skills through organizing events and directing performances.',
    imageHint: 'Build and collaboration moments.',
    imageGallery: [
      {
        src: buildAndCollaborateOne,
        alt: 'Planning and discussing ideas with teammates',
        label: 'Plan',
      },
      {
        src: buildPhoto,
        alt: 'Working on a project build session',
        label: 'Build',
      },
      {
        src: collaboratePhoto,
        alt: 'Collaborating with teammates',
        label: 'Collaborate',
      },
      {
        src: buildAndCollaborateSix,
        alt: 'Presenting and coordinating with the team',
        label: 'Lead',
      },
    ],
  },
]

function AboutPage() {
  const [galleryFrame, setGalleryFrame] = useState(0)

  useEffect(() => {
    const hasGallery = aboutChapters.some((chapter) => chapter.imageGallery && chapter.imageGallery.length > 0)

    if (!hasGallery) {
      return
    }

    const timer = window.setInterval(() => {
      setGalleryFrame((prev) => prev + 1)
    }, GALLERY_SWITCH_MS)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return (
    <section className="content-page p5-enter">
      <p className="section-tag">About Me</p>
      <h2 className="section-title">Who I Am</h2>
      <p className="section-text">{aboutProfile.intro}</p>

      <div className="about-stack">
        {aboutChapters.map((chapter, index) => (
          <section key={chapter.header} className="about-chapter" style={{ animationDelay: `${index * 80}ms` }}>
            <header className="about-chapter-head">
              <p className="about-kicker">Chapter 0{index + 1}</p>
              <h3 className="about-header">{chapter.header}</h3>
              <p className="about-subheader">{chapter.subheader}</p>
            </header>

            <div className="about-chapter-grid">
              <article className="about-image-card" aria-label={chapter.imageSrc ? 'Profile image card' : 'Image placeholder card'}>
                {chapter.imageGallery && chapter.imageGallery.length > 0 ? (
                  (() => {
                    const activeIndex = galleryFrame % chapter.imageGallery.length
                    const photo = chapter.imageGallery[activeIndex]

                    return (
                      <div className="about-image-box about-image-box-carousel" aria-label="Build and collaborate photo gallery">
                        <figure key={photo.src} className="about-photo-tile about-photo-tile-carousel">
                          <img className="about-photo about-photo-carousel" src={photo.src} alt={photo.alt} />
                          <figcaption className="about-photo-label">{photo.label}</figcaption>
                        </figure>
                        <div className="about-photo-progress" aria-hidden="true">
                          {chapter.imageGallery.map((item, itemIndex) => (
                            <span
                              key={item.src}
                              className={`about-photo-dot ${itemIndex === activeIndex ? 'is-active' : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })()
                ) : (
                  <div className="about-image-box">
                    {chapter.imageSrc ? (
                      <img className="about-photo" src={chapter.imageSrc} alt={chapter.imageAlt ?? `${chapter.header} image`} />
                    ) : (
                      'Image Placeholder'
                    )}
                  </div>
                )}
                <p className="about-image-hint">{chapter.imageHint}</p>
              </article>

              <article className="about-info-card">
                {chapter.careerInfo ? (
                  <div className="career-info">
                    <span className="career-open-badge">{chapter.careerInfo.openTo}</span>

                    <div className="career-section">
                      <p className="career-label">Near Term</p>
                      <p className="career-text">{chapter.careerInfo.shortTerm}</p>
                    </div>

                    <div className="career-section">
                      <p className="career-label">Long Term</p>
                      <p className="career-text">{chapter.careerInfo.longTerm}</p>
                    </div>

                    <div className="career-section">
                      <p className="career-label">Target Roles</p>
                      <div className="career-chips">
                        {chapter.careerInfo.targetRoles.map((role) => (
                          <span key={role} className="career-chip">{role}</span>
                        ))}
                      </div>
                    </div>

                    <div className="career-section">
                      <p className="career-label">Industries</p>
                      <div className="career-chips">
                        {chapter.careerInfo.targetIndustries.map((ind) => (
                          <span key={ind} className="career-chip career-chip-dim">{ind}</span>
                        ))}
                      </div>
                    </div>

                    <div className="career-section">
                      <p className="career-label">Currently Growing</p>
                      <div className="career-chips">
                        {chapter.careerInfo.growingSkills.map((skill) => (
                          <span key={skill} className="career-chip career-chip-skill">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="about-info-title">Information</h4>
                    <p className="about-info-body">{chapter.body}</p>
                  </>
                )}
              </article>
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

export default AboutPage
