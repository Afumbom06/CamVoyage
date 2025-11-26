import { useState } from 'react';
import { Search, Bell, User, LogOut, Settings, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { useAdminStore } from '../lib/adminStore';
import { useTranslation, useT, Language } from '../lib/translationStore';
import { toast } from 'sonner@2.0.3';

interface AdminTopBarProps {
  title?: string;
}

export default function AdminTopBar({ title = 'CAMVOYAGE System' }: AdminTopBarProps) {
  const navigate = useNavigate();
  const { admin, logout } = useAdminStore();
  const { language, setLanguage } = useTranslation();
  const t = useT();
  const [notifications] = useState(3);

  const handleLogout = () => {
    logout();
    toast.success(language === 'en' ? 'Logged out successfully' : 'Déconnexion réussie');
    navigate('/admin/login');
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    toast.success(
      lang === 'en'
        ? 'Language changed to English'
        : 'Langue changée en français'
    );
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      {/* Left Section - Title */}
      <div>
        <h2 className="text-xl text-gray-900">{title}</h2>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center space-x-4">
        {/* Role Badge */}
        <div className="flex items-center space-x-2">
          <User className="size-4 text-gray-500" />
          <span className="text-sm text-gray-600">Super Administrator</span>
        </div>

        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8">
              <Globe className="size-4 mr-1" />
              {language === 'en' ? 'EN' : 'FR'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleLanguageChange('en')}
              className={language === 'en' ? 'bg-blue-50' : ''}
            >
              <span className="mr-2">🇬🇧</span>
              English
              {language === 'en' && <Badge className="ml-2 bg-blue-600">Active</Badge>}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleLanguageChange('fr')}
              className={language === 'fr' ? 'bg-blue-50' : ''}
            >
              <span className="mr-2">🇫🇷</span>
              Français
              {language === 'fr' && <Badge className="ml-2 bg-blue-600">Actif</Badge>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8">
              <Bell className="size-4" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full size-4 flex items-center justify-center text-[10px]">
                  {notifications}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>{t('notifications')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-4 space-y-3">
              <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                <div className="bg-blue-100 p-2 rounded">
                  <User className="size-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">New user registered</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 h-8 px-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-blue-600 text-white">
                  {admin?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden lg:block">
                <p className="text-sm text-gray-900">{admin?.name || 'System Administrator'}</p>
                <p className="text-xs text-gray-500">{admin?.email || 'admin@camvoyage.cm'}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p>{admin?.name || 'Admin'}</p>
                <p className="text-xs text-gray-500">{admin?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
              <User className="size-4 mr-2" />
              {t('profile')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
              <Settings className="size-4 mr-2" />
              {t('settings')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="size-4 mr-2" />
              {t('logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}