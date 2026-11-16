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
        console.warn('Error fetching post detail from API:', err);
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
      <div style={{ backgroundColor: 'var(--color-midnight-dark, #0a121d)', color: 'var(--color-cloud-ivory, #F3F0E9)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-champagne)', fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>
          Accessing Horizon Chronicle...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ backgroundColor: 'var(--color-midnight-dark, #0a121d)', color: 'var(--color-cloud-ivory, #F3F0E9)', minHeight: '100vh', paddingTop: '150px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-champagne)', fontSize: '2.5rem' }}>
          Chronicle Not Found
        </h2>
        <p style={{ color: 'var(--color-twilight-slate)', marginBottom: '2rem' }}>
          The article you are looking for has concluded or does not exist.
        </p>
        <button onClick={navigateToBlog} className="btn-skyline-primary">
          &larr; Back to Horizon Journal
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--color-midnight-dark, #0a121d)', color: 'var(--color-cloud-ivory, #F3F0E9)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Article Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 90, 0.45) 0%, var(--color-midnight-dark, #0a121d) 100%)',
          padding: '5rem 1.5rem 3rem',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <button
            onClick={navigateToBlog}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-champagne)',
              fontSize: '0.82rem',
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
            &larr; Back to All Chronicles
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span
              style={{
                backgroundColor: 'rgba(38, 63, 90, 0.4)',
                border: '1px solid var(--color-champagne)',
                color: 'var(--color-champagne)',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {post.category_name || post.category?.name || 'EDITORIAL'}
            </span>
            <span style={{ color: 'var(--color-twilight-slate)', fontSize: '0.85rem' }}>
              {post.published_at || 'November 2026'} &bull; {post.reading_time || '5 min read'}
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.2rem', color: 'var(--color-cloud-ivory)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border-subtle)' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--color-skyline-blue)',
                border: '1px solid var(--color-champagne)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-champagne)',
                fontWeight: 700,
              }}
            >
              {(post.author_name || 'JM')[0]}
            </div>
            <div>
              <div style={{ color: 'var(--color-cloud-ivory)', fontWeight: 600, fontSize: '0.95rem' }}>
                {post.author_name || 'Chef Julian Moreau'}
              </div>
              <div style={{ color: 'var(--color-twilight-slate)', fontSize: '0.78rem' }}>
                Level 54 Horizon Gastronomy
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Hero Image */}
      {post.featured_image && (
        <div className="container" style={{ maxWidth: '960px', margin: '2.5rem auto 0', padding: '0 1.5rem' }}>
          <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
            <img
              src={post.featured_image}
              alt={post.title}
              style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }}
            />
          </div>
        </div>
      )}

      {/* Article Content Body */}
      <div className="container" style={{ maxWidth: '800px', margin: '3.5rem auto 6rem', padding: '0 1.5rem' }}>
        <div
          style={{
            color: 'var(--color-cloud-ivory)',
            fontSize: '1.1rem',
            lineHeight: 1.9,
            fontFamily: 'var(--font-body)',
          }}
          dangerouslySetInnerHTML={{
            __html: post.content || `<p>${post.excerpt}</p><p>Suspended 220 meters above the bay, our evening service begins as the dusk light shifts from gold to twilight indigo. Every cocktail poured and every plate served is a meditation on altitude, terroir, and architectural elegance.</p>`
          }}
        />

        {/* Back to Blog & CTA */}
        <div
          style={{
            marginTop: '4rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <button onClick={navigateToBlog} className="btn-skyline-outline" style={{ padding: '0.75rem 1.75rem' }}>
            &larr; Return to Journal
          </button>
          <button onClick={() => openReservation()} className="btn-skyline-primary" style={{ padding: '0.75rem 2rem' }}>
            Reserve Horizon Table &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
