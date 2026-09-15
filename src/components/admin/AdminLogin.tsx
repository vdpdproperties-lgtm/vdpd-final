import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { VDPDStore } from '../../services/store';
import { AdminUser } from '../../types';
import { Lock, Mail, ArrowRight, ShieldAlert, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToSite,
}) => {
  const [email, setEmail] = useState('admin@vdpd.in');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = VDPDStore.loginAdmin(email, password);
      setLoading(false);
      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setError(res.error || 'Invalid email or password. Please verify credentials.');
      }
    }, 300);
  };

  const handleSelectDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#16382E] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background sacred art */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sacred-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="15" fill="none" stroke="#B68A3C" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sacred-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBackToSite}
            className="text-xs text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Website</span>
          </button>
          <span className="text-[11px] text-[#B68A3C] font-mono">SECURE ADMIN v2.5</span>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-[#B68A3C]/30 overflow-hidden p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <Logo variant="dark" size="md" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#16382E]">
              Administrator Portal
            </h2>
            <p className="text-xs text-gray-500">
              Sign in to manage Vrindavan properties, projects, and leads.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B68A3C] hover:bg-[#9E752D] text-white py-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? <span>Verifying Credentials...</span> : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Login Accounts Quick-Select */}
          <div className="p-3.5 bg-[#F8F6F1] rounded-xl border border-[#B68A3C]/30 text-[11px] space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[#16382E]">Click to Test Different Roles:</p>
              <span className="text-[10px] text-[#B68A3C] font-mono">RBAC DEMO</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => handleSelectDemo('admin@vdpd.in', 'admin123')}
                className="text-left px-2.5 py-1.5 rounded-md bg-white border border-gray-200 hover:border-[#B68A3C] hover:bg-[#F8F6F1] transition-all flex items-center justify-between cursor-pointer"
              >
                <div>
                  <span className="font-semibold text-[#16382E] block">✦ Super Administrator</span>
                  <span className="text-gray-500 text-[10px]">admin@vdpd.in / admin123 (Full Access)</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">All Access</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemo('pooja.sales@vdpd.in', 'sales123')}
                className="text-left px-2.5 py-1.5 rounded-md bg-white border border-gray-200 hover:border-[#B68A3C] hover:bg-[#F8F6F1] transition-all flex items-center justify-between cursor-pointer"
              >
                <div>
                  <span className="font-semibold text-[#16382E] block">Sub-Admin: Sales Executive</span>
                  <span className="text-gray-500 text-[10px]">pooja.sales@vdpd.in / sales123 (Leads & Plots)</span>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">Restricted</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemo('content@vdpd.in', 'content123')}
                className="text-left px-2.5 py-1.5 rounded-md bg-white border border-gray-200 hover:border-[#B68A3C] hover:bg-[#F8F6F1] transition-all flex items-center justify-between cursor-pointer"
              >
                <div>
                  <span className="font-semibold text-[#16382E] block">Sub-Admin: Content Editor</span>
                  <span className="text-gray-500 text-[10px]">content@vdpd.in / content123 (Blogs & Photos)</span>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">Restricted</span>
              </button>
            </div>
            <p className="text-[10px] text-gray-500 italic text-center pt-0.5">
              Super Admin can create additional sub-users with custom permissions in the portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
