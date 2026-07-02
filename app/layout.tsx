import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n"
import LanguageSwitcher from "@/components/language-switcher"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })
const geist = Geist({ subsets: ["latin"], variable: "--font-ui" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Luis Alves | Staff Engineer & Founder",
  description: "Portfolio website of Luis Alves, Staff Software Engineer and founder based in the San Francisco Bay Area.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${geist.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            {/* Floating switcher — the site has no mounted navbar, so the
                language toggle lives fixed in the top-right corner. */}
            <div className="fixed top-4 right-4 z-[60]">
              <LanguageSwitcher />
            </div>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
