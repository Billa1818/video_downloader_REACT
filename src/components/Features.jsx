import { Zap } from 'lucide-react'

const Features = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Pourquoi nous choisir ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Ultra Rapide</h3>
            <p className="text-gray-600">Téléchargement instantané avec nos serveurs haute vitesse. Pas d'attente inutile.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15V9m0 0h2.5a1.5 1.5 0 010 3H7zm6 0v6m0-6h2.5a1.5 1.5 0 010 3H13z"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Haute Qualité</h3>
            <p className="text-gray-600">Téléchargez en HD, Full HD, et même 4K selon la qualité originale de la vidéo.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V7l7-4z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">100% Sécurisé</h3>
            <p className="text-gray-600">Aucun malware, aucune publicité intrusive. Votre sécurité est notre priorité.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features 