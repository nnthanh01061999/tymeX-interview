"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Theme, useThemeStore } from "@/stores/store/theme"
import { Monitor, Moon, Sun } from "lucide-react"
import React, { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()
  const [mounted, setMounted] = useState(false)

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const options: { label: string; value: Theme; icon: React.ReactNode }[] = [
    {
      label: "Light",
      value: "light",
      icon: <Sun className="h-4 w-4 mr-2" />
    },
    {
      label: "Dark",
      value: "dark",
      icon: <Moon className="h-4 w-4 mr-2" />
    },
    {
      label: "System",
      value: "system",
      icon: <Monitor className="h-4 w-4 mr-2" />
    }
  ]

  if (!mounted) {
    // Return a placeholder to avoid layout shift
    return (
      <Button variant="outline" size="icon">
        <span className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          {theme === "light" && <Sun className="h-5 w-5" />}
          {theme === "dark" && <Moon className="h-5 w-5" />}
          {theme === "system" && <Monitor className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setTheme(option.value)}>
            {option.icon}
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
