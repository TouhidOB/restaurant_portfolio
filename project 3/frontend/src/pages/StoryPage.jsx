import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Award, Sparkles, Wine, Calendar } from 'lucide-react';

export default function StoryPage() {
  const { data, openReservation } = useCMS();
  const team = data.team_members || [];

  return (
    <div style={{ paddingTop: '100px', backgroundColor: '#FCFBF8', minHeight: '100vh', color: '#1C2022' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 70px', background: 'linear-gradient(180deg, #F5F2EA 0%, #FCFBF8 100%)', borderBottom: '1px solid #E2DAD0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', background: 'rgba(197, 160, 89, 0.15)', border: '1px solid rgba(197, 160, 89, 0.4)', color: '#9E7B36', fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '16px' }}>
            <Award size={13} />
            <span>Culinary Direction & Brigade</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#081721', lineHeight: 1.15, marginBottom: '18px', fontWeight: 600 }}>
            Executive Chef Matteo Bellini
          </h1>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#5C6366', maxWidth: '700px', margin: '0 auto 28px' }}>
            Born in Naples and trained in three-star Michelin kitchens across Europe, Chef Bellini returned to Positano with a singular ambition: translating the raw mineral essence of the Amalfi coastline into modern culinary poetry.
          </p>

          <button onClick={openReservation} className="btn-gold" style={{ padding: '12px 28px', fontSize: '12.5px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <Calendar size={15} style={{ marginRight: '8px', display: 'inline' }} />
            Reserve Chef's Counter
          </button>
        </div>
      </section>

      {/* Culinary Team Grid */}
      <section style={{ padding: '70px 0 90px' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#2A6F85', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700 }}>
              The Masters of the Craft
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.4rem', color: '#081721', marginTop: '8px' }}>
              Our Culinary & Sommelier Leadership
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px' }}>
            {team.length > 0 ? (
              team.map((member) => (
                <div key={member.id} style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(8, 23, 33, 0.03)' }}>
                  <div style={{ height: '320px', overflow: 'hidden' }}>
                    <img
                      src={member.photo_url || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80'}
                      alt={member.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: '#9E7B36', textTransform: 'uppercase', fontWeight: 700 }}>
                      {member.role}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.5rem', color: '#081721', margin: '4px 0 10px' }}>
                      {member.name}
                    </h3>
                    <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: '#5C6366', margin: 0 }}>
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ background: '#FFFFFF', border: '1px solid #E2DAD0', borderRadius: '12px', overflow: 'hidden', gridColumn: '1 / -1', padding: '40px', textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.8rem', color: '#081721' }}>Chef Matteo Bellini & Marco Donati</h3>
                <p style={{ color: '#5C6366', maxWidth: '600px', margin: '12px auto 0' }}>Leading a team of 18 dedicated culinary artisans committed to the daily harvest of the Amalfi Coast.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
