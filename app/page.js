'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  FaHome, 
  FaBuilding, 
  FaCog, 
  FaWrench, 
  FaTools, 
  FaTint, 
  FaMicroscope, 
  FaExclamationTriangle,
  FaShieldAlt,
  FaUsers,
  FaRecycle,
  FaLeaf,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaTimes
} from 'react-icons/fa';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [showAnimations, setShowAnimations] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [animationsStarted, setAnimationsStarted] = useState(false);

  // Installation gallery images
  const installationImages = [
    'WhatsApp Image 2025-09-06 at 01.51.06.jpeg',
    'WhatsApp Image 2025-09-06 at 01.51.06 (1).jpeg',
    'WhatsApp Image 2025-09-06 at 01.51.07.jpeg',
    'WhatsApp Image 2025-09-06 at 01.51.07 (1).jpeg',
    'WhatsApp Image 2025-09-06 at 01.51.07 (3).jpeg',
    'WhatsApp Image 2025-09-06 at 01.51.08.jpeg'
  ];

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('IS_OPENED');
    if (!hasVisited) {
      setShowAnimations(true);
      setShowCookieConsent(true);
      // Start animations and stop after 5 seconds
      setAnimationsStarted(true);
      setTimeout(() => {
        setShowAnimations(false);
        setAnimationsStarted(false);
      }, 5000);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Animate sections on scroll
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setVisibleSections(prev => new Set(prev).add(section.id));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCookieAccept = (accepted) => {
    localStorage.setItem('IS_OPENED', 'true');
    if (accepted) {
      localStorage.setItem('COOKIES_ACCEPTED', 'true');
    } else {
      localStorage.setItem('COOKIES_ACCEPTED', 'false');
    }
    setShowCookieConsent(false);
  };

  const handleQuoteClick = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
      {/* Cookie Consent Popup */}
      {showCookieConsent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">Cookie Notice</h3>
              <button 
                onClick={() => handleCookieAccept(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              We use cookies to enhance your experience on our website. By continuing to use our site, you accept our use of cookies.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleCookieAccept(true)}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Accept Cookies
              </button>
              <button
                onClick={() => handleCookieAccept(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Continue Without
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Water Droplets Background - Only show if animations are active */}
      {showAnimations && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-4 h-4 bg-blue-200 rounded-full opacity-60 animate-float-slow"></div>
          <div className="absolute top-32 right-20 w-6 h-6 bg-blue-300 rounded-full opacity-40 animate-float-medium"></div>
          <div className="absolute top-64 left-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-50 animate-float-fast"></div>
          <div className="absolute top-96 right-1/3 w-5 h-5 bg-blue-200 rounded-full opacity-60 animate-float-slow"></div>
          <div className="absolute bottom-96 left-1/2 w-4 h-4 bg-blue-300 rounded-full opacity-40 animate-float-medium"></div>
          <div className="absolute bottom-32 right-10 w-6 h-6 bg-blue-400 rounded-full opacity-50 animate-float-fast"></div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#1a42c7] backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 ">
        
                <img src="/Kusiniwater_logo.png" alt="Kusini Water Logo" className={`h-16 object-contain ${isScrolled ? 'block' : 'hidden md:block'}`} />
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-white font-medium hover:text-blue-200 transition-colors text-shadow">Home</a>
              <a href="#about" className="text-white font-medium hover:text-blue-200 transition-colors text-shadow">About</a>
              <a href="#services" className="text-white font-medium hover:text-blue-200 transition-colors text-shadow">Services</a>
              <a href="#gallery" className="text-white font-medium hover:text-blue-200 transition-colors text-shadow">Gallery</a>
              <a href="#contact" className="text-white font-medium hover:text-blue-200 transition-colors text-shadow">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/view-realistic-hands-touching-clear-flowing-water.jpg"
            alt="Hands touching clear flowing water"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
         <div className='flex justify-center'>
              <img src="/Kusiniwater_logo.png" alt="Kusini Water Logo" className="h-40 md:h-40 object-contain items-center" />
         </div>
          
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent text-shadow ${
            showAnimations ? 'animate-float-medium' : ''
          }`}>
          
          
          </h1>
          <p className={`text-2xl md:text-3xl text-blue-100 mb-4 text-shadow ${
            showAnimations ? 'animate-float-fast' : ''
          }`}>
           
          </p>
          <h2 className="text-xl md:text-4xl font-semibold text-white mb-6 text-shadow">
            Advanced Water Filtration for Homes & Enterprises
          </h2>
          <p className="text-lg text-blue-100 mb-12 max-w-3xl mx-auto text-shadow">
            Cleaner, safer water – delivered directly to your taps in Dikgale and surrounding areas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={handleQuoteClick}
              className="px-4 py-2 md:px-8 md:py-4 xl:px-8 xl:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl btn-water"
            >
              Get a Free Quote
            </button>
            <button 
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-2 md:px-8 md:py-4 xl:px-8 xl:py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              Explore Our Systems
            </button>
          </div>
        </div>

        {/* Wave Animation */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 320" className="w-full h-32">
            <path 
              fill="#3b82f6" 
              fillOpacity="0.1" 
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className={showAnimations ? 'animate-float-slow' : ''}
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="py-20 bg-white animate-on-scroll"
        style={{
          opacity: visibleSections.has('about') ? 1 : 0,
          transform: visibleSections.has('about') ? 'translateY(0)' : 'translateY(50px)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl xl:text-5xl font-bold text-gray-800 mb-6">
              About Kusini Water
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={showAnimations ? 'animate-float-medium' : ''}>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At Kusini Water, we specialise in providing cutting-edge water filtration and pumping solutions for the Dikgale community and beyond. Our mission is to make clean, safe, great-tasting water accessible to every home and business.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Whether it's a small household or a large enterprise, we design, install, and maintain systems that guarantee water quality and reliability. Our expertise in the local water conditions ensures optimal solutions for our community.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <p className="text-blue-600 font-semibold text-lg">Trusted by Dikgale Community</p>
              </div>
            </div>
            <div className={`grid grid-cols-2 gap-4 ${showAnimations ? 'animate-float-fast' : ''}`}>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-blue-500 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">5+</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Years Experience</h3>
                <p className="text-gray-600 text-sm">Serving the community</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-green-500 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">500+</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Happy Customers</h3>
                <p className="text-gray-600 text-sm">Satisfied clients</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-purple-500 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">24/7</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Support</h3>
                <p className="text-gray-600 text-sm">Always available</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-orange-500 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">100%</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Quality</h3>
                <p className="text-gray-600 text-sm">Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="services" 
        className="py-20 bg-gradient-to-b from-blue-50 to-white animate-on-scroll"
        style={{
          opacity: visibleSections.has('services') ? 1 : 0,
          transform: visibleSections.has('services') ? 'translateY(0)' : 'translateY(50px)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl xl:text-5xl font-bold text-gray-800 mb-6">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive water solutions tailored for Dikgale's unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Home Water Filtration Systems",
                description: "Compact yet powerful systems that purify your entire household's water supply with advanced filtration technology.",
                icon: FaHome,
                color: "blue"
              },
              {
                title: "Enterprise & Commercial Filtration",
                description: "Scalable solutions for hotels, factories, schools, and other large-scale facilities in the Dikgale area.",
                icon: FaBuilding,
                color: "green"
              },
              {
                title: "Custom Water Treatment Design",
                description: "Tailored systems designed to meet specific water quality challenges unique to your location.",
                icon: FaCog,
                color: "purple"
              },
              {
                title: "Professional Installation & Setup",
                description: "Expert installation ensures your system works perfectly from day one with our certified technicians.",
                icon: FaWrench,
                color: "orange"
              },
              {
                title: "Maintenance & Servicing",
                description: "Regular maintenance plans for worry-free operation and optimal system performance.",
                icon: FaTools,
                color: "red"
              },
              {
                title: "Water Storage & Pumping Solutions",
                description: "Complete tanks, pumps, and plumbing integration for reliable water supply systems.",
                icon: FaTint,
                color: "teal"
              },
              {
                title: "Water Testing & Analysis",
                description: "Comprehensive water quality testing to identify issues and provide personalized solutions.",
                icon: FaMicroscope,
                color: "indigo"
              },
              {
                title: "Emergency & Backup Systems",
                description: "Stay prepared for municipal supply disruptions with reliable backup water systems.",
                icon: FaExclamationTriangle,
                color: "yellow"
              }
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 hover-scale ${
                    showAnimations ? `animate-float-${index % 3 === 0 ? 'slow' : index % 3 === 1 ? 'medium' : 'fast'}` : ''
                  }`}
                  style={{ animationDelay: showAnimations ? `${index * 200}ms` : '0ms' }}
                >
                  <div className={`text-4xl mb-4 text-${service.color}-500 ${showAnimations ? 'animate-bounce' : ''}`} 
                       style={{ animationDelay: showAnimations ? `${index * 300}ms` : '0ms' }}>
                    <IconComponent />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  <div className={`mt-6 w-full h-1 bg-gradient-to-r from-${service.color}-400 to-${service.color}-600 rounded-full`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Installation Gallery */}
      <section 
        id="gallery" 
        className="py-20 bg-white animate-on-scroll"
        style={{
          opacity: visibleSections.has('gallery') ? 1 : 0,
          transform: visibleSections.has('gallery') ? 'translateY(0)' : 'translateY(50px)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl xl:text-5xl font-bold text-gray-800 mb-6">
              Our Successful Installations
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the quality of our work through real installations in Dikgale and surrounding areas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {installationImages.map((image, index) => (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 hover-scale ${
                  showAnimations ? `animate-float-${index % 3 === 0 ? 'slow' : index % 3 === 1 ? 'medium' : 'fast'}` : ''
                }`}
                style={{ animationDelay: showAnimations ? `${index * 150}ms` : '0ms' }}
              >
                <div className="aspect-w-16 aspect-h-12">
                  <Image
                    src={`/${image}`}
                    alt={`Water filtration installation ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 image-hover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">Professional Installation</h3>
                    <p className="text-sm opacity-90">Quality water filtration system</p>
                  </div>
                </div>
                <div className={`absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  showAnimations ? 'animate-bounce' : ''
                }`}>
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-5xl xl:text-5xl font-bold mb-6 ${showAnimations ? 'animate-float-medium' : ''}`}>
            Why Choose Kusini Water?
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaShieldAlt,
                title: "Trusted Technology",
                description: "Reliable service backed by proven water filtration technology"
              },
              {
                icon: FaUsers,
                title: "Local Expertise",
                description: "Deep understanding of Dikgale's unique water challenges"
              },
              {
                icon: FaRecycle,
                title: "End-to-End Service",
                description: "Complete solution: design, installation, and maintenance"
              },
              {
                icon: FaLeaf,
                title: "Sustainability Focus",
                description: "Passionate about environmental protection and water safety"
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className={`text-center ${
                    showAnimations ? `animate-float-${index % 3 === 0 ? 'slow' : index % 3 === 1 ? 'medium' : 'fast'}` : ''
                  }`}
                  style={{ animationDelay: showAnimations ? `${index * 200}ms` : '0ms' }}
                >
                  <div className={`text-5xl mb-4 ${showAnimations ? 'animate-bounce' : ''}`} 
                       style={{ animationDelay: showAnimations ? `${index * 300}ms` : '0ms' }}>
                    <IconComponent className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-blue-100">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="py-20 bg-gray-50 animate-on-scroll"
        style={{
          opacity: visibleSections.has('contact') ? 1 : 0,
          transform: visibleSections.has('contact') ? 'translateY(0)' : 'translateY(50px)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl xl:text-5xl font-bold text-gray-800 mb-6 ${showAnimations ? 'animate-float-medium' : ''}`}>
              Contact Kusini Water
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-blue-600 mb-8">
              Let's bring safe water to your home or business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className={showAnimations ? 'animate-float-slow' : ''}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Location</h4>
                    <p className="text-gray-600">Dikgale, Limpopo Province</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <p className="text-gray-600">+27 76 115 6828</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FaClock className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Service Hours</h4>
                    <p className="text-gray-600">Mon-Fri: 8AM-6PM, Sat: 9AM-4PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`bg-white p-8 rounded-2xl shadow-lg ${showAnimations ? 'animate-float-fast' : ''}`}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Request a Free Quote</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all focus-ring"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all focus-ring"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all focus-ring">
                    <option>Home Water Filtration</option>
                    <option>Commercial/Enterprise System</option>
                    <option>Water Testing & Analysis</option>
                    <option>Maintenance & Repair</option>
                    <option>Emergency Water System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows="4" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all focus-ring"
                    placeholder="Tell us about your water filtration needs..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg btn-water"
                >
                  Send Free Quote Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a42c7] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-6">
              <img src="/Kusiniwater_logo.png" alt="Kusini Water Logo" className="h-18 md:h-18 object-contain" />
     
            </div>
            <p className="text-white mb-6">
              Purpose in Every Drop - Serving Dikgale with Premium Water Filtration Solutions
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              <a href="#home" className="text-white hover:text-blue-400 transition-colors">Home</a>
              <a href="#about" className="text-white hover:text-blue-400 transition-colors">About</a>
              <a href="#services" className="text-white hover:text-blue-400 transition-colors">Services</a>
              <a href="#gallery" className="text-white hover:text-blue-400 transition-colors">Gallery</a>
              <a href="#contact" className="text-white hover:text-blue-400 transition-colors">Contact</a>
            </div>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-white text-sm">
                © 2025 Kusini Water. All rights reserved. | Proudly serving Dikgale and surrounding communities.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}