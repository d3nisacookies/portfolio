const skills = ['Python', 'Java', 'React', 'Machine Learning', 'Data Engineering', 'C/C++']

function ResumePage() {
  return (
    <section className="content-page p5-enter">
      <p className="section-tag">Resume</p>
      <h2 className="section-title">Career Snapshot</h2>

      <article className="placeholder-card" style={{ width: '100%' }}>
        <h3 className="placeholder-title">Skill Highlights</h3>
        <div className="skill-chip-list">
          {skills.map((skill) => (
            <span key={skill} className="skill-chip">
              {skill}
            </span>
          ))}
        </div>
      </article>

      <a
        href="/Aung_Kaung_CV.pdf"
        download
        className="cv-download-btn"
      >
        &#8595; Download Full CV
      </a>

      <iframe
        src="/Aung_Kaung_CV.pdf"
        title="Aung Kaung CV"
        width="100%"
        height="800px"
        style={{ border: 'none', borderRadius: '8px' }}
      />
    </section>
  )
}

export default ResumePage
