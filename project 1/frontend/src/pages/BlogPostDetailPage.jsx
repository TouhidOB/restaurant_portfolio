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
      <div style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: '#0D0F10', color: '#D6B879', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '18px' }}>
          Consulting the Aurelia Journal Archives...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: '#0D0F10', color: '#F3EDE1', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', color: '#D6B879', marginBottom: '1rem' }}>
          Dispatch Not Found
        </h2>
        <p style={{ marginBottom: '2rem', color: 'rgba(243, 237, 225, 0.7)' }}>
          The requested chronicle could not be located in our archives.
        </p>
        <button
          onClick={onNavigateBlog}
          style={{
            padding: '12px 24px',
            backgroundColor: '#123B35',
            border: '1px solid #D6B879',
            color: '#D6B879',
            cursor: 'pointer',
          }}
        >
          Return to Journal Catalog
        </button>
      </div>
    );
  }

  const related = post.related_posts || (fallbackPosts || []).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#0D0F10', color: '#F3EDE1' }}>
      {/* Article Header & Breadcrumbs */}
      <section
        style={{
          padding: '3rem 0 2rem',
          borderBottom: '1px solid rgba(214, 184, 121, 0.25)',
          background: 'linear-gradient(180deg, rgba(18, 59, 53, 0.9) 0%, rgba(13, 15, 16, 0.98) 100%)',
        }}
      >
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#D6B879',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(243, 237, 225, 0.65)',
                cursor: 'pointer',
                padding: 0,
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
              }}
            >
              HOME
            </button>
            <span>/</span>
            <button
              onClick={onNavigateBlog}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(243, 237, 225, 0.65)',
                cursor: 'pointer',
                padding: 0,
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
              }}
            >
              JOURNAL
            </button>
            <span>/</span>
            <span style={{ color: '#E8D3A2' }}>{post.category_name}</span>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <span
              style={{
                backgroundColor: 'rgba(214, 184, 121, 0.15)',
                border: '1px solid #D6B879',
                color: '#D6B879',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '2px',
              }}
            >
              {post.category_name}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display, Bodoni Moda)',
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: '#D6B879',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
            }}
          >
            {post.title}
          </h1>

          {/* Author Byline & Sharing */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
              borderTop: '1px solid rgba(214, 184, 121, 0.2)',
              paddingTop: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid #D6B879',
                  backgroundColor: '#123B35',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D6B879',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                {post.author_name ? post.author_name.charAt(0) : 'A'}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
                  {post.author_name}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(243, 237, 225, 0.65)' }}>
                  {post.author_role} • {post.read_time_minutes} min read
                </div>
              </div>
            </div>

            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(18, 59, 53, 0.5)',
                border: '1px solid rgba(214, 184, 121, 0.35)',
                color: '#D6B879',
                padding: '8px 16px',
                borderRadius: '2px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              {copied ? <Check size={14} /> : <Share2 size={14} />}
              {copied ? 'LINK COPIED' : 'SHARE DISPATCH'}
            </button>
          </div>
        </div>
      </section>

      {/* Hero Cover Image */}
      <div className="container" style={{ maxWidth: '900px', margin: '2.5rem auto 0', padding: '0 24px' }}>
        <div
          style={{
            maxHeight: '520px',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid #D6B879',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
          }}
        >
          <img
            src={post.resolved_cover || post.cover_image}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Article Content Body */}
      <article
        className="container"
        style={{
          maxWidth: '820px',
          margin: '3rem auto 5rem',
          padding: '0 24px',
          fontSize: '17px',
          lineHeight: 1.85,
          color: 'rgba(243, 237, 225, 0.92)',
        }}
      >
        <div
          style={{
            fontSize: '20px',
            lineHeight: 1.6,
            color: '#E8D3A2',
            borderLeft: '3px solid #D6B879',
            paddingLeft: '1.5rem',
            marginBottom: '2.5rem',
            fontStyle: 'italic',
            fontFamily: 'var(--font-accent, Cormorant Garamond)',
          }}
        >
          "{post.excerpt}"
        </div>

        <div
          className="journal-body-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            letterSpacing: '0.01em',
          }}
        />

        {/* In-Article Reservation Card */}
        <div
          style={{
            margin: '4rem 0',
            padding: '2.5rem',
            backgroundColor: 'rgba(18, 59, 53, 0.45)',
            border: '1px solid #D6B879',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#D6B879', textTransform: 'uppercase', marginBottom: '6px' }}>
              RESERVE YOUR MOMENT
            </div>
            <h3 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', color: '#FFFFFF', fontSize: '1.5rem', margin: 0 }}>
              Dine at Aurelia
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(243, 237, 225, 0.75)', margin: '6px 0 0' }}>
              Immerse yourself in our grand culinary salon and champagne parlour.
            </p>
          </div>

          <button
            onClick={() => openReservation()}
            style={{
              padding: '12px 28px',
              backgroundColor: '#123B35',
              border: '1px solid #D6B879',
              color: '#D6B879',
              fontFamily: 'var(--font-display, Bodoni Moda)',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            RESERVE A TABLE
          </button>
        </div>

        {/* Back Button */}
        <div style={{ borderTop: '1px solid rgba(214, 184, 121, 0.25)', paddingTop: '2rem' }}>
          <button
            onClick={onNavigateBlog}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(214, 184, 121, 0.4)',
              color: '#D6B879',
              padding: '10px 20px',
              borderRadius: '2px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={16} /> RETURN TO ALL DISPATCHES
          </button>
        </div>
      </article>

      {/* Related Chronicles */}
      {related.length > 0 && (
        <section
          style={{
            backgroundColor: 'rgba(18, 59, 53, 0.3)',
            borderTop: '1px solid rgba(214, 184, 121, 0.25)',
            padding: '4rem 0 5rem',
          }}
        >
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display, Bodoni Moda)',
                fontSize: '2rem',
                color: '#D6B879',
                marginBottom: '2rem',
                textAlign: 'center',
              }}
            >
              Related Chronicles
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
              }}
            >
              {related.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigatePost(rel.slug)}
                  style={{
                    backgroundColor: '#0D0F10',
                    border: '1px solid rgba(214, 184, 121, 0.2)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = '#D6B879';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(214, 184, 121, 0.2)';
                  }}
                >
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <img
                      src={rel.resolved_cover || rel.cover_image}
                      alt={rel.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#D6B879', textTransform: 'uppercase', marginBottom: '6px' }}>
                      {rel.category_name}
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', color: '#FFFFFF', fontSize: '1.2rem', marginBottom: '8px' }}>
                      {rel.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'rgba(243, 237, 225, 0.7)', lineHeight: 1.5 }}>
                      {rel.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
