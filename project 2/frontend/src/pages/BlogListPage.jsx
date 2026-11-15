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
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#141715', color: '#F2EFE6' }}>
      {/* Editorial Hero Header */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(4rem, 7vw, 7rem) 0 4rem',
          borderBottom: '1px solid rgba(182, 161, 123, 0.25)',
          background: 'linear-gradient(180deg, rgba(26, 30, 27, 0.98) 0%, rgba(20, 23, 21, 0.98) 100%)',
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
              color: '#B6A17B',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(242, 239, 230, 0.7)',
                cursor: 'pointer',
                padding: 0,
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
              }}
            >
              HOME (ALL SECTIONS)
            </button>
            <span>/</span>
            <span style={{ color: '#C9B896' }}>THE ZEN JOURNAL</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              円 THE ENSO CHRONICLES & PHILOSOPHY
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display, Cormorant Garamond)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: '#F2EFE6',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              Essays on Knife Discipline, Cedar & Stillness.
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.85)', maxWidth: '720px' }}>
              Explore the culinary heritage, tea ceremonies, and spatial architecture of ENSO through thoughtfully penned essays by Master Kenji Sato and our culinary council.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section style={{ backgroundColor: '#1A1E1B', borderBottom: '1px solid rgba(182, 161, 123, 0.15)', padding: '1.5rem 0', position: 'sticky', top: '70px', zIndex: 100, backdropFilter: 'blur(10px)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => setSelectedCategory('ALL')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: selectedCategory === 'ALL' ? '#B6A17B' : 'rgba(20, 23, 21, 0.6)',
                  color: selectedCategory === 'ALL' ? '#141715' : '#F2EFE6',
                  border: selectedCategory === 'ALL' ? '1px solid #B6A17B' : '1px solid rgba(182, 161, 123, 0.25)',
                  borderRadius: '2px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                ALL ARTICLES
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id || cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: selectedCategory === cat.slug ? '#B6A17B' : 'rgba(20, 23, 21, 0.6)',
                    color: selectedCategory === cat.slug ? '#141715' : '#F2EFE6',
                    border: selectedCategory === cat.slug ? '1px solid #B6A17B' : '1px solid rgba(182, 161, 123, 0.25)',
                    borderRadius: '2px',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div style={{ position: 'relative', minWidth: '260px' }}>
              <input
                type="text"
                placeholder="Search articles, matcha, knife..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 34px',
                  backgroundColor: '#141715',
                  border: '1px solid rgba(182, 161, 123, 0.3)',
                  borderRadius: '2px',
                  color: '#F2EFE6',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
              <Search size={15} style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#B6A17B' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article Card */}
      {featuredPost && (
        <section style={{ padding: '4rem 0 2rem' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <div
              onClick={() => onNavigatePost(featuredPost.slug)}
              style={{
                backgroundColor: '#1A1E1B',
                border: '1px solid rgba(182, 161, 123, 0.35)',
                borderRadius: '2px',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#B6A17B';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(182, 161, 123, 0.35)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ minHeight: '360px', overflow: 'hidden' }}>
                <img
                  src={featuredPost.cover_image_url || 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200&auto=format&fit=crop'}
                  alt={featuredPost.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                  <span style={{ backgroundColor: '#69745B', color: '#F2EFE6', padding: '3px 8px', borderRadius: '2px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    FEATURED ESSAY
                  </span>
                  <span style={{ color: '#B6A17B', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                    {featuredPost.category_name}
                  </span>
                  <span style={{ color: '#8E968F', fontSize: '12px' }}>• {featuredPost.read_time_minutes} min read</span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '2.2rem', color: '#F2EFE6', lineHeight: 1.25, margin: '0 0 1rem' }}>
                  {featuredPost.title}
                </h2>
                <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(242, 239, 230, 0.8)', marginBottom: '1.5rem' }}>
                  {featuredPost.excerpt}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid rgba(182, 161, 123, 0.15)' }}>
                  <span style={{ fontSize: '13px', color: '#8E968F' }}>By {featuredPost.author_name}</span>
                  <span style={{ color: '#B6A17B', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Read Full Essay <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section style={{ padding: '3rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {listPosts.map((post) => (
              <div
                key={post.id || post.slug}
                onClick={() => onNavigatePost(post.slug)}
                style={{
                  backgroundColor: '#1A1E1B',
                  border: '1px solid rgba(182, 161, 123, 0.2)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#B6A17B';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(182, 161, 123, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img
                    src={post.cover_image_url || 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop'}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#B6A17B', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                      {post.category_name}
                    </span>
                    <span style={{ color: '#8E968F', fontSize: '11px' }}>{post.read_time_minutes} min read</span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '1.45rem', color: '#F2EFE6', lineHeight: 1.3, margin: '0 0 10px' }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(242, 239, 230, 0.75)', flex: 1, marginBottom: '16px' }}>
                    {post.excerpt}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(182, 161, 123, 0.15)', fontSize: '12px', color: '#8E968F' }}>
                    <span>By {post.author_name}</span>
                    <span style={{ color: '#B6A17B', fontWeight: 600 }}>Read Essay →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {posts.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: '#8E968F' }}>
              <p style={{ fontSize: '16px' }}>No journal essays found matching your search.</p>
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                style={{
                  marginTop: '1rem',
                  padding: '10px 20px',
                  backgroundColor: '#B6A17B',
                  color: '#141715',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
