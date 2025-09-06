import React, { useEffect, useRef, useState } from 'react';
import { 
  ChevronRight, 
  Clock, 
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
  X,
  Search
} from 'lucide-react';

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [ipAddress, setIpAddress] = useState<string>('');
  const [idToken, setIdToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<{ name?: string; email?: string; picture?: string } | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isLoadingUserDetails, setIsLoadingUserDetails] = useState<boolean>(false);
  const [userDetailsError, setUserDetailsError] = useState<string | null>(null);
  // Service Provider Request state
  const [spModalOpen, setSpModalOpen] = useState<boolean>(false);
  const [spSubmitting, setSpSubmitting] = useState<boolean>(false);
  const [spError, setSpError] = useState<string | null>(null);
  const [spSuccess, setSpSuccess] = useState<string | null>(null);
  const [spData, setSpData] = useState({
    services: [] as string[],
    contactNumber: '',
    serviceCity: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    selfieDataUrl: '',
    aadharDataUrl: '',
    panDataUrl: '',
  });
  const [spStatus, setSpStatus] = useState<any>(null);
  const [spLoadingStatus, setSpLoadingStatus] = useState<boolean>(false);
  // My Services state
  const [myServices, setMyServices] = useState<any[]>([]);
  const [myServicesLoading, setMyServicesLoading] = useState<boolean>(false);
  const [myServicesError, setMyServicesError] = useState<string | null>(null);
  const [myServicesFilter, setMyServicesFilter] = useState<'all' | 'requested' | 'ongoing' | 'completed'>('all');
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  // booking form service is stored within bookingForm state
  const [bookingForm, setBookingForm] = useState({
    phone: "",
    address: "",
    instruction: "",
    service: "",
    serviceType: "",
    date: "",
    time: ""
  });
  const [isExpertRegistrationModalOpen, setIsExpertRegistrationModalOpen] = useState(false);
  const [expertRegistrationForm, setExpertRegistrationForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceCategory: "",
    experience: "",
    address: "",
    idProof: "",
    idNumber: "",
    availability: "",
    hourlyRate: ""
  });

  // Constants
  const GOOGLE_CLIENT_ID_RAW = '@http://624938212031-sfsp8d13p2453s7slagh63g1n6c59067.apps.googleusercontent.com';
  const GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID_RAW.replace(/^@/, '').replace(/^https?:\/\//, '');
  const CREATE_USER_API = 'https://0ek3p4mqyl.execute-api.ap-southeast-2.amazonaws.com/default/sc02';
  const FETCH_USER_API = 'https://0ek3p4mqyl.execute-api.ap-southeast-2.amazonaws.com/default/sc02?fetchuserdetails=true';
  const SP_BASE_API = 'https://7c2awsljvh.execute-api.ap-southeast-2.amazonaws.com/default/sc03';
  const BOOK_SERVICE_API = 'https://ysaobp9yy4.execute-api.ap-southeast-2.amazonaws.com/default/sc004';
  const MY_SERVICES_API = 'https://ysaobp9yy4.execute-api.ap-southeast-2.amazonaws.com/default/sc004';

  // Auth token helper (extract token from logged-in session)
  const getAuthToken = (): string => {
    return localStorage.getItem('auth:apiToken') || idToken || '';
  };

  // Simple hash-based routing
  const getRouteFromHash = (): 'home' | 'profile' | 'my-services' => {
    const h = window.location.hash.replace('#', '');
    if (h.startsWith('/profile')) return 'profile';
    if (h.startsWith('/my-services')) return 'my-services';
    return 'home';
  };
  const [route, setRoute] = useState<'home' | 'profile' | 'my-services'>(() => {
    if (typeof window === 'undefined') return 'home';
    return getRouteFromHash();
  });

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const goToProfile = () => { window.location.hash = '/profile'; };
  const goToMyServices = () => { window.location.hash = '/my-services'; };
  const goHome = () => { window.location.hash = '/'; };

  // Helpers
  const decodeJwtPayload = (token: string): any => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const persistAuth = (token: string, profile: any, serverToken?: string) => {
    localStorage.setItem('auth:idToken', token);
    localStorage.setItem('auth:profile', JSON.stringify(profile || {}));
    if (serverToken) localStorage.setItem('auth:apiToken', serverToken);
  };

  const clearAuth = () => {
    localStorage.removeItem('auth:idToken');
    localStorage.removeItem('auth:profile');
    localStorage.removeItem('auth:apiToken');
  };

  // Load persisted auth on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth:idToken');
    const storedProfile = localStorage.getItem('auth:profile');
    if (storedToken) setIdToken(storedToken);
    if (storedProfile) setUserProfile(JSON.parse(storedProfile));
  }, []);

  // Capture public IP
  useEffect(() => {
    const loadIp = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        setIpAddress(data?.ip || '');
      } catch (e) {
        setIpAddress('');
      }
    };
    loadIp();
  }, []);

  // Initialize Google button when auth modal opens
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const google = (window as any).google;
    if (!google || !google.accounts || !google.accounts.id) return;
    try {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          const credential: string | undefined = response?.credential;
          if (!credential) return;
          const payload = decodeJwtPayload(credential) || {};
          const profile = { name: payload?.name, email: payload?.email, picture: payload?.picture };
          setIdToken(credential);
          setUserProfile(profile);
          setIsAuthModalOpen(false);

          // Create user on backend
          try {
            const resp = await fetch(CREATE_USER_API, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ auth: credential, ip_address: ipAddress || '' }),
            });
            const data = await resp.json().catch(() => ({}));
            const serverToken = (data?.token as string) || (data?.apiToken as string) || '';
            persistAuth(credential, profile, serverToken);
          } catch (err) {
            persistAuth(credential, profile);
          }
        },
        ux_mode: 'popup',
        auto_select: false,
        itp_support: true,
        use_fedcm_for_prompt: true,
      });

      if (googleButtonRef.current) {
        googleButtonRef.current.innerHTML = '';
        google.accounts.id.renderButton(googleButtonRef.current, {
          theme: isDarkMode ? 'filled_black' : 'outline',
          size: 'large',
          type: 'standard',
          shape: 'pill',
          text: 'signin_with',
          logo_alignment: 'left',
        });
      }
    } catch (e) {}
  }, [isAuthModalOpen, isDarkMode, GOOGLE_CLIENT_ID, ipAddress]);

  // Fetch user details for profile page
  useEffect(() => {
    const shouldFetch = route === 'profile' && !!idToken;
    if (!shouldFetch) return;
    setIsLoadingUserDetails(true);
    setUserDetailsError(null);
    const authHeaderToken = getAuthToken();
    fetch(FETCH_USER_API, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authHeaderToken}`,
      },
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error((data && (data.message || data.error)) || 'Failed to fetch user');
        }
        setUserDetails(data || null);
      })
      .catch((err) => {
        setUserDetailsError(err?.message || 'Failed to load user');
      })
      .finally(() => setIsLoadingUserDetails(false));
  }, [route, idToken]);

  const formatDateTime = (iso?: string): string => {
    if (!iso) return '';
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return iso;
      return d.toLocaleString();
    } catch {
      return iso || '';
    }
  };

  // Load My Services when on route
  useEffect(() => {
    if (route !== 'my-services' || !idToken) return;
    setMyServicesLoading(true);
    setMyServicesError(null);
    const token = getAuthToken();
    fetch(MY_SERVICES_API, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json().catch(() => []);
        if (!res.ok) throw new Error((data && (data.message || data.error)) || 'Failed to load services');
        setMyServices(Array.isArray(data) ? data : []);
      })
      .catch((err) => setMyServicesError(err?.message || 'Failed to load services'))
      .finally(() => setMyServicesLoading(false));
  }, [route, idToken]);

  // Load Service Provider Request status
  useEffect(() => {
    const shouldFetch = route === 'profile' && !!idToken;
    if (!shouldFetch) return;
    setSpLoadingStatus(true);
    setSpStatus(null);
    const token = getAuthToken();
    fetch(SP_BASE_API, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error((data && (data.message || data.error)) || 'Failed to fetch');
        setSpStatus(data || null);
      })
      .catch(() => {})
      .finally(() => setSpLoadingStatus(false));
  }, [route, idToken]);

  const availableServices = [
    'Plumber',
    'Electrician',
    'Painter',
    'AC',
    'Washing machine',
    'Gyser',
    'Pvc & wallpaper',
    'Carpentering',
  ];

  const handleSpCheckbox = (service: string) => {
    setSpData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists ? prev.services.filter((s) => s !== service) : [...prev.services, service],
      };
    });
  };

  const handleSpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSpData((prev) => ({ ...prev, [name]: value }));
  };

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSpFileChange = async (e: React.ChangeEvent<HTMLInputElement>, key: 'selfieDataUrl' | 'aadharDataUrl' | 'panDataUrl') => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const dataUrl = await readFileAsDataUrl(file).catch(() => '');
    if (!dataUrl) return;
    setSpData((prev) => ({ ...prev, [key]: dataUrl }));
  };

  const submitServiceProviderRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSpSubmitting(true);
    setSpError(null);
    setSpSuccess(null);
    try {
      const token = getAuthToken();
      // Build services map: service 1, service 2, ...
      const servicesMap: Record<string, string> = {};
      spData.services.forEach((s, idx) => {
        servicesMap[`service ${idx + 1}`] = s.toLowerCase();
      });
      const body = {
        selfie: spData.selfieDataUrl || 'selfie_image_url',
        aadhar_card: spData.aadharDataUrl || 'aadhar_card_image_url',
        pan_card: spData.panDataUrl || 'pan_card_image_url',
        account_details: {
          'account holder name': spData.accountHolderName,
          'account number': spData.accountNumber,
          'ifsc code': spData.ifscCode,
        },
        services: servicesMap,
        metadata: {
          'contact  number': spData.contactNumber,
          'service city ': spData.serviceCity,
        },
      };

      const resp = await fetch(SP_BASE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error((data && (data.message || data.error)) || 'Failed to submit');
      setSpSuccess('Request submitted successfully.');
      setSpModalOpen(false);
      // Refresh status
      setSpLoadingStatus(true);
      fetch(SP_BASE_API, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json().catch(() => ({})))
        .then((d) => setSpStatus(d || null))
        .finally(() => setSpLoadingStatus(false));
    } catch (err: any) {
      setSpError(err?.message || 'Failed to submit');
    } finally {
      setSpSubmitting(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openBookingModal = (service?: string) => {
    const svc = service || '';
    const types = getServiceTypesFor(svc);
    setBookingError(null);
    setBookingSuccess(null);
    setBookingForm(prev => ({ ...prev, service: svc, serviceType: types[0] || '' }));
    setIsBookingModalOpen(true);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);

  const handleLogout = () => {
    setIdToken(null);
    setUserProfile(null);
    clearAuth();
    const g = (window as any).google;
    if (g && g.accounts && g.accounts.id) {
      try { g.accounts.id.disableAutoSelect(); } catch (e) {}
    }
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingForm({
      phone: "",
      address: "",
      instruction: "",
      service: "",
      serviceType: "",
      date: "",
      time: ""
    });
  };

  const getServiceTypesFor = (serviceTitle: string): string[] => {
    const svc = services.find((s) => s.title.toLowerCase() === (serviceTitle || '').toLowerCase());
    return svc ? svc.subServices : [];
  };

  const formatRequestedSlot = (date: string, time: string): string => {
    if (!date || !time) return '';
    const [hourMin, ampm] = time.split(' ');
    let [hh, mm] = hourMin.split(':').map(Number);
    if (ampm?.toUpperCase() === 'PM' && hh < 12) hh += 12;
    if (ampm?.toUpperCase() === 'AM' && hh === 12) hh = 0;
    const hhStr = String(hh).padStart(2, '0');
    const mmStr = String(mm || 0).padStart(2, '0');
    return `${date} ${hhStr}:${mmStr}:00`;
  };

  const extractServiceCost = (serviceTitle: string): string => {
    const svc = services.find((s) => s.title.toLowerCase() === (serviceTitle || '').toLowerCase());
    const priceText = svc?.startingPrice || '';
    const digits = priceText.replace(/[^0-9]/g, '');
    return digits || '100';
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idToken) {
      setIsAuthModalOpen(true);
      return;
    }
    setBookingSubmitting(true);
    setBookingError(null);
    setBookingSuccess(null);
    try {
      const token = getAuthToken();
      const requested_slot = formatRequestedSlot(bookingForm.date, bookingForm.time);
      const body = {
        category: (bookingForm.service || '').toLowerCase(),
        service_type: bookingForm.serviceType || '',
        requested_slot,
        service_cost: extractServiceCost(bookingForm.service),
        metadata: {
          instruction: bookingForm.instruction || '',
          'phone number': bookingForm.phone || '',
          address: bookingForm.address || '',
        },
      };
      const resp = await fetch(BOOK_SERVICE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error((data && (data.message || data.error)) || 'Failed to book service');
      setBookingSuccess('Your service request has been submitted.');
      closeBookingModal();
    } catch (err: any) {
      setBookingError(err?.message || 'Failed to book service');
    } finally {
      setBookingSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const openExpertRegistrationModal = () => {
    setIsExpertRegistrationModalOpen(true);
  };

  const closeExpertRegistrationModal = () => {
    setIsExpertRegistrationModalOpen(false);
    setExpertRegistrationForm({
      fullName: "",
      phone: "",
      email: "",
      serviceCategory: "",
      experience: "",
      address: "",
      idProof: "",
      idNumber: "",
      availability: "",
      hourlyRate: ""
    });
  };

  const handleExpertRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the expert registration data to your backend
    alert(`Expert registration submitted for ${expertRegistrationForm.fullName}! We'll contact you at ${expertRegistrationForm.phone} within 24 hours to verify your documents and complete the onboarding process.`);
    closeExpertRegistrationModal();
  };

  const handleExpertInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExpertRegistrationForm(prev => ({ ...prev, [name]: value }));
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
      image: "/download.jpeg"
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
      answer: "Simply click the 'Book Service' button, fill out our booking form with your details (name, phone, address, preferred date and time), and submit. We'll contact you to confirm the appointment and match you with a verified technician who will arrive at your doorstep."
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

              {/* Profile + My Services + Login/Logout buttons */}
              {idToken && (
                <button
                  onClick={goToProfile}
                  className={`${route === 'profile' ? 'ring-2 ring-blue-400' : ''} ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} px-4 py-2 rounded-full font-medium transition-all duration-200`}
                >
                  Profile
                </button>
              )}
              {idToken && (
                <button
                  onClick={goToMyServices}
                  className={`${route === 'my-services' ? 'ring-2 ring-blue-400' : ''} ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} px-4 py-2 rounded-full font-medium transition-all duration-200`}
                >
                  My Services
                </button>
              )}
              {idToken ? (
                <button 
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center group"
                >
                  Logout
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              ) : (
                <button 
                  onClick={openAuthModal}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center group"
                >
                  Login
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              )}
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
                {idToken && (
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); goToProfile(); }}
                    className={`w-full mt-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} px-6 py-3 rounded-full font-semibold transition-all duration-200`}
                  >
                    Profile
                  </button>
                )}
                {idToken && (
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); goToMyServices(); }}
                    className={`w-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} px-6 py-3 rounded-full font-semibold transition-all duration-200`}
                  >
                    My Services
                  </button>
                )}
                {idToken ? (
                  <button 
                    onClick={handleLogout}
                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg"
                  >
                    Logout
                  </button>
                ) : (
                  <button 
                    onClick={openAuthModal}
                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      {route === 'home' && (
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
                <button 
                  onClick={() => openBookingModal()}
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-all duration-200 flex items-center justify-center group shadow-lg hover:shadow-xl"
                >
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
      )}

      {/* My Services Page */}
      {route === 'my-services' && idToken && (
        <section id="my-services" className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>My Services</h2>
              <div className="flex items-center gap-3">
                <label className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>Filter by stage</label>
                <select value={myServicesFilter} onChange={(e) => setMyServicesFilter(e.target.value as any)} className={`${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'} border rounded px-3 py-2`}>
                  <option value="all">All</option>
                  <option value="requested">Requested</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {myServicesLoading ? (
              <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading…</div>
            ) : myServicesError ? (
              <div className="text-red-600">{myServicesError}</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {myServices
                  .filter((s) => {
                    if (myServicesFilter === 'all') return true;
                    if (myServicesFilter === 'completed') return !!s.completed_at;
                    if (myServicesFilter === 'ongoing') return !s.completed_at && s.stage !== 'unassigned';
                    if (myServicesFilter === 'requested') return s.stage === 'unassigned';
                    return true;
                  })
                  .map((svc) => (
                    <div key={svc.service_id} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow border p-5`}> 
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold capitalize">{svc.category} — {svc.service_type}</div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${svc.completed_at ? 'bg-green-100 text-green-700' : svc.stage !== 'unassigned' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
                          {svc.completed_at ? 'completed' : (svc.stage !== 'unassigned' ? 'ongoing' : 'requested')}
                        </span>
                      </div>
                      <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                        <div>Requested slot: {formatDateTime(svc.requested_slot)}</div>
                        <div>Created at: {formatDateTime(svc.created_at)}</div>
                        <div>Cost: ₹{svc.service_cost}</div>
                        {svc.stage && <div>Stage: {svc.stage}</div>}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Profile Page (route) */}
      {route === 'profile' && idToken && (
        <section id="profile" className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-lg border p-6`}> 
              <div className="flex items-center">
                { (userDetails?.user?.picture || userProfile?.picture) && (
                  <img src={userDetails?.user?.picture || userProfile?.picture} alt={(userDetails?.user?.firstname || userProfile?.name) || 'Profile'} className="w-20 h-20 rounded-full mr-6 object-cover" />
                )}
                <div>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Profile</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {(userDetails?.user?.firstname && userDetails?.user?.lastname)
                      ? `${userDetails.user.firstname} ${userDetails.user.lastname}`
                      : (userProfile?.name || '—')}
                  </p>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {userDetails?.user?.email || userProfile?.email || '—'}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}>
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>Last login</div>
                  <div className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                    {isLoadingUserDetails ? 'Loading…' : (formatDateTime(userDetails?.user?.last_login) || '—')}
                  </div>
                </div>
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}>
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>Created account at</div>
                  <div className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-semibold`}>
                    {isLoadingUserDetails ? 'Loading…' : (formatDateTime(userDetails?.user?.created_at) || '—')}
                  </div>
                </div>
              </div>

              {/* Token UI intentionally removed */}

              {userDetailsError && (
                <div className="mt-4 text-sm text-red-500">{userDetailsError}</div>
              )}
            </div>

            {/* Service Provider Request Section */}
            <div className="mt-10">
              <h4 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SERVICE PROVIDER REQUEST</h4>

              {/* Status Card */}
              <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow border p-4 mb-4`}>
                {spLoadingStatus ? (
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading status…</div>
                ) : spStatus?.service_provider ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${spStatus.service_provider.status === 'Approved' ? 'bg-green-100 text-green-700' : spStatus.service_provider.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {spStatus.service_provider.status}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Requested at</div>
                        <div className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDateTime(spStatus.service_provider.requested_at)}</div>
                      </div>
                      <div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Approved at</div>
                        <div className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDateTime(spStatus.service_provider.approved_at)}</div>
                      </div>
                    </div>
                    {/* Services Chips */}
                    {spStatus.service_provider.services && (
                      <div className="mt-2">
                        <div className={`text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Services</div>
                        <div className="flex flex-wrap gap-2">
                          {Object.values(spStatus.service_provider.services).map((svc: any, idx: number) => (
                            <span key={idx} className={`${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-blue-50 text-blue-700'} px-3 py-1 rounded-full text-sm`}>{String(svc)}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>No request found.</div>
                )}
              </div>

              <button onClick={() => setSpModalOpen(true)} className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all shadow">
                Request as a Service Provider
              </button>

              {spSuccess && <div className="mt-3 text-green-600 text-sm">{spSuccess}</div>}
              {spError && <div className="mt-3 text-red-600 text-sm">{spError}</div>}
            </div>

            {/* Service Provider Modal */}
            {spModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Service Provider Request</h3>
                      <button onClick={() => setSpModalOpen(false)} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <form onSubmit={submitServiceProviderRequest} className="space-y-6">
                      {/* Services multi-select as checkboxes */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Services</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {availableServices.map((svc) => (
                            <label key={svc} className={`flex items-center gap-2 rounded-lg px-3 py-2 border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                              <input type="checkbox" checked={spData.services.includes(svc)} onChange={() => handleSpCheckbox(svc)} />
                              <span>{svc}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Contact Number</label>
                          <input name="contactNumber" value={spData.contactNumber} onChange={handleSpInputChange} className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} placeholder="Enter contact number" required />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Service City</label>
                          <input name="serviceCity" value={spData.serviceCity} onChange={handleSpInputChange} className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} placeholder="Enter city" required />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bank Account Details</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <input name="accountHolderName" value={spData.accountHolderName} onChange={handleSpInputChange} className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} placeholder="Account holder name" required />
                          <input name="accountNumber" value={spData.accountNumber} onChange={handleSpInputChange} className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} placeholder="Account number" required />
                          <input name="ifscCode" value={spData.ifscCode} onChange={handleSpInputChange} className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} placeholder="IFSC code" required />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Selfie Upload</label>
                          <input type="file" accept="image/*" onChange={(e) => handleSpFileChange(e, 'selfieDataUrl')} className={`w-full`}/>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Aadhar Card Upload</label>
                          <input type="file" accept="image/*" onChange={(e) => handleSpFileChange(e, 'aadharDataUrl')} className={`w-full`}/>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>PAN Card Upload</label>
                          <input type="file" accept="image/*" onChange={(e) => handleSpFileChange(e, 'panDataUrl')} className={`w-full`}/>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button type="button" onClick={() => setSpModalOpen(false)} className={`px-6 py-3 rounded-lg font-semibold border-2 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors`}>
                          Cancel
                        </button>
                        <button type="submit" disabled={spSubmitting} className={`px-6 py-3 rounded-lg font-semibold text-white ${spSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}>
                          {spSubmitting ? 'Submitting…' : 'Submit Request'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-6">
              <button onClick={goHome} className={`px-4 py-2 rounded-lg font-medium ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} transition-colors`}>
                Back to Home
              </button>
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      {route === 'home' && (
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
                  <Search className="w-10 h-10 text-blue-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  1
                </div>
              </div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Browse Services</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Explore our wide range of professional home services with transparent pricing.</p>
            </div>

            <div className="text-center group">
              <div className="relative">
                <div className={`w-20 h-20 ${isDarkMode ? 'bg-green-900' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:${isDarkMode ? 'bg-green-800' : 'bg-green-200'} transition-all duration-200 group-hover:scale-110`}>
                  <Calendar className="w-10 h-10 text-green-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  2
                </div>
              </div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Book Appointment</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Fill out our simple booking form with your details and preferred schedule.</p>
            </div>

            <div className="text-center group">
              <div className="relative">
                <div className={`w-20 h-20 ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:${isDarkMode ? 'bg-purple-800' : 'bg-purple-200'} transition-all duration-200 group-hover:scale-110`}>
                  <Phone className="w-10 h-10 text-purple-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  3
                </div>
              </div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Get Confirmation</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Receive instant confirmation and our team will contact you to finalize details.</p>
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
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Enjoy Service</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Professional service delivery at your doorstep with quality guarantee.</p>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Services Section */}
      {route === 'home' && (
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
                  
                  <button 
                    onClick={() => openBookingModal(service.title)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center group"
                  >
                    Book Now
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Technician Registration Section */}
      {route === 'home' && (
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

              <button 
                onClick={openExpertRegistrationModal}
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors duration-200 flex items-center shadow-lg hover:shadow-xl"
              >
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
      )}

      {/* Pricing & Discounts Section */}
      {route === 'home' && (
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
      )}

      {/* Testimonials Section */}
      {route === 'home' && (
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
      )}

      {/* FAQ Section */}
      {route === 'home' && (
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
      )}

      {/* Get the App Section */}
      {route === 'home' && (
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
      )}

      {/* Footer (hidden on profile and my-services routes) */}
      {route !== 'profile' && route !== 'my-services' && (
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
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-md w-full`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Login</h2>
                <button onClick={() => setIsAuthModalOpen(false)} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Continue with Google to sign in.</p>
                <div ref={googleButtonRef} className="flex justify-center"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Book a Service
                </h2>
                <button
                  onClick={closeBookingModal}
                  className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Service</label>
                    <select name="service" value={bookingForm.service} onChange={(e) => {
                      handleInputChange(e);
                      const next = getServiceTypesFor(e.target.value);
                      setBookingForm((prev) => ({ ...prev, serviceType: next[0] || '' }));
                    }} className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`} required>
                      <option value="">Select a service</option>
                      {services.map((s, idx) => (
                        <option key={idx} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Service Type</label>
                    <select name="serviceType" value={bookingForm.serviceType} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`} required>
                      <option value="">Select type</option>
                      {getServiceTypesFor(bookingForm.service).map((t, idx) => (
                        <option key={idx} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Preferred Date</label>
                    <input type="date" name="date" value={bookingForm.date} onChange={handleInputChange} required className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Preferred Time</label>
                    <select name="time" value={bookingForm.time} onChange={handleInputChange} required className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}>
                      <option value="">Select time</option>
                      {['09:00 AM','10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM'].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Instructions</label>
                  <input name="instruction" value={bookingForm.instruction} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="Any specific instructions" />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
                  <textarea name="address" value={bookingForm.address} onChange={handleInputChange} required rows={3} className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="Enter your complete address" />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                  <input type="tel" name="phone" value={bookingForm.phone} onChange={handleInputChange} required className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`} placeholder="Enter your phone number" />
                </div>

                {bookingError && <div className="text-red-600 text-sm">{bookingError}</div>}
                {bookingSuccess && <div className="text-green-600 text-sm">{bookingSuccess}</div>}

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeBookingModal} className={`flex-1 px-6 py-3 rounded-lg font-semibold border-2 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors duration-200`}>
                    Cancel
                  </button>
                  <button type="submit" disabled={bookingSubmitting} className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg">
                    {bookingSubmitting ? 'Submitting…' : 'Book Service'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Expert Registration Modal */}
      {isExpertRegistrationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Join as Service Expert
                </h2>
                <button
                  onClick={closeExpertRegistrationModal}
                  className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleExpertRegistrationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={expertRegistrationForm.fullName}
                      onChange={handleExpertInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={expertRegistrationForm.phone}
                      onChange={handleExpertInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={expertRegistrationForm.email}
                      onChange={handleExpertInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Service Category *
                    </label>
                    <select
                      name="serviceCategory"
                      value={expertRegistrationForm.serviceCategory}
                      onChange={handleExpertInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select your service category</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Plumber">Plumber</option>
                      <option value="Painter">Painter</option>
                      <option value="Carpenter">Carpenter</option>
                      <option value="House Cleaning">House Cleaning</option>
                      <option value="AC Service">AC Service</option>
                      <option value="Appliance Repair">Appliance Repair</option>
                      <option value="Pest Control">Pest Control</option>
                      <option value="Interior Design">Interior Design</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Years of Experience *
                    </label>
                    <select
                      name="experience"
                      value={expertRegistrationForm.experience}
                      onChange={handleExpertInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select experience</option>
                      <option value="0-1 years">0-1 years</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-10 years">5-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Hourly Rate (₹) *
                    </label>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={expertRegistrationForm.hourlyRate}
                      onChange={handleExpertInputChange}
                      required
                      min="100"
                      max="2000"
                      className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter your hourly rate"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Complete Address *
                  </label>
                  <textarea
                    name="address"
                    value={expertRegistrationForm.address}
                    onChange={handleExpertInputChange}
                    required
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Enter your complete address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      ID Proof Type *
                    </label>
                    <select
                      name="idProof"
                      value={expertRegistrationForm.idProof}
                      onChange={handleExpertInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select ID proof</option>
                      <option value="Aadhaar Card">Aadhaar Card</option>
                      <option value="PAN Card">PAN Card</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Voter ID">Voter ID</option>
                      <option value="Passport">Passport</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      ID Number *
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      value={expertRegistrationForm.idNumber}
                      onChange={handleExpertInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter your ID number"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Availability *
                  </label>
                  <select
                    name="availability"
                    value={expertRegistrationForm.availability}
                    onChange={handleExpertInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="">Select availability</option>
                    <option value="Full-time (6+ hours daily)">Full-time (6+ hours daily)</option>
                    <option value="Part-time (3-5 hours daily)">Part-time (3-5 hours daily)</option>
                    <option value="Weekends only">Weekends only</option>
                    <option value="Evenings only">Evenings only</option>
                    <option value="Flexible schedule">Flexible schedule</option>
                  </select>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Next Steps:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• We'll verify your documents within 24 hours</li>
                    <li>• Complete background verification process</li>
                    <li>• Set up your service profile and pricing</li>
                    <li>• Start receiving customer bookings</li>
                  </ul>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeExpertRegistrationModal}
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold border-2 ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors duration-200`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-lg"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;