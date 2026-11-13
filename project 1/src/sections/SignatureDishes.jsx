import React, { useState } from 'react';
import { ArrowRight, Sparkles, X, Plus } from 'lucide-react';

export default function SignatureDishes({ dishes, currency = '৳', onOpenReservation, sectionData = {} }) {
  const [selectedDish, setSelectedDish] = useState(null);

  const eyebrow = sectionData.eyebrow || 'A TASTE OF DISTINCTION';
  const title = sectionData.title || 'Our Signature Creations.';
  const description =
    sectionData.description ||
    'Discover a selection of carefully prepared dishes that represent the character, culinary technique, and soul of Aurelia.';
  const ctaText = sectionData.ctaText || 'EXPLORE FULL MENU';

  const featuredDish = dishes[0];
  const supportingDishes = dishes.slice(1);

  const handleOpenDishModal = (dish) => {
    setSelectedDish(dish);
  };

  const handleCloseDishModal = () => {
    setSelectedDish(null);
  };

  const handleScrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="signature"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-obsidian)',
        position: 'relative',
        borderBottom: '1px solid var(--color-border-gold-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '56px' }}>
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h2
              style={{
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                color: 'var(--color-pearl)',
                marginBottom: '12px',
              }}
            >
              {title}
            </h2>
            <p style={{ maxWidth: '560px', fontSize: '15px', color: 'var(--color-pearl-muted)', lineHeight: 1.6 }}>
              {description}
            </p>
          </div>

          <button
            onClick={handleScrollToMenu}
            className="btn-secondary"
            style={{ padding: '14px 28px' }}
          >
            <span>{ctaText}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Editorial Layout: Large Featured Dish Left, Supporting Dishes Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'stretch',
          }}
        >
          {/* Main Featured Dish Card */}
          {featuredDish && (
            <div
              className="deco-frame"
              style={{
                backgroundColor: 'var(--color-obsidian-soft)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
              }}
              onClick={() => handleOpenDishModal(featuredDish)}
            >
              <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
                <img
                  src={featuredDish.image}
                  alt={featuredDish.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  className="dish-zoom-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: 'var(--color-emerald)',
                    border: '1px solid var(--color-gold)',
                    color: 'var(--color-gold)',
                    padding: '6px 14px',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {featuredDish.tag}
                </div>
              </div>

              <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '26px', color: 'var(--color-pearl)' }}>
                      {featuredDish.name}
                    </h3>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--color-gold)', fontWeight: 600 }}>
                      {currency}{Number(featuredDish.price).toLocaleString()}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--color-pearl-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {featuredDish.description}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border-gold-subtle)', paddingTop: '16px' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-jade)' }}>
                    {featuredDish.dietary}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-gold)', letterSpacing: '0.1em' }}>
                    <Plus size={14} /> VIEW DETAILS
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Right Column: Supporting Dish Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {supportingDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => handleOpenDishModal(dish)}
                style={{
                  display: 'flex',
                  backgroundColor: 'var(--color-obsidian-soft)',
                  border: '1px solid var(--color-border-gold-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                }}
                className="supporting-dish-row"
              >
                <div style={{ width: '140px', minWidth: '140px', height: '140px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className="dish-zoom-img"
                  />
                </div>

                <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                      <h4 style={{ fontSize: '18px', color: 'var(--color-pearl)' }}>
                        {dish.name}
                      </h4>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--color-gold)', fontWeight: 600 }}>
                        {currency}{Number(dish.price).toLocaleString()}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--color-pearl-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {dish.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-jade)' }}>
                      {dish.dietary}
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--color-gold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      {dish.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Dish Detail Modal */}
      {selectedDish && (
        <dialog
          open
          aria-labelledby="dish-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            maxWidth: '100vw',
            maxHeight: '100vh',
            width: '100%',
            height: '100%',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseDishModal();
          }}
        >
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(18, 59, 53, 0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            onClick={handleCloseDishModal}
          />

          <div
            className="deco-frame"
            style={{
              position: 'relative',
              zIndex: 10001,
              backgroundColor: 'var(--color-obsidian-soft)',
              maxWidth: '560px',
              width: '90%',
              maxHeight: '85vh',
              overflowY: 'auto',
              border: '1px solid var(--color-gold)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{ position: 'relative', height: '280px' }}>
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={handleCloseDishModal}
                aria-label="Close Dish Details"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'rgba(23, 25, 26, 0.85)',
                  border: '1px solid var(--color-gold)',
                  color: 'var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                <h3 id="dish-modal-title" style={{ fontSize: '26px', color: 'var(--color-pearl)' }}>
                  {selectedDish.name}
                </h3>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--color-gold)' }}>
                  {currency}{Number(selectedDish.price).toLocaleString()}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <span style={{ padding: '4px 10px', background: 'rgba(214, 184, 121, 0.15)', border: '1px solid var(--color-gold)', color: 'var(--color-gold)', fontSize: '11px', letterSpacing: '0.1em' }}>
                  {selectedDish.category}
                </span>
                <span style={{ padding: '4px 10px', background: 'rgba(113, 140, 125, 0.15)', border: '1px solid var(--color-jade)', color: 'var(--color-jade)', fontSize: '11px', letterSpacing: '0.1em' }}>
                  {selectedDish.dietary}
                </span>
              </div>

              <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--color-pearl-muted)', marginBottom: '28px' }}>
                {selectedDish.description}
              </p>

              <button
                onClick={() => {
                  handleCloseDishModal();
                  onOpenReservation();
                }}
                className="btn-primary"
                style={{ width: '100%', padding: '16px' }}
              >
                <span>RESERVE A TABLE FOR THIS DISH</span>
              </button>
            </div>
          </div>
        </dialog>
      )}

      <style>{`
        .supporting-dish-row:hover {
          border-color: var(--color-gold);
          transform: translateX(4px);
        }
        .supporting-dish-row:hover .dish-zoom-img,
        .deco-frame:hover .dish-zoom-img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
