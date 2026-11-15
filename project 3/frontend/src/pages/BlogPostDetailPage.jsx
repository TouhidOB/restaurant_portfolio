import React, { useState, useEffect } from 'react';
import { fetchBlogPostDetail } from '../services/api';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, Clock, Calendar, User, Share2, BookOpen, ChevronRight } from 'lucide-react';

export default function BlogPostDetailPage({ slug, onNavigateHome }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { openReservation, blogPosts } = useCMS();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchBlogPostDetail(slug)
      .then((data) => {
        if (!mounted) return;
        setPost(data);
        setError(null);
      })
      .catch((err) => {
        if (!mounted) return;
        // Fallback to local posts
        const found = (blogPosts || []).find((p) => p.slug === slug);
        if (found) {
          setPost(found);
          setError(null);
        } else {
          setError(err.message || 'Article not found');
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [slug, blogPosts]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', background: '#FCFBF8' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #E2DAD0', borderTopColor: '#C5A059', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ fontFamily: 'var(--font-serif, serif)', color: '#081721', fontSize: '16px' }}>
          Loading Mediterranean Journal...
        </p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px', background: '#FCFBF8' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '12px', padding: '40px', maxWidth: '540px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', color: '#081721', marginBottom: '12px' }}>Article Not Found</h2>
          <p style={{ color: '#7A7E80', marginBottom: '24px' }}>{error || "The article requested could not be retrieved."}</p>
          <a href="/blog" className="btn-gold" style={{ padding: '10px 24px', textDecoration: 'none', display: 'inline-block' }}>
            ← Return to Journal
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', backgroundColor: '#FCFBF8', minHeight: '100vh', color: '#1C2022' }}>
      {/* Top Breadcrumb Bar */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2DAD0', padding: '12px 24px' }}>
        <div className="container" style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#2A6F85', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
            <ArrowLeft size={16} /> All Journal Chronicles
          </a>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#7A7E80' }}>
            AURA MARINA • POSITANO
          </span>
        </div>
      </div>

      {/* Article Header */}
      <article className="container" style={{ maxWidth: '840px', margin: '0 auto', padding: '50px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#9E7B36', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>
            {post.category_name || 'Mediterranean Essay'}
          </span>

          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', color: '#081721', lineHeight: 1.18, margin: '14px 0 20px', fontWeight: 600 }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', color: '#7A7E80', fontSize: '13px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={15} color="#C5A059" />
              <span style={{ fontWeight: 600, color: '#081721' }}>{post.author_name}</span>
            </div>
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={15} />
              <span>{post.read_time_minutes || 5} min read</span>
            </div>
            {post.published_at && (
              <>
                <span>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={15} />
                  <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Hero Cover Image */}
        <div style={{ height: '460px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2DAD0', boxShadow: '0 10px 30px rgba(8, 23, 33, 0.08)', marginBottom: '40px' }}>
          <img
            src={post.cover_image_url || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop'}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Article Excerpt / Lead */}
        {post.excerpt && (
          <p style={{ fontSize: '1.25rem', lineHeight: 1.65, fontStyle: 'italic', color: '#2A6F85', borderLeft: '3px solid #C5A059', paddingLeft: '20px', margin: '0 0 36px' }}>
            {post.excerpt}
          </p>
        )}

        {/* Article Body Content */}
        <div style={{ fontSize: '1.08rem', lineHeight: 1.85, color: '#33383B', whiteSpace: 'pre-line' }}>
          {post.content}
        </div>

        {/* Author Bio Footer */}
        <div style={{ marginTop: '60px', background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '12px', padding: '28px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #0A1C27 0%, #15384B 100%)', color: '#DFBA73', border: '1px solid #C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif, serif)', fontSize: '22px', fontWeight: 700, flexShrink: 0 }}>
            AM
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#081721', fontSize: '16px' }}>{post.author_name}</div>
            <div style={{ fontSize: '12px', color: '#9E7B36', fontFamily: 'var(--font-mono, monospace)', marginTop: '2px' }}>
              {post.author_role || "Aura Marina Culinary Brigade"}
            </div>
            <p style={{ fontSize: '13px', color: '#5C6366', margin: '6px 0 0' }}>
              Dedicated to celebrating the rich maritime gastronomy, wild catch, and volcanic terroirs of the Amalfi Coast.
            </p>
          </div>
        </div>

        {/* Table Reservation Callout */}
        <div style={{ marginTop: '40px', background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.12) 0%, rgba(42, 111, 133, 0.08) 100%)', border: '1px solid #C5A059', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.8rem', color: '#081721', marginBottom: '8px' }}>
            Taste These Stories Firsthand
          </h3>
          <p style={{ fontSize: '0.98rem', color: '#5C6366', maxWidth: '520px', margin: '0 auto 20px' }}>
            Reserve your table overlooking the Positano bay for lunch or dinner shift tasting menus.
          </p>
          <button onClick={openReservation} className="btn-gold" style={{ padding: '12px 28px', fontSize: '12.5px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Request Shift Booking
          </button>
        </div>
      </article>
    </div>
  );
}
