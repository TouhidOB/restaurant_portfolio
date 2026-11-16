import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchBlogPosts } from '../services/api';

export default function BlogListPage({ onNavigate }) {
  const { content, lang, t, blogPosts, blogCategories } = useCMS();
  const [posts, setPosts] = useState(blogPosts || content?.blog_posts || []);
  const [categories, setCategories] = useState(blogCategories || content?.blog_categories || []);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const data = await fetchBlogPosts();
        if (data && data.length > 0) {
          setPosts(data);
        }
      } catch (err) {
        console.warn('Error loading posts from API, using fallback data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter((p) => {
        const catSlug = typeof p.category === 'object' ? p.category?.slug : p.category;
        return catSlug === activeCategory;
      });

  const navigateToPost = (slug) => {
    if (onNavigate) {
      onNavigate(`/blog/${slug}`);
    } else {
      window.history.pushState({}, '', `/blog/${slug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div style={{ backgroundColor: '#1A2536', color: '#F4EBDD', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(166, 83, 59, 0.25) 0%, #1A2536 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#D4AF37',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {lang === 'bn' ? 'বাংলার হেরিটেজ জার্নাল ও গবেষণা' : 'BENGAL HERITAGE &bull; EDITORIAL JOURNAL'}
          </span>
          <h1
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
              fontSize: '3.5rem',
              letterSpacing: '0.04em',
              color: '#F4EBDD',
              margin: '0.8rem 0 1.25rem',
            }}
          >
            {lang === 'bn' ? 'ঐতিহ্য রন্ধন ও ইতিহাস জার্নাল' : 'The Bengal Heritage Gazette'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#D4AF37', margin: '1rem auto' }} />
          <p style={{ color: '#C8B18D', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {lang === 'bn'
              ? 'পদ্মার ইলিশের রহস্য, শতবর্ষী জমিদারী ভোজ ও দেশীয় মশলার লোকজ ইতিহাস নিয়ে গবেষণা নিবন্ধ।'
              : 'Chronicles of river-delta gastronomy, lost zamindari banquets, terracotta architecture, and ancestral culinary secrets.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Category Filter Tabs */}
        {categories.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                padding: '0.65rem 1.4rem',
                backgroundColor: activeCategory === 'all' ? '#A6533B' : '#223046',
                color: activeCategory === 'all' ? '#F4EBDD' : '#C8B18D',
                border: activeCategory === 'all' ? '1px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '2px',
                fontSize: '0.85rem',
                fontWeight: activeCategory === 'all' ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {lang === 'bn' ? 'সকল প্রবন্ধ' : 'All Chronicles'}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id || cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                style={{
                  padding: '0.65rem 1.4rem',
                  backgroundColor: activeCategory === cat.slug ? '#A6533B' : '#223046',
                  color: activeCategory === cat.slug ? '#F4EBDD' : '#C8B18D',
                  border: activeCategory === cat.slug ? '1px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '2px',
                  fontSize: '0.85rem',
                  fontWeight: activeCategory === cat.slug ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Post Grid */}
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#223046', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <p style={{ color: '#C8B18D', fontSize: '1.1rem' }}>
              {lang === 'bn' ? 'কোনো প্রবন্ধ পাওয়া যায়নি।' : 'No editorial chronicles found in this category.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {filteredPosts.map((post, idx) => {
              const catName = post.category_name || (typeof post.category === 'object' ? post.category?.name : post.category) || 'Gastronomy';
              const readTime = post.reading_time_minutes ? `${post.reading_time_minutes} min read` : '5 min read';

              return (
                <article
                  key={post.id || idx}
                  onClick={() => navigateToPost(post.slug)}
                  style={{
                    backgroundColor: '#223046',
                    borderRadius: '4px',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = '#D4AF37';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)';
                  }}
                >
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={post.featured_image || 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=85'}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#A6533B',
                        color: '#F4EBDD',
                        padding: '4px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        borderRadius: '2px',
                      }}
                    >
                      {catName}
                    </span>
                  </div>

                  <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.78rem', color: '#D4AF37' }}>
                      <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Nov 2026'}</span>
                      <span>&bull; {readTime}</span>
                    </div>

                    <h2
                      style={{
                        fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
                        fontSize: '1.45rem',
                        color: '#F4EBDD',
                        lineHeight: 1.3,
                        marginBottom: '0.85rem',
                        fontWeight: 600,
                      }}
                    >
                      {post.title}
                    </h2>

                    <p style={{ color: '#C8B18D', fontSize: '0.9rem', lineHeight: 1.6, flex: 1, marginBottom: '1.5rem' }}>
                      {post.excerpt}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <span style={{ fontSize: '0.8rem', color: '#F4EBDD', fontWeight: 600 }}>
                        By {post.author_name || 'Chef Ananya Sen'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#D4AF37', fontWeight: 700 }}>
                        {lang === 'bn' ? 'পড়ুন &rarr;' : 'Read Article &rarr;'}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
