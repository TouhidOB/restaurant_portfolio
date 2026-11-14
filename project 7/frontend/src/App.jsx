import React from 'react';
import { CMSProvider } from './context/CMSContext';
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
import S02Hero from './sections/S02Hero';
import S03Heritage from './sections/S03Heritage';
import S04VirtualTour from './sections/S04VirtualTour';
import S05DiningExperience from './sections/S05DiningExperience';
import S06SignatureDishes from './sections/S06SignatureDishes';
import S07FullMenu from './sections/S07FullMenu';
import S08Architecture from './sections/S08Architecture';
import S09ExecutiveChef from './sections/S09ExecutiveChef';
import S10DiningExperiences from './sections/S10DiningExperiences';
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
        <S03Heritage />
        <S04VirtualTour />
        <S05DiningExperience />
        <S06SignatureDishes />
        <S07FullMenu />
        <S08Architecture />
        <S09ExecutiveChef />
        <S10DiningExperiences />
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
