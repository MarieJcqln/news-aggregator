import ArticleCard from './ArticleCard'

export default function ArticleGrid({ articles, onSelect }) {
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
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.25rem',
      padding: '0 2rem 3rem',
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