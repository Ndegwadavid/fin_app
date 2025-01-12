import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { 
  Calendar, Clock, Eye, MapPin, CalendarCheck, CheckCircle,
  User, Mail, Phone, MessageSquare, ChevronRight, ArrowRight,
  Award, Star, Shield, Clock3, ExternalLink, Sparkles
} from 'lucide-react';

const BookingPage = () => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    service: '',
    appointmentDate: null,
    appointmentTime: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const locations = [
    "Moi Avenue Branch - Nacico Chambers",
    "Ronald Ngala Street Branch"
  ];

  const services = [
    { 
      id: 'eye-test', 
      name: 'Comprehensive Eye Examination', 
      duration: '45 mins',
      price: 'FREE',
      description: 'Complete vision and eye health assessment'
    },
    { 
      id: 'contact-lens', 
      name: 'Contact Lens Fitting', 
      duration: '30 mins',
      price: 'KSH 3,500',
      description: 'Professional fitting and consultation'
    },
    { 
      id: 'glasses-fitting', 
      name: 'Glasses Fitting & Style Consultation', 
      duration: '30 mins',
      price: 'Free with purchase',
      description: 'Find your perfect frame and fit'
    },
    { 
      id: 'repairs', 
      name: 'Repairs & Adjustments', 
      duration: '20 mins',
      price: 'From KSH 500',
      description: 'Quick repairs and frame adjustments'
    }
  ];

  const getTimeSlots = (location) => {
    const slots = [];
    let startHour = location === "Ronald Ngala Street Branch" ? 8 : 9;
    const endHour = 17; // 5 PM

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const generateBookingNumber = () => {
    const date = format(new Date(), 'yyyyMMdd');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `OPT${date}${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const generatedBookingNumber = generateBookingNumber();
  
    try {
      const emailData = {
        ...formData,
        bookingNumber: generatedBookingNumber,
        date: format(formData.appointmentDate, 'MMMM do, yyyy'),
        time: formData.appointmentTime
      };
  
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingData: emailData }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send confirmation email');
      }
  
      const result = await response.json();
      console.log('Email sent:', result);
  
      setBookingNumber(generatedBookingNumber);
      setBookingComplete(true);
    } catch (error) {
      console.error('Booking error:', error);
      alert('There was an error booking your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FeatureCard = ({ icon, text }) => (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="flex items-center bg-white/10 backdrop-blur-lg rounded-lg px-4 py-3 shadow-lg"
    >
      <div className="mr-3 text-yellow-300">{icon}</div>
      <span className="text-sm font-medium">{text}</span>
    </motion.div>
  );

  const ServiceCard = ({ service, selected, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-xl shadow-md transition-all ${
        selected 
          ? 'border-2 border-blue-600 bg-blue-50' 
          : 'border border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h4 className="font-medium text-lg">{service.name}</h4>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{service.duration}</span>
          </div>
          <p className="text-gray-600 text-sm">{service.description}</p>
        </div>
        <span className={`font-semibold ${
          service.price === 'FREE' ? 'text-green-600' : 'text-blue-600'
        }`}>
          {service.price}
        </span>
      </div>
    </motion.div>
  );

  if (bookingComplete) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto px-4"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <CalendarCheck className="w-20 h-20 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="text-xl opacity-90">Your booking number is:</p>
              <p className="text-2xl font-mono mt-2">{bookingNumber}</p>
            </div>

            <div className="p-8 space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500 mr-2" />
                  <p className="text-xl font-medium text-gray-900">
                    Thank you for choosing Optiplus!
                  </p>
                </div>
                <p className="text-gray-600">
                  A confirmation email has been sent to {formData.email}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">
                  Appointment Details:
                </h3>
                <div className="grid gap-4">
                  <DetailRow 
                    icon={<User className="text-blue-600" />}
                    label="Name"
                    value={`${formData.firstName} ${formData.lastName}`}
                  />
                  <DetailRow 
                    icon={<Calendar className="text-blue-600" />}
                    label="Date"
                    value={format(formData.appointmentDate, 'MMMM do, yyyy')}
                  />
                  <DetailRow 
                    icon={<Clock className="text-blue-600" />}
                    label="Time"
                    value={formData.appointmentTime}
                  />
                  <DetailRow 
                    icon={<Eye className="text-blue-600" />}
                    label="Service"
                    value={formData.service}
                  />
                  <DetailRow 
                    icon={<MapPin className="text-blue-600" />}
                    label="Location"
                    value={formData.location}
                  />
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-medium text-blue-900 mb-2">Important Notes:</h4>
                <ul className="text-blue-800 space-y-2">
                  <li className="flex items-start">
                    <ExternalLink className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    Please arrive 10 minutes before your appointment time
                  </li>
                  <li className="flex items-start">
                    <ExternalLink className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    Bring any current eyewear or prescriptions
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/"
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg 
                           hover:bg-blue-700 transition-colors text-center font-medium"
                >
                  Return to Homepage
                </Link>
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg 
                           hover:bg-gray-200 transition-colors text-center font-medium"
                >
                  Book Another Appointment
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with proper spacing */}
      <div className="pt-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Book Your Eye Care Appointment
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 mb-8"
            >
              Professional eye care services at your convenience
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <FeatureCard icon={<Sparkles className="w-5 h-5" />} text="Free Eye Testing" />
              <FeatureCard icon={<Clock3 className="w-5 h-5" />} text="Quick Service" />
              <FeatureCard icon={<Award className="w-5 h-5" />} text="Expert Staff" />
              <FeatureCard icon={<Star className="w-5 h-5" />} text="Quality Care" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Booking Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Progress Steps */}
          <div className="p-6 border-b border-gray-200">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="flex justify-between mb-2">
                  {['Personal Info', 'Service & Location', 'Date & Time'].map((step, index) => (
                    <div
                      key={index}
                      className={`flex-1 text-center ${
                        formStep > index + 1
                          ? 'text-blue-600'
                          : formStep === index + 1
                          ? 'text-blue-600'
                          : 'text-gray-400'
                      }`}
                    >
                      <span className="text-sm font-medium">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  {[1, 2, 3].map((step) => (
                    <motion.div
                      key={step}
                      initial={{ width: "0%" }}
                      animate={{
                        width: formStep >= step ? "33.33%" : "0%"
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap 
                               text-white justify-center bg-blue-600"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Information */}
              {formStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center mb-6">
                    <User className="w-6 h-6 text-blue-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          required
                          className="pl-10 w-full p-3 border border-gray-300 rounded-lg 
                                   focus:ring-2 focus:ring-blue-500 transition-all"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          required
                          className="pl-10 w-full p-3 border border-gray-300 rounded-lg 
                                   focus:ring-2 focus:ring-blue-500 transition-all"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          required
                          className="pl-10 w-full p-3 border border-gray-300 rounded-lg 
                                   focus:ring-2 focus:ring-blue-500 transition-all"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          required
                          className="pl-10 w-full p-3 border border-gray-300 rounded-lg 
                                   focus:ring-2 focus:ring-blue-500 transition-all"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setFormStep(2)}
                    className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                             transition-colors flex items-center justify-center"
                  >
                    Next Step
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2: Service & Location Selection */}
              {formStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center mb-6">
                    <Eye className="w-6 h-6 text-blue-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900">Select Service & Location</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Choose a Service
                      </label>
                      <div className="grid grid-cols-1 gap-4">
                        {services.map((service) => (
                          <ServiceCard
                            key={service.id}
                            service={service}
                            selected={formData.service === service.name}
                            onClick={() => setFormData({ ...formData, service: service.name })}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Branch Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                          required
                          className="pl-10 w-full p-3 border border-gray-300 rounded-lg 
                                   focus:ring-2 focus:ring-blue-500 transition-all"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        >
                          <option value="">Choose a branch location</option>
                          {locations.map((location) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="w-1/2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 
                               transition-colors flex items-center justify-center"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setFormStep(3)}
                      className="w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                               transition-colors flex items-center justify-center"
                      disabled={!formData.service || !formData.location}
                    >
                      Next Step
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Date & Time Selection */}
              {formStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center mb-6">
                    <Calendar className="w-6 h-6 text-blue-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-900">Select Date & Time</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Choose Appointment Date
                      </label>
                      <div className="relative w-full">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <DatePicker
                          selected={formData.appointmentDate}
                          onChange={(date) => setFormData({ ...formData, appointmentDate: date })}
                          minDate={new Date()}
                          filterDate={date => {
                            const day = date.getDay();
                            return day !== 0; // Exclude Sundays
                          }}
                          dateFormat="MMMM d, yyyy"
                          className="pl-10 w-full p-3 border border-gray-300 rounded-lg 
                                   focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholderText="Select a date"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Choose Appointment Time
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {getTimeSlots(formData.location).map((time) => (
                          <motion.button
                            key={time}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFormData({ ...formData, appointmentTime: time })}
                            className={`p-2 text-center rounded-lg border ${
                              formData.appointmentTime === time
                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                : 'border-gray-200 hover:border-blue-600'
                            }`}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes (Optional)
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <textarea
                          rows="3"
                          className="pl-10 w-full p-3 border border-gray-300 rounded-lg 
                                   focus:ring-2 focus:ring-blue-500 transition-all"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Any specific concerns or requirements?"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="w-1/2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 
                               transition-colors flex items-center justify-center"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting || !formData.appointmentDate || !formData.appointmentTime}
                      className="w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                               transition-colors flex items-center justify-center 
                               disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" 
                                    stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" 
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <>
                          Confirm Booking
                          <ChevronRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Additional Information Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <InfoCard
            icon={<Clock className="w-8 h-8 text-blue-600" />}
            title="Opening Hours"
            content="Monday - Friday: 9:00 AM - 6:00 PM
                    Saturday: 9:00 AM - 4:00 PM
                    Closed on Sundays"
          />
          <InfoCard
            icon={<Phone className="w-8 h-8 text-blue-600" />}
            title="Contact Info"
            content="+254 702 220 545
                    +254 105 165 560
                    info@optikenya.com"
          />
          <InfoCard
            icon={<MapPin className="w-8 h-8 text-blue-600" />}
            title="Our Locations"
            content="Moi Avenue - Nacico Chambers
                    Ronald Ngala Street"
          />
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, content }) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-lg font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600 whitespace-pre-line">{content}</p>
  </div>
);

// DetailRow component for showing booking details
const DetailRow = ({ icon, label, value }) => (
    <div className="flex items-start space-x-3">
      <div className="w-5 h-5 mt-1 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
  
  // Custom styles for the DatePicker component
  const datePickerStyles = `
    .react-datepicker-wrapper {
      width: 100%;
    }
  
    .react-datepicker {
      font-family: inherit;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  
    .react-datepicker__header {
      background-color: #f3f4f6;
      border-bottom: 1px solid #e5e7eb;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      padding-top: 8px;
    }
  
    .react-datepicker__day--selected {
      background-color: #2563eb;
      color: white;
      border-radius: 9999px;
    }
  
    .react-datepicker__day:hover {
      background-color: #bfdbfe;
      border-radius: 9999px;
    }
  
    .react-datepicker__day--disabled {
      color: #9ca3af;
    }
  `;
  
  // Apply DatePicker styles to the document
  if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = datePickerStyles;
    document.head.appendChild(styleSheet);
  }
  
  // Form validation helper function
  const validateForm = (step, formData) => {
    switch (step) {
      case 1:
        return (
          formData.firstName.trim() !== '' &&
          formData.lastName.trim() !== '' &&
          formData.email.trim() !== '' &&
          formData.phone.trim() !== ''
        );
      case 2:
        return formData.service !== '' && formData.location !== '';
      case 3:
        return formData.appointmentDate !== null && formData.appointmentTime !== '';
      default:
        return false;
    }
  };
  
  // Time formatting helper function
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };
  
  export default BookingPage;