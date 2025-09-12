'use client'

import { useState } from 'react'
import { Clock, ChevronDown } from 'lucide-react'

export default function ModernTimePicker({ value, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ]

  const formatTime = (time) => {
    if (!time) return 'Select time'
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  const handleTimeSelect = (time) => {
    onChange(time)
    setIsOpen(false)
  }

  const getTimePeriod = (time) => {
    const hour = parseInt(time.split(':')[0])
    if (hour < 12) return 'Morning'
    if (hour < 17) return 'Afternoon'
    return 'Evening'
  }

  const morningSlots = timeSlots.filter(time => parseInt(time.split(':')[0]) < 12)
  const afternoonSlots = timeSlots.filter(time => {
    const hour = parseInt(time.split(':')[0])
    return hour >= 12 && hour < 17
  })
  const eveningSlots = timeSlots.filter(time => parseInt(time.split(':')[0]) >= 17)

  return (
    <div className={`relative ${className}`}>
      {/* Time Input */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-white text-sm text-left flex items-center justify-between hover:border-slate-400"
      >
        <span className={value ? 'text-slate-800' : 'text-slate-500'}>
          {formatTime(value)}
        </span>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Time Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto w-full min-w-0">
          {/* Morning Slots */}
          <div className="p-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 px-2">
              Morning
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {morningSlots.map(time => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 text-left ${
                    value === time
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {formatTime(time)}
                </button>
              ))}
            </div>
          </div>

          {/* Afternoon Slots */}
          <div className="p-2 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 px-2">
              Afternoon
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {afternoonSlots.map(time => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 text-left ${
                    value === time
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {formatTime(time)}
                </button>
              ))}
            </div>
          </div>

          {/* Evening Slots */}
          {eveningSlots.length > 0 && (
            <div className="p-2 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 px-2">
                Evening
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {eveningSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 text-left ${
                      value === time
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {formatTime(time)}
                  </button>
                ))}
              </div>
            </div>
          )}
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
