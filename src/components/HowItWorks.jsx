const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Comment ça marche ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Copiez le lien</h3>
            <p className="text-gray-600">Copiez l'URL de la vidéo depuis votre plateforme favorite</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Collez et téléchargez</h3>
            <p className="text-gray-600">Collez le lien dans notre outil et cliquez sur télécharger</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Profitez !</h3>
            <p className="text-gray-600">Votre vidéo est prête à être regardée hors ligne</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks 