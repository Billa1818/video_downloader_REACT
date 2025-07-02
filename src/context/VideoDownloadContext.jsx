import { createContext, useContext } from 'react'

const VideoDownloadContext = createContext()

export const VideoDownloadProvider = ({ children }) => {
  // Ici tu peux ajouter des états globaux si besoin
  return (
    <VideoDownloadContext.Provider value={{}}>
      {children}
    </VideoDownloadContext.Provider>
  )
}

export const useVideoDownload = () => {
  return useContext(VideoDownloadContext)
} 