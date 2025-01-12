import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, 
  Send, MessageCircle, User
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Add these states to your existing states
const [submitSuccess, setSubmitSuccess] = useState(false);
const [submitError, setSubmitError] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError(false);

  try {
    const response = await fetch('/.netlify/functions/send-contact-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contactData: formData }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    setSubmitError(true);
  } finally {
    setIsSubmitting(false);
  }
};

  const locations = [
    {
      name: "Moi Avenue Branch",
      address: "Opposite Imenti House – Nacico Chambers",
      city: "Nairobi, Kenya",
      phone: "+254 702 220 545",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM"
    },
    {
      name: "Ronald Ngala Branch",
      address: "Opposite The Post Office",
      city: "Nairobi, Kenya",
      phone: "+254 105 165 560",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM"
    }
  ];


  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl">
              We're here to help with all your eye care needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-start mb-6">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                    <p className="text-gray-600">{location.address}</p>
                    <p className="text-gray-600">{location.city}</p>
                  </div>
                </div>

                <div className="flex items-start mb-6">
                  <Phone className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="text-gray-600">{location.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="text-gray-600 whitespace-pre-line">{location.hours}</p>
                    <p className="text-gray-500 mt-1">Closed on Sundays & Public Holidays</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    required
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-blue-500 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-blue-500 transition-all"
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
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-blue-500 transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    rows="4"
                    required
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                             focus:ring-blue-500 transition-all"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
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
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Additional Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Call Us</h3>
              <p className="text-gray-600">+254 702 220 545</p>
              <p className="text-gray-600">+254 105 165 560</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Email Us</h3>
              <p className="text-gray-600">info@optiplus.co.ke</p>
              <p className="text-gray-600">appointments@optiplus.co.ke</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Contact CTA */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Need Emergency Eye Care?</h2>
            <p className="text-gray-600 mb-8">
              For urgent eye care needs during business hours, please call us immediately.
              We prioritize emergency cases and will do our best to accommodate you.
            </p>
            <a
              href="tel:+254702220545"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg 
                     font-semibold hover:bg-blue-700 transition duration-300"
            >
              Call Emergency Number
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;