import React from 'react';
import { Logo } from './Logo';
import { ActivePage, SiteSettings } from '../../types';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Shield } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings;
  onNavigate: (page: ActivePage) => void;
  onOpenEnquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenEnquiry,
}) => {
  return (
    <footer className="bg-[#16382E] text-white pt-16 pb-8 border-t border-[#B68A3C]/30 relative overflow-hidden">
      {/* Subtle peacock feather watermark SVG background */}
      <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-12 translate-y-12">
        <svg width="400" height="400" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="#B68A3C" strokeWidth="2" />
          <path d="M100 20C100 60 140 100 180 100" stroke="#B68A3C" strokeWidth="2" />
          <path d="M100 20C100 60 60 100 20 100" stroke="#B68A3C" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Company Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="light" size="lg" onClick={() => onNavigate('home')} />
            <p className="text-white/75 text-sm max-w-sm font-light leading-relaxed">
              {settings.tagline}
            </p>
            <p className="text-white/60 text-xs max-w-sm leading-relaxed">
              Vrindavan Dham Property & Developers (VDPD) is the trusted gateway to premium residential plots, luxury villas, and verified spiritual real estate in Sri Vrindavan Dham.
            </p>
            {settings.featureVisibility?.enquiryModal !== false && (
              <div className="pt-2">
                <button
                  onClick={onOpenEnquiry}
                  className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  Schedule Site Visit
                </button>
              </div>
            )}
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-serif font-semibold text-lg tracking-wide border-b border-[#B68A3C]/40 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#B68A3C] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              {settings.pageVisibility?.properties !== false && (
                <li>
                  <button onClick={() => onNavigate('properties')} className="hover:text-[#B68A3C] transition-colors cursor-pointer">
                    Properties
                  </button>
                </li>
              )}
              {settings.pageVisibility?.about !== false && (
                <li>
                  <button onClick={() => onNavigate('about')} className="hover:text-[#B68A3C] transition-colors cursor-pointer">
                    About Us
                  </button>
                </li>
              )}
              {settings.pageVisibility?.projects !== false && (
                <li>
                  <button onClick={() => onNavigate('projects')} className="hover:text-[#B68A3C] transition-colors cursor-pointer">
                    Projects
                  </button>
                </li>
              )}
              {settings.pageVisibility?.whyVdpd !== false && (
                <li>
                  <button onClick={() => onNavigate('why-vdpd')} className="hover:text-[#B68A3C] transition-colors cursor-pointer">
                    Why VDPD
                  </button>
                </li>
              )}
              {settings.pageVisibility?.contact !== false && (
                <li>
                  <button onClick={() => onNavigate('contact')} className="hover:text-[#B68A3C] transition-colors cursor-pointer">
                    Contact
                  </button>
                </li>
              )}
              {settings.pageVisibility?.blog !== false && (
                <li>
                  <button onClick={() => onNavigate('blog')} className="hover:text-[#B68A3C] transition-colors cursor-pointer">
                    Real Estate Blog & Insights
                  </button>
                </li>
              )}
              <li className="pt-2 border-t border-white/10">
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="text-[#B68A3C] hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Management Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Get In Touch Column (exact match to screenshot) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white font-serif font-semibold text-lg tracking-wide border-b border-[#B68A3C]/40 pb-2 inline-block">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm text-white/85">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#B68A3C]">
                  <Phone className="w-4 h-4" />
                </div>
                <a href={`tel:${settings.phonePrimary}`} className="hover:text-[#B68A3C] transition-colors">
                  {settings.phonePrimary}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#B68A3C]">
                  <Mail className="w-4 h-4" />
                </div>
                <a href={`mailto:${settings.emailPrimary}`} className="hover:text-[#B68A3C] transition-colors">
                  {settings.emailPrimary}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#B68A3C] mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-white/80 leading-snug">
                  {settings.address}
                </span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="pt-3">
              <div className="flex items-center gap-3">
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B68A3C] flex items-center justify-center transition-all text-white hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B68A3C] flex items-center justify-center transition-all text-white hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B68A3C] flex items-center justify-center transition-all text-white hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© 2025 VDPD – Vrindavan Dham Property & Developers. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-white/70">Built with Trust</span>
            <span className="text-[#B68A3C]">|</span>
            <span className="text-white/70">Growing with Vrindavan</span>
            <span className="text-[#B68A3C]">|</span>
            <button onClick={() => onNavigate('sitemap')} className="hover:text-white transition-colors">
              Sitemap
            </button>
            <span className="text-[#B68A3C]">|</span>
            <button 
              onClick={() => onNavigate('admin')} 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#B68A3C]/20 hover:bg-[#B68A3C] text-[#B68A3C] hover:text-white transition-all font-medium border border-[#B68A3C]/40"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
