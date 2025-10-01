import React, { useState, useRef, useEffect } from 'react'
import { Calendar, Clock } from 'lucide-react'

interface DateTimePickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ 
  value, 
  onChange, 
  placeholder = "Select date and time",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const pickerRef = useRef<HTMLDivElement>(null)

  // Initialize from value
  useEffect(() => {
    if (value) {
      const dateTime = new Date(value)
      const dateStr = dateTime.toISOString().split('T')[0]
      const timeStr = dateTime.toTimeString().slice(0, 5)
      setSelectedDate(dateStr)
      setSelectedTime(timeStr)
    }
  }, [value])

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDateChange = (date: string) => {
    setSelectedDate(date)
    if (selectedTime) {
      const dateTime = `${date}T${selectedTime}`
      onChange(dateTime)
    }
  }

  const handleTimeChange = (time: string) => {
    setSelectedTime(time)
    if (selectedDate) {
      const dateTime = `${selectedDate}T${time}`
      onChange(dateTime)
    }
  }

  const formatDisplayValue = () => {
    if (!value) return placeholder
    
    const date = new Date(value)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }
    
    return date.toLocaleDateString('en-US', options)
  }

  const getCurrentMonth = () => {
    if (selectedDate) {
      return new Date(selectedDate + 'T00:00:00')
    }
    return new Date()
  }

  const getDaysInMonth = (date: Date) => {
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

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const selectDate = (day: number) => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth() + 1
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    handleDateChange(dateStr)
  }

  const isToday = (day: number) => {
    const today = new Date()
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    return today.getFullYear() === year && 
           today.getMonth() === month && 
           today.getDate() === day
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    const selected = new Date(selectedDate)
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    return selected.getFullYear() === year && 
           selected.getMonth() === month && 
           selected.getDate() === day
  }

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      {/* Input Field */}
      <div
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer bg-white flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {formatDisplayValue()}
        </span>
        <Calendar className="h-4 w-4 text-gray-400" />
      </div>

      {/* Picker Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-[9999] p-3 min-w-[300px] max-h-[450px] overflow-y-auto">
          {/* Calendar Section */}
          <div className="mb-3">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-1 hover:bg-gray-100 rounded"
              >
                ←
              </button>
              <h3 className="font-semibold text-gray-900">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                onClick={() => navigateMonth('next')}
                className="p-1 hover:bg-gray-100 rounded"
              >
                →
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {dayNames.map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth).map((day, index) => (
                <button
                  key={index}
                  onClick={() => day && selectDate(day)}
                  disabled={!day}
                  className={`
                    h-7 w-7 text-xs rounded
                    ${!day ? 'cursor-default' : 'cursor-pointer hover:bg-gray-100'}
                    ${day && isToday(day) ? 'bg-blue-100 text-blue-600 font-semibold' : ''}
                    ${day && isSelected(day) ? 'bg-blue-600 text-white font-semibold' : ''}
                    ${day && !isToday(day) && !isSelected(day) ? 'text-gray-700' : ''}
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time Section */}
          <div className="border-t pt-3">
            <div className="flex items-center mb-2">
              <Clock className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Time</span>
            </div>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 mt-3 pt-3 border-t">
            <button
              onClick={() => {
                setSelectedDate('')
                setSelectedTime('')
                onChange('')
                setIsOpen(false)
              }}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Clear
            </button>
            <button
              onClick={() => {
                const today = new Date()
                const todayStr = today.toISOString().split('T')[0]
                const nowStr = today.toTimeString().slice(0, 5)
                handleDateChange(todayStr)
                handleTimeChange(nowStr)
              }}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
            >
              Now
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DateTimePicker
