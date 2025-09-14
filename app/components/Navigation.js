'use client';

import { useState, useEffect, useRef } from 'react';

export default function Navigation({ onBookNow }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle swipe gestures for mobile menu
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    
    if (isLeftSwipe && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="glass rounded-2xl px-8 py-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">A</span>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">Dr. Abdu</div>
                  <div className="text-sm text-gray-600">Dental Care</div>
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden md:block">
                <button 
                  onClick={onBookNow}
                  className="glass-hover px-6 py-3 rounded-full text-gray-800 font-semibold glow-hover transition-all duration-300 hover:scale-105"
                >
                  Book Now
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className={`md:hidden p-3 rounded-xl transition-all duration-300 ${
                  isMobileMenuOpen 
                    ? 'bg-blue-500/20 scale-110 shadow-lg' 
                    : 'hover:bg-white/20 active:scale-95'
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                  {/* Top line */}
                  <span className={`w-5 h-0.5 bg-gray-700 transition-all duration-500 ease-in-out origin-center ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'rotate-0 translate-y-0'
                  }`}></span>
                  
                  {/* Middle line */}
                  <span className={`w-5 h-0.5 bg-gray-700 transition-all duration-500 ease-in-out mt-1.5 origin-center ${
                    isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                  }`}></span>
                  
                  {/* Bottom line */}
                  <span className={`w-5 h-0.5 bg-gray-700 transition-all duration-500 ease-in-out mt-1.5 origin-center ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'rotate-0 translate-y-0'
                  }`}></span>
                  
                  {/* Enhanced ripple effect */}
                  <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    isMobileMenuOpen ? 'bg-blue-500/20 scale-150' : 'bg-transparent scale-0'
                  }`}></div>
                  
                  {/* Close icon overlay for better visual feedback */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}>
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Enhanced Backdrop */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/10 backdrop-blur-md transition-all duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Menu Panel with Swipe Support */}
        <div 
          ref={mobileMenuRef}
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] glass rounded-l-3xl p-6 transition-all duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex flex-col h-full">
            {/* Header with Logo and Close Button */}
            <div className={`flex items-center justify-between mb-8 transition-all duration-700 ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '100ms' }}>
              {/* Mobile Logo */}
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">A</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">Dr. Abdu</div>
                  <div className="text-sm text-gray-600">Dental Care</div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100/50 transition-all duration-300 hover:scale-110 active:scale-95 group relative overflow-hidden"
                aria-label="Close menu"
              >
                <div className="absolute inset-0 bg-blue-500/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-all duration-300 relative z-10 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items with Staggered Animation */}
            <div className="flex-1 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block py-4 px-4 text-lg font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50/50 rounded-2xl transition-all duration-300 border-b border-gray-200/30 ${
                    isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ 
                    transitionDelay: `${200 + index * 100}ms`,
                    animation: isMobileMenuOpen ? `slideInRight 0.6s ease-out ${200 + index * 100}ms both` : 'none'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </a>
              ))}
            </div>

            {/* Mobile CTA with Enhanced Animation */}
            <div className={`pt-6 transition-all duration-700 ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '800ms' }}>
              <button 
                onClick={() => {
                  onBookNow()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full glass-hover py-4 px-6 rounded-2xl text-gray-800 font-semibold text-lg glow-hover transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Book Consultation</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Swipe Indicator */}
            <div className="flex justify-center mt-4">
              <div className="w-12 h-1 bg-gray-300 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
