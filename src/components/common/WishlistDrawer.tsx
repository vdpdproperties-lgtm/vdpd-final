import React from 'react';
import { Property } from '../../types';
import { X, Trash2, ArrowRight, IndianRupee, MapPin } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onRemove: (id: string) => void;
  onSelectProperty: (slug: string) => void;
  onOpenEnquiry: (interest: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  properties,
  onRemove,
  onSelectProperty,
  onOpenEnquiry,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-[#B68A3C]/20"
        id="wishlist-drawer"
      >
        {/* Drawer Header */}
        <div className="bg-[#16382E] text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[#B68A3C] text-xs font-serif uppercase tracking-widest block">
              Saved Collections
            </span>
            <h3 className="font-serif text-xl font-bold">
              Your Wishlist ({properties.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-4 flex-1 overflow-y-auto divide-y divide-gray-100">
          {properties.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              <p className="text-base font-serif text-gray-800 mb-1">Your wishlist is empty</p>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Click the heart icon on any plot or villa to save and track it here.
              </p>
            </div>
          ) : (
            properties.map(p => (
              <div key={p.id} className="py-4 flex gap-3 group">
                <img
                  src={p.featuredImage}
                  alt={p.title}
                  className="w-24 h-24 object-cover rounded-lg shrink-0 cursor-pointer"
                  onClick={() => {
                    onClose();
                    onSelectProperty(p.slug);
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        onClick={() => {
                          onClose();
                          onSelectProperty(p.slug);
                        }}
                        className="font-serif font-bold text-sm text-[#16382E] hover:text-[#B68A3C] cursor-pointer truncate"
                      >
                        {p.title}
                      </h4>
                      <button
                        onClick={() => onRemove(p.id)}
                        className="text-gray-400 hover:text-red-600 p-1"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#B68A3C]" />
                      <span className="truncate">{p.location}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#16382E] font-bold text-xs mt-1">
                      <IndianRupee className="w-3 h-3 text-[#B68A3C]" />
                      <span>{p.priceDisplay.replace('₹', '').trim()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenEnquiry(p.title);
                      }}
                      className="bg-[#B68A3C] hover:bg-[#9E752D] text-white text-[11px] font-semibold px-3 py-1 rounded-md transition-colors"
                    >
                      Inquire
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProperty(p.slug);
                      }}
                      className="text-gray-600 hover:text-[#16382E] text-[11px] font-medium flex items-center gap-0.5"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {properties.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={() => {
                onClose();
                onOpenEnquiry('Multiple Wishlist Properties');
              }}
              className="w-full bg-[#16382E] hover:bg-[#122e25] text-white py-3 rounded-lg text-xs font-semibold text-center shadow-md transition-colors"
            >
              Request Group Site Visit for Saved Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
