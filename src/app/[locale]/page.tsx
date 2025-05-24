"use client"

import Content from "@/app/[locale]/_layout/content"
import Footer from "@/app/[locale]/_layout/footer"
import Header from "@/app/[locale]/_layout/header"
import ZigZagDivider from "@/app/[locale]/_layout/zig-zag-divider"
import { Separator } from "@/components/ui/separator"

const containerClassName = "container mx-auto py-8 px-4"

export default function Home() {
  return (
    <main className="mx-auto">
      <Header className={containerClassName} />
      <Separator />
      <Content className={containerClassName} />
      <ZigZagDivider />
      <Footer className={containerClassName} />
    </main>
  )
}
