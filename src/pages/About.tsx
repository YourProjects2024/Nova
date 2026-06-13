import React from 'react';
import { Leaf, Award, ShieldCheck, Instagram, Facebook, Youtube, Sparkles } from 'lucide-react';
import heroImage from '../assets/hero-bg.jpg';

export const About: React.FC = () => {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-sage-800 text-cream-50 py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src= {heroImage}
            alt="Organic ingredients background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-3xl mx-auto space-y-4">
          <span className="text-gold-500 font-semibold tracking-widest text-xs uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Estd. 2021
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">Our Story</h1>
          <p className="text-cream-200/90 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Discover the philosophy behind NEVA — where nature meets conscious science to reveal your skin's healthiest glow.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-16">
        {/* Core Narrative */}
        <section className="bg-white p-8 sm:p-12 rounded-2xl border border-sage-100 shadow-xs space-y-6 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sage-800">Welcome to NEVA</h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full"></div>
          <p className="text-sage-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Founded in 2021, <strong>NEVA</strong> was created with a passion for delivering high-quality, effective skincare solutions. We are a progressive personal care brand offering <strong>100% organic beauty and wellness products</strong>.
          </p>
          <p className="text-sage-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Our formulations are certified, paraben-free, cruelty-free, and result-oriented. We believe skincare is more than just a routine—it is a journey of self-love and well-being.
          </p>
        </section>

        {/* Pillars / Features */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-sage-100 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-sage-50 flex items-center justify-center text-sage-700 mx-auto">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-sage-800 text-lg">100% Organic</h3>
            <p className="text-xs text-sage-600 leading-relaxed">
              We source only raw, wild-crafted, and certified organic botanical ingredients to nurture your skin naturally.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-sage-100 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-sage-50 flex items-center justify-center text-sage-700 mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-sage-800 text-lg">Clean Science</h3>
            <p className="text-xs text-sage-600 leading-relaxed">
              Completely paraben-free, sulphate-free, and mineral oil-free. We formulate with strict safety standards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-sage-100 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-sage-50 flex items-center justify-center text-sage-700 mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-sage-800 text-lg">Cruelty-Free</h3>
            <p className="text-xs text-sage-600 leading-relaxed">
              We love our furry friends. None of our ingredients or finished products are ever tested on animals.
            </p>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="bg-sage-100 p-8 sm:p-12 rounded-2xl border border-sage-200 text-center space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sage-800">Join the NEVA Family</h2>
          <p className="text-sage-700 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Explore our range of products and become a part of the NEVA family. Follow us on social media for the latest updates, skincare tips, and exclusive offers.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sage-800 hover:text-gold-600 shadow-sm border border-sage-200 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sage-800 hover:text-gold-600 shadow-sm border border-sage-200 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sage-800 hover:text-gold-600 shadow-sm border border-sage-200 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
