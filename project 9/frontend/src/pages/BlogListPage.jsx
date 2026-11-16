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
        console.warn('Error loading posts from API, using fallback data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter((p) => (p.category?.slug === activeCategory || p.category === activeCategory));

  const navigateToPost = (slug) => {
    window.history.pushState({}, '', `/blog/${slug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div style={{ backgroundColor: 'var(--color-midnight-dark, #0a121d)', color: 'var(--color-cloud-ivory, #F3F0E9)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 90, 0.45) 0%, var(--color-midnight-dark, #0a121d) 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="section-label">LEVEL 54 &bull; EDITORIAL JOURNAL</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', letterSpacing: '0.04em', color: 'var(--color-champagne)', margin: '0.8rem 0 1.25rem' }}>
            The Horizon Journal
          </h1>
          <div className="horizon-divider horizon-divider-center" />
          <p style={{ color: 'var(--color-twilight-slate)', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            Chronicles of elevated mixology, architectural transparency at 220 meters, and seasonal culinary explorations from Chef Julian Moreau.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Category Filter Tabs */}
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
              padding: '0.65rem 1.4rem',
              borderRadius: '25px',
              border: activeCategory === 'all' ? '1px solid var(--color-champagne)' : '1px solid var(--color-border)',
              background: activeCategory === 'all' ? 'var(--color-champagne)' : 'rgba(16, 28, 44, 0.7)',
              color: activeCategory === 'all' ? 'var(--color-midnight-dark)' : 'var(--color-cloud-ivory)',
              fontFamily: 'var(--font-accent)',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            All Chronicles
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id || cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: '25px',
                border: activeCategory === cat.slug ? '1px solid var(--color-champagne)' : '1px solid var(--color-border)',
                background: activeCategory === cat.slug ? 'var(--color-champagne)' : 'rgba(16, 28, 44, 0.7)',
                color: activeCategory === cat.slug ? 'var(--color-midnight-dark)' : 'var(--color-cloud-ivory)',
                fontFamily: 'var(--font-accent)',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Post Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {filteredPosts.map((post) => (
            <article
              key={post.id || post.slug}
              onClick={() => navigateToPost(post.slug)}
              style={{
                backgroundColor: 'var(--color-midnight-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-champagne)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {post.featured_image && (
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(16, 28, 44, 0.95) 0%, transparent 50%)',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(16, 28, 44, 0.85)',
                      border: '1px solid var(--color-champagne)',
                      color: 'var(--color-champagne)',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '20px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {post.category_name || post.category?.name || 'JOURNAL'}
                  </span>
                </div>
              )}

              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-twilight-slate)', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span>{post.published_at || 'November 2026'}</span>
                  <span>&bull;</span>
                  <span>{post.reading_time || '4 min read'}</span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-cloud-ivory)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                  {post.title}
                </h2>

                <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.92rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '1.5rem' }}>
                  {post.excerpt}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-cloud-ivory)', fontWeight: 600 }}>
                    By {post.author_name || 'Maître D’ Desk'}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-champagne)', fontWeight: 700 }}>
                    Read Article &rarr;
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
