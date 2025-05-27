"use client"

import { ThemeProvider } from "@/components/theme/theme-provider"
import { QueryClientProvider } from "@/lib/react-query"

export default function ClientProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}
