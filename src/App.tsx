import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppFloating } from './components/WhatsAppFloating';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { ShippingPolicy } from './pages/ShippingPolicy';
import { RefundPolicy } from './pages/RefundPolicy';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';

// Scroll to top on route change helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-cream-50 font-sans text-sage-900 antialiased selection:bg-gold-500/30 selection:text-sage-950">
      {/* Scroll helper */}
      <ScrollToTop />

      {/* Navigation */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Pages */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Floating WhatsApp Button */}
      <WhatsAppFloating />
    </div>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
