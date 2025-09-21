'use client';

import { useState, useEffect } from 'react';
import BookingModal from "./components/BookingModal";
import PatientInfoModal from "./components/PatientInfoModal";
import Image from "next/image";
import Navigation from './components/Navigation';
import SmoothScroll from './components/SmoothScroll';
import FloatingActionButton from './components/FloatingActionButton';
import ScrollProgress from './components/ScrollProgress';
import GallerySlider from './components/GallerySlider';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/40 to-blue-50/60 overflow-hidden">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Smooth Scroll Utility */}
      <SmoothScroll />
      
      {/* Navigation */}
      <Navigation onBookNow={() => setShowPatientModal(true)} />
      
      {/* Floating Action Button */}
      <FloatingActionButton />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          {/* Brighter animated gradient orbs */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-cyan-400/30 via-blue-400/25 to-indigo-400/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-32 w-64 h-64 bg-gradient-to-br from-blue-400/35 via-cyan-400/30 to-indigo-400/25 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute bottom-32 left-32 w-80 h-80 bg-gradient-to-br from-indigo-400/25 via-blue-400/30 to-cyan-400/35 rounded-full blur-3xl animate-float-reverse-slow"></div>
          
          {/* Brighter grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        {/* Main Hero Content */}
        <div className={`text-center z-10 transition-all duration-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-cyan-300/50 text-cyan-700 text-sm font-medium mb-8 animate-fade-in-up">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            Now Accepting New Patients
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
            Crafting Perfect
            <span className="block bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-x">
              Smiles with Precision
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Experience the future of dentistry with state-of-the-art technology, 
            personalized care, and transformative results that last a lifetime
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setShowPatientModal(true)}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative z-10">Book Appointment</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group px-8 py-4 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 font-semibold rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Our Story
              </span>
            </button>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-20 h-20 opacity-40 animate-float">
          <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-sm"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-16 h-16 opacity-35 animate-float-delay">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-sm"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 relative overflow-hidden">
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-blue-200/25 to-indigo-200/25 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">About Dr. Abdu</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight">
              Meet <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Dr. Abdu</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              A visionary in modern dentistry, combining expertise with cutting-edge technology to create life-changing transformations
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-20 items-center">
            {/* Left Column - Content */}
            <div className="lg:col-span-7 space-y-10">
              {/* Main Description */}
              <div className="space-y-8">
                <p className="text-xl text-slate-700 leading-relaxed font-light">
                  Dr. Abdu is a distinguished dental professional with experience in transforming smiles and improving lives through advanced dental care.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Specializing in cosmetic dentistry, Endodontics, and orthodontics, Dr. Abdu&apos;s approach combines artistic vision with scientific precision to create beautiful, healthy smiles that last a lifetime.
                </p>
              </div>

              {/* Enhanced Expertise Areas */}
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Preventive Care", desc: "Comprehensive oral health maintenance", color: "from-cyan-400 to-blue-400" },
                  { title: "Cosmetic Dentistry", desc: "Veneers, whitening, smile makeovers", color: "from-cyan-500 to-blue-500" },
                  { title: "Orthodontics", desc: "Modern braces and aligner solutions", color: "from-indigo-500 to-cyan-500" },
                  { title: "Dental Implants", desc: "Permanent tooth replacement solutions", color: "from-blue-500 to-indigo-500" }
                ].map((expertise, index) => (
                  <div key={index} className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 hover:bg-white/90 transition-all duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-4 h-4 bg-gradient-to-r ${expertise.color} rounded-full group-hover:scale-125 transition-transform duration-300`}></div>
                      <h4 className="font-bold text-slate-900 text-lg">{expertise.title}</h4>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{expertise.desc}</p>
                    <div className={`absolute inset-0 bg-gradient-to-r ${expertise.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>
                  </div>
                ))}
              </div>

              {/* Enhanced Statistics */}
              <div className="grid grid-cols-3 gap-12 pt-12">
                {[
                  { number: "Years", label: "Of Patient-Centered Care" },
                  { number: "700+", label: "Smiles Transformed" },
                  { number: "99%", label: "Patient Satisfaction" }
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative">
                      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                        {stat.number}
                      </div>
                      <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 mx-auto mb-4 rounded-full group-hover:w-24 transition-all duration-300"></div>
                    </div>
                    <div className="text-slate-600 font-medium text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Enhanced Visual */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-white/40 overflow-hidden group">
                  <div className="w-full h-96 bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Enhanced floating elements inside */}
                    <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-cyan-300/50 to-blue-300/50 rounded-full animate-float"></div>
                    <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-blue-300/50 to-indigo-300/50 rounded-full animate-float-delay"></div>
                    
                    {/* Modern tooth icon */}
                    <svg className="w-32 h-32 text-cyan-400/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  
                  {/* Enhanced decorative overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/15 to-transparent pointer-events-none group-hover:via-white/25 transition-all duration-500"></div>
                </div>

                {/* Enhanced floating badge */}
                <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/50 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-slate-800">Available Today</span>
                  </div>
                </div>

                {/* Enhanced bottom accent */}
                <div className="absolute -bottom-6 -left-6 w-32 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-32 px-8 bg-gradient-to-r from-cyan-50/50 to-blue-50/40 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">Our Services</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
              Comprehensive <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Dental Care</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              State-of-the-art treatments using the latest technology and proven techniques
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
                            {
                title: "General Dentistry",
                description: "Care delivered using state-of-the-art methods.",
                icon: (
                  <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
                  </svg>
                ),
                features: ["checkups", "fillings", "crowns", "cleanings",  "preventive care"]
              },
              {
                title: "Cosmetic Dentistry",
                description: "Transform your smile with advanced cosmetic procedures including veneers, whitening, and complete smile makeovers.",
                icon: (
                  <svg className="w-16 h-16 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ),
                features: ["Veneers", "Teeth Whitening", "Smile Design", "Composite Bonding"]
              },

              {
                title: "Orthodontics",
                description: "Modern braces and clear aligner solutions for perfectly aligned teeth and beautiful smiles.",
                icon: (
                  <svg className="w-16 h-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ),
                features: ["Traditional Braces", "Clear Aligners", "Lingual Braces", "Retainers"]
              }
            ].map((service, index) => (
              <div key={index} className={`group relative bg-white/90 backdrop-blur-sm rounded-3xl p-10 text-center transition-all duration-700 scale-105 shadow-2xl border border-white/50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                <div className="mb-8 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-8 font-light">{service.description}</p>
                
                {/* Service Features */}
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Before & After Gallery */}
      <section id="gallery" className="py-32 px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">Gallery</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Before & After</span> Gallery
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Witness the incredible transformations and beautiful smiles we&apos;ve created for our patients
            </p>
          </div>
          
          <GallerySlider />
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-32 px-8 bg-gradient-to-r from-blue-50/40 to-cyan-50/40 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">Testimonials</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
              Patient <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Hear from our satisfied patients about their transformative dental experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                text: "Dr. Abdu transformed my smile completely. The results exceeded my expectations and the entire process was comfortable and professional!",
                rating: 5,
                treatment: "Cosmetic Dentistry"
              },
              {
                name: "Michael Chen",
                text: "Professional, caring, and incredibly skilled. My dental implant looks and feels perfect. I couldn't be happier with the results.",
                rating: 5,
                treatment: "Dental Implants"
              },
              {
                name: "Emily Rodriguez",
                text: "The best dental experience I've ever had. Dr. Abdu's attention to detail and gentle approach made all the difference.",
                rating: 5,
                treatment: "Orthodontics"
              }
            ].map((testimonial, index) => (
              <div key={index} className={`group relative backdrop-blur-sm rounded-3xl p-8 transition-all duration-700 bg-white/90 scale-105 shadow-2xl border border-white/50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-slate-700 mb-8 italic leading-relaxed font-light">&quot;{testimonial.text}&quot;</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-lg">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.treatment}</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-32 px-8 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <span className="text-cyan-600 font-semibold tracking-wider uppercase text-sm">Contact</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
              Ready to Transform <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Your Smile?</span>
            </h2>
            <p className="text-xl text-slate-600 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
              Schedule your consultation today and take the first step towards your perfect smile
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-10 border border-white/50 hover:bg-white/90 hover:scale-105 transition-all duration-500 hover:shadow-xl">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12 text-cyan-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Call Us</h3>
                <p className="text-slate-600 text-lg font-light">+251913161841</p>
                <p className="text-sm text-slate-500 mt-2">Available 9 AM - 6 PM</p>
              </div>
              <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-10 border border-white/50 hover:bg-white/90 hover:scale-105 transition-all duration-500 hover:shadow-xl">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Email Us</h3>
                <p className="text-slate-600 text-lg font-light">drabdu@nurbros.com</p>
                <p className="text-sm text-slate-500 mt-2">We&apos;ll respond within 24 hours</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowPatientModal(true)}
              className="group relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative z-10">Book Your Appointment</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-20 px-8 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <span className="text-white text-2xl font-bold">A</span>
              </div>
              <div className="text-left">
                <h3 className="text-3xl font-bold">Dr. Abdu</h3>
                <p className="text-cyan-200 font-light">Premium Dental Care & Cosmetic Dentistry</p>
              </div>
            </div>
            <p className="text-cyan-100 max-w-2xl mx-auto leading-relaxed font-light">
              Transforming smiles and changing lives through exceptional dental care, 
              cutting-edge technology, and personalized treatment approaches.
            </p>
          </div>
          
          <div className="border-t border-blue-800/50 pt-12">
            <p className="text-cyan-200">&copy; 2025 Dr. Abdu. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Patient Information Modal */}
      <PatientInfoModal 
        isOpen={showPatientModal} 
        onClose={() => setShowPatientModal(false)} 
      />
    </div>
  );
}