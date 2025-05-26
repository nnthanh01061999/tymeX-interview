import HydrationProvider from "@/components/contexts/HydrationContext"
import FloatAction from "@/components/layout/float-action"
import { Toaster } from "@/components/ui/toaster"
import { routing } from "@/i18n/routing"
import { QueryClientProvider } from "@/lib/react-query"
import type { Metadata, Viewport } from "next"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations } from "next-intl/server"
import { Geist, Geist_Mono } from "next/font/google"
import { headers } from "next/headers"
import { notFound } from "next/navigation"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  try {
    // Await params to get locale
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "metadata" })

    return {
      title: t("title"),
      description: t("description"),
      keywords: t("keywords"),
      authors: [{ name: t("author") }],
      applicationName: t("appName"),
      creator: t("author"),
      publisher: t("author"),
      category: t("appCategory"),
      openGraph: {
        title: t("title"),
        description: t("description"),
        type: "website",
        siteName: t("appName"),
        locale: locale
      },
      twitter: {
        card: "summary_large_image",
        title: t("title"),
        description: t("description"),
        creator: t("author")
      },
      alternates: {
        canonical: "/",
        languages: {
          en: "/en",
          vi: "/vi"
        }
      }
    }
  } catch {
    return {
      title: "MindSnap",
      description: "Browser extension for visual note-taking and mind mapping"
    }
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Await params to get locale
  const { locale } = await params
  let messages
  const headersList = await headers()
  const userAgent = headersList.get("user-agent") || ""

  try {
    messages = (await import(`../../../messages/${locale}.json`)).default
  } catch {
    notFound()
  }

  // Validate that the incoming `locale` parameter is valid
  if (!hasLocale(routing.locales, locale)) notFound()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <HydrationProvider userAgent={userAgent}>
            <QueryClientProvider>
              {children}
              <Toaster />
              <FloatAction />
            </QueryClientProvider>
          </HydrationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
