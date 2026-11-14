import React from 'react';
import { CMSProvider } from './context/CMSContext';
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';

// Modals
import ReservationModal from './components/reservation/ReservationModal';
import DishDetailModal from './components/menu/DishDetailModal';
import Lightbox from './components/gallery/Lightbox';

// Editorial Sections
import S02_Hero from './sections/S02_Hero';
import S03_Story from './sections/S03_Story';
import S04_VirtualTour from './sections/S04_VirtualTour';
import S05_DiningPhilosophy from './sections/S05_DiningPhilosophy';
import S06_SignatureDishes from './sections/S06_SignatureDishes';
import S07_MenuExplorer from './sections/S07_MenuExplorer';
import S08_Architecture from './sections/S08_Architecture';
import S09_ChefTeam from './sections/S09_ChefTeam';
import S10_Experiences from './sections/S10_Experiences';
import S11_Gallery from './sections/S11_Gallery';
import S12_Testimonials from './sections/S12_Testimonials';
import S13_Reservation from './sections/S13_Reservation';
import S14_Location from './sections/S14_Location';

export default function App() {
  return (
    <CMSProvider>
      {/* S01: Preloader */}
      <Preloader />

      {/* Global Navigation */}
      <Navigation />

      {/* Main Editorial Content Stream */}
      <main>
        {/* S02: 3D Riviera Hero */}
        <S02_Hero />

        {/* S03: Brand Story & Heritage */}
        <S03_Story />

        {/* S04: 3D Interactive Virtual Tour */}
        <S04_VirtualTour />

        {/* S05: Three Pillars of Mediterranean Dining */}
        <S05_DiningPhilosophy />

        {/* S06: Signature Dishes */}
        <S06_SignatureDishes />

        {/* S07: Menu Explorer */}
        <S07_MenuExplorer />

        {/* S08: Architecture & Materials */}
        <S08_Architecture />

        {/* S09: Culinary Leadership & Team */}
        <S09_ChefTeam />

        {/* S10: Curated Experiences */}
        <S10_Experiences />

        {/* S11: Photography Gallery */}
        <S11_Gallery />

        {/* S12: Press Accolades & Testimonials */}
        <S12_Testimonials />

        {/* S13: Concierge Table Reservation */}
        <S13_Reservation />

        {/* S14: Location & Arrival */}
        <S14_Location />
      </main>

      {/* S15: Editorial Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <ReservationModal />
      <DishDetailModal />
      <Lightbox />
    </CMSProvider>
  );
}
