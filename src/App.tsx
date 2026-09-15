import React, { useState, useEffect } from 'react';
import { ActivePage, Property, AdminUser } from './types';
import { VDPDStore } from './services/store';
import { EyeOff } from 'lucide-react';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { EnquiryModal } from './components/common/EnquiryModal';
import { CompareModal } from './components/common/CompareModal';
import { WishlistDrawer } from './components/common/WishlistDrawer';

// Pages
import { HomePage } from './components/pages/HomePage';
import { PropertiesPage } from './components/pages/PropertiesPage';
import { PropertyDetailPage } from './components/pages/PropertyDetailPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { WhyVdpdPage } from './components/pages/WhyVdpdPage';
import { BlogPage } from './components/pages/BlogPage';
import { SitemapPage } from './components/pages/SitemapPage';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedPropertySlug, setSelectedPropertySlug] = useState<string | null>(null);
  const [propertyFilter, setPropertyFilter] = useState<string | undefined>(undefined);

  // Store data states
  const [properties, setProperties] = useState(VDPDStore.getProperties());
  const [projects, setProjects] = useState(VDPDStore.getProjects());
  const [blogs, setBlogs] = useState(VDPDStore.getBlogs());
  const [leads, setLeads] = useState(VDPDStore.getLeads());
  const [testimonials, setTestimonials] = useState(VDPDStore.getTestimonials());
  const [faqs, setFaqs] = useState(VDPDStore.getFAQs());
  const [team, setTeam] = useState(VDPDStore.getTeam());
  const [settings, setSettings] = useState(VDPDStore.getSettings());
  const [photos, setPhotos] = useState<Record<string, string>>(VDPDStore.getSitePhotosMap());

  // Interactive UI states
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryDefaultInterest, setEnquiryDefaultInterest] = useState('General Consultation');

  // Admin auth state
  const [adminUser, setAdminUser] = useState<AdminUser | null>(VDPDStore.getCurrentAdmin());

  // Refresh all state from local store
  const refreshData = () => {
    setProperties([...VDPDStore.getProperties()]);
    setProjects([...VDPDStore.getProjects()]);
    setBlogs([...VDPDStore.getBlogs()]);
    setLeads([...VDPDStore.getLeads()]);
    setTestimonials([...VDPDStore.getTestimonials()]);
    setFaqs([...VDPDStore.getFAQs()]);
    setTeam([...VDPDStore.getTeam()]);
    setSettings({ ...VDPDStore.getSettings() });
    setPhotos({ ...VDPDStore.getSitePhotosMap() });
  };

  // Subscribe to store updates for real-time reactivity
  useEffect(() => {
    const unsubscribe = VDPDStore.subscribe(() => {
      refreshData();
    });
    return () => unsubscribe();
  }, []);

  // Scroll to top on navigation
  const navigateTo = (page: ActivePage, filter?: string) => {
    setActivePage(page);
    if (filter) {
      setPropertyFilter(filter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProperty = (slug: string) => {
    setSelectedPropertySlug(slug);
    setActivePage('property-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleToggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 properties at a time.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleOpenEnquiry = (interest = 'General Property Consultation') => {
    setEnquiryDefaultInterest(interest);
    setIsEnquiryOpen(true);
  };

  // Selected property object
  const currentProperty = properties.find(p => p.slug === selectedPropertySlug) || properties[0];

  // Wishlist and Compare property objects
  const wishlistedProperties = properties.filter(p => wishlist.includes(p.id));
  const comparedProperties = properties.filter(p => compareList.includes(p.id));

  // If in admin mode
  if (activePage === 'admin') {
    if (!adminUser) {
      return (
        <AdminLogin
          onLoginSuccess={(user) => {
            setAdminUser(user);
          }}
          onBackToSite={() => navigateTo('home')}
        />
      );
    }
    return (
      <AdminDashboard
        adminUser={adminUser}
        onLogout={() => {
          VDPDStore.logout();
          setAdminUser(null);
          navigateTo('home');
        }}
        onViewLiveSite={() => navigateTo('home')}
        properties={properties}
        projects={projects}
        blogs={blogs}
        leads={leads}
        testimonials={testimonials}
        faqs={faqs}
        team={team}
        settings={settings}
        onRefreshData={refreshData}
      />
    );
  }

  // Check if current active page is hidden in SiteSettings
  const isPageHidden = () => {
    const pv = settings.pageVisibility;
    if (!pv) return false;
    if (activePage === 'properties' && pv.properties === false) return true;
    if (activePage === 'property-detail' && pv.properties === false) return true;
    if (activePage === 'about' && pv.about === false) return true;
    if (activePage === 'projects' && pv.projects === false) return true;
    if (activePage === 'why-vdpd' && pv.whyVdpd === false) return true;
    if (activePage === 'contact' && pv.contact === false) return true;
    if (activePage === 'blog' && pv.blog === false) return true;
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F8F6F1] text-[#222222] selection:bg-[#B68A3C] selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenEnquiry={() => handleOpenEnquiry('General Consultation')}
        settings={settings}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {isPageHidden() ? (
          <div className="py-24 px-4 max-w-xl mx-auto text-center space-y-5 animate-in fade-in">
            <div className="w-16 h-16 mx-auto bg-amber-100/70 border border-amber-200 rounded-full flex items-center justify-center text-[#B68A3C]">
              <EyeOff className="w-8 h-8" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#16382E]">Page Temporarily Unavailable</h2>
              <p className="text-sm text-gray-600 mt-1 max-w-md mx-auto leading-relaxed">
                This page is currently hidden by platform administrators for updates or scheduled maintenance. Please explore our other active sections.
              </p>
            </div>
            <div>
              <button
                onClick={() => navigateTo('home')}
                className="inline-flex items-center gap-2 bg-[#16382E] text-white px-6 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#204a3e] cursor-pointer shadow-xs transition-all"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        ) : (
          <>
            {activePage === 'home' && (
              <HomePage
                properties={properties}
                onNavigate={navigateTo}
                onSelectProperty={handleSelectProperty}
                onOpenEnquiry={handleOpenEnquiry}
                photos={photos}
              />
            )}

            {activePage === 'properties' && (
              <PropertiesPage
                properties={properties}
                onSelectProperty={handleSelectProperty}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                compareList={compareList}
                onToggleCompare={handleToggleCompare}
                onOpenEnquiry={handleOpenEnquiry}
                initialFilter={propertyFilter}
                photos={photos}
              />
            )}

            {activePage === 'property-detail' && currentProperty && (
              <PropertyDetailPage
                property={currentProperty}
                allProperties={properties}
                onBack={() => navigateTo('properties')}
                onSelectProperty={handleSelectProperty}
                isWishlisted={wishlist.includes(currentProperty.id)}
                onToggleWishlist={handleToggleWishlist}
                onOpenEnquiry={handleOpenEnquiry}
              />
            )}

            {activePage === 'about' && (
              <AboutPage
                team={team}
                onNavigate={navigateTo}
                onOpenEnquiry={() => handleOpenEnquiry('Company Consultation')}
                photos={photos}
              />
            )}

            {activePage === 'projects' && (
              <ProjectsPage
                projects={projects}
                onSelectProject={handleSelectProperty}
                onOpenEnquiry={handleOpenEnquiry}
                onNavigate={navigateTo}
                photos={photos}
              />
            )}

            {activePage === 'why-vdpd' && (
              <WhyVdpdPage
                onNavigate={navigateTo}
                onOpenEnquiry={() => handleOpenEnquiry('Investment Advisory')}
                photos={photos}
              />
            )}

            {activePage === 'contact' && (
              <ContactPage
                settings={settings}
                faqs={faqs}
                onOpenEnquiry={() => handleOpenEnquiry('Contact Consultation')}
                photos={photos}
              />
            )}

            {activePage === 'blog' && (
              <BlogPage
                blogs={blogs}
                onOpenEnquiry={handleOpenEnquiry}
                onNavigate={navigateTo}
                photos={photos}
              />
            )}

            {activePage === 'sitemap' && (
              <SitemapPage
                properties={properties}
                projects={projects}
                blogs={blogs}
                onNavigate={navigateTo}
                onSelectProperty={handleSelectProperty}
              />
            )}
          </>
        )}
      </main>

      {/* Persistent Footer */}
      <Footer
        settings={settings}
        onNavigate={navigateTo}
        onOpenEnquiry={() => handleOpenEnquiry('Consultation Request')}
      />

      {/* Floating WhatsApp Action Button */}
      {settings.featureVisibility?.whatsappFloat !== false && (
        <WhatsAppButton phoneNumber={settings.phonePrimary.replace(/[^0-9]/g, '')} />
      )}

      {/* Lead Generation & Consultation Modal */}
      {settings.featureVisibility?.enquiryModal !== false && (
        <EnquiryModal
          isOpen={isEnquiryOpen}
          onClose={() => setIsEnquiryOpen(false)}
          defaultInterest={enquiryDefaultInterest}
        />
      )}

      {/* Side-by-Side Property Comparison Modal */}
      {settings.featureVisibility?.compare !== false && (
        <CompareModal
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          properties={comparedProperties}
          onRemove={(id) => setCompareList(prev => prev.filter(x => x !== id))}
          onClear={() => setCompareList([])}
          onSelectProperty={handleSelectProperty}
          onOpenEnquiry={handleOpenEnquiry}
        />
      )}

      {/* Wishlist Drawer */}
      {settings.featureVisibility?.wishlist !== false && (
        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          properties={wishlistedProperties}
          onRemove={handleToggleWishlist}
          onSelectProperty={handleSelectProperty}
          onOpenEnquiry={handleOpenEnquiry}
        />
      )}
    </div>
  );
}
