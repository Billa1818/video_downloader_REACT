import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 md:bottom-10 right-4 md:right-8 z-50 bg-white text-black rounded-full shadow-xl p-3 hover:shadow-2xl transition-all border border-gray-200 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-black"
      aria-label="Remonter en haut"
      style={{ width: 'auto' }}
    >
      <ArrowUp className="w-6 h-6 !text-black" />
    </button>
  )
}

export default ScrollToTopButton 