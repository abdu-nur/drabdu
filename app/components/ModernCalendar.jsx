'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'

export default function ModernCalendar({ value, onChange, minDate, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null)

  const today = new Date()
  const minDateObj = minDate ? new Date(minDate) : today

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value))
      setCurrentMonth(new Date(value))
    }
  }, [value])

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    return days
  }

  const isDateDisabled = (day) => {
    if (!day) return true
    
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date < minDateObj
  }

  const isDateSelected = (day) => {
    if (!day || !selectedDate) return false
    
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date.toDateString() === selectedDate.toDateString()
  }

  const isToday = (day) => {
    if (!day) return false
    
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date.toDateString() === today.toDateString()
  }

  const handleDateSelect = (day) => {
    if (!day || isDateDisabled(day)) return
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(date)
    
    // Format date as YYYY-MM-DD without timezone conversion
    const year = currentMonth.getFullYear()
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0')
    const dayStr = String(day).padStart(2, '0')
    const formattedDate = `${year}-${month}-${dayStr}`
    
    onChange(formattedDate)
    setIsOpen(false)
  }

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() + direction)
      return newMonth
    })
  }

  const formatDisplayDate = () => {
    if (!selectedDate) return 'Select date'
    return selectedDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <div className={`relative ${className}`}>
      {/* Calendar Input */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 bg-white text-sm text-left flex items-center justify-between hover:border-slate-400"
      >
        <span className={selectedDate ? 'text-slate-800' : 'text-slate-500'}>
          {formatDisplayDate()}
        </span>
        <CalendarIcon className="w-4 h-4 text-slate-400" />
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <>
          <div className="absolute top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-[60] p-3 sm:p-4 animate-scale-in w-72 sm:w-80">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            
            <h3 className="text-sm sm:text-base font-semibold text-slate-800">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          {/* Day Names Header */}
          <div className="grid grid-cols-7 gap-0.5 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-xs font-medium text-slate-500 text-center py-2 flex items-center justify-center">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="h-9" />
              }

              const disabled = isDateDisabled(day)
              const selected = isDateSelected(day)
              const today = isToday(day)

              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(day)}
                  disabled={disabled}
                  className={`
                    h-9 w-9 text-xs font-medium rounded-lg transition-all duration-200 flex items-center justify-center
                    ${disabled 
                      ? 'text-slate-300 cursor-not-allowed' 
                      : selected
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md'
                        : today
                          ? 'bg-cyan-100 text-cyan-700 font-semibold hover:bg-cyan-200'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  {day}
                </button>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-3 border-t border-slate-200">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const today = new Date()
                  if (today >= minDateObj) {
                    handleDateSelect(today.getDate())
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-cyan-600 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors duration-200"
              >
                Today
              </button>
              <button
                onClick={() => {
                  const tomorrow = new Date()
                  tomorrow.setDate(tomorrow.getDate() + 1)
                  if (tomorrow >= minDateObj) {
                    handleDateSelect(tomorrow.getDate())
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                Tomorrow
              </button>
            </div>
          </div>
          </div>
        </>
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
