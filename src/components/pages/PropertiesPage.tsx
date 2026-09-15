import React, { useState, useMemo } from 'react';
import { Property, PropertyType } from '../../types';
import { PropertyCard } from '../common/PropertyCard';
import { Search, Home, Building2, TrendingUp, SlidersHorizontal, ArrowRight, ShieldCheck, MapPin, Users } from 'lucide-react';

interface PropertiesPageProps {
  properties: Property[];
  onSelectProperty: (slug: string) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  compareList: string[];
  onToggleCompare: (id: string) => void;
  onOpenEnquiry: (interest?: string) => void;
  initialFilter?: string;
  photos?: Record<string, string>;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  properties,
  onSelectProperty,
  wishlist,
  onToggleWishlist,
  compareList,
  onToggleCompare,
  onOpenEnquiry,
  initialFilter,
  photos,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter || 'All Properties');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceSort, setPriceSort] = useState<'all' | 'low-to-high' | 'high-to-low'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(15000000); // 1.5 Cr

  const categories: { label: string; icon?: React.ReactNode }[] = [
    { label: 'All Properties' },
    { label: 'Residential Plots', icon: <Home className="w-3.5 h-3.5" /> },
    { label: 'Villas', icon: <Building2 className="w-3.5 h-3.5" /> },
    { label: 'Commercial', icon: <Building2 className="w-3.5 h-3.5" /> },
    { label: 'Investment Properties', icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ];

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      // Category match
      if (selectedCategory !== 'All Properties') {
        if (selectedCategory === 'Investment Properties') {
          if (p.propertyType !== 'Investment Properties' && p.propertyType !== 'Farmhouse & Retreat Land') {
            return false;
          }
        } else if (p.propertyType !== selectedCategory) {
          return false;
        }
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesLocation = p.location.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLocation && !matchesDesc) return false;
      }

      // Price filter
      if (p.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (priceSort === 'low-to-high') return a.price - b.price;
      if (priceSort === 'high-to-low') return b.price - a.price;
      return 0;
    });
  }, [properties, selectedCategory, searchQuery, priceSort, maxPrice]);

  return (
    <div className="min-h-screen bg-[#F8F6F1]">
      {/* 1. HERO SECTION (Warm Sunset Style matching Home Hero) */}
      <section className="relative bg-[#181614] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={photos?.properties_hero || "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1800&q=80"}
            alt="Vrindavan Horizon"
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
          <span className="text-[#B68A3C] text-xs font-serif uppercase tracking-widest block font-medium">
            Our Properties
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            Properties in Vrindavan Dham
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-xl font-light">
            Premium plots, villas and investment opportunities in the most spiritual city of India.
          </p>
        </div>
      </section>

      {/* 2. FILTER & SEARCH BAR (Exact match to Screenshot 4) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-xl shadow-lg border border-[#B68A3C]/20 p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#B68A3C] text-white shadow-xs font-semibold'
                      : 'bg-[#F8F6F1] text-gray-700 hover:bg-gray-200/70'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location / project..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] focus:bg-white transition-colors"
                id="properties-search-input"
              />
            </div>

            <div className="shrink-0">
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value as any)}
                className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-[#B68A3C] text-gray-700"
              >
                <option value="all">Sort Price</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PROPERTY GRID (Exact match to Screenshot 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-lg font-serif text-[#16382E]">No properties match your filter criteria.</p>
            <p className="text-xs text-gray-500 mt-1 mb-4">Try clearing filters or search keywords.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Properties');
                setSearchQuery('');
                setPriceSort('all');
              }}
              className="bg-[#B68A3C] text-white text-xs font-semibold px-4 py-2 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={onSelectProperty}
                isWishlisted={wishlist.includes(prop.id)}
                onToggleWishlist={onToggleWishlist}
                isCompared={compareList.includes(prop.id)}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. BOTTOM CTA BANNER WITH TRUST BADGES (Exact match to Screenshot 4) */}
      <section className="bg-[#16382E] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-8 border-t border-[#B68A3C]/30">
        {/* Peacock feather graphic background right */}
        <div className="absolute right-0 top-0 bottom-0 w-96 opacity-15 pointer-events-none hidden md:block">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <circle cx="100" cy="100" r="90" stroke="#B68A3C" strokeWidth="2" />
            <ellipse cx="120" cy="80" rx="40" ry="60" stroke="#B68A3C" strokeWidth="2" fill="#0D5C3A" />
            <circle cx="120" cy="80" r="25" fill="#0284C7" />
            <circle cx="120" cy="80" r="12" fill="#EAB308" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[#B68A3C] text-xs font-serif uppercase tracking-widest font-semibold block">
                Looking for the right property?
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-white">
                Let's Find Your Perfect Space in Vrindavan Dham
              </h2>
              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-xl">
                Our team is here to guide you at every step — from property selection to registration, with complete transparency and trust.
              </p>
            </div>

            <button
              onClick={() => onOpenEnquiry()}
              id="properties-cta-consultation-btn"
              className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-7 py-3.5 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg transition-all cursor-pointer shrink-0"
            >
              <span>Schedule a Property Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Trust Badges matching Screenshot 4 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            {/* Badge 1 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#B68A3C] shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-white/90">Trusted Guidance</span>
            </div>

            {/* Badge 2 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#B68A3C] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-white/90">Transparent Deals</span>
            </div>

            {/* Badge 3 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#B68A3C] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-white/90">Prime Locations</span>
            </div>

            {/* Badge 4 */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#B68A3C] shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-white/90">Long-Term Value</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
