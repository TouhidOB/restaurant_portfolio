import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { fetchBlogPosts } from '../../services/api';

export default function BlogListPage({ onNavigateHome, onNavigatePost }) {
  const { content, openReservation } = useCMS();
  const [posts, setPosts] = useState(content?.blog_posts || []);
  const [categories, setCategories] = useState(content?.blog_categories || []);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fetch or sync posts
  useEffect(() => {
    let isMounted = true;
    async function loadPosts() {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory !== 'ALL') {
          params.category = selectedCategory;
        }
        if (searchQuery.trim()) {
          params.search = searchQuery.trim();
        }
        const data = await fetchBlogPosts(params);
        if (isMounted && data) {
          setPosts(data);
        }
      } catch (err) {
        console.warn('Failed to fetch filtered blog posts:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadPosts();
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [selectedCategory, searchQuery]);

  // Sync categories from CMS content if available
  useEffect(() => {
    if (content?.blog_categories && content.blog_categories.length > 0) {
      setCategories(content.blog_categories);
    }
  }, [content]);

  // Featured post is only extracted on default unfiltered view (All categories & no search query)
  const isDefaultView = selectedCategory === 'ALL' && !searchQuery.trim();
  const featuredPost = isDefaultView ? (posts.find((p) => p.is_featured) || posts[0]) : null;
  const listPosts = featuredPost ? posts.filter((p) => p.id !== featuredPost.id) : posts;

  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', backgroundColor: 'var(--bg-midnight-deep)' }}>
      {/* Editorial Hero Header */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(3.5rem, 6vw, 6rem) 0 3.5rem',
          borderBottom: '1px solid var(--border-diner)',
          background: 'linear-gradient(180deg, rgba(17, 26, 43, 0.95) 0%, rgba(9, 15, 27, 0.98) 100%)',
        }}
      >
        <div className="container-diner">
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
              HOME (ALL SECTIONS)
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-cream)' }}>EDITORIAL JOURNAL</span>
          </div>

          <div style={{ maxWidth: '820px' }}>
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--cherry-red)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
                background: 'rgba(216, 58, 69, 0.1)',
                padding: '0.3rem 0.75rem',
                borderRadius: '3px',
                border: '1px solid rgba(216, 58, 69, 0.3)',
              }}
            >
              DISPATCHES & CULINARY HERITAGE // EST. 1955
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              THE STARDUST JOURNAL
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
                lineHeight: 1.7,
                color: 'var(--text-cream)',
                opacity: 0.9,
              }}
            >
              Behind-the-scenes dispatches on the thermodynamics of the smash plancha, mid-century atomic architecture, craft soda mixology, and late-night chronicles under the glow of Chicago neon.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section
        style={{
          backgroundColor: 'rgba(17, 26, 43, 0.6)',
          borderBottom: '1px solid var(--border-diner)',
          padding: '1.25rem 0',
          position: 'sticky',
          top: 'var(--header-height)',
          zIndex: 10,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="container-diner">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => setSelectedCategory('ALL')}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  border: selectedCategory === 'ALL' ? '1px solid var(--neon-cyan)' : '1px solid var(--border-diner)',
                  backgroundColor: selectedCategory === 'ALL' ? 'rgba(67, 217, 232, 0.15)' : 'transparent',
                  color: selectedCategory === 'ALL' ? 'var(--neon-cyan)' : 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                }}
              >
                ALL ARTICLES ({posts.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id || cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '3px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    border: selectedCategory === cat.slug ? '1px solid var(--neon-cyan)' : '1px solid var(--border-diner)',
                    backgroundColor: selectedCategory === cat.slug ? 'rgba(67, 217, 232, 0.15)' : 'transparent',
                    color: selectedCategory === cat.slug ? 'var(--neon-cyan)' : 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat.name.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: '260px' }}>
              <input
                type="text"
                placeholder="Search articles or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 1rem 0.55rem 2.2rem',
                  backgroundColor: 'rgba(9, 15, 27, 0.85)',
                  border: '1px solid var(--border-diner)',
                  borderRadius: '3px',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--neon-cyan)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-diner)')}
              />
              <span
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  pointerEvents: 'none',
                }}
              >
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '0.65rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container-diner" style={{ padding: '3.5rem 0 5rem' }}>
        {/* Loading Spinner */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
            SCANNING EDITORIAL ARCHIVES...
          </div>
        )}

        {/* Featured Hero Story (If on 'ALL' category or matches search) */}
        {!loading && featuredPost && selectedCategory === 'ALL' && !searchQuery && (
          <div
            style={{
              marginBottom: '3.5rem',
              backgroundColor: 'rgba(17, 26, 43, 0.65)',
              border: '1px solid var(--border-diner)',
              borderRadius: '6px',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
              transition: 'border-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(67, 217, 232, 0.4)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-diner)')}
          >
            {/* Image Box */}
            <div
              style={{
                position: 'relative',
                minHeight: '340px',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
              onClick={() => onNavigatePost(featuredPost.slug)}
            >
              <img
                src={featuredPost.resolved_cover || featuredPost.cover_image_url}
                alt={featuredPost.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  display: 'flex',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{
                    backgroundColor: 'var(--cherry-red)',
                    color: '#FFF',
                    padding: '0.25rem 0.65rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    borderRadius: '2px',
                    letterSpacing: '0.08em',
                  }}
                >
                  ★ FEATURED DISPATCH
                </span>
                {featuredPost.category_name && (
                  <span
                    style={{
                      backgroundColor: 'rgba(9, 15, 27, 0.85)',
                      color: 'var(--neon-cyan)',
                      padding: '0.25rem 0.65rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      borderRadius: '2px',
                      border: '1px solid rgba(67, 217, 232, 0.4)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {featuredPost.category_name.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Content Box */}
            <div
              style={{
                padding: 'clamp(2rem, 3.5vw, 3rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  marginBottom: '1rem',
                }}
              >
                <span>⏱ {featuredPost.read_time_minutes || 5} MIN READ</span>
                <span>•</span>
                <span>BY {featuredPost.author_name ? featuredPost.author_name.toUpperCase() : 'STARDUST STAFF'}</span>
              </div>

              <h2
                onClick={() => onNavigatePost(featuredPost.slug)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.3rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.25,
                  marginBottom: '1rem',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              >
                {featuredPost.title}
              </h2>

              <p
                style={{
                  color: 'var(--text-cream)',
                  fontSize: '0.98rem',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                  opacity: 0.88,
                }}
              >
                {featuredPost.excerpt}
              </p>

              <div>
                <button
                  onClick={() => onNavigatePost(featuredPost.slug)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.75rem 1.6rem',
                    backgroundColor: 'var(--cherry-red)',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '3px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#b72832';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--cherry-red)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>READ FULL DISPATCH</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div style={{ marginBottom: '2rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-diner)',
              paddingBottom: '0.85rem',
              marginBottom: '2rem',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              ARCHIVE DISPATCHES ({listPosts.length})
            </h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon-cyan)' }}>
              CHRONOLOGICAL ORDER
            </span>
          </div>

          {listPosts.length === 0 ? (
            <div
              style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                backgroundColor: 'rgba(17, 26, 43, 0.4)',
                border: '1px dashed var(--border-diner)',
                borderRadius: '6px',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📰</div>
              <h4 style={{ color: '#FFF', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                No Articles Found
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                No dispatches match the selected category or search filter '{searchQuery}'.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                style={{
                  padding: '0.5rem 1.25rem',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--neon-cyan)',
                  color: 'var(--neon-cyan)',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem',
              }}
            >
              {listPosts.map((post) => (
                <article
                  key={post.id || post.slug}
                  onClick={() => onNavigatePost(post.slug)}
                  style={{
                    backgroundColor: 'rgba(17, 26, 43, 0.6)',
                    border: '1px solid var(--border-diner)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(67, 217, 232, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-diner)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Card Thumbnail */}
                  <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                    <img
                      src={post.resolved_cover || post.cover_image_url}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    {post.category_name && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '0.75rem',
                          left: '0.75rem',
                          backgroundColor: 'rgba(9, 15, 27, 0.88)',
                          color: 'var(--neon-cyan)',
                          padding: '0.2rem 0.55rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          borderRadius: '2px',
                          border: '1px solid rgba(67, 217, 232, 0.35)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {post.category_name.toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        marginBottom: '0.65rem',
                      }}
                    >
                      <span>⏱ {post.read_time_minutes || 5} MIN</span>
                      <span>•</span>
                      <span>{post.author_name || 'STARDUST'}</span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        lineHeight: 1.35,
                        marginBottom: '0.75rem',
                      }}
                    >
                      {post.title}
                    </h3>

                    <p
                      style={{
                        color: 'var(--text-cream)',
                        fontSize: '0.88rem',
                        lineHeight: 1.6,
                        marginBottom: '1.25rem',
                        opacity: 0.85,
                        flex: 1,
                      }}
                    >
                      {post.excerpt}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.85rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--neon-cyan)',
                      }}
                    >
                      <span>READ STORY</span>
                      <span>→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Table Reservation & Visit Callout */}
        <div
          style={{
            marginTop: '4rem',
            padding: '2.5rem',
            backgroundColor: 'rgba(17, 26, 43, 0.8)',
            border: '1px solid var(--border-diner)',
            borderRadius: '6px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--atomic-yellow)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.35rem',
              }}
            >
              TASTE THE STORIES IN PERSON
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.6rem',
                color: '#FFF',
                margin: 0,
              }}
            >
              Reserve a Booth or Pull Up a Counter Stool
            </h3>
            <p
              style={{
                color: 'var(--text-cream)',
                fontSize: '0.9rem',
                margin: '0.35rem 0 0',
                opacity: 0.85,
              }}
            >
              Experience our chrome plancha smash burgers, triple-malt shakes, and midnight cocktails live.
            </p>
          </div>

          <button
            onClick={openReservation}
            style={{
              padding: '0.85rem 1.85rem',
              backgroundColor: 'var(--cherry-red)',
              color: '#FFF',
              border: 'none',
              borderRadius: '3px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b72832')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--cherry-red)')}
          >
            REQUEST TABLE RESERVATION ↗
          </button>
        </div>
      </div>
    </div>
  );
}
