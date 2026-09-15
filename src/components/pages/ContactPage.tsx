import React, { useState } from 'react';
import { SiteSettings, FAQ } from '../../types';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Home, 
  FileText, 
  Compass, 
  TrendingUp,
  CheckCircle2,
  Send
} from 'lucide-react';
import { VDPDStore } from '../../services/store';

interface ContactPageProps {
  settings: SiteSettings;
  faqs: FAQ[];
  onOpenEnquiry: () => void;
  photos?: Record<string, string>;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  settings,
  faqs,
  onOpenEnquiry,
  photos,
}) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [propertyInterest, setPropertyInterest] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobileNumber) return;

    VDPDStore.addLead({
      name: fullName,
      phone: mobileNumber,
      email: emailAddress || `${mobileNumber}@client.vdpd.in`,
      propertyInterest: propertyInterest || 'General Inquiry',
      message: message || 'Inquiry from Contact Us page.'
    });

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1]">
      {/* 1. HERO BANNER (Warm Sunset Style matching Home Hero) */}
      <section className="relative min-h-[480px] sm:min-h-[520px] flex items-center bg-[#181614] text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Vrindavan Ghat & Temple Sunset Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={photos?.contact_hero || "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=2000&q=85"}
            alt="Vrindavan Sacred Sunset"
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

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto py-16 w-full space-y-4">
          <span className="text-[#B68A3C] text-xs font-serif uppercase tracking-widest font-semibold block">
            Contact VDPD
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
            Get in Touch<br />With Us
          </h1>

          <p className="text-sm sm:text-base text-white/90 max-w-xl font-light leading-relaxed">
            We're here to help you find the perfect property in Vrindavan. Connect with our team for property inquiries, site visits, and investment guidance.
          </p>

          <p className="text-xs text-white/80">
            Trusted Property Experts in Vrindavan Dham
          </p>

          {/* Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenEnquiry}
              id="contact-hero-visit-btn"
              className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-6 py-3 rounded-md text-xs sm:text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Schedule a Visit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={`tel:${settings.phonePrimary}`}
              id="contact-hero-call-btn"
              className="border border-white/70 hover:border-white text-white hover:bg-white/10 px-6 py-3 rounded-md text-xs sm:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. CONTACT DETAILS CARDS (Exact match to Screenshot 1) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="h-px w-6 bg-[#B68A3C]" />
            <span className="text-xs font-serif uppercase tracking-widest text-[#B68A3C] font-semibold">
              Contact Details
            </span>
            <span className="h-px w-6 bg-[#B68A3C]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#16382E]">
            We’re Always Ready to Assist You
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Reach out to us through any of the following channels. Our team will be happy to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Visit Our Office */}
          <div className="bg-white p-6 rounded-xl border border-[#B68A3C]/20 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#B68A3C]/15 text-[#B68A3C] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <h4 className="font-serif font-bold text-sm text-[#16382E]">Visit Our Office</h4>
              <p className="text-gray-700 font-medium">Vrindavan Dham Property & Developers</p>
              <p className="text-gray-500">Vrindavan, Uttar Pradesh</p>
              <p className="text-gray-400 text-[11px]">Near Major Property Locations</p>
            </div>
          </div>

          {/* Card 2: Call Us */}
          <div className="bg-white p-6 rounded-xl border border-[#B68A3C]/20 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#B68A3C]/15 text-[#B68A3C] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <h4 className="font-serif font-bold text-sm text-[#16382E]">Call Us</h4>
              <p className="text-gray-800 font-semibold">{settings.phonePrimary}</p>
              <p className="text-gray-800 font-semibold">{settings.phoneSecondary}</p>
              <p className="text-gray-400 text-[11px]">Available 9 AM – 7 PM</p>
            </div>
          </div>

          {/* Card 3: Email Us */}
          <div className="bg-white p-6 rounded-xl border border-[#B68A3C]/20 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#B68A3C]/15 text-[#B68A3C] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <h4 className="font-serif font-bold text-sm text-[#16382E]">Email Us</h4>
              <p className="text-gray-800">{settings.emailPrimary}</p>
              <p className="text-gray-800">{settings.emailSecondary}</p>
              <p className="text-gray-400 text-[11px]">Quick Response Guaranteed</p>
            </div>
          </div>

          {/* Card 4: Working Hours */}
          <div className="bg-white p-6 rounded-xl border border-[#B68A3C]/20 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#B68A3C]/15 text-[#B68A3C] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1">
              <h4 className="font-serif font-bold text-sm text-[#16382E]">Working Hours</h4>
              <p className="text-gray-800 font-medium">Monday – Saturday</p>
              <p className="text-gray-600">9:00 AM – 7:00 PM</p>
              <p className="text-gray-400 text-[11px]">Sunday By Appointment</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEND US A MESSAGE FORM (Exact match to Screenshot 1) */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl overflow-hidden border border-[#B68A3C]/20 shadow-md grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Beautiful Ghat Photo */}
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-full">
            <img
              src={photos?.contact_office || "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80"}
              alt="Vrindavan Temple Ghat"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <span className="text-[#E5C378] font-serif text-sm tracking-widest">॥ राधे राधे ॥</span>
              <p className="font-serif text-lg font-bold">Divine Living in Vrindavan Dham</p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-serif uppercase tracking-widest text-[#B68A3C] font-semibold">
                  Send Us a Message
                </span>
                <span className="h-px w-8 bg-[#B68A3C]" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#16382E]">
                Let’s Discuss Your Property Requirements
              </h3>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-[#F8F6F1] rounded-xl border border-[#B68A3C]/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#B68A3C] mx-auto" />
                <h4 className="font-serif font-bold text-lg text-[#16382E]">Inquiry Successfully Sent</h4>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Thank you, {fullName}. Our Vrindavan property relationship manager will contact you at {mobileNumber} shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-[#B68A3C] hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Property Interest
                    </label>
                    <select
                      value={propertyInterest}
                      onChange={(e) => setPropertyInterest(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] text-gray-700"
                    >
                      <option value="">Select an option</option>
                      <option value="Residential Plots">Residential Plots</option>
                      <option value="Luxury Villas">Luxury Villas</option>
                      <option value="Investment Properties">Investment Properties</option>
                      <option value="Commercial Spaces">Commercial Spaces</option>
                      <option value="Farmhouse & Retreat Land">Farmhouse & Retreat Land</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-send-inquiry-btn"
                  className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-7 py-3 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Send Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE VDPD (Exact match to Screenshot 1) */}
      <section className="py-16 bg-white border-y border-[#B68A3C]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-1">
              <span className="h-px w-6 bg-[#B68A3C]" />
              <span className="text-xs font-serif uppercase tracking-widest text-[#B68A3C] font-semibold">
                Why Choose VDPD
              </span>
              <span className="h-px w-6 bg-[#B68A3C]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#16382E]">
              Expert Guidance at Every Step
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Item 1: Property Consultation */}
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#F8F6F1] border border-[#B68A3C]/20 text-[#B68A3C] flex items-center justify-center shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#16382E] mb-1">Property Consultation</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Personalized recommendations based on your needs.
                </p>
              </div>
            </div>

            {/* Item 2: Documentation Support */}
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#F8F6F1] border border-[#B68A3C]/20 text-[#B68A3C] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#16382E] mb-1">Documentation Support</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Transparent assistance from inquiry to registration.
                </p>
              </div>
            </div>

            {/* Item 3: Site Visit Assistance */}
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#F8F6F1] border border-[#B68A3C]/20 text-[#B68A3C] flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#16382E] mb-1">Site Visit Assistance</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Guided visits to shortlisted properties.
                </p>
              </div>
            </div>

            {/* Item 4: Investment Advisory */}
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#F8F6F1] border border-[#B68A3C]/20 text-[#B68A3C] flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#16382E] mb-1">Investment Advisory</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Insights on high-growth opportunities in Vrindavan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOCATION MAP CARD & FAQ ACCORDION (Exact match to Screenshot 1) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Our Location */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-xs font-serif uppercase tracking-widest text-[#B68A3C] font-semibold block mb-1">
                Our Location
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#16382E]">
                Visit Our Office
              </h3>
            </div>

            {/* Map Graphic with Landmarks */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xs relative">
              <div className="h-60 bg-blue-50/50 relative overflow-hidden flex items-center justify-center">
                {/* Embedded styled map frame */}
                <iframe
                  title="Vrindavan Map"
                  src="https://maps.google.com/maps?q=Prem%20Mandir,%20Vrindavan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              <div className="p-4 bg-white border-t border-gray-100 space-y-2 text-xs">
                <h4 className="font-serif font-bold text-sm text-[#16382E]">
                  Vrindavan Dham Property & Developers
                </h4>
                <p className="text-gray-600">{settings.address}</p>
                <div className="flex flex-wrap items-center gap-4 pt-1 text-gray-700 font-medium">
                  <a href={`tel:${settings.phonePrimary}`} className="flex items-center gap-1 hover:text-[#B68A3C]">
                    <Phone className="w-3.5 h-3.5 text-[#B68A3C]" />
                    <span>{settings.phonePrimary}</span>
                  </a>
                  <a href={`mailto:${settings.emailPrimary}`} className="flex items-center gap-1 hover:text-[#B68A3C]">
                    <Mail className="w-3.5 h-3.5 text-[#B68A3C]" />
                    <span>{settings.emailPrimary}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Frequently Asked Questions Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-serif uppercase tracking-widest text-[#B68A3C] font-semibold block mb-1">
                Frequently Asked Questions
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#16382E]">
                Your Questions, Our Answers
              </h3>
            </div>

            <div className="space-y-3 pt-2">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-serif font-semibold text-sm text-[#16382E] hover:text-[#B68A3C] transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#B68A3C] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-2 font-normal">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER (Exact match to Screenshot 1) */}
      <section className="bg-[#16382E] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Peacock feather watermark graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-80 opacity-15 pointer-events-none hidden md:block">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <circle cx="100" cy="100" r="80" stroke="#B68A3C" strokeWidth="2" />
            <circle cx="100" cy="100" r="40" fill="#0D5C3A" />
            <circle cx="100" cy="100" r="20" fill="#0284C7" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Begin Your Vrindavan Property Journey Today
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1 font-light">
              Whether you're looking for a home, investment opportunity, or spiritual retreat, our team is ready to help.
            </p>
          </div>

          <button
            onClick={onOpenEnquiry}
            id="contact-cta-consultation-btn"
            className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-7 py-3.5 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg transition-all cursor-pointer shrink-0"
          >
            <span>Schedule Property Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
