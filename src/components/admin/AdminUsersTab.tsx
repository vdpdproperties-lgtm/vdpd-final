import React, { useState } from 'react';
import { AdminUser, AdminPermissions } from '../../types';
import { VDPDStore } from '../../services/store';
import { 
  Users, 
  UserPlus, 
  Shield, 
  ShieldCheck, 
  Key, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  AlertCircle, 
  Mail, 
  Phone, 
  Calendar,
  Lock,
  UserCheck,
  UserX,
  Sparkles,
  Search
} from 'lucide-react';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface AdminUsersTabProps {
  currentAdmin: AdminUser;
  onRefreshData: () => void;
}

const defaultPermissions: AdminPermissions = {
  canManageProperties: true,
  canManageProjects: false,
  canManageLeads: true,
  canManageBlogs: false,
  canManagePhotos: false,
  canManageFaqs: false,
  canManageSettings: false,
  canManageUsers: false,
};

export const AdminUsersTab: React.FC<AdminUsersTabProps> = ({
  currentAdmin,
  onRefreshData,
}) => {
  const [users, setUsers] = useState<AdminUser[]>(() => VDPDStore.getAdminUsers());
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    status: 'Active' | 'Inactive';
    permissions: AdminPermissions;
  }>({
    name: '',
    email: '',
    password: '',
    role: 'Sales Executive',
    phone: '',
    status: 'Active',
    permissions: defaultPermissions
  });

  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);

  const refreshUsers = () => {
    setUsers([...VDPDStore.getAdminUsers()]);
    onRefreshData();
  };

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Open Add Modal
  const handleOpenAddUser = () => {
    setEditingUserId(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'Sales Executive',
      phone: '',
      status: 'Active',
      permissions: {
        canManageProperties: true,
        canManageProjects: true,
        canManageLeads: true,
        canManageBlogs: false,
        canManagePhotos: false,
        canManageFaqs: false,
        canManageSettings: false,
        canManageUsers: false
      }
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditUser = (user: AdminUser) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      password: '', // Leave blank to retain existing
      role: user.role,
      phone: user.phone || '',
      status: user.status,
      permissions: { ...user.permissions }
    });
    setIsModalOpen(true);
  };

  // Apply quick presets
  const handleApplyPreset = (preset: 'sales' | 'content' | 'ops') => {
    if (preset === 'sales') {
      setFormData(prev => ({
        ...prev,
        role: 'Sales Executive',
        permissions: {
          canManageProperties: true,
          canManageProjects: true,
          canManageLeads: true,
          canManageBlogs: false,
          canManagePhotos: false,
          canManageFaqs: false,
          canManageSettings: false,
          canManageUsers: false
        }
      }));
    } else if (preset === 'content') {
      setFormData(prev => ({
        ...prev,
        role: 'Content & Media Editor',
        permissions: {
          canManageProperties: false,
          canManageProjects: false,
          canManageLeads: false,
          canManageBlogs: true,
          canManagePhotos: true,
          canManageFaqs: true,
          canManageSettings: false,
          canManageUsers: false
        }
      }));
    } else if (preset === 'ops') {
      setFormData(prev => ({
        ...prev,
        role: 'Operations Manager',
        permissions: {
          canManageProperties: true,
          canManageProjects: true,
          canManageLeads: true,
          canManageBlogs: true,
          canManagePhotos: true,
          canManageFaqs: true,
          canManageSettings: false,
          canManageUsers: false
        }
      }));
    }
  };

  // Save or Update User
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast('User name is required.', 'error');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      showToast('Valid user email is required.', 'error');
      return;
    }

    try {
      if (editingUserId) {
        // Editing existing user
        const existing = users.find(u => u.id === editingUserId);
        if (!existing) return;

        const updated: AdminUser = {
          ...existing,
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          role: formData.role.trim(),
          phone: formData.phone.trim(),
          status: formData.status,
          permissions: existing.isSuperAdmin ? existing.permissions : {
            ...formData.permissions,
            canManageUsers: false
          }
        };

        if (formData.password.trim()) {
          updated.password = formData.password.trim();
        }

        VDPDStore.saveAdminUser(updated);
        showToast(`Sub-admin user "${updated.name}" updated successfully!`);
      } else {
        // Creating new sub-user
        if (!formData.password.trim() || formData.password.length < 5) {
          showToast('Initial password must be at least 5 characters.', 'error');
          return;
        }

        VDPDStore.createSubAdminUser({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password.trim(),
          role: formData.role.trim() || 'Staff / Sub-Admin',
          phone: formData.phone.trim(),
          status: formData.status,
          permissions: formData.permissions
        });

        showToast(`New staff sub-admin "${formData.name}" created successfully!`);
      }

      setIsModalOpen(false);
      refreshUsers();
    } catch (err: any) {
      showToast(err.message || 'Error processing request.', 'error');
    }
  };

  // Toggle active / inactive status
  const handleToggleStatus = (user: AdminUser) => {
    if (user.isSuperAdmin) {
      showToast('Cannot suspend the Super Administrator account.', 'error');
      return;
    }

    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    VDPDStore.saveAdminUser({
      ...user,
      status: newStatus
    });
    showToast(`User ${user.name} is now ${newStatus}.`);
    refreshUsers();
  };

  // Delete sub-user
  const handleDeleteUser = (user: AdminUser) => {
    if (user.isSuperAdmin) {
      showToast('Cannot delete the Super Administrator account.', 'error');
      return;
    }
    setUserToDelete(user);
  };

  const handleConfirmDeleteUser = () => {
    if (!userToDelete) return;
    const res = VDPDStore.deleteAdminUser(userToDelete.id);
    if (res.success) {
      showToast(`Sub-admin "${userToDelete.name}" has been removed.`);
      refreshUsers();
    } else {
      showToast(res.error || 'Failed to delete user.', 'error');
    }
    setUserToDelete(null);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Toast */}
      {toastMessage && (
        <div className={`p-4 rounded-xl border text-xs flex items-center justify-between shadow-md transition-all ${
          toastMessage.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <div className="flex items-center gap-2">
            {toastMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span className="font-semibold">{toastMessage.text}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="opacity-60 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Banner & Stats */}
      <div className="bg-[#16382E] text-white rounded-2xl p-6 border border-[#B68A3C]/30 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#B68A3C] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              SUPER ADMIN PRIVILEGES
            </span>
            <span className="text-xs text-white/70">Role-Based Access Control (RBAC)</span>
          </div>
          <h2 className="font-serif text-2xl font-bold">Staff & Sub-Admin User Management</h2>
          <p className="text-xs text-white/75 max-w-2xl mt-1">
            Create secondary login accounts for your team. You control exactly what sections each staff member can access — whether it is only customer inquiries, properties, blog articles, or media photos.
          </p>
        </div>

        <button
          onClick={handleOpenAddUser}
          className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-5 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Create New Staff User</span>
        </button>
      </div>

      {/* Search & Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <p className="text-xs text-gray-500 font-semibold uppercase">Total Portal Accounts</p>
          <p className="text-2xl font-bold font-serif text-[#16382E] mt-1">{users.length}</p>
          <p className="text-[11px] text-gray-400 mt-1">1 Super Admin + {users.length - 1} Sub-Admins</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <p className="text-xs text-gray-500 font-semibold uppercase">Active Status</p>
          <p className="text-2xl font-bold font-serif text-emerald-700 mt-1">
            {users.filter(u => u.status === 'Active').length} Active
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            {users.filter(u => u.status === 'Inactive').length} Suspended accounts
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <p className="text-xs text-gray-500 font-semibold uppercase">Super Administrator</p>
          <p className="text-sm font-bold text-[#16382E] mt-1 truncate">{currentAdmin.name}</p>
          <p className="text-[11px] text-[#B68A3C] font-semibold mt-1">Unrestricted Master Control</p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search staff by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
          />
        </div>

        <span className="text-xs text-gray-500">
          Showing <strong>{filteredUsers.length}</strong> of {users.length} accounts
        </span>
      </div>

      {/* User Accounts List */}
      <div className="space-y-3">
        {filteredUsers.map(user => {
          const isCurrent = user.id === currentAdmin.id;
          return (
            <div
              key={user.id}
              className={`bg-white rounded-xl border p-5 transition-all shadow-xs ${
                user.isSuperAdmin
                  ? 'border-[#B68A3C]/40 bg-gradient-to-r from-white via-white to-[#F8F6F1]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* User Identity */}
                <div className="flex items-start gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-serif text-base font-bold shrink-0 shadow-xs ${
                    user.isSuperAdmin 
                      ? 'bg-[#16382E] text-[#B68A3C] border border-[#B68A3C]/40' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-sm text-[#16382E]">{user.name}</h4>
                      {isCurrent && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          You (Current Session)
                        </span>
                      )}
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        user.isSuperAdmin
                          ? 'bg-[#B68A3C]/20 text-[#16382E]'
                          : 'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}>
                        {user.role}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        user.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gray-100 text-gray-600 border border-gray-300'
                      }`}>
                        {user.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <code className="text-gray-700 font-mono">{user.email}</code>
                      </span>
                      {user.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span>{user.phone}</span>
                        </span>
                      )}
                      <span className="text-[11px] text-gray-400">
                        Last Active: {user.lastLogin || 'Never'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Permissions Breakdown & Action Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                  {/* Permissions Pills */}
                  <div className="flex flex-wrap gap-1 max-w-md">
                    {user.isSuperAdmin ? (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Complete Master Access (All Modules)
                      </span>
                    ) : (
                      <>
                        {user.permissions.canManageProperties && (
                          <span className="bg-gray-100 text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded">
                            Properties
                          </span>
                        )}
                        {user.permissions.canManageProjects && (
                          <span className="bg-gray-100 text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded">
                            Townships
                          </span>
                        )}
                        {user.permissions.canManageLeads && (
                          <span className="bg-red-50 text-red-700 text-[10px] font-medium px-2 py-0.5 rounded">
                            Leads CRM
                          </span>
                        )}
                        {user.permissions.canManageBlogs && (
                          <span className="bg-gray-100 text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded">
                            Blogs
                          </span>
                        )}
                        {user.permissions.canManagePhotos && (
                          <span className="bg-amber-50 text-amber-800 text-[10px] font-medium px-2 py-0.5 rounded">
                            Photos
                          </span>
                        )}
                        {user.permissions.canManageFaqs && (
                          <span className="bg-gray-100 text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded">
                            FAQs & Team
                          </span>
                        )}
                        {user.permissions.canManageSettings && (
                          <span className="bg-purple-50 text-purple-800 text-[10px] font-medium px-2 py-0.5 rounded">
                            Site Settings
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleOpenEditUser(user)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
                      title="Edit Permissions & Details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{user.isSuperAdmin ? 'Edit Profile' : 'Edit Access'}</span>
                    </button>

                    {!user.isSuperAdmin && (
                      <>
                        <button
                          onClick={() => handleToggleStatus(user)}
                          className={`text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors cursor-pointer ${
                            user.status === 'Active'
                              ? 'text-amber-700 hover:bg-amber-50'
                              : 'text-emerald-700 hover:bg-emerald-50'
                          }`}
                          title={user.status === 'Active' ? 'Suspend Account' : 'Activate Account'}
                        >
                          {user.status === 'Active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline">{user.status === 'Active' ? 'Suspend' : 'Activate'}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Create / Edit Staff User */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#B68A3C]/30 my-6">
            <div className="bg-[#16382E] text-white p-5 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#B68A3C]" />
                <h3 className="font-serif text-lg font-bold">
                  {editingUserId ? 'Edit Staff User & Permissions' : 'Create New Staff / Sub-Admin User'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="p-6 space-y-5">
              {/* Quick Role Presets (Only when creating new or editing non-super admin) */}
              <div className="p-3 bg-[#F8F6F1] rounded-xl border border-[#B68A3C]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#16382E] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B68A3C]" />
                    Quick Role Templates:
                  </span>
                  <span className="text-[10px] text-gray-500">Auto-sets common permission bundles</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('sales')}
                    className="text-xs px-2.5 py-1 bg-white border border-gray-200 hover:border-[#B68A3C] rounded-md font-medium text-gray-700 transition-colors cursor-pointer"
                  >
                    Sales Executive (Leads + Properties)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('content')}
                    className="text-xs px-2.5 py-1 bg-white border border-gray-200 hover:border-[#B68A3C] rounded-md font-medium text-gray-700 transition-colors cursor-pointer"
                  >
                    Content Editor (Blogs + Photos)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('ops')}
                    className="text-xs px-2.5 py-1 bg-white border border-gray-200 hover:border-[#B68A3C] rounded-md font-medium text-gray-700 transition-colors cursor-pointer"
                  >
                    Operations Manager (Most Modules)
                  </button>
                </div>
              </div>

              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Staff Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Login Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ramesh@vdpd.in"
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Job Role / Designation
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Sales Executive / Listing Agent"
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Account Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  >
                    <option value="Active">Active (Can log into portal)</option>
                    <option value="Inactive">Inactive / Suspended (Access blocked)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  {editingUserId ? 'Reset / Change Password (leave blank to keep existing)' : 'Initial Password *'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required={!editingUserId}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={editingUserId ? 'Enter new password if changing' : 'Enter temporary staff password'}
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#B68A3C]"
                  />
                </div>
              </div>

              {/* Granular Permissions Checkboxes */}
              <div className="space-y-3 pt-2 border-t border-gray-200">
                <div>
                  <h4 className="text-xs font-bold text-[#16382E] uppercase tracking-wider">
                    Super Admin Access Controls
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    Select exactly which tabs and administrative actions this user is permitted to see and manage.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <label className="flex items-start gap-2.5 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.canManageProperties}
                      onChange={(e) => setFormData({
                        ...formData,
                        permissions: { ...formData.permissions, canManageProperties: e.target.checked }
                      })}
                      className="mt-0.5 rounded text-[#B68A3C] focus:ring-[#B68A3C]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-800 block">Manage Properties</span>
                      <span className="text-[10px] text-gray-500">Add, edit, and delete real estate listings</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.canManageProjects}
                      onChange={(e) => setFormData({
                        ...formData,
                        permissions: { ...formData.permissions, canManageProjects: e.target.checked }
                      })}
                      className="mt-0.5 rounded text-[#B68A3C] focus:ring-[#B68A3C]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-800 block">Townships & Projects</span>
                      <span className="text-[10px] text-gray-500">Manage master township developments</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.canManageLeads}
                      onChange={(e) => setFormData({
                        ...formData,
                        permissions: { ...formData.permissions, canManageLeads: e.target.checked }
                      })}
                      className="mt-0.5 rounded text-[#B68A3C] focus:ring-[#B68A3C]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-800 block">Customer Leads CRM</span>
                      <span className="text-[10px] text-gray-500">View inquiries, update lead status, CSV export</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.canManageBlogs}
                      onChange={(e) => setFormData({
                        ...formData,
                        permissions: { ...formData.permissions, canManageBlogs: e.target.checked }
                      })}
                      className="mt-0.5 rounded text-[#B68A3C] focus:ring-[#B68A3C]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-800 block">Blog & Articles</span>
                      <span className="text-[10px] text-gray-500">Write, edit, and publish market articles</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.canManagePhotos}
                      onChange={(e) => setFormData({
                        ...formData,
                        permissions: { ...formData.permissions, canManagePhotos: e.target.checked }
                      })}
                      className="mt-0.5 rounded text-[#B68A3C] focus:ring-[#B68A3C]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-800 block">Website Photos</span>
                      <span className="text-[10px] text-gray-500">Update banners, hero slots & Vrindavan presets</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.canManageFaqs}
                      onChange={(e) => setFormData({
                        ...formData,
                        permissions: { ...formData.permissions, canManageFaqs: e.target.checked }
                      })}
                      className="mt-0.5 rounded text-[#B68A3C] focus:ring-[#B68A3C]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-800 block">FAQs & Testimonials</span>
                      <span className="text-[10px] text-gray-500">Manage questions and client reviews</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={formData.permissions.canManageSettings}
                      onChange={(e) => setFormData({
                        ...formData,
                        permissions: { ...formData.permissions, canManageSettings: e.target.checked }
                      })}
                      className="mt-0.5 rounded text-[#B68A3C] focus:ring-[#B68A3C]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-800 block">Modify Site Settings & Visibility</span>
                      <span className="text-[10px] text-gray-500">Toggle public page visibility and business contact details</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#B68A3C] hover:bg-[#9E752D] text-white px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{editingUserId ? 'Save User & Permissions' : 'Create Staff Account'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Safe in-app Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleConfirmDeleteUser}
        title="Delete Staff Account"
        itemType="Sub-Admin User"
        itemName={userToDelete ? `${userToDelete.name} (${userToDelete.email})` : ''}
        description={`Are you sure you want to permanently delete the staff login account for "${userToDelete?.name}"? They will immediately lose access to the management portal.`}
        confirmButtonText="Delete Account"
      />
    </div>
  );
};
