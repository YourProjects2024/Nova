import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Leaf, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logoImage from '../assets/nova.PNG';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string, elementId?: string) => {
    setIsOpen(false);
    if (location.pathname !== '/' && path === '/') {
      navigate('/');
      if (elementId) {
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (elementId) {
      const el = document.getElementById(elementId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  const handleTrackOrder = () => {
    setIsOpen(false);
    const phoneNumber = '919998318359';
    const message = encodeURIComponent('Hi NEVA team, I want to track my order. Please provide my order status.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-cream-50/95 backdrop-blur-md border-b border-sage-100 shadow-xs">
      {/* Promo Banner */}
      <div className="bg-sage-700 text-cream-50 text-center py-1.5 px-4 text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2">
        <Leaf className="w-3 h-3 animate-pulse" />
        <span>Free Shipping on orders above ₹499 • 100% Organic & Cruelty-Free</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-1 md:flex-none flex items-center justify-start">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logoImage}
                alt="NEVA"
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-full"
              />
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-sage-800 group-hover:text-sage-600 transition-colors">
                NEVA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-sage-800">
            <button
              onClick={() => handleNavClick('/')}
              className="hover:text-gold-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('/', 'bestsellers')}
              className="hover:text-gold-600 transition-colors cursor-pointer"
            >
              Shop Bestsellers
            </button>
            <Link
              to="/about"
              className="hover:text-gold-600 transition-colors"
            >
              Our Story
            </Link>
            <button
              onClick={handleTrackOrder}
              className="hover:text-gold-600 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-green-600" />
              Track Order
            </button>
            <button
              onClick={() => handleNavClick('/', 'contact')}
              className="hover:text-gold-600 transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </nav>

          {/* Cart & Menu Actions */}
          <div className="flex items-center justify-end space-x-4">
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-sage-800 hover:text-gold-600 transition-colors rounded-full hover:bg-sage-50 cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-600 text-cream-50 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-cream-50 animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-sage-800 hover:text-gold-600 transition-colors rounded-full hover:bg-sage-50 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-cream-50 border-t border-sage-100 py-4 px-6 space-y-4 shadow-inner animate-fadeIn">
          <button
            onClick={() => handleNavClick('/')}
            className="block w-full text-left font-medium text-sage-800 py-2 border-b border-sage-100 hover:text-gold-600 cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('/', 'bestsellers')}
            className="block w-full text-left font-medium text-sage-800 py-2 border-b border-sage-100 hover:text-gold-600 cursor-pointer"
          >
            Shop Bestsellers
          </button>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block font-medium text-sage-800 py-2 border-b border-sage-100 hover:text-gold-600"
          >
            Our Story
          </Link>
          <button
            onClick={handleTrackOrder}
            className="flex items-center gap-2 w-full text-left font-medium text-sage-800 py-2 border-b border-sage-100 hover:text-gold-600 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-green-600" />
            Track Order (WhatsApp)
          </button>
          <button
            onClick={() => handleNavClick('/', 'contact')}
            className="block w-full text-left font-medium text-sage-800 py-2 hover:text-gold-600 cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
};
