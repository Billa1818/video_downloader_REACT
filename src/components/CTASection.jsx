import { ArrowUp } from 'lucide-react'

const CTASection = () => {
  return (
    <section className="py-16 bg-white text-black">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6 text-black">
          Prêt à télécharger vos vidéos ?
        </h2>
        <p className="text-xl mb-8 text-gray-500">
          Commencez dès maintenant, c'est gratuit et sans inscription !
        </p>
        <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-900 transition-colors transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center justify-center mx-auto">
          <ArrowUp className="w-5 h-5 inline mr-2" />
          Essayer maintenant
        </button>
      </div>
    </section>
  )
}

export default CTASection 