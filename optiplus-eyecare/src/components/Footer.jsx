import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Branches */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Our Branches</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Along Moi Avenue Opposite Imenti House – Nacico Chambers Nairobi, Kenya</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Ronald Ngala Street Opposite The Post Office Nairobi, Kenya</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition duration-300">
                  Products
                </Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">More Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/frames" className="text-gray-400 hover:text-white transition duration-300">
                  Frames
                </Link>
              </li>
              <li>
                <Link to="/lenses" className="text-gray-400 hover:text-white transition duration-300">
                  Lenses
                </Link>
              </li>
              <li>
                <Link to="/sunglasses" className="text-gray-400 hover:text-white transition duration-300">
                  Sunglasses
                </Link>
              </li>
              <li>
                <Link to="/contact-lenses" className="text-gray-400 hover:text-white transition duration-300">
                  Contact Lenses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <div>
                  <p className="text-gray-400">+254 702 220 545</p>
                  <p className="text-gray-400">+254 105 165 560</p>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span className="text-gray-400">info@optikenya.com</span>
              </li>
              <li className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Business Hours</h4>
                <div className="text-gray-400">
                  <p>Monday – Friday: 9:00am – 6:00pm</p>
                  <p>Saturday: 9:00am – 4:00pm</p>
                  <p>Closed on Sundays & Public Holidays</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} OptiKenya. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;