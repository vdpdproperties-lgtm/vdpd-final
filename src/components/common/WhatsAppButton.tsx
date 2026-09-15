import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '919876543210'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('Hare Krishna! I am interested in purchasing property in Vrindavan Dham. Please share current availability.');

  const handleSend = () => {
    const encoded = encodeURIComponent(userMsg);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick message popup card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-[#16382E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-semibold text-sm">VDPD Helpdesk</h5>
                <p className="text-[11px] text-[#B68A3C]">Typically replies in 5 mins</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-[#F8F6F1]">
            <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-xs text-xs text-gray-700 leading-relaxed border border-gray-100">
              🙏 <span className="font-semibold text-[#16382E]">Radhe Radhe!</span> Welcome to Vrindavan Dham Property & Developers. How can our team guide your property search today?
            </div>

            <div>
              <textarea
                rows={3}
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C] resize-none"
                placeholder="Type your message..."
              />
            </div>

            <button
              onClick={handleSend}
              className="w-full bg-[#25D366] hover:bg-[#20bd59] text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd59] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer relative group"
        aria-label="Contact us on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-3 bg-[#16382E] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md hidden sm:block">
          Chat with VDPD Advisor
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
      </button>
    </div>
  );
};
