import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Compass, Sparkles, MapPin, Award, Calendar, ChevronRight } from 'lucide-react';

export default function BrandPage() {
  const { data, openReservation } = useCMS();
  const settings = data.settings || {};
  const pillars = data.culinary_pillars || [];

  return (
    <div style={{ paddingTop: '100px', backgroundColor: '#FCFBF8', minHeight: '100vh', color: '#1C2022' }}>
      {/* Hero Header */}
      <section style={{ padding: '60px 0 80px', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #E2DAD0', background: 'linear-gradient(180deg, #F5F2EA 0%, #FCFBF8 100%)' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(197, 160, 89, 0.15)', border: '1px solid rgba(197, 160, 89, 0.4)', color: '#9E7B36', fontSize: '11.5px', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '20px' }}>
            <Compass size={14} />
            <span>Architectural Sanctuary • Circa 1780</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#081721', lineHeight: 1.15, marginBottom: '24px', fontWeight: 600 }}>
            Carved into the Living Limestone of Positano
          </h1>

          <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: '#5C6366', maxWidth: '780px', margin: '0 auto 36px' }}>
            Suspended 70 meters above the azure Tyrrhenian waters, AURA MARINA is an architectural sanctuary where historical Mediterranean stonework meets haute coastal gastronomy.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={openReservation} className="btn-gold" style={{ padding: '14px 32px', fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <Calendar size={16} style={{ marginRight: '8px', display: 'inline' }} />
              Request Table Reservation
            </button>
            <a href="/menu" className="btn-outline" style={{ padding: '14px 28px', fontSize: '13px', textDecoration: 'none', color: '#081721', border: '1px solid #C5A059', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}>
              Explore Menu Repertoire
            </a>
          </div>
        </div>
      </section>

      {/* Heritage Narrative & Visual Split */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #E2DAD0' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#2A6F85', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700 }}>
                Historical Provenance
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.5rem', color: '#081721', marginTop: '10px', marginBottom: '20px', lineHeight: 1.2 }}>
                Where Centuries of Maritime Heritage Meet Gastronomic Precision
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#4A5255', marginBottom: '18px' }}>
                Originally constructed as a cliffside watchtower and private maritime villa in the late 18th century, AURA MARINA was meticulously preserved under the direction of heritage conservators. Hand-dressed travertine arches, porous volcanic limestone, and centuries-old olive pergolas have been revitalized into four intimate dining spaces.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#4A5255', marginBottom: '24px' }}>
                Every stone tells the story of maritime trade, local Amalfi fishermen, and the eternal dance between land and sea. With only 12 tables per service shift, each guest experiences an atmosphere of absolute coastal intimacy.
              </p>

              <div style={{ display: 'flex', gap: '30px', borderTop: '1px solid #E2DAD0', paddingTop: '20px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', color: '#C5A059', fontWeight: 700 }}>70m</div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#7A7E80', textTransform: 'uppercase' }}>Above Sea Level</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', color: '#C5A059', fontWeight: 700 }}>12</div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#7A7E80', textTransform: 'uppercase' }}>Exclusive Tables</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', color: '#C5A059', fontWeight: 700 }}>1,400</div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#7A7E80', textTransform: 'uppercase' }}>Cellar Vintages</div>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(8, 23, 33, 0.12)', border: '1px solid #E2DAD0' }}>
                <img
                  src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop"
                  alt="Aura Marina Cliffside Villa"
                  style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', background: '#081721', color: '#FFFFFF', padding: '16px 22px', borderRadius: '8px', border: '1px solid #C5A059', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                <div style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono, monospace)', color: '#E0C184', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Positano Coordinates
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-mono, monospace)' }}>
                  {settings.coordinates_display || "40.6281° N, 14.4850° E"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Pillars Grid */}
      <section style={{ padding: '80px 0', background: '#F8F6F0' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#2A6F85', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700 }}>
              The Four Tenets
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.5rem', color: '#081721', marginTop: '10px' }}>
              Our Coastal Gastronomic Philosophy
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {pillars.length > 0 ? (
              pillars.map((p, idx) => (
                <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '10px', padding: '28px', boxShadow: '0 4px 15px rgba(8, 23, 33, 0.03)' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(197, 160, 89, 0.15)', color: '#9E7B36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)', marginBottom: '16px' }}>
                    0{idx + 1}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.4rem', color: '#081721', marginBottom: '10px' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: '#5C6366', margin: 0 }}>
                    {p.description}
                  </p>
                </div>
              ))
            ) : (
              <>
                <div style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '10px', padding: '28px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(197, 160, 89, 0.15)', color: '#9E7B36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)', marginBottom: '16px' }}>01</div>
                  <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.4rem', color: '#081721', marginBottom: '10px' }}>Adriatic Raw Salinity</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: '#5C6366', margin: 0 }}>Mazara red prawns and wild catch harvested daily and served unadorned.</p>
                </div>
                <div style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '10px', padding: '28px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(197, 160, 89, 0.15)', color: '#9E7B36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)', marginBottom: '16px' }}>02</div>
                  <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.4rem', color: '#081721', marginBottom: '10px' }}>Volcanic Campania Terroir</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: '#5C6366', margin: 0 }}>Greco di Tufo and rare maritime whites harvested from pre-phylloxera vines.</p>
                </div>
                <div style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '10px', padding: '28px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(197, 160, 89, 0.15)', color: '#9E7B36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)', marginBottom: '16px' }}>03</div>
                  <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.4rem', color: '#081721', marginBottom: '10px' }}>Centuries-Old Olive Grove</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: '#5C6366', margin: 0 }}>Cold-pressed extra virgin olive oil harvested from our private cliffside terraced grove.</p>
                </div>
                <div style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '10px', padding: '28px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(197, 160, 89, 0.15)', color: '#9E7B36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-mono, monospace)', marginBottom: '16px' }}>04</div>
                  <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.4rem', color: '#081721', marginBottom: '10px' }}>Architectural Intimacy</h3>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: '#5C6366', margin: 0 }}>Natural acoustics and candlelit terraces suspended between Mediterranean limestone and open stars.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
