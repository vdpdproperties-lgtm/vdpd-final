import React from 'react';
import { Property } from '../../types';
import { X, Trash2, Check, ArrowRight, IndianRupee, Maximize2, MapPin } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onSelectProperty: (slug: string) => void;
  onOpenEnquiry: (interest: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  properties,
  onRemove,
  onClear,
  onSelectProperty,
  onOpenEnquiry,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-[#B68A3C]/30 overflow-hidden flex flex-col max-h-[90vh]"
        id="compare-modal"
      >
        {/* Header */}
        <div className="bg-[#16382E] text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[#B68A3C] text-xs font-serif uppercase tracking-widest block">
              VDPD Property Intelligence
            </span>
            <h3 className="font-serif text-2xl font-bold">
              Compare Properties ({properties.length}/3)
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {properties.length > 0 && (
              <button
                onClick={onClear}
                className="text-xs text-white/70 hover:text-white flex items-center gap-1 border border-white/20 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {properties.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              <p className="text-lg font-serif text-gray-700 mb-2">No properties selected for comparison yet</p>
              <p className="text-sm">Click "Compare" on any property card to compare features side-by-side.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-3 w-48 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Property Details
                    </th>
                    {properties.map(p => (
                      <th key={p.id} className="p-3 min-w-[240px] align-top">
                        <div className="relative group bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <button
                            onClick={() => onRemove(p.id)}
                            className="absolute top-2 right-2 bg-white/90 text-red-600 hover:bg-red-50 p-1.5 rounded-full shadow-xs transition-colors"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <img
                            src={p.featuredImage}
                            alt={p.title}
                            className="w-full h-28 object-cover rounded-lg mb-2"
                            referrerPolicy="no-referrer"
                          />
                          <h4 
                            onClick={() => {
                              onClose();
                              onSelectProperty(p.slug);
                            }}
                            className="font-serif font-bold text-base text-[#16382E] hover:text-[#B68A3C] cursor-pointer line-clamp-1"
                          >
                            {p.title}
                          </h4>
                          <span className="inline-block mt-1 text-[11px] bg-[#16382E]/10 text-[#16382E] font-medium px-2 py-0.5 rounded">
                            {p.propertyType}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Price */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Price Guide</td>
                    {properties.map(p => (
                      <td key={p.id} className="p-3 font-bold text-[#16382E] text-base">
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4 text-[#B68A3C]" />
                          <span>{p.priceDisplay.replace('₹', '').trim()}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Area */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Plot / Built Area</td>
                    {properties.map(p => (
                      <td key={p.id} className="p-3 text-gray-800">
                        <div className="flex items-center gap-1">
                          <Maximize2 className="w-3.5 h-3.5 text-[#B68A3C]" />
                          <span>{p.area}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Location */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Location</td>
                    {properties.map(p => (
                      <td key={p.id} className="p-3 text-gray-700">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#B68A3C]" />
                          <span>{p.location}</span>
                        </div>
                        {p.address && <p className="text-xs text-gray-500 mt-0.5">{p.address}</p>}
                      </td>
                    ))}
                  </tr>

                  {/* Status */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Availability Status</td>
                    {properties.map(p => (
                      <td key={p.id} className="p-3">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-md font-medium">
                          {p.status}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* RERA Approval */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">RERA Compliance</td>
                    {properties.map(p => (
                      <td key={p.id} className="p-3 text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Verified ({p.reraNumber || 'UPRERA/2025'})</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Distance to Banke Bihari */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Key Temple Proximity</td>
                    {properties.map(p => (
                      <td key={p.id} className="p-3 text-xs space-y-1">
                        {p.landmarkDistances?.map((lm, idx) => (
                          <div key={idx} className="flex items-center justify-between text-gray-600">
                            <span>{lm.landmark}:</span>
                            <span className="font-semibold text-gray-800">{lm.distance}</span>
                          </div>
                        )) || <span className="text-gray-400">Within 3-5 km of sanctum</span>}
                      </td>
                    ))}
                  </tr>

                  {/* Key Amenities */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Featured Amenities</td>
                    {properties.map(p => (
                      <td key={p.id} className="p-3 text-xs">
                        <ul className="space-y-1">
                          {p.amenities.slice(0, 4).map((am, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-gray-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#B68A3C]" />
                              <span>{am}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Actions */}
                  <tr>
                    <td className="p-3 font-semibold text-gray-700 bg-gray-50/50">Actions</td>
                    {properties.map(p => (
                      <td key={p.id} className="p-3">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => {
                              onClose();
                              onOpenEnquiry(p.title);
                            }}
                            className="w-full bg-[#B68A3C] hover:bg-[#9E752D] text-white py-2 rounded-lg text-xs font-semibold text-center transition-colors"
                          >
                            Inquire for this
                          </button>
                          <button
                            onClick={() => {
                              onClose();
                              onSelectProperty(p.slug);
                            }}
                            className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 py-1.5 rounded-lg text-xs font-medium text-center flex items-center justify-center gap-1"
                          >
                            <span>Full Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
