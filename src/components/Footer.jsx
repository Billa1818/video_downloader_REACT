import { Download } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 mt-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Download className="w-6 h-6 text-black" />
              <span className="text-xl font-bold">VideoDownloader</span>
            </div>
            <p className="text-gray-500">
              Le meilleur outil pour télécharger vos vidéos favorites depuis toutes les plateformes populaires.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-black">Plateformes</h4>
            <ul className="space-y-2">
              <li><a href="#" className="!text-black hover:!text-black focus:!text-black transition-colors">YouTube</a></li>
              <li><a href="#" className="!text-black hover:!text-black focus:!text-black transition-colors">Facebook</a></li>
              <li><a href="#" className="!text-black hover:!text-black focus:!text-black transition-colors">Instagram</a></li>
              <li><a href="#" className="!text-black hover:!text-black focus:!text-black transition-colors">X (Twitter)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-black">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="!text-black hover:!text-black focus:!text-black transition-colors">FAQ</a></li>
              <li><a href="#" className="!text-black hover:!text-black focus:!text-black transition-colors">Guide d'utilisation</a></li>
              <li><a href="#" className="!text-black hover:!text-black focus:!text-black transition-colors">Contact</a></li>
              <li><a href="#" className="!text-black hover:!text-black focus:!text-black transition-colors">Signaler un bug</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-black">Légal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="!text-black hover:!text-black focus:!text-black transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="!text-black hover:!text-black focus:!text-black transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="!text-black hover:!text-black focus:!text-black transition-colors">RGPD</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 VideoDownloader. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 