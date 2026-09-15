import React, { useState } from 'react';
import { BlogPost, ActivePage } from '../../types';
import { Calendar, User, ArrowRight, Share2, Clock, X, MessageCircle } from 'lucide-react';

interface BlogPageProps {
  blogs: BlogPost[];
  onOpenEnquiry: (interest?: string) => void;
  onNavigate: (page: ActivePage) => void;
  photos?: Record<string, string>;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  blogs,
  onOpenEnquiry,
  onNavigate,
  photos,
}) => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  return (
    <div className="min-h-screen bg-[#F8F6F1]">
      {/* Hero (Warm Sunset Style matching Home Hero) */}
      <section className="relative bg-[#181614] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={photos?.blog_hero || "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1800&q=80"}
            alt="VDPD Insights"
            className="w-full h-full object-cover object-[center_35%] opacity-100"
            referrerPolicy="no-referrer"
          />
          {/* Subtle directional dark scrim on left for crystal-clear text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 via-50% to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/15 pointer-events-none" />
        </div>

        {/* Radha Radha Devnagari Calligraphy (Top Right in warm terracotta sepia tone) */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-10 md:top-10 md:right-16 z-10 pointer-events-none select-none">
          <span className="font-devanagari text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#6E4226]/85 tracking-widest drop-shadow-xs">
            राधे राधे
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-3">
          <span className="text-[#B68A3C] text-xs font-serif uppercase tracking-widest block font-semibold">
            VDPD Insights & Market Reports
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            Vrindavan Real Estate Intelligence
          </h1>
          <p className="text-sm sm:text-base text-white/90 max-w-xl font-light">
            Stay updated with property trends, legal guidelines, and government infrastructure projects in Braj Dham.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#B68A3C]/20 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => setSelectedBlog(blog)}
            >
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3.5 left-3.5">
                  <span className="bg-[#16382E]/90 backdrop-blur-md text-[#B68A3C] text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#B68A3C]" />
                      <span>{blog.publishedAt}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#B68A3C]" />
                      <span>{blog.readTime || '4 min read'}</span>
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-[#16382E] group-hover:text-[#B68A3C] transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                  <span className="text-xs font-semibold text-[#B68A3C] flex items-center gap-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-xs text-gray-400">By {blog.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Blog Article Reader Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#B68A3C]/30 animate-in fade-in zoom-in-95">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={selectedBlog.featuredImage}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="bg-[#B68A3C] text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                  {selectedBlog.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                  {selectedBlog.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-white/80">
                  <span>By {selectedBlog.author}</span>
                  <span>•</span>
                  <span>{selectedBlog.publishedAt}</span>
                  <span>•</span>
                  <span>{selectedBlog.readTime}</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-sm text-gray-700 leading-relaxed space-y-4 whitespace-pre-line font-light">
                {selectedBlog.content}
              </div>

              {/* Consultation Box in Blog */}
              <div className="bg-[#F8F6F1] p-6 rounded-xl border border-[#B68A3C]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#16382E]">
                    Have Questions on Vrindavan Real Estate?
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Speak directly with our senior investment analysts and legal verifiers.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const title = selectedBlog.title;
                    setSelectedBlog(null);
                    onOpenEnquiry(`Consultation regarding: ${title}`);
                  }}
                  className="bg-[#B68A3C] hover:bg-[#9E752D] text-white text-xs font-semibold px-5 py-2.5 rounded-lg whitespace-nowrap"
                >
                  Consult an Advisor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
