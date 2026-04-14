export default function ArticleModal({ article, onClose }) {
  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(40,30,20,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100,padding:'1rem'}}>
      <div onClick={e => e.stopPropagation()} style={{background:'#f5f0e8',borderRadius:'6px',padding:'2rem',maxWidth:'600px',width:'100%',maxHeight:'80vh',overflowY:'auto',display:'flex',flexDirection:'column',gap:'1rem'}}>
        <button onClick={onClose} style={{alignSelf:'flex-end',background:'none',border:'none',fontSize:'1.2rem',cursor:'pointer',color:'#8c7d6e'}}>X</button>
        <h2 style={{fontFamily:"'Playfair Display', serif",fontSize:'1.4rem',color:'#2c2418'}}>{String(article.title || '')}</h2>
        <p style={{fontSize:'0.75rem',color:'#8c7d6e'}}>{String(article.source || '')} · {String(article.published_at || '')}</p>
        <p style={{fontFamily:"'Lora', serif",fontSize:'0.95rem',color:'#3a3228',lineHeight:'1.7'}}>{String(article.description || '')}</p>
        <a href={article.url} target="_blank" rel="noreferrer" style={{color:'#3a3228'}}>Lire l'article complet</a>
      </div>
    </div>
  )
}