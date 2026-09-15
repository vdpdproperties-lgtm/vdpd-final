import React, { useState } from 'react';
import { Project, ActivePage } from '../../types';
import { MapPin, Calendar, CheckCircle2, ArrowRight, ShieldCheck, Building } from 'lucide-react';

interface ProjectsPageProps {
  projects: Project[];
  onSelectProject: (slug: string) => void;
  onOpenEnquiry: (interest?: string) => void;
  onNavigate: (page: ActivePage) => void;
  photos?: Record<string, string>;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  onSelectProject,
  onOpenEnquiry,
  onNavigate,
  photos,
}) => {
  const [filter, setFilter] = useState<'All' | 'Ongoing' | 'Upcoming' | 'Completed'>('All');

  const filteredProjects = projects.filter(p => {
    if (filter === 'All') return true;
    return p.status === filter;
  });

  return (
    <div className="min-h-screen bg-[#F8F6F1]">
      {/* Hero (Warm Sunset Style matching Home Hero) */}
      <section className="relative bg-[#181614] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={photos?.projects_hero || "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1800&q=80"}
            alt="Vrindavan Master Townships"
            className="w-full h-full object-cover object-[center_35%] opacity-100"
            referrerPolicy="no-referrer"
          />
          {/* Subtle directional dark scrim on left for crystal-clear text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 via-50% to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/15 pointer-events-none" />
        </div>

        {/* Radha Radha Devnagari Calligraphy (Top Right in warm terracotta sepia tone) */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-10 md:top-10 md:right-16 z-10 pointer-events-none select-none">
          <span className="font-devanagari text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#6E4226]/85 tracking-widest drop-shadow-xs">
            राधे राधे
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-3 pb-4">
          <span className="text-[#B68A3C] text-xs font-serif uppercase tracking-widest block font-semibold">
            VDPD Master Townships
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            Integrated Gated Projects in Vrindavan
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-xl font-light">
            Planned spiritual townships featuring wide internal roads, temple gardens, 24/7 security, and modern utilities.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-xl shadow-md border border-[#B68A3C]/20 p-2 inline-flex gap-2">
          {(['All', 'Ongoing', 'Upcoming', 'Completed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === tab 
                  ? 'bg-[#B68A3C] text-white shadow-xs' 
                  : 'text-gray-600 hover:text-[#16382E] hover:bg-gray-100'
              }`}
            >
              {tab} Projects
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#B68A3C]/20 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.featuredImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#16382E]/90 backdrop-blur-md text-[#B68A3C] text-xs font-semibold px-3 py-1 rounded-md border border-[#B68A3C]/40">
                    {project.status}
                  </span>
                </div>
                {project.reraNumber && (
                  <div className="absolute top-4 right-4 bg-white/95 px-2.5 py-1 rounded text-[11px] font-medium text-emerald-800 flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{project.reraNumber}</span>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-[#B68A3C]" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#16382E] group-hover:text-[#B68A3C] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#F8F6F1] p-3 rounded-lg">
                      <span className="text-gray-400 block text-[10px] uppercase">Plot / Unit Sizes</span>
                      <span className="font-bold text-gray-800">{project.totalPlots} Units / Lots</span>
                    </div>
                    <div className="bg-[#F8F6F1] p-3 rounded-lg">
                      <span className="text-gray-400 block text-[10px] uppercase">Possession</span>
                      <span className="font-bold text-gray-800">{project.completionDate}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.amenities.slice(0, 4).map((amenity, i) => (
                      <span key={i} className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <button
                    onClick={() => onOpenEnquiry(`Site Visit for Project: ${project.title}`)}
                    className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Request Master Layout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onNavigate('properties')}
                    className="text-xs font-semibold text-[#16382E] hover:text-[#B68A3C] transition-colors"
                  >
                    View Plots in this Project →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
