import React, { useState } from 'react';
import { Logo } from './Logo';
import { ActivePage, SiteSettings } from '../../types';
import { Camera, Heart, Scale, Shield, Menu, X, Phone } from 'lucide-react';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, params?: string) => void;
  onOpenEnquiry: (interest?: string) => void;
  wishlistCount: number;
  compareCount: number;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  settings?: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenEnquiry,
  wishlistCount,
  compareCount,
  onOpenWishlist,
  onOpenCompare,
  settings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pageVis = settings?.pageVisibility;
  const featVis = settings?.featureVisibility;

  const rawLinks: { label: string; page: ActivePage; visible: boolean }[] = [
    { label: 'Home', page: 'home', visible: true },
    { label: 'Properties', page: 'properties', visible: pageVis ? pageVis.properties !== false : true },
    { label: 'About Us', page: 'about', visible: pageVis ? pageVis.about !== false : true },
    { label: 'Projects', page: 'projects', visible: pageVis ? pageVis.projects !== false : true },
    { label: 'Why VDPD', page: 'why-vdpd', visible: pageVis ? pageVis.whyVdpd !== false : true },
    { label: 'Contact', page: 'contact', visible: pageVis ? pageVis.contact !== false : true },
    { label: 'Blog', page: 'blog', visible: pageVis ? pageVis.blog !== false : true },
  ];

  const navLinks = rawLinks.filter(l => l.visible);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all">
      {/* Main navigation bar matching reference screenshot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Logo 
          variant="dark" 
          size="md" 
          onClick={() => onNavigate('home')} 
        />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map(link => {
            const isActive = activePage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`text-sm font-medium transition-all relative py-1 cursor-pointer ${
                  isActive 
                    ? 'text-[#B68A3C] font-semibold' 
                    : 'text-[#222222] hover:text-[#B68A3C]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B68A3C] rounded-full animate-in fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Wishlist button */}
          {featVis?.wishlist !== false && (
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-full text-[#16382E] hover:bg-[#F8F6F1] transition-colors cursor-pointer"
              title="Saved Properties"
              id="nav-wishlist-btn"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#B68A3C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
          )}

          {/* Compare button */}
          {featVis?.compare !== false && (
            <button
              onClick={onOpenCompare}
              className="relative p-2 rounded-full text-[#16382E] hover:bg-[#F8F6F1] transition-colors cursor-pointer"
              title="Compare Properties"
              id="nav-compare-btn"
            >
              <Scale className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#16382E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>
          )}

          {/* Enquire Now Button */}
          {featVis?.enquiryModal !== false && (
            <button
              onClick={() => onOpenEnquiry()}
              id="nav-enquire-btn"
              className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 shadow-sm hover:shadow transition-all cursor-pointer transform active:scale-95"
            >
              <Camera className="w-4 h-4" />
              <span>Enquire Now</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#16382E] hover:bg-[#F8F6F1] rounded-lg cursor-pointer"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#B68A3C]/20 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => {
                onNavigate(link.page);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2.5 rounded-md text-base font-medium transition-colors ${
                activePage === link.page
                  ? 'bg-[#F8F6F1] text-[#B68A3C] font-semibold'
                  : 'text-[#222222] hover:bg-[#F8F6F1]'
              }`}
            >
              {link.label}
            </button>
          ))}
          {featVis?.enquiryModal !== false && (
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenEnquiry();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#B68A3C] text-white py-2.5 rounded-lg font-medium text-center shadow-sm cursor-pointer"
              >
                Book Site Visit & Consultation
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
