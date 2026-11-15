import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { fetchBlogPostDetail } from '../../services/api';

export default function BlogPostDetailPage({ slug, onNavigateHome, onNavigateBlog, onNavigatePost }) {
  const { openReservation } = useCMS();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let isMounted = true;
    async function loadPost() {
      setLoading(true);
      try {
        const data = await fetchBlogPostDetail(slug);
        if (isMounted) {
          setPost(data);
        }
      } catch (err) {
        console.error('Error loading article:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadPost();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formattedDate = post?.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Nov 14, 2026';

  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', backgroundColor: 'var(--bg-midnight-deep)' }}>
      {/* Article Header & Navigation */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(2.5rem, 5vw, 4.5rem) 0 2.5rem',
          borderBottom: '1px solid var(--border-diner)',
          background: 'linear-gradient(180deg, rgba(17, 26, 43, 0.95) 0%, rgba(9, 15, 27, 0.98) 100%)',
        }}
      >
        <div className="container-diner" style={{ maxWidth: '920px' }}>
          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'var(--neon-cyan)',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit',
                fontSize: 'inherit',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              HOME
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <button
              onClick={onNavigateBlog}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit',
                fontSize: 'inherit',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              JOURNAL
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-cream)' }}>
              {post ? post.title.toUpperCase().substring(0, 32) + '...' : 'ARTICLE'}
            </span>
          </div>

          <button
            onClick={onNavigateBlog}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              color: 'var(--neon-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              padding: 0,
              marginBottom: '1.5rem',
            }}
          >
            <span>←</span>
            <span>BACK TO JOURNAL ARCHIVE</span>
          </button>

          {loading ? (
            <div style={{ padding: '2rem 0', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
              LOADING DISPATCH...
            </div>
          ) : !post ? (
            <div style={{ padding: '3rem 0', textAlign: 'center' }}>
              <h2 style={{ color: '#FFF', fontFamily: 'var(--font-heading)' }}>Dispatch Not Found</h2>
              <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
                The requested journal article could not be located in our archives.
              </p>
              <button
                onClick={onNavigateBlog}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--cherry-red)',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                RETURN TO JOURNAL
              </button>
            </div>
          ) : (
            <div>
              {/* Category & Status Bar */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                {post.category_name && (
                  <span
                    style={{
                      backgroundColor: 'rgba(67, 217, 232, 0.15)',
                      color: 'var(--neon-cyan)',
                      padding: '0.25rem 0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      borderRadius: '2px',
                      border: '1px solid var(--neon-cyan)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {post.category_name}
                  </span>
                )}
                {post.is_featured && (
                  <span
                    style={{
                      backgroundColor: 'var(--cherry-red)',
                      color: '#FFF',
                      padding: '0.25rem 0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      borderRadius: '2px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                    }}
                  >
                    ★ LEAD HERO
                  </span>
                )}
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  ⏱ {post.read_time_minutes || 5} MIN READ
                </span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  📅 {formattedDate}
                </span>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  letterSpacing: '0.02em',
                  marginBottom: '1.5rem',
                }}
              >
                {post.title}
              </h1>

              {/* Excerpt Lead */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1.1rem, 1.4vw, 1.3rem)',
                  lineHeight: 1.7,
                  color: 'var(--text-cream)',
                  opacity: 0.95,
                  marginBottom: '2rem',
                  fontStyle: 'italic',
                  borderLeft: '3px solid var(--cherry-red)',
                  paddingLeft: '1.25rem',
                }}
              >
                {post.excerpt}
              </p>

              {/* Author Byline Box */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  backgroundColor: 'rgba(17, 26, 43, 0.7)',
                  border: '1px solid var(--border-diner)',
                  borderRadius: '4px',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--cherry-red)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#FFF',
                  }}
                >
                  {post.author_name ? post.author_name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.95rem' }}>
                    {post.author_name || 'Stardust Culinary Crew'}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                    {post.author_role || 'Executive Contributor'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Article Content & Body */}
      {post && (
        <section style={{ padding: '3.5rem 0 5rem' }}>
          <div className="container-diner" style={{ maxWidth: '840px' }}>
            {/* Full Width Hero Image */}
            <div
              style={{
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid var(--border-diner)',
                marginBottom: '3rem',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
              }}
            >
              <img
                src={post.resolved_cover || post.cover_image_url}
                alt={post.title}
                style={{
                  width: '100%',
                  maxHeight: '520px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Article Prose Content */}
            <div
              className="blog-prose-content"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                lineHeight: 1.85,
                color: 'var(--text-cream)',
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Action Toolbar: Share & Table Booking */}
            <div
              style={{
                marginTop: '4rem',
                padding: '1.75rem',
                backgroundColor: 'rgba(17, 26, 43, 0.7)',
                border: '1px solid var(--border-diner)',
                borderRadius: '6px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1.25rem',
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  onClick={handleCopyLink}
                  style={{
                    padding: '0.6rem 1.25rem',
                    backgroundColor: copied ? 'rgba(94, 234, 212, 0.2)' : 'transparent',
                    border: '1px solid var(--neon-cyan)',
                    color: copied ? '#5EEAD4' : 'var(--neon-cyan)',
                    borderRadius: '3px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {copied ? '✓ COPIED LINK!' : '🔗 SHARE ARTICLE LINK'}
                </button>
              </div>

              <div>
                <button
                  onClick={openReservation}
                  style={{
                    padding: '0.65rem 1.5rem',
                    backgroundColor: 'var(--cherry-red)',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '3px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b72832')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--cherry-red)')}
                >
                  BOOK A TABLE AT STARDUST ↗
                </button>
              </div>
            </div>

            {/* Related Articles Section */}
            {post.related_posts && post.related_posts.length > 0 && (
              <div style={{ marginTop: '5rem' }}>
                <div
                  style={{
                    borderBottom: '1px solid var(--border-diner)',
                    paddingBottom: '0.85rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: 'var(--neon-cyan)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    CONTINUE READING: MORE DISPATCHES
                  </h3>
                  <button
                    onClick={onNavigateBlog}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    VIEW ALL →
                  </button>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {post.related_posts.map((rel) => (
                    <div
                      key={rel.id || rel.slug}
                      onClick={() => onNavigatePost(rel.slug)}
                      style={{
                        backgroundColor: 'rgba(17, 26, 43, 0.6)',
                        border: '1px solid var(--border-diner)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-diner)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ height: '140px', overflow: 'hidden' }}>
                        <img
                          src={rel.resolved_cover || rel.cover_image_url}
                          alt={rel.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ padding: '1rem' }}>
                        <small
                          style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--text-muted)',
                            fontSize: '0.7rem',
                            display: 'block',
                            marginBottom: '0.35rem',
                          }}
                        >
                          {rel.read_time_minutes || 5} MIN READ
                        </small>
                        <h4
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1rem',
                            color: '#FFF',
                            margin: 0,
                            lineHeight: 1.3,
                          }}
                        >
                          {rel.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
