import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, Check, X, Sparkles } from 'lucide-react';
import { vrindavanPhotoPresets } from '../../data/seedData';

interface AdminPhotoFieldProps {
  label: string;
  currentUrl: string;
  onChange: (url: string) => void;
  helpText?: string;
  recommendedAspect?: string;
}

export const AdminPhotoField: React.FC<AdminPhotoFieldProps> = ({
  label,
  currentUrl,
  onChange,
  helpText = 'Choose from authentic Vrindavan photography or upload your own file.',
  recommendedAspect = '16:9'
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'upload' | 'url'>('presets');
  const [urlInput, setUrlInput] = useState(currentUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, or WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (trimmed) {
      onChange(trimmed);
    }
  };

  return (
    <div className="space-y-3 bg-gray-50/80 p-3.5 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
            {label}
          </label>
          {helpText && <p className="text-[11px] text-gray-500 mt-0.5">{helpText}</p>}
        </div>
        <span className="text-[10px] bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium">
          Aspect {recommendedAspect}
        </span>
      </div>

      {/* Preview Section */}
      {currentUrl ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-white group shadow-2xs">
          <div className="aspect-video w-full max-h-44 overflow-hidden bg-gray-900/10">
            <img
              src={currentUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 bg-white text-gray-800 text-xs font-semibold rounded-md shadow-sm hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-[#B68A3C]" />
              <span>Replace File</span>
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-2.5 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-md shadow-sm hover:bg-red-700 flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
          <div className="p-2 bg-white flex items-center justify-between text-[11px] text-gray-600 border-t border-gray-100">
            <span className="truncate max-w-[80%] font-mono text-[10px] text-gray-500">
              {currentUrl.startsWith('data:') ? 'Local uploaded file (Data URL)' : currentUrl}
            </span>
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-red-600 hover:text-red-700 font-medium text-[11px] cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center bg-white hover:bg-amber-50/40 hover:border-[#B68A3C] transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-amber-50 text-[#B68A3C] flex items-center justify-center mx-auto mb-2">
            <ImageIcon className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-gray-800">Click to upload photo or select below</p>
          <p className="text-[11px] text-gray-500 mt-0.5">Supports PNG, JPG, or WebP</p>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Mode Switcher Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab('presets')}
          className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
            activeTab === 'presets'
              ? 'border-[#B68A3C] text-[#16382E]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B68A3C]" />
          <span>Vrindavan Gallery ({vrindavanPhotoPresets.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
            activeTab === 'upload'
              ? 'border-[#B68A3C] text-[#16382E]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload File</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
            activeTab === 'url'
              ? 'border-[#B68A3C] text-[#16382E]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Custom URL</span>
        </button>
      </div>

      {/* Tab 1: Presets Gallery */}
      {activeTab === 'presets' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1 bg-white rounded-lg border border-gray-200">
          {vrindavanPhotoPresets.map((preset, idx) => {
            const isSelected = currentUrl === preset.url;
            return (
              <div
                key={idx}
                onClick={() => onChange(preset.url)}
                className={`group relative rounded-lg overflow-hidden border text-left cursor-pointer transition-all hover:scale-[1.02] ${
                  isSelected
                    ? 'border-[#B68A3C] ring-2 ring-[#B68A3C]/30 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="aspect-video w-full bg-gray-100 overflow-hidden">
                  <img
                    src={preset.url}
                    alt={preset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div className="p-1.5 bg-white">
                  <span className="text-[9px] uppercase font-bold text-[#B68A3C] block truncate">
                    {preset.tag}
                  </span>
                  <p className="text-[10px] font-semibold text-gray-800 truncate">
                    {preset.title}
                  </p>
                </div>
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#B68A3C] text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Upload */}
      {activeTab === 'upload' && (
        <div className="p-4 bg-white rounded-lg border border-gray-200 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#16382E]/5 text-[#16382E] flex items-center justify-center mx-auto">
            <Upload className="w-5 h-5 text-[#B68A3C]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Select an image file from your device</p>
            <p className="text-[11px] text-gray-500">Supports JPG, PNG, WebP up to 5MB</p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-[#16382E] hover:bg-[#204a3e] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-[#B68A3C]" />
            <span>Browse Computer Files</span>
          </button>
        </div>
      )}

      {/* Tab 3: Custom URL */}
      {activeTab === 'url' && (
        <div className="p-3 bg-white rounded-lg border border-gray-200 space-y-2">
          <label className="block text-[11px] font-medium text-gray-600">
            Paste Web Image URL (HTTPS)
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 text-xs p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="px-3 py-2 bg-[#B68A3C] hover:bg-[#9E752D] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
