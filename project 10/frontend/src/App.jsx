import React, { useState, useEffect } from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';

// Common Components
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';

// Modals
import ReservationModal from './components/reservation/ReservationModal';
import DishDetailModal from './components/menu/DishDetailModal';
import Lightbox from './components/gallery/Lightbox';

// Editorial Sections S02 - S14
import S02_Hero from './sections/S02_Hero';
import S03_HeritageStory from './sections/S03_HeritageStory';
import S04_VirtualTour from './sections/S04_VirtualTour';
import S05_DiningPhilosophy from './sections/S05_DiningPhilosophy';
import S06_SignatureDishes from './sections/S06_SignatureDishes';
import S07_MenuExplorer from './sections/S07_MenuExplorer';
import S08_ArchitectureCraft from './sections/S08_ArchitectureCraft';
import S09_ChefTeam from './sections/S09_ChefTeam';
import S10_CulturalExperiences from './sections/S10_CulturalExperiences';
import S11_Gallery from './sections/S11_Gallery';
import S12_Testimonials from './sections/S12_Testimonials';
import S13_Reservation from './sections/S13_Reservation';
import S14_Location from './sections/S14_Location';

function MainApp() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bengal-heritage-platform" style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      {/* S01: Preloader with Bengali Crest 'ঐ' */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Global Navigation Header */}
      <Navigation />

      <main>
        {/* S02: 3D Riverine Hero */}
        <S02_Hero />

        {/* S03: Heritage Brand Story & Courtyard Architecture */}
        <S03_HeritageStory />

        {/* S04: 5-Viewpoint 3D Interactive Virtual Tour */}
        <S04_VirtualTour />

        {/* S05: Bengali Dining Philosophy */}
        <S05_DiningPhilosophy />

        {/* S06: Signature Bengali Culinary Offerings */}
        <S06_SignatureDishes />

        {/* S07: Interactive Bilingual Menu Explorer */}
        <S07_MenuExplorer />

        {/* S08: Architecture, Materials & Generational Craft */}
        <S08_ArchitectureCraft />

        {/* S09: Master Chef & Culinary Brigade */}
        <S09_ChefTeam />

        {/* S10: Cultural Dining & Special Experiences */}
        <S10_CulturalExperiences />

        {/* S11: Visual Archives Gallery */}
        <S11_Gallery />

        {/* S12: Guest Praise & Cultural Testimonials */}
        <S12_Testimonials />

        {/* S13: Table Reservation Inquiry Form */}
        <S13_Reservation />

        {/* S14: Heritage Quarter Location & Hours */}
        <S14_Location />
      </main>

      {/* S15: Bengali Heritage Editorial Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <ReservationModal />
      <DishDetailModal />
      <Lightbox />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <MainApp />
    </CMSProvider>
  );
}
