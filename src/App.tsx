import React, { useState } from 'react';
import { 
  ChevronRight, 
  User, 
  Clock, 
  CreditCard, 
  Star, 
  Phone, 
  Zap, 
  Wrench, 
  Paintbrush, 
  Hammer, 
  Shield, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Smartphone, 
  PlayCircle,
  MapPin,
  Award,
  Users,
  TrendingUp,
  Home,
  Sparkles,
  Calendar,
  HeadphonesIcon,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const services = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Electrician",
      subServices: ["Fan Installation", "Light Fixture", "Wiring Repair", "Switch Installation"],
      startingPrice: "₹299",
      image: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2"
    },
    {
      icon: <Wrench className="w-8 h-8 text-blue-500" />,
      title: "Plumber",
      subServices: ["RO Repair", "Pipe Leakage", "Faucet Installation", "Toilet Repair"],
      startingPrice: "₹399",
      image: "https://images.pexels.com/photos/8486944/pexels-photo-8486944.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2"
    },
    {
      icon: <Paintbrush className="w-8 h-8 text-purple-500" />,
      title: "Painter",
      subServices: ["Wall Painting", "Ceiling Paint", "Texture Paint", "Wood Polish"],
      startingPrice: "₹499",
      image: "https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2"
    },
    {
      icon: <Hammer className="w-8 h-8 text-orange-500" />,
      title: "Carpenter",
      subServices: ["Furniture Repair", "Door Installation", "Cabinet Making", "Shelving"],
      startingPrice: "₹349",
      image: "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-pink-500" />,
      title: "House Cleaning",
      subServices: ["Deep Cleaning", "Regular Cleaning", "Kitchen Cleaning", "Bathroom Cleaning"],
      startingPrice: "₹199",
      image: "https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2"
    },
    {
      icon: <Home className="w-8 h-8 text-green-500" />,
      title: "AC Service",
      subServices: ["AC Installation", "AC Repair", "AC Cleaning", "Gas Refill"],
      startingPrice: "₹449",
      image: "https://images.pexels.com/photos/8005394/pexels-photo-8005394.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Amazing service! The electrician was professional and fixed my fan in 30 minutes. Very satisfied with the quality of work.",
      service: "Electrician",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      location: "Mumbai"
    },
    {
      name: "Raj Patel",
      rating: 5,
      comment: "Quick response and fair pricing. The plumber arrived on time and solved my pipe leakage issue efficiently.",
      service: "Plumber",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      location: "Delhi"
    },
    {
      name: "Anita Gupta",
      rating: 4,
      comment: "Great painting job! They completed my living room in just 2 days. The finish quality is excellent.",
      service: "Painter",
      image: "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      location: "Bangalore"
    },
    {
      name: "Vikram Singh",
      rating: 5,
      comment: "Professional cleaning service. My house looks spotless now. Will definitely book again for monthly cleaning.",
      service: "House Cleaning",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2",
      location: "Pune"
    }
  ];

  const faqs = [
    {
      question: "How do I book a service?",
      answer: "Simply sign up with your phone number, choose your service, select a time slot, and make payment. We'll match you with a verified technician who will arrive at your doorstep."
    },
    {
      question: "What payment options are available?",
      answer: "We accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery. All online payments are secure and encrypted with 256-bit SSL protection."
    },
    {
      question: "How are technicians verified?",
      answer: "All technicians undergo rigorous background verification, skill assessment, document verification, and police verification before joining our platform."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "We offer 100% satisfaction guarantee. If you're not happy with the service, we'll send another technician for free or provide a full refund within 24 hours."
    },
    {
      question: "Can I reschedule my appointment?",
      answer: "Yes, you can reschedule up to 2 hours before the appointment time without any charges through our app or website."
    },
    {
      question: "Do you provide warranty on services?",
      answer: "Yes, we provide 30-day service warranty on all our services. If any issue occurs within 30 days, we'll fix it for free."
    }
  ];

  const themeClasses = isDarkMode 
    ? 'dark bg-gray-900 text-white' 
    : 'bg-white text-gray-900';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
      {/* Enhanced Navigation Header */}
      <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} shadow-lg border-b sticky top-0 z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center group">
                <div className="relative">
                  <Home className="w-10 h-10 text-blue-600 mr-3 group-hover:scale-110 transition-transform duration-200" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                                     <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                     Servecure
                   </span>
                  <div className="text-xs text-gray-500 font-medium">Trusted Services</div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#services" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} font-medium transition-colors duration-200 relative group`}>
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </a>
              <a href="#how-it-works" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} font-medium transition-colors duration-200 relative group`}>
                How it Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </a>
              <a href="#pricing" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} font-medium transition-colors duration-200 relative group`}>
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </a>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-200 group`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 group-hover:rotate-12 transition-transform duration-300" />
                )}
              </button>

              {/* CTA Button */}
              <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center group">
                Book Service
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-200`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors duration-200`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className={`lg:hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} border-t transition-all duration-300`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#services" className={`block px-3 py-2 rounded-md text-base font-medium ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'} transition-colors duration-200`}>
                  Services
                </a>
                <a href="#how-it-works" className={`block px-3 py-2 rounded-md text-base font-medium ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'} transition-colors duration-200`}>
                  How it Works
                </a>
                <a href="#pricing" className={`block px-3 py-2 rounded-md text-base font-medium ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'} transition-colors duration-200`}>
                  Pricing
                </a>
                <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg">
                  Book Service
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`relative ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-blue-900 to-teal-800' : 'bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600'} text-white overflow-hidden`}>
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1" 
            alt="Professional technician working"
            className="w-full h-full object-cover opacity-20"
          />
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-gray-800/90 to-blue-900/90' : 'bg-gradient-to-r from-blue-600/90 to-teal-600/90'}`}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span>Rated 4.8/5 by 50,000+ customers</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Book Trusted Home Services in
                <span className="text-yellow-400"> Minutes</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                Electricians, Plumbers, Cleaners & more at your doorstep. 100% verified professionals, transparent pricing, and instant booking.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-all duration-200 flex items-center justify-center group shadow-lg hover:shadow-xl">
                  Book a Service Now
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-200 flex items-center justify-center">
                  <PlayCircle className="mr-2 w-5 h-5" />
                  Watch How It Works
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-400" />
                  <span>100% Verified</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-300" />
                  <span>Same Day Service</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  <span>30-Day Warranty</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  <h3 className="text-lg font-semibold mb-6 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Quick Service Booking
                  </h3>
                  <div className="space-y-4">
                    <div className={`flex items-center space-x-3 p-3 ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-50'} rounded-lg`}>
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">Choose your location</span>
                    </div>
                    <div className={`flex items-center space-x-3 p-3 ${isDarkMode ? 'bg-green-900/50' : 'bg-green-50'} rounded-lg`}>
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Wrench className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">Select service type</span>
                    </div>
                    <div className={`flex items-center space-x-3 p-3 ${isDarkMode ? 'bg-purple-900/50' : 'bg-purple-50'} rounded-lg`}>
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium">Pick time slot</span>
                    </div>
                    <div className={`flex items-center space-x-3 p-3 ${isDarkMode ? 'bg-orange-900/50' : 'bg-orange-50'} rounded-lg`}>
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-sm font-medium">Get instant confirmation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              How It Works
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Get your home services sorted in just 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative">
                <div className={`w-20 h-20 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:${isDarkMode ? 'bg-blue-800' : 'bg-blue-200'} transition-all duration-200 group-hover:scale-110`}>
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  1
                </div>
              </div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Sign Up</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Quick OTP-based registration with your phone number. No lengthy forms required.</p>
            </div>

            <div className="text-center group">
              <div className="relative">
                <div className={`w-20 h-20 ${isDarkMode ? 'bg-green-900' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:${isDarkMode ? 'bg-green-800' : 'bg-green-200'} transition-all duration-200 group-hover:scale-110`}>
                  <Clock className="w-10 h-10 text-green-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  2
                </div>
              </div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Choose Service</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Select your service type and preferred time slot from available options.</p>
            </div>

            <div className="text-center group">
              <div className="relative">
                <div className={`w-20 h-20 ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:${isDarkMode ? 'bg-purple-800' : 'bg-purple-200'} transition-all duration-200 group-hover:scale-110`}>
                  <CreditCard className="w-10 h-10 text-purple-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  3
                </div>
              </div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Pay & Get Matched</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Secure payment and instant matching with verified technician in your area.</p>
            </div>

            <div className="text-center group">
              <div className="relative">
                <div className={`w-20 h-20 ${isDarkMode ? 'bg-orange-900' : 'bg-orange-100'} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:${isDarkMode ? 'bg-orange-800' : 'bg-orange-200'} transition-all duration-200 group-hover:scale-110`}>
                  <Star className="w-10 h-10 text-orange-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  4
                </div>
              </div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Service & Feedback</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Quality service completion and rate your experience for others.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Our Services
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Professional home services at your fingertips with transparent pricing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-1`}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center">
                      {service.icon}
                      <span className="ml-2 font-semibold">{service.title}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-center mb-4">
                    <p className="text-2xl font-bold text-blue-600">Starting {service.startingPrice}</p>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {service.subServices.map((subService, subIndex) => (
                      <div key={subIndex} className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{subService}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center group">
                    Book Now
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technician Registration Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-blue-900' : 'bg-gradient-to-r from-teal-600 to-blue-600'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join as a Service Expert
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Turn your skills into income. Join thousands of verified professionals earning with us.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-lg">Upload KYC documents for verification</span>
                </div>
                <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-lg">Set your service charges and availability</span>
                </div>
                <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-lg">Get matched with customers in your area</span>
                </div>
                <div className="flex items-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-lg">Receive payments instantly after service</span>
                </div>
              </div>

              <button className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors duration-200 flex items-center shadow-lg hover:shadow-xl">
                Register Now
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors duration-200">
                <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">₹25,000+</h3>
                <p className="text-blue-100">Average Monthly Earnings</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors duration-200">
                <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">10,000+</h3>
                <p className="text-blue-100">Active Professionals</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors duration-200">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">4.9/5</h3>
                <p className="text-blue-100">Professional Rating</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors duration-200">
                <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">100%</h3>
                <p className="text-blue-100">Verified Professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Discounts Section */}
      <section id="pricing" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Transparent Pricing
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              No hidden charges, fair pricing for quality service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200`}>
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Installation Services</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">₹299</div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Starting price for basic installations</p>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200`}>
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-green-900' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Hourly Services</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">₹199</div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Per hour for maintenance work</p>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200`}>
              <div className={`w-12 h-12 ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Premium Services</h3>
              <div className="text-3xl font-bold text-purple-600 mb-2">₹599</div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>For complex installations & repairs</p>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-gradient-to-r from-gray-700 to-blue-800' : 'bg-gradient-to-r from-orange-100 to-yellow-100'} rounded-2xl p-8`}>
            <div className="text-center mb-8">
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Special Offers</h3>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Save more with our exclusive discounts</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-200`}>
                <div className="text-4xl font-bold text-orange-600 mb-2">20%</div>
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>First-time Discount</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>New customers get 20% off on first service</p>
              </div>
              
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-200`}>
                <div className="text-4xl font-bold text-green-600 mb-2">₹200</div>
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Referral Bonus</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Earn ₹200 for every successful referral</p>
              </div>
              
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-200`}>
                <div className="text-4xl font-bold text-blue-600 mb-2">30%</div>
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Combo Discount</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Book multiple services and save 30%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              What Our Customers Say
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Real feedback from satisfied customers across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1`}>
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} italic mb-3`}>"{testimonial.comment}"</p>
                <div className="text-sm text-blue-600 font-medium">{testimonial.service}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Frequently Asked Questions
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Find answers to common questions about our services
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200`}>
                <button
                  className={`w-full px-6 py-4 text-left flex items-center justify-between hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors duration-200 rounded-xl`}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} pr-4`}>{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex-shrink-0`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex-shrink-0`} />
                  )}
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get the App Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-purple-900' : 'bg-gradient-to-r from-blue-600 to-purple-700'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get the App for Better Experience
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Download our mobile app for faster bookings, real-time tracking, and exclusive app-only offers.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-lg">One-tap booking and rescheduling</span>
                </div>
                <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-lg">Real-time technician tracking</span>
                </div>
                <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-lg">Exclusive app discounts up to 25%</span>
                </div>
                <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-lg">Instant notifications and updates</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center">
                  <img 
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                    alt="Download on App Store"
                    className="h-8"
                  />
                </button>
                <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play"
                    className="h-8"
                  />
                </button>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 inline-block">
                <Smartphone className="w-32 h-32 text-white mx-auto mb-6" />
                <p className="text-lg text-blue-100">Coming Soon on Mobile</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-black' : 'bg-gray-900'} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
                             <div className="flex items-center mb-4">
                 <Home className="w-8 h-8 text-blue-400 mr-2" />
                 <h3 className="text-2xl font-bold">Servecure</h3>
               </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Your trusted partner for all home services. Connecting you with verified professionals for quality service delivery across India.
              </p>
              <div className="flex space-x-4">
                <button className={`w-10 h-10 ${isDarkMode ? 'bg-gray-900 hover:bg-blue-600' : 'bg-gray-800 hover:bg-blue-600'} rounded-full flex items-center justify-center transition-colors duration-200`}>
                  <Facebook className="w-5 h-5" />
                </button>
                <button className={`w-10 h-10 ${isDarkMode ? 'bg-gray-900 hover:bg-blue-400' : 'bg-gray-800 hover:bg-blue-400'} rounded-full flex items-center justify-center transition-colors duration-200`}>
                  <Twitter className="w-5 h-5" />
                </button>
                <button className={`w-10 h-10 ${isDarkMode ? 'bg-gray-900 hover:bg-pink-600' : 'bg-gray-800 hover:bg-pink-600'} rounded-full flex items-center justify-center transition-colors duration-200`}>
                  <Instagram className="w-5 h-5" />
                </button>
                <button className={`w-10 h-10 ${isDarkMode ? 'bg-gray-900 hover:bg-red-600' : 'bg-gray-800 hover:bg-red-600'} rounded-full flex items-center justify-center transition-colors duration-200`}>
                  <Youtube className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Investor Relations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Safety Guidelines</a></li>
              </ul>
            </div>
          </div>

          <div className={`border-t ${isDarkMode ? 'border-gray-900' : 'border-gray-800'} mt-12 pt-8`}>
            <div className="flex flex-col md:flex-row justify-between items-center">
                             <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 Servecure. All rights reserved.</p>
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <HeadphonesIcon className="w-5 h-5" />
                  <span>24/7 Customer Support: 7056770758</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Email: Servecure@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;