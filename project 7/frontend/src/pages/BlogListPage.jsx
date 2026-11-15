import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchBlogPosts } from '../services/api';

export default function BlogListPage() {
  const { content } = useCMS();
  const [posts, setPosts] = useState(content?.blog_posts || []);
  const [categories, setCategories] = useState(content?.blog_categories || []);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const data = await fetchBlogPosts();
        if (data && data.length > 0) {
          setPosts(data);
        }
      } catch (err) {
        console.warn('Error loading posts:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter((p) => p.category?.slug === activeCategory || p.category === activeCategory);

  const navigateToPost = (slug) => {
    window.history.pushState({}, '', `/blog/${slug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, #3B1A21 0%, #202124 100%)', padding: '5rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(197, 164, 109, 0.3)' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
            La Gazette Royale • Chroniques Gastronomiques
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.2rem', color: 'var(--color-ivory)', marginBottom: '1.25rem', lineHeight: '1.2' }}>
            Le Journal de l'Étoile
          </h1>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.1rem', lineHeight: '1.75' }}>
            Les coulisses de nos pianos de cuisson, nos secrets de caves centenaires et l'art de recevoir parisien racontés par le Chef et sa brigade.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem',
          }}
        >
          <button
            onClick={() => setActiveCategory('all')}
            style={{
              background: activeCategory === 'all' ? 'var(--color-burgundy)' : '#25262A',
              color: activeCategory === 'all' ? '#FFF' : 'var(--color-taupe)',
              border: activeCategory === 'all' ? '1px solid var(--color-gold)' : '1px solid rgba(197, 164, 109, 0.25)',
              padding: '0.65rem 1.4rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontWeight: activeCategory === 'all' ? 600 : 400,
              transition: 'all 0.2s',
            }}
          >
            Tous les Récits
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id || cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              style={{
                background: activeCategory === cat.slug ? 'var(--color-burgundy)' : '#25262A',
                color: activeCategory === cat.slug ? '#FFF' : 'var(--color-taupe)',
                border: activeCategory === cat.slug ? '1px solid var(--color-gold)' : '1px solid rgba(197, 164, 109, 0.25)',
                padding: '0.65rem 1.4rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: activeCategory === cat.slug ? 600 : 400,
                transition: 'all 0.2s',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          {filteredPosts.map((post) => (
            <article
              key={post.id || post.slug}
              onClick={() => navigateToPost(post.slug)}
              style={{
                backgroundColor: '#25262A',
                border: '1px solid rgba(197, 164, 109, 0.3)',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--color-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(197, 164, 109, 0.3)';
              }}
            >
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={post.cover_image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85'}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {post.category && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(84, 37, 47, 0.9)',
                      color: 'var(--color-gold-light)',
                      border: '1px solid var(--color-gold)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                    }}
                  >
                    {typeof post.category === 'object' ? post.category.name : post.category}
                  </span>
                )}
              </div>

              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-taupe)', marginBottom: '0.5rem' }}>
                  {post.author_name || 'Alexandre de Morbihan'} • {post.read_time || '5 min de lecture'}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.45rem',
                    color: 'var(--color-ivory)',
                    lineHeight: '1.35',
                    marginBottom: '0.85rem',
                  }}
                >
                  {post.title}
                </h3>
                <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem', lineHeight: '1.65', flexGrow: 1, marginBottom: '1.5rem' }}>
                  {post.excerpt}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '1rem',
                    marginTop: 'auto',
                  }}
                >
                  <span style={{ color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 600 }}>
                    Lire la Chronique →
                  </span>
                  <span style={{ color: 'var(--color-taupe)', fontSize: '0.78rem' }}>
                    {post.views_count ? `${post.views_count} lectures` : 'Nouveau'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
