import ArticleCard from './ArticleCard'
import useWindowSize from '../hooks/useWindowSize'

export default function ArticleGrid({ articles, onSelect }) {
  const width = useWindowSize()
  const isMobile = width < 600
  const isTablet = width >= 600 && width < 900

  const columns = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'
  const padding = isMobile ? '0 1rem 3rem' : '0 2rem 3rem'

  if (articles.length === 0) {
    return (
      <p style={{ textAlign: 'center', padding: '3rem', color: '#8c7d6e' }}>
        Aucun article disponible.
      </p>
    )
  }

  return (
    <main style={{
      display: 'grid',
      gridTemplateColumns: columns,
      gap: '1.25rem',
      padding: padding,
      maxWidth: '1100px',
      margin: '0 auto'
    }}>
      {articles.map(article => (
        <ArticleCard
          key={article.id}
          article={article}
          onSelect={onSelect}
        />
      ))}
    </main>
  )
}