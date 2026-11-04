import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';
import { CookieProvider } from './context/CookieContext';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center pt-32 pb-20 px-4 text-center bg-altBg">
      <div className="max-w-md mx-auto space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-secondary">
          RAR CONSULTANT
        </p>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary">
          Page not found.
        </h1>
        <p className="text-sm text-secondaryText leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Contact us directly and we’ll help you find the right next step.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-secondary text-white font-semibold text-sm hover:bg-blue-600 transition-colors shadow-md"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <CookieProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-mainText selection:bg-secondary selection:text-white">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
          <FloatingActions />
          <CookieBanner />
        </div>
      </Router>
    </CookieProvider>
  );
}

