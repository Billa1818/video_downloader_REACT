import axios from 'axios'

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 240000,
  headers: { 'Content-Type': 'application/json' },
})

export const getAvailableFormats = async (url) => {
  const response = await api.post('/formats/', { url })
  return response.data
} 

export const downloadVideo = async (sourceUrl, requestedQuality, downloadAudioOnly = false) => {
  const response = await api.post('/downloads/create/', {
    source_url: sourceUrl,
    requested_quality: requestedQuality,
    download_audio_only: downloadAudioOnly
  })
  return response.data
}

export const getDownloadStatus = async (downloadId) => {
  const response = await api.get(`/downloads/${downloadId}/status/`)
  return response.data
}

export const cancelDownload = async (downloadId) => {
  const response = await api.post(`/downloads/${downloadId}/cancel/`)
  return response.data
}


/*
import axios from 'axios'
const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api'
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})
export const getAvailableFormats = async (url) => {
  const response = await api.post('/formats/', { url })
  return response.data
}
export const downloadVideo = async (sourceUrl, requestedQuality, downloadAudioOnly = false) => {
  const response = await api.post('/downloads/create/', {
    source_url: sourceUrl,
    requested_quality: requestedQuality,
    download_audio_only: downloadAudioOnly
  })
  return response.data
}
export const getDownloadStatus = async (downloadId) => {
  const response = await api.get`/downloads/${downloadId}/status/`)
  return response.data
}
export const cancelDownload = async (downloadId) => {
  const response = await api.post`/downloads/${downloadId}/cancel/`)
  return response.data
} 

*/
