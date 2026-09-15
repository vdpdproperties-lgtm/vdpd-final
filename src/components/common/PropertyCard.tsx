import React from 'react';
import { Property } from '../../types';
import { MapPin, Maximize2, IndianRupee, Heart, ArrowRight, Scale, Check } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect: (slug: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  isCompared: boolean;
  onToggleCompare: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare,
}) => {
  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden border border-[#B68A3C]/15 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      id={`property-card-${property.id}`}
    >
      {/* Property Featured Image & Badges */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <img
          src={property.featuredImage}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Category Pill Tag (top-left) */}
        <div className="absolute top-3.5 left-3.5">
          <span className="bg-[#16382E]/90 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-md shadow-xs border border-white/10">
            {property.propertyType}
          </span>
        </div>

        {/* Status Badge (if fast selling or ready to move) */}
        {property.status && property.status !== 'Available' && (
          <div className="absolute top-3.5 right-3.5">
            <span className="bg-[#B68A3C] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow-xs">
              {property.status}
            </span>
          </div>
        )}

        {/* Quick Compare button badge */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(property.id);
          }}
          className={`absolute bottom-3 left-3 px-2 py-1 rounded text-xs flex items-center gap-1 transition-all ${
            isCompared 
              ? 'bg-[#16382E] text-[#B68A3C] font-semibold shadow-md' 
              : 'bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs'
          }`}
          title="Compare with other properties"
        >
          {isCompared ? <Check className="w-3 h-3 text-[#B68A3C]" /> : <Scale className="w-3 h-3" />}
          <span>{isCompared ? 'Comparing' : 'Compare'}</span>
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 
            onClick={() => onSelect(property.slug)}
            className="font-serif font-bold text-xl text-[#16382E] group-hover:text-[#B68A3C] transition-colors cursor-pointer line-clamp-1"
          >
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1.5 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#B68A3C] shrink-0" />
            <span>{property.location}</span>
          </div>

          {/* Short Excerpt */}
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
            {property.description}
          </p>
        </div>

        <div>
          {/* Key Spec Row (Area & Price) */}
          <div className="py-3 border-t border-b border-gray-100 flex items-center justify-between text-xs mb-4">
            {/* Area */}
            <div className="flex items-center gap-1.5 text-gray-700 font-medium">
              <Maximize2 className="w-3.5 h-3.5 text-[#B68A3C]" />
              <span>{property.area}</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-1 text-[#16382E] font-bold text-sm">
              <IndianRupee className="w-3.5 h-3.5 text-[#B68A3C]" />
              <span>{property.priceDisplay.replace('₹', '').trim()}</span>
            </div>
          </div>

          {/* Action Row matching screenshot */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => onSelect(property.slug)}
              id={`view-details-${property.id}`}
              className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shadow-xs group-hover:shadow cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Wishlist Heart Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(property.id);
              }}
              id={`wishlist-btn-${property.id}`}
              className={`p-2 rounded-lg border transition-all ${
                isWishlisted
                  ? 'border-red-200 bg-red-50 text-red-600'
                  : 'border-gray-200 hover:border-[#B68A3C] text-gray-400 hover:text-[#B68A3C]'
              }`}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
