import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchBlogPostDetail } from '../services/api';

export default function BlogPostDetailPage({ slug }) {
  const { content, openReservation } = useCMS();
  const [post, setPost] = useState(
    (content?.blog_posts || []).find((p) => p.slug === slug) || null
  );
  const [loading, setLoading] = useState(!post);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const data = await fetchBlogPostDetail(slug);
        if (data) {
          setPost(data.post || data);
        }
      } catch (err) {
        console.warn('Error fetching post detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  const navigateToBlog = () => {
    window.history.pushState({}, '', '/blog');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (loading && !post) {
    return (
      <div style={{ backgroundColor: '#111314', color: 'var(--color-offwhite, #F1EEE7)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-copper, #B87345)', fontSize: '1.2rem', fontFamily: 'var(--font-display, Oswald)' }}>
          Loading article...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ backgroundColor: '#111314', color: 'var(--color-offwhite, #F1EEE7)', minHeight: '100vh', paddingTop: '150px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display, Oswald)', color: 'var(--color-copper, #B87345)', fontSize: '2.5rem', textTransform: 'uppercase' }}>
          Article Not Found
        </h2>
        <p style={{ color: 'var(--color-concrete, #B7B4AC)', marginBottom: '2rem' }}>
          The chronicle you are looking for does not exist or has been archived.
        </p>
        <button onClick={navigateToBlog} className="btn-primary">
          Back To All Chronicles
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#111314', color: 'var(--color-offwhite, #F1EEE7)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Article Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(145, 77, 55, 0.45) 0%, #111314 100%)',
          padding: '5rem 1.5rem 3rem',
          borderBottom: '2px solid var(--color-brick, #914D37)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <button
            onClick={navigateToBlog}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-copper, #B87345)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: '1.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            ← Back To All Chronicles
          </button>

          <span
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(184, 115, 69, 0.2)',
              color: 'var(--color-copper, #B87345)',
              border: '1px solid var(--color-copper, #B87345)',
              padding: '0.25rem 0.75rem',
              borderRadius: '2px',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 800,
              marginBottom: '1rem',
            }}
          >
            {post.category?.name || post.category || 'Craft Chronicle'}
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-display, Oswald)',
              fontSize: '3.2rem',
              textTransform: 'uppercase',
              lineHeight: '1.2',
              color: 'var(--color-offwhite, #F1EEE7)',
              marginBottom: '1.5rem',
            }}
          >
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', color: 'var(--color-concrete, #B7B4AC)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
            <span>By <strong style={{ color: 'var(--color-offwhite, #F1EEE7)' }}>{post.author_name || 'Chef Marcus Vance'}</strong></span>
            <span>•</span>
            <span>{post.read_time || '5 min read'}</span>
            {post.published_at && (
              <>
                <span>•</span>
                <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Article Cover & Content */}
      <article className="container" style={{ maxWidth: '850px', margin: '3.5rem auto', padding: '0 1.5rem' }}>
        {post.cover_image && (
          <div
            style={{
              borderRadius: '2px',
              overflow: 'hidden',
              border: '2px solid var(--color-brick, #914D37)',
              marginBottom: '3rem',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
            }}
          >
            <img src={post.cover_image} alt={post.title} style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }} />
          </div>
        )}

        {post.excerpt && (
          <p
            style={{
              fontSize: '1.25rem',
              fontFamily: 'var(--font-editorial, "DM Serif Display", serif)',
              fontStyle: 'italic',
              color: 'var(--color-amber, #E9A24B)',
              lineHeight: '1.8',
              marginBottom: '2.5rem',
              borderLeft: '3px solid var(--color-copper, #B87345)',
              paddingLeft: '1.5rem',
            }}
          >
            {post.excerpt}
          </p>
        )}

        <div
          style={{
            color: 'var(--color-concrete, #B7B4AC)',
            fontSize: '1.05rem',
            lineHeight: '1.9',
            fontFamily: 'var(--font-body, Manrope)',
          }}
        >
          {post.content ? (
            post.content.split('\n\n').map((para, idx) => (
              <p key={idx} style={{ marginBottom: '1.75rem' }}>
                {para}
              </p>
            ))
          ) : (
            <p>No article body available.</p>
          )}
        </div>

        {/* Article Footer & Reservation CTA */}
        <div
          style={{
            marginTop: '5rem',
            padding: '3rem',
            backgroundColor: 'var(--color-black-card, #181A1C)',
            border: '2px solid var(--color-brick, #914D37)',
            textAlign: 'center',
            borderRadius: '2px',
          }}
        >
          <span className="section-label">Taste The Flame In Person</span>
          <h3 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2rem', textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--color-offwhite, #F1EEE7)' }}>
            Experience Chef Marcus's Hearth
          </h3>
          <p style={{ color: 'var(--color-concrete, #B7B4AC)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Book your table or fire counter seat and taste our dry-aged butcher cuts and smokehouse specialties directly from the wood coals.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={navigateToBlog} style={{ background: 'transparent', border: '1px solid var(--color-copper, #B87345)', color: 'var(--color-copper, #B87345)', padding: '0.8rem 1.6rem', borderRadius: '2px', fontWeight: 700, cursor: 'pointer' }}>
              More Chronicles
            </button>
            <button onClick={() => openReservation('Wood Hearth Tasting')} className="btn-primary" style={{ padding: '0.8rem 1.8rem' }}>
              Reserve Table Now
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
