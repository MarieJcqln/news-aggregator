import { useState, useEffect } from 'react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import ArticleGrid from './components/ArticleGrid'
import ArticleModal from './components/ArticleModal'

function App() {
  const [articles, setArticles] = useState([])
  const [filter, setFilter] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://news-aggregator-c8rj.onrender.com/articles/?source=${filter}`)
      .then(res => res.json())
      .then(data => {
        setArticles(data)
        setLoading(false)
      })
      .catch(err => {
      console.error('Erreur fetch :', err)
      setLoading(false)
    })
  }, [filter])

  return (
    <div>
      <Header />
      <FilterBar filter={filter} setFilter={setFilter} />
      {loading
        ? <p style={{ textAlign: 'center', padding: '2rem' }}>Chargement...</p>
        : <ArticleGrid articles={articles} onSelect={setSelectedArticle} />
      }
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  )
}

export default App