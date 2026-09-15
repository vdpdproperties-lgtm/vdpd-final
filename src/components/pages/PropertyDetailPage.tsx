import React, { useState } from 'react';
import { Property, ActivePage } from '../../types';
import { 
  MapPin, 
  Maximize2, 
  IndianRupee, 
  Heart, 
  Share2, 
  FileText, 
  ShieldCheck, 
  Check, 
  Send, 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  MessageCircle, 
  ArrowLeft, 
  Building,
  ExternalLink
} from 'lucide-react';
import { VDPDStore } from '../../services/store';

interface PropertyDetailPageProps {
  property: Property;
  allProperties: Property[];
  onBack: () => void;
  onSelectProperty: (slug: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onOpenEnquiry: (interest: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  allProperties,
  onBack,
  onSelectProperty,
  isWishlisted,
  onToggleWishlist,
  onOpenEnquiry,
}) => {
  const [activeImage, setActiveImage] = useState(property.featuredImage);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState(`I would like to inquire about ${property.title} in ${property.location}.`);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const images = property.gallery && property.gallery.length > 0 
    ? [property.featuredImage, ...property.gallery.filter(g => g !== property.featuredImage)]
    : [property.featuredImage];

  const relatedProperties = allProperties
    .filter(p => p.id !== property.id && (p.propertyType === property.propertyType || p.featured))
    .slice(0, 3);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    VDPDStore.addLead({
      name: inquiryName,
      phone: inquiryPhone,
      email: inquiryEmail || `${inquiryPhone}@client.vdpd.in`,
      propertyInterest: property.title,
      propertyId: property.id,
      message: inquiryMessage
    });
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-[#B68A3C]/20 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-xs font-semibold text-[#16382E] hover:text-[#B68A3C] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Properties</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(property.id)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                isWishlisted 
                  ? 'border-red-200 bg-red-50 text-red-600' 
                  : 'border-gray-200 text-gray-700 hover:border-[#B68A3C]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-600' : ''}`} />
              <span>{isWishlisted ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: property.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Property link copied to clipboard!');
                }
              }}
              className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:border-[#B68A3C] text-xs flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Title & Price Banner */}
        <div className="bg-white rounded-2xl p-6 border border-[#B68A3C]/20 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-[#16382E] text-white text-xs font-semibold px-3 py-0.5 rounded-md">
                {property.propertyType}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-md">
                {property.status}
              </span>
              {property.reraApproved && (
                <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> RERA Verified
                </span>
              )}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#16382E]">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <MapPin className="w-4 h-4 text-[#B68A3C]" />
              <span>{property.location}</span>
              {property.address && <span>• {property.address}</span>}
            </div>
          </div>

          <div className="flex flex-col md:items-end">
            <span className="text-xs uppercase text-gray-400 font-semibold tracking-wider">Investment Price</span>
            <div className="flex items-center gap-1 font-bold text-2xl sm:text-3xl text-[#16382E]">
              <IndianRupee className="w-6 h-6 text-[#B68A3C]" />
              <span>{property.priceDisplay.replace('₹', '').trim()}</span>
            </div>
            <span className="text-xs text-gray-500 mt-0.5">Plot / Area: {property.area}</span>
          </div>
        </div>

        {/* Two Columns: Left Content & Right Sticky Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery Section */}
            <div className="bg-white rounded-2xl p-4 border border-[#B68A3C]/20 shadow-xs space-y-3">
              <div className="h-80 sm:h-96 md:h-[420px] rounded-xl overflow-hidden bg-gray-100 relative">
                <img
                  src={activeImage}
                  alt={property.title}
                  className="w-full h-full object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        activeImage === img ? 'border-[#B68A3C] shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description & Overview */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#B68A3C]/20 shadow-xs space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16382E] border-b border-gray-100 pb-3">
                Property Overview
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed font-normal">
                {property.description}
              </p>
              {property.tagline && (
                <p className="font-serif italic text-base text-[#16382E] bg-[#F8F6F1] p-4 rounded-xl border border-[#B68A3C]/20">
                  "{property.tagline}"
                </p>
              )}
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#B68A3C]/20 shadow-xs space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16382E] border-b border-gray-100 pb-3">
                Features & Modern Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F6F1] border border-[#B68A3C]/10">
                    <div className="w-7 h-7 rounded-full bg-[#16382E] text-[#B68A3C] flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-gray-800">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Landmark Distance Highlights */}
            {property.landmarkDistances && property.landmarkDistances.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#B68A3C]/20 shadow-xs space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16382E] border-b border-gray-100 pb-3">
                  Strategic Location & Temple Proximities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  {property.landmarkDistances.map((dist, idx) => (
                    <div key={idx} className="bg-[#F8F6F1] p-4 rounded-xl text-center border border-[#B68A3C]/15">
                      <span className="text-xl sm:text-2xl font-bold text-[#16382E] block">
                        {dist.distance}
                      </span>
                      <span className="text-xs text-gray-600 mt-1 block">
                        {dist.landmark}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Simulated Interactive Location Map */}
                <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 relative h-64 bg-gray-100">
                  <iframe
                    title="Vrindavan Map Location"
                    src="https://maps.google.com/maps?q=Vrindavan,%20Mathura,%20Uttar%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Investment Highlights & Documents */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#B68A3C]/20 shadow-xs space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#16382E] border-b border-gray-100 pb-3">
                Investment Highlights & Verification
              </h3>
              <ul className="space-y-3 pt-2">
                {(property.investmentHighlights || [
                  '100% Clear Freehold Title with immediate Dakhil Kharij mutation',
                  'High appreciation zone near Yamuna Expressway & proposed Heritage City',
                  'Guaranteed legal scrutiny by senior Mathura Revenue Advocates'
                ]).map((hl, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-[#B68A3C] mt-1.5 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>

              {/* Download Brochure Box */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#16382E] to-[#1e4b3e] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-[#B68A3C]" />
                  <div>
                    <h5 className="font-serif font-bold text-sm">Download Official Project Brochure</h5>
                    <p className="text-[11px] text-white/80">Floor plans, master layout, and legal approvals (PDF, 4.2 MB)</p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenEnquiry(`Brochure Download for ${property.title}`)}
                  className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
                >
                  Request Download
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Consultation & Inquiry Form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#B68A3C]/30 shadow-lg sticky top-28">
              <span className="text-[#B68A3C] text-xs font-serif uppercase tracking-wider block font-semibold mb-1">
                Direct VDPD Assistance
              </span>
              <h3 className="font-serif text-xl font-bold text-[#16382E] mb-1">
                Inquire About This Property
              </h3>
              <p className="text-xs text-gray-500 mb-5">
                Our relationship manager will coordinate your private site visit and share detailed layout plans.
              </p>

              {isSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-emerald-900">Inquiry Logged</h4>
                  <p className="text-xs text-emerald-700">
                    We will call you at {inquiryPhone} to discuss this property.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radheshyam Sharma"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 uppercase mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 uppercase mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 uppercase mb-1">
                      Your Message
                    </label>
                    <textarea
                      rows={3}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#B68A3C] hover:bg-[#9E752D] text-white py-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              {/* Direct WhatsApp link */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col gap-2">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hare Krishna! I am interested in ${property.title} (${property.priceDisplay}). Please share available plot numbers / villa layout.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href="tel:+919876543210"
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B68A3C]" />
                  <span>Call +91 98765 43210</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#B68A3C]/20">
            <h3 className="font-serif text-2xl font-bold text-[#16382E] mb-6">
              Similar Properties in Vrindavan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProperties.map(rel => (
                <div 
                  key={rel.id} 
                  onClick={() => onSelectProperty(rel.slug)}
                  className="bg-white rounded-xl overflow-hidden border border-[#B68A3C]/20 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <img
                    src={rel.featuredImage}
                    alt={rel.title}
                    className="w-full h-40 object-cover rounded-lg mb-3 group-hover:scale-102 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[11px] font-semibold text-[#B68A3C] uppercase">{rel.propertyType}</span>
                  <h4 className="font-serif font-bold text-base text-[#16382E] group-hover:text-[#B68A3C] transition-colors line-clamp-1">
                    {rel.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-xs">
                    <span className="text-gray-500">{rel.area}</span>
                    <span className="font-bold text-[#16382E]">{rel.priceDisplay}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
