export default function Header() {
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
      padding: '2rem 1rem 1rem',
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.1rem',
      letterSpacing: '0.05em',
      color: '#3a3228'
    }}>
      {dateFormatted}
    </header>
  )
}