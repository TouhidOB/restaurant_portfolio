import React, { useState } from 'react';
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import S02_Hero from './sections/S02_Hero';
import S03_BrandStory from './sections/S03_BrandStory';
import S04_VirtualTour from './sections/S04_VirtualTour';
import S05_CulinaryPhilosophy from './sections/S05_CulinaryPhilosophy';
import S06_SignatureSteaks from './sections/S06_SignatureSteaks';
import S07_MenuExplorer from './sections/S07_MenuExplorer';
import S08_OpenFireKitchen from './sections/S08_OpenFireKitchen';
import S09_ChefTeam from './sections/S09_ChefTeam';
import S10_PrivateDining from './sections/S10_PrivateDining';
import S11_Gallery from './sections/S11_Gallery';
import S12_Testimonials from './sections/S12_Testimonials';
import S13_Reservation from './sections/S13_Reservation';
import S14_Location from './sections/S14_Location';
import DishDetailModal from './components/menu/DishDetailModal';
import ReservationModal from './components/reservation/ReservationModal';
import Lightbox from './components/gallery/Lightbox';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="dark-luxury-app">
      {/* S01: Preloader Loading Experience */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* Global Navigation */}
      <Navigation />

      {/* All 15 Sequential Sections */}
      <main>
        {/* S02: Hero & 3D Architectural Exterior */}
        <S02_Hero />

        {/* S03: Brand Introduction & Narrative */}
        <S03_BrandStory />

        {/* S04: Five-Viewpoint 3D Virtual Tour */}
        <S04_VirtualTour />

        {/* S05: Culinary Philosophy & Provenance */}
        <S05_CulinaryPhilosophy />

        {/* S06: Signature Steak Collection */}
        <S06_SignatureSteaks />

        {/* S07: Complete Interactive Menu Explorer */}
        <S07_MenuExplorer />

        {/* S08: The Art of Fire & Open-Grill Cooking */}
        <S08_OpenFireKitchen />

        {/* S09: Meet the Chef & Culinary Team */}
        <S09_ChefTeam />

        {/* S10: Private Dining & Exclusive Salons */}
        <S10_PrivateDining />

        {/* S11: Architecture & Food Gallery */}
        <S11_Gallery />

        {/* S12: Guest Reviews & Press Features */}
        <S12_Testimonials />

        {/* S13: Reservation & Dining Inquiry Engine */}
        <S13_Reservation />

        {/* S14: Location, Opening Hours & Directions */}
        <S14_Location />
      </main>

      {/* S15: Dark Luxury Brand Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <DishDetailModal />
      <ReservationModal />
      <Lightbox />
    </div>
  );
}
