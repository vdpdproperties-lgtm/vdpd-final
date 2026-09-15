import React from 'react';
import { ActivePage } from '../../types';
import { 
  ShieldCheck, 
  MapPin, 
  TrendingUp, 
  FileCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Building,
  Landmark,
  Compass
} from 'lucide-react';

interface WhyVdpdPageProps {
  onNavigate: (page: ActivePage) => void;
  onOpenEnquiry: () => void;
  photos?: Record<string, string>;
}

export const WhyVdpdPage: React.FC<WhyVdpdPageProps> = ({
  onNavigate,
  onOpenEnquiry,
  photos,
}) => {
  return (
    <div className="min-h-screen bg-[#F8F6F1]">
      {/* Hero (Warm Sunset Style matching Home Hero) */}
      <section className="relative bg-[#181614] text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={photos?.why_vdpd_hero || "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1800&q=80"}
            alt="Why Choose VDPD"
            className="w-full h-full object-cover object-[center_35%] opacity-100"
            referrerPolicy="no-referrer"
          />
          {/* Subtle directional dark scrim on left for crystal-clear text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 via-50% to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/15 pointer-events-none" />
        </div>

        {/* Radha Radha Devnagari Calligraphy (Top Right in warm terracotta sepia tone) */}
        <div className="absolute top-8 right-6 sm:top-10 sm:right-10 md:top-12 md:right-16 z-10 pointer-events-none select-none">
          <span className="font-devanagari text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#6E4226]/85 tracking-widest drop-shadow-xs">
            राधे राधे
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-4">
          <span className="text-[#B68A3C] text-xs font-serif uppercase tracking-widest font-semibold block">
            Why Choose VDPD
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            The Gold Standard of Trust in Vrindavan Real Estate
          </h1>
          <p className="text-sm sm:text-lg text-white/90 max-w-2xl font-light leading-relaxed">
            Bridging spiritual devotion and high-yield wealth creation through vetted, clear-title properties in the sacred land of Sri Krishna.
          </p>
        </div>
      </section>

      {/* Main 4 Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white p-8 rounded-2xl border border-[#B68A3C]/20 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#16382E] text-[#B68A3C] flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-[#16382E]">
              100% Freehold & Mutation Verified
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Every parcel offered through VDPD undergoes thorough 30-year revenue title search by Mathura District court advocates. We assure clean 143 conversion, clear demarcation boundary stones, and immediate Dakhil Kharij registry.
            </p>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero disputed agricultural land boundaries</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Immediate registry and mutation support at sub-registrar</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-8 rounded-2xl border border-[#B68A3C]/20 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#16382E] text-[#B68A3C] flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-[#16382E]">
              Exponential Capital Appreciation
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Vrindavan is witnessing unprecedented infrastructure growth driven by the Banke Bihari Corridor, the UP Government's Heritage City project, and the Jewar International Airport corridor. Property values have appreciated 22-28% CAGR over the last 3 years.
            </p>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Proximity to Yamuna Expressway Exit 15 & 16</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>High demand for pilgrim guest houses & homestays</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-8 rounded-2xl border border-[#B68A3C]/20 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#16382E] text-[#B68A3C] flex items-center justify-center">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-[#16382E]">
              Spiritual Proximity to Key Sanctuaries
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Living in Vrindavan means hearing the divine temple bells and being minutes away from darshan. Our projects are positioned within comfortable reach of Sri Banke Bihari Mandir, Prem Mandir, Chandrodaya Temple, and ISKCON Vrindavan.
            </p>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Peaceful, satvik residential neighborhoods</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Direct connectivity via Chhatikara and Bhaktivedanta Swami Marg</span>
              </li>
            </ul>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white p-8 rounded-2xl border border-[#B68A3C]/20 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#16382E] text-[#B68A3C] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-[#16382E]">
              End-to-End NRI & Devotee Assistance
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Devotees living in the USA, UK, UAE, or other parts of India rely on our transparent remote onboarding. We offer video site tours, digital documentation, and Power of Attorney guidance so you can secure property seamlessly from anywhere in the world.
            </p>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Live WhatsApp video site walkthroughs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dedicated post-purchase registry and boundary possession service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-[#16382E] text-white p-8 sm:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Ready to Own Your Piece of Sri Vrindavan Dham?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1">
              Talk to our advisory team for personalized plot recommendations tailored to your budget.
            </p>
          </div>
          <button
            onClick={onOpenEnquiry}
            className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-7 py-3.5 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Schedule Site Visit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
