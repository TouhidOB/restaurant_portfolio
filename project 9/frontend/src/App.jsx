import React, { useState, useEffect } from 'react';
import { CMSProvider } from './context/CMSContext';
import Preloader from './components/common/Preloader';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';

// 14 Original Sections for Landing Page /
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

// Global Interactive Modals
import ReservationModal from './components/reservation/ReservationModal';
import DishModal from './components/menu/DishModal';
import Lightbox from './components/gallery/Lightbox';

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
      return <BlogPostDetailPage slug={slug} />;
    }

    if (path === '/blog') {
      return <BlogListPage />;
    }

    if (path.startsWith('/page/')) {
      const slug = path.replace('/page/', '').replace(/\/$/, '');
      return <CustomPageView slug={slug} />;
    }

    switch (path) {
      case '/story':
        return <StoryPage />;
      case '/signatures':
      case '/dishes':
        return <SignaturesPage />;
      case '/menu':
        return <MenuPage />;
      case '/tour':
        return <TourPage />;
      case '/chef':
        return <ChefPage />;
      case '/space':
      case '/spaces':
      case '/terrace':
        return <SpacePage />;
      case '/experience':
      case '/experiences':
        return <ExperiencePage />;
      case '/contact':
      case '/location':
      case '/coordinates':
        return <ContactPage />;
      case '/':
      default:
        return (
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
        );
    }
  };

  return (
    <>
      <Preloader />
      <Navigation currentPath={currentPath} onNavigate={navigate} />
      {renderContent()}
      <Footer onNavigate={navigate} />

      {/* Global Interactive Modals */}
      <ReservationModal />
      <DishModal />
      <Lightbox />
    </>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <MainRouter />
    </CMSProvider>
  );
}
