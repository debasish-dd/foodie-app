import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type ThemeStore = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',

      toggleTheme: () => {
        const currentTheme = get().theme

        set({
          theme: currentTheme === 'light' ? 'dark' : 'light',
        })
      },
    }),

    {
      name: 'theme-storage',

      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)