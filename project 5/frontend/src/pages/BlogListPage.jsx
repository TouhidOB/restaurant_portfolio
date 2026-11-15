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
    <div style={{ paddingTop: 'calc(var(--header-height, 80px) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: '#1A2F25', color: '#F6F2E9' }}>
      <div className="container-tropical">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: '#AAB9A0', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'rgba(170, 185, 160, 0.4)' }}>/</span>
          <span style={{ color: '#BC7153' }}>VERDANT JOURNAL</span>
        </div>

        {/* Hero Header */}
        <div style={{ borderBottom: '1px solid rgba(170, 185, 160, 0.3)', paddingBottom: '2.5rem', marginBottom: '3rem' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            EDITORIAL ESSAYS &bull; BOTANICAL DISPATCHES
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0.5rem 0 1rem' }}>
            VERDANT JOURNAL.
          </h1>
          <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#AAB9A0', maxWidth: '820px', lineHeight: 1.6 }}>
            Explorations into tropical modernism, living flora acoustics, citrus-wood hearth chemistry, and regenerative horticulture.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            style={{
              padding: '0.6rem 1.3rem',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              background: activeCategory === null ? '#BC7153' : '#243F32',
              color: activeCategory === null ? '#fff' : '#AAB9A0',
              border: '1px solid ' + (activeCategory === null ? '#BC7153' : 'rgba(170, 185, 160, 0.3)'),
              borderRadius: '4px',
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
                padding: '0.6rem 1.3rem',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                background: activeCategory === cat.slug ? '#BC7153' : '#243F32',
                color: activeCategory === cat.slug ? '#fff' : '#AAB9A0',
                border: '1px solid ' + (activeCategory === cat.slug ? '#BC7153' : 'rgba(170, 185, 160, 0.3)'),
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Articles Roster */}
        {loading ? (
          <div style={{ padding: '4rem 0', textAlign: 'center', fontFamily: 'var(--font-mono, monospace)', color: '#AAB9A0' }}>
            SCANNING BOTANICAL DISPATCHES...
          </div>
        ) : posts.length === 0 ? (
          <div style={{ background: '#243F32', border: '1px dashed rgba(170, 185, 160, 0.3)', borderRadius: '8px', padding: '4rem 2rem', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>No dispatches in this category</h3>
            <p style={{ color: '#AAB9A0' }}>Select another category or check back soon.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {posts.map(post => (
              <div
                key={post.id || post.slug}
                onClick={() => onNavigateTo(`/blog/${post.slug}`)}
                style={{
                  background: '#243F32',
                  border: '1px solid rgba(170, 185, 160, 0.25)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#BC7153';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(170, 185, 160, 0.25)';
                }}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#14251D' }}>
                  <img
                    src={post.cover_image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {post.category && (
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#BC7153', color: '#fff', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', fontWeight: 700, padding: '0.3rem 0.65rem', borderRadius: '3px' }}>
                      {post.category.name}
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(26, 47, 37, 0.88)', color: '#D9B84E', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.7rem', padding: '0.25rem 0.6rem', borderRadius: '3px' }}>
                    {post.read_time || '5 min read'}
                  </div>
                </div>

                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.65rem', color: '#F6F2E9' }}>
                      {post.title}
                    </h3>
                    <p style={{ color: '#E5D7C2', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {post.excerpt}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(170, 185, 160, 0.2)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#AAB9A0' }}>
                      BY {post.author_name || 'VERDANT ATELIER'}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', fontWeight: 600 }}>
                      READ DISPATCH &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
