import React from 'react';
import { CMSProvider } from './context/CMSContext';

// Common Components
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import DishDetailModal from './components/common/DishDetailModal';
import ReservationModal from './components/common/ReservationModal';
import Lightbox from './components/common/Lightbox';
import Footer from './components/common/Footer';

// 14 Section Components
import HeroSection from './components/sections/HeroSection';
import IntroSection from './components/sections/IntroSection';
import PhilosophySection from './components/sections/PhilosophySection';
import SignatureDishesSection from './components/sections/SignatureDishesSection';
import MenuExplorerSection from './components/sections/MenuExplorerSection';
import DinerStorySection from './components/sections/DinerStorySection';
import DinerArchitectureSection from './components/sections/DinerArchitectureSection';
import TourSection from './components/sections/TourSection';
import DinerExperienceSection from './components/sections/DinerExperienceSection';
import GallerySection from './components/sections/GallerySection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import ReservationSection from './components/sections/ReservationSection';
import LocationContactSection from './components/sections/LocationContactSection';
import FAQSection from './components/sections/FAQSection';

export default function App() {
  return (
    <CMSProvider>
      <Preloader />
      <Navigation />

      <main>
        {/* Section 01: Hero */}
        <HeroSection />

        {/* Section 02: Editorial Intro */}
        <IntroSection />

        {/* Section 03: Philosophy */}
        <PhilosophySection />

        {/* Section 04: Signature Dishes Highlights */}
        <SignatureDishesSection />

        {/* Section 05: Menu Explorer */}
        <MenuExplorerSection />

        {/* Section 06: Diner Story */}
        <DinerStorySection />

        {/* Section 07: Diner Architecture */}
        <DinerArchitectureSection />

        {/* Section 08: 3D Spatial Virtual Tour */}
        <TourSection />

        {/* Section 09: Diner Experience */}
        <DinerExperienceSection />

        {/* Section 10: Restaurant Gallery Archive */}
        <GallerySection />

        {/* Section 11: Guest Testimonials */}
        <TestimonialsSection />

        {/* Section 12: Table Reservation Inquiry */}
        <ReservationSection />

        {/* Section 13: Location, Hours & Map */}
        <LocationContactSection />

        {/* Section 14: FAQs & Policies */}
        <FAQSection />
      </main>

      {/* Section 15: Colophon & Logistics Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <DishDetailModal />
      <ReservationModal />
      <Lightbox />
    </CMSProvider>
  );
}
