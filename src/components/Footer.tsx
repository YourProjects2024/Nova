import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
import logoImage from '../assets/nova.PNG';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sage-900 text-cream-100/90 border-t border-sage-800">
      {/* Brand Trust Bar */}
      <div className="border-b border-sage-800 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-gold-500" />
            <h4 className="font-serif font-semibold text-cream-50">Certified Organic</h4>
            <p className="text-xs text-cream-200/75 max-w-xs">100% natural, paraben-free, cruelty-free, and result-oriented formulations.</p>
          </div>
          <div className="flex flex-col items-center gap-2 border-y sm:border-y-0 sm:border-x border-sage-800 py-6 sm:py-0">
            <Truck className="w-8 h-8 text-gold-500" />
            <h4 className="font-serif font-semibold text-cream-50">Fast Shipping</h4>
            <p className="text-xs text-cream-200/75 max-w-xs">Dispatched within 24 hours. Free delivery on orders above ₹499 across India.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RefreshCw className="w-8 h-8 text-gold-500" />
            <h4 className="font-serif font-semibold text-cream-50">Easy Replacement</h4>
            <p className="text-xs text-cream-200/75 max-w-xs">Hassle-free replacement for damaged or incorrect items within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logoImage}
                alt="NEVA"
                className="h-10 w-10 object-contain rounded-full"
              />
              <span className="font-serif text-2xl font-bold tracking-widest text-cream-50">
                NEVA
              </span>
            </Link>
            <p className="text-sm text-cream-200/75 leading-relaxed">
              Founded in 2021, NEVA offers certified organic, paraben-free, and cruelty-free skincare designed for healthy, glowing skin.
            </p>
            <div className="pt-2">
              <span className="inline-block text-xs font-semibold bg-sage-800 text-gold-500 px-3 py-1.5 rounded-full border border-sage-700">
                Est. 2021 • Proudly Indian
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-cream-50 mb-4">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-gold-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-500 transition-colors">About Us</Link>
              </li>
              <li>
                <a href="/#bestsellers" className="hover:text-gold-500 transition-colors">Bestselling Products</a>
              </li>
              <li>
                <a href="https://wa.me/919998318359?text=Hi%20NEVA%20team,%20I%20want%20to%20track%20my%20order." target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">
                  Track Your Order
                </a>
              </li>
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-cream-50 mb-4">Policies</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:text-gold-500 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-gold-500 transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-gold-500 transition-colors">Return, Replacement & Refund Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-cream-50 mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <a href="mailto:services.neva@gmail.com" className="hover:text-gold-500 transition-colors break-all">
                  services.neva@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <a href="tel:+919998318359" className="hover:text-gold-500 transition-colors">
                  +91 9998318359
                </a>
              </li>
              <li className="flex items-start gap-3 text-cream-200/75">
                <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <span>Available Pan-India. Support hours: 10 AM - 7 PM (Mon-Sat).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-sage-800 my-8"></div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/60">
          <p>© {currentYear} NEVA Personal Care. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> for healthy skin.
          </p>
        </div>
      </div>
    </footer>
  );
};
