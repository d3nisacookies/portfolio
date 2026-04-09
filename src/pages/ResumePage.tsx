const resumePlaceholder = {
  education: 'Replace with your degree, university, and graduation timeline.',
  experience: 'Replace with internship, freelance, or campus role details.',
  skills: ['Python', 'Java', 'React', 'Machine Learning', 'Data Engineering'],
}

function ResumePage() {
  return (
    <section className="content-page p5-enter">
      <p className="section-tag">Resume</p>
      <h2 className="section-title">Career Snapshot</h2>

      <div className="placeholder-grid">
        <article className="placeholder-card">
          <h3 className="placeholder-title">Education</h3>
          <p className="placeholder-body">{resumePlaceholder.education}</p>
        </article>

        <article className="placeholder-card">
          <h3 className="placeholder-title">Experience</h3>
          <p className="placeholder-body">{resumePlaceholder.experience}</p>
        </article>

        <article className="placeholder-card">
          <h3 className="placeholder-title">Skill Highlights</h3>
          <div className="skill-chip-list">
            {resumePlaceholder.skills.map((skill) => (
              <span key={skill} className="skill-chip">
                {skill}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}

export default ResumePage
