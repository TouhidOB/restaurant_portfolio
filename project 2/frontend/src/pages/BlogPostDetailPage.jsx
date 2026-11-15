import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchBlogPostDetail } from '../services/api';
import { Calendar, Clock, User, ArrowLeft, Share2, Sparkles, Check } from 'lucide-react';

export default function BlogPostDetailPage({ slug, onNavigateHome, onNavigateBlog, onNavigatePost }) {
  const { config, blogPosts: fallbackPosts, openReservation } = useCMS();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useEffect(() => {
    let isMounted = true;
    async function loadDetail() {
      setLoading(true);
      try {
        const data = await fetchBlogPostDetail(slug);
        if (isMounted && data) {
          setPost(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('API detail fetch error, falling back to context:', err);
      }

      // Fallback
      if (fallbackPosts && fallbackPosts.length > 0) {
        const found = fallbackPosts.find((p) => p.slug === slug);
        if (isMounted && found) {
          setPost(found);
        }
      }
      if (isMounted) setLoading(false);
    }

    loadDetail();
    return () => {
      isMounted = false;
    };
  }, [slug, fallbackPosts]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: '#141715', color: '#B6A17B', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '18px' }}>
          Consulting the ENSO Zen Archives...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: '#141715', color: '#F2EFE6', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', color: '#B6A17B', marginBottom: '1rem' }}>
          Essay Not Found
        </h2>
        <p style={{ marginBottom: '2rem', color: 'rgba(242, 239, 230, 0.7)' }}>
          The requested chronicle could not be located in our sanctuary archives.
        </p>
        <button
          onClick={onNavigateBlog}
          style={{
            padding: '12px 24px',
            backgroundColor: '#1A1E1B',
            border: '1px solid #B6A17B',
            color: '#B6A17B',
            cursor: 'pointer',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          ← Return to Journal
        </button>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#141715', color: '#F2EFE6' }}>
      {/* Article Header */}
      <section
        style={{
          padding: 'clamp(3rem, 5vw, 5rem) 0 3rem',
          borderBottom: '1px solid rgba(182, 161, 123, 0.25)',
          background: 'linear-gradient(180deg, rgba(26, 30, 27, 0.98) 0%, rgba(20, 23, 21, 0.98) 100%)',
        }}
      >
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#B6A17B',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={onNavigateBlog}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(242, 239, 230, 0.7)',
                cursor: 'pointer',
                padding: 0,
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <ArrowLeft size={14} /> THE ZEN JOURNAL
            </button>
            <span>/</span>
            <span style={{ color: '#C9B896' }}>{post.category_name || 'ESSAY'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ backgroundColor: 'rgba(182, 161, 123, 0.15)', border: '1px solid rgba(182, 161, 123, 0.3)', color: '#B6A17B', padding: '4px 10px', borderRadius: '2px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {post.category_name || 'Kaiseki Philosophy'}
            </span>
            <span style={{ fontSize: '13px', color: '#8E968F' }}>
              {post.read_time_minutes} min read
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display, Cormorant Garamond)',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              color: '#F2EFE6',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}
          >
            {post.title}
          </h1>

          <p style={{ fontSize: '18px', lineHeight: 1.75, color: '#C9B896', marginBottom: '2rem' }}>
            {post.excerpt}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid rgba(182, 161, 123, 0.2)', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#B6A17B', color: '#141715', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px' }}>
                {post.author_name ? post.author_name[0] : 'K'}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#F2EFE6' }}>{post.author_name}</div>
                <div style={{ fontSize: '12px', color: '#8E968F' }}>{post.author_role || 'Executive Kaiseki Master'}</div>
              </div>
            </div>

            <button
              onClick={handleShare}
              style={{
                padding: '8px 16px',
                backgroundColor: '#1A1E1B',
                border: '1px solid rgba(182, 161, 123, 0.3)',
                color: '#B6A17B',
                borderRadius: '2px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {copied ? <Check size={14} /> : <Share2 size={14} />}
              {copied ? 'Link Copied' : 'Share Essay'}
            </button>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {post.cover_image_url && (
        <div style={{ maxWidth: '1000px', margin: '3rem auto 0', padding: '0 24px' }}>
          <div style={{ borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(182, 161, 123, 0.25)', height: '480px' }}>
            <img src={post.cover_image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      )}

      {/* Article Content */}
      <section style={{ padding: '4rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              fontSize: '17px',
              lineHeight: 1.85,
              color: 'rgba(242, 239, 230, 0.9)',
              fontFamily: 'var(--font-body, Noto Sans)',
              whiteSpace: 'pre-line',
            }}
          >
            {post.content}
          </div>

          {/* Book Experience Card at End of Article */}
          <div
            style={{
              marginTop: '5rem',
              backgroundColor: '#1A1E1B',
              border: '1px solid #B6A17B',
              borderRadius: '2px',
              padding: '3rem',
              textAlign: 'center',
            }}
          >
            <span style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
              円 EXPERIENCE IT IN PERSON
            </span>
            <h3 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '2.2rem', color: '#F2EFE6', margin: '0.5rem 0 1rem' }}>
              Experience the Artistry of ENSO
            </h3>
            <p style={{ fontSize: '15px', color: 'rgba(242, 239, 230, 0.8)', maxWidth: '560px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
              Reserve your omakase counter seat or private tatami suite to taste these philosophies in practice.
            </p>
            <button
              onClick={openReservation}
              style={{
                padding: '14px 28px',
                backgroundColor: '#B6A17B',
                color: '#141715',
                border: 'none',
                borderRadius: '2px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Reserve Sanctuary Seating →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
