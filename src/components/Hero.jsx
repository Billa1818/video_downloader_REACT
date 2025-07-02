import { useState, useRef } from 'react'
import { Video, Loader2, CheckCircle, AlertCircle, Link2, MoreHorizontal, XCircle, Download } from 'lucide-react'
import { getAvailableFormats, downloadVideo, getDownloadStatus, cancelDownload } from '../services/api'

const MAX_VISIBLE_FORMATS = 4
const getFullDownloadUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  if (url.startsWith('/downloads/')) return `http://127.0.0.1:8000${url}`
  return url
}

// Ajout d'une fonction utilitaire pour extraire l'ID YouTube
function extractYouTubeId(url) {
  if (!url) return null;
  // Cas https://www.youtube.com/watch?v=ID
  const match = url.match(/[?&]v=([^&]+)/);
  if (match) return match[1];
  // Cas https://youtu.be/ID
  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short) return short[1];
  // Cas https://www.youtube.com/embed/ID
  const embed = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embed) return embed[1];
  return null;
}

const Hero = () => {
  const [url, setUrl] = useState('')
  const [videoInfo, setVideoInfo] = useState(null)
  const [formats, setFormats] = useState([])
  const [selectedFormat, setSelectedFormat] = useState(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [downloadId, setDownloadId] = useState(null)
  const [downloadStatus, setDownloadStatus] = useState(null)
  const [showAllFormats, setShowAllFormats] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const pollingRef = useRef(null)

  // Valider l'URL et récupérer l'aperçu vidéo
  const handleValidateUrl = async () => {
    setError(null)
    setSuccess(null)
    setLoading(true)
    setVideoInfo(null)
    setFormats([])
    setSelectedFormat(null)
    setDownloadId(null)
    setDownloadStatus(null)
    try {
      const resp = await fetch('http://localhost:8000/api/validate-url/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      let validation
      try {
        validation = await resp.json()
      } catch (e) {
        validation = null
      }
      if (!resp.ok || !validation || validation.is_valid === false) {
        setError(validation && validation.url ? validation.url : "URL invalide ou plateforme non supportée")
        setLoading(false)
        return
      }
      setVideoInfo(validation)
      // Appel API pour récupérer les formats disponibles
      const formatsResp = await fetch('http://localhost:8000/api/formats/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      let formatsData
      try {
        formatsData = await formatsResp.json()
      } catch (e) {
        formatsData = null
      }
      if (!formatsResp.ok || !formatsData || !Array.isArray(formatsData.formats) || !formatsData.formats.length) {
        setError(formatsData && formatsData.error ? formatsData.error : "Aucun format disponible pour cette vidéo")
        setLoading(false)
        return
      }
      setFormats(formatsData.formats)
      setStep(2)
    } catch (e) {
      setError("Erreur lors de la récupération des formats (voir console)")
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // Polling du statut du téléchargement
  const startPollingStatus = (id) => {
    if (pollingRef.current) clearInterval(pollingRef.current)
    pollingRef.current = setInterval(async () => {
      try {
        const status = await getDownloadStatus(id)
        setDownloadStatus(status)
        if (status.status === 'completed' || status.status === 'failed') {
          clearInterval(pollingRef.current)
        }
      } catch (e) {}
    }, 3000)
  }

  // Lancer le téléchargement
  const handleDownload = async () => {
    setError(null)
    setSuccess(null)
    setLoading(true)
    setDownloadId(null)
    setDownloadStatus(null)
    try {
      const res = await downloadVideo(url, selectedFormat.format_id, selectedFormat.audio_only)
      setSuccess("Votre demande de téléchargement a bien été prise en compte !")
      setStep(3)
      setDownloadId(res.id)
      startPollingStatus(res.id)
    } catch (e) {
      setError("Erreur lors de la création du téléchargement")
    } finally {
      setLoading(false)
    }
  }

  // Annuler le téléchargement
  const handleCancel = async () => {
    if (!downloadId) return
    setIsCancelling(true)
    try {
      await cancelDownload(downloadId)
      setDownloadStatus((prev) => ({ ...prev, status: 'cancelled' }))
      if (pollingRef.current) clearInterval(pollingRef.current)
    } catch (e) {
      setError("Erreur lors de l'annulation du téléchargement")
    } finally {
      setIsCancelling(false)
    }
  }

  // Afficher la taille du fichier en Mo
  const formatFileSize = (size) => {
    if (!size || isNaN(size)) return ''
    return `~ ${(size / (1024 * 1024)).toFixed(1)} Mo`
  }

  const visibleFormats = showAllFormats ? formats : formats.slice(0, MAX_VISIBLE_FORMATS)

  // Affichage du format choisi
  const renderSelectedFormat = () => (
    <div className="mt-6 text-left">
      <div className="font-semibold mb-2 text-gray-900">Format choisi :</div>
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg border border-gray-300 bg-gray-50">
        <span className="font-medium mr-2 text-gray-900">{selectedFormat.format_note || selectedFormat.ext}</span>
        {selectedFormat.height && <span className="text-xs text-gray-500 mr-2">{selectedFormat.height}p</span>}
        <span className="text-xs text-gray-500 mr-2">{selectedFormat.audio_only ? 'Audio' : (selectedFormat.vcodec && selectedFormat.acodec && selectedFormat.vcodec !== 'none' && selectedFormat.acodec !== 'none' ? 'Vidéo+Audio' : 'Vidéo')}</span>
        <span className="text-xs text-gray-400 mr-2">{selectedFormat.ext}</span>
        {selectedFormat.filesize && <span className="text-xs text-gray-700 ml-auto">{formatFileSize(selectedFormat.filesize)}</span>}
      </div>
    </div>
  )

  // Barre de progression stylée
  const renderProgressBar = () => {
    if (!downloadStatus) return null
    if (downloadStatus.status !== 'processing') return null
    const percent = downloadStatus.progress_percentage || 0
    return (
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gray-900 h-4 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-900 mt-1 font-semibold flex items-center justify-between">
          <span>Traitement en cours...</span>
          <span>{percent}%</span>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-white text-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <div className="mb-8 flex justify-center">
          <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 shadow-lg">
            <Video className="w-12 h-12 text-gray-700" />
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Téléchargez vos vidéos <span className="text-gray-700">favorites</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-500 max-w-2xl mx-auto">
          Téléchargez facilement des vidéos depuis YouTube, Facebook, Instagram, X (Twitter) et bien plus encore !
        </p>
        <div className="max-w-2xl mx-auto mb-8">
          <div className="rounded-2xl p-6 bg-white shadow-xl border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="url"
                placeholder="Collez le lien de votre vidéo ici..."
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-900 text-lg bg-gray-50 placeholder-gray-400 transition-all"
                value={url}
                onChange={e => setUrl(e.target.value)}
                disabled={loading || downloadId}
                autoFocus
              />
              <button
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleValidateUrl}
                disabled={loading || !url.trim() || downloadId}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin inline mr-2" /> : <Download className="w-5 h-5 inline mr-2" />}
                Valider
              </button>
            </div>
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" /> {error}
              </div>
            )}
            {success && (
              <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" /> {success}
              </div>
            )}
            {videoInfo && (
              <div className="mt-6 text-left bg-gray-50 rounded-xl p-4 text-gray-900 border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  {videoInfo.thumbnail_url && (
                    <img src={videoInfo.thumbnail_url} alt="Miniature" className="w-32 h-20 object-cover rounded-lg shadow" />
                  )}
                  <div>
                    <div className="font-bold text-lg mb-1 line-clamp-2">{videoInfo.title}</div>
                    <div className="text-sm text-gray-500 mb-1">{videoInfo.platform_display}</div>
                    {videoInfo.duration && <div className="text-xs text-gray-400">Durée : {Math.floor(videoInfo.duration/60)}:{('0'+(videoInfo.duration%60)).slice(-2)} min</div>}
                  </div>
                </div>
                {/* Aperçu vidéo si possible */}
                {videoInfo.preview_url && (
                  <div className="mt-4">
                    <video src={videoInfo.preview_url} controls className="rounded-lg shadow w-full max-w-md mx-auto" />
                  </div>
                )}
                {/* Si pas de preview_url mais une miniature, proposer un <iframe> YouTube si possible */}
                {!videoInfo.preview_url && videoInfo.url && videoInfo.platform === 'youtube' && (
                  <div className="mt-4">
                    {(() => {
                      const ytId = extractYouTubeId(videoInfo.url);
                      if (!ytId) return <div className="text-red-500 text-sm">Impossible d'extraire l'ID YouTube</div>;
                      return (
                        <iframe
                          className="rounded-lg shadow w-full max-w-md mx-auto"
                          width="100%"
                          height="220"
                          src={`https://www.youtube.com/embed/${ytId}`}
                          title="Aperçu vidéo YouTube"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
            {formats.length > 0 && !downloadId && (
              <div className="mt-6 text-left">
                <div className="font-semibold mb-2 text-gray-900">Choisissez un format :</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {visibleFormats.map((f, idx) => (
                    <label key={idx} className={`flex items-center p-2 rounded-lg border cursor-pointer transition-all ${selectedFormat === f ? 'border-gray-900 bg-gray-100 shadow' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                      <input
                        type="radio"
                        name="format"
                        className="mr-2 accent-gray-900"
                        checked={selectedFormat === f}
                        onChange={() => setSelectedFormat(f)}
                      />
                      <span className="font-medium mr-2 text-gray-900">{f.format_note || f.ext}</span>
                      {f.height && <span className="text-xs text-gray-500 mr-2">{f.height}p</span>}
                      <span className="text-xs text-gray-500 mr-2">{f.audio_only ? 'Audio' : (f.vcodec && f.acodec && f.vcodec !== 'none' && f.acodec !== 'none' ? 'Vidéo+Audio' : 'Vidéo')}</span>
                      <span className="text-xs text-gray-400 mr-2">{f.ext}</span>
                      {f.filesize && <span className="text-xs text-gray-700 ml-auto">{formatFileSize(f.filesize)}</span>}
                    </label>
                  ))}
                </div>
                {formats.length > MAX_VISIBLE_FORMATS && !showAllFormats && (
                  <button
                    className="mt-3 flex items-center text-gray-700 hover:underline text-sm"
                    onClick={() => setShowAllFormats(true)}
                  >
                    <MoreHorizontal className="w-4 h-4 mr-1" /> Afficher plus de formats
                  </button>
                )}
                {formats.length > MAX_VISIBLE_FORMATS && showAllFormats && (
                  <button
                    className="mt-3 flex items-center text-gray-700 hover:underline text-sm"
                    onClick={() => setShowAllFormats(false)}
                  >
                    <MoreHorizontal className="w-4 h-4 mr-1" /> Masquer les formats supplémentaires
                  </button>
                )}
                <button
                  className="mt-4 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold text-lg transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleDownload}
                  disabled={!selectedFormat || loading}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin inline mr-2" /> : <Video className="w-5 h-5 inline mr-2" />}
                  Lancer le téléchargement
                </button>
              </div>
            )}
            {downloadId && selectedFormat && renderSelectedFormat()}
            {downloadId && (
              <div className="mt-6 text-left">
                <div className="font-semibold mb-2 text-gray-900">Statut du téléchargement :</div>
                <div className="flex items-center gap-2">
                  {downloadStatus?.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                  {downloadStatus?.status === 'failed' && <AlertCircle className="w-5 h-5 text-red-600" />}
                  {downloadStatus?.status === 'cancelled' && <XCircle className="w-5 h-5 text-gray-500" />}
                  {(!downloadStatus || downloadStatus?.status === 'pending' || downloadStatus?.status === 'processing') && <Loader2 className="w-5 h-5 animate-spin text-gray-900" />}
                  <span className="text-gray-900">
                    {downloadStatus?.status === 'completed' && 'Téléchargement terminé !'}
                    {downloadStatus?.status === 'failed' && `Échec : ${downloadStatus?.error_message || ''}`}
                    {downloadStatus?.status === 'cancelled' && 'Téléchargement annulé'}
                    {(!downloadStatus || downloadStatus?.status === 'pending') && 'En attente...'}
                    {downloadStatus?.status === 'processing' && `Traitement en cours... ${downloadStatus?.progress_percentage || 0}%`}
                  </span>
                  {(downloadStatus?.status === 'pending' || downloadStatus?.status === 'processing') && !isCancelling && (
                    <button
                      className="ml-4 flex items-center text-gray-500 hover:text-gray-900 hover:underline text-sm"
                      onClick={handleCancel}
                      disabled={isCancelling}
                    >
                      <XCircle className="w-4 h-4 mr-1" /> Annuler
                    </button>
                  )}
                  {isCancelling && <Loader2 className="w-4 h-4 animate-spin text-gray-500 ml-2" />}
                </div>
                {renderProgressBar()}
                {downloadStatus?.status === 'completed' && downloadStatus?.download_url && (
                  <div className="mt-4">
                    <a
                      href={getFullDownloadUrl(downloadStatus.download_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-lg font-semibold shadow focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      download
                    >
                      <Link2 className="w-5 h-5 mr-2" />
                      Télécharger la vidéo
                    </a>
                    <div className="text-xs text-gray-600 mt-1">
                      Lien direct : <a href={getFullDownloadUrl(downloadStatus.download_url)} target="_blank" rel="noopener noreferrer" className="underline break-all">{getFullDownloadUrl(downloadStatus.download_url)}</a>
                    </div>
                  </div>
                )}
                {/* Bouton pour télécharger une nouvelle vidéo */}
                <button
                  className="mt-8 bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-2xl font-bold text-xl border border-black transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center justify-center mx-auto z-10"
                  style={{ minWidth: 320 }}
                  onClick={() => {
                    setUrl('');
                    setVideoInfo(null);
                    setFormats([]);
                    setSelectedFormat(null);
                    setLoading(false);
                    setStep(1);
                    setError(null);
                    setSuccess(null);
                    setDownloadId(null);
                    setDownloadStatus(null);
                    setShowAllFormats(false);
                  }}
                >
                  <Download className="w-6 h-6 mr-3" />
                  Télécharger une nouvelle vidéo
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          ✨ Gratuit • Rapide • Sans inscription
        </p>
      </div>
    </section>
  )
}

export default Hero 