const contactPlaceholder = [
  { label: 'Email', value: 'your-email@example.com', href: 'mailto:your-email@example.com' },
  { label: 'GitHub', value: 'https://github.com/your-profile', href: 'https://github.com/' },
  { label: 'LinkedIn', value: 'https://linkedin.com/in/your-profile', href: 'https://linkedin.com/' },
]

function ContactPage() {
  return (
    <section className="content-page p5-enter">
      <p className="section-tag">Contact</p>
      <h2 className="section-title">Call Card</h2>
      <p className="section-text">
        Replace these placeholders with your real links so recruiters and collaborators can reach you quickly.
      </p>

      <div className="placeholder-grid">
        {contactPlaceholder.map((item) => (
          <a key={item.label} href={item.href} className="placeholder-card contact-link" target="_blank" rel="noreferrer">
            <h3 className="placeholder-title">{item.label}</h3>
            <p className="placeholder-body">{item.value}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

export default ContactPage
