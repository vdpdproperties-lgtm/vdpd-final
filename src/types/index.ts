export type PropertyType = 
  | 'Residential Plots'
  | 'Villas'
  | 'Commercial'
  | 'Investment Properties'
  | 'Farmhouse & Retreat Land'
  | 'Gated Township Plots';

export type PropertyStatus = 'Available' | 'Fast Selling' | 'Ready to Move' | 'Upcoming' | 'Sold Out';

export type ProjectStatus = 'Under Development' | 'Ready to Possess' | 'Planning' | 'Completed';

export type LeadStatus = 'New' | 'Contacted' | 'Site Visit Scheduled' | 'Negotiating' | 'Converted' | 'Closed';

export interface Property {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  location: string;
  address?: string;
  price: number;
  priceDisplay: string;
  area: string;
  areaSqFt?: number;
  propertyType: PropertyType;
  status: PropertyStatus;
  featured: boolean;
  featuredImage: string;
  gallery: string[];
  amenities: string[];
  investmentHighlights?: string[];
  landmarkDistances?: { landmark: string; distance: string }[];
  reraApproved: boolean;
  reraNumber?: string;
  viewsCount: number;
  createdAt: string;
  projectId?: string;
  documents?: { title: string; type: string; size: string }[];
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  location: string;
  status: ProjectStatus;
  completionDate: string;
  featuredImage: string;
  gallery: string[];
  totalUnits?: string;
  highlights: string[];
  amenities: string[];
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  tags?: string[];
  author: string;
  readTime: string;
  published?: boolean;
  publishedAt?: string;
  createdAt: string;
  seoTitle?: string;
  seoDesc?: string;
}

export type BlogPost = Blog;

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyInterest: string;
  propertyId?: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  review: string;
  image: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  displayOrder: number;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  phone?: string;
  email?: string;
}

export interface PageVisibilitySettings {
  properties: boolean;
  projects: boolean;
  about: boolean;
  whyVdpd: boolean;
  contact: boolean;
  blog: boolean;
}

export interface FeatureVisibilitySettings {
  wishlist: boolean;
  compare: boolean;
  emiCalculator: boolean;
  whatsappFloat: boolean;
  enquiryModal: boolean;
  investmentMetrics: boolean;
}

export interface SiteSettings {
  companyName: string;
  shortName: string;
  tagline: string;
  logoUrl: string;
  address: string;
  phonePrimary: string;
  phoneSecondary: string;
  emailPrimary: string;
  emailSecondary: string;
  whatsappNumber: string;
  workingHours: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  metaTitle: string;
  metaDescription: string;
  googleAnalyticsId: string;
  googleSearchConsole: string;
  pageVisibility?: PageVisibilitySettings;
  featureVisibility?: FeatureVisibilitySettings;
}

export interface SitePhotoItem {
  id: string;
  category: 'banners' | 'home' | 'about' | 'properties' | 'projects' | 'blogs';
  label: string;
  section: string;
  url: string;
  defaultUrl: string;
  aspectRatio?: string;
  recommendedSize?: string;
}

export type SitePhotosMap = Record<string, string>;

export interface AdminPermissions {
  canManageProperties: boolean;
  canManageProjects: boolean;
  canManageLeads: boolean;
  canManageBlogs: boolean;
  canManagePhotos: boolean;
  canManageFaqs: boolean;
  canManageSettings: boolean;
  canManageUsers: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  isSuperAdmin: boolean;
  avatar: string;
  phone?: string;
  status: 'Active' | 'Inactive';
  createdAt?: string;
  lastLogin?: string;
  permissions: AdminPermissions;
}

export type ActivePage = 
  | 'home'
  | 'properties'
  | 'property-detail'
  | 'projects'
  | 'project-detail'
  | 'about'
  | 'contact'
  | 'blog'
  | 'blog-detail'
  | 'why-vdpd'
  | 'admin'
  | 'compare'
  | 'sitemap';
