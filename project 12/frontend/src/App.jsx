import React, { useState, useEffect } from 'react';
import { CMSProvider } from './context/CMSContext';

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
      case '/heritage':
        return <StoryPage onNavigate={navigate} />;
      case '/signatures':
      case '/dishes':
        return <SignaturesPage onNavigate={navigate} />;
      case '/menu':
      case '/repertoire':
        return <MenuPage onNavigate={navigate} />;
      case '/tour':
      case '/virtual-tour':
        return <TourPage onNavigate={navigate} />;
      case '/chef':
      case '/team':
      case '/artisans':
        return <ChefPage onNavigate={navigate} />;
      case '/architecture':
      case '/space':
      case '/spaces':
      case '/materials':
        return <SpacePage onNavigate={navigate} />;
      case '/experience':
      case '/experiences':
        return <ExperiencePage onNavigate={navigate} />;
      case '/contact':
      case '/location':
      case '/arrival':
        return <ContactPage onNavigate={navigate} />;
      case '/':
      default:
        return (
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
        );
    }
  };

  return (
    <div className="villa-riviera-platform" style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}>
      {/* S01: Preloader */}
      <Preloader />

      {/* Global Navigation Header */}
      <Navigation currentPath={currentPath} onNavigate={navigate} />

      {/* Main Routed Content */}
      {renderContent()}

      {/* S15: Editorial Footer */}
      <Footer onNavigate={navigate} />

      {/* Interactive Global Modals */}
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
