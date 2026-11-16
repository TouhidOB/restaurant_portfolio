import React, { useEffect, useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchBlogPostDetail } from '../services/api';

export default function BlogPostDetailPage({ slug, onNavigate }) {
  const { blogPosts, openReservation, openReservationModal } = useCMS();
  const triggerReservation = openReservationModal || openReservation;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadPost() {
      const found = blogPosts.find(p => p.slug === slug);
      if (found) {
        setPost(found);
        setLoading(false);
      }
      try {
        const res = await fetchBlogPostDetail(slug);
        if (res && isMounted) {
          setPost(res);
          setLoading(false);
        }
      } catch (err) {
        console.warn('Could not fetch blog post from API, using fallback', err);
        if (isMounted) setLoading(false);
      }
    }
    loadPost();
    return () => { isMounted = false; };
  }, [slug, blogPosts]);

  if (loading) {
    return (
      <div style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>LOADING GAZETTE ARTICLE...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '140px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', marginBottom: '16px' }}>Article Not Found</h1>
        <p style={{ color: 'var(--color-taupe)', marginBottom: '24px' }}>The requested journal article does not exist or has been archived.</p>
        <button onClick={() => onNavigate && onNavigate('/blog')} className="btn btn-bronze">
          Back to Gazette
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Article Header */}
      <section style={{ padding: '60px 0 40px 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="section-container" style={{ maxWidth: '840px', margin: '0 auto', padding: '0 24px' }}>
          <button
            onClick={() => onNavigate && onNavigate('/blog')}
            style={{ background: 'none', border: 'none', color: 'var(--color-champagne)', fontSize: '12px', fontFamily: 'var(--font-heading)', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }}
          >
            ← Return to Gazette
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ background: 'rgba(148, 115, 79, 0.15)', color: 'var(--color-champagne)', padding: '4px 12px', borderRadius: '2px', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-heading)' }}>
              {post.category_name || post.category || 'Gazette'}
            </span>
            <span style={{ color: 'var(--color-taupe)', fontSize: '12px' }}>•</span>
            <span style={{ color: 'var(--color-taupe)', fontSize: '12px' }}>{post.published_date || 'November 2026'}</span>
            <span style={{ color: 'var(--color-taupe)', fontSize: '12px' }}>•</span>
            <span style={{ color: 'var(--color-taupe)', fontSize: '12px' }}>{post.reading_time || '5 min read'}</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', fontWeight: 600, lineHeight: 1.2, color: 'var(--color-ivory)', marginBottom: '24px' }}>
            {post.title}
          </h1>

          {post.excerpt && (
            <p style={{ fontSize: '1.2rem', color: 'var(--color-taupe)', lineHeight: 1.75, fontStyle: 'italic', borderLeft: '3px solid var(--color-bronze)', paddingLeft: '20px', margin: '24px 0' }}>
              {post.excerpt}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', border: '1px solid var(--border-subtle)' }}>
              🥩
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-ivory)' }}>{post.author || 'Charred & Prime Editorial Team'}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-taupe)' }}>Midtown East Cellar & Hearth Dispatch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section style={{ padding: '40px 0 20px 0' }}>
          <div className="section-container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-subtle)', maxHeight: '520px', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
              <img
                src={post.featured_image}
                alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Body Content */}
      <section style={{ padding: '40px 0 80px 0' }}>
        <div className="section-container" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.9,
              color: '#EDE5D8',
            }}
          >
            {post.content ? (
              post.content.split('\n\n').map((para, idx) => (
                <p key={idx} style={{ marginBottom: '1.8rem' }}>
                  {para}
                </p>
              ))
            ) : (
              <p>Content is being drafted by our cellar editorial team.</p>
            )}
          </div>

          {/* Author Bio Box */}
          <div style={{ marginTop: '60px', padding: '36px', borderRadius: '4px', backgroundColor: 'var(--color-charcoal)', border: '1px solid var(--border-subtle)', display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-obsidian)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0, border: '1px solid var(--color-bronze)' }}>
              🍷
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-ivory)', marginBottom: '6px' }}>
                About the Charred & Prime Gazette
              </h4>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Written directly from behind our Himalayan salt-brick aging cave, live hardwood Argentine hearths, and the 2,400-bottle subterranean wine vault in Manhattan Midtown East.
              </p>
            </div>
          </div>

          {/* Reservation Call to Action */}
          <div style={{ marginTop: '40px', padding: '44px 32px', borderRadius: '4px', background: 'var(--color-charcoal)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-ivory)', marginBottom: '10px' }}>
              Taste These Flavors Tonight
            </h3>
            <p style={{ color: 'var(--color-taupe)', fontSize: '1rem', lineHeight: 1.65, maxWidth: '560px', margin: '0 auto 24px auto' }}>
              Reserve your table at Charred & Prime and let our master butchers, hearth pitmasters, and sommeliers prepare these cuts for your party.
            </p>
            <button
              onClick={() => triggerReservation('Gazette Story Booking')}
              style={{ padding: '14px 36px', background: 'var(--color-bronze)', border: 'none', borderRadius: '2px', color: '#101010', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              Reserve Table at Charred & Prime
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
