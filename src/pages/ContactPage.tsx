const contactPlaceholder = [
  { label: 'Email', value: 'aungkg2468@gmail.com', href: 'mailto:aungkg2468@gmail.com' },
  { label: 'GitHub', value: 'github.com/d3nisacookies', href: 'https://github.com/d3nisacookies' },
  { label: 'LinkedIn', value: 'linkedin.com/in/aung-kaung-d3nisacookies', href: 'https://www.linkedin.com/in/aung-kaung-d3nisacookies/' },
]

function ContactPage() {
  return (
    <section className="content-page p5-enter">
      <p className="section-tag">Contact</p>
      <h2 className="section-title">Calling Card</h2>
      <p className="section-text">
        here are my credentials.
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
