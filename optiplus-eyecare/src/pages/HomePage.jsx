import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Eye, Calendar, Shield, Award, Star, Clock, 
  Check, Phone, Mail, MapPin, ChevronDown, ChevronUp,
  Heart, Users, Sparkles, Activity, ArrowRight
} from 'lucide-react';

// Import your images
import eyeTest from '../assets/images/eyetest.jpg';
import eyeTest1 from '../assets/images/eyetest1.jpeg';
import eyeTest3 from '../assets/images/eyetest3.jpeg';
import eye from '../assets/images/eye.jpeg';

const HomePage = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Header background images
  const backgroundImages = [eyeTest, eyeTest1, eyeTest3];

  // Gallery images with descriptions
  const galleryImages = [
    {
      image: eyeTest,
      title: 'Advanced Eye Testing Equipment',
      description: 'State-of-the-art diagnostic equipment for precise results'
    },
    {
      image: eyeTest1,
      title: 'Comprehensive Eye Examinations',
      description: 'Thorough eye examinations by expert optometrists'
    },
    {
      image: eyeTest3,
      title: 'Professional Vision Care',
      description: 'Professional care for all your vision needs'
    },
    {
      image: eye,
      title: 'Modern Eye Care Technology',
      description: 'Latest technology for optimal eye care'
    }
  ];

  // Auto-advance background slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Services data
  const services = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Advanced Eye Examinations",
      description: "State-of-the-art comprehensive eye exams using digital retinal imaging and OCT technology for early detection of eye conditions.",
      link: "/services",
      color: "bg-emerald-50 hover:bg-emerald-100"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Specialized Vision Therapy",
      description: "Customized vision therapy programs for children and adults to improve visual processing, tracking, and coordination.",
      link: "/services",
      color: "bg-violet-50 hover:bg-violet-100"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Eyewear Solutions",
      description: "Extensive collection of designer frames and premium lenses with anti-glare, blue light protection, and UV filtering options.",
      link: "/services",
      color: "bg-amber-50 hover:bg-amber-100"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Free Eye Health Consultation",
      description: "Complimentary consultations with experienced optometrists to discuss your vision concerns and treatment options.",
      link: "/book-appointment",
      color: "bg-sky-50 hover:bg-sky-100"
    }
  ];

  // Features data
  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Patient-Centered Care",
      description: "Personalized attention for your unique vision needs"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Advanced Technology",
      description: "State-of-the-art diagnostic equipment"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Team",
      description: "Experienced optometrists and vision specialists"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Modern Facility",
      description: "Comfortable and welcoming environment"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "What should I expect during an eye examination?",
      answer: "Our comprehensive eye examinations include visual acuity testing, refraction assessment, eye pressure measurement, and detailed retinal examination. We use advanced digital imaging technology to ensure thorough evaluation of your eye health."
    },
    {
      question: "How often should I have my eyes checked?",
      answer: "We recommend annual eye examinations for most adults. However, if you have specific eye conditions or risk factors, more frequent visits may be necessary. Children should have their first eye exam at 6 months of age."
    },
    {
      question: "Do you offer emergency eye care services?",
      answer: "Yes, we provide urgent eye care services for acute conditions like eye infections, foreign objects, or sudden vision changes. Contact us immediately if you experience any eye emergencies."
    },
    {
      question: "What types of payment options do you accept?",
      answer: "We accept most major insurance plans, cash, credit cards, and offer flexible payment plans. We also provide special packages for comprehensive eye care services."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence>
            {backgroundImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: currentSlide === index ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90">
                  <img 
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl text-white"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Advanced Eye Care for Your Entire Family
              </h1>
              <p className="text-xl mb-8">
                Experience exceptional vision care with our team of expert optometrists using 
                state-of-the-art technology for comprehensive eye health solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/book-appointment"
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 
                           rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 
                           transition duration-300 text-center"
                >
                  Book Free Consultation
                </Link>
                <Link 
                  to="/services"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold 
                           hover:bg-white/10 transition duration-300 text-center"
                >
                  Explore Services
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="text-center p-6"
              >
                <div className="inline-block p-3 bg-indigo-100 rounded-full text-indigo-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 
                         bg-clip-text text-transparent">
              Comprehensive Eye Care Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advanced eye care solutions utilizing the latest technology for optimal vision health
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`${service.color} p-8 rounded-xl shadow-lg hover:shadow-xl 
                          transition-all duration-300`}
              >
                <div className="text-indigo-600 mb-6">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link 
                  to={service.link}
                  className="text-indigo-600 font-semibold flex items-center gap-2 hover:text-indigo-700"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 
                         bg-clip-text text-transparent">
              Our Modern Facility
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience eye care in our state-of-the-art facilities equipped with the latest technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryImages.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-xl shadow-lg group"
              >
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent 
                              opacity-100 group-hover:opacity-90 transition-opacity">
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-200">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 
                         bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our eye care services
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={false}
                animate={{ backgroundColor: activeAccordion === index ? '#EEF2FF' : '#FFFFFF' }}
                className="mb-4 rounded-lg overflow-hidden shadow-md"
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-indigo-50 
                           transition-colors"
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  {activeAccordion === index ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-indigo-600" />
                  )}
                </button>
                <AnimatePresence>
                  {activeAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-indigo-50">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Experience Better Vision Care?
            </h2>
            <p className="text-xl mb-8">
              Schedule your comprehensive eye examination today and take the first step 
              towards optimal vision health.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/book-appointment"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold 
                         hover:bg-indigo-50 transition duration-300 text-center"
              >
                Book Your Examination
              </Link>
              <Link
                to="/services"
                className="border-2 border-white px-8 py-4 rounded-lg font-semibold 
                         hover:bg-white/10 transition duration-300 text-center"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Location */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Our Locations</h3>
              <div className="space-y-2 text-gray-600">
                <p>Moi Avenue Branch</p>
                <p>Opposite Imenti House – Nacico Chambers</p>
                <p>Ronald Ngala Street Branch</p>
                <p>Opposite The Post Office</p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
                <p>Public Holidays: Closed</p>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Phone className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2 text-gray-600">
                <p>Phone: +254 702 220 545</p>
                <p>Phone: +254 105 165 560</p>
                <p>Email: info@optikenya.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;