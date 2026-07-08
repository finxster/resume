import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n"
import LanguageSwitcher from "@/components/language-switcher"
import ThemeToggle from "@/components/theme-toggle"
import { Toaster } from "@/components/ui/sonner"

// Brand typography (finx brand book): Space Grotesk for display/body,
// JetBrains Mono for labels, code, and metadata.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui",
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Luis Alves | Staff Engineer & Founder",
  description: "Portfolio website of Luis Alves, Staff Software Engineer and founder based in the San Francisco Bay Area.",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "mask-icon", url: "/mask-icon.svg", color: "#4457E8" }],
  },
  manifest: "/site.webmanifest",
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F8FA" },
    { media: "(prefers-color-scheme: dark)", color: "#14161A" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            {/* Floating switcher — the site has no mounted navbar, so the
                language toggle lives fixed in the top-right corner. */}
            <div className="fixed top-4 right-4 z-[60] flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            {/* Brand anchor mirroring the switcher: the bare finx mark,
                fixed top-left, links back to the top of the page. */}
            {/* Same translucent pill treatment as the switcher so the mark
                stays legible over scrolled content. */}
            <a
              href="#"
              aria-label="finx — back to top"
              className="fixed top-4 left-4 z-[60] hidden sm:flex items-center justify-center h-[34px] w-[34px] rounded-full border border-border bg-card/80 backdrop-blur shadow-sm"
            >
              <img src="/mark-light.svg" alt="" width={22} height={22} className="dark:hidden" />
              <img src="/mark-dark.svg" alt="" width={22} height={22} className="hidden dark:block" />
            </a>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
