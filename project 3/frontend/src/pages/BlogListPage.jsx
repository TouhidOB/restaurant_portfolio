import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { BookOpen, Calendar, Clock, ArrowRight, Search, Sparkles } from 'lucide-react';

export default function BlogListPage() {
  const { blogPosts, blogCategories } = useCMS();
  const [selectedCat, setSelectedCat] = useState('all');
  const [search, setSearch] = useState('');

  const filteredPosts = (blogPosts || []).filter((post) => {
    const matchesCat =
      selectedCat === 'all' ||
      post.category_slug === selectedCat ||
      (post.category && post.category.slug === selectedCat);
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredPost = filteredPosts.find((p) => p.is_featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div style={{ paddingTop: '100px', backgroundColor: '#FCFBF8', minHeight: '100vh', color: '#1C2022' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 60px', background: 'linear-gradient(180deg, #F5F2EA 0%, #FCFBF8 100%)', borderBottom: '1px solid #E2DAD0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(197, 160, 89, 0.15)', border: '1px solid rgba(197, 160, 89, 0.4)', color: '#9E7B36', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '16px' }}>
            <BookOpen size={13} />
            <span>The Mediterranean Journal</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#081721', lineHeight: 1.15, marginBottom: '18px', fontWeight: 600 }}>
            Chronicles of Sea, Stone & Season
          </h1>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#5C6366', maxWidth: '680px', margin: '0 auto 28px' }}>
            Reflections from Executive Chef Matteo Bellini, harvest stories from Positano fishermen, and sommelier essays on pre-phylloxera volcanic terroirs.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section style={{ padding: '20px 0', borderBottom: '1px solid #E2DAD0', background: '#FFFFFF', position: 'sticky', top: '70px', zIndex: 100 }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            <button
              onClick={() => setSelectedCat('all')}
              style={{
                padding: '7px 16px',
                borderRadius: '20px',
                border: selectedCat === 'all' ? '1px solid #C5A059' : '1px solid #E2DAD0',
                background: selectedCat === 'all' ? '#081721' : '#FAF8F4',
                color: selectedCat === 'all' ? '#E0C184' : '#5C6366',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              All Chronicles ({(blogPosts || []).length})
            </button>
            {(blogCategories || []).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.slug)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  border: selectedCat === cat.slug ? '1px solid #C5A059' : '1px solid #E2DAD0',
                  background: selectedCat === cat.slug ? '#081721' : '#FAF8F4',
                  color: selectedCat === cat.slug ? '#E0C184' : '#5C6366',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={15} color="#7A7E80" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search essays & stories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '7px 12px 7px 34px', border: '1px solid #E2DAD0', borderRadius: '20px', fontSize: '13px', outline: 'none' }}
            />
          </div>
        </div>
      </section>

      {/* Main Blog Content */}
      <section style={{ padding: '60px 0 90px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Featured Article Card */}
          {featuredPost && (
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2DAD0',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(8, 23, 33, 0.05)',
                marginBottom: '50px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              }}
            >
              <div style={{ height: '380px', overflow: 'hidden' }}>
                <img
                  src={featuredPost.cover_image_url || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop'}
                  alt={featuredPost.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono, monospace)', color: '#9E7B36', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
                    ★ Featured Story
                  </span>
                  <span style={{ color: '#C5A059' }}>•</span>
                  <span style={{ fontSize: '11px', color: '#7A7E80', fontFamily: 'var(--font-mono, monospace)' }}>
                    {featuredPost.read_time_minutes || 5} min read
                  </span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', color: '#081721', lineHeight: 1.2, marginBottom: '14px' }}>
                  <a href={`/blog/${featuredPost.slug}`} style={{ textDecoration: 'none', color: '#081721' }}>
                    {featuredPost.title}
                  </a>
                </h2>

                <p style={{ fontSize: '1rem', lineHeight: 1.65, color: '#5C6366', marginBottom: '24px' }}>
                  {featuredPost.excerpt}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F0ECE4', paddingTop: '18px' }}>
                  <div style={{ fontSize: '12.5px', color: '#081721', fontWeight: 600 }}>
                    By {featuredPost.author_name}
                  </div>
                  <a
                    href={`/blog/${featuredPost.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#C5A059',
                      fontWeight: 700,
                      fontSize: '12.5px',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono, monospace)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Read Story <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
            {regularPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2DAD0',
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(8, 23, 33, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <img
                    src={post.cover_image_url || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop'}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono, monospace)', color: '#2A6F85', textTransform: 'uppercase', fontWeight: 700 }}>
                      {post.category_name || 'Mediterranean Essay'}
                    </span>
                    <span style={{ fontSize: '11px', color: '#7A7E80', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {post.read_time_minutes || 5} min
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.45rem', color: '#081721', lineHeight: 1.25, marginBottom: '10px' }}>
                    <a href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: '#081721' }}>
                      {post.title}
                    </a>
                  </h3>

                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#5C6366', marginBottom: '20px', flex: 1 }}>
                    {post.excerpt}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F0ECE4', paddingTop: '14px' }}>
                    <span style={{ fontSize: '12px', color: '#7A7E80' }}>
                      {post.author_name}
                    </span>
                    <a
                      href={`/blog/${post.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#C5A059',
                        fontWeight: 700,
                        fontSize: '12px',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-mono, monospace)',
                      }}
                    >
                      Read <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#7A7E80' }}>
              <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif, serif)' }}>No stories found matching your filter.</p>
              <button onClick={() => { setSelectedCat('all'); setSearch(''); }} className="btn-outline" style={{ marginTop: '12px', padding: '8px 20px' }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
