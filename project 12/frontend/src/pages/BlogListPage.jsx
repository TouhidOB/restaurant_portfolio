import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';

export default function BlogListPage({ onNavigate }) {
  const { blogPosts = [], blogCategories = [] } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    if (blogCategories && blogCategories.length > 0) return blogCategories;
    return [
      { id: 1, name: 'Coastal Terroir', slug: 'coastal-terroir' },
      { id: 2, name: 'Villa Heritage', slug: 'villa-heritage' },
      { id: 3, name: 'Wine Cellar', slug: 'wine-cellar' },
    ];
  }, [blogCategories]);

  const posts = useMemo(() => {
    if (blogPosts && blogPosts.length > 0) return blogPosts;
    return [
      {
        id: 1,
        title: "Wild Mediterranean Turbot & Crag Herbs of Cap-Ferrat",
        slug: "wild-mediterranean-turbot-crag-herbs-cap-ferrat",
        excerpt: "An intimate dawn expedition with artisanal line fishermen off the limestone cliffs of Saint-Jean-Cap-Ferrat.",
        published_at: "2026-11-15",
        read_time: "5 min read",
        author_name: "Antoine Laurent",
        category_name: "Coastal Terroir",
        category_slug: "coastal-terroir",
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=85",
      },
      {
        id: 2,
        title: "Restoring the 1928 Limestone Arches of Villa Riviera",
        slug: "restoring-1928-limestone-arches-villa-riviera",
        excerpt: "How master stonemasons revived the double-height Mediterranean portico using hand-quarried Provençal rock.",
        published_at: "2026-11-10",
        read_time: "7 min read",
        author_name: "Eléonore de Saint-Roch",
        category_name: "Villa Heritage",
        category_slug: "villa-heritage",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=85",
      }
    ];
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return posts;
    return posts.filter(
      (p) =>
        p.category_slug === selectedCategory ||
        (p.category && (p.category.slug === selectedCategory || p.category.name === selectedCategory))
    );
  }, [posts, selectedCategory]);

  return (
    <div style={{ backgroundColor: '#18252E', color: '#F7F3EA', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 58, 72, 0.65) 0%, #18252E 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(233, 223, 207, 0.2)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#B96F4F',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            THE RIVIERA GAZETTE
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              letterSpacing: '0.03em',
              color: '#F7F3EA',
              margin: '0.6rem 0 1.25rem',
            }}
          >
            Dispatches from the Cap-Ferrat Terroir
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#B96F4F', margin: '1rem auto' }} />
          <p style={{ color: '#E9DFCF', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            Essays on wild marine harvests, heritage architectural conservation, and rare vintages curated by our sommelier team.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '3.5rem auto 6rem', padding: '0 1.5rem' }}>
        {/* Category Filters */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            justifyContent: 'center',
            marginBottom: '3.5rem',
          }}
        >
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '8px 20px',
              borderRadius: '24px',
              border: selectedCategory === 'all' ? '1px solid #B96F4F' : '1px solid rgba(233, 223, 207, 0.2)',
              backgroundColor: selectedCategory === 'all' ? '#B96F4F' : '#263A48',
              color: selectedCategory === 'all' ? '#FFFFFF' : '#E9DFCF',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            All Dispatches ({posts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id || cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              style={{
                padding: '8px 20px',
                borderRadius: '24px',
                border: selectedCategory === cat.slug ? '1px solid #B96F4F' : '1px solid rgba(233, 223, 207, 0.2)',
                backgroundColor: selectedCategory === cat.slug ? '#B96F4F' : '#263A48',
                color: selectedCategory === cat.slug ? '#FFFFFF' : '#E9DFCF',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
          {filteredPosts.map((post) => {
            const catName = post.category_name || (post.category && post.category.name) || 'Gazette';
            const author = post.author_name || 'Villa Riviera Brigade';
            const readTime = post.read_time || '5 min read';
            const img = post.image || 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=85';

            return (
              <article
                key={post.id || post.slug}
                onClick={() => onNavigate && onNavigate(`/blog/${post.slug}`)}
                style={{
                  backgroundColor: '#263A48',
                  borderRadius: '6px',
                  border: '1px solid rgba(233, 223, 207, 0.2)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 14px 28px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.borderColor = '#B96F4F';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(233, 223, 207, 0.2)';
                }}
              >
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={img}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'rgba(24, 37, 46, 0.85)',
                      backdropFilter: 'blur(4px)',
                      color: '#B96F4F',
                      padding: '4px 10px',
                      borderRadius: '3px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {catName}
                  </div>
                </div>

                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.78rem', color: '#A9BDB5', marginBottom: '0.6rem' }}>
                    {post.published_at || 'November 2026'} • {readTime}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display, "Cormorant Garamond")',
                      fontSize: '1.5rem',
                      color: '#F7F3EA',
                      marginBottom: '0.75rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      color: '#E9DFCF',
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      flex: 1,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(233, 223, 207, 0.1)',
                      paddingTop: '0.85rem',
                      fontSize: '0.82rem',
                    }}
                  >
                    <span style={{ color: '#E9DFCF' }}>By {author}</span>
                    <span style={{ color: '#B96F4F', fontWeight: 600 }}>Read Article →</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
