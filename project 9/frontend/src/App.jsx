import React from 'react';
import { CMSProvider } from './context/CMSContext';
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import S02Hero from './sections/S02Hero';
import S03BrandStory from './sections/S03BrandStory';
import S04VirtualTour from './sections/S04VirtualTour';
import S05DiningExperience from './sections/S05DiningExperience';
import S06SignatureDishes from './sections/S06SignatureDishes';
import S07Menu from './sections/S07Menu';
import S08Architecture from './sections/S08Architecture';
import S09Chef from './sections/S09Chef';
import S10SpecialExperiences from './sections/S10SpecialExperiences';
import S11Gallery from './sections/S11Gallery';
import S12Testimonials from './sections/S12Testimonials';
import S13Reservation from './sections/S13Reservation';
import S14Location from './sections/S14Location';
import ReservationModal from './components/reservation/ReservationModal';
import DishModal from './components/menu/DishModal';
import Lightbox from './components/gallery/Lightbox';

export default function App() {
  return (
    <CMSProvider>
      <Preloader />
      <Navigation />

      <main>
        <S02Hero />
        <S03BrandStory />
        <S04VirtualTour />
        <S05DiningExperience />
        <S06SignatureDishes />
        <S07Menu />
        <S08Architecture />
        <S09Chef />
        <S10SpecialExperiences />
        <S11Gallery />
        <S12Testimonials />
        <S13Reservation />
        <S14Location />
      </main>

      <Footer />

      {/* Global Interactive Modals */}
      <ReservationModal />
      <DishModal />
      <Lightbox />
    </CMSProvider>
  );
}
