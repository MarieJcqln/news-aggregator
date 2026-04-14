const CARD_STYLES = [
  { bg: '#f0e6d3', font: "'Playfair Display', serif" },
  { bg: '#e8d5c4', font: "'Lora', serif" },
  { bg: '#ede0cc', font: "'EB Garamond', serif" },
  { bg: '#e5d4c0', font: "'Crimson Text', serif" },
  { bg: '#f5e6d0', font: "'Playfair Display', serif" },
  { bg: '#ddd0be', font: "'Lora', serif" },
]

function getCardStyle(id) {
  const index = id
    ? id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % CARD_STYLES.length
    : 0
  return CARD_STYLES[index]
}

export default function ArticleCard({ article, onSelect }) {
  const style = getCardStyle(article.id)

  return (
    <div
      onClick={() => onSelect(article)}
      style={{
        background: style.bg,
        borderRadius: '4px',
        padding: '1.25rem',
        cursor: 'pointer',
        boxShadow: '2px 3px 8px rgba(0,0,0,0.08)',
        transition: 'transform 0.15s, box-shadow 0.15s',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        minHeight: '160px'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '4px 6px 14px rgba(0,0,0,0.13)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '2px 3px 8px rgba(0,0,0,0.08)'
      }}
    >
      <p style={{
  fontFamily: style.font,
  fontSize: '1rem',
  fontWeight: '700',
  color: '#2c2418',
  lineHeight: '1.3'
}}>
  {String(article.title || '')}
</p>
<p style={{
  fontFamily: style.font,
  fontSize: '0.8rem',
  color: '#5c4f42',
  lineHeight: '1.5',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical'
}}>
  {String(article.description || '')}
</p>
<p style={{
  marginTop: 'auto',
  fontSize: '0.7rem',
  fontFamily: "'Inter', sans-serif",
  color: '#8c7d6e',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
}}>
  {String(article.source || '')}
</p>
    </div>
  )
}