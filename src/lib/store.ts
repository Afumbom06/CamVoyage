import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Destination {
  id: string;
  name: string;
  region: string;
  category: string;
  description: string;
  images: string[];
  coordinates: { lat: number; lng: number };
  entryFee: number;
  difficulty: string;
  rating: number;
  reviews: number;
  activities: string[];
  openingHours: string;
  nearbyAttractions: string[];
  howToGetThere: {
    byCar: string;
    byBus: string;
    distance: string;
  };
}

interface TripPlannerStore {
  selectedDestinations: Destination[];
  addDestination: (destination: Destination) => void;
  removeDestination: (id: string) => void;
  clearTrip: () => void;
  reorderDestinations: (startIndex: number, endIndex: number) => void;
}

interface UserStore {
  user: { name: string; email: string; avatar?: string } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  savedDestinations: string[];
  toggleSaveDestination: (id: string) => void;
}

export const useTripPlanner = create<TripPlannerStore>()(
  persist(
    (set) => ({
      selectedDestinations: [],
      addDestination: (destination) =>
        set((state) => ({
          selectedDestinations: [...state.selectedDestinations, destination],
        })),
      removeDestination: (id) =>
        set((state) => ({
          selectedDestinations: state.selectedDestinations.filter((d) => d.id !== id),
        })),
      clearTrip: () => set({ selectedDestinations: [] }),
      reorderDestinations: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.selectedDestinations);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { selectedDestinations: result };
        }),
    }),
    {
      name: 'trip-planner-storage',
    }
  )
);

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      savedDestinations: [],
      login: (email, password) => {
        // Mock login
        set({
          user: { name: 'John Doe', email },
          isAuthenticated: true,
        });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      toggleSaveDestination: (id) =>
        set((state) => ({
          savedDestinations: state.savedDestinations.includes(id)
            ? state.savedDestinations.filter((d) => d !== id)
            : [...state.savedDestinations, id],
        })),
    }),
    {
      name: 'user-storage',
    }
  )
);
