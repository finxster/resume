"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
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
              About
            </Link>
            <Link href="/#experience" className="text-gray-600 hover:text-gray-900">
              Experience
            </Link>
            <Link href="/#projects" className="text-gray-600 hover:text-gray-900">
              Projects
            </Link>
            <Link href="/#contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Button asChild variant="outline">
              <a href="/resume.pdf" download>
                Resume
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
            <span className="sr-only">Toggle menu</span>
          </Button>
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
              About
            </Link>
            <Link
              href="/#experience"
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
            </Link>
            <Link
              href="/#projects"
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/#contact"
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button asChild variant="outline" className="w-full">
              <a href="/resume.pdf" download>
                Resume
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
