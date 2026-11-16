import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchBlogPostDetail } from '../services/api';

export default function BlogPostDetailPage({ slug, onNavigate }) {
  const { content, lang, t, openReservation, blogPosts } = useCMS();
  const allPosts = blogPosts || content?.blog_posts || [];
  const [post, setPost] = useState(
    allPosts.find((p) => p.slug === slug) || null
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
    if (onNavigate) {
      onNavigate('/blog');
    } else {
      window.history.pushState({}, '', '/blog');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  if (loading && !post) {
    return (
      <div style={{ backgroundColor: '#1A2536', color: '#F4EBDD', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#D4AF37', fontSize: '1.2rem', fontFamily: 'inherit' }}>
          {lang === 'bn' ? 'প্রবন্ধ লোড হচ্ছে...' : 'Loading Heritage Chronicle...'}
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ backgroundColor: '#1A2536', color: '#F4EBDD', minHeight: '100vh', paddingTop: '150px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display-en, "Cormorant Garamond")', color: '#D4AF37', fontSize: '2.5rem' }}>
          {lang === 'bn' ? 'প্রবন্ধটি পাওয়া যায়নি' : 'Chronicle Not Found'}
        </h2>
        <p style={{ color: '#C8B18D', marginBottom: '2rem' }}>
          {lang === 'bn' ? 'আপনি যে প্রবন্ধটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা বিদ্যমান নেই।' : 'The article you are looking for has been moved or does not exist.'}
        </p>
        <button
          onClick={navigateToBlog}
          style={{
            backgroundColor: '#A6533B',
            color: '#F4EBDD',
            border: 'none',
            padding: '0.85rem 1.8rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            borderRadius: '2px',
            cursor: 'pointer',
          }}
        >
          &larr; {lang === 'bn' ? 'জার্নালে ফিরে যান' : 'Back to Heritage Gazette'}
        </button>
      </div>
    );
  }

  const catName = post.category_name || (typeof post.category === 'object' ? post.category?.name : post.category) || 'Heritage Gastronomy';
  const readTime = post.reading_time_minutes ? `${post.reading_time_minutes} min read` : '5 min read';

  return (
    <div style={{ backgroundColor: '#1A2536', color: '#F4EBDD', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Article Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(166, 83, 59, 0.25) 0%, #1A2536 100%)',
          padding: '4rem 1.5rem 3rem',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <button
            onClick={navigateToBlog}
            style={{
              background: 'none',
              border: 'none',
              color: '#D4AF37',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            &larr; {lang === 'bn' ? 'জার্নাল সূচিতে ফিরে যান' : 'Back to Heritage Journal'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span
              style={{
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
            <span style={{ color: '#D4AF37', fontSize: '0.82rem' }}>
              {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'November 2026'} &bull; {readTime}
            </span>
          </div>

          <h1
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
              fontSize: '3.2rem',
              letterSpacing: '0.02em',
              color: '#F4EBDD',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}
          >
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#A6533B',
                border: '1px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F4EBDD',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              ঐ
            </div>
            <div>
              <div style={{ color: '#F4EBDD', fontWeight: 700, fontSize: '0.95rem' }}>
                {post.author_name || 'Chef Ananya Sen'}
              </div>
              <div style={{ color: '#D4AF37', fontSize: '0.78rem' }}>
                Culinary Director &bull; Bengal Heritage Dining
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '850px', margin: '3.5rem auto 6rem', padding: '0 1.5rem' }}>
        {/* Featured Image */}
        {post.featured_image && (
          <div
            style={{
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '3.5rem',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            }}
          >
            <img
              src={post.featured_image}
              alt={post.title}
              style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        {/* Lead Excerpt */}
        {post.excerpt && (
          <div
            style={{
              fontSize: '1.25rem',
              color: '#D4AF37',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              fontStyle: 'italic',
              borderLeft: '3px solid #D4AF37',
              paddingLeft: '1.5rem',
            }}
          >
            {post.excerpt}
          </div>
        )}

        {/* Article Body */}
        <div
          style={{
            color: '#F4EBDD',
            fontSize: '1.08rem',
            lineHeight: 1.9,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
          }}
        >
          {post.content ? (
            post.content.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx} style={{ margin: 0, color: '#C8B18D' }}>
                {paragraph}
              </p>
            ))
          ) : (
            <p style={{ color: '#C8B18D' }}>
              The full manuscript for this chronicle is being preserved in our culinary archives.
            </p>
          )}
        </div>

        {/* Post Footer & Table Reservation CTA */}
        <div
          style={{
            marginTop: '5rem',
            padding: '3rem 2rem',
            backgroundColor: '#223046',
            borderRadius: '4px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-display-bn, "Noto Serif Bengali")' : 'var(--font-display-en, "Cormorant Garamond")',
              fontSize: '2rem',
              color: '#F4EBDD',
              marginBottom: '0.75rem',
            }}
          >
            {lang === 'bn' ? 'এই অনন্য স্বাদের স্বাদ নিন' : 'Savor These Flavors in Person'}
          </h3>
          <p style={{ color: '#C8B18D', maxWidth: '600px', margin: '0 auto 1.75rem', fontSize: '0.98rem', lineHeight: 1.7 }}>
            {lang === 'bn'
              ? 'আমাদের মাস্টার শেফের তত্বাবধানে ঐতিহাসিক মাটির চুলার রন্ধনশিল্পের স্বাদ নিতে টেবিল সংরক্ষণ করুন।'
              : 'Join us at Bengal Heritage Dining to experience these heirloom culinary arts crafted by Master Chef Ananya Sen.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => openReservation()}
              style={{
                backgroundColor: '#A6533B',
                color: '#F4EBDD',
                border: 'none',
                padding: '0.9rem 2.2rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
            >
              {lang === 'bn' ? 'টেবিল সংরক্ষণ করুন' : 'Reserve a Table'}
            </button>
            <button
              onClick={navigateToBlog}
              style={{
                backgroundColor: 'transparent',
                color: '#D4AF37',
                border: '1px solid #D4AF37',
                padding: '0.9rem 1.8rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
            >
              {lang === 'bn' ? 'অন্যান্য প্রবন্ধ দেখুন' : 'Explore More Chronicles'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
