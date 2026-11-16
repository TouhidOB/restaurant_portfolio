import React, { useEffect, useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchBlogPostDetail } from '../services/api';

export default function BlogPostDetailPage({ slug, onNavigate }) {
  const { blogPosts, openReservationModal } = useCMS();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadPost() {
      // Look in context first
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
      <div style={{ backgroundColor: 'var(--color-midnight)', color: '#F6F4F0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '1.2rem', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.1em' }}>LOADING DISPATCH...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ backgroundColor: 'var(--color-midnight)', color: '#F6F4F0', minHeight: '100vh', paddingTop: '140px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.4rem', marginBottom: '16px' }}>Chronicle Not Found</h1>
        <p style={{ color: 'var(--color-silver)', marginBottom: '24px' }}>The requested dispatch article does not exist or has been archived.</p>
        <button onClick={() => onNavigate && onNavigate('/blog')} className="btn btn-primary">
          Back to Gazette
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--color-midnight)', color: '#F6F4F0', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Article Header */}
      <section style={{ padding: '60px 0 40px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <button
            onClick={() => onNavigate && onNavigate('/blog')}
            style={{ background: 'none', border: 'none', color: 'var(--color-cyan)', fontSize: '0.92rem', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }}
          >
            ← Back to All Chronicles
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ backgroundColor: 'rgba(255, 46, 136, 0.15)', color: 'var(--color-magenta)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(255, 46, 136, 0.3)' }}>
              {post.category_name || post.category || 'Gazette'}
            </span>
            <span style={{ color: 'var(--color-muted)', fontSize: '0.88rem' }}>•</span>
            <span style={{ color: 'var(--color-muted)', fontSize: '0.88rem' }}>{post.published_date || 'November 2026'}</span>
            <span style={{ color: 'var(--color-muted)', fontSize: '0.88rem' }}>•</span>
            <span style={{ color: 'var(--color-muted)', fontSize: '0.88rem' }}>{post.reading_time || '5 min read'}</span>
          </div>

          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', fontWeight: 800, lineHeight: 1.2, color: '#FFFFFF', marginBottom: '20px' }}>
            {post.title}
          </h1>

          {post.excerpt && (
            <p style={{ fontSize: '1.2rem', color: 'var(--color-silver)', lineHeight: 1.7, fontStyle: 'italic', borderLeft: '3px solid var(--color-cyan)', paddingLeft: '20px', margin: '24px 0' }}>
              {post.excerpt}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', border: '1px solid var(--color-border)' }}>
              ✍️
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>{post.author || 'Seoul Street Culinary Team'}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)' }}>Hongdae Kitchen Dispatch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section style={{ padding: '40px 0 20px 0' }}>
          <div className="container" style={{ maxWidth: '960px' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-border)', maxHeight: '520px' }}>
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
        <div className="container" style={{ maxWidth: '800px' }}>
          <div
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.85,
              color: '#D8D8D8',
            }}
          >
            {post.content ? (
              post.content.split('\n\n').map((para, idx) => (
                <p key={idx} style={{ marginBottom: '1.6rem' }}>
                  {para}
                </p>
              ))
            ) : (
              <p>Content is being drafted by our editorial team.</p>
            )}
          </div>

          {/* Author Bio Box */}
          <div style={{ marginTop: '60px', padding: '36px', borderRadius: '16px', backgroundColor: 'var(--color-charcoal)', border: '1px solid var(--color-border)', display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0, border: '1px solid var(--color-magenta)' }}>
              🏮
            </div>
            <div>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '6px' }}>
                About the Hongdae Dispatch
              </h4>
              <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Written from behind the smoking wok line and the vinyl-tented tables of Seoul Street. We document the flavors, street characters, and late-night culinary heritage of Mapo-gu.
              </p>
            </div>
          </div>

          {/* Reservation Call to Action */}
          <div style={{ marginTop: '40px', padding: '40px 32px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(255, 46, 136, 0.15), rgba(33, 212, 232, 0.15))', border: '1px solid rgba(255, 46, 136, 0.3)', textAlign: 'center' }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '10px' }}>
              Taste These Flavors Tonight
            </h3>
            <p style={{ color: 'var(--color-silver)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 24px auto' }}>
              Reserve your table at Seoul Street and let our master chefs prepare these traditional and modernized pocha dishes hot off the woks.
            </p>
            <button
              onClick={() => openReservationModal && openReservationModal('Gazette Experience')}
              className="btn btn-primary"
              style={{ padding: '14px 36px', fontSize: '1rem', fontWeight: 700, borderRadius: '8px' }}
            >
              Reserve Table at Seoul Street
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
