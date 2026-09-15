import { 
  Property, 
  Project, 
  Blog, 
  Lead, 
  Testimonial, 
  FAQ, 
  TeamMember, 
  SiteSettings, 
  AdminUser,
  SitePhotoItem 
} from '../types';
import { 
  initialProperties, 
  initialProjects, 
  initialBlogs, 
  initialLeads, 
  initialTestimonials, 
  initialFaqs, 
  initialTeamMembers, 
  initialSiteSettings, 
  initialAdminUser,
  initialAdminUsers,
  initialSitePhotos 
} from '../data/seedData';

// Local storage persistent keys
const STORAGE_KEYS = {
  PROPERTIES: 'vdpd_properties_v1',
  PROJECTS: 'vdpd_projects_v1',
  BLOGS: 'vdpd_blogs_v1',
  LEADS: 'vdpd_leads_v1',
  TESTIMONIALS: 'vdpd_testimonials_v1',
  FAQS: 'vdpd_faqs_v1',
  TEAM: 'vdpd_team_v1',
  SETTINGS: 'vdpd_settings_v1',
  WISHLIST: 'vdpd_wishlist_v1',
  COMPARE: 'vdpd_compare_v1',
  RECENTLY_VIEWED: 'vdpd_recent_v1',
  AUTH_USER: 'vdpd_auth_user_v2',
  ADMIN_USERS: 'vdpd_admin_users_v2',
  PHOTOS: 'vdpd_photos_v2'
};

function getStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error loading key ${key}:`, e);
    return fallback;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error setting key ${key}:`, e);
  }
}

export class VDPDStore {
  private static listeners: Array<() => void> = [];

  public static subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private static notify() {
    this.listeners.forEach(l => l());
  }

  // --- Properties ---
  public static getProperties(): Property[] {
    return getStorage<Property[]>(STORAGE_KEYS.PROPERTIES, initialProperties);
  }

  public static getPropertyBySlug(slug: string): Property | undefined {
    return this.getProperties().find(p => p.slug === slug);
  }

  public static saveProperty(property: Property): void {
    const properties = this.getProperties();
    const index = properties.findIndex(p => p.id === property.id);
    if (index >= 0) {
      properties[index] = { ...property };
    } else {
      properties.unshift({ ...property });
    }
    setStorage(STORAGE_KEYS.PROPERTIES, properties);
    this.notify();
  }

  public static addProperty(propertyData: Partial<Property>): Property {
    const properties = this.getProperties();
    const newProp: Property = {
      id: 'prop-' + Date.now(),
      title: propertyData.title || 'New Property',
      slug: propertyData.slug || `property-${Date.now()}`,
      propertyType: propertyData.propertyType || 'Residential Plots',
      price: propertyData.price || 1500000,
      priceDisplay: propertyData.priceDisplay || '₹ 15 Lakh Onwards',
      area: propertyData.area || '150 Sq. Yds',
      location: propertyData.location || 'Vrindavan, Mathura',
      description: propertyData.description || '',
      featuredImage: propertyData.featuredImage || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      gallery: propertyData.gallery || [propertyData.featuredImage || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'],
      amenities: propertyData.amenities || ['Clear Freehold Title', '24/7 Security'],
      status: propertyData.status || 'Available',
      featured: propertyData.featured ?? true,
      reraApproved: propertyData.reraApproved ?? true,
      reraNumber: propertyData.reraNumber || 'UPRERA/2025/1102',
      viewsCount: 0,
      createdAt: new Date().toISOString().substring(0, 10),
      ...propertyData
    } as Property;
    properties.unshift(newProp);
    setStorage(STORAGE_KEYS.PROPERTIES, properties);
    this.notify();
    return newProp;
  }

  public static updateProperty(id: string, updates: Partial<Property>): void {
    const properties = this.getProperties();
    const index = properties.findIndex(p => p.id === id);
    if (index >= 0) {
      properties[index] = { ...properties[index], ...updates };
      setStorage(STORAGE_KEYS.PROPERTIES, properties);
      this.notify();
    }
  }

  public static deleteProperty(id: string): void {
    const properties = this.getProperties().filter(p => p.id !== id);
    setStorage(STORAGE_KEYS.PROPERTIES, properties);
    this.notify();
  }

  public static bulkDeleteProperties(ids: string[]): void {
    const properties = this.getProperties().filter(p => !ids.includes(p.id));
    setStorage(STORAGE_KEYS.PROPERTIES, properties);
    this.notify();
  }

  public static incrementViews(propertyId: string): void {
    const properties = this.getProperties();
    const prop = properties.find(p => p.id === propertyId);
    if (prop) {
      prop.viewsCount = (prop.viewsCount || 0) + 1;
      setStorage(STORAGE_KEYS.PROPERTIES, properties);
    }
  }

  // --- Projects ---
  public static getProjects(): Project[] {
    return getStorage<Project[]>(STORAGE_KEYS.PROJECTS, initialProjects);
  }

  public static getProjectBySlug(slug: string): Project | undefined {
    return this.getProjects().find(p => p.slug === slug);
  }

  public static saveProject(project: Project): void {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    if (index >= 0) {
      projects[index] = { ...project };
    } else {
      projects.unshift({ ...project });
    }
    setStorage(STORAGE_KEYS.PROJECTS, projects);
    this.notify();
  }

  public static deleteProject(id: string): void {
    const projects = this.getProjects().filter(p => p.id !== id);
    setStorage(STORAGE_KEYS.PROJECTS, projects);
    this.notify();
  }

  // --- Blogs ---
  public static getBlogs(): Blog[] {
    return getStorage<Blog[]>(STORAGE_KEYS.BLOGS, initialBlogs);
  }

  public static getBlogBySlug(slug: string): Blog | undefined {
    return this.getBlogs().find(b => b.slug === slug);
  }

  public static saveBlog(blog: Blog): void {
    const blogs = this.getBlogs();
    const index = blogs.findIndex(b => b.id === blog.id);
    if (index >= 0) {
      blogs[index] = { ...blog };
    } else {
      blogs.unshift({ ...blog });
    }
    setStorage(STORAGE_KEYS.BLOGS, blogs);
    this.notify();
  }

  public static updateBlog(id: string, updates: Partial<Blog>): Blog | undefined {
    const blogs = this.getBlogs();
    const index = blogs.findIndex(b => b.id === id);
    if (index >= 0) {
      blogs[index] = { ...blogs[index], ...updates };
      setStorage(STORAGE_KEYS.BLOGS, blogs);
      this.notify();
      return blogs[index];
    }
    return undefined;
  }

  public static addBlog(blogData: Partial<Blog>): Blog {
    const blogs = this.getBlogs();
    const newBlog: Blog = {
      id: 'blog-' + Date.now(),
      title: blogData.title || 'Untitled',
      slug: blogData.slug || `post-${Date.now()}`,
      category: blogData.category || 'Market Trends',
      author: blogData.author || 'VDPD Editorial',
      excerpt: blogData.excerpt || '',
      content: blogData.content || '',
      featuredImage: blogData.featuredImage || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
      readTime: blogData.readTime || '4 min read',
      createdAt: new Date().toISOString().substring(0, 10),
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      published: true,
      tags: blogData.tags || ['Vrindavan', 'Real Estate']
    };
    blogs.unshift(newBlog);
    setStorage(STORAGE_KEYS.BLOGS, blogs);
    this.notify();
    return newBlog;
  }

  public static deleteBlog(id: string): void {
    const blogs = this.getBlogs().filter(b => b.id !== id);
    setStorage(STORAGE_KEYS.BLOGS, blogs);
    this.notify();
  }

  // --- Leads / Inquiries ---
  public static getLeads(): Lead[] {
    return getStorage<Lead[]>(STORAGE_KEYS.LEADS, initialLeads);
  }

  public static addLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
    const leads = this.getLeads();
    const newLead: Lead = {
      ...leadData,
      id: 'lead-' + Date.now(),
      status: 'New',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    leads.unshift(newLead);
    setStorage(STORAGE_KEYS.LEADS, leads);
    this.notify();
    return newLead;
  }

  public static updateLeadStatus(id: string, status: Lead['status'], notes?: string): void {
    const leads = this.getLeads();
    const lead = leads.find(l => l.id === id);
    if (lead) {
      lead.status = status;
      if (notes !== undefined) lead.notes = notes;
      setStorage(STORAGE_KEYS.LEADS, leads);
      this.notify();
    }
  }

  public static deleteLead(id: string): void {
    const leads = this.getLeads().filter(l => l.id !== id);
    setStorage(STORAGE_KEYS.LEADS, leads);
    this.notify();
  }

  public static exportLeadsCSV(): string {
    const leads = this.getLeads();
    const headers = ['ID', 'Date', 'Full Name', 'Phone', 'Email', 'Property Interest', 'Status', 'Message'];
    const rows = leads.map(l => [
      l.id,
      l.createdAt,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${(l.propertyInterest || '').replace(/"/g, '""')}"`,
      l.status,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  // --- Testimonials ---
  public static getTestimonials(): Testimonial[] {
    return getStorage<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  }

  public static saveTestimonial(testimonial: Testimonial): void {
    const list = this.getTestimonials();
    const index = list.findIndex(t => t.id === testimonial.id);
    if (index >= 0) {
      list[index] = { ...testimonial };
    } else {
      list.unshift({ ...testimonial });
    }
    setStorage(STORAGE_KEYS.TESTIMONIALS, list);
    this.notify();
  }

  public static deleteTestimonial(id: string): void {
    const list = this.getTestimonials().filter(t => t.id !== id);
    setStorage(STORAGE_KEYS.TESTIMONIALS, list);
    this.notify();
  }

  // --- FAQs ---
  public static getFaqs(): FAQ[] {
    return getStorage<FAQ[]>(STORAGE_KEYS.FAQS, initialFaqs);
  }

  public static getFAQs(): FAQ[] {
    return this.getFaqs();
  }

  public static saveFaq(faq: FAQ): void {
    const list = this.getFaqs();
    const index = list.findIndex(f => f.id === faq.id);
    if (index >= 0) {
      list[index] = { ...faq };
    } else {
      list.push({ ...faq });
    }
    setStorage(STORAGE_KEYS.FAQS, list);
    this.notify();
  }

  public static deleteFaq(id: string): void {
    const list = this.getFaqs().filter(f => f.id !== id);
    setStorage(STORAGE_KEYS.FAQS, list);
    this.notify();
  }

  // --- Team ---
  public static getTeam(): TeamMember[] {
    return getStorage<TeamMember[]>(STORAGE_KEYS.TEAM, initialTeamMembers);
  }

  public static saveTeamMember(member: TeamMember): void {
    const list = this.getTeam();
    const index = list.findIndex(m => m.id === member.id);
    if (index >= 0) {
      list[index] = { ...member };
    } else {
      list.push({ ...member });
    }
    setStorage(STORAGE_KEYS.TEAM, list);
    this.notify();
  }

  public static deleteTeamMember(id: string): void {
    const list = this.getTeam().filter(m => m.id !== id);
    setStorage(STORAGE_KEYS.TEAM, list);
    this.notify();
  }

  // --- Settings ---
  public static getSettings(): SiteSettings {
    return getStorage<SiteSettings>(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  }

  public static saveSettings(settings: SiteSettings): void {
    setStorage(STORAGE_KEYS.SETTINGS, settings);
    this.notify();
  }

  // --- Wishlist ---
  public static getWishlist(): string[] {
    return getStorage<string[]>(STORAGE_KEYS.WISHLIST, []);
  }

  public static toggleWishlist(propertyId: string): boolean {
    const list = this.getWishlist();
    const exists = list.includes(propertyId);
    const updated = exists ? list.filter(id => id !== propertyId) : [...list, propertyId];
    setStorage(STORAGE_KEYS.WISHLIST, updated);
    this.notify();
    return !exists;
  }

  public static isWishlisted(propertyId: string): boolean {
    return this.getWishlist().includes(propertyId);
  }

  // --- Comparison (up to 3) ---
  public static getCompareList(): string[] {
    return getStorage<string[]>(STORAGE_KEYS.COMPARE, []);
  }

  public static toggleCompare(propertyId: string): { added: boolean; list: string[] } {
    const list = this.getCompareList();
    if (list.includes(propertyId)) {
      const updated = list.filter(id => id !== propertyId);
      setStorage(STORAGE_KEYS.COMPARE, updated);
      this.notify();
      return { added: false, list: updated };
    } else {
      if (list.length >= 3) {
        // cap at 3
        const updated = [...list.slice(1), propertyId];
        setStorage(STORAGE_KEYS.COMPARE, updated);
        this.notify();
        return { added: true, list: updated };
      }
      const updated = [...list, propertyId];
      setStorage(STORAGE_KEYS.COMPARE, updated);
      this.notify();
      return { added: true, list: updated };
    }
  }

  public static clearCompare(): void {
    setStorage(STORAGE_KEYS.COMPARE, []);
    this.notify();
  }

  // --- Recently Viewed ---
  public static getRecentlyViewed(): string[] {
    return getStorage<string[]>(STORAGE_KEYS.RECENTLY_VIEWED, []);
  }

  public static addRecentlyViewed(propertyId: string): void {
    let list = this.getRecentlyViewed();
    list = [propertyId, ...list.filter(id => id !== propertyId)].slice(0, 6);
    setStorage(STORAGE_KEYS.RECENTLY_VIEWED, list);
  }

  // --- Admin & Sub-User Management & Auth ---
  public static getAdminUsers(): AdminUser[] {
    return getStorage<AdminUser[]>(STORAGE_KEYS.ADMIN_USERS, initialAdminUsers);
  }

  public static getAdminUserById(id: string): AdminUser | undefined {
    return this.getAdminUsers().find(u => u.id === id);
  }

  public static saveAdminUser(user: AdminUser): void {
    const users = this.getAdminUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      users[index] = { ...user };
    } else {
      users.push({ ...user });
    }
    setStorage(STORAGE_KEYS.ADMIN_USERS, users);

    // If current logged-in user is modified, sync session
    const current = this.getCurrentAdmin();
    if (current && current.id === user.id) {
      setStorage(STORAGE_KEYS.AUTH_USER, user);
    }
    this.notify();
  }

  public static createSubAdminUser(
    userData: {
      name: string;
      email: string;
      password?: string;
      role: string;
      phone?: string;
      avatar?: string;
      status?: 'Active' | 'Inactive';
      permissions: AdminUser['permissions'];
    }
  ): AdminUser {
    const users = this.getAdminUsers();
    const existing = users.find(u => u.email.toLowerCase() === userData.email.trim().toLowerCase());
    if (existing) {
      throw new Error(`A user with email ${userData.email} already exists.`);
    }

    const newUser: AdminUser = {
      id: 'adm-sub-' + Date.now(),
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password || 'vdpd123',
      role: userData.role || 'Staff / Sub-Admin',
      isSuperAdmin: false,
      phone: userData.phone || '',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      status: userData.status || 'Active',
      createdAt: new Date().toISOString().substring(0, 10),
      lastLogin: 'Never',
      permissions: {
        ...userData.permissions,
        canManageUsers: false // Never allow sub-admin to manage users
      }
    };

    users.push(newUser);
    setStorage(STORAGE_KEYS.ADMIN_USERS, users);
    this.notify();
    return newUser;
  }

  public static deleteAdminUser(id: string): { success: boolean; error?: string } {
    const users = this.getAdminUsers();
    const target = users.find(u => u.id === id);
    if (!target) {
      return { success: false, error: 'User not found.' };
    }
    if (target.isSuperAdmin) {
      return { success: false, error: 'Cannot delete the Super Administrator account.' };
    }
    const filtered = users.filter(u => u.id !== id);
    setStorage(STORAGE_KEYS.ADMIN_USERS, filtered);
    this.notify();
    return { success: true };
  }

  public static changeAdminPassword(
    userId: string, 
    currentPass: string, 
    newPass: string
  ): { success: boolean; error?: string } {
    const users = this.getAdminUsers();
    const user = users.find(u => u.id === userId);
    if (!user) {
      return { success: false, error: 'User not found.' };
    }
    if (user.password !== currentPass) {
      return { success: false, error: 'Current password is incorrect.' };
    }
    if (!newPass || newPass.trim().length < 5) {
      return { success: false, error: 'New password must be at least 5 characters.' };
    }

    user.password = newPass.trim();
    setStorage(STORAGE_KEYS.ADMIN_USERS, users);

    // Sync session
    const current = this.getCurrentAdmin();
    if (current && current.id === userId) {
      current.password = newPass.trim();
      setStorage(STORAGE_KEYS.AUTH_USER, current);
    }
    this.notify();
    return { success: true };
  }

  public static updateAdminProfile(
    userId: string, 
    updates: Partial<Pick<AdminUser, 'name' | 'email' | 'phone' | 'avatar'>>
  ): { success: boolean; error?: string; user?: AdminUser } {
    const users = this.getAdminUsers();
    const user = users.find(u => u.id === userId);
    if (!user) {
      return { success: false, error: 'User not found.' };
    }

    if (updates.email && updates.email !== user.email) {
      const emailExists = users.some(u => u.id !== userId && u.email.toLowerCase() === updates.email!.trim().toLowerCase());
      if (emailExists) {
        return { success: false, error: 'Email is already in use by another user.' };
      }
      user.email = updates.email.trim().toLowerCase();
    }

    if (updates.name) user.name = updates.name.trim();
    if (updates.phone !== undefined) user.phone = updates.phone;
    if (updates.avatar) user.avatar = updates.avatar;

    setStorage(STORAGE_KEYS.ADMIN_USERS, users);

    // Sync session
    const current = this.getCurrentAdmin();
    if (current && current.id === userId) {
      const updatedCurrent = { ...current, ...updates };
      setStorage(STORAGE_KEYS.AUTH_USER, updatedCurrent);
    }
    this.notify();
    return { success: true, user };
  }

  public static getCurrentAdmin(): AdminUser | null {
    return getStorage<AdminUser | null>(STORAGE_KEYS.AUTH_USER, null);
  }

  public static loginAdmin(email: string, pass: string): { success: boolean; user?: AdminUser; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    const users = this.getAdminUsers();
    const found = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === pass);

    if (!found) {
      return { 
        success: false, 
        error: 'Invalid email or password. Please verify your credentials or contact the Super Admin.' 
      };
    }

    if (found.status === 'Inactive') {
      return { 
        success: false, 
        error: 'Your account has been deactivated. Please contact the Super Administrator.' 
      };
    }

    // Update last login
    found.lastLogin = new Date().toLocaleString();
    setStorage(STORAGE_KEYS.ADMIN_USERS, users);
    setStorage(STORAGE_KEYS.AUTH_USER, found);
    this.notify();
    return { success: true, user: found };
  }

  public static authenticate(email: string, pass: string): AdminUser | null {
    const res = this.loginAdmin(email, pass);
    return res.success ? (res.user || null) : null;
  }

  public static logoutAdmin(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    this.notify();
  }

  public static logout(): void {
    this.logoutAdmin();
  }

  // --- Site Photos Dynamic Management ---
  public static getSitePhotos(): SitePhotoItem[] {
    return getStorage<SitePhotoItem[]>(STORAGE_KEYS.PHOTOS, initialSitePhotos);
  }

  public static getSitePhotosMap(): Record<string, string> {
    const photos = this.getSitePhotos();
    const map: Record<string, string> = {};
    photos.forEach(p => {
      map[p.id] = p.url;
    });
    return map;
  }

  public static updateSitePhoto(photoId: string, newUrl: string): void {
    const photos = this.getSitePhotos();
    const index = photos.findIndex(p => p.id === photoId);
    if (index >= 0) {
      photos[index] = { ...photos[index], url: newUrl };
      setStorage(STORAGE_KEYS.PHOTOS, photos);
      this.notify();
    }
  }

  public static resetSitePhotos(): void {
    setStorage(STORAGE_KEYS.PHOTOS, initialSitePhotos);
    this.notify();
  }

  // Reset to original factory seeds
  public static resetAllData(): void {
    setStorage(STORAGE_KEYS.PROPERTIES, initialProperties);
    setStorage(STORAGE_KEYS.PROJECTS, initialProjects);
    setStorage(STORAGE_KEYS.BLOGS, initialBlogs);
    setStorage(STORAGE_KEYS.LEADS, initialLeads);
    setStorage(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
    setStorage(STORAGE_KEYS.FAQS, initialFaqs);
    setStorage(STORAGE_KEYS.TEAM, initialTeamMembers);
    setStorage(STORAGE_KEYS.SETTINGS, initialSiteSettings);
    setStorage(STORAGE_KEYS.PHOTOS, initialSitePhotos);
    setStorage(STORAGE_KEYS.ADMIN_USERS, initialAdminUsers);
    this.notify();
  }
}
