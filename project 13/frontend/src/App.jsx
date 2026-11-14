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
import S03_BrandStory from './sections/S03_BrandStory';
import S04_VirtualTour from './sections/S04_VirtualTour';
import S05_StreetFoodCulture from './sections/S05_StreetFoodCulture';
import S06_SignatureDishes from './sections/S06_SignatureDishes';
import S07_MenuExplorer from './sections/S07_MenuExplorer';
import S08_OpenKitchen from './sections/S08_OpenKitchen';
import S09_ChefTeam from './sections/S09_ChefTeam';
import S10_DiningExperiences from './sections/S10_DiningExperiences';
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
        {/* S02: 3D Seoul Night Hero */}
        <S02_Hero />

        {/* S03: Brand Story & Street Culture */}
        <S03_BrandStory />

        {/* S04: 3D Interactive Virtual Tour */}
        <S04_VirtualTour />

        {/* S05: Three Pillars of Seoul Street Gastronomy */}
        <S05_StreetFoodCulture />

        {/* S06: Signature Dishes */}
        <S06_SignatureDishes />

        {/* S07: Menu Explorer */}
        <S07_MenuExplorer />

        {/* S08: Open Kitchen & Food Prep */}
        <S08_OpenKitchen />

        {/* S09: Chef Team & Kitchen Brigade */}
        <S09_ChefTeam />

        {/* S10: Group Dining & Pocha Experiences */}
        <S10_DiningExperiences />

        {/* S11: Food & Nightlife Gallery */}
        <S11_Gallery />

        {/* S12: Guest Reviews & Testimonials */}
        <S12_Testimonials />

        {/* S13: Reservation & Visit Inquiries */}
        <S13_Reservation />

        {/* S14: Location, Hours & Directions */}
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
