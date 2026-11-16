import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { getBlogPost } from '../services/api';

export default function BlogPostDetailPage({ slug, onNavigate }) {
  const { blogPosts = [], openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = blogPosts.find((p) => p.slug === slug);
    if (found) {
      setPost(found);
      setLoading(false);
      return;
    }

    getBlogPost(slug)
      .then((res) => {
        if (res && (res.post || res.data)) {
          setPost(res.post || res.data);
        }
      })
      .catch((err) => {
        console.warn('Blog post fetch failed:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, blogPosts]);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#18252E', color: '#F7F3EA', minHeight: '100vh', paddingTop: '160px', textAlign: 'center' }}>
        <p style={{ color: '#A9BDB5', fontSize: '18px' }}>Loading Riviera dispatch...</p>
      </div>
    );
  }

  const currentPost =
    post ||
    blogPosts.find((p) => p.slug === slug) ||
    blogPosts[0] || {
      title: "Wild Mediterranean Turbot & Crag Herbs of Cap-Ferrat",
      category_name: "Coastal Terroir",
      published_at: "2026-11-15",
      author_name: "Antoine Laurent",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85",
      content: "<p>Every morning at dawn, the fishermen of Saint-Jean-Cap-Ferrat depart for the deep crags of the Mediterranean trench...</p>",
    };

  return (
    <div style={{ backgroundColor: '#18252E', color: '#F7F3EA', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Article Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 58, 72, 0.65) 0%, #18252E 100%)',
          padding: '4rem 1.5rem 3rem',
          borderBottom: '1px solid rgba(233, 223, 207, 0.15)',
        }}
      >
        <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>
          <button
            onClick={() => onNavigate && onNavigate('/blog')}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#B96F4F',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '1.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            ← Back to All Dispatches
          </button>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
            <span
              style={{
                backgroundColor: 'rgba(185, 111, 79, 0.2)',
                color: '#B96F4F',
                border: '1px solid #B96F4F',
                padding: '4px 12px',
                borderRadius: '3px',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {currentPost.category_name || (currentPost.category && currentPost.category.name) || 'Gazette'}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#A9BDB5' }}>
              {currentPost.published_at || 'November 2026'}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              color: '#F7F3EA',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}
          >
            {currentPost.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#E9DFCF', fontSize: '0.9rem' }}>
            <span>By <strong>{currentPost.author_name || 'Chef Antoine Laurent'}</strong></span>
            <span>•</span>
            <span>{currentPost.read_time || '5 min read'}</span>
          </div>
        </div>
      </div>

      {/* Featured Photo Banner */}
      <div className="container" style={{ maxWidth: '960px', margin: '3rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ borderRadius: '8px', overflow: 'hidden', height: '440px' }}>
          <img
            src={
              currentPost.image ||
              'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85'
            }
            alt={currentPost.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Article Body */}
      <article className="container" style={{ maxWidth: '780px', margin: '3.5rem auto 6rem', padding: '0 1.5rem' }}>
        <div
          style={{
            color: '#E9DFCF',
            fontSize: '1.12rem',
            lineHeight: 1.85,
            letterSpacing: '0.01em',
          }}
          dangerouslySetInnerHTML={{
            __html: currentPost.content || currentPost.excerpt || '<p>The Mediterranean yields its finest gifts to those who listen patiently...</p>',
          }}
        />

        {/* Reservation CTA Box */}
        <div
          style={{
            marginTop: '5rem',
            padding: '3rem 2.5rem',
            backgroundColor: '#263A48',
            borderRadius: '6px',
            border: '1px solid rgba(185, 111, 79, 0.4)',
            textAlign: 'center',
          }}
        >
          <span style={{ color: '#B96F4F', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
            SAVOUR OUR HARVEST
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: '2.2rem',
              color: '#F7F3EA',
              marginBottom: '1rem',
            }}
          >
            Taste the Coastal Bounty Featured in this Essay
          </h3>
          <p style={{ color: '#E9DFCF', maxWidth: '540px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Our kitchen serves fresh morning catches paired with herbs hand-foraged along Saint-Jean-Cap-Ferrat's coastal crags.
          </p>
          <button
            onClick={triggerReservation}
            style={{
              backgroundColor: '#B96F4F',
              color: '#FFFFFF',
              padding: '12px 32px',
              borderRadius: '3px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Reserve Your Villa Table
          </button>
        </div>
      </article>
    </div>
  );
}
