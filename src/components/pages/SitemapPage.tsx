import React from 'react';
import { Property, Project, BlogPost, ActivePage } from '../../types';
import { ArrowLeft, ExternalLink, Home, Building, FileText, Compass, Phone } from 'lucide-react';

interface SitemapPageProps {
  properties: Property[];
  projects: Project[];
  blogs: BlogPost[];
  onNavigate: (page: ActivePage) => void;
  onSelectProperty: (slug: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({
  properties,
  projects,
  blogs,
  onNavigate,
  onSelectProperty,
}) => {
  return (
    <div className="min-h-screen bg-[#F8F6F1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-semibold text-[#16382E] hover:text-[#B68A3C] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white p-8 rounded-2xl border border-[#B68A3C]/20 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-serif uppercase tracking-widest text-[#B68A3C] font-semibold block">
              Website Structure
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#16382E]">
              VDPD Sitemap & Navigation Index
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Complete index of real estate listings, guides, and corporate resources.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            {/* Main Pages */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#16382E] border-b pb-2 flex items-center gap-2">
                <Home className="w-4 h-4 text-[#B68A3C]" />
                <span>Primary Pages</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li><button onClick={() => onNavigate('home')} className="hover:text-[#B68A3C]">Home</button></li>
                <li><button onClick={() => onNavigate('properties')} className="hover:text-[#B68A3C]">All Properties</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-[#B68A3C]">About Us & Our Story</button></li>
                <li><button onClick={() => onNavigate('projects')} className="hover:text-[#B68A3C]">Townships & Projects</button></li>
                <li><button onClick={() => onNavigate('why-vdpd')} className="hover:text-[#B68A3C]">Why VDPD & Investment Benefits</button></li>
                <li><button onClick={() => onNavigate('blog')} className="hover:text-[#B68A3C]">Vrindavan Insights & Blog</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-[#B68A3C]">Contact & Office Location</button></li>
                <li><button onClick={() => onNavigate('admin')} className="text-[#B68A3C] font-semibold">Admin Portal</button></li>
              </ul>
            </div>

            {/* Properties */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#16382E] border-b pb-2 flex items-center gap-2">
                <Building className="w-4 h-4 text-[#B68A3C]" />
                <span>Active Properties</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-600">
                {properties.map(p => (
                  <li key={p.id}>
                    <button onClick={() => onSelectProperty(p.slug)} className="hover:text-[#B68A3C] text-left truncate block w-full">
                      {p.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Articles */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#16382E] border-b pb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#B68A3C]" />
                <span>Market Guides</span>
              </h3>
              <ul className="space-y-2 text-xs text-gray-600">
                {blogs.map(b => (
                  <li key={b.id}>
                    <span className="text-gray-700 block truncate">{b.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
