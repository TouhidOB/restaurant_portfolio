import React from 'react';
import { Sparkles, Wine, MapPin, Eye } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function SignatureDishesSection() {
  const { data, setSelectedDish } = useCMS();
  const section = data.sections?.signatures || {};

  // Aggregate signature dishes across categories
  const categories = data.menu_categories || [];
  const signatureDishes = [];
  categories.forEach((cat) => {
    (cat.items || []).forEach((item) => {
      if (item.is_signature && signatureDishes.length < 4) {
        signatureDishes.push(item);
      }
    });
  });

  return (
    <section id="signatures" className="section-wrapper" style={{ backgroundColor: '#F6F4EE' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || "CHEF'S HIGHLIGHTS"}
          </div>
          <h2 className="section-title">
            Seasonal Coastal <em>Signatures</em>
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Dishes born from morning fishing boats, cold-pressed olive oils, and sea salt harvested from nearby coastal pans.'}
          </p>
        </div>

        {/* 4 Signatures Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '30px',
          }}
        >
          {signatureDishes.map((dish) => (
            <div
              key={dish.slug || dish.id}
              className="luxury-card"
              onClick={() => setSelectedDish(dish)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Dish Photo */}
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <img
                  src={dish.image_url || 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'}
                  alt={dish.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(8, 23, 33, 0.9)',
                    backdropFilter: 'blur(8px)',
                    color: '#DFBA73',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    padding: '5px 12px',
                    borderRadius: '30px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontWeight: 600,
                  }}
                >
                  <Sparkles size={11} color="#C5A059" />
                  <span>SIGNATURE</span>
                </span>

                <span
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    background: '#FCFBF8',
                    color: '#081721',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    padding: '4px 14px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                  }}
                >
                  {dish.currency_symbol || '€'}{dish.price}
                </span>
              </div>

              {/* Dish Content */}
              <div style={{ padding: '26px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.55rem', color: '#081721', marginBottom: '6px', lineHeight: 1.2 }}>
                  {dish.name}
                </h3>
                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#7A7E80', marginBottom: '14px' }}>
                  {dish.english_name}
                </p>
                <p style={{ fontSize: '0.94rem', color: '#4A5255', lineHeight: 1.6, marginBottom: '18px' }}>
                  {dish.description}
                </p>

                {/* Provenance & Pairing */}
                <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(197, 160, 89, 0.25)', paddingTop: '14px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <MapPin size={13} color="#2A6F85" />
                    <span style={{ color: '#081721', fontWeight: 500 }}>{dish.origin}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B65A3D' }}>
                    <Wine size={13} />
                    <span>{dish.wine_pairing}</span>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#C5A059',
                    fontWeight: 600,
                  }}
                >
                  <Eye size={13} />
                  <span>Explore Tasting Notes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
