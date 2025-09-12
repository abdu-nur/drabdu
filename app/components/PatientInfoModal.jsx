'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { X, User, Mail, Phone, Calendar, Clock, MessageSquare, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import ModernCalendar from './ModernCalendar'
import ModernTimePicker from './ModernTimePicker'
import ModernServiceDropdown from './ModernServiceDropdown'

export default function PatientInfoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointment_date: '',
    appointment_time: '',
    service_type: 'Consultation',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name.trim()  || !formData.phone.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!formData.appointment_date || !formData.appointment_time) {
      toast.error('Please select appointment date and time')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid phone number')
      return
    }

    try {
      setIsSubmitting(true)
      
      const { error } = await supabase
        .from('bookings')
        .insert([{
          name: formData.name.trim(),
          email: formData.email?.trim() || null,
          phone: formData.phone.trim(),
          appointment_date: formData.appointment_date,
          appointment_time: formData.appointment_time,
          service_type: formData.service_type,
          message: formData.message?.trim() || null,
          status: 'pending'
        }])

      if (error) throw error

      setIsSuccess(true)
      toast.success('Appointment booked successfully!')
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: "",
          phone: '',
          appointment_date: '',
          appointment_time: '',
          service_type: 'Consultation',
          message: ""
        })
        setIsSuccess(false)
        onClose()
      }, 2000)

    } catch (error) {
      console.error('Error booking appointment:', error)
      toast.error('Failed to book appointment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        appointment_date: '',
        appointment_time: '',
        service_type: 'Consultation',
        message: ''
      })
      setIsSuccess(false)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border border-white/20 animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200/50">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">Book Appointment</h2>
            <p className="text-slate-600 text-xs sm:text-sm">Quick booking form</p>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 disabled:opacity-50"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
          </button>
        </div>

        {isSuccess ? (
          /* Success State */
          <div className="p-6 sm:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">Appointment Booked!</h3>
            <p className="text-sm sm:text-base text-slate-600">
              We'll contact you soon to confirm your appointment.
            </p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            {/* Personal Information - Compact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-slate-300 text-black rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-white text-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border border-slate-300 text-black rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-white text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-slate-300 text-black rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-white text-sm"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Appointment Details - Compact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative">
                <label className="block text-sm font-semibold text-black mb-2">
                  Date *
                </label>
                <ModernCalendar
                  value={formData.appointment_date}
                  onChange={(date) => setFormData(prev => ({ ...prev, appointment_date: date }))}
                  minDate={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-semibold text-black mb-2">
                  Time *
                </label>
                <ModernTimePicker
                  value={formData.appointment_time}
                  onChange={(time) => setFormData(prev => ({ ...prev, appointment_time: time }))}
                />
              </div>

              <div className="relative w-full">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Service
                </label>
                <ModernServiceDropdown
                  value={formData.service_type}
                  onChange={(service) => setFormData(prev => ({ ...prev, service_type: service }))}
                />
              </div>
            </div>

            {/* Message - Compact */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2.5 border border-slate-300 text-black rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-white resize-none text-sm"
                placeholder="Any specific concerns or requirements..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Booking...</span>
                  </div>
                ) : (
                  'Book Appointment'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
