import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  DollarSign,
  Users,
  FileText,
  Settings,
  Globe,
  ChevronDown,
  Tag,
} from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useAdminStore } from '../lib/adminStore';
import { useT } from '../lib/translationStore';

export default function AdminSidebar() {
  const location = useLocation();
  const { admin } = useAdminStore();
  const t = useT();

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: t('dashboard'), section: 'main' },
    { path: '/admin/destinations', icon: MapPin, label: t('destinations'), section: 'content' },
    { path: '/admin/categories', icon: Tag, label: 'Categories & Regions', section: 'content' },
    { path: '/admin/financial', icon: DollarSign, label: t('financial'), section: 'content' },
    { path: '/admin/users', icon: Users, label: t('users'), section: 'content' },
    { path: '/admin/blog', icon: FileText, label: t('blog'), section: 'content' },
    { path: '/admin/settings', icon: Settings, label: t('settings'), section: 'system' },
  ];

  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 bg-blue-950 border-b border-blue-800">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded">
            <Globe className="size-6 text-blue-900" />
          </div>
          <div>
            <h1 className="text-lg">CAMVOYAGE</h1>
            <p className="text-xs text-blue-300">Tourism System</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        {/* Main Section */}
        <div className="mb-6">
          <p className="text-xs text-blue-300 px-3 mb-2">Overview</p>
          {menuItems
            .filter((item) => item.section === 'main')
            .map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg mb-1 transition-all ${
                      isActive
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'
                    }`}
                  >
                    <Icon className="size-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                </Link>
              );
            })}
        </div>

        {/* Content Management */}
        <div className="mb-6">
          <p className="text-xs text-blue-300 px-3 mb-2">Content Management</p>
          {menuItems
            .filter((item) => item.section === 'content')
            .map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg mb-1 transition-all ${
                      isActive
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'
                    }`}
                  >
                    <Icon className="size-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                </Link>
              );
            })}
        </div>

        {/* System */}
        <div>
          <p className="text-xs text-blue-300 px-3 mb-2">System</p>
          {menuItems
            .filter((item) => item.section === 'system')
            .map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg mb-1 transition-all ${
                      isActive
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'
                    }`}
                  >
                    <Icon className="size-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                </Link>
              );
            })}
        </div>
      </nav>

      {/* User Profile at Bottom */}
      <div className="p-4 border-t border-blue-800">
        <div className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-blue-800/50 cursor-pointer transition">
          <Avatar className="size-8">
            <AvatarFallback className="bg-blue-700 text-white text-sm">
              {admin?.name?.charAt(0) || 'A'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{admin?.name || 'Admin'}</p>
            <p className="text-xs text-blue-300 truncate">{admin?.email || 'admin@camvoyage.cm'}</p>
          </div>
          <ChevronDown className="size-4 text-blue-300" />
        </div>
      </div>
    </div>
  );
}