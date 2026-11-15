import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchBlogPosts } from '../services/api';

export default function BlogListPage({ onNavigateHome, onNavigateTo }) {
  const { blogCategories, blogPosts: initialPosts } = useCMS();
  const [posts, setPosts] = useState(initialPosts || []);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchBlogPosts(activeCategory).then(data => {
      if (mounted) {
        setPosts(data || []);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [activeCategory]);

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      <div className="container-brutal">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'var(--border-light)' }}>/</span>
          <span style={{ color: 'var(--accent-orange)' }}>MONOLITH JOURNAL</span>
        </div>

        {/* Hero Header */}
        <div style={{ borderBottom: '2px solid var(--border-steel)', paddingBottom: '2.5rem', marginBottom: '3rem' }}>
          <span className="section-tag">ARCHITECTURAL DISPATCHES &bull; CULINARY ESSAYS</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: '0.75rem', textTransform: 'uppercase' }}>
            MONOLITH JOURNAL.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: 'var(--accent-orange)', marginTop: '1rem', maxWidth: '800px', lineHeight: 1.6 }}>
            Explorations into board-formed concrete acoustics, binchotan fire dynamics, and brutalist culinary philosophy.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            style={{
              padding: '0.55rem 1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              background: activeCategory === null ? 'var(--accent-orange)' : 'var(--bg-surface)',
              color: activeCategory === null ? '#000' : 'var(--text-secondary)',
              border: '1px solid ' + (activeCategory === null ? 'var(--accent-orange)' : 'var(--border-steel)'),
              cursor: 'pointer',
            }}
          >
            ALL DISPATCHES
          </button>
          {(blogCategories || []).map(cat => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setActiveCategory(cat.slug)}
              style={{
                padding: '0.55rem 1.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                background: activeCategory === cat.slug ? 'var(--accent-orange)' : 'var(--bg-surface)',
                color: activeCategory === cat.slug ? '#000' : 'var(--text-secondary)',
                border: '1px solid ' + (activeCategory === cat.slug ? 'var(--accent-orange)' : 'var(--border-steel)'),
                cursor: 'pointer',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            LOADING ARCHITECTURAL DISPATCHES...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
            {posts.map((post, idx) => (
              <article
                key={post.id || idx}
                onClick={() => onNavigateTo(`/blog/${post.slug}`)}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-steel)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-orange)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-steel)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Cover Photo */}
                <div style={{ height: '220px', background: '#000', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {post.category && (
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(32,33,31,0.9)', color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '0.2rem 0.5rem', textTransform: 'uppercase' }}>
                      {post.category.name}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      {post.read_time || '5 min read'} &bull; BY {post.author_name || 'MONOLITH'}
                    </div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.3, textTransform: 'uppercase' }}>
                      {post.title}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {post.excerpt}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-steel)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {post.views_count || 0} READS
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)', fontWeight: 700 }}>
                      READ DISPATCH &rarr;
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-steel)', paddingTop: '2.5rem' }}>
          <button onClick={onNavigateHome} className="btn-brutal-secondary" style={{ padding: '0.75rem 2rem' }}>
            &larr; RETURN TO MONOLITH INDEX
          </button>
        </div>
      </div>
    </div>
  );
}
