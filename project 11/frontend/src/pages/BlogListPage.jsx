import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function BlogListPage({ onNavigate }) {
  const { blogPosts = [], blogCategories = [] } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category_slug === selectedCategory || p.category === selectedCategory);

  return (
    <div style={{ backgroundColor: '#1A2B24', color: '#F4F0E6', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 53, 0.5) 0%, #1A2B24 100%)',
          padding: '4.5rem 1.5rem 3rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(166, 181, 160, 0.25)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#A87958',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            BOTANICAL GAZETTE & CHRONICLES
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              letterSpacing: '0.03em',
              color: '#F4F0E6',
              margin: '0.6rem 0 1rem',
            }}
          >
            The Glasshouse Journal
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#A87958', margin: '1rem auto' }} />
          <p style={{ color: '#D8D2C5', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1rem' }}>
            Essays on single-origin coffee terroir, biophilic architecture, indoor horticulture, and unhurried café rituals.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '50px 24px 90px' }}>
        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '45px',
          }}
        >
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '10px 22px',
              borderRadius: '3px',
              backgroundColor: selectedCategory === 'all' ? '#A87958' : 'rgba(38, 63, 53, 0.6)',
              color: selectedCategory === 'all' ? '#FFFFFF' : '#A6B5A0',
              border: `1px solid ${selectedCategory === 'all' ? '#A87958' : 'rgba(166, 181, 160, 0.3)'}`,
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            All Dispatches ({blogPosts.length})
          </button>
          {blogCategories.map((cat) => {
            const isActive = selectedCategory === (cat.slug || cat.id);
            return (
              <button
                key={cat.id || cat.slug}
                onClick={() => setSelectedCategory(cat.slug || cat.id)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '3px',
                  backgroundColor: isActive ? '#A87958' : 'rgba(38, 63, 53, 0.6)',
                  color: isActive ? '#FFFFFF' : '#A6B5A0',
                  border: `1px solid ${isActive ? '#A87958' : 'rgba(166, 181, 160, 0.3)'}`,
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#A6B5A0' }}>
            No articles published in this category yet.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '35px',
            }}
          >
            {filteredPosts.map((post) => (
              <article
                key={post.id || post.slug}
                onClick={() => onNavigate && onNavigate(`/blog/${post.slug}`)}
                style={{
                  backgroundColor: '#263F35',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: '1px solid rgba(166, 181, 160, 0.25)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#A87958';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(166, 181, 160, 0.25)';
                }}
              >
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={post.featured_image || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85'}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: 'rgba(26, 43, 36, 0.88)',
                      backdropFilter: 'blur(6px)',
                      padding: '5px 12px',
                      borderRadius: '2px',
                      border: '1px solid rgba(166, 181, 160, 0.3)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#A87958',
                    }}
                  >
                    {post.category_name || post.category?.name || 'Dispatch'}
                  </div>
                </div>

                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#A6B5A0', marginBottom: '10px' }}>
                      {post.published_at} • {post.reading_time || '5 min read'}
                    </div>
                    <h2
                      style={{
                        fontFamily: 'var(--font-display, "Cormorant Garamond")',
                        fontSize: '1.65rem',
                        color: '#FFFFFF',
                        lineHeight: 1.3,
                        marginBottom: '12px',
                      }}
                    >
                      {post.title}
                    </h2>
                    <p style={{ color: '#D8D2C5', fontSize: '0.96rem', lineHeight: 1.7, margin: 0 }}>
                      {post.excerpt}
                    </p>
                  </div>

                  <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(166, 181, 160, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#A6B5A0' }}>
                      By {post.author_name || 'Elena Vance'}
                    </span>
                    <span style={{ fontSize: '13px', color: '#A87958', fontWeight: 700 }}>
                      Read Dispatch →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
