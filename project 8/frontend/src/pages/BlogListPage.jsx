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
    <div style={{ backgroundColor: '#111314', color: 'var(--color-offwhite, #F1EEE7)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(145, 77, 55, 0.4) 0%, #111314 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '2px solid var(--color-brick, #914D37)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="section-label">Warehouse Chronicles • Smoke & Fire Journal</span>
          <h1 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '3.5rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
            The Urban Gazette
          </h1>
          <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1.15rem', lineHeight: '1.7' }}>
            Behind the embers of our 850° hearth: dry-aging logs, whole-animal butchery techniques, and industrial food culture.
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
            borderBottom: '2px solid var(--color-brick, #914D37)',
            paddingBottom: '1.25rem',
          }}
        >
          <button
            onClick={() => setActiveCategory('all')}
            style={{
              background: activeCategory === 'all' ? 'var(--color-copper, #B87345)' : 'transparent',
              color: activeCategory === 'all' ? 'var(--color-black, #111314)' : 'var(--color-concrete, #B7B4AC)',
              border: 'none',
              borderRadius: '2px',
              padding: '0.65rem 1.4rem',
              fontFamily: 'var(--font-body, Manrope)',
              fontSize: '0.85rem',
              fontWeight: '800',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
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
                background: activeCategory === cat.slug ? 'var(--color-copper, #B87345)' : 'transparent',
                color: activeCategory === cat.slug ? 'var(--color-black, #111314)' : 'var(--color-concrete, #B7B4AC)',
                border: 'none',
                borderRadius: '2px',
                padding: '0.65rem 1.4rem',
                fontFamily: 'var(--font-body, Manrope)',
                fontSize: '0.85rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          {filteredPosts.map((post) => (
            <article
              key={post.id || post.slug}
              onClick={() => navigateToPost(post.slug)}
              style={{
                backgroundColor: 'var(--color-black-card, #181A1C)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '2px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-copper, #B87345)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {post.cover_image && (
                <div style={{ height: '230px', overflow: 'hidden' }}>
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
              )}

              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <span
                    style={{
                      color: 'var(--color-copper, #B87345)',
                      fontSize: '0.72rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      fontWeight: 800,
                    }}
                  >
                    {post.category?.name || post.category || 'Craft Chronicle'}
                  </span>
                  <span style={{ color: 'var(--color-steel, #737A7D)', fontSize: '0.78rem' }}>
                    {post.read_time || '5 min read'}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-display, Oswald)',
                    fontSize: '1.45rem',
                    color: 'var(--color-offwhite, #F1EEE7)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    marginBottom: '0.85rem',
                    lineHeight: '1.3',
                  }}
                >
                  {post.title}
                </h2>

                <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '1.5rem', flex: 1 }}>
                  {post.excerpt}
                </p>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-offwhite, #F1EEE7)', fontWeight: 600 }}>
                    By {post.author_name || 'Chef Marcus Vance'}
                  </span>
                  <span style={{ color: 'var(--color-copper, #B87345)', fontSize: '0.85rem', fontWeight: 700 }}>
                    Read Article →
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
