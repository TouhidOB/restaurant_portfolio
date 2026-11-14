import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function DishDetailModal() {
  const { selectedDish, setSelectedDish, t, lang, openReservation } = useCMS();

  if (!selectedDish) return null;

  const dishName = selectedDish.bengali_name && lang === 'bn'
    ? selectedDish.bengali_name
    : (t(selectedDish.name) || selectedDish.name_en || selectedDish.name);

  const secondaryName = lang === 'bn'
    ? (selectedDish.name_en || (typeof selectedDish.name === 'object' ? selectedDish.name.en : selectedDish.name))
    : (selectedDish.bengali_name || (typeof selectedDish.name === 'object' ? selectedDish.name.bn : ''));

  const description = selectedDish.description_bn && lang === 'bn'
    ? selectedDish.description_bn
    : (t(selectedDish.description) || selectedDish.description_en || selectedDish.description);

  const price = selectedDish.price ? `BDT ৳${Number(selectedDish.price).toLocaleString()}` : '';

  const ingredients = Array.isArray(selectedDish.ingredients)
    ? selectedDish.ingredients
    : typeof selectedDish.ingredients === 'string'
      ? selectedDish.ingredients.split(',').map(s => s.trim())
      : [];

  const dietary = Array.isArray(selectedDish.dietary_tags || selectedDish.dietary)
    ? (selectedDish.dietary_tags || selectedDish.dietary)
    : [];

  const spiceDots = selectedDish.spice_level || selectedDish.spicy_level || 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(15, 12, 10, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedDish(null);
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--color-bg-ivory, #F4EBDD)',
          color: 'var(--color-charcoal, #242321)',
          maxWidth: '820px',
          width: '100%',
          maxHeight: '90vh',
          borderRadius: '4px',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.55)',
          border: '1px solid rgba(177, 138, 84, 0.4)',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: selectedDish.image_url || selectedDish.image ? '1fr 1.15fr' : '1fr',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedDish(null)}
          aria-label="Close dish preview"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(36, 35, 33, 0.8)',
            color: '#F4EBDD',
            border: '1px solid rgba(177, 138, 84, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-terracotta, #A6533B)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(36, 35, 33, 0.8)')}
        >
          ✕
        </button>

        {/* Dish Image */}
        {(selectedDish.image_url || selectedDish.image) && (
          <div style={{ position: 'relative', minHeight: '340px', backgroundColor: '#1a1917' }}>
            <img
              src={selectedDish.image_url || selectedDish.image}
              alt={dishName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {selectedDish.is_signature && (
              <span
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'var(--color-terracotta, #A6533B)',
                  color: '#fff',
                  padding: '5px 12px',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  borderRadius: '2px',
                }}
              >
                {lang === 'bn' ? 'স্বাক্ষরিত পরিবেশন' : 'Signature Creation'}
              </span>
            )}
          </div>
        )}

        {/* Dish Content */}
        <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-terracotta, #A6533B)',
                fontWeight: 600,
              }}
            >
              {selectedDish.category_name || (lang === 'bn' ? 'ঐতিহ্যবাহী ব্যঞ্জন' : 'Heritage Culinary Special')}
            </span>
          </div>

          <h2
            id="dish-modal-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              fontWeight: 600,
              color: 'var(--color-indigo, #26344A)',
              lineHeight: 1.25,
              margin: '0 0 4px 0',
            }}
          >
            {dishName}
          </h2>

          {secondaryName && (
            <div
              style={{
                fontFamily: 'var(--font-bengali-display)',
                fontSize: '16px',
                color: 'var(--color-brass, #B18A54)',
                marginBottom: '16px',
                fontStyle: 'italic',
              }}
            >
              {secondaryName}
            </div>
          )}

          <div
            style={{
              fontSize: '22px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: 'var(--color-terracotta, #A6533B)',
              marginBottom: '20px',
            }}
          >
            {price}
          </div>

          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.75,
              color: 'rgba(36, 35, 33, 0.85)',
              marginBottom: '24px',
            }}
          >
            {description}
          </p>

          {/* Spice and Dietary Indicators */}
          {(spiceDots > 0 || dietary.length > 0) && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
                padding: '12px 0',
                borderTop: '1px solid rgba(177, 138, 84, 0.25)',
                borderBottom: '1px solid rgba(177, 138, 84, 0.25)',
                marginBottom: '24px',
              }}
            >
              {spiceDots > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-charcoal)', fontWeight: 600 }}>
                    {lang === 'bn' ? 'ঝালের মাত্রা:' : 'Spice Level:'}
                  </span>
                  <span style={{ color: 'var(--color-terracotta, #A6533B)', fontSize: '13px' }}>
                    {'🌶️'.repeat(Math.min(spiceDots, 4))}
                  </span>
                </div>
              )}

              {dietary.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    backgroundColor: 'rgba(83, 107, 80, 0.15)',
                    color: 'var(--color-leaf, #536B50)',
                    border: '1px solid rgba(83, 107, 80, 0.35)',
                    borderRadius: '2px',
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Key Heritage Ingredients */}
          {ingredients.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--color-indigo, #26344A)',
                  marginBottom: '8px',
                }}
              >
                {lang === 'bn' ? 'মূল উপাদানসমূহ' : 'Key Heritage Ingredients'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {ingredients.map((ing, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '12px',
                      padding: '4px 10px',
                      backgroundColor: 'rgba(196, 177, 141, 0.25)',
                      color: 'var(--color-charcoal)',
                      borderRadius: '2px',
                    }}
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
            <button
              onClick={() => {
                setSelectedDish(null);
                openReservation();
              }}
              style={{
                flex: 1,
                padding: '13px 20px',
                backgroundColor: 'var(--color-terracotta, #A6533B)',
                color: '#fff',
                border: 'none',
                borderRadius: '2px',
                fontSize: '13px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#8c422d')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-terracotta, #A6533B)')}
            >
              {lang === 'bn' ? 'টেবিল সংরক্ষণ করে উপভোগ করুন' : 'Reserve Table to Taste'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
