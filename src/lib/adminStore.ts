import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
}

interface AdminStore {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  twoFactorEnabled: boolean;
  twoFactorVerified: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  verifyTwoFactor: (code: string) => Promise<boolean>;
  enableTwoFactor: () => void;
  disableTwoFactor: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      admin: null,
      isAuthenticated: false,
      twoFactorEnabled: false,
      twoFactorVerified: false,

      login: async (email: string, password: string) => {
        // Mock authentication - replace with real API call
        if (email === 'admin@camvoyage.cm' && password === 'admin123') {
          const admin = {
            id: '1',
            name: 'Admin User',
            email: email,
            role: 'super_admin' as const,
          };

          // Check if 2FA is enabled
          if (get().twoFactorEnabled) {
            set({ admin, twoFactorVerified: false });
            return true; // Need 2FA verification
          }

          set({ admin, isAuthenticated: true, twoFactorVerified: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          admin: null,
          isAuthenticated: false,
          twoFactorVerified: false,
        });
      },

      verifyTwoFactor: async (code: string) => {
        // Mock 2FA verification - replace with real API call
        if (code === '123456') {
          set({ isAuthenticated: true, twoFactorVerified: true });
          return true;
        }
        return false;
      },

      enableTwoFactor: () => {
        set({ twoFactorEnabled: true });
      },

      disableTwoFactor: () => {
        set({ twoFactorEnabled: false });
      },
    }),
    {
      name: 'admin-storage',
    }
  )
);
