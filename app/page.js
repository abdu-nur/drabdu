'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Navigation from './components/Navigation';
import SmoothScroll from './components/SmoothScroll';
import FloatingActionButton from './components/FloatingActionButton';
import ScrollProgress from './components/ScrollProgress';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 overflow-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Smooth Scroll Utility */}
      <SmoothScroll />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Floating Action Button */}
      <FloatingActionButton />
      
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 blur-xl float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-30 blur-lg float-delay-1"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-25 blur-xl float-delay-2"></div>
        </div>

        {/* Main Hero Content */}
        <div className={`text-center z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight">
            Transforming Smiles with
            <span className="block gradient-text">Precision & Care</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of dentistry with cutting-edge technology and unparalleled expertise
          </p>
          <button className="glass glass-hover px-12 py-4 text-lg font-semibold text-gray-800 rounded-full glow-hover">
            Book Consultation
          </button>
        </div>

        {/* Floating Dental Elements */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 opacity-20 float">
          <div className="w-full h-full bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 opacity-25 float-delay-1">
          <div className="w-full h-full bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-cyan-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-cyan-100/20 to-blue-100/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">About</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
              Meet <span className="gradient-text">Dr. Abdu</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A visionary in modern dentistry, combining expertise with cutting-edge technology
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Main Description */}
              <div className="space-y-6">
                <p className="text-xl text-gray-700 leading-relaxed">
                  Dr. Abdu is a distinguished dental professional with over 15 years of experience in transforming smiles and improving lives through advanced dental care.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Specializing in cosmetic dentistry, dental implants, and orthodontics, Dr. Abdu&apos;s approach combines artistic vision with scientific precision to create beautiful, healthy smiles that last a lifetime.
                </p>
              </div>

              {/* Expertise Areas */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="glass rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900">Cosmetic Dentistry</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Veneers, whitening, smile makeovers</p>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900">Dental Implants</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Permanent tooth replacement solutions</p>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900">Orthodontics</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Modern braces and aligner solutions</p>
                </div>
                <div className="glass rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <h4 className="font-semibold text-gray-900">Preventive Care</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Comprehensive oral health maintenance</p>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center group">
                  <div className="relative">
                    <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                      15+
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-3 rounded-full"></div>
                  </div>
                  <div className="text-gray-600 font-medium">Years of Excellence</div>
                </div>
                <div className="text-center group">
                  <div className="relative">
                    <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                      1000+
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-3 rounded-full"></div>
                  </div>
                  <div className="text-gray-600 font-medium">Smiles Transformed</div>
                </div>
                <div className="text-center group">
                  <div className="relative">
                    <div className="text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                      99%
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-3 rounded-full"></div>
                  </div>
                  <div className="text-gray-600 font-medium">Patient Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Main Image Container */}
                <div className="glass rounded-3xl p-8 backdrop-blur-xl border border-white/20 relative overflow-hidden">
                  <div className="w-full h-96 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Floating elements inside */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-60 float"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full opacity-60 float-delay-1"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl">🦷</div>
                  </div>
                  
                  {/* Decorative overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none"></div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 glass rounded-2xl px-6 py-3 backdrop-blur-xl border border-white/20">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Available Today</span>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute -bottom-4 -left-4 w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-8 bg-gradient-to-r from-gray-50 to-blue-50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive dental care using the latest technology and techniques
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Cosmetic Dentistry",
                description: "Transform your smile with advanced cosmetic procedures including veneers, whitening, and smile makeovers.",
                icon: "✨"
              },
              {
                title: "Dental Implants",
                description: "Permanent tooth replacement solutions that look, feel, and function like natural teeth.",
                icon: "🦷"
              },
              {
                title: "Orthodontics",
                description: "Modern braces and aligner solutions for perfectly aligned teeth and beautiful smiles.",
                icon: "🎯"
              }
            ].map((service, index) => (
              <div key={index} className={`glass glass-hover rounded-2xl p-8 text-center transition-all duration-700 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Gallery */}
      <section id="gallery" className="py-24 px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="gradient-text">Before & After</span> Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the incredible transformations and beautiful smiles we&apos;ve created
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item, index) => (
              <div key={index} className={`glass rounded-2xl overflow-hidden transition-all duration-700 delay-${index * 200} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                  <div className="text-4xl">📸</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Case Study {item}</h3>
                  <p className="text-gray-600">Complete smile transformation with cosmetic dentistry</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-8 bg-gradient-to-r from-blue-50 to-gray-50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Patient <span className="gradient-text">Testimonials</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our satisfied patients about their experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                text: "Dr. Abdu transformed my smile completely. The results exceeded my expectations!",
                rating: "⭐⭐⭐⭐⭐"
              },
              {
                name: "Michael Chen",
                text: "Professional, caring, and incredibly skilled. My dental implant looks and feels perfect.",
                rating: "⭐⭐⭐⭐⭐"
              },
              {
                name: "Emily Rodriguez",
                text: "The best dental experience I've ever had. Dr. Abdu's attention to detail is unmatched.",
                rating: "⭐⭐⭐⭐⭐"
              }
            ].map((testimonial, index) => (
              <div key={index} className={`glass glass-hover rounded-2xl p-8 transition-all duration-700 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="text-2xl mb-4">{testimonial.rating}</div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform <span className="gradient-text">Your Smile?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Schedule your consultation today and take the first step towards your perfect smile
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="glass rounded-2xl p-8">
                <div className="text-3xl mb-4">📞</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600">+1 (555) 123-4567/090</p>
              </div>
              <div className="glass rounded-2xl p-8">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600">hello@drabdu.com</p>
              </div>
            </div>
            
            <button className="glass glass-hover px-16 py-5 text-xl font-semibold text-gray-800 rounded-full glow-hover">
              Book Your Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Dr. Abdu</h3>
            <p className="text-gray-400">Premium Dental Care & Cosmetic Dentistry</p>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">&copy; 2025 Dr. Abdu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
