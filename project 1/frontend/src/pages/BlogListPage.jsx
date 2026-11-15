import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchBlogPosts } from '../services/api';
import { Search, Calendar, Clock, User, ArrowRight, Sparkles } from 'lucide-react';

export default function BlogListPage({ onNavigateHome, onNavigatePost }) {
  const { config, blogPosts: initialPosts, blogCategories: initialCategories, openReservation } = useCMS();
  const [posts, setPosts] = useState(initialPosts || []);
  const [categories, setCategories] = useState(initialCategories || []);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories);
    }
  }, [initialCategories]);

  const isDefaultView = selectedCategory === 'ALL' && !searchQuery.trim();
  const featuredPost = isDefaultView ? (posts.find((p) => p.is_featured) || posts[0]) : null;
  const listPosts = featuredPost ? posts.filter((p) => p.id !== featuredPost.id) : posts;

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#0D0F10', color: '#F3EDE1' }}>
      {/* Editorial Hero Header */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(4rem, 7vw, 7rem) 0 4rem',
          borderBottom: '1px solid rgba(214, 184, 121, 0.25)',
          background: 'linear-gradient(180deg, rgba(18, 59, 53, 0.95) 0%, rgba(13, 15, 16, 0.98) 100%)',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#D6B879',
              marginBottom: '2rem',
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(243, 237, 225, 0.7)',
                cursor: 'pointer',
                padding: 0,
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D6B879')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(243, 237, 225, 0.7)')}
            >
              HOME (ALL SECTIONS)
            </button>
            <span>/</span>
            <span style={{ color: '#E8D3A2' }}>THE AURELIA JOURNAL</span>
          </div>

          <div style={{ maxWidth: '820px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#D6B879',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                borderBottom: '1px solid #D6B879',
                paddingBottom: '4px',
              }}
            >
              <Sparkles size={13} />
              GASTRONOMIC CHRONICLES & CELLAR ARCHIVES
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display, Bodoni Moda)',
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                color: '#D6B879',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
                textShadow: '0 0 30px rgba(214, 184, 121, 0.2)',
              }}
            >
              The Aurelia Journal.
            </h1>
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                color: 'rgba(243, 237, 225, 0.85)',
                maxWidth: '680px',
              }}
            >
              Essays on culinary mastery, dry-aged beef butchery, 1920s Art Deco architecture, grower champagnes, and the cultural heritage behind our grand dining salon.
            </p>
          </div>
        </div>
      </section>

      {/* Main Journal Container */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 24px 6rem' }}>
        {/* Search & Topic Filters */}
        <div
          style={{
            backgroundColor: 'rgba(18, 59, 53, 0.45)',
            border: '1px solid rgba(214, 184, 121, 0.3)',
            borderRadius: '4px',
            padding: '1.5rem 2rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              overflowX: 'auto',
              paddingBottom: '1rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid rgba(214, 184, 121, 0.2)',
            }}
          >
            <button
              onClick={() => setSelectedCategory('ALL')}
              style={{
                fontFamily: 'var(--font-display, Bodoni Moda)',
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '8px 18px',
                borderRadius: '2px',
                border: `1px solid ${selectedCategory === 'ALL' ? '#D6B879' : 'rgba(214, 184, 121, 0.3)'}`,
                backgroundColor: selectedCategory === 'ALL' ? '#D6B879' : 'transparent',
                color: selectedCategory === 'ALL' ? '#123B35' : '#F3EDE1',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              ALL TOPICS ({posts.length})
            </button>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id || cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  style={{
                    fontFamily: 'var(--font-display, Bodoni Moda)',
                    fontSize: '12px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '8px 18px',
                    borderRadius: '2px',
                    border: `1px solid ${isActive ? '#D6B879' : 'rgba(214, 184, 121, 0.3)'}`,
                    backgroundColor: isActive ? '#D6B879' : 'transparent',
                    color: isActive ? '#123B35' : '#F3EDE1',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
            <Search
              size={17}
              color="#D6B879"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search journals by keyword, ingredient, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 46px',
                backgroundColor: 'rgba(13, 15, 16, 0.85)',
                border: '1px solid rgba(214, 184, 121, 0.35)',
                color: '#FFFFFF',
                fontSize: '14px',
                borderRadius: '2px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Featured Post Hero */}
        {featuredPost && (
          <div
            onClick={() => onNavigatePost(featuredPost.slug)}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2.5rem',
              backgroundColor: 'rgba(18, 59, 53, 0.35)',
              border: '1px solid #D6B879',
              borderRadius: '4px',
              padding: '2.5rem',
              marginBottom: '4rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(214, 184, 121, 0.15)';
              e.currentTarget.style.borderColor = '#E8D3A2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#D6B879';
            }}
          >
            <div style={{ minHeight: '300px', maxHeight: '420px', borderRadius: '2px', overflow: 'hidden' }}>
              <img
                src={featuredPost.resolved_cover || featuredPost.cover_image}
                alt={featuredPost.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <span
                  style={{
                    backgroundColor: '#D6B879',
                    color: '#123B35',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: '2px',
                  }}
                >
                  FEATURED DISPATCH
                </span>
                <span style={{ fontSize: '12px', color: '#D6B879' }}>
                  {featuredPost.category_name}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display, Bodoni Moda)',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  color: '#D6B879',
                  lineHeight: 1.2,
                  marginBottom: '1rem',
                }}
              >
                {featuredPost.title}
              </h2>

              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'rgba(243, 237, 225, 0.8)',
                  marginBottom: '1.5rem',
                }}
              >
                {featuredPost.excerpt}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(214, 184, 121, 0.25)',
                  paddingTop: '1rem',
                }}
              >
                <div style={{ fontSize: '13px', color: 'rgba(243, 237, 225, 0.7)' }}>
                  By {featuredPost.author_name} • {featuredPost.read_time_minutes} min read
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#D6B879',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                  }}
                >
                  READ STORY <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {listPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigatePost(post.slug)}
              style={{
                backgroundColor: 'rgba(18, 59, 53, 0.3)',
                border: '1px solid rgba(214, 184, 121, 0.25)',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#D6B879';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(214, 184, 121, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(214, 184, 121, 0.25)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img
                  src={post.resolved_cover || post.cover_image}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#D6B879', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {post.category_name}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display, Bodoni Moda)',
                      fontSize: '1.35rem',
                      color: '#F3EDE1',
                      lineHeight: 1.3,
                      marginBottom: '10px',
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: 'rgba(243, 237, 225, 0.75)',
                      marginBottom: '16px',
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(214, 184, 121, 0.15)',
                    paddingTop: '12px',
                    fontSize: '12px',
                    color: 'rgba(243, 237, 225, 0.6)',
                  }}
                >
                  <span>{post.read_time_minutes} min read</span>
                  <span style={{ color: '#D6B879', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search Result */}
        {listPosts.length === 0 && !featuredPost && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(243, 237, 225, 0.7)' }}>
            <h3 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', color: '#D6B879', marginBottom: '12px' }}>
              No dispatches found matching your search.
            </h3>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #D6B879',
                color: '#D6B879',
                padding: '10px 20px',
                cursor: 'pointer',
              }}
            >
              Reset Search Filter
            </button>
          </div>
        )}

        {/* Bottom VIP Reservation Banner */}
        <div
          style={{
            marginTop: '5rem',
            padding: '3rem 2.5rem',
            backgroundColor: 'rgba(18, 59, 53, 0.65)',
            border: '1px solid #D6B879',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display, Bodoni Moda)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: '#D6B879',
              marginBottom: '1rem',
            }}
          >
            Experience Aurelia in Person.
          </h2>
          <p
            style={{
              maxWidth: '600px',
              margin: '0 auto 2rem',
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(243, 237, 225, 0.85)',
            }}
          >
            Join us in the Grand Dining Salon or reserve an intimate table in the Champagne Parlour for lunch or dinner service.
          </p>
          <button
            onClick={() => openReservation()}
            style={{
              padding: '14px 32px',
              backgroundColor: '#123B35',
              border: '1px solid #D6B879',
              color: '#D6B879',
              fontFamily: 'var(--font-display, Bodoni Moda)',
              fontSize: '13px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            RESERVE A TABLE
          </button>
        </div>
      </div>
    </div>
  );
}
