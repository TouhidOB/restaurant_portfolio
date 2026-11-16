import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function BlogPostDetailPage({ slug, onNavigate }) {
  const { blogPosts = [], openReservation } = useCMS();
  const post = blogPosts.find(p => p.slug === slug) || blogPosts[0] || {};

  return (
    <div style={{ backgroundColor: '#1A2B24', color: '#F4F0E6', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 53, 0.5) 0%, #1A2B24 100%)',
          padding: '4rem 1.5rem 3rem',
          borderBottom: '1px solid rgba(166, 181, 160, 0.25)',
        }}
      >
        <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>
          <button
            onClick={() => onNavigate && onNavigate('/blog')}
            style={{
              background: 'none',
              border: 'none',
              color: '#A6B5A0',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '20px',
              padding: 0,
            }}
          >
            ← Back to Glasshouse Journal
          </button>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <span
              style={{
                color: '#A87958',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                backgroundColor: 'rgba(168, 121, 88, 0.15)',
                padding: '4px 10px',
                borderRadius: '2px',
              }}
            >
              {post.category_name || post.category?.name || 'Dispatch'}
            </span>
            <span style={{ color: '#A6B5A0', fontSize: '13px' }}>
              {post.published_at} • {post.reading_time || '5 min read'}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
              lineHeight: 1.2,
              color: '#F4F0E6',
              margin: '0 0 20px',
            }}
          >
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid rgba(166, 181, 160, 0.2)' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#A87958',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '16px',
              }}
            >
              {post.author_name ? post.author_name.charAt(0) : 'E'}
            </div>
            <div>
              <span style={{ fontSize: '14px', color: '#F4F0E6', fontWeight: 600, display: 'block' }}>
                {post.author_name || 'Elena Vance'}
              </span>
              <span style={{ fontSize: '12px', color: '#A6B5A0' }}>
                Biophilic Architect & Curator
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '45px 24px 90px' }}>
        {/* Featured Image */}
        {post.featured_image && (
          <div
            style={{
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(166, 181, 160, 0.3)',
              marginBottom: '45px',
            }}
          >
            <img
              src={post.featured_image}
              alt={post.title}
              style={{ width: '100%', height: 'auto', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* Lead Excerpt */}
        {post.excerpt && (
          <p
            style={{
              fontSize: '1.25rem',
              lineHeight: 1.7,
              color: '#A6B5A0',
              fontStyle: 'italic',
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              borderLeft: '3px solid #A87958',
              paddingLeft: '20px',
              marginBottom: '35px',
            }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Body Content */}
        <div style={{ color: '#D8D2C5', fontSize: '1.1rem', lineHeight: 1.85 }}>
          {(post.content || '').split('\n\n').map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: '24px' }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footnote / Table Reservation CTA */}
        <div
          style={{
            marginTop: '60px',
            padding: '35px',
            backgroundColor: '#263F35',
            borderRadius: '4px',
            border: '1px solid rgba(166, 181, 160, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <span style={{ color: '#A87958', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
            VISIT VERDANT ATRIUM
          </span>
          <h3 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '1.8rem', color: '#FFFFFF', margin: '0 0 12px' }}>
            Experience These Terroir Dispatches In Person
          </h3>
          <p style={{ color: '#D8D2C5', fontSize: '0.98rem', maxWidth: '600px', lineHeight: 1.6, margin: '0 0 24px' }}>
            Reserve a table in our sunlit atrium or evening glass courtyard to taste our featured single origins and greenhouse botanicals.
          </p>
          <button
            onClick={() => openReservation()}
            style={{
              padding: '12px 30px',
              backgroundColor: '#A87958',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '3px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Reserve Your Experience
          </button>
        </div>
      </div>
    </div>
  );
}
