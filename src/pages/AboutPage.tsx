const aboutProfile = {
  intro:
    'I am a Computer Science (Big Data) student focused on data analysis, machine learning, and building useful products.',
}

const aboutChapters = [
  {
    header: 'Education',
    subheader: 'Current Journey',
    body: 'I am currently a student at 42 Singapore, improving step by step and building practical projects that strengthen my problem-solving mindset.',
    imageHint: 'Add a campus photo or study setup image here.',
  },
  {
    header: 'Goals',
    subheader: 'What I Am Building Toward',
    body: 'Replace this with your short-term and long-term career goals, plus the kind of teams and roles you want to join.',
    imageHint: 'Add a roadmap, certificate, or conference image here.',
  },
  {
    header: 'Strengths',
    subheader: 'How I Work',
    body: 'Replace this with technical strengths, work style, and examples of how you approach difficult engineering tasks.',
    imageHint: 'Add project screenshots or coding workspace image here.',
  },
]

function AboutPage() {
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
              <article className="about-image-card" aria-label="Image placeholder card">
                <div className="about-image-box">Image Placeholder</div>
                <p className="about-image-hint">{chapter.imageHint}</p>
              </article>

              <article className="about-info-card">
                <h4 className="about-info-title">Information</h4>
                <p className="about-info-body">{chapter.body}</p>
              </article>
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

export default AboutPage
