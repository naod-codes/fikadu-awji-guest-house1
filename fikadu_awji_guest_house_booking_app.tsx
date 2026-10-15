import React, { useState, useEffect } from 'react';
import { 
  Building, Calendar, Clock, MapPin, Phone, Mail, CheckCircle2, Star, 
  Wifi, ShieldCheck, Tv, Coffee, Car, Flame, ArrowRight, User, X, 
  Search, Shield, Check, CreditCard, ChevronRight, Download, Menu, Sparkles, RefreshCw, AlertCircle
} from 'lucide-react';

const ROOMS_DATA = [
  {
    id: 'room-1',
    name: 'Standard Single Room',
    nameAm: 'ስታንዳርድ ነጠላ ክፍል',
    price: 950,
    capacity: 1,
    size: '18 m²',
    bed: '1 Single Bed',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['Wi-Fi', 'Hot Shower', 'DSTV', 'Daily Housekeeping', 'Work Desk'],
    featuresAm: ['ዋይፋይ', 'ትኩስ ውሃ', 'ዲኤስቲቪ', 'የእለት የፅዳት አገልግሎት', 'የስራ ጠረጴዛ'],
    description: 'Cozy and budget-friendly room ideal for solo business travelers visiting Mercato and central Addis Ababa.',
    descriptionAm: 'ለመካከለኛና ለብቻቸው ለሚጉበኙ ነጋዴዎችና እንግዶች የተዘጋጀ ምቹ እና ፀጥታው የተጠበቀ ክፍል፡'
  },
  {
    id: 'room-2',
    name: 'Deluxe Double Room',
    nameAm: 'ደሉክስ ድርብ ክፍል',
    price: 1600,
    capacity: 2,
    size: '26 m²',
    bed: '1 Queen Bed',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['Wi-Fi', 'Hot Shower', 'DSTV Smart TV', 'Balcony', 'Free Coffee Service', 'Daily Housekeeping'],
    featuresAm: ['ዋይፋይ', 'ትኩስ ውሃ', 'ስማርት ቲቪ', 'ባልኮኒ', 'ነፃ የቡና አገልግሎት', 'የፅዳት አገልግሎት'],
    description: 'Spacious room featuring a comfortable Queen bed, vibrant city views, and dedicated seating area.',
    descriptionAm: 'ሰፊና ማራኪ የከተማ እይታ ያለው፣ ንጹህና ሰፊ የአልጋ ስፋት ያለው ክፍል፡'
  },
  {
    id: 'room-3',
    name: 'Executive VIP Suite',
    nameAm: 'ኤክስኪዩቲቭ ቪአይፒ ስዊት',
    price: 2600,
    capacity: 3,
    size: '38 m²',
    bed: '1 King Bed + Lounge',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['High-speed Wi-Fi', 'Hot Shower & Tub', 'DSTV VIP Package', 'Private Living Area', 'Mini Fridge', 'Free Breakfast'],
    featuresAm: ['ፈጣን ዋይፋይ', 'ትኩስ ውሃና ገንዳ', 'ቪአይፒ ዲኤስቲቪ', 'የግል ሳሎን', 'ሚኒ ፍሪጅ', 'ነፃ ቁርስ'],
    description: 'Premium suite equipped with luxury amenities, sofa seating, mini fridge, and high privacy.',
    descriptionAm: 'ሙሉ በሙሉ የተሟሉ ዘመናዊ ቁሳቁሶች ያሉት፣ ለከፍተኛ ባለስልጣናትና ለየት ያሉ እንግዶች የተዘጋጀ ቪአይፒ ክፍል፡'
  }
];

const AMENITIES = [
  { icon: Wifi, title: 'High-Speed Wi-Fi', titleAm: 'ፈጣን ዋይፋይ', desc: 'Complimentary fiber internet throughout the guest house.' },
  { icon: Flame, title: '24/7 Hot Water', titleAm: '24/7 ትኩስ ውሃ', desc: 'Reliable water heaters in every room bathroom.' },
  { icon: ShieldCheck, title: 'Secure Premises', titleAm: 'አስተማማኝ ፀጥታ', desc: '24/7 security team and CCTV surveillance.' },
  { icon: Tv, title: 'Satellite DSTV', titleAm: 'የሳተላይት ዲኤስቲቪ', desc: 'Full channels including news, sports, and movies.' },
  { icon: Car, title: 'Private Parking', titleAm: 'የመኪና ማቆሚያ', desc: 'Gated parking spaces for guest vehicles.' },
  { icon: Coffee, title: 'Café & Refreshments', titleAm: 'ካፌ እና መስተንግዶ', desc: 'Fresh Ethiopian coffee and light snacks available daily.' }
];

const REVIEWS = [
  { id: 1, name: 'Abebe Tadesse', rating: 5, comment: 'Very clean rooms right in Mercato near Total / Amanuel. Staff is extremely polite and welcoming!', date: '2 days ago' },
  { id: 2, name: 'Sarah Jenkins', rating: 5, comment: 'Great hot water, quiet environment despite being in busy Addis Ketema. Highly recommended!', date: '1 week ago' },
  { id: 3, name: 'Mohammed Seid', rating: 4, comment: 'Comfortable stay and easy booking process. Easy parking access.', date: '3 weeks ago' }
];

export default function App() {
  const [lang, setLang] = useState('AM'); // 'AM' or 'EN'
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'rooms', 'amenities', 'mybookings', 'contact'
  const [bookings, setBookings] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search State
  const [searchCheckIn, setSearchCheckIn] = useState('');
  const [searchCheckOut, setSearchCheckOut] = useState('');
  const [searchGuests, setSearchGuests] = useState(1);

  // Checkout Flow State
  const [bookingStep, setBookingStep] = useState(1);
  const [guestDetails, setGuestDetails] = useState({
    fullName: '',
    phone: '',
    email: '',
    specialRequests: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('telebirr'); // 'telebirr', 'chapa', 'cash'
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    // Set default check-in date as today and check-out as tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setSearchCheckIn(today.toISOString().split('T')[0]);
    setSearchCheckOut(tomorrow.toISOString().split('T')[0]);

    // Load stored bookings from localStorage if present
    const savedBookings = localStorage.getItem('fikadu_awji_bookings');
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch (e) {
        console.error('Failed to parse local bookings', e);
      }
    }
  }, []);

  const calculateDays = () => {
    if (!searchCheckIn || !searchCheckOut) return 1;
    const start = new Date(searchCheckIn);
    const end = new Date(searchCheckOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const handleOpenBooking = (room) => {
    setSelectedRoom(room);
    setBookingStep(1);
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const days = calculateDays();
      const totalCost = (selectedRoom ? selectedRoom.price : 0) * days;
      const refNumber = 'FAB-' + Math.floor(100000 + Math.random() * 900000);

      const newBooking = {
        id: refNumber,
        room: selectedRoom,
        guest: guestDetails,
        checkIn: searchCheckIn,
        checkOut: searchCheckOut,
        nights: days,
        totalAmount: totalCost,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'cash' ? 'Pending (Pay at Check-in)' : 'Paid (Simulated)',
        createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      };

      const updatedBookings = [newBooking, ...bookings];
      setBookings(updatedBookings);
      localStorage.setItem('fikadu_awji_bookings', JSON.stringify(updatedBookings));

      setConfirmedBooking(newBooking);
      setIsProcessing(false);
      setBookingStep(4); // Receipt step
    }, 1500);
  };

  const cancelBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('fikadu_awji_bookings', JSON.stringify(updated));
    if (selectedReceipt && selectedReceipt.id === id) {
      setSelectedReceipt(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Top Banner Bar */}
      <div className="bg-amber-800 text-amber-50 text-xs py-2 px-4 flex justify-between items-center border-b border-amber-700">
        <div className="flex items-center space-x-4 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Mercato / Amanuel, Addis Ababa</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> +251 91 123 4567</span>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setLang(lang === 'AM' ? 'EN' : 'AM')} 
              className="bg-amber-900/60 hover:bg-amber-900 text-amber-100 px-2.5 py-0.5 rounded font-medium text-xs transition border border-amber-600/50 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              {lang === 'AM' ? 'English' : 'አማርኛ'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-12 h-12 bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-amber-600/20">
              <Building className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                {lang === 'AM' ? 'ፈቃዱ አውጅ ጌስት ሀውስ' : 'Fikadu Awji Guest House'}
              </h1>
              <p className="text-xs text-amber-700 font-medium mt-1">
                {lang === 'AM' ? 'መርካቶ አማኑኤል አካባቢ፣ አዲስ አበባ' : 'Mercato / Amanuel, Addis Ababa'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setActiveTab('home')} 
              className={`font-medium transition ${activeTab === 'home' ? 'text-amber-700 font-semibold' : 'text-slate-600 hover:text-amber-700'}`}
            >
              {lang === 'AM' ? 'መነሻ ገጽ' : 'Home'}
            </button>
            <button 
              onClick={() => setActiveTab('rooms')} 
              className={`font-medium transition ${activeTab === 'rooms' ? 'text-amber-700 font-semibold' : 'text-slate-600 hover:text-amber-700'}`}
            >
              {lang === 'AM' ? 'ክፍሎች' : 'Rooms & Rates'}
            </button>
            <button 
              onClick={() => setActiveTab('amenities')} 
              className={`font-medium transition ${activeTab === 'amenities' ? 'text-amber-700 font-semibold' : 'text-slate-600 hover:text-amber-700'}`}
            >
              {lang === 'AM' ? 'አገልግሎቶች' : 'Amenities'}
            </button>
            <button 
              onClick={() => setActiveTab('mybookings')} 
              className={`font-medium transition flex items-center gap-1.5 ${activeTab === 'mybookings' ? 'text-amber-700 font-semibold' : 'text-slate-600 hover:text-amber-700'}`}
            >
              {lang === 'AM' ? 'የያዝኳቸው ክፍሎች' : 'My Bookings'}
              {bookings.length > 0 && (
                <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {bookings.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('contact')} 
              className={`font-medium transition ${activeTab === 'contact' ? 'text-amber-700 font-semibold' : 'text-slate-600 hover:text-amber-700'}`}
            >
              {lang === 'AM' ? 'አድራሻ' : 'Contact Us'}
            </button>
          </nav>

          <div className="hidden md:block">
            <button 
              onClick={() => {
                setActiveTab('rooms');
                window.scrollTo({ top: 600, behavior: 'smooth' });
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-amber-600/20 hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              {lang === 'AM' ? 'አሁኑኑ ይዘዙ' : 'Book Now'}
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
            <button 
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 font-medium text-slate-700 hover:text-amber-700"
            >
              {lang === 'AM' ? 'መነሻ ገጽ' : 'Home'}
            </button>
            <button 
              onClick={() => { setActiveTab('rooms'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 font-medium text-slate-700 hover:text-amber-700"
            >
              {lang === 'AM' ? 'ክፍሎች' : 'Rooms'}
            </button>
            <button 
              onClick={() => { setActiveTab('amenities'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 font-medium text-slate-700 hover:text-amber-700"
            >
              {lang === 'AM' ? 'አገልግሎቶች' : 'Amenities'}
            </button>
            <button 
              onClick={() => { setActiveTab('mybookings'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 font-medium text-slate-700 hover:text-amber-700 flex justify-between items-center"
            >
              <span>{lang === 'AM' ? 'የያዝኳቸው ክፍሎች' : 'My Bookings'}</span>
              {bookings.length > 0 && (
                <span className="bg-amber-600 text-white text-xs px-2 py-0.5 rounded-full">{bookings.length}</span>
              )}
            </button>
            <button 
              onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 font-medium text-slate-700 hover:text-amber-700"
            >
              {lang === 'AM' ? 'አድራሻ' : 'Contact'}
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            {}
            <section className="relative bg-slate-900 text-white py-20 lg:py-28 overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1600')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-0"></div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full px-3.5 py-1 text-sm font-medium mb-6 backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    {lang === 'AM' ? 'በመርካቶ አማኑኤል እምብርት የሚገኝ ምቹ ማደሪያ' : 'Your Comfortable Stay in Mercato / Amanuel'}
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
                    {lang === 'AM' 
                      ? 'ለጉዞዎ እና ለንግድ ስራዎ አስተማማኝ የእንግዳ ማረፊያ' 
                      : 'Comfortable & Secure Stay in Central Addis Ababa'}
                  </h1>
                  <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                    {lang === 'AM'
                      ? 'ፈቃዱ አውጅ ጌስት ሀውስ - በመርካቶ፣ አማኑኤል እና ቶቶአል አቅራቢያ የሚገኝ፣ ንጹህ ክፍሎች፣ ትኩስ ውሃ፣ አስተማማኝ ሴኩሪቲ እና ፈጣን ኢንተርኔት ያካተተ ዘመናዊ ማደሪያ።'
                      : 'Fikadu Awji Guest House offers modern, immaculate rooms with hot water, high-speed Wi-Fi, and top security right next to Mercato, Amanuel & Total area.'}
                  </p>
                </div>

                {/* Quick Booking Search Card */}
                <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-100 max-w-5xl mt-6">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                    {lang === 'AM' ? 'ክፍል ይፈልጉ እና ያስይዙ' : 'Search & Check Room Availability'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        {lang === 'AM' ? 'የሚገቡበት ቀን' : 'Check-in Date'}
                      </label>
                      <input 
                        type="date" 
                        value={searchCheckIn} 
                        onChange={(e) => setSearchCheckIn(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        {lang === 'AM' ? 'የሚወጡበት ቀን' : 'Check-out Date'}
                      </label>
                      <input 
                        type="date" 
                        value={searchCheckOut} 
                        onChange={(e) => setSearchCheckOut(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        {lang === 'AM' ? 'የእንግዶች ብዛት' : 'Guests'}
                      </label>
                      <select 
                        value={searchGuests} 
                        onChange={(e) => setSearchGuests(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value={1}>{lang === 'AM' ? '1 ሰው (ነጠላ)' : '1 Guest (Single)'}</option>
                        <option value={2}>{lang === 'AM' ? '2 ሰዎች' : '2 Guests'}</option>
                        <option value={3}>{lang === 'AM' ? '3+ ሰዎች (ቪአይፒ)' : '3+ Guests (VIP)'}</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button 
                        onClick={() => {
                          setActiveTab('rooms');
                          window.scrollTo({ top: 600, behavior: 'smooth' });
                        }}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 rounded-lg transition shadow flex items-center justify-center gap-2"
                      >
                        <Search className="w-4 h-4" />
                        {lang === 'AM' ? 'ክፍሎችን ተመልከት' : 'Find Rooms'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {lang === 'AM' ? 'የእንግዳ ክፍሎቻችን' : 'Our Accommodation Rooms'}
                  </h2>
                  <p className="text-slate-600 mt-2">
                    {lang === 'AM' ? 'ለእርስዎ ምቾት በጥንቃቄ የተዘጋጁ ክፍሎች' : 'Tailored for comfort, tranquility, and affordability.'}
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('rooms')} 
                  className="mt-4 md:mt-0 text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 group"
                >
                  {lang === 'AM' ? 'ሁሉንም ክፍሎች ይመልከቱ' : 'View All Rooms'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ROOMS_DATA.map((room) => (
                  <div key={room.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={room.image} 
                        alt={room.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30">
                        {room.price} ETB <span className="text-slate-300 font-normal">/ {lang === 'AM' ? 'ማደር' : 'night'}</span>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-slate-900">
                            {lang === 'AM' ? room.nameAm : room.name}
                          </h3>
                        </div>
                        <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                          {lang === 'AM' ? room.descriptionAm : room.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {(lang === 'AM' ? room.featuresAm : room.features).slice(0, 3).map((feat, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md font-medium">
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleOpenBooking(room)}
                        className="w-full bg-slate-900 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition shadow text-center"
                      >
                        {lang === 'AM' ? 'አሁኑኑ ያስይዙ' : 'Book Room Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {}
            <section className="bg-amber-50/50 py-16 border-y border-amber-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {lang === 'AM' ? 'የምናቀርባቸው አገልግሎቶች' : 'Guest House Amenities & Services'}
                  </h2>
                  <p className="text-slate-600 mt-2">
                    {lang === 'AM' ? 'የእርስዎን ማደሪያ ሙሉ በሙሉ ምቹ ለማድረግ የተዘጋጁ' : 'Everything you need for a comfortable stay in Addis Ketema.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {AMENITIES.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <div key={idx} className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm flex items-start space-x-4">
                        <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">
                            {lang === 'AM' ? item.titleAm : item.title}
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}

        {}
        {activeTab === 'rooms' && (
          <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-slate-900">
                {lang === 'AM' ? 'የክፍሎች ዝርዝር እና ዋጋ' : 'Available Rooms & Booking'}
              </h1>
              <p className="text-slate-600 mt-2">
                {lang === 'AM' ? 'ለእርስዎ የሚስማማውን ክፍል መርጠው በቴሌብር፣ ቻፓ ወይም በአካል ይክፈሉ፡' : 'Choose the room that best fits your preference and proceed with quick online booking.'}
              </p>
            </div>

            <div className="space-y-8">
              {ROOMS_DATA.map((room) => (
                <div key={room.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 relative h-64 lg:h-auto">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 lg:p-8 lg:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
                        <h2 className="text-2xl font-bold text-slate-900">
                          {lang === 'AM' ? room.nameAm : room.name}
                        </h2>
                        <div className="text-2xl font-black text-amber-700">
                          {room.price} ETB <span className="text-sm font-normal text-slate-500">/ {lang === 'AM' ? 'ማደር' : 'night'}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 mb-6">{lang === 'AM' ? room.descriptionAm : room.description}</p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs">
                          <span className="text-slate-400 block">{lang === 'AM' ? 'የአልጋ ስፋት' : 'Bed Type'}</span>
                          <span className="font-semibold text-slate-800">{room.bed}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs">
                          <span className="text-slate-400 block">{lang === 'AM' ? 'የሰው ብዛት' : 'Capacity'}</span>
                          <span className="font-semibold text-slate-800">{room.capacity} {lang === 'AM' ? 'ሰው' : 'Person(s)'}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs">
                          <span className="text-slate-400 block">{lang === 'AM' ? 'የክፍል ስፋት' : 'Room Size'}</span>
                          <span className="font-semibold text-slate-800">{room.size}</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                          {lang === 'AM' ? 'የክፍሉ አገልግሎቶች' : 'Included Amenities'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(lang === 'AM' ? room.featuresAm : room.features).map((feat, i) => (
                            <span key={i} className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200/60 text-xs px-3 py-1 rounded-full font-medium">
                              <Check className="w-3 h-3 text-amber-600" />
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                      <button 
                        onClick={() => handleOpenBooking(room)}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3 rounded-xl transition shadow"
                      >
                        {lang === 'AM' ? 'ይህንን ክፍል ያስይዙ' : 'Book This Room'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {}
        {activeTab === 'amenities' && (
          <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
              {lang === 'AM' ? 'አገልግሎቶች እና መገልገያዎች' : 'Full Amenities & Guest Services'}
            </h1>
            <p className="text-slate-600 max-w-3xl mb-10">
              {lang === 'AM'
                ? 'ፈቃዱ አውጅ ጌስት ሀውስ ደንበኞቹ በሰላምና በምቾት እንዲያርፉ የተሟላ የአገልግሎት አማራጮችን አዘጋጅቷል።'
                : 'Fikadu Awji Guest House provides high quality services designed to give you a restful and stress-free stay in Addis Ababa.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {AMENITIES.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start">
                    <div className="p-4 bg-amber-100 text-amber-800 rounded-2xl mb-4">
                      <IconComp className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {lang === 'AM' ? item.titleAm : item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {}
        {activeTab === 'mybookings' && (
          <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              {lang === 'AM' ? 'የያዝኳቸው ክፍሎች' : 'My Reservations'}
            </h1>
            <p className="text-slate-600 mb-8">
              {lang === 'AM' ? 'እዚህ ቀደም ብለው ያዟቸውን ክፍሎች እና ደረሰኝ ማየት ይችላሉ፡' : 'Manage your recent active room bookings and print receipts.'}
            </p>

            {bookings.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  {lang === 'AM' ? 'ምንም የተያዘ ክፍል የለም' : 'No Active Bookings Found'}
                </h3>
                <p className="text-slate-500 text-sm mb-6">
                  {lang === 'AM' ? 'እስካሁን ምንም አይነት ክፍል አላስያዙም።' : "You haven't booked any rooms yet."}
                </p>
                <button 
                  onClick={() => setActiveTab('rooms')}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2.5 rounded-xl transition"
                >
                  {lang === 'AM' ? 'ክፍል ያስይዙ' : 'Book a Room Now'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((item) => (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded">
                          Ref: {item.id}
                        </span>
                        <span className="text-xs text-slate-500">{item.createdAt}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {lang === 'AM' ? item.room.nameAm : item.room.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        {lang === 'AM' ? 'የሚገቡበት:' : 'Check-in:'} <b>{item.checkIn}</b> | {lang === 'AM' ? 'የሚወጡበት:' : 'Check-out:'} <b>{item.checkOut}</b> ({item.nights} {lang === 'AM' ? 'ቀን' : 'night(s)'})
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        {lang === 'AM' ? 'እንግዳ:' : 'Guest:'} <b>{item.guest.fullName} ({item.guest.phone})</b>
                      </p>
                    </div>

                    <div className="flex flex-col md:items-end gap-2">
                      <span className="text-lg font-extrabold text-amber-700">{item.totalAmount} ETB</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedReceipt(item)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 transition"
                        >
                          {lang === 'AM' ? 'ደረሰኝ ይመልከቱ' : 'View Receipt'}
                        </button>
                        <button 
                          onClick={() => cancelBooking(item.id)}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-rose-200 transition"
                        >
                          {lang === 'AM' ? 'ሰርዝ' : 'Cancel'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {}
        {activeTab === 'contact' && (
          <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
              {lang === 'AM' ? 'አድራሻ እና መገኛ' : 'Location & Contact Details'}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {lang === 'AM' ? 'ፈቃዱ አውጅ ጌስት ሀውስ' : 'Fikadu Awji Guest House'}
                  </h3>
                  <div className="space-y-3 text-slate-600">
                    <p className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>{lang === 'AM' ? 'አድራሻ:' : 'Address:'}</strong> Addis Ketema Sub-City, Mercato near Amanuel / Total Area, Addis Ababa, Ethiopia</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-amber-600 shrink-0" />
                      <span><strong>{lang === 'AM' ? 'ስልክ ቁጥር:' : 'Phone:'}</strong> +251 91 123 4567 / +251 91 765 4321</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-amber-600 shrink-0" />
                      <span><strong>{lang === 'AM' ? 'ኢሜይል:' : 'Email:'}</strong> info@fikaduawjiguesthouse.com</span>
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                  <strong>{lang === 'AM' ? 'ማሳሰቢያ:' : 'Note:'}</strong> {lang === 'AM' ? 'በስልክ መስመራችን ደውለው በቀጥታ አልጋ ማስያዝ እና መረጃ መጠየቅ ይችላሉ።' : 'You can call our direct lines anytime 24/7 for room inquiries and directions.'}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-slate-200 rounded-2xl overflow-hidden min-h-[300px] relative border border-slate-300 flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="w-12 h-12 text-amber-600 mx-auto mb-2 animate-bounce" />
                  <h4 className="font-bold text-slate-800">Mercato / Amanuel Location</h4>
                  <p className="text-xs text-slate-600 mt-1">Addis Ketema Sub-City, Addis Ababa</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {}
      {bookingModalOpen && selectedRoom && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative my-8">
            <button 
              onClick={() => setBookingModalOpen(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Steps indicator */}
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
              <span className={`text-xs font-bold ${bookingStep >= 1 ? 'text-amber-600' : 'text-slate-300'}`}>1. Dates</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className={`text-xs font-bold ${bookingStep >= 2 ? 'text-amber-600' : 'text-slate-300'}`}>2. Details</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <span className={`text-xs font-bold ${bookingStep >= 3 ? 'text-amber-600' : 'text-slate-300'}`}>3. Payment</span>
            </div>

            {bookingStep === 1 && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {lang === 'AM' ? 'የቀን እና የእንግዳ መረጃ' : 'Select Booking Dates'}
                </h3>
                <p className="text-slate-500 text-xs mb-6">
                  {lang === 'AM' ? selectedRoom.nameAm : selectedRoom.name} - <b>{selectedRoom.price} ETB/night</b>
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Check-in Date</label>
                    <input 
                      type="date" 
                      value={searchCheckIn} 
                      onChange={(e) => setSearchCheckIn(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Check-out Date</label>
                    <input 
                      type="date" 
                      value={searchCheckOut} 
                      onChange={(e) => setSearchCheckOut(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 flex justify-between text-xs font-semibold text-amber-900">
                    <span>Total Nights: {calculateDays()}</span>
                    <span>Total Amount: {selectedRoom.price * calculateDays()} ETB</span>
                  </div>
                </div>

                <button 
                  onClick={() => setBookingStep(2)}
                  className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition"
                >
                  Continue to Guest Details
                </button>
              </div>
            )}

            {bookingStep === 2 && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Guest Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g., Abebe Bikila"
                      value={guestDetails.fullName}
                      onChange={(e) => setGuestDetails({...guestDetails, fullName: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+251 91 000 0000"
                      value={guestDetails.phone}
                      onChange={(e) => setGuestDetails({...guestDetails, phone: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Optional)</label>
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      value={guestDetails.email}
                      onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button 
                    onClick={() => setBookingStep(1)}
                    className="w-1/3 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => {
                      if (!guestDetails.fullName || !guestDetails.phone) {
                        alert('Please fill in required fields (Name & Phone)');
                        return;
                      }
                      setBookingStep(3);
                    }}
                    className="w-2/3 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Payment Method</h3>
                <div className="space-y-3 mb-6">
                  <label className={`block border p-4 rounded-xl cursor-pointer transition ${paymentMethod === 'telebirr' ? 'border-amber-600 bg-amber-50/50' : 'border-slate-200'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="pm" 
                        checked={paymentMethod === 'telebirr'} 
                        onChange={() => setPaymentMethod('telebirr')} 
                      />
                      <div>
                        <div className="font-bold text-slate-900">Telebirr / ቴሌብር</div>
                        <div className="text-xs text-slate-500">Fast online payment via Telebirr app</div>
                      </div>
                    </div>
                  </label>

                  <label className={`block border p-4 rounded-xl cursor-pointer transition ${paymentMethod === 'chapa' ? 'border-amber-600 bg-amber-50/50' : 'border-slate-200'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="pm" 
                        checked={paymentMethod === 'chapa'} 
                        onChange={() => setPaymentMethod('chapa')} 
                      />
                      <div>
                        <div className="font-bold text-slate-900">Chapa (CBE / Cards / Awash)</div>
                        <div className="text-xs text-slate-500">Pay via CBE Birr or Ethiopian local bank cards</div>
                      </div>
                    </div>
                  </label>

                  <label className={`block border p-4 rounded-xl cursor-pointer transition ${paymentMethod === 'cash' ? 'border-amber-600 bg-amber-50/50' : 'border-slate-200'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="pm" 
                        checked={paymentMethod === 'cash'} 
                        onChange={() => setPaymentMethod('cash')} 
                      />
                      <div>
                        <div className="font-bold text-slate-900">Pay at Check-in (Cash)</div>
                        <div className="text-xs text-slate-500">Reserve now and pay upon arrival at guest house</div>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setBookingStep(2)}
                    className="w-1/3 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleConfirmBooking}
                    disabled={isProcessing}
                    className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    {isProcessing ? 'Processing...' : 'Confirm & Book'}
                  </button>
                </div>
              </div>
            )}

            {}
            {bookingStep === 4 && confirmedBooking && (
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-1">Booking Confirmed!</h3>
                <p className="text-xs text-slate-500 mb-6">Ref: <b>{confirmedBooking.id}</b></p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2 mb-6">
                  <div><strong>Guest:</strong> {confirmedBooking.guest.fullName}</div>
                  <div><strong>Phone:</strong> {confirmedBooking.guest.phone}</div>
                  <div><strong>Room:</strong> {confirmedBooking.room.name}</div>
                  <div><strong>Dates:</strong> {confirmedBooking.checkIn} to {confirmedBooking.checkOut}</div>
                  <div><strong>Total Paid/Due:</strong> {confirmedBooking.totalAmount} ETB</div>
                  <div><strong>Status:</strong> {confirmedBooking.paymentStatus}</div>
                </div>

                <button 
                  onClick={() => {
                    setBookingModalOpen(false);
                    setActiveTab('mybookings');
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition"
                >
                  View My Bookings
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <button 
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="border-b border-slate-200 pb-4 mb-4 text-center">
              <h2 className="font-extrabold text-slate-900 text-lg">Fikadu Awji Guest House</h2>
              <p className="text-xs text-slate-500">Mercato / Amanuel, Addis Ababa</p>
              <p className="text-xs text-amber-700 font-mono mt-1">Receipt #{selectedReceipt.id}</p>
            </div>
            <div className="space-y-2 text-xs text-slate-700 mb-6">
              <div className="flex justify-between"><span>Guest:</span> <strong>{selectedReceipt.guest.fullName}</strong></div>
              <div className="flex justify-between"><span>Phone:</span> <strong>{selectedReceipt.guest.phone}</strong></div>
              <div className="flex justify-between"><span>Room:</span> <strong>{selectedReceipt.room.name}</strong></div>
              <div className="flex justify-between"><span>Nights:</span> <strong>{selectedReceipt.nights}</strong></div>
              <div className="flex justify-between border-t pt-2 font-bold text-slate-900 text-sm">
                <span>Total Amount:</span>
                <span className="text-amber-700">{selectedReceipt.totalAmount} ETB</span>
              </div>
            </div>
            <button 
              onClick={() => window.print()}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Print / Save Receipt
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="font-semibold text-slate-300">
            {lang === 'AM' ? 'ፈቃዱ አውጅ ጌስት ሀውስ - መርካቶ / አማኑኤል አካባቢ፣ አዲስ አበባ' : 'Fikadu Awji Guest House - Mercato / Amanuel, Addis Ababa, Ethiopia'}
          </p>
          <p>© {new Date().getFullYear()} Fikadu Awji Guest House. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}