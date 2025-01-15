import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Award, Users, Heart, Shield, Star, 
  Clock, MapPin, Phone, Target
} from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Patient-Centered Care",
      description: "Your eye health and comfort are our top priorities"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Excellence",
      description: "Commitment to the highest standards of eye care"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Focus",
      description: "Serving our local community with dedication"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Innovation",
      description: "Using the latest technology and techniques"
    }
  ];

  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "20k+", label: "Happy Patients" },
    { number: "2", label: "Locations" },
    { number: "15+", label: "Eye Care Experts" }
  ];

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
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Trusted Eye Care Partner
            </h1>
            <p className="text-xl mb-8">
              Providing comprehensive eye care services with a commitment to excellence since 1998
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 1998, OptiPlus has been at the forefront of providing exceptional 
                eye care services in Nairobi. Our journey began with a simple mission: to make 
                quality eye care accessible to everyone.
              </p>
              <p className="text-gray-600 mb-4">
                Over the years, we've grown from a single location to multiple branches, 
                serving thousands of patients with the same dedication and commitment to 
                excellence that we started with.
              </p>
              <p className="text-gray-600">
                Today, we continue to invest in the latest technology and expertise to 
                ensure our patients receive the best possible care for their vision needs.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-blue-50 p-6 rounded-lg text-center"
                >
                  <h3 className="text-3xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do at OptiPlus
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="inline-block p-3 bg-blue-50 rounded-full text-blue-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Locations */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Visit Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conveniently located in Nairobi to serve you better
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <div className="flex items-start mb-6">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                    <p className="text-gray-600">{location.address}</p>
                    <p className="text-gray-600">{location.city}</p>
                  </div>
                </div>

                <div className="flex items-start mb-6">
                  <Phone className="w-6 h-6 text-blue-600 mt-1" />
                  <div className="ml-4">
                    <p className="text-gray-600">{location.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Experience Our Care?
            </h2>
            <p className="text-xl mb-8">
              Schedule your eye examination today and see the difference quality care makes.
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

export default AboutPage;