import { Download, Menu } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Accueil', anchor: '#' },
    { label: 'Fonctionnalités', anchor: '#features' },
    { label: 'Plateformes', anchor: '#supported' },
    { label: 'Contact', anchor: '#contact' },
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white text-gray-900 shadow-xl sticky top-0 z-40 border-b border-gray-200">
      <nav className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Download className="w-8 h-8 text-gray-900" />
            <span className="text-2xl font-bold">VideoDownloader</span>
          </div>
          <div className="hidden md:flex space-x-6">
            {navLinks.map(link => (
              <a
                key={link.anchor}
                href={link.anchor}
                onClick={e => { e.preventDefault(); scrollToSection(link.anchor) }}
                className="!text-black font-medium hover:!text-black focus:!text-black transition-colors px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="backdrop-blur-md bg-white/90 rounded-xl shadow-lg p-6 mx-[-1.5rem] flex flex-col space-y-4 border border-gray-200">
              {navLinks.map(link => (
                <a
                  key={link.anchor}
                  href={link.anchor}
                  onClick={e => { e.preventDefault(); scrollToSection(link.anchor) }}
                  className="!text-black font-semibold text-lg px-2 py-1 rounded transition-all duration-200 hover:!text-black focus:!text-black hover:underline focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header 