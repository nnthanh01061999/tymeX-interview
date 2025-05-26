import Content from "@/app/[locale]/_components/layout/content"
import Header from "@/app/[locale]/_components/layout/header"
import Footer from "@/components/layout/footer"
import ZigZagDivider from "@/components/layout/zig-zag-divider"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="w-full bg-gradient-to-b from-gray-50 to-white">
        <Header className="container mx-auto py-6 px-4 sm:py-8 sm:px-6 md:py-10 lg:py-12" />
      </div>

      <Separator className="opacity-70" />

      <div className="flex-grow">
        <Content className="container mx-auto py-6 px-4 sm:py-8 sm:px-6 md:py-10" />
      </div>

      <div className="mt-8 sm:mt-12 md:mt-16">
        <ZigZagDivider />
      </div>

      <div>
        <Footer className="container mx-auto py-6 px-4 sm:py-8 sm:px-6 md:py-10" />
      </div>
    </main>
  )
}
