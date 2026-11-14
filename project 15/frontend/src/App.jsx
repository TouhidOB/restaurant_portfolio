import React, { useState } from 'react';
import { CMSProvider } from './context/CMSContext';

// Common Components
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import DishDetailModal from './components/common/DishDetailModal';
import ReservationModal from './components/common/ReservationModal';
import Lightbox from './components/common/Lightbox';
import Footer from './components/common/Footer';

// 15 Editorial Sections
import S02_Hero from './sections/S02_Hero';
import S03_BrandStory from './sections/S03_BrandStory';
import S04_VirtualTour from './sections/S04_VirtualTour';
import S05_FoodPhilosophy from './sections/S05_FoodPhilosophy';
import S06_FeaturedDishes from './sections/S06_FeaturedDishes';
import S07_MenuExplorer from './sections/S07_MenuExplorer';
import S08_KitchenStudio from './sections/S08_KitchenStudio';
import S09_CulinaryTeam from './sections/S09_CulinaryTeam';
import S10_EventsExperiences from './sections/S10_EventsExperiences';
import S11_Gallery from './sections/S11_Gallery';
import S12_Testimonials from './sections/S12_Testimonials';
import S13_Reservation from './sections/S13_Reservation';
import S14_Location from './sections/S14_Location';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <CMSProvider>
      <div className="pop-food-studio-app">
        {/* S01: Pop-Art Preloader */}
        <Preloader onComplete={() => setPreloaderDone(true)} />

        {/* Global Navigation */}
        <Navigation />

        {/* Main Content Sections */}
        <main>
          <S02_Hero />
          <S03_BrandStory />
          <S04_VirtualTour />
          <S05_FoodPhilosophy />
          <S06_FeaturedDishes />
          <S07_MenuExplorer />
          <S08_KitchenStudio />
          <S09_CulinaryTeam />
          <S10_EventsExperiences />
          <S11_Gallery />
          <S12_Testimonials />
          <S13_Reservation />
          <S14_Location />
        </main>

        {/* S15: Massive Pop Footer */}
        <Footer />

        {/* Global Pop-Art Interactive Modals */}
        <DishDetailModal />
        <ReservationModal />
        <Lightbox />
      </div>
    </CMSProvider>
  );
}
