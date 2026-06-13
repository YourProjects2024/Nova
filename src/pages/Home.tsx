import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, Product } from '../data/products';
import {
  ShoppingBag,
  MessageCircle,
  Star,
  Check,
  Sparkles,
  ArrowRight,
  Leaf,
  Droplet,
  Users,
  ShieldCheck,
  Mail,
  Phone,
  Send,
  Calendar,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero-bg.jpg';
import beforeAfterOne from '../assets/b-a1.JPG';
import beforeAfterTwo from '../assets/b-a2.JPG';
import beforeAfterThree from '../assets/b-a3.JPG';
import beforeAfterFour from '../assets/b-a4.JPG';

const beforeAfterImages = [
  { src: beforeAfterOne, alt: 'NEVA before and after result 1' },
  { src: beforeAfterTwo, alt: 'NEVA before and after result 2' },
  { src: beforeAfterThree, alt: 'NEVA before and after result 3' },
  { src: beforeAfterFour, alt: 'NEVA before and after result 4' }
];

export const Home: React.FC = () => {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'description' | 'benefits' | 'ideal' | 'howTo' | 'ingredients'>('description');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterNewsletterSuccess] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBeforeAfterImage, setSelectedBeforeAfterImage] = useState<(typeof beforeAfterImages)[number] | null>(null);

  const featuredProduct = PRODUCTS.find((p) => p.id === 'neva-face-wash') || PRODUCTS[0];

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  const handleWhatsAppBuy = (product: Product) => {
    const phoneNumber = '919998318359';
    const message = encodeURIComponent(`Hi NEVA team, I want to buy ${product.name}.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleOpenProduct = (product: Product) => {
    setActiveTab('description');
    setSelectedProduct(product);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterNewsletterSuccess(false), 5000);
    }
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center bg-sage-800 text-cream-50 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="NEVA skincare banner"
            className="w-full h-full object-cover object-center opacity-30 scale-105 transform motion-safe:animate-pulse"
            style={{ animationDuration: '8s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sage-950/90 via-sage-900/70 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Text */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            <div className="inline-flex items-center gap-2 bg-sage-700/50 border border-sage-600 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-gold-500">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Organic Skincare</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Natural | Balanced | Conscious Skincare for men & women
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-cream-200/90 max-w-xl leading-relaxed font-sans">
              Inspired by nature and made for healthy, glowing skin. Our formulations are certified, paraben-free, cruelty-free, and result-oriented.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gold-500 hover:bg-gold-600 text-sage-950 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm tracking-wider uppercase flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://wa.me/919998318359?text=Hi%20NEVA%20team,%20I%20need%20help%20choosing%20the%20right%20skincare%20product."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-cream-200 hover:bg-cream-50/10 text-cream-50 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-sm tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current text-green-400" />
                <span>Consult on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="absolute -inset-4 bg-gold-500/10 rounded-full blur-3xl"></div>
            <div className="relative border border-sage-700 bg-sage-900/40 backdrop-blur-md rounded-2xl p-8 shadow-2xl flex items-center justify-center">
              <img
                src={featuredProduct.image}
                alt="Neva Face Wash"
                className="max-h-[380px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xs p-4 rounded-xl border border-sage-100 shadow-lg text-sage-900 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm">Neva Face Wash</h4>
                  <p className="text-[10px] text-sage-500">Deep Cleansing Formula</p>
                </div>
                <div className="text-right">
                  <p className="text-xs line-through text-sage-400 font-medium">₹499</p>
                  <p className="text-sm font-extrabold text-sage-800">₹399</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BESTSELLERS SECTION */}
      <section id="bestsellers" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10">
        <div className="text-center space-y-3 mb-16">
          <span className="text-gold-600 font-semibold tracking-widest text-xs uppercase block">Top-Rated by Customers</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sage-800 tracking-tight">Bestsellers</h2>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full"></div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              role="button"
              tabIndex={0}
              onClick={() => handleOpenProduct(product)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleOpenProduct(product);
                }
              }}
              className="bg-white rounded-2xl border border-sage-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-sage-500"
            >
              {/* Product Image Area */}
              <div className="bg-sage-50/50 p-6 flex items-center justify-center relative h-64 border-b border-sage-50">
                <span className="absolute top-4 left-4 bg-gold-500 text-sage-950 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-[180px] object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                />
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-sage-500 uppercase tracking-wider">
                      {product.weight}
                    </span>
                    {/* Customer Rating */}
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md border border-amber-100 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{product.rating.toFixed(1)}</span>
                      <span className="text-sage-400 font-normal">({product.ratingCount})</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-sage-800">
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium text-gold-600 italic">
                    {product.tagline}
                  </p>

                  {/* Key Benefits Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {product.benefits.slice(0, 3).map((benefit, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-sage-50 border border-sage-100 text-sage-700 px-2 py-1 rounded-md font-medium"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & CTA Section */}
                <div className="space-y-3 pt-4 border-t border-sage-50">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-sage-800">₹{product.price}</span>
                    <span className="text-sm line-through text-sage-400">₹{product.originalPrice}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Add to Cart */}
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        addedProductId === product.id
                          ? 'bg-green-600 text-white'
                          : 'bg-sage-700 hover:bg-sage-800 text-cream-50'
                      }`}
                    >
                      {addedProductId === product.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    {/* Buy on WhatsApp */}
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleWhatsAppBuy(product);
                      }}
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>WhatsApp Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BEFORE / AFTER SECTION */}
      <section className="bg-sage-900 text-cream-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-gold-500 font-semibold tracking-widest text-xs uppercase block">Before / After</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              See the Transformation Journey
            </h2>
            <div className="w-16 h-1 bg-gold-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {beforeAfterImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setSelectedBeforeAfterImage(image)}
                className="group overflow-hidden rounded-2xl border border-sage-700 bg-sage-800 shadow-lg text-left focus:outline-hidden focus:ring-2 focus:ring-gold-500 cursor-zoom-in"
              >
                <div className="aspect-square bg-sage-800">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider text-cream-200">
                  <span>Transformation</span>
                  <span className="text-gold-500">0{index + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Newsletter & Support Text */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-gold-600 font-semibold tracking-widest text-xs uppercase block">Newsletter</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sage-800 tracking-tight">
                We love skincare talk
              </h2>
              <div className="w-16 h-1 bg-gold-500 rounded-full"></div>
              <p className="text-sage-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Leave your email and never miss a glow-up! Hot deals, skincare secrets, and news you’ll actually want.
              </p>
            </div>

            {/* Email Subscription Form */}
            <form onSubmit={handleNewsletterSubmit} className="max-w-md">
              {newsletterSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm animate-fadeIn">
                  <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                  <div>
                    <strong className="font-bold">Glow-up newsletter joined!</strong>
                    <p className="mt-0.5 text-emerald-700">Thank you! Welcome to the family. Check your inbox for hot deals soon.</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-white border border-sage-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500"
                  />
                  <button
                    type="submit"
                    className="bg-sage-700 hover:bg-sage-800 text-cream-50 font-bold px-6 py-3 rounded-xl shadow-md transition-colors text-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </form>

            {/* Additional Support Text */}
            <div className="space-y-4 pt-6 border-t border-sage-100 max-w-xl">
              <h4 className="font-serif font-bold text-sage-800 text-lg">Still using chemicals?</h4>
              <p className="text-sage-600 text-sm leading-relaxed">
                Let’s upgrade your routine. Your skin questions answered—reach us anytime at <a href="mailto:services.neva@gmail.com" className="text-gold-600 font-semibold hover:underline">services.neva@gmail.com</a>
              </p>
              <p className="text-sage-600 text-sm leading-relaxed">
                Need help choosing? Call us now for instant guidance. Our experts will help you craft the perfect organic skincare routine.
              </p>
            </div>
          </div>

          {/* Right: Contact Details Card */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-sage-100 shadow-xs space-y-6">
            <h3 className="font-serif text-xl font-bold text-sage-800 border-b border-sage-100 pb-3">
              Contact Details
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sage-50 border border-sage-100 flex items-center justify-center text-sage-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-sage-400 uppercase tracking-wider">Email Us</h4>
                  <a
                    href="mailto:services.neva@gmail.com"
                    className="text-sm sm:text-base font-semibold text-sage-800 hover:text-gold-600 transition-colors break-all"
                  >
                    services.neva@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sage-50 border border-sage-100 flex items-center justify-center text-sage-700 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-sage-400 uppercase tracking-wider">Call / WhatsApp Support</h4>
                  <a
                    href="tel:+919998318359"
                    className="text-sm sm:text-base font-semibold text-sage-800 hover:text-gold-600 transition-colors block"
                  >
                    +91 9998318359
                  </a>
                  <p className="text-[10px] text-sage-500 mt-0.5">Available Mon-Sat, 10:00 AM to 7:00 PM</p>
                </div>
              </div>

              <div className="bg-sage-50 p-4 rounded-xl border border-sage-100 text-xs text-sage-600 leading-relaxed">
                <strong>Need instant help?</strong> Click the green WhatsApp button in the bottom right corner of your screen to start a direct chat with our skincare advisors.
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-sage-950/80 backdrop-blur-sm px-4 py-6 sm:py-10 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProduct.name} details`}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="max-w-6xl mx-auto bg-cream-50 text-sage-900 rounded-2xl shadow-2xl border border-sage-100 overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-cream-50/95 backdrop-blur-md border-b border-sage-100 px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold text-gold-600 uppercase tracking-widest">Product Details</p>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-sage-800">{selectedProduct.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="h-10 w-10 rounded-full border border-sage-200 bg-white text-sage-800 flex items-center justify-center hover:bg-sage-100 transition-colors cursor-pointer"
                aria-label="Close product details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5 sm:p-8">
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-2xl border border-sage-100 p-6 sm:p-8 flex items-center justify-center min-h-[320px]">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="max-h-[420px] w-full object-contain drop-shadow-lg"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white border border-sage-100 p-3 rounded-xl space-y-1">
                    <Leaf className="w-4 h-4 text-sage-600 mx-auto" />
                    <p className="text-[10px] font-bold text-sage-800 uppercase">Organic</p>
                  </div>
                  <div className="bg-white border border-sage-100 p-3 rounded-xl space-y-1">
                    <ShieldCheck className="w-4 h-4 text-sage-600 mx-auto" />
                    <p className="text-[10px] font-bold text-sage-800 uppercase">Paraben-Free</p>
                  </div>
                  <div className="bg-white border border-sage-100 p-3 rounded-xl space-y-1">
                    <Droplet className="w-4 h-4 text-sage-600 mx-auto" />
                    <p className="text-[10px] font-bold text-sage-800 uppercase">Cruelty-Free</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <p className="text-gold-600 italic font-medium">{selectedProduct.tagline}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-sage-800 ml-1">{selectedProduct.rating.toFixed(1)} Rating</span>
                    </div>
                    <span className="text-xs text-sage-500 font-medium">{selectedProduct.ratingCount} verified reviews</span>
                    <span className="text-xs font-semibold text-sage-500 uppercase tracking-wider">{selectedProduct.weight}</span>
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl font-extrabold text-sage-800">₹{selectedProduct.price}</span>
                    <span className="text-base line-through text-sage-400">₹{selectedProduct.originalPrice}</span>
                    <span className="text-xs font-bold text-green-600 uppercase bg-green-50 px-2 py-0.5 rounded-md border border-green-100">
                      Save ₹{selectedProduct.originalPrice - selectedProduct.price}
                    </span>
                  </div>
                </div>

                <div className="border-b border-sage-100 flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm font-semibold">
                  {[
                    { id: 'description', label: 'Description' },
                    { id: 'benefits', label: 'Benefits' },
                    { id: 'ideal', label: 'Ideal For' },
                    { id: 'howTo', label: 'How To Use' },
                    { id: 'ingredients', label: 'Ingredients' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`pb-3 relative cursor-pointer ${
                        activeTab === tab.id ? 'text-sage-800 font-bold' : 'text-sage-400 hover:text-sage-600'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="productModalTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 rounded-full"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="text-sage-700 text-sm leading-relaxed min-h-[180px]">
                  {activeTab === 'description' && (
                    <p className="font-medium text-sage-800 animate-fadeIn">{selectedProduct.description}</p>
                  )}

                  {activeTab === 'benefits' && (
                    <ul className="space-y-3 animate-fadeIn">
                      {selectedProduct.detailedBenefits.map((benefit) => {
                        const [title, desc] = benefit.split(': ');
                        return (
                          <li key={benefit} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-sage-800">{title}</strong>
                              {desc ? `: ${desc}` : ''}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {activeTab === 'ideal' && (
                    <ul className="space-y-3 animate-fadeIn">
                      {selectedProduct.idealFor.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Users className="w-5 h-5 text-sage-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'howTo' && (
                    <ol className="space-y-3 animate-fadeIn list-decimal pl-5">
                      {selectedProduct.howToUse.map((step) => (
                        <li key={step} className="pl-1">{step}</li>
                      ))}
                    </ol>
                  )}

                  {activeTab === 'ingredients' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
                      {selectedProduct.ingredients.map((ingredient) => {
                        const separator = ingredient.includes(' - ') ? ' - ' : ingredient.includes(' – ') ? ' – ' : ': ';
                        const [name, effect] = ingredient.split(separator);
                        return (
                          <div key={ingredient} className="bg-white border border-sage-100 p-4 rounded-xl space-y-1">
                            <h4 className="font-bold text-sage-800 text-xs uppercase tracking-wide">{name}</h4>
                            <p className="text-xs text-sage-600">{effect}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="pt-5 border-t border-sage-100 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(selectedProduct)}
                    className={`flex-1 py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      addedProductId === selectedProduct.id
                        ? 'bg-green-600 text-white'
                        : 'bg-sage-700 hover:bg-sage-800 text-cream-50 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {addedProductId === selectedProduct.id ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppBuy(selectedProduct)}
                    className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Buy on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-sage-100 p-5 sm:p-8 space-y-5">
              <div>
                <h3 className="font-serif text-2xl font-bold text-sage-800">Customer Reviews</h3>
                <p className="text-xs text-sage-500">Real feedback from verified buyers</p>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                {selectedProduct.reviews.map((rev) => (
                  <article
                    key={rev.id}
                    className="bg-white border border-sage-100 rounded-2xl p-5 min-w-[280px] sm:min-w-[340px] max-w-[340px] snap-start space-y-3"
                  >
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-sage-200'}`}
                        />
                      ))}
                    </div>
                    <h4 className="font-serif text-base font-bold text-sage-800 leading-snug">{rev.heading}</h4>
                    <p className="text-xs sm:text-sm text-sage-700 leading-relaxed italic">"{rev.review}"</p>
                    <div className="border-t border-sage-100 pt-3 text-xs">
                      <h5 className="font-bold text-sage-800">{rev.name}</h5>
                      {rev.date && (
                        <p className="text-[10px] text-sage-500 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          <span>{rev.date}</span>
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedBeforeAfterImage && (
        <div
          className="fixed inset-0 z-50 bg-sage-950/90 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Before and after image preview"
          onClick={() => setSelectedBeforeAfterImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedBeforeAfterImage(null)}
            className="absolute top-4 right-4 h-11 w-11 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close image preview"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={selectedBeforeAfterImage.src}
            alt={selectedBeforeAfterImage.alt}
            className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
