'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import Image from 'next/image'

export default function GallerySlider() {
  const [galleries, setGalleries] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndices, setCurrentImageIndices] = useState({})

  useEffect(() => {
    fetchGalleries()
  }, [])

  const fetchGalleries = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setGalleries(data || [])
      
      // Initialize current image indices for each gallery
      const initialIndices = {}
      data?.forEach(gallery => {
        initialIndices[gallery.id] = 0
      })
      setCurrentImageIndices(initialIndices)
    } catch (error) {
      console.error('Error fetching galleries:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextImage = (galleryId) => {
    const gallery = galleries.find(g => g.id === galleryId)
    if (gallery && gallery.images) {
      setCurrentImageIndices(prev => ({
        ...prev,
        [galleryId]: prev[galleryId] === gallery.images.length - 1 ? 0 : prev[galleryId] + 1
      }))
    }
  }

  const prevImage = (galleryId) => {
    const gallery = galleries.find(g => g.id === galleryId)
    if (gallery && gallery.images) {
      setCurrentImageIndices(prev => ({
        ...prev,
        [galleryId]: prev[galleryId] === 0 ? gallery.images.length - 1 : prev[galleryId] - 1
      }))
    }
  }

  const goToImage = (galleryId, imageIndex) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [galleryId]: imageIndex
    }))
  }

  // Touch handlers for swipe gestures
  const handleTouchStart = (e, galleryId) => {
    e.stopPropagation()
    const touch = e.targetTouches[0]
    e.target.touchStartX = touch.clientX
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
  }

  const handleTouchEnd = (e, galleryId) => {
    e.stopPropagation()
    const touch = e.changedTouches[0]
    const touchEndX = touch.clientX
    const touchStartX = e.target.touchStartX
    
    if (touchStartX && touchEndX) {
      const distance = touchStartX - touchEndX
      const isLeftSwipe = distance > 50
      const isRightSwipe = distance < -50

      if (isLeftSwipe) {
        nextImage(galleryId)
      }
      if (isRightSwipe) {
        prevImage(galleryId)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  if (galleries.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Eye className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-3">Gallery Coming Soon</h3>
        <p className="text-slate-600 text-lg">We're preparing amazing before & after photos for you</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {galleries.map((gallery, index) => {
        const currentIndex = currentImageIndices[gallery.id] || 0
        const hasMultipleImages = gallery.images && gallery.images.length > 1
        
        return (
          <div 
            key={gallery.id} 
            className="group relative bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-700 hover:scale-105 hover:shadow-2xl border border-white/50"
          >
            {/* Image Slider Container */}
            <div className="aspect-square relative overflow-hidden">
              {gallery.images && gallery.images.length > 0 ? (
                <div
                  className="relative w-full h-full"
                  onTouchStart={(e) => handleTouchStart(e, gallery.id)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={(e) => handleTouchEnd(e, gallery.id)}
                >
                  <Image
                    src={gallery.images[currentIndex].url}
                    alt={gallery.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Navigation Arrows - Only show on hover and if multiple images */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          prevImage(gallery.id)
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/70"
                      >
                        <ChevronLeft className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage(gallery.id)
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/70"
                      >
                        <ChevronRight className="w-4 h-4 text-white" />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-50 flex items-center justify-center">
                  <Eye className="w-12 h-12 text-cyan-400/40" />
                </div>
              )}
              
              {/* Image count badge */}
              {hasMultipleImages && (
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {currentIndex + 1}/{gallery.images.length}
                </div>
              )}

              {/* Dot Indicators */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {gallery.images.map((_, imageIndex) => (
                    <button
                      key={imageIndex}
                      onClick={(e) => {
                        e.stopPropagation()
                        goToImage(gallery.id, imageIndex)
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        imageIndex === currentIndex 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Overlay with gallery info */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-1">{gallery.title}</h3>
                      <p className="text-sm opacity-90">
                        {gallery.images?.length || 0} image{gallery.images?.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            
            {/* Gallery Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{gallery.title}</h3>
              {gallery.description && (
                <p className="text-slate-600 leading-relaxed text-sm line-clamp-2 mb-4">
                  {gallery.description}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  {gallery.images?.length || 0} images
                </span>
                {hasMultipleImages && (
                  <span className="text-xs text-cyan-600 font-medium">
                    Swipe to view more
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
