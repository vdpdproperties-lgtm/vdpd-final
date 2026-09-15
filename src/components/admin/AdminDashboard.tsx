import React, { useState } from 'react';
import { 
  AdminUser, 
  Property, 
  Project, 
  BlogPost, 
  Lead, 
  Testimonial, 
  FAQ, 
  TeamMember, 
  SiteSettings,
  SitePhotoItem
} from '../../types';
import { VDPDStore } from '../../services/store';
import { vrindavanPhotoPresets } from '../../data/seedData';
import { 
  LayoutDashboard, 
  Home, 
  Building, 
  Users, 
  FileText, 
  MessageSquare, 
  HelpCircle, 
  Settings as SettingsIcon, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Check, 
  X, 
  ExternalLink,
  Phone,
  Mail,
  Shield,
  Download,
  IndianRupee,
  Maximize2,
  Calendar,
  Save,
  Image as ImageIcon,
  Upload,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  Layers,
  Globe,
  MapPin,
  FolderPlus
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { AdminProfileModal } from './AdminProfileModal';
import { AdminUsersTab } from './AdminUsersTab';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { AdminPhotoField } from './AdminPhotoField';

interface AdminDashboardProps {
  adminUser: AdminUser | null;
  onLogout: () => void;
  onViewLiveSite: () => void;
  properties: Property[];
  projects: Project[];
  blogs: BlogPost[];
  leads: Lead[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  team: TeamMember[];
  settings: SiteSettings;
  onRefreshData: () => void;
}

type AdminTab = 'overview' | 'properties' | 'projects' | 'leads' | 'blogs' | 'photos' | 'faqs' | 'settings' | 'users';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  onLogout,
  onViewLiveSite,
  properties,
  projects,
  blogs,
  leads,
  testimonials,
  faqs,
  team,
  settings,
  onRefreshData,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Permission check helper
  const canAccess = (permKey: keyof AdminUser['permissions']): boolean => {
    if (!adminUser) return false;
    if (adminUser.isSuperAdmin) return true;
    return Boolean(adminUser.permissions?.[permKey]);
  };

  // Property Modal State
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [propertyFormData, setPropertyFormData] = useState<Partial<Property>>({
    title: '',
    slug: '',
    propertyType: 'Residential Plots',
    price: 2000000,
    priceDisplay: '₹ 20 Lakh Onwards',
    area: '150 - 300 Sq. Yds',
    location: 'Vrindavan, Mathura',
    description: '',
    featuredImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    amenities: ['Gated Township', '24/7 Security', 'Wide Internal Roads', 'Temple Garden'],
    status: 'Available',
    featured: true,
    reraApproved: true,
    reraNumber: 'UPRERA/2025/1102'
  });

  // Blog Modal State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogFormData, setBlogFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    category: 'Market Trends',
    author: 'VDPD Research',
    excerpt: '',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    readTime: '5 min read'
  });

  // Project / Township Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectFormData, setProjectFormData] = useState<Partial<Project>>({
    name: '',
    slug: '',
    tagline: '',
    description: '',
    location: 'Chhatikara Road, Vrindavan',
    status: 'Under Development',
    completionDate: 'December 2026',
    totalUnits: '420 Plots & 50 Villas',
    featuredImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    highlights: ['45 Acres Land Bank', 'Integrated Temple & Satsang Hall', 'Wide 40ft/50ft Roads', 'Freehold Title'],
    amenities: ['Gated Security', 'Underground Utilities', 'Landscaped Parks', 'Temple Complex']
  });

  // Safe In-App Delete Confirmation State
  const [confirmDeleteTarget, setConfirmDeleteTarget] = useState<{
    type: 'property' | 'project' | 'lead' | 'blog' | 'reset-single-photo' | 'reset-all-photos';
    id: string;
    name: string;
    itemType?: string;
    description?: string;
  } | null>(null);

  // Photos State
  const [sitePhotos, setSitePhotos] = useState<SitePhotoItem[]>(() => VDPDStore.getSitePhotos());
  const [photoCategoryFilter, setPhotoCategoryFilter] = useState<string>('ALL');
  const [photoSearchQuery, setPhotoSearchQuery] = useState<string>('');
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<SitePhotoItem | null>(null);
  const [photoNewInputUrl, setPhotoNewInputUrl] = useState<string>('');
  const [photoModalTab, setPhotoModalTab] = useState<'presets' | 'upload' | 'url'>('presets');
  const [photoToastMessage, setPhotoToastMessage] = useState<string | null>(null);

  // Settings form state with page & feature visibility fallbacks
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(() => ({
    ...settings,
    pageVisibility: {
      properties: true,
      projects: true,
      about: true,
      whyVdpd: true,
      contact: true,
      blog: true,
      ...(settings.pageVisibility || {})
    },
    featureVisibility: {
      wishlist: true,
      compare: true,
      emiCalculator: true,
      whatsappFloat: true,
      enquiryModal: true,
      investmentMetrics: true,
      ...(settings.featureVisibility || {})
    }
  }));
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Sync settings when updated from store
  React.useEffect(() => {
    setSettingsForm({
      ...settings,
      pageVisibility: {
        properties: true,
        projects: true,
        about: true,
        whyVdpd: true,
        contact: true,
        blog: true,
        ...(settings.pageVisibility || {})
      },
      featureVisibility: {
        wishlist: true,
        compare: true,
        emiCalculator: true,
        whatsappFloat: true,
        enquiryModal: true,
        investmentMetrics: true,
        ...(settings.featureVisibility || {})
      }
    });
  }, [settings]);

  // Tab permission guard for sub-admins
  React.useEffect(() => {
    if (!adminUser) return;
    if (activeTab === 'properties' && !canAccess('canManageProperties')) setActiveTab('overview');
    if (activeTab === 'projects' && !canAccess('canManageProjects')) setActiveTab('overview');
    if (activeTab === 'leads' && !canAccess('canManageLeads')) setActiveTab('overview');
    if (activeTab === 'blogs' && !canAccess('canManageBlogs')) setActiveTab('overview');
    if (activeTab === 'photos' && !canAccess('canManagePhotos')) setActiveTab('overview');
    if (activeTab === 'faqs' && !canAccess('canManageFaqs')) setActiveTab('overview');
    if (activeTab === 'settings' && !canAccess('canManageSettings')) setActiveTab('overview');
    if (activeTab === 'users' && (!adminUser.isSuperAdmin && !canAccess('canManageUsers'))) setActiveTab('overview');
  }, [activeTab, adminUser]);

  // Lead filter
  const [leadStatusFilter, setLeadStatusFilter] = useState('ALL');

  // Property handler
  const handleOpenNewProperty = () => {
    setEditingProperty(null);
    setPropertyFormData({
      title: '',
      slug: `property-${Date.now()}`,
      propertyType: 'Residential Plots',
      price: 1800000,
      priceDisplay: '₹ 18 Lakh Onwards',
      area: '100 - 300 Sq. Yds',
      location: 'Vrindavan, Mathura',
      description: 'Well-planned plots in a serene Vrindavan neighborhood with clear freehold title and rapid appreciation.',
      featuredImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      amenities: ['24/7 Security', 'Wide Roads', 'Clear Title', 'Electricity & Water'],
      status: 'Available',
      featured: true,
      reraApproved: true,
      reraNumber: 'UPRERA/2025/1102'
    });
    setIsPropertyModalOpen(true);
  };

  const handleEditProperty = (prop: Property) => {
    setEditingProperty(prop);
    setPropertyFormData(prop);
    setIsPropertyModalOpen(true);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProperty) {
      VDPDStore.updateProperty(editingProperty.id, propertyFormData);
    } else {
      VDPDStore.addProperty(propertyFormData as any);
    }
    setIsPropertyModalOpen(false);
    onRefreshData();
  };

  // Safe In-App Delete Handler
  const handleConfirmDelete = () => {
    if (!confirmDeleteTarget) return;
    const { type, id, name } = confirmDeleteTarget;

    if (type === 'property') {
      VDPDStore.deleteProperty(id);
      setPhotoToastMessage(`Property "${name}" deleted.`);
    } else if (type === 'lead') {
      VDPDStore.deleteLead(id);
      setPhotoToastMessage(`Inquiry record "${name}" deleted.`);
    } else if (type === 'blog') {
      VDPDStore.deleteBlog(id);
      setPhotoToastMessage(`Article "${name}" deleted.`);
    } else if (type === 'project') {
      VDPDStore.deleteProject(id);
      setPhotoToastMessage(`Township project "${name}" deleted.`);
    } else if (type === 'reset-single-photo') {
      const defaultItem = VDPDStore.getSitePhotos().find(p => p.id === id);
      if (defaultItem) {
        VDPDStore.updateSitePhoto(id, defaultItem.defaultUrl);
        setSitePhotos(VDPDStore.getSitePhotos());
        setPhotoToastMessage(`Photo for "${name}" reset to Vrindavan default.`);
      }
    } else if (type === 'reset-all-photos') {
      VDPDStore.resetSitePhotos();
      setSitePhotos(VDPDStore.getSitePhotos());
      setPhotoToastMessage('All website photos have been reset to Vrindavan defaults.');
    }

    onRefreshData();
    setConfirmDeleteTarget(null);
    setTimeout(() => setPhotoToastMessage(null), 3000);
  };

  const handleDeleteProperty = (prop: Property) => {
    setConfirmDeleteTarget({
      type: 'property',
      id: prop.id,
      name: prop.title,
      itemType: 'Property Listing',
      description: `Are you sure you want to delete the property listing "${prop.title}"? It will be removed from the public website immediately.`
    });
  };

  // Lead Status Handler
  const handleUpdateLeadStatus = (id: string, status: Lead['status']) => {
    VDPDStore.updateLeadStatus(id, status);
    onRefreshData();
  };

  const handleDeleteLead = (lead: Lead) => {
    setConfirmDeleteTarget({
      type: 'lead',
      id: lead.id,
      name: `${lead.name} (${lead.phone})`,
      itemType: 'Lead / Customer Inquiry',
      description: `Are you sure you want to permanently delete the inquiry from "${lead.name}" for "${lead.propertyInterest}"?`
    });
  };

  // Project / Township Handlers
  const handleOpenNewProject = () => {
    setEditingProject(null);
    setProjectFormData({
      name: '',
      slug: `township-${Date.now()}`,
      tagline: 'Master-Planned Divine Township in Vrindavan',
      description: 'Well-planned gated community featuring residential plots, temple complexes, wide avenues, and modern infrastructure.',
      location: 'Chhatikara Road, Vrindavan',
      status: 'Under Development',
      completionDate: 'December 2026',
      totalUnits: '350 Units',
      featuredImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      gallery: [],
      highlights: ['45 Acres Land Bank', 'Temple & Satsang Hall', 'Wide 40ft/50ft Roads', 'Freehold Title'],
      amenities: ['24/7 Gated Security', 'Underground Utilities', 'Landscaped Parks', 'Temple Complex']
    });
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (proj: Project) => {
    setEditingProject(proj);
    setProjectFormData({
      name: proj.name || (proj as any).title || '',
      slug: proj.slug || `project-${Date.now()}`,
      tagline: proj.tagline || '',
      description: proj.description || '',
      location: proj.location || 'Vrindavan, Mathura',
      status: proj.status || 'Under Development',
      completionDate: proj.completionDate || '2026',
      totalUnits: proj.totalUnits || (proj as any).totalPlots || '300 Units',
      featuredImage: proj.featuredImage || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      gallery: proj.gallery || [],
      highlights: proj.highlights || ['Freehold Registry', 'Temple Inside Campus', 'Wide Roads', 'Rapid Appreciation'],
      amenities: proj.amenities || ['Gated Security', 'Landscaped Parks', 'Underground Utilities', 'Street Lighting']
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Project = {
      id: editingProject ? editingProject.id : `proj-${Date.now()}`,
      name: projectFormData.name?.trim() || 'Untitled Project',
      slug: projectFormData.slug?.trim() || `proj-${Date.now()}`,
      tagline: projectFormData.tagline?.trim() || '',
      description: projectFormData.description?.trim() || '',
      location: projectFormData.location?.trim() || 'Vrindavan, Mathura',
      status: (projectFormData.status as any) || 'Under Development',
      completionDate: projectFormData.completionDate?.trim() || 'December 2026',
      totalUnits: projectFormData.totalUnits?.trim() || '300 Units',
      featuredImage: projectFormData.featuredImage || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      gallery: projectFormData.gallery && projectFormData.gallery.length > 0 ? projectFormData.gallery : [projectFormData.featuredImage || ''],
      highlights: Array.isArray(projectFormData.highlights) ? projectFormData.highlights : [],
      amenities: Array.isArray(projectFormData.amenities) ? projectFormData.amenities : []
    };

    VDPDStore.saveProject(payload);
    setIsProjectModalOpen(false);
    setEditingProject(null);
    onRefreshData();
    setPhotoToastMessage(`Township project "${payload.name}" saved successfully.`);
    setTimeout(() => setPhotoToastMessage(null), 3000);
  };

  const handleDeleteProject = (proj: Project) => {
    const projName = proj.name || (proj as any).title;
    setConfirmDeleteTarget({
      type: 'project',
      id: proj.id,
      name: projName,
      itemType: 'Township / Project',
      description: `Are you sure you want to permanently delete the master township "${projName}"?`
    });
  };

  // Blog Handlers
  const handleOpenNewBlog = () => {
    setEditingBlogId(null);
    setBlogFormData({
      title: '',
      slug: `article-${Date.now()}`,
      category: 'Investment Guide',
      author: 'VDPD Editorial',
      excerpt: '',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
      readTime: '4 min read'
    });
    setIsBlogModalOpen(true);
  };

  const handleOpenEditBlog = (blog: BlogPost) => {
    setEditingBlogId(blog.id);
    setBlogFormData({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      author: blog.author,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage,
      readTime: blog.readTime || '4 min read'
    });
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: blogFormData.title || 'Untitled Post',
      slug: blogFormData.slug || `post-${Date.now()}`,
      category: blogFormData.category || 'Market Trends',
      author: blogFormData.author || 'VDPD Advisory',
      excerpt: blogFormData.excerpt || '',
      content: blogFormData.content || '',
      featuredImage: blogFormData.featuredImage || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
      readTime: blogFormData.readTime || '4 min read'
    };

    if (editingBlogId) {
      VDPDStore.updateBlog(editingBlogId, payload);
    } else {
      VDPDStore.addBlog(payload);
    }
    setIsBlogModalOpen(false);
    setEditingBlogId(null);
    onRefreshData();
    setPhotoToastMessage(`Blog article "${payload.title}" saved successfully.`);
    setTimeout(() => setPhotoToastMessage(null), 3000);
  };

  const handleDeleteBlog = (blog: BlogPost) => {
    setConfirmDeleteTarget({
      type: 'blog',
      id: blog.id,
      name: blog.title,
      itemType: 'Blog Article',
      description: `Are you sure you want to permanently delete "${blog.title}"?`
    });
  };

  // Photo Management Handlers
  const handleOpenEditPhoto = (photo: SitePhotoItem) => {
    setEditingPhoto(photo);
    setPhotoNewInputUrl(photo.url);
    setPhotoModalTab('presets');
    setIsPhotoModalOpen(true);
  };

  const handleSavePhoto = (customUrl?: string) => {
    if (!editingPhoto) return;
    const urlToSave = (customUrl !== undefined ? customUrl : photoNewInputUrl || '').trim();
    if (!urlToSave) {
      alert('Please enter or select a valid image URL.');
      return;
    }

    VDPDStore.updateSitePhoto(editingPhoto.id, urlToSave);
    const updated = VDPDStore.getSitePhotos();
    setSitePhotos(updated);
    setIsPhotoModalOpen(false);
    setEditingPhoto(null);
    onRefreshData();

    setPhotoToastMessage(`Updated photo for "${editingPhoto.label}"`);
    setTimeout(() => setPhotoToastMessage(null), 3000);
  };

  const handleResetSinglePhoto = (id: string, label: string) => {
    setConfirmDeleteTarget({
      type: 'reset-single-photo',
      id,
      name: label,
      itemType: 'Website Photo',
      description: `Are you sure you want to restore "${label}" to the authentic default Vrindavan photography?`
    });
  };

  const handleResetAllPhotos = () => {
    setConfirmDeleteTarget({
      type: 'reset-all-photos',
      id: 'all',
      name: 'All Website Photos',
      itemType: 'Website Imagery',
      description: 'Are you sure you want to reset ALL custom website photos back to default Vrindavan images? This will overwrite your customized URLs.'
    });
  };

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoNewInputUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    VDPDStore.saveSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
    onRefreshData();
  };

  // Export Leads to CSV
  const handleExportLeads = () => {
    const csvRows = [
      ['Date', 'Name', 'Phone', 'Email', 'Property Interest', 'Status', 'Message'],
      ...leads.map(l => [
        l.createdAt,
        `"${l.name}"`,
        `"${l.phone}"`,
        `"${l.email}"`,
        `"${l.propertyInterest}"`,
        `"${l.status}"`,
        `"${(l.message || '').replace(/"/g, '""')}"`
      ])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VDPD_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(l => {
    if (leadStatusFilter === 'ALL') return true;
    return l.status === leadStatusFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Admin Top Navbar */}
      <header className="bg-[#16382E] text-white px-4 sm:px-6 py-3.5 border-b border-[#B68A3C]/30 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-4">
          <Logo variant="light" size="sm" />
          <div className="hidden sm:block border-l border-white/20 pl-3">
            <span className="text-[11px] uppercase tracking-wider text-[#B68A3C] font-semibold block">
              Management Portal
            </span>
            <span className="text-xs text-white/80 font-medium">
              Vrindavan Dham Property & Developers
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onViewLiveSite}
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Public Website</span>
          </button>

          {/* Admin Profile & Password Edit Button */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="text-xs bg-[#B68A3C]/20 hover:bg-[#B68A3C]/40 border border-[#B68A3C]/40 text-[#E5C378] hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Edit Admin Name & Change Password"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Edit Profile & Password</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-white/20">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="w-8 h-8 rounded-full bg-[#B68A3C] text-white flex items-center justify-center text-xs font-bold hover:ring-2 hover:ring-[#B68A3C]/50 transition-all cursor-pointer"
              title="Click to edit profile"
            >
              {adminUser?.name?.charAt(0) || 'A'}
            </button>
            <div className="hidden lg:block text-left text-xs cursor-pointer" onClick={() => setIsProfileModalOpen(true)}>
              <p className="font-semibold text-white leading-tight hover:underline flex items-center gap-1">
                {adminUser?.name || 'Administrator'}
              </p>
              <p className="text-[10px] text-[#B68A3C] font-semibold">
                {adminUser?.isSuperAdmin ? '✦ Super Administrator' : (adminUser?.role || 'Staff Sub-Admin')}
              </p>
            </div>
            <button
              onClick={onLogout}
              className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors ml-1 cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Admin Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-4 space-y-1.5 shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-3 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#16382E] text-white shadow-xs'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#B68A3C]" />
            <span>Dashboard Overview</span>
          </button>

          {canAccess('canManageProperties') && (
            <button
              onClick={() => setActiveTab('properties')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'properties'
                  ? 'bg-[#16382E] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4 text-[#B68A3C]" />
                <span>Properties</span>
              </div>
              <span className="text-[10px] bg-gray-200/80 px-2 py-0.5 rounded-full text-gray-700 font-bold">
                {properties.length}
              </span>
            </button>
          )}

          {canAccess('canManageProjects') && (
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-[#16382E] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-[#B68A3C]" />
                <span>Projects & Townships</span>
              </div>
              <span className="text-[10px] bg-gray-200/80 px-2 py-0.5 rounded-full text-gray-700 font-bold">
                {projects.length}
              </span>
            </button>
          )}

          {canAccess('canManageLeads') && (
            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-[#16382E] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#B68A3C]" />
                <span>Leads & Inquiries</span>
              </div>
              <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
                {leads.filter(l => l.status === 'NEW').length} new
              </span>
            </button>
          )}

          {canAccess('canManageBlogs') && (
            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'blogs'
                  ? 'bg-[#16382E] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#B68A3C]" />
                <span>Blog Articles</span>
              </div>
              <span className="text-[10px] bg-gray-200/80 px-2 py-0.5 rounded-full text-gray-700 font-bold">
                {blogs.length}
              </span>
            </button>
          )}

          {canAccess('canManagePhotos') && (
            <button
              onClick={() => setActiveTab('photos')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'photos'
                  ? 'bg-[#16382E] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <ImageIcon className="w-4 h-4 text-[#B68A3C]" />
                <span>Website Photos</span>
              </div>
              <span className="text-[10px] bg-[#B68A3C]/20 text-[#16382E] px-2 py-0.5 rounded-full font-bold">
                {sitePhotos.length}
              </span>
            </button>
          )}

          {/* Sub-User / Staff Management Tab (Super Admin only or canManageUsers) */}
          {(adminUser?.isSuperAdmin || canAccess('canManageUsers')) && (
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-[#16382E] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-[#B68A3C]" />
                <span>Staff & Sub-Users</span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                RBAC
              </span>
            </button>
          )}

          {canAccess('canManageSettings') && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-3 transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#16382E] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <SettingsIcon className="w-4 h-4 text-[#B68A3C]" />
              <span>Site Settings</span>
            </button>
          )}
        </aside>

        {/* Dynamic Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#16382E]">
                  Platform Executive Summary
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Real-time database metrics for Vrindavan Dham Property & Developers.
                </p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Total Properties</span>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-3xl font-bold text-[#16382E]">{properties.length}</span>
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Home className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-600 mt-2 block font-medium">
                    100% Active in Database
                  </span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Active Inquiries</span>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-3xl font-bold text-[#16382E]">{leads.length}</span>
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-[11px] text-amber-700 mt-2 block font-medium">
                    {leads.filter(l => l.status === 'NEW').length} awaiting consultation
                  </span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Master Townships</span>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-3xl font-bold text-[#16382E]">{projects.length}</span>
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                      <Building className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-[11px] text-blue-600 mt-2 block font-medium">
                    RERA & Freehold Compliant
                  </span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Published Articles</span>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-3xl font-bold text-[#16382E]">{blogs.length}</span>
                    <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                  </div>
                  <span className="text-[11px] text-purple-600 mt-2 block font-medium">
                    SEO & Braj Insights
                  </span>
                </div>
              </div>

              {/* Recent Leads Preview */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#16382E]">
                      Recent Customer Inquiries
                    </h3>
                    <p className="text-xs text-gray-500">
                      Direct leads submitted via property consultation forms.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-semibold text-[#B68A3C] hover:underline"
                  >
                    View All Leads →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                      <tr>
                        <th className="p-3">Client</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Interested In</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {leads.slice(0, 5).map(lead => (
                        <tr key={lead.id} className="hover:bg-gray-50/70">
                          <td className="p-3 font-semibold text-gray-800">{lead.name}</td>
                          <td className="p-3 text-gray-600">{lead.phone}</td>
                          <td className="p-3 text-gray-800">{lead.propertyInterest}</td>
                          <td className="p-3 text-gray-400">{lead.createdAt}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              lead.status === 'NEW' ? 'bg-red-100 text-red-700' :
                              lead.status === 'CONTACTED' ? 'bg-amber-100 text-amber-800' :
                              lead.status === 'SITE_VISIT_SCHEDULED' ? 'bg-blue-100 text-blue-800' :
                              'bg-emerald-100 text-emerald-800'
                            }`}>
                              {lead.status.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hare Krishna ${lead.name}! This is VDPD regarding your inquiry for ${lead.propertyInterest}.`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-600 hover:text-emerald-800 font-semibold inline-flex items-center gap-1"
                            >
                              WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROPERTIES MANAGEMENT */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#16382E]">
                    Properties Catalog ({properties.length})
                  </h2>
                  <p className="text-xs text-gray-500">
                    Add, edit, or delete plots, villas, and investment land.
                  </p>
                </div>
                <button
                  onClick={handleOpenNewProperty}
                  id="admin-add-property-btn"
                  className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Property</span>
                </button>
              </div>

              {/* Table of Properties */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                      <tr>
                        <th className="p-3 w-16">Preview</th>
                        <th className="p-3">Title & Location</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Area</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {properties.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50/70">
                          <td className="p-3">
                            <img
                              src={p.featuredImage}
                              alt={p.title}
                              className="w-12 h-10 object-cover rounded"
                              referrerPolicy="no-referrer"
                            />
                          </td>
                          <td className="p-3">
                            <p className="font-semibold text-gray-900 text-sm">{p.title}</p>
                            <p className="text-gray-400 text-[11px]">{p.location}</p>
                          </td>
                          <td className="p-3 text-gray-700">{p.propertyType}</td>
                          <td className="p-3 font-bold text-[#16382E]">{p.priceDisplay}</td>
                          <td className="p-3 text-gray-700">{p.area}</td>
                          <td className="p-3">
                            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                              {p.status}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => handleEditProperty(p)}
                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                              title="Edit Property"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProperty(p)}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 cursor-pointer"
                              title="Delete Property"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS & TOWNSHIPS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#16382E]">
                    Projects & Gated Townships ({projects.length})
                  </h2>
                  <p className="text-xs text-gray-500">
                    Master developments across Vrindavan, Mathura and expressway corridors.
                  </p>
                </div>
                <button
                  onClick={handleOpenNewProject}
                  className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Township / Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(proj => {
                  const projName = proj.name || (proj as any).title || 'Untitled Township';
                  const totalUnits = proj.totalUnits || (proj as any).totalPlots || '300 Units';
                  return (
                    <div key={proj.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between gap-4 hover:border-gray-300 transition-all">
                      <div className="flex gap-4">
                        <img
                          src={proj.featuredImage || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'}
                          alt={projName}
                          className="w-32 h-28 object-cover rounded-xl shrink-0 border border-gray-100"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-[#B68A3C] bg-amber-50 px-2 py-0.5 rounded-full uppercase border border-amber-200">
                              {proj.status}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-base text-[#16382E] truncate" title={projName}>
                            {projName}
                          </h4>
                          <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                            <span>{proj.location}</span>
                          </p>
                          <p className="text-xs text-gray-700 mt-1 flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-gray-400 shrink-0" />
                            <span>{totalUnits} • Ready by {proj.completionDate}</span>
                          </p>
                          {proj.tagline && (
                            <p className="text-[11px] text-gray-500 italic mt-1 truncate">
                              "{proj.tagline}"
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Highlights Badges */}
                      {proj.highlights && proj.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-100">
                          {proj.highlights.slice(0, 3).map((h, idx) => (
                            <span key={idx} className="text-[10px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-200">
                              {h}
                            </span>
                          ))}
                          {proj.highlights.length > 3 && (
                            <span className="text-[10px] bg-gray-50 text-gray-400 px-1.5 py-0.5 rounded">
                              +{proj.highlights.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Project Action Buttons */}
                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 font-mono">
                          ID: {proj.id}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditProject(proj)}
                            className="px-3 py-1.5 text-xs font-semibold text-[#16382E] bg-gray-50 hover:bg-[#B68A3C] hover:text-white border border-gray-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                            title="Edit Project / Township Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Township</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj)}
                            className="px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            title="Delete Project / Township"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: LEADS & INQUIRIES */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#16382E]">
                    Customer Inquiries & Leads ({leads.length})
                  </h2>
                  <p className="text-xs text-gray-500">
                    Manage client leads, schedule site tours, and record deal conversions.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status filter */}
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 font-medium"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="NEW">New Inquiries</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="SITE_VISIT_SCHEDULED">Site Visit Scheduled</option>
                    <option value="CONVERTED">Converted / Closed</option>
                  </select>

                  <button
                    onClick={handleExportLeads}
                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                      <tr>
                        <th className="p-3">Client Details</th>
                        <th className="p-3">Interest / Property</th>
                        <th className="p-3">Message / Note</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Update Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredLeads.map(lead => (
                        <tr key={lead.id} className="hover:bg-gray-50/70">
                          <td className="p-3">
                            <p className="font-bold text-gray-900 text-sm">{lead.name}</p>
                            <p className="text-gray-600">{lead.phone}</p>
                            {lead.email && <p className="text-gray-400 text-[11px]">{lead.email}</p>}
                          </td>
                          <td className="p-3">
                            <span className="font-medium text-gray-800">{lead.propertyInterest}</span>
                          </td>
                          <td className="p-3 text-gray-600 max-w-xs">
                            <p className="line-clamp-2">{lead.message || 'No additional note'}</p>
                          </td>
                          <td className="p-3 text-gray-400 whitespace-nowrap">{lead.createdAt}</td>
                          <td className="p-3">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                              className={`text-[11px] font-bold px-2 py-1 rounded border ${
                                lead.status === 'NEW' ? 'bg-red-50 text-red-700 border-red-200' :
                                lead.status === 'CONTACTED' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                                lead.status === 'SITE_VISIT_SCHEDULED' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                                'bg-emerald-50 text-emerald-800 border-emerald-200'
                              }`}
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="SITE_VISIT_SCHEDULED">SITE VISIT SCHEDULED</option>
                              <option value="CONVERTED">CONVERTED</option>
                            </select>
                          </td>
                          <td className="p-3 text-right space-x-2 whitespace-nowrap">
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hare Krishna ${lead.name}! This is Vrindavan Dham Property & Developers (VDPD). How can we assist with ${lead.propertyInterest}?`
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-emerald-600 text-white px-2.5 py-1 rounded text-[11px] font-semibold hover:bg-emerald-700 inline-block"
                            >
                              WhatsApp
                            </a>
                            <button
                              onClick={() => handleDeleteLead(lead)}
                              className="text-gray-400 hover:text-red-600 p-1 cursor-pointer hover:bg-red-50 rounded"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BLOGS */}
          {activeTab === 'blogs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#16382E]">
                    Blog & Articles ({blogs.length})
                  </h2>
                  <p className="text-xs text-gray-500">
                    Publish editorial guides, market forecasts, and Vrindavan buyer intelligence.
                  </p>
                </div>
                <button
                  onClick={handleOpenNewBlog}
                  className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Article</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(b => (
                  <div key={b.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                      <div className="relative h-40 overflow-hidden bg-gray-100">
                        <img 
                          src={b.featuredImage} 
                          alt={b.title} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer" 
                        />
                        <span className="absolute top-2.5 left-2.5 bg-[#16382E]/90 text-[#E5C378] text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                          {b.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-serif font-bold text-base text-[#16382E] line-clamp-1 hover:text-[#B68A3C] transition-colors">
                          {b.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {b.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 pt-1">
                          <span>By {b.author}</span>
                          <span>•</span>
                          <span>{b.readTime || '4 min read'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs bg-gray-50/50">
                      <span className="text-gray-500 font-medium text-[11px]">{b.publishedAt}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditBlog(b)}
                          className="px-2.5 py-1 text-xs font-semibold text-[#16382E] bg-white border border-[#B68A3C]/30 hover:bg-[#B68A3C] hover:text-white rounded-md flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                          title="Edit Article"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(b)}
                          className="text-gray-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PHOTOS MANAGER (Dynamic Global Website Photography) */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              {/* Notification Toast */}
              {photoToastMessage && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center justify-between shadow-xs animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{photoToastMessage}</span>
                  </div>
                  <button 
                    onClick={() => setPhotoToastMessage(null)}
                    className="text-emerald-700 hover:text-emerald-950 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#16382E] flex items-center gap-2">
                    <span>Website Photos & Visuals</span>
                    <span className="text-xs bg-[#B68A3C]/15 text-[#B68A3C] font-semibold px-2.5 py-0.5 rounded-full">
                      {sitePhotos.length} Total Slots
                    </span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 max-w-2xl">
                    Change every photo across the public website dynamically. Select curated authentic Vrindavan temples and ghats, upload your own images, or provide custom image links.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetAllPhotos}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Reset all photos to default Vrindavan images"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset All to Defaults</span>
                  </button>
                </div>
              </div>

              {/* Search & Category Filter Toolbar */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-3">
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                    {[
                      { id: 'ALL', label: 'All Photos' },
                      { id: 'banners', label: 'Top Banners & Headers' },
                      { id: 'home', label: 'Home Page' },
                      { id: 'about', label: 'About Us' },
                      { id: 'projects', label: 'Projects' },
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setPhotoCategoryFilter(cat.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                          photoCategoryFilter === cat.id
                            ? 'bg-[#16382E] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative min-w-[240px]">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by label or section..."
                      value={photoSearchQuery}
                      onChange={(e) => setPhotoSearchQuery(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                    />
                    {photoSearchQuery && (
                      <button 
                        onClick={() => setPhotoSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sitePhotos
                  .filter(photo => {
                    const matchesCategory = photoCategoryFilter === 'ALL' || photo.category === photoCategoryFilter;
                    const matchesSearch = !photoSearchQuery ||
                      photo.label.toLowerCase().includes(photoSearchQuery.toLowerCase()) ||
                      photo.section.toLowerCase().includes(photoSearchQuery.toLowerCase()) ||
                      photo.id.toLowerCase().includes(photoSearchQuery.toLowerCase());
                    return matchesCategory && matchesSearch;
                  })
                  .map(photo => {
                    const isCustom = photo.url !== photo.defaultUrl;
                    return (
                      <div 
                        key={photo.id} 
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                      >
                        <div>
                          {/* Image Preview */}
                          <div className="relative h-44 bg-gray-100 overflow-hidden group">
                            <img
                              src={photo.url}
                              alt={photo.label}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            {/* Badges */}
                            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                              <span className="bg-[#16382E]/90 text-[#E5C378] text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs uppercase">
                                {photo.category}
                              </span>
                              {isCustom && (
                                <span className="bg-[#B68A3C] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                                  Custom Active
                                </span>
                              )}
                            </div>

                            <div className="absolute bottom-2.5 right-2.5">
                              <span className="bg-black/65 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs">
                                {photo.aspectRatio || '16:9'}
                              </span>
                            </div>
                          </div>

                          {/* Info */}
                          <div className="p-4 space-y-2">
                            <div>
                              <h4 className="font-serif font-bold text-sm text-[#16382E] line-clamp-1">
                                {photo.label}
                              </h4>
                              <p className="text-[11px] text-gray-500 font-medium line-clamp-1 mt-0.5">
                                Location: {photo.section}
                              </p>
                            </div>

                            {photo.recommendedSize && (
                              <div className="bg-amber-50/70 border border-amber-200/60 rounded-md px-2.5 py-1.5 text-[11px] text-amber-900 leading-snug">
                                <span className="font-semibold">Recommended:</span> {photo.recommendedSize}
                              </div>
                            )}

                            <div className="pt-1">
                              <p className="text-[10px] text-gray-400 truncate font-mono bg-gray-50 p-1.5 rounded border border-gray-100" title={photo.url}>
                                {photo.url}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-4 pt-3 border-t border-gray-100 bg-gray-50/60 flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleOpenEditPhoto(photo)}
                            className="flex-1 bg-[#16382E] hover:bg-[#204a3e] text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#B68A3C]" />
                            <span>Change Photo</span>
                          </button>

                          {isCustom && (
                            <button
                              onClick={() => handleResetSinglePhoto(photo.id, photo.label)}
                              className="text-gray-500 hover:text-gray-800 p-2 border border-gray-200 hover:bg-white rounded-lg transition-colors cursor-pointer"
                              title="Reset to default Vrindavan image"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Quick Vrindavan Preset Library Reference */}
              <div className="bg-white rounded-xl border border-[#B68A3C]/30 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B68A3C]" />
                    <h3 className="font-serif font-bold text-base text-[#16382E]">
                      Curated Vrindavan Photo Library
                    </h3>
                  </div>
                  <span className="text-[11px] text-gray-500">
                    Authentic shrines, Yamuna ghats, and townships
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {vrindavanPhotoPresets.slice(0, 6).map((preset, idx) => (
                    <div 
                      key={idx} 
                      className="group relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-4/3"
                    >
                      <img 
                        src={preset.url} 
                        alt={preset.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                        <span className="text-[10px] font-bold line-clamp-1 leading-tight">{preset.title}</span>
                        <span className="text-[9px] text-[#E5C378]">{preset.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#16382E]">
                  Platform Settings & Visibility Controls
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Manage brand details, contact information, and toggle visibility of public pages and interactive features.
                </p>
              </div>

              {settingsSaved && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Settings and visibility preferences successfully saved and synchronized!</span>
                </div>
              )}

              {/* 1. PAGE VISIBILITY SETTINGS */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="bg-[#16382E] text-white p-5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-5 h-5 text-[#B68A3C]" />
                    <div>
                      <h3 className="font-serif text-lg font-bold">Public Page Visibility Controls</h3>
                      <p className="text-xs text-white/70">
                        Hide or unhide specific pages from public navigation and direct access.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] bg-[#B68A3C]/20 text-[#E5C378] px-3 py-1 rounded-full font-semibold border border-[#B68A3C]/30 hidden sm:inline-block">
                    Instant Live Sync
                  </span>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      key: 'properties' as const,
                      title: 'Properties Catalog Page',
                      route: '/properties',
                      description: 'Search, filter, and showcase residential plots, luxury villas, and commercial real estate.',
                      visible: settingsForm.pageVisibility?.properties ?? true
                    },
                    {
                      key: 'projects' as const,
                      title: 'Projects & Townships Page',
                      route: '/projects',
                      description: 'Highlight master-planned gated developments, Vrindavan enclaves, and townships.',
                      visible: settingsForm.pageVisibility?.projects ?? true
                    },
                    {
                      key: 'about' as const,
                      title: 'About Us Page',
                      route: '/about',
                      description: 'Company profile, vision, leadership team, and credentials in Braj Bhoomi.',
                      visible: settingsForm.pageVisibility?.about ?? true
                    },
                    {
                      key: 'whyVdpd' as const,
                      title: 'Why VDPD / Buyer Advantage Page',
                      route: '/why-vdpd',
                      description: '100% legal verification, RERA approved plots, registry guidance, and trust pillars.',
                      visible: settingsForm.pageVisibility?.whyVdpd ?? true
                    },
                    {
                      key: 'blog' as const,
                      title: 'Real Estate Blog & Insights Page',
                      route: '/blog',
                      description: 'Market research, investment reports, and Vrindavan infrastructure updates.',
                      visible: settingsForm.pageVisibility?.blog ?? true
                    },
                    {
                      key: 'contact' as const,
                      title: 'Contact & Office Page',
                      route: '/contact',
                      description: 'Physical Mathura-Vrindavan office addresses, phone contacts, and enquiry form.',
                      visible: settingsForm.pageVisibility?.contact ?? true
                    }
                  ].map((page) => (
                    <div 
                      key={page.key}
                      className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        page.visible 
                          ? 'bg-gray-50/70 border-gray-200' 
                          : 'bg-amber-50/50 border-amber-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-[#16382E]">{page.title}</span>
                          <span className="text-[10px] text-gray-400 font-mono">{page.route}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed">{page.description}</p>
                        <div className="pt-1 flex items-center gap-1.5">
                          {page.visible ? (
                            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                              <Eye className="w-3 h-3" /> Visible to Public
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                              <EyeOff className="w-3 h-3" /> Hidden from Public
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSettingsForm(prev => ({
                            ...prev,
                            pageVisibility: {
                              ...prev.pageVisibility,
                              [page.key]: !page.visible
                            }
                          }));
                        }}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                          page.visible ? 'bg-[#16382E]' : 'bg-gray-300'
                        }`}
                        title={page.visible ? 'Click to hide this page' : 'Click to show this page'}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                            page.visible ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. FEATURE VISIBILITY SETTINGS */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="bg-[#16382E] text-white p-5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-5 h-5 text-[#B68A3C]" />
                    <div>
                      <h3 className="font-serif text-lg font-bold">Interactive Feature Visibility Controls</h3>
                      <p className="text-xs text-white/70">
                        Toggle public website utilities and interactive tools on or off.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] bg-[#B68A3C]/20 text-[#E5C378] px-3 py-1 rounded-full font-semibold border border-[#B68A3C]/30 hidden sm:inline-block">
                    Modular Toggles
                  </span>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      key: 'compare' as const,
                      title: 'Property Comparison Matrix',
                      description: 'Allows buyers to compare multiple plots and villas side-by-side with price per sq. yd.',
                      visible: settingsForm.featureVisibility?.compare ?? true
                    },
                    {
                      key: 'wishlist' as const,
                      title: 'Saved Properties / Wishlist Drawer',
                      description: 'Enables heart icon bookmarking and saved property collections for quick reference.',
                      visible: settingsForm.featureVisibility?.wishlist ?? true
                    },
                    {
                      key: 'emiCalculator' as const,
                      title: 'Bank EMI & Mortgage Calculator',
                      description: 'Interactive loan tenure, down payment, and monthly installment breakdown widget.',
                      visible: settingsForm.featureVisibility?.emiCalculator ?? true
                    },
                    {
                      key: 'whatsappFloat' as const,
                      title: 'Floating WhatsApp Quick Action',
                      description: 'Direct WhatsApp button fixed at bottom-right for instant chat with sales counselors.',
                      visible: settingsForm.featureVisibility?.whatsappFloat ?? true
                    },
                    {
                      key: 'enquiryModal' as const,
                      title: 'Consultation & Site Visit Booking Modal',
                      description: 'Quick lead capture popup triggered from top navbar and property detail call-to-actions.',
                      visible: settingsForm.featureVisibility?.enquiryModal ?? true
                    },
                    {
                      key: 'investmentMetrics' as const,
                      title: 'Investment ROI & Price Appreciation Data',
                      description: 'Displays historical capital growth trends and projected rental/resale returns.',
                      visible: settingsForm.featureVisibility?.investmentMetrics ?? true
                    }
                  ].map((feature) => (
                    <div 
                      key={feature.key}
                      className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                        feature.visible 
                          ? 'bg-gray-50/70 border-gray-200' 
                          : 'bg-amber-50/50 border-amber-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="font-semibold text-xs text-[#16382E] block">{feature.title}</span>
                        <p className="text-[11px] text-gray-500 leading-relaxed">{feature.description}</p>
                        <div className="pt-1 flex items-center gap-1.5">
                          {feature.visible ? (
                            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                              <Eye className="w-3 h-3" /> Enabled on Site
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                              <EyeOff className="w-3 h-3" /> Disabled / Hidden
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSettingsForm(prev => ({
                            ...prev,
                            featureVisibility: {
                              ...prev.featureVisibility,
                              [feature.key]: !feature.visible
                            }
                          }));
                        }}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                          feature.visible ? 'bg-[#16382E]' : 'bg-gray-300'
                        }`}
                        title={feature.visible ? 'Click to disable this feature' : 'Click to enable this feature'}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                            feature.visible ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. BRAND & CONTACT INFORMATION */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
                <div className="bg-[#16382E] text-white p-5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <SettingsIcon className="w-5 h-5 text-[#B68A3C]" />
                    <div>
                      <h3 className="font-serif text-lg font-bold">Platform Brand & Contact Settings</h3>
                      <p className="text-xs text-white/70">
                        Update official contact numbers, emails, addresses, and taglines.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSaveSettings} className="p-6 sm:p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={settingsForm.companyName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                        className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                        Short Name
                      </label>
                      <input
                        type="text"
                        value={settingsForm.shortName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, shortName: e.target.value })}
                        className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Official Tagline
                    </label>
                    <input
                      type="text"
                      value={settingsForm.tagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                      className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                        Primary Phone
                      </label>
                      <input
                        type="text"
                        value={settingsForm.phonePrimary}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phonePrimary: e.target.value })}
                        className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                        Secondary Phone
                      </label>
                      <input
                        type="text"
                        value={settingsForm.phoneSecondary}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phoneSecondary: e.target.value })}
                        className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                        Primary Email
                      </label>
                      <input
                        type="email"
                        value={settingsForm.emailPrimary}
                        onChange={(e) => setSettingsForm({ ...settingsForm, emailPrimary: e.target.value })}
                        className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                        Office Address
                      </label>
                      <input
                        type="text"
                        value={settingsForm.address}
                        onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                        className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-7 py-3 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-md cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save All Settings & Visibility</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 8: STAFF & SUB-USERS (RBAC) */}
          {activeTab === 'users' && (adminUser?.isSuperAdmin || canAccess('canManageUsers')) && (
            <AdminUsersTab currentAdmin={adminUser} onRefreshData={onRefreshData} />
          )}
        </main>
      </div>

      {/* Property Create / Edit Modal */}
      {isPropertyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#B68A3C]/30 animate-in fade-in">
            <div className="bg-[#16382E] text-white p-5 flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold">
                {editingProperty ? 'Edit Property' : 'Add New Property to VDPD'}
              </h3>
              <button
                onClick={() => setIsPropertyModalOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Premium Residential Plots"
                  value={propertyFormData.title || ''}
                  onChange={(e) => setPropertyFormData({ ...propertyFormData, title: e.target.value })}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Property Type
                  </label>
                  <select
                    value={propertyFormData.propertyType}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, propertyType: e.target.value as any })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  >
                    <option value="Residential Plots">Residential Plots</option>
                    <option value="Villas">Villas</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Investment Properties">Investment Properties</option>
                    <option value="Farmhouse & Retreat Land">Farmhouse & Retreat Land</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={propertyFormData.status}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, status: e.target.value as any })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  >
                    <option value="Available">Available</option>
                    <option value="Fast Selling">Fast Selling</option>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Sold Out">Sold Out</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Price Display Label *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="₹ 18 Lakh Onwards"
                    value={propertyFormData.priceDisplay || ''}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, priceDisplay: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Area / Size *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="100 - 500 Sq. Yds"
                    value={propertyFormData.area || ''}
                    onChange={(e) => setPropertyFormData({ ...propertyFormData, area: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vrindavan, Mathura"
                  value={propertyFormData.location || ''}
                  onChange={(e) => setPropertyFormData({ ...propertyFormData, location: e.target.value })}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                />
              </div>

              <AdminPhotoField
                label="Property Cover Image"
                currentUrl={propertyFormData.featuredImage || ''}
                onChange={(url) => setPropertyFormData({ ...propertyFormData, featuredImage: url })}
                helpText="Upload a plot/villa photo, choose from authentic Vrindavan photography, or paste a link."
                recommendedAspect="16:9"
              />

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={propertyFormData.description || ''}
                  onChange={(e) => setPropertyFormData({ ...propertyFormData, description: e.target.value })}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPropertyModalOpen(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-5 py-2 rounded-lg text-xs font-semibold"
                >
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Create / Edit Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#B68A3C]/30 my-8">
            <div className="bg-[#16382E] text-white p-5 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#B68A3C]" />
                <h3 className="font-serif text-xl font-bold">
                  {editingBlogId ? 'Edit Blog Article' : 'Write New Blog Article'}
                </h3>
              </div>
              <button 
                onClick={() => {
                  setIsBlogModalOpen(false);
                  setEditingBlogId(null);
                }} 
                className="text-white/60 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveBlog} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="Article Headline"
                  value={blogFormData.title || ''}
                  onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Market Trends, Legal Guide"
                    value={blogFormData.category || ''}
                    onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    placeholder="e.g. VDPD Research"
                    value={blogFormData.author || ''}
                    onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    placeholder="article-slug"
                    value={blogFormData.slug || ''}
                    onChange={(e) => setBlogFormData({ ...blogFormData, slug: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 4 min read"
                    value={blogFormData.readTime || ''}
                    onChange={(e) => setBlogFormData({ ...blogFormData, readTime: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  />
                </div>
              </div>

              {/* Featured Image with Vrindavan Presets, Upload & URL */}
              <AdminPhotoField
                label="Article Featured Photo"
                currentUrl={blogFormData.featuredImage || ''}
                onChange={(url) => setBlogFormData(prev => ({ ...prev, featuredImage: url }))}
                helpText="Change article photo: upload image from device, select authentic Vrindavan photography, or paste image URL."
                recommendedAspect="16:9"
              />

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Excerpt</label>
                <input
                  type="text"
                  placeholder="Brief summary for list cards..."
                  value={blogFormData.excerpt || ''}
                  onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Article Content</label>
                <textarea
                  rows={6}
                  placeholder="Write in-depth insights, guidelines, and market observations..."
                  value={blogFormData.content || ''}
                  onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsBlogModalOpen(false);
                    setEditingBlogId(null);
                  }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-xs hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-5 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                >
                  {editingBlogId ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project / Township Create / Edit Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#B68A3C]/30 my-8 animate-in zoom-in-95 duration-150">
            <div className="bg-[#16382E] text-white p-5 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <Building className="w-5 h-5 text-[#B68A3C]" />
                <div>
                  <h3 className="font-serif text-xl font-bold">
                    {editingProject ? 'Edit Township / Project' : 'Add New Township / Project'}
                  </h3>
                  <p className="text-[11px] text-[#E5C378]">
                    {editingProject ? `Updating details for "${editingProject.name || (editingProject as any).title}"` : 'Create a new master development or township listing'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsProjectModalOpen(false);
                  setEditingProject(null);
                }} 
                className="text-white/60 hover:text-white p-1 rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Township / Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radha Rani Enclave"
                    value={projectFormData.name || ''}
                    onChange={(e) => setProjectFormData({ ...projectFormData, name: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. radha-rani-enclave"
                    value={projectFormData.slug || ''}
                    onChange={(e) => setProjectFormData({ ...projectFormData, slug: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  placeholder="e.g. Master-Planned 45-Acre Divine Township with Integrated Temple"
                  value={projectFormData.tagline || ''}
                  onChange={(e) => setProjectFormData({ ...projectFormData, tagline: e.target.value })}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Development Status *
                  </label>
                  <select
                    value={projectFormData.status || 'Under Development'}
                    onChange={(e) => setProjectFormData({ ...projectFormData, status: e.target.value as any })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  >
                    <option value="Under Development">Under Development</option>
                    <option value="Ready to Possess">Ready to Possess</option>
                    <option value="Planning">Planning</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Completion / Possession *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. December 2026 or Immediate"
                    value={projectFormData.completionDate || ''}
                    onChange={(e) => setProjectFormData({ ...projectFormData, completionDate: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Total Plots / Units *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 400 Plots & 50 Villas"
                    value={projectFormData.totalUnits || ''}
                    onChange={(e) => setProjectFormData({ ...projectFormData, totalUnits: e.target.value })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Location & Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chhatikara Road, near Prem Mandir, Vrindavan"
                  value={projectFormData.location || ''}
                  onChange={(e) => setProjectFormData({ ...projectFormData, location: e.target.value })}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                />
              </div>

              {/* Photo Changer with Upload & Vrindavan Presets */}
              <AdminPhotoField
                label="Township Main Cover Image"
                currentUrl={projectFormData.featuredImage || ''}
                onChange={(url) => setProjectFormData(prev => ({ ...prev, featuredImage: url }))}
                helpText="Choose authentic Vrindavan photography or upload township master layout."
                recommendedAspect="16:9"
              />

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Township Overview Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed description of the master township, connectivity, environment, and development roadmap..."
                  value={projectFormData.description || ''}
                  onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Key Highlights (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="45 Acres Total Land, Temple & Satsang Hall, 40ft/50ft Roads, Freehold Registry"
                  value={(projectFormData.highlights || []).join(', ')}
                  onChange={(e) => setProjectFormData({ 
                    ...projectFormData, 
                    highlights: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                  })}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Township Amenities (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="24/7 Gated Security, Underground Utilities, Landscaped Parks, Temple Complex, Street Lights"
                  value={(projectFormData.amenities || []).join(', ')}
                  onChange={(e) => setProjectFormData({ 
                    ...projectFormData, 
                    amenities: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                  })}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsProjectModalOpen(false);
                    setEditingProject(null);
                  }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-xs hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-5 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingProject ? 'Save Changes' : 'Create Township'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Website Photo Edit Modal */}
      {isPhotoModalOpen && editingPhoto && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#B68A3C]/30 my-6">
            {/* Modal Top */}
            <div className="bg-[#16382E] text-white p-5 flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-5 h-5 text-[#B68A3C]" />
                <div>
                  <h3 className="font-serif text-lg font-bold">
                    Change Website Photo
                  </h3>
                  <p className="text-[11px] text-[#E5C378]">
                    {editingPhoto.label} • {editingPhoto.section}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsPhotoModalOpen(false);
                  setEditingPhoto(null);
                }} 
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Preview Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-500 block mb-1">
                    Current Active Photo
                  </span>
                  <div className="relative h-36 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                    <img
                      src={editingPhoto.url}
                      alt="Current"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] uppercase font-bold text-gray-500 block mb-1">
                    New Selection Preview
                  </span>
                  <div className="relative h-36 rounded-xl overflow-hidden border-2 border-[#B68A3C] bg-gray-100 shadow-xs">
                    {photoNewInputUrl ? (
                      <img
                        src={photoNewInputUrl}
                        alt="New Selection"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-xs">
                        <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
                        <span>Select or upload a photo below</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Source Tabs */}
              <div className="border-b border-gray-200 flex gap-2">
                <button
                  type="button"
                  onClick={() => setPhotoModalTab('presets')}
                  className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                    photoModalTab === 'presets'
                      ? 'border-[#B68A3C] text-[#16382E]'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Authentic Vrindavan Presets
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoModalTab('upload')}
                  className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                    photoModalTab === 'upload'
                      ? 'border-[#B68A3C] text-[#16382E]'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Upload from Computer
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoModalTab('url')}
                  className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                    photoModalTab === 'url'
                      ? 'border-[#B68A3C] text-[#16382E]'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Custom Web URL
                </button>
              </div>

              {/* Tab 1: Vrindavan Presets */}
              {photoModalTab === 'presets' && (
                <div className="space-y-3">
                  <p className="text-xs text-gray-600">
                    Click any curated holy Vrindavan shrine or township landscape to apply it instantly:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-1">
                    {vrindavanPhotoPresets.map((preset, idx) => {
                      const isSelected = photoNewInputUrl === preset.url;
                      return (
                        <div
                          key={idx}
                          onClick={() => setPhotoNewInputUrl(preset.url)}
                          className={`group cursor-pointer rounded-xl overflow-hidden border-2 transition-all text-left relative ${
                            isSelected 
                              ? 'border-[#B68A3C] ring-2 ring-[#B68A3C]/30 shadow-md scale-[1.02]' 
                              : 'border-gray-200 hover:border-[#16382E]'
                          }`}
                        >
                          <div className="h-24 bg-gray-100 overflow-hidden relative">
                            <img
                              src={preset.url}
                              alt={preset.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                            />
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 bg-[#B68A3C] text-white p-1 rounded-full shadow-xs">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <div className="p-2 bg-white">
                            <p className="font-semibold text-[11px] text-gray-900 line-clamp-1">{preset.title}</p>
                            <p className="text-[9px] text-[#B68A3C] uppercase font-bold">{preset.tag}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 2: Upload File */}
              {photoModalTab === 'upload' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 hover:border-[#B68A3C] rounded-2xl p-8 text-center transition-colors bg-gray-50/50">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-sm text-gray-800">
                      Upload high-resolution photography
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                      Supports JPG, PNG, and WebP. The photo will be saved locally to your browser database.
                    </p>
                    <label className="mt-4 inline-block bg-[#16382E] hover:bg-[#204a3e] text-white text-xs font-semibold px-5 py-2.5 rounded-lg cursor-pointer transition-colors shadow-xs">
                      <span>Choose File from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Tab 3: Custom Web URL */}
              {photoModalTab === 'url' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Direct Image Web Address (URL)
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={photoNewInputUrl}
                      onChange={(e) => setPhotoNewInputUrl(e.target.value)}
                      className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Tip: You can paste public URLs from Cloudinary, Unsplash, or your preferred image CDN.
                  </p>
                </div>
              )}

              {/* Modal Bottom Controls */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (editingPhoto) {
                      setPhotoNewInputUrl(editingPhoto.defaultUrl);
                    }
                  }}
                  className="text-xs text-gray-600 hover:text-gray-900 underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Restore Vrindavan Default</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPhotoModalOpen(false);
                      setEditingPhoto(null);
                    }}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-xs hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSavePhoto()}
                    className="bg-[#16382E] hover:bg-[#204a3e] text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5 text-[#B68A3C]" />
                    <span>Apply & Save to Website</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Profile & Password Edit Modal */}
      <AdminProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={adminUser}
        onProfileUpdated={() => {
          onRefreshData();
        }}
      />

      {/* Confirm Delete In-App Modal */}
      <ConfirmDeleteModal
        isOpen={!!confirmDeleteTarget}
        onClose={() => setConfirmDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title={confirmDeleteTarget?.type?.startsWith('reset') ? 'Reset Imagery' : `Delete ${confirmDeleteTarget?.itemType || 'Record'}`}
        itemName={confirmDeleteTarget?.name || ''}
        itemType={confirmDeleteTarget?.itemType || 'Record'}
        description={confirmDeleteTarget?.description}
        confirmText={confirmDeleteTarget?.type?.startsWith('reset') ? 'Reset to Default' : 'Delete Permanently'}
        isDestructive={true}
      />
    </div>
  );
};
