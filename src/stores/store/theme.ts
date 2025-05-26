import { createSelectors } from "@/stores/selector"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Theme = "light" | "dark" | "system"

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const baseThemeStoreBase = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme })
    }),
    {
      name: "theme-storage"
    }
  )
)

export const useThemeStore = createSelectors(baseThemeStoreBase)
