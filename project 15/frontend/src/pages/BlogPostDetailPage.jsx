import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { fetchBlogPostDetail } from '../services/api';
import { ArrowLeft, Sparkles, Clock, Calendar, Share2, Bookmark } from 'lucide-react';

export default function BlogPostDetailPage({ slug, onNavigate }) {
  const { blogPosts, openReservation, openReservationModal, setIsReservationModalOpen } = useCMS();
  const triggerReservation = openReservationModal || openReservation || (() => setIsReservationModalOpen(true));

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check locally first
    const localMatch = (blogPosts || []).find((p) => p.slug === slug);
    if (localMatch) {
      setPost(localMatch);
      setLoading(false);
    }

    // Also fetch from API
    fetchBlogPostDetail(slug)
      .then((data) => {
        if (data && (data.post || data.id)) {
          setPost(data.post || data);
        }
      })
      .catch((err) => console.warn('Could not fetch blog detail:', err))
      .finally(() => setLoading(false));
  }, [slug, blogPosts]);

  if (loading && !post) {
    return (
      <div style={{ backgroundColor: '#0A0A0C', color: '#FFF', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#8E8EA0', fontFamily: 'Space Grotesk, sans-serif' }}>Loading Gazette Article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ backgroundColor: '#0A0A0C', color: '#FFF', minHeight: '100vh', paddingTop: '140px', textAlign: 'center' }}>
        <h2>Article Not Found</h2>
        <p style={{ color: '#8E8EA0', marginTop: '10px' }}>The requested dispatch does not exist or has been archived.</p>
        <button onClick={() => onNavigate && onNavigate('/blog')} style={{ marginTop: '20px', padding: '10px 24px', background: '#FFDD00', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 700 }}>
          Back to Gazette
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0A0A0C', color: '#FFF', minHeight: '100vh', paddingTop: '110px', paddingBottom: '90px' }}>
      <div style={{ maxWidth: '840px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Navigation back */}
        <div style={{ marginBottom: '32px' }}>
          <a
            href="/blog"
            onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('/blog'); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#FFDD00',
              textDecoration: 'none',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            <ArrowLeft size={16} /> Back to All Dispatches
          </a>
        </div>

        {/* Category & Metadata */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span style={{ background: '#FFDD00', color: '#000', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', padding: '4px 10px', borderRadius: '4px' }}>
            {post.category_name || (post.category && post.category.name) || 'Pop Story'}
          </span>
          <span style={{ color: '#8E8EA0', fontSize: '12px' }}>•</span>
          <span style={{ color: '#8E8EA0', fontSize: '13px' }}>{post.author_name || 'POP! Food Lab Team'}</span>
          <span style={{ color: '#8E8EA0', fontSize: '12px' }}>•</span>
          <span style={{ color: '#8E8EA0', fontSize: '13px' }}>{post.read_time || '4 min read'}</span>
        </div>

        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '24px' }}>
          {post.title}
        </h1>

        {post.excerpt && (
          <p style={{ fontSize: '18px', color: '#B0B0C0', lineHeight: 1.6, marginBottom: '36px', fontStyle: 'italic' }}>
            "{post.excerpt}"
          </p>
        )}

        {/* Hero Image */}
        <div style={{ height: '420px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '40px' }}>
          <img
            src={post.display_image || post.featured_image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Body Text */}
        <div style={{ color: '#E0E0E8', fontSize: '16px', lineHeight: 1.8, marginBottom: '60px' }}>
          {post.content.split('\n\n').map((para, i) => {
            if (para.startsWith('### ')) {
              return <h3 key={i} style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#FFF', margin: '36px 0 16px 0' }}>{para.replace('### ', '')}</h3>;
            }
            if (para.startsWith('#### ')) {
              return <h4 key={i} style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, color: '#FFDD00', margin: '28px 0 12px 0' }}>{para.replace('#### ', '')}</h4>;
            }
            if (para.startsWith('> ')) {
              return (
                <blockquote key={i} style={{ borderLeft: '3px solid #FF007F', paddingLeft: '20px', color: '#FFF', fontStyle: 'italic', margin: '28px 0', fontSize: '18px' }}>
                  {para.replace('> ', '')}
                </blockquote>
              );
            }
            return <p key={i} style={{ marginBottom: '20px' }}>{para}</p>;
          })}
        </div>

        {/* Article Author Box & Reservation CTA */}
        <div style={{ background: '#141418', border: '1px solid rgba(255, 221, 0, 0.3)', borderRadius: '8px', padding: '32px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', marginBottom: '8px' }}>Taste The Creation in Person</h3>
          <p style={{ color: '#8E8EA0', fontSize: '14px', marginBottom: '20px' }}>Reserve a table at POP! Food Studio to taste this recipe live.</p>
          <button
            onClick={() => triggerReservation()}
            style={{ padding: '12px 28px', background: '#FFDD00', color: '#000', border: 'none', borderRadius: '999px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Reserve Table Now &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}
