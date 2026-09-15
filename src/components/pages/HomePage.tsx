import React from 'react';
import { Property, ActivePage } from '../../types';
import { ArrowRight, MapPin, ShieldCheck, Users, TrendingUp, Sparkles } from 'lucide-react';

interface HomePageProps {
  properties: Property[];
  onNavigate: (page: ActivePage, filter?: string) => void;
  onSelectProperty: (slug: string) => void;
  onOpenEnquiry: (interest?: string) => void;
  photos?: Record<string, string>;
}

export const HomePage: React.FC<HomePageProps> = ({
  properties,
  onNavigate,
  onSelectProperty,
  onOpenEnquiry,
  photos,
}) => {
  return (
    <div className="min-h-screen bg-[#F8F6F1]">
      {/* 1. HERO SECTION (Exact match to User Reference Image) */}
      <section className="relative min-h-[580px] md:min-h-[660px] lg:min-h-[700px] flex items-center bg-[#181614] overflow-hidden">
        {/* Authentic Vrindavan Ghat & Temple Sunset Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={photos?.hero_background || "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=2000&q=85"}
            alt="Vrindavan Temples and Holy Yamuna Ghat at Golden Sunset"
            className="w-full h-full object-cover object-[center_35%] opacity-100"
            referrerPolicy="no-referrer"
          />
          {/* Subtle directional dark scrim on left for crystal-clear text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 via-45% to-transparent pointer-events-none" />
          {/* Gentle vertical vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/15 pointer-events-none" />
        </div>

        {/* Radha Radha Devnagari Calligraphy (Top Right in warm terracotta sepia tone as in reference) */}
        <div className="absolute top-8 right-6 sm:top-10 sm:right-10 md:top-14 md:right-16 z-10 pointer-events-none select-none">
          <span className="font-devanagari text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#6E4226]/85 tracking-widest drop-shadow-xs">
            राधे राधे
          </span>
        </div>

        {/* Hero Content (Left aligned as in reference image) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="max-w-2xl text-white space-y-5">
            <div>
              <span className="text-white/90 text-xs sm:text-sm font-semibold tracking-widest uppercase">
                VDPD
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.16]">
              Find Your Place in <br className="hidden sm:inline" />
              the Divine City
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/95 font-light leading-relaxed max-w-xl">
              Premium residential plots, villas & properties in Vrindavan
            </p>

            <p className="text-xs sm:text-sm text-white/80 font-normal">
              Trusted Property & Development Solutions in Vrindavan Dham
            </p>

            {/* Action buttons matching the screenshot */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('properties')}
                id="hero-explore-properties-btn"
                className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-6 py-3 rounded-md text-xs sm:text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                id="hero-contact-btn"
                className="border border-white/70 hover:border-white text-white hover:bg-white/10 px-6 py-3 rounded-md text-xs sm:text-sm font-medium transition-all cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROPERTIES (Exact match to Screenshot 2) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-px w-8 bg-[#B68A3C]" />
            <span className="text-xs font-serif uppercase tracking-widest text-[#B68A3C] font-semibold">
              Featured Properties
            </span>
            <span className="h-px w-8 bg-[#B68A3C]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#16382E] tracking-tight">
            Your Dream Property Awaits
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Be it a home, an investment or a place of peace — we have the right property for you in Vrindavan.
          </p>
        </div>

        {/* 3 Categories matching screenshot 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Premium Residential Plots */}
          <div className="bg-white rounded-xl overflow-hidden border border-[#B68A3C]/20 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="relative h-56 overflow-hidden">
              <img
                src={photos?.home_cat_plots || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"}
                alt="Premium Residential Plots"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#16382E] mb-2 group-hover:text-[#B68A3C] transition-colors">
                  Premium Residential Plots
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Prime locations with excellent connectivity and growth potential.
                </p>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => onNavigate('properties', 'Residential Plots')}
                  className="text-xs font-semibold text-[#B68A3C] hover:text-[#9E752D] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Properties</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Luxury Villas */}
          <div className="bg-white rounded-xl overflow-hidden border border-[#B68A3C]/20 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="relative h-56 overflow-hidden">
              <img
                src={photos?.home_cat_villas || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"}
                alt="Luxury Villas"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#16382E] mb-2 group-hover:text-[#B68A3C] transition-colors">
                  Luxury Villas
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Modern homes designed for comfortable and peaceful living.
                </p>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => onNavigate('properties', 'Villas')}
                  className="text-xs font-semibold text-[#B68A3C] hover:text-[#9E752D] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Properties</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Investment Properties */}
          <div className="bg-white rounded-xl overflow-hidden border border-[#B68A3C]/20 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="relative h-56 overflow-hidden">
              <img
                src={photos?.home_cat_investment || "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80"}
                alt="Investment Properties"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#16382E] mb-2 group-hover:text-[#B68A3C] transition-colors">
                  Investment Properties
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Strategic real-estate opportunities in Vrindavan.
                </p>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => onNavigate('properties', 'Investment Properties')}
                  className="text-xs font-semibold text-[#B68A3C] hover:text-[#9E752D] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Properties</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE VDPD (Exact match to Screenshot 2) */}
      <section className="py-20 bg-white border-y border-[#B68A3C]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Intro */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-serif uppercase tracking-widest text-[#B68A3C] font-semibold block">
                Why Choose VDPD
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#16382E] leading-tight">
                Your Trusted <br className="hidden sm:block" />Real Estate Partner
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                At Vrindavan Dham Property & Developers, we are committed to helping families, investors and devotees find the right property in and around Vrindavan Dham.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onOpenEnquiry()}
                  className="bg-[#16382E] hover:bg-[#112a23] text-white px-6 py-3 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Speak with our Experts</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B68A3C]" />
                </button>
              </div>
            </div>

            {/* Right Column: 2x2 Grid of Feature Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Feature 1: Prime Locations */}
              <div className="bg-[#F8F6F1] p-6 rounded-xl border border-[#B68A3C]/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#B68A3C]/15 text-[#B68A3C] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#16382E] mb-1">
                    Prime Locations
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Properties selected in promising areas of Vrindavan.
                  </p>
                </div>
              </div>

              {/* Feature 2: Transparent Deals */}
              <div className="bg-[#F8F6F1] p-6 rounded-xl border border-[#B68A3C]/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#B68A3C]/15 text-[#B68A3C] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#16382E] mb-1">
                    Transparent Deals
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Clear documentation and straightforward transactions.
                  </p>
                </div>
              </div>

              {/* Feature 3: Trusted Guidance */}
              <div className="bg-[#F8F6F1] p-6 rounded-xl border border-[#B68A3C]/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#B68A3C]/15 text-[#B68A3C] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#16382E] mb-1">
                    Trusted Guidance
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Professional assistance from property selection to registration.
                  </p>
                </div>
              </div>

              {/* Feature 4: Long-Term Value */}
              <div className="bg-[#F8F6F1] p-6 rounded-xl border border-[#B68A3C]/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#B68A3C]/15 text-[#B68A3C] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#16382E] mb-1">
                    Long-Term Value
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Properties selected with both lifestyle and investment potential in mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT VDPD (Exact match to Screenshot 2) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Image (Holy Ghat of Vrindavan) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src={photos?.home_about_story || "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80"}
                alt="Holy Temples of Vrindavan by the Sacred River"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-serif text-[#16382E] font-semibold shadow-xs">
                श्री वृन्दावन धाम
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs font-serif uppercase tracking-widest text-[#B68A3C] font-semibold block mb-1">
                About VDPD
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#16382E] leading-tight">
                Vrindavan Dham Property & Developers
              </h2>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              We are a dedicated real estate firm focused on providing the best property solutions in and around Vrindavan. With deep local knowledge, transparent dealings and a commitment to quality, we make your real-estate journey simple, secure and rewarding.
            </p>

            <div className="pt-2">
              <p className="font-serif italic text-xl text-[#16382E] font-medium leading-relaxed">
                More than Property.<br />
                It's a Connection to Vrindavan.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="border border-[#B68A3C] text-[#B68A3C] hover:bg-[#B68A3C] hover:text-white px-6 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section className="relative bg-[#181614] text-white py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={photos?.hero_background || "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=2000&q=85"}
            alt="Sacred Vrindavan Dham"
            className="w-full h-full object-cover object-[center_35%] opacity-35"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/85 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white tracking-wide">
              Your Vrindavan. Your Property. Your Future.
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1 font-light">
              Let's find the perfect property for you.
            </p>
          </div>

          <button
            onClick={() => onOpenEnquiry()}
            id="home-cta-consultation-btn"
            className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-7 py-3.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg transition-all cursor-pointer shrink-0"
          >
            <span>Schedule a Property Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
