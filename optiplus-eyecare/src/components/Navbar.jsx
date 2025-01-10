import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Eye, Facebook, Instagram, MessageCircle } from 'lucide-react';

// Import logo
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
  }`;

  const linkClasses = `${
    scrolled || isOpen ? 'text-gray-700' : 'text-white'
  } hover:text-blue-500 transition duration-300`;

  // Updated mobile menu to slide from right
  const mobileMenuClasses = `
    fixed top-0 right-0 w-[80%] sm:w-[60%] md:w-[45%] h-full bg-white 
    transform transition-transform duration-300 ease-in-out z-40
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
  `;

  // Social media links
  const socialLinks = [
    {
      icon: <Facebook className="w-6 h-6" />,
      url: 'https://facebook.com/optiplus.kenya',
      color: 'hover:text-blue-600'
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      url: 'https://instagram.com/optipluslts',
      color: 'hover:text-pink-600'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      url: 'https://wa.me/254702220545',
      color: 'hover:text-green-600'
    }
  ];

  return (
    <>
      <nav className={navClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={logo} 
                alt="Optiplus Logo" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" className={linkClasses}>Home</NavLink>
              <NavLink to="/about" className={linkClasses}>About</NavLink>
              <NavLink to="/services" className={linkClasses}>Services</NavLink>
              <NavLink to="/contact" className={linkClasses}>Contact</NavLink>
              <Link
                to="/book-appointment"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 
                         transition duration-300"
              >
                Book Appointment
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg"
            >
              {isOpen ? (
                <X className={scrolled ? 'text-gray-800' : 'text-gray-800'} />
              ) : (
                <Menu className={scrolled ? 'text-gray-800' : 'text-gray-800'} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Now slides from right */}
      <div className={mobileMenuClasses}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={logo} 
                alt="Optiplus Logo" 
                className="h-10 w-auto"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex flex-col flex-grow overflow-y-auto">
            <div className="flex flex-col py-4">
              <MobileNavLink to="/">Home</MobileNavLink>
              <MobileNavLink to="/about">About</MobileNavLink>
              <MobileNavLink to="/services">Services</MobileNavLink>
              <MobileNavLink to="/contact">Contact</MobileNavLink>
            </div>

            {/* Social Links */}
            <div className="mt-auto">
              <div className="px-4 py-6 border-t">
                <p className="text-sm text-gray-600 mb-4">Connect with us:</p>
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-600 ${link.color} transition-colors duration-300`}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Book Appointment Button - Now at bottom */}
              <div className="p-4 border-t bg-gray-50">
                <Link
                  to="/book-appointment"
                  className="block w-full text-center bg-blue-600 text-white px-4 py-3 
                           rounded-lg hover:bg-blue-700 transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const NavLink = ({ to, children, className }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${className} ${
        isActive ? 'font-semibold' : ''
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-300 ${
        isActive ? 'font-semibold bg-gray-50' : ''
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;