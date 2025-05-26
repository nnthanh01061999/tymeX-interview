"use client"

import Featured from "@/app/[locale]/_components/layout/header/featured"
import Heading from "@/app/[locale]/_components/layout/header/heading"
import Hero from "@/app/[locale]/_components/layout/header/hero"
import { cn } from "@/lib/utils"

export default function Header({ className }: { className?: string }) {
  return (
    <header className={cn("overflow-hidden", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] md:grid-cols-[2fr_1fr] gap-6 lg:gap-8">
        <div className="space-y-6 md:space-y-8 flex flex-col justify-between">
          <Heading />
          <Featured />
        </div>
        <Hero />
      </div>
    </header>
  )
}
