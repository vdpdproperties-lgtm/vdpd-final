import { Property, Project, Blog, Lead, Testimonial, FAQ, TeamMember, SiteSettings, AdminUser, SitePhotoItem } from '../types';

export const initialSiteSettings: SiteSettings = {
  companyName: 'Vrindavan Dham Property & Developers',
  shortName: 'VDPD',
  tagline: 'Your Vrindavan. Your Property. Your Future.',
  logoUrl: '/logo.svg',
  address: 'Vrindavan Dham Property & Developers, Near Major Property Locations, Vrindavan, Uttar Pradesh 281121',
  phonePrimary: '+91 98765 43210',
  phoneSecondary: '+91 98765 43211',
  emailPrimary: 'info@vdpd.in',
  emailSecondary: 'sales@vdpd.in',
  whatsappNumber: '+91 98765 43210',
  workingHours: 'Monday – Saturday: 9:00 AM – 7:00 PM | Sunday By Appointment',
  facebookUrl: 'https://facebook.com/vdpdvrindavan',
  instagramUrl: 'https://instagram.com/vdpdvrindavan',
  youtubeUrl: 'https://youtube.com/@vdpdvrindavan',
  linkedinUrl: 'https://linkedin.com/company/vdpd',
  metaTitle: 'Vrindavan Dham Property & Developers | VDPD',
  metaDescription: 'Find your place in the divine city. Premium residential plots, luxury villas, commercial spaces, and investment opportunities in Vrindavan Dham.',
  googleAnalyticsId: 'G-VDPD2026',
  googleSearchConsole: 'vdpd-gsc-auth-key-vrindavan',
  pageVisibility: {
    properties: true,
    projects: true,
    about: true,
    whyVdpd: true,
    contact: true,
    blog: true
  },
  featureVisibility: {
    wishlist: true,
    compare: true,
    emiCalculator: true,
    whatsappFloat: true,
    enquiryModal: true,
    investmentMetrics: true
  }
};

export const initialAdminUser: AdminUser = {
  id: 'adm-super-1',
  name: 'Radheshyam Agarwal',
  email: 'admin@vdpd.in',
  password: 'admin123',
  role: 'Super Admin',
  isSuperAdmin: true,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  phone: '+91 98765 43210',
  status: 'Active',
  createdAt: '2025-01-01',
  lastLogin: '2026-09-15 11:45 AM',
  permissions: {
    canManageProperties: true,
    canManageProjects: true,
    canManageLeads: true,
    canManageBlogs: true,
    canManagePhotos: true,
    canManageFaqs: true,
    canManageSettings: true,
    canManageUsers: true
  }
};

export const initialAdminUsers: AdminUser[] = [
  initialAdminUser,
  {
    id: 'adm-sub-1',
    name: 'Pooja Chaturvedi',
    email: 'pooja.sales@vdpd.in',
    password: 'sales123',
    role: 'Sales Executive',
    isSuperAdmin: false,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    phone: '+91 98765 43213',
    status: 'Active',
    createdAt: '2026-02-10',
    lastLogin: '2026-09-14 04:30 PM',
    permissions: {
      canManageProperties: true,
      canManageProjects: true,
      canManageLeads: true,
      canManageBlogs: false,
      canManagePhotos: false,
      canManageFaqs: false,
      canManageSettings: false,
      canManageUsers: false
    }
  },
  {
    id: 'adm-sub-2',
    name: 'Sunil Kumar Sharma',
    email: 'content@vdpd.in',
    password: 'content123',
    role: 'Content & Media Editor',
    isSuperAdmin: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    phone: '+91 98765 43212',
    status: 'Active',
    createdAt: '2026-03-01',
    lastLogin: '2026-09-13 02:15 PM',
    permissions: {
      canManageProperties: false,
      canManageProjects: false,
      canManageLeads: false,
      canManageBlogs: true,
      canManagePhotos: true,
      canManageFaqs: true,
      canManageSettings: false,
      canManageUsers: false
    }
  }
];

export const initialProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'Premium Residential Plots',
    slug: 'premium-residential-plots',
    tagline: 'Build your dream home in a tranquil divine environment',
    description: 'Well-planned residential plots situated in a premier gated development near major spiritual hubs. Enjoy wide 40-foot blacktop roads, underground electrification, dedicated temple complex inside the township, and 24/7 security. Perfect for families seeking peace and devotees wanting a permanent sanctum in Vrindavan Dham.',
    location: 'Vrindavan, Mathura',
    address: 'Sector 4, Near Bhaktivedanta Swami Marg, Vrindavan',
    price: 1800000,
    priceDisplay: '₹ 18 Lakh Onwards',
    area: '100 - 500 Sq. Yds',
    areaSqFt: 900,
    propertyType: 'Residential Plots',
    status: 'Fast Selling',
    featured: true,
    featuredImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Gated Community & 24/7 Security',
      '40 ft. Wide Tarred Roads',
      'In-Township Radha Krishna Temple',
      'Underground Drainage & Water Lines',
      'Lush Landscaped Parks & Jogging Track',
      'Street Lighting & CCTV Surveillance'
    ],
    investmentHighlights: [
      'Direct connectivity to Yamuna Expressway (8 mins)',
      '100% Freehold title with clear Registry & Dakhil Kharij',
      'Anticipated 22% yearly capital appreciation',
      'Immediate construction permission available'
    ],
    landmarkDistances: [
      { landmark: 'Prem Mandir', distance: '3.2 km' },
      { landmark: 'Banke Bihari Temple', distance: '4.5 km' },
      { landmark: 'ISKCON Temple', distance: '3.8 km' },
      { landmark: 'Yamuna Expressway', distance: '8.0 km' }
    ],
    reraApproved: true,
    reraNumber: 'UPRERA/PRJ/2025/0948',
    viewsCount: 1420,
    createdAt: '2026-08-10',
    projectId: 'proj-1',
    documents: [
      { title: 'Township Master Layout Map', type: 'PDF', size: '3.4 MB' },
      { title: 'Legal Title Verification Certificate', type: 'PDF', size: '1.8 MB' },
      { title: 'Official VDPD Brochure', type: 'PDF', size: '5.2 MB' }
    ]
  },
  {
    id: 'prop-2',
    title: 'Luxury Villas',
    slug: 'luxury-villas',
    tagline: 'Modern homes designed for comfortable and peaceful living',
    description: 'Spacious and architecturally designed duplex & triplex villas offering a synthesis of Vedic aesthetics and contemporary European luxury. Features private courtyards, rooftop meditation terraces facing holy parikrama views, Italian marble flooring, and smart home automation.',
    location: 'Vrindavan, Mathura',
    address: 'Raman Reti Sanctuary Road, Vrindavan, Mathura',
    price: 12000000,
    priceDisplay: '₹ 1.2 Cr Onwards',
    area: '2000 - 5000 Sq. Ft',
    areaSqFt: 3200,
    propertyType: 'Villas',
    status: 'Ready to Move',
    featured: true,
    featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Private Swimming Pool & Sun Deck',
      'Rooftop Meditation & Yoga Pavilion',
      'Clubhouse with Satsang & Banquet Hall',
      'Covered Multi-Vehicle Parking',
      'Solar Power Backup & Rainwater Harvesting',
      'High-Speed Fiber Internet & Smart Lockers'
    ],
    investmentHighlights: [
      'High weekend & festival rental yields (12% - 15% ROI)',
      'Fully furnished turnkey options available on request',
      'Exclusive boutique community with elite neighbor profile',
      'Ready possession with immediate occupation'
    ],
    landmarkDistances: [
      { landmark: 'Prem Mandir', distance: '2.5 km' },
      { landmark: 'Banke Bihari Temple', distance: '3.6 km' },
      { landmark: 'Maa Vaishno Devi Dham', distance: '1.8 km' },
      { landmark: 'Mathura Junction', distance: '11.0 km' }
    ],
    reraApproved: true,
    reraNumber: 'UPRERA/PRJ/2024/7123',
    viewsCount: 2180,
    createdAt: '2026-08-05',
    projectId: 'proj-2',
    documents: [
      { title: 'Villa Floor Plans & Specifications', type: 'PDF', size: '4.1 MB' },
      { title: 'Quality Assurance & Structure Certificate', type: 'PDF', size: '2.2 MB' }
    ]
  },
  {
    id: 'prop-3',
    title: 'Strategic Investment Plots',
    slug: 'strategic-investment-plots',
    tagline: 'High-growth potential with long-term value in the heart of Vrindavan',
    description: 'High-capitalization freehold land parcels strategically situated near the upcoming Heritage City corridor and Delhi-Agra Yamuna Expressway junction. Surrounded by planned hospitality resorts and spiritual wellness centers, ensuring exponential land value escalation.',
    location: 'Vrindavan, Mathura',
    address: 'Yamuna Expressway Link Road, Vrindavan Zone',
    price: 1500000,
    priceDisplay: '₹ 15 Lakh Onwards',
    area: '200 - 1000 Sq. Yds',
    areaSqFt: 1800,
    propertyType: 'Investment Properties',
    status: 'Available',
    featured: true,
    featuredImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Boundary Wall & Gated Entrance',
      'Direct 60-foot Highway Frontage',
      'Reliable Power Grid Connection',
      'High Future Commercial Flexibility',
      'Zero Waterlogging Certified Soil'
    ],
    investmentHighlights: [
      'Near proposed 750-acre Heritage City tourism hub',
      'Projected 3X valuation over 4 years',
      'Easy resale exit through VDPD investor network',
      'Flexible installment payment plans available'
    ],
    landmarkDistances: [
      { landmark: 'Proposed Heritage City', distance: '1.5 km' },
      { landmark: 'Yamuna Expressway Toll', distance: '4.0 km' },
      { landmark: 'Prem Mandir', distance: '6.2 km' },
      { landmark: 'Jewar Airport Corridor', distance: '38.0 km' }
    ],
    reraApproved: true,
    reraNumber: 'UPRERA/PRJ/2025/1102',
    viewsCount: 940,
    createdAt: '2026-08-12',
    projectId: 'proj-1'
  },
  {
    id: 'prop-4',
    title: 'Gated Township Plots',
    slug: 'gated-township-plots',
    tagline: 'Secure, serene and well-connected township plots for your dream home',
    description: 'An idyllic master-planned enclave along Barsana Road, crafted for wholesome community living. Features manicured tree avenues, underground utilities, children play areas, and dedicated elderly walking zones with soothing devotional bhajan audio ambiance throughout the central gardens.',
    location: 'Barsana Road, Vrindavan',
    address: 'Near Radha Rani Marg, Barsana Road, Vrindavan',
    price: 1200000,
    priceDisplay: '₹ 12 Lakh Onwards',
    area: '150 - 600 Sq. Yds',
    areaSqFt: 1350,
    propertyType: 'Residential Plots',
    status: 'Fast Selling',
    featured: false,
    featuredImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Grand Ornamental Entry Gate with Guard Cabin',
      'Internal Solar Street Lights',
      'Dedicated Krishna Gaushala Support Wing',
      'Perimeter Security Fencing',
      'Water Harvesting Reservoirs'
    ],
    investmentHighlights: [
      'Affordable entry ticket for Braj devotees',
      'Fast developing sector with high rental demand',
      'Easy registry and instant possession'
    ],
    landmarkDistances: [
      { landmark: 'Barsana Shri Radha Rani Mandir', distance: '14.0 km' },
      { landmark: 'Govardhan Parikrama Marg', distance: '12.0 km' },
      { landmark: 'Prem Mandir', distance: '5.8 km' },
      { landmark: 'Chhatikara Crossing', distance: '4.2 km' }
    ],
    reraApproved: true,
    reraNumber: 'UPRERA/PRJ/2025/3349',
    viewsCount: 1680,
    createdAt: '2026-08-15',
    projectId: 'proj-3'
  },
  {
    id: 'prop-5',
    title: 'Shop & Office Spaces',
    slug: 'shop-office-spaces',
    tagline: 'Ideal for businesses, retail outlets and offices in a high-footfall location',
    description: 'High-visibility commercial units and retail showrooms along the main arterial corridor frequented by over 20 million pilgrims annually. Suitable for prasadam sweet marts, spiritual gift shops, medical centers, guest house reception desks, and financial institutions.',
    location: 'Vrindavan, Mathura',
    address: 'Main Bhaktivedanta Swami Marg, Near ISKCON, Vrindavan',
    price: 2500000,
    priceDisplay: '₹ 25 Lakh Onwards',
    area: '200 - 2000 Sq. Ft',
    areaSqFt: 600,
    propertyType: 'Commercial',
    status: 'Available',
    featured: false,
    featuredImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Ample Customer Parking Bays',
      'Dual High-Speed Passenger Elevators',
      '100% DG Power Backup',
      'Central Fire Suppression Infrastructure',
      'High-Footfall Glass Frontages'
    ],
    investmentHighlights: [
      'Guaranteed high rental lease options',
      'Direct tourist movement zone',
      'Attractive 9% - 11% commercial yield'
    ],
    landmarkDistances: [
      { landmark: 'ISKCON Vrindavan', distance: '1.2 km' },
      { landmark: 'Banke Bihari Temple', distance: '2.1 km' },
      { landmark: 'Vrindavan Railway Station', distance: '3.0 km' }
    ],
    reraApproved: true,
    reraNumber: 'UPRERA/PRJ/2024/8891',
    viewsCount: 1120,
    createdAt: '2026-08-18'
  },
  {
    id: 'prop-6',
    title: 'Farmhouse & Retreat Land',
    slug: 'farmhouse-retreat-land',
    tagline: 'Perfect for personal retreats, farmhouses or long-term investment',
    description: 'Expansive lush agricultural and farmhouse estates adjacent to serene water bodies and kadamba groves. Build your personal spiritual ashram, organic gaushala, or weekend retreat amidst pure Braj breeze, completely shielded from urban noise.',
    location: 'Vrindavan, Mathura',
    address: 'Sunrakh Kadamba Sanctuary Zone, Vrindavan',
    price: 3000000,
    priceDisplay: '₹ 30 Lakh Onwards',
    area: '1 - 10 Bigha',
    areaSqFt: 27000,
    propertyType: 'Farmhouse & Retreat Land',
    status: 'Available',
    featured: false,
    featuredImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Fertile Sweet Ground Water with Borewell Support',
      'Organic Soil Suitable for Horticulture & Fruit Orchards',
      'Fenced Boundaries with Mature Trees',
      'Private Approach Road Connection'
    ],
    investmentHighlights: [
      'Ideal for wellness centers, dharamsalas, or private gaushalas',
      'Highest land volume for value in the region',
      'Clear title verified by senior Mathura district advocates'
    ],
    landmarkDistances: [
      { landmark: 'Kaliadeh Ghat', distance: '4.8 km' },
      { landmark: 'Chhatikara Crossing', distance: '6.5 km' },
      { landmark: 'Prem Mandir', distance: '5.2 km' }
    ],
    reraApproved: true,
    viewsCount: 810,
    createdAt: '2026-08-20'
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Radha Rani Enclave',
    slug: 'radha-rani-enclave',
    tagline: 'Master-Planned 45-Acre Divine Township with Integrated Temple',
    description: 'Radha Rani Enclave is our flagship luxury residential gated community located on the prestigious Chhatikara-Vrindavan corridor. Featuring 400+ residential plots, grand landscape avenues, and a dedicated 2-acre Radha Krishna temple complex.',
    location: 'Chhatikara Road, Vrindavan',
    status: 'Under Development',
    completionDate: 'December 2026',
    featuredImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
    ],
    totalUnits: '420 Plots & 50 Villas',
    highlights: [
      '45 Acres Total Land Bank',
      '2 Acres In-Township Temple & Satsang Hall',
      'Wide 50ft, 40ft & 30ft Blacktop Roads',
      'Direct access from Chhatikara 6-lane road'
    ],
    amenities: [
      'Gated Entry with RFID Barrier',
      '24/7 CCTV & Security Patrol',
      'Underground Electricity Grid',
      'Children Play Park & Amphitheatre'
    ]
  },
  {
    id: 'proj-2',
    name: 'Shri Krishna Valley Villas',
    slug: 'shri-krishna-valley-villas',
    tagline: 'Exclusive Mediterranean-Vedic Duplex Villas in Serene Raman Reti',
    description: 'An elite enclave of 72 luxury villas crafted for devotees seeking serene living with five-star hospitality standards. Each villa features a private garden, mandir alcove, rooftop terrace, and custom interiors.',
    location: 'Raman Reti Sanctuary Zone, Vrindavan',
    status: 'Ready to Possess',
    completionDate: 'Immediate',
    featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    totalUnits: '72 Signature Villas',
    highlights: [
      'Ready to move with electric & water connections',
      'Vastu-compliant East and North-facing designs',
      'Integrated solar energy systems'
    ],
    amenities: [
      'Private Clubhouse & Swimming Pool',
      'Holistic Wellness & Ayurveda Center',
      'Concierge & Housekeeping Service'
    ]
  },
  {
    id: 'proj-3',
    name: 'Govardhan Greens Township',
    slug: 'govardhan-greens-township',
    tagline: 'Scenic Affordable Residential Plots Connecting Vrindavan & Govardhan',
    description: 'Strategically located between Vrindavan and the holy Govardhan Hill, offering affordable, secure, and clear-title plots for devotees desiring pilgrimage convenience.',
    location: 'Barsana-Govardhan Link Road, Vrindavan',
    status: 'Under Development',
    completionDate: 'March 2027',
    featuredImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
    ],
    totalUnits: '280 Plots',
    highlights: [
      'Plots from 100 sq. yards to 300 sq. yards',
      'Easy 24-month interest-free payment plan',
      'Proximity to upcoming Ring Road'
    ],
    amenities: [
      'Community Park & Walking Trail',
      'Solar Powered Street Lights',
      'Round the clock water supply'
    ]
  }
];

export const initialBlogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'Top 5 Reasons to Invest in Vrindavan Real Estate in 2026',
    slug: 'top-5-reasons-to-invest-in-vrindavan-real-estate-2026',
    excerpt: 'Discover why thousands of devotees, HNIs, and institutional investors are securing residential plots and villas in Vrindavan this year.',
    content: `Vrindavan is no longer just a traditional pilgrimage destination; it has rapidly transformed into one of North India's premier spiritual-lifestyle and high-growth real estate corridors.

### 1. Unmatched Infrastructure & Connectivity
With the Yamuna Expressway, the upcoming Heritage City corridor, and the close proximity to Noida International Airport (Jewar), travel time from Delhi NCR has reduced to under 90 minutes.

### 2. Year-Round Rental Demand
Unlike seasonal holiday hill stations, Vrindavan witnesses massive pilgrim inflows every single weekend and festival throughout the year. Homeowners earn attractive rental yields through boutique spiritual homestays.

### 3. Clear Land Titles with VDPD
With VDPD's rigorous legal vetting, all plots and villas come with 100% freehold ownership, registry, and dakhil kharij (mutation) clarity.

### 4. Soulful Retirement Living
Devotees from across the globe seek a peaceful sanctum to chant, meditate, and enjoy pure satvik living in their golden years.

### 5. High Capital Appreciation
Land prices across prime corridors have shown steady 18-24% annual compounding, outperforming conventional metro real estate markets.`,
    featuredImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    category: 'Investment Guides',
    tags: ['Vrindavan Real Estate', 'ROI', 'Plots in Vrindavan', 'Spiritual Living'],
    author: 'VDPD Research Team',
    readTime: '6 min read',
    published: true,
    createdAt: '2026-08-20',
    seoTitle: 'Why Invest in Vrindavan Real Estate 2026 | VDPD Guide',
    seoDesc: 'Comprehensive guide on why investing in Vrindavan plots and villas offers superior returns and spiritual fulfillment.'
  },
  {
    id: 'blog-2',
    title: 'Legal Checklist Before Buying Land or Plots in Mathura-Vrindavan',
    slug: 'legal-checklist-buying-land-mathura-vrindavan',
    excerpt: 'Crucial legal documents, registry verification steps, and zoning rules you must check before signing a land deed in Braj Bhoomi.',
    content: `Purchasing property in holy Vrindavan is an emotional and spiritual milestone. However, doing your due diligence is essential to safeguard your life savings.

### 1. Verify Freehold Status (143 Conversion)
Ensure agricultural land has been legally converted under Section 143/80 of the UP Revenue Code for non-agricultural residential use.

### 2. Check 30-Year Search Report
Always obtain a registered 30-year non-encumbrance certificate from the Mathura Sub-Registrar Office to confirm zero existing bank mortgages or family disputes.

### 3. Immediate Mutation (Dakhil Kharij)
A registry is only the first step. The mutation (Dakhil Kharij) must be executed in the government revenue records (Khatauni) in your name.

### 4. Boundary Demarcation (Nishan-Dehi)
Physically measure and verify the site boundaries with the official revenue tehsildar and patwari map before finalizing payment.

At VDPD, every single square yard we offer has already completed this rigorous 4-step clearance!`,
    featuredImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    category: 'Legal & Advisory',
    tags: ['Legal Guide', 'Land Registry', 'Dakhil Kharij', 'Property Buying Tips'],
    author: 'Adv. Rameshwar Sharma (Legal Head)',
    readTime: '8 min read',
    published: true,
    createdAt: '2026-08-14'
  },
  {
    id: 'blog-3',
    title: 'Villas vs Plots in Vrindavan: Which Is the Right Choice for Devotees?',
    slug: 'villas-vs-plots-in-vrindavan-which-is-right-choice',
    excerpt: 'Comparing capital outlay, maintenance, customization freedom, and appreciation potential between ready luxury villas and residential plots.',
    content: `Devotees looking to own property in Vrindavan often face the dilemma: Should you buy an independent plot and construct at your own pace, or opt for a ready luxury villa?

### Plots: Maximum Flexibility & Lower Capital Entry
Plots offer entry tickets starting from ₹12 to ₹18 Lakhs. You have the total freedom to design your temple room, courtyard, and number of floors according to your family's Vedic preferences.

### Villas: Zero Construction Hassles & Immediate Occupancy
Managing construction from afar (especially for devotees residing in Mumbai, Gujarat, Delhi, or abroad) can be stressful. Ready villas provide instant turnkey keys, clubhouse facilities, and round-the-clock maintenance.

### Conclusion
If you want to move in immediately or rent on Airbnb/homestays, choose a Villa. If your horizon is long-term retirement or investment, plots offer higher raw appreciation.`,
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    category: 'Property Comparison',
    tags: ['Luxury Villas', 'Residential Plots', 'Devotee Homes'],
    author: 'Sunil Kumar (Senior Advisor)',
    readTime: '5 min read',
    published: true,
    createdAt: '2026-08-08'
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Gopal Krishna Das & Radharani Dasi',
    designation: 'Devotees & Villa Owners from Mumbai',
    review: 'Owning a sanctuary in Sri Vrindavan Dham was our lifelong prayer. VDPD made the entire process completely transparent, peaceful, and honest. From site visits to registry and legal mutation, their team guided us like family. We now spend every Ekadashi in our own villa!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Dr. Alok Verma',
    designation: 'Senior Orthopedic Surgeon & Investor, Delhi NCR',
    review: 'I invested in two residential plots at Radha Rani Enclave 18 months ago. The infrastructure development speed, wide roads, and prompt legal paperwork exceeded all my expectations. The value has already appreciated significantly, but more importantly, the peace of mind is priceless.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Meera Patel',
    designation: 'NRI Investor, London UK',
    review: 'Living in the UK, buying property in India usually gives you anxiety. But VDPD provided video walkthroughs, digital contracts, and clear verified documentation. Their team is ethical, God-fearing, and deeply professional. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5
  }
];

export const initialFaqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How can I schedule a site visit?',
    answer: 'Simply call us directly at +91 98765 43210 or submit the inquiry form on our website. Our dedicated relationship manager will arrange an AC cab pickup from Mathura Junction or Delhi NCR for a personalized, guided tour of shortlisted properties.',
    category: 'Site Visits',
    displayOrder: 1
  },
  {
    id: 'faq-2',
    question: 'Do you provide legal documentation assistance?',
    answer: 'Yes, we assist throughout the documentation and registration process. Every property offered through VDPD undergoes a 30-year title verification, registry checks, and 100% transparent mutation support.',
    category: 'Legal',
    displayOrder: 2
  },
  {
    id: 'faq-3',
    question: 'Can I invest remotely?',
    answer: 'Yes, we support devotees and investors from across India and overseas (NRIs). We provide live 360-degree virtual video walkthroughs, verified digital contracts, power of attorney guidance, and dedicated relationship manager updates.',
    category: 'Investment',
    displayOrder: 3
  },
  {
    id: 'faq-4',
    question: 'Are all properties verified?',
    answer: 'We prioritize properties with clear documentation, approved layout maps, government compliance, and transparent freehold ownership. We do not deal in litigated or ambiguous land.',
    category: 'Verification',
    displayOrder: 4
  },
  {
    id: 'faq-5',
    question: 'What are the distance highlights to major Vrindavan temples?',
    answer: 'Most of our prime residential townships are strategically located within 3 to 6 kilometers of Prem Mandir, Banke Bihari Temple, and ISKCON Vrindavan, with quick access to both Yamuna Expressway and NH-19.',
    category: 'Location',
    displayOrder: 5
  }
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Radheshyam Agarwal',
    position: 'Founder & Managing Director',
    bio: 'Over 22 years of real estate leadership in Braj Bhoomi. A devoted servant of Vrindavan committed to ethical development and transparent property guidance.',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98765 43210',
    email: 'md@vdpd.in'
  },
  {
    id: 'team-2',
    name: 'Sunil Kumar Sharma',
    position: 'Head of Project Development',
    bio: 'Civil engineering specialist with 16+ years supervising master-planned township infrastructure, roads, drainage, and landscape architecture.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98765 43212',
    email: 'projects@vdpd.in'
  },
  {
    id: 'team-3',
    name: 'Pooja Chaturvedi',
    position: 'Director - Client Relations & NRI Services',
    bio: 'Ensures seamless end-to-end site tours, legal registry hand-holding, and dedicated remote advisory for national and overseas devotees.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98765 43213',
    email: 'clientcare@vdpd.in'
  },
  {
    id: 'team-4',
    name: 'Adv. Rameshwar Nath',
    position: 'Chief Legal Counsel & Revenue Expert',
    bio: 'Senior advocate registered with the Mathura Bar Association, specializing in UP revenue law, title scrutiny, and registry clearance.',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    phone: '+91 98765 43214',
    email: 'legal@vdpd.in'
  }
];

export const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Vikramaditya Joshi',
    phone: '+91 98201 44521',
    email: 'vikram.joshi@gmail.com',
    propertyInterest: 'Luxury Villas',
    message: 'Interested in a 3 BHK duplex villa near Raman Reti. Would like to schedule a site visit this Saturday.',
    status: 'Site Visit Scheduled',
    createdAt: '2026-09-14 10:30'
  },
  {
    id: 'lead-2',
    name: 'Ananya Singhal',
    phone: '+91 94120 78210',
    email: 'ananya.singhal@yahoo.com',
    propertyInterest: 'Premium Residential Plots',
    message: 'Looking for 200 sq. yard plot with clear title and fast registry in Radha Rani Enclave.',
    status: 'Contacted',
    createdAt: '2026-09-13 15:45'
  },
  {
    id: 'lead-3',
    name: 'Rajesh & Suman Gupta',
    phone: '+91 98112 55901',
    email: 'gupta.rajesh@outlook.com',
    propertyInterest: 'Strategic Investment Plots',
    message: 'We want to invest ₹30-40 Lakhs near the Yamuna Expressway corridor. Please send brochure and price list.',
    status: 'New',
    createdAt: '2026-09-12 18:20'
  },
  {
    id: 'lead-4',
    name: 'Mukund Bihari Das',
    phone: '+91 99870 12345',
    email: 'mbdas@iskcon.net',
    propertyInterest: 'Farmhouse & Retreat Land',
    message: 'Seeking 2 Bigha quiet land near Sunrakh for ashram meditation and small gaushala setup.',
    status: 'Negotiating',
    createdAt: '2026-09-11 11:15'
  }
];

export const initialSitePhotos: SitePhotoItem[] = [
  {
    id: 'hero_background',
    category: 'banners',
    label: 'Home Page Hero Background',
    section: 'Home Page Hero Top Banner',
    url: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=2000&q=85',
    defaultUrl: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=2000&q=85',
    aspectRatio: '16:9',
    recommendedSize: '1920 x 1080 px (Vrindavan Sacred Temple & Yamuna Ghat)'
  },
  {
    id: 'home_cat_plots',
    category: 'home',
    label: 'Home Featured: Residential Plots',
    section: 'Home Page Featured Category Card 1',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    defaultUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '4:3',
    recommendedSize: '800 x 600 px (Township Land & Green Plots)'
  },
  {
    id: 'home_cat_villas',
    category: 'home',
    label: 'Home Featured: Luxury Villas',
    section: 'Home Page Featured Category Card 2',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    defaultUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '4:3',
    recommendedSize: '800 x 600 px (Luxury Duplex Villa with Garden)'
  },
  {
    id: 'home_cat_investment',
    category: 'home',
    label: 'Home Featured: Investment Properties',
    section: 'Home Page Featured Category Card 3',
    url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    defaultUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '4:3',
    recommendedSize: '800 x 600 px (Vrindavan Heritage & High-Growth Land)'
  },
  {
    id: 'home_about_story',
    category: 'home',
    label: 'Home Page: About VDPD Feature Image',
    section: 'Home Page "About Vrindavan Dham Property & Developers"',
    url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
    defaultUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
    aspectRatio: '4:3',
    recommendedSize: '1000 x 750 px (Holy Temples of Sri Vrindavan Dham)'
  },
  {
    id: 'about_hero',
    category: 'banners',
    label: 'About Us Hero Banner',
    section: 'About Us Page Top Banner',
    url: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=2000&q=85',
    defaultUrl: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=2000&q=85',
    aspectRatio: '16:9',
    recommendedSize: '1920 x 800 px (Sacred Vrindavan Riverfront)'
  },
  {
    id: 'about_story_main',
    category: 'about',
    label: 'About Us: Our Story Main Image',
    section: 'About Us Page Story Center Photo',
    url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    defaultUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    aspectRatio: '4:3',
    recommendedSize: '800 x 600 px (Vrindavan Sacred Temple)'
  },
  {
    id: 'about_polaroid_1',
    category: 'about',
    label: 'About Us: Polaroid 1 (Radhe Radhe Shikhara)',
    section: 'About Us Page Floating Card Top Right',
    url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=400&q=80',
    defaultUrl: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=400&q=80',
    aspectRatio: '1:1',
    recommendedSize: '400 x 400 px (Temple Spire at Sunset)'
  },
  {
    id: 'about_polaroid_2',
    category: 'about',
    label: 'About Us: Polaroid 2 (Yamuna Sanctuary)',
    section: 'About Us Page Floating Card Bottom Right',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    defaultUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    aspectRatio: '1:1',
    recommendedSize: '400 x 400 px (Sacred Yamuna Riverbanks)'
  },
  {
    id: 'properties_hero',
    category: 'banners',
    label: 'Properties Page Hero Banner',
    section: 'All Properties Page Top Header',
    url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1800&q=80',
    defaultUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1800&q=80',
    aspectRatio: '16:9',
    recommendedSize: '1920 x 800 px (Vrindavan Golden Spire)'
  },
  {
    id: 'projects_hero',
    category: 'banners',
    label: 'Projects Page Hero Banner',
    section: 'Townships & Master Projects Header',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80',
    defaultUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80',
    aspectRatio: '16:9',
    recommendedSize: '1920 x 800 px (Green Township Land Bank)'
  },
  {
    id: 'blog_hero',
    category: 'banners',
    label: 'Blog & Articles Hero Banner',
    section: 'Blog Page Top Header',
    url: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1800&q=80',
    defaultUrl: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1800&q=80',
    aspectRatio: '16:9',
    recommendedSize: '1920 x 800 px (Sacred Keshi Ghat & Devotees)'
  },
  {
    id: 'contact_hero',
    category: 'banners',
    label: 'Contact Page Hero Banner',
    section: 'Contact Page Top Header',
    url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2000&q=85',
    defaultUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2000&q=85',
    aspectRatio: '16:9',
    recommendedSize: '1920 x 800 px (Vrindavan Golden Glow)'
  },
  {
    id: 'contact_office',
    category: 'banners',
    label: 'Contact Office / Vrindavan Landmark',
    section: 'Contact Page Office Information Card',
    url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    defaultUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    aspectRatio: '16:9',
    recommendedSize: '1000 x 600 px (Intricate Sandstone Architecture)'
  },
  {
    id: 'why_vdpd_hero',
    category: 'banners',
    label: 'Why VDPD Hero Banner',
    section: 'Why VDPD Page Top Header',
    url: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1800&q=80',
    defaultUrl: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1800&q=80',
    aspectRatio: '16:9',
    recommendedSize: '1920 x 800 px (Holy Vrindavan Dham Serenity)'
  }
];

export const vrindavanPhotoPresets = [
  {
    title: 'Prem Mandir & Holy Temple Spire',
    tag: 'Spiritual Temple',
    url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=80',
    desc: 'Majestic Hindu temple with traditional shikhara spires in golden twilight.'
  },
  {
    title: 'Keshi Ghat & Sacred Yamuna River',
    tag: 'Sacred Ghat',
    url: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1600&q=80',
    desc: 'Ancient stone steps, reflection on sacred waters, and temple towers.'
  },
  {
    title: 'Twilight Temple Gopuram & Bells',
    tag: 'Evening Aarti',
    url: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1600&q=80',
    desc: 'Illuminated temple spires against evening twilight.'
  },
  {
    title: 'Vedic Sandstone Carvings & Haveli',
    tag: 'Heritage Architecture',
    url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80',
    desc: 'Richly carved sandstone arches and temple pavilions of Braj.'
  },
  {
    title: 'Sacred Kadamba & River Sanctuary',
    tag: 'Nature Retreat',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    desc: 'Serene waterbody, lush trees, and tranquil retreat land.'
  },
  {
    title: 'Golden Sunrise Residential Plots',
    tag: 'Residential Land',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    desc: 'Well-planned master township land under clear skies.'
  },
  {
    title: 'Luxury Villa with Private Garden',
    tag: 'Luxury Villa',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    desc: 'Contemporary luxury villa with manicured lawn and peaceful ambiance.'
  },
  {
    title: 'Township Avenues & Gated Enclave',
    tag: 'Gated Township',
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
    desc: 'Paved avenue roads with trees and modern residential community.'
  },
  {
    title: 'Strategic High-Growth Development',
    tag: 'Commercial & Highway',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    desc: 'Modern infrastructure with premier highway connectivity.'
  }
];
