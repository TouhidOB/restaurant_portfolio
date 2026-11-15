import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, Wine, Eye } from 'lucide-react';

export default function SignaturesPage() {
  const { data, openReservation, setSelectedDish } = useCMS();
  const categories = data.menu_categories || [];

  // Extract all signature dishes
  const signatureItems = [];
  categories.forEach((cat) => {
    (cat.items || []).forEach((item) => {
      if (item.is_signature || item.is_chef_recommendation) {
        signatureItems.push(item);
      }
    });
  });

  return (
    <div style={{ paddingTop: '100px', backgroundColor: '#FCFBF8', minHeight: '100vh', color: '#1C2022' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 70px', background: 'linear-gradient(180deg, #F5F2EA 0%, #FCFBF8 100%)', borderBottom: '1px solid #E2DAD0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(197, 160, 89, 0.15)', border: '1px solid rgba(197, 160, 89, 0.4)', color: '#9E7B36', fontSize: '11.5px', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '18px' }}>
            <Sparkles size={14} />
            <span>Executive Chef Matteo Bellini</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#081721', lineHeight: 1.15, marginBottom: '20px', fontWeight: 600 }}>
            Seasonal Coastal Signatures
          </h1>

          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#5C6366', maxWidth: '720px', margin: '0 auto 30px' }}>
            A curated showcase of our most celebrated dishes, balancing unadorned Mediterranean salinity with boundary-pushing coastal technique.
          </p>

          <button onClick={openReservation} className="btn-gold" style={{ padding: '13px 30px', fontSize: '12.5px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <Calendar size={15} style={{ marginRight: '8px', display: 'inline' }} />
            Reserve A Tasting Seat
          </button>
        </div>
      </section>

      {/* Signature Grid */}
      <section style={{ padding: '70px 0 90px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '36px' }}>
            {signatureItems.map((dish) => (
              <div
                key={dish.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2DAD0',
                  overflow: 'hidden',
                  boxShadow: '0 6px 20px rgba(8, 23, 33, 0.04)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedDish(dish)}
              >
                <div style={{ height: '260px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={dish.image_url || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'}
                    alt={dish.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(8, 23, 33, 0.9)', color: '#DFBA73', padding: '4px 12px', borderRadius: '20px', fontSize: '10.5px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, letterSpacing: '0.1em' }}>
                    ★ SIGNATURE
                  </div>
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.45rem', color: '#081721', margin: 0 }}>
                      {dish.name}
                    </h3>
                    <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '1.25rem', fontWeight: 700, color: '#C5A059' }}>
                      €{dish.price}
                    </span>
                  </div>

                  <p style={{ fontStyle: 'italic', color: '#7A7E80', fontSize: '0.9rem', marginBottom: '12px' }}>
                    {dish.english_name}
                  </p>

                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#5C6366', marginBottom: '18px' }}>
                    {dish.description}
                  </p>

                  {dish.wine_pairing && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: '#2A6F85', background: '#F0F6F8', padding: '8px 12px', borderRadius: '6px', marginBottom: '16px' }}>
                      <Wine size={14} />
                      <span>{dish.wine_pairing}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F0ECE4', paddingTop: '14px' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#7A7E80' }}>
                      📍 {dish.origin || 'Amalfi Coast Terraced Catch'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDish(dish);
                      }}
                      style={{ background: 'transparent', border: 'none', color: '#C5A059', fontWeight: 600, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Eye size={14} /> View Plating
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
