import React, { useState } from 'react';
import { X, Send, CheckCircle2, Phone, Calendar, Mail, User, Building } from 'lucide-react';
import { VDPDStore } from '../../services/store';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInterest?: string;
  defaultPropertyId?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultInterest = '',
  defaultPropertyId,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyInterest, setPropertyInterest] = useState(defaultInterest || 'Residential Plots');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      VDPDStore.addLead({
        name,
        phone,
        email: email || `${phone}@client.vdpd.in`,
        propertyInterest: propertyInterest || 'General Inquiry',
        propertyId: defaultPropertyId,
        message: message || `Client requested site visit / consultation for ${propertyInterest}`
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#B68A3C]/30 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        id="enquiry-modal"
      >
        {/* Header with regal green accent */}
        <div className="bg-[#16382E] text-white p-6 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-[#B68A3C] text-xs font-serif uppercase tracking-widest block mb-1">
            Vrindavan Dham Property & Developers
          </span>
          <h3 className="font-serif text-2xl font-bold">
            Schedule a Property Consultation
          </h3>
          <p className="text-xs text-white/80 mt-1 font-light">
            Connect with our Vrindavan land experts for personalized site tours & legal clarity.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#16382E]/10 text-[#16382E] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-[#B68A3C]" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#16382E]">
              Radhe Radhe! Inquiry Received
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
              Thank you, <span className="font-semibold text-[#16382E]">{name}</span>. Our senior Vrindavan property advisor will call you at <span className="font-semibold text-[#16382E]">{phone}</span> shortly.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(
                  `Hare Krishna! I just submitted an inquiry for ${propertyInterest}. My name is ${name}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-2 shadow-sm"
              >
                Chat on WhatsApp Now
              </a>
              <button
                onClick={handleResetAndClose}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Radheshyam Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    placeholder="email@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Property Interest
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <select
                    value={propertyInterest}
                    onChange={(e) => setPropertyInterest(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] focus:bg-white transition-colors text-gray-700"
                  >
                    <option value="Residential Plots">Residential Plots</option>
                    <option value="Luxury Villas">Luxury Villas</option>
                    <option value="Strategic Investment Plots">Strategic Investment Plots</option>
                    <option value="Gated Township Plots">Gated Township Plots</option>
                    <option value="Commercial / Shop Spaces">Commercial Spaces</option>
                    <option value="Farmhouse & Retreat Land">Farmhouse & Retreat Land</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Preferred Visit Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] focus:bg-white transition-colors text-gray-700"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Requirements / Note
              </label>
              <textarea
                rows={3}
                placeholder="Tell us your budget, preferred location, or specific requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] focus:bg-white transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#B68A3C] hover:bg-[#9E752D] text-white py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Inquiry...</span>
                ) : (
                  <>
                    <span>Submit Inquiry & Book Consultation</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-center text-gray-400">
              🔒 100% Privacy Protected. No spam, only direct assistance from VDPD advisors.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
