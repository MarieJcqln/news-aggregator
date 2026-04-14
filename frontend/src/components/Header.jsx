import useWindowSize from '../hooks/useWindowSize'

export default function Header() {
  const width = useWindowSize()
  const isMobile = width < 600

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  const dateFormatted = today.charAt(0).toUpperCase() + today.slice(1)

  return (
    <header style={{
      textAlign: 'center',
      padding: isMobile ? '1.5rem 1rem 0.5rem' : '2rem 1rem 1rem',
    }}>
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: isMobile ? '1.6rem' : '2rem',
        fontWeight: '700',
        color: '#2c2418',
        letterSpacing: '0.02em',
        marginBottom: '0.25rem'
      }}>
        News Aggregator
      </h1>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.8rem',
        color: '#8c7d6e',
        letterSpacing: '0.08em',
        textTransform: 'uppercase'
      }}>
        {dateFormatted}
      </p>
    </header>
  )
}