import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Eye, Shield, Star, Search, 
  Activity, Glasses, FileCheck, HeartPulse
} from 'lucide-react';

const ServicesPage = () => {
  const mainServices = [
    {
      icon: <Eye className="w-12 h-12" />,
      title: "Comprehensive Eye Examination",
      description: "Complete visual analysis using state-of-the-art technology to examine your eye health, vision, and detect any potential issues.",
      features: [
        "Visual acuity testing",
        "Refraction assessment",
        "Eye pressure measurement",
        "Fitting and dispensing",
        "Cataract",
        "Free Blood Pressure Test"
      ],
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      btnColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Preventive Eye Care",
      description: "Regular check-ups and screenings to maintain optimal eye health and prevent potential vision problems.",
      features: [
        "Macular degeneration testing",
        "Glaucoma screening",
        "Diabetic eye examinations",
        "Pediatric vision tests"
      ],
      color: "bg-green-50",
      iconColor: "text-green-600",
      btnColor: "bg-green-600 hover:bg-green-700"
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Vision Correction Solutions",
      description: "Customized vision correction options tailored to your lifestyle and visual needs.",
      features: [
        "FUNDUS checkup",
        "Bi-Focal Lenses",
        "Single vision lenses",
        "Specialty contact lenses",
        "Progressive lenses"
      ],
      color: "bg-purple-50",
      iconColor: "text-purple-600",
      btnColor: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  const additionalServices = [
    {
      icon: <Search />,
      title: "Digital Eye Strain Solutions",
      description: "Specialized care for computer-related vision problems",
      color: "text-indigo-600"
    },
    {
      icon: <Activity />,
      title: "Eye Disease Management",
      description: "Treatment and monitoring of various eye conditions",
      color: "text-rose-600"
    },
    {
      icon: <Glasses />,
      title: "Frame Styling & Fitting",
      description: "Expert assistance in choosing the perfect frames",
      color: "text-amber-600"
    },
    {
      icon: <FileCheck />,
      title: "Vision Therapy",
      description: "Exercises and techniques to improve visual skills",
      color: "text-emerald-600"
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
              Comprehensive Eye Care Services
            </h1>
            <p className="text-xl mb-8">
              Expert care for your vision using advanced technology and professional expertise
            </p>
            <Link
              to="/book-appointment"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg 
                     font-semibold hover:bg-blue-50 transition duration-300"
            >
              Book Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`${service.color} rounded-xl p-8 shadow-lg`}
              >
                <div className={`${service.iconColor} mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <HeartPulse className="w-5 h-5 mr-2 text-gray-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book-appointment"
                  className={`inline-block text-white px-6 py-3 rounded-lg 
                           font-semibold transition duration-300 ${service.btnColor}`}
                >
                  Schedule Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16"
          >
            Additional Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl 
                         transition-all duration-300 cursor-pointer"
              >
                <div className={`${service.color} mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Experience Better Vision?
            </h2>
            <p className="text-xl mb-8">
              Schedule your comprehensive eye examination today and take the first step 
              towards optimal vision health.
            </p>
            <Link
              to="/book-appointment"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg 
                     font-semibold hover:bg-blue-50 transition duration-300"
            >
              Book Your Appointment
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;