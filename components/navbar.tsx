"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { getDict } from "@/lib/dictionary"
import LanguageSwitcher from "@/components/language-switcher"

export default function Navbar() {
  const { lang } = useLang()
  const t = getDict(lang).nav
  const resumeHref = lang === "pt" ? "/luis_alves_pt.pdf" : "/luis_alves_en.pdf"
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl">
            Luis Alves
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/#about" className="text-gray-600 hover:text-gray-900">
              {t.about}
            </Link>
            <Link href="/#experience" className="text-gray-600 hover:text-gray-900">
              {t.experience}
            </Link>
            <Link href="/#projects" className="text-gray-600 hover:text-gray-900">
              {t.projects}
            </Link>
            <Link href="/#contact" className="text-gray-600 hover:text-gray-900">
              {t.contact}
            </Link>
            <Button asChild variant="outline">
              <a href={resumeHref} download>
                {t.resume}
              </a>
            </Button>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
              <span className="sr-only">{t.toggleMenu}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/#about"
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.about}
            </Link>
            <Link
              href="/#experience"
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.experience}
            </Link>
            <Link
              href="/#projects"
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.projects}
            </Link>
            <Link
              href="/#contact"
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.contact}
            </Link>
            <Button asChild variant="outline" className="w-full">
              <a href={resumeHref} download>
                {t.resume}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
