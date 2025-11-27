import { create } from 'zustand';

interface UIState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  isAdminMode: boolean;
  toggleAdminMode: () => void;
}

export const useStore = create<UIState>((set) => ({
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  
  isAdminMode: false,
  toggleAdminMode: () => set((state) => ({ isAdminMode: !state.isAdminMode })),
}));
