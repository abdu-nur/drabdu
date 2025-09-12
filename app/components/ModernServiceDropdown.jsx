'use client'

import { useState } from 'react'
import { ChevronDown, Stethoscope, Smile, Shield, Zap, Sparkles, Heart, AlertCircle } from 'lucide-react'

export default function ModernServiceDropdown({ value, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)

  const services = [
    { 
      value: 'Consultation', 
      label: 'Consultation', 
      icon: Stethoscope, 
      description: 'General dental checkup',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      value: 'Cosmetic Dentistry', 
      label: 'Cosmetic Dentistry', 
      icon: Sparkles, 
      description: 'Veneers, whitening, smile makeovers',
      color: 'from-pink-500 to-rose-500'
    },
    { 
      value: 'Dental Implants', 
      label: 'Dental Implants', 
      icon: Shield, 
      description: 'Permanent tooth replacement',
      color: 'from-emerald-500 to-teal-500'
    },
    { 
      value: 'Orthodontics', 
      label: 'Orthodontics', 
      icon: Smile, 
      description: 'Braces and aligners',
      color: 'from-purple-500 to-indigo-500'
    },
    { 
      value: 'Teeth Whitening', 
      label: 'Teeth Whitening', 
      icon: Zap, 
      description: 'Professional whitening treatment',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      value: 'General Checkup', 
      label: 'General Checkup', 
      icon: Heart, 
      description: 'Routine dental care',
      color: 'from-cyan-500 to-blue-500'
    },
    { 
      value: 'Emergency Visit', 
      label: 'Emergency Visit', 
      icon: AlertCircle, 
      description: 'Urgent dental care',
      color: 'from-red-500 to-pink-500'
    }
  ]

  const selectedService = services.find(service => service.value === value)

  const handleServiceSelect = (service) => {
    onChange(service.value)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Service Input */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-white text-sm text-left flex items-center justify-between hover:border-slate-400"
      >
        <div className="flex items-center gap-3">
          {selectedService && (
            <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${selectedService.color} flex items-center justify-center`}>
              <selectedService.icon className="w-3 h-3 text-white" />
            </div>
          )}
          <span className={value ? 'text-slate-800' : 'text-slate-500'}>
            {selectedService ? selectedService.label : 'Select service'}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Service Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto w-full min-w-0">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <button
                key={service.value}
                onClick={() => handleServiceSelect(service)}
                className={`w-full px-4 py-3 text-left transition-all duration-200 hover:bg-slate-50 first:rounded-t-xl last:rounded-b-xl ${
                  value === service.value ? 'bg-cyan-50 border-l-4 border-cyan-500' : ''
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs sm:text-sm font-semibold ${
                      value === service.value ? 'text-cyan-700' : 'text-slate-800'
                    }`}>
                      {service.label}
                    </div>
                    <div className="text-xs text-slate-500 truncate hidden sm:block">
                      {service.description}
                    </div>
                  </div>
                  {value === service.value && (
                    <div className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0"></div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
