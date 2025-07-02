import { Play, Facebook, Instagram, Twitter } from 'lucide-react'

const SupportedPlatforms = () => {
  return (
    <section id="supported" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Plateformes supportées
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center transition-all hover:-translate-y-1 p-6 rounded-xl bg-gray-50 hover:bg-gray-100">
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">YouTube</h3>
          </div>
          <div className="text-center transition-all hover:-translate-y-1 p-6 rounded-xl bg-gray-50 hover:bg-gray-100">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Facebook className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Facebook</h3>
          </div>
          <div className="text-center transition-all hover:-translate-y-1 p-6 rounded-xl bg-gray-50 hover:bg-gray-100">
            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">Instagram</h3>
          </div>
          <div className="text-center transition-all hover:-translate-y-1 p-6 rounded-xl bg-gray-50 hover:bg-gray-100">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Twitter className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900">X (Twitter)</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupportedPlatforms 