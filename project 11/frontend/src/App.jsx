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

// Editorial Sections S02 - S14 for Landing Page /
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

// Dedicated Standalone Pages
import StoryPage from './pages/StoryPage';
import SignaturesPage from './pages/SignaturesPage';
import MenuPage from './pages/MenuPage';
import TourPage from './pages/TourPage';
import ChefPage from './pages/ChefPage';
import SpacePage from './pages/SpacePage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostDetailPage from './pages/BlogPostDetailPage';
import CustomPageView from './pages/CustomPageView';

function MainRouter() {
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    const path = currentPath;

    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '').replace(/\/$/, '');
      return <BlogPostDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (path === '/blog') {
      return <BlogListPage onNavigate={navigate} />;
    }

    if (path.startsWith('/page/')) {
      const slug = path.replace('/page/', '').replace(/\/$/, '');
      return <CustomPageView slug={slug} onNavigate={navigate} />;
    }

    switch (path) {
      case '/story':
        return <StoryPage onNavigate={navigate} />;
      case '/signatures':
      case '/drinks':
      case '/dishes':
        return <SignaturesPage onNavigate={navigate} />;
      case '/menu':
        return <MenuPage onNavigate={navigate} />;
      case '/tour':
        return <TourPage onNavigate={navigate} />;
      case '/barista':
      case '/chef':
        return <ChefPage onNavigate={navigate} />;
      case '/architecture':
      case '/space':
      case '/spaces':
        return <SpacePage onNavigate={navigate} />;
      case '/experience':
      case '/experiences':
      case '/gatherings':
        return <ExperiencePage onNavigate={navigate} />;
      case '/contact':
      case '/location':
      case '/coordinates':
        return <ContactPage onNavigate={navigate} />;
      case '/':
      default:
        return (
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
        );
    }
  };

  return (
    <div className="botanical-glasshouse-platform" style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      {/* S01: Botanical Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Global Navigation Header */}
      <Navigation currentPath={currentPath} onNavigate={navigate} />

      {/* Main Routed Content */}
      {renderContent()}

      {/* S15: Botanical Editorial Footer */}
      <Footer onNavigate={navigate} />

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
      <MainRouter />
    </CMSProvider>
  );
}
