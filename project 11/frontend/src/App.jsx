import React, { useState } from 'react';
import { CMSProvider } from './context/CMSContext';

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
import S03_Story from './sections/S03_Story';
import S04_VirtualTour from './sections/S04_VirtualTour';
import S05_Atmosphere from './sections/S05_Atmosphere';
import S06_SignatureDrinks from './sections/S06_SignatureDrinks';
import S07_MenuExplorer from './sections/S07_MenuExplorer';
import S08_Architecture from './sections/S08_Architecture';
import S09_BaristaStory from './sections/S09_BaristaStory';
import S10_SeasonalExperiences from './sections/S10_SeasonalExperiences';
import S11_Gallery from './sections/S11_Gallery';
import S12_Testimonials from './sections/S12_Testimonials';
import S13_Reservation from './sections/S13_Reservation';
import S14_Location from './sections/S14_Location';

function MainApp() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="botanical-glasshouse-platform" style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      {/* S01: Botanical Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Global Navigation Header */}
      <Navigation />

      <main>
        {/* S02: 3D Glasshouse Hero */}
        <S02_Hero />

        {/* S03: The Greenhouse Ethos / Our Story */}
        <S03_Story />

        {/* S04: 3D Virtual Exploration (5 Spaces) */}
        <S04_VirtualTour />

        {/* S05: Botanical Daylight Atmosphere */}
        <S05_Atmosphere />

        {/* S06: Signature Drinks & Specialty Coffee */}
        <S06_SignatureDrinks />

        {/* S07: Dynamic Seasonal Menu Explorer */}
        <S07_MenuExplorer />

        {/* S08: Glass Conservatory Architecture */}
        <S08_Architecture />

        {/* S09: Barista & Culinary Directors Story */}
        <S09_BaristaStory />

        {/* S10: Seasonal Workshops & Experiences */}
        <S10_SeasonalExperiences />

        {/* S11: Visual Chronicles Gallery */}
        <S11_Gallery />

        {/* S12: Community Reflections */}
        <S12_Testimonials />

        {/* S13: Table & Visit Reservations */}
        <S13_Reservation />

        {/* S14: Location, Hours & Directions */}
        <S14_Location />
      </main>

      {/* S15: Botanical Editorial Footer */}
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
