import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, ArrowRight } from 'lucide-react';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface BookingCalendarProps {
  onBooking?: (booking: any) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onBooking }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  // Generate available time slots
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '9:00 AM', available: true },
    { id: '2', time: '10:00 AM', available: true },
    { id: '3', time: '11:00 AM', available: false },
    { id: '4', time: '2:00 PM', available: true },
    { id: '5', time: '3:00 PM', available: true },
    { id: '6', time: '4:00 PM', available: true },
    { id: '7', time: '5:00 PM', available: false },
  ];

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const currentDate = new Date();
  const days = getDaysInMonth(currentDate);

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    return date >= today;
  };

  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    const booking = {
      date: selectedDate,
      time: selectedTime,
      ...formData
    };

    onBooking?.(booking);
    
    // Reset form
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-400" />
            Select Date & Time
          </h3>

          {/* Calendar Grid */}
          <div className="mb-6">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-400 p-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {days.map((date, index) => (
                <button
                  key={index}
                  onClick={() => date && handleDateSelect(date)}
                  disabled={!date || !isDateAvailable(date)}
                  className={`p-2 text-sm rounded-lg transition-all duration-200 ${
                    date
                      ? isDateAvailable(date)
                        ? selectedDate?.getDate() === date.getDate()
                          ? 'bg-blue-500 text-white'
                          : 'text-white hover:bg-white/20'
                        : 'text-gray-500 cursor-not-allowed'
                      : ''
                  }`}
                >
                  {date?.getDate()}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                Available Times
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`p-3 text-sm rounded-lg transition-all duration-200 ${
                      slot.available
                        ? selectedTime === slot.time
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 rounded-2xl"
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <User className="w-6 h-6 mr-2 text-blue-400" />
            Your Information
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about your requirements..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={!selectedDate || !selectedTime}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              Book Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingCalendar;
