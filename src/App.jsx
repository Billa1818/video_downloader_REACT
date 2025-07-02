import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SupportedPlatforms from './components/SupportedPlatforms'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import { VideoDownloadProvider } from './context/VideoDownloadContext'
import ScrollToTopButton from './components/ScrollToTopButton'

function App() {
  return (
    <VideoDownloadProvider>
      <div className="bg-gray-50">
        <Header />
        <Hero />
        <SupportedPlatforms />
        <Features />
        <HowItWorks />
        <CTASection />
        <Footer />
        <ScrollToTopButton />
      </div>
    </VideoDownloadProvider>
  )
}

export default App
