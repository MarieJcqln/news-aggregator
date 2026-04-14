import useWindowSize from '../hooks/useWindowSize'

const filters = [
  { value: 'all', label: 'Tous' },
  { value: 'rss', label: 'RSS' },
  { value: 'news', label: 'NewsAPI' },
]

export default function FilterBar({ filter, setFilter }) {
  const width = useWindowSize()
  const isMobile = width < 600

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '0.75rem',
      padding: isMobile ? '0.75rem 1rem 1rem' : '0.5rem 1rem 1.5rem'
    }}>
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          style={{
            padding: isMobile ? '0.4rem 1.1rem' : '0.35rem 1rem',
            borderRadius: '999px',
            border: '1px solid #b5a898',
            background: filter === f.value ? '#3a3228' : 'transparent',
            color: filter === f.value ? '#f5f0e8' : '#3a3228',
            fontFamily: "'Inter', sans-serif",
            fontSize: isMobile ? '0.85rem' : '0.8rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}