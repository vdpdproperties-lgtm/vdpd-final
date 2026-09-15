import React from 'react';
import { TeamMember, ActivePage } from '../../types';
import { ArrowRight, MapPin, Handshake, TrendingUp, Sparkles, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  team: TeamMember[];
  onNavigate: (page: ActivePage) => void;
  onOpenEnquiry: () => void;
  photos?: Record<string, string>;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  team,
  onNavigate,
  onOpenEnquiry,
  photos,
}) => {
  return (
    <div className="min-h-screen bg-[#F8F6F1]">
      {/* 1. HERO BANNER (Warm Sunset Style matching Home Hero) */}
      <section className="relative bg-[#181614] text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={photos?.about_hero || "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=2000&q=85"}
            alt="Holy Vrindavan Temples at Sunset"
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
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/70">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <span>&gt;</span>
            <span className="text-[#B68A3C] font-medium">About Us</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            About Us
          </h1>

          <p className="text-sm sm:text-lg text-white/90 font-light max-w-xl leading-relaxed">
            More than just properties, we build a better tomorrow in Vrindavan.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY (Exact match to Screenshot 3) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-serif uppercase tracking-widest text-[#B68A3C] font-semibold">
                Our Story
              </span>
              <span className="h-px w-12 bg-[#B68A3C]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#16382E] leading-tight">
              Vrindavan Dham Property & Developers (VDPD)
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              Vrindavan Dham Property & Developers (VDPD) is a trusted name in real estate, committed to helping families, investors and devotees find the right property in and around the sacred land of Vrindavan.
            </p>

            <p className="text-sm text-gray-600 leading-relaxed">
              We understand that buying a property is not just a financial decision, it's an emotion, a vision and a step towards a better future. With deep local knowledge, transparent dealings and a customer-first approach, we make your real-estate journey simple, secure and rewarding.
            </p>

            <div className="pt-2">
              <p className="font-serif italic text-2xl text-[#16382E] font-medium leading-snug">
                Rooted in Tradition,<br />
                Focused on Your Future.
              </p>
            </div>
          </div>

          {/* Right Column: Photo Collage with Polaroids (Exact match to Screenshot 3) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Main Central Image */}
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src={photos?.about_story_main || "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80"}
                alt="Holy Temples of Vrindavan"
                className="w-full h-72 sm:h-80 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Overlapping Polaroid Snapshots on Right */}
            <div className="absolute -right-4 top-2 sm:-right-8 sm:-top-4 w-36 sm:w-44 bg-white p-2.5 rounded-lg shadow-2xl rotate-6 border border-gray-200 hidden sm:block">
              <img
                src={photos?.about_polaroid_1 || "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80"}
                alt="Temple Shikhara"
                className="w-full h-24 object-cover rounded"
                referrerPolicy="no-referrer"
              />
              <span className="block text-center text-[10px] font-serif text-[#16382E] mt-1.5 font-semibold">
                राधे राधे
              </span>
            </div>

            <div className="absolute -right-2 -bottom-6 sm:-right-4 sm:-bottom-8 w-40 sm:w-48 bg-white p-2.5 rounded-lg shadow-2xl -rotate-3 border border-gray-200 hidden sm:block">
              <img
                src={photos?.about_polaroid_2 || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"}
                alt="Holy Yamuna Ghat"
                className="w-full h-24 object-cover rounded"
                referrerPolicy="no-referrer"
              />
              <span className="block text-center text-[10px] font-serif text-[#16382E] mt-1.5 font-semibold">
                Yamuna Sanctuary
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR VALUES (Exact match to Screenshot 3) */}
      <section className="py-16 bg-white border-y border-[#B68A3C]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-xs font-serif uppercase tracking-widest text-[#B68A3C] font-semibold">
              Our Values
            </span>
            <span className="h-px w-12 bg-[#B68A3C]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1: Trust & Transparency (Lotus icon) */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#B68A3C]/15 text-[#B68A3C] flex items-center justify-center">
                {/* Spiritual Lotus Motif */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3C12 7 8 10 8 14C8 17 10 20 12 21C14 20 16 17 16 14C16 10 12 3 12 3Z" />
                  <path d="M8 14C5 12 3 14 3 17C3 19 5 21 8 21" />
                  <path d="M16 14C19 12 21 14 21 17C21 19 19 21 16 21" />
                </svg>
              </div>
              <h4 className="font-serif font-bold text-lg text-[#16382E]">
                Trust & Transparency
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Clear documentation and honest dealings at every step.
              </p>
            </div>

            {/* Value 2: Local Expertise (Map Pin) */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#B68A3C]/15 text-[#B68A3C] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#16382E]">
                Local Expertise
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                In-depth knowledge of Vrindavan's real estate landscape.
              </p>
            </div>

            {/* Value 3: Customer First (Handshake) */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#B68A3C]/15 text-[#B68A3C] flex items-center justify-center">
                <Handshake className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#16382E]">
                Customer First
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Personalized support from property selection to registration.
              </p>
            </div>

            {/* Value 4: Long-Term Value (Trending Bar Chart) */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#B68A3C]/15 text-[#B68A3C] flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-[#16382E]">
                Long-Term Value
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Properties that offer both lifestyle and investment potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR MISSION (Exact match to Screenshot 3 deep green banner) */}
      <section className="bg-[#16382E] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Peacock feather watermark graphic */}
        <div className="absolute right-4 bottom-0 w-72 h-72 opacity-20 pointer-events-none hidden md:block">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <circle cx="120" cy="100" r="70" stroke="#B68A3C" strokeWidth="2" />
            <ellipse cx="140" cy="80" rx="35" ry="50" fill="#0D5C3A" />
            <circle cx="140" cy="80" r="20" fill="#0284C7" />
            <circle cx="140" cy="80" r="10" fill="#B68A3C" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Mission */}
          <div className="md:col-span-7 space-y-3 border-l-2 border-[#B68A3C] pl-6">
            <span className="text-xs font-serif uppercase tracking-widest text-[#B68A3C] font-semibold block">
              Our Mission
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-bold leading-snug text-white">
              To create lasting value through real estate, rooted in the spirit of Vrindavan.
            </p>
          </div>

          {/* Right Column: Quote */}
          <div className="md:col-span-5 text-center md:text-right">
            <p className="font-serif italic text-2xl sm:text-3xl text-[#E5C378] font-medium leading-relaxed">
              “Your Dream Property in the Divine City.”
            </p>
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP TEAM */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-serif uppercase tracking-widest text-[#B68A3C] font-semibold block mb-1">
            Experienced Guardians
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#16382E]">
            Meet Our Leadership Team
          </h2>
          <p className="text-xs text-gray-600 mt-2">
            Decades of ethical development experience guiding thousands of devotees and investors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.id} className="bg-white rounded-xl overflow-hidden border border-[#B68A3C]/20 shadow-xs hover:shadow-lg transition-all p-5 flex flex-col items-center text-center">
              <img
                src={member.photo}
                alt={member.name}
                className="w-28 h-28 rounded-full object-cover border-2 border-[#B68A3C]/40 mb-4"
                referrerPolicy="no-referrer"
              />
              <h4 className="font-serif font-bold text-base text-[#16382E] mb-0.5">{member.name}</h4>
              <span className="text-[11px] font-semibold text-[#B68A3C] mb-2.5 block">{member.position}</span>
              <p className="text-xs text-gray-600 leading-relaxed font-light">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
