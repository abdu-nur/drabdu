


'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  Image as ImageIcon,
  Plus,
  Upload,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  Search,
  Filter
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'

export default function GalleryManagement() {
  const [galleries, setGalleries] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedGallery, setSelectedGallery] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [uploading, setUploading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    published: false
  })

  useEffect(() => {
    fetchGalleries()
  }, [])

  const fetchGalleries = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setGalleries(data || [])
    } catch (error) {
      console.error('Error fetching galleries:', error)
      toast.error('Error fetching galleries')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (files) => {
    try {
      setUploading(true)
      const uploadedImages = []

      for (const file of files) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `gallery/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(filePath)

        uploadedImages.push({
          url: publicUrl,
          path: filePath
        })
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }))

      toast.success(`${files.length} image(s) uploaded successfully`)
    } catch (error) {
      console.error('Error uploading images:', error)
      toast.error('Error uploading images')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }

    if (formData.images.length === 0) {
      toast.error('At least one image is required')
      return
    }

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('galleries')
          .update({
            title: formData.title,
            description: formData.description,
            images: formData.images,
            published: formData.published
          })
          .eq('id', selectedGallery.id)

        if (error) throw error
        
        toast.success('Gallery updated successfully')
      } else {
        const { error } = await supabase
          .from('galleries')
          .insert([{
            title: formData.title,
            description: formData.description,
            images: formData.images,
            published: formData.published
          }])

        if (error) throw error
        
        toast.success('Gallery created successfully')
      }

      setShowModal(false)
      setFormData({
        title: '',
        description: '',
        images: [],
        published: false
      })
      setIsEditing(false)
      setSelectedGallery(null)
      fetchGalleries()
    } catch (error) {
      console.error('Error saving gallery:', error)
      toast.error('Error saving gallery')
    }
  }

  const handleEdit = (gallery) => {
    setSelectedGallery(gallery)
    setFormData({
      title: gallery.title,
      description: gallery.description || '',
      images: gallery.images || [],
      published: gallery.published
    })
    setIsEditing(true)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this gallery?')) return

    try {
      const { error } = await supabase
        .from('galleries')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      toast.success('Gallery deleted successfully')
      fetchGalleries()
    } catch (error) {
      console.error('Error deleting gallery:', error)
      toast.error('Error deleting gallery')
    }
  }

  const togglePublish = async (id, published) => {
    try {
      const { error } = await supabase
        .from('galleries')
        .update({ published: !published })
        .eq('id', id)

      if (error) throw error
      
      setGalleries(prev => 
        prev.map(gallery => 
          gallery.id === id ? { ...gallery, published: !published } : gallery
        )
      )
      
      toast.success(`Gallery ${!published ? 'published' : 'unpublished'}`)
    } catch (error) {
      console.error('Error updating gallery:', error)
      toast.error('Error updating gallery')
    }
  }

  const filteredGalleries = galleries.filter(gallery =>
    gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (gallery.description && gallery.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gallery Management</h2>
          <p className="text-gray-600">Create and manage image galleries for your dental practice</p>
        </div>
        <button
          onClick={() => {
            setShowModal(true)
            setIsEditing(false)
            setSelectedGallery(null)
            setFormData({
              title: '',
              description: '',
              images: [],
              published: false
            })
          }}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Gallery
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search galleries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      {/* Galleries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGalleries.map((gallery) => (
          <div key={gallery.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Gallery Preview */}
            <div className="aspect-video bg-gray-100 relative">
              {gallery.images && gallery.images.length > 0 ? (
                <img
                  src={gallery.images[0].url}
                  alt={gallery.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
              
              {/* Status badge */}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  gallery.published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {gallery.published ? 'Published' : 'Draft'}
                </span>
              </div>
              
              {/* Image count */}
              {gallery.images && gallery.images.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  +{gallery.images.length - 1} more
                </div>
              )}
            </div>
            
            {/* Gallery Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{gallery.title}</h3>
              {gallery.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{gallery.description}</p>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{gallery.images?.length || 0} images</span>
                <span>{format(new Date(gallery.created_at), 'MMM dd, yyyy')}</span>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(gallery)}
                    className="text-cyan-600 hover:text-cyan-900 p-1"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(gallery.id)}
                    className="text-red-600 hover:text-red-900 p-1"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={() => togglePublish(gallery.id, gallery.published)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    gallery.published
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
                  }`}
                >
                  {gallery.published ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredGalleries.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No galleries found' : 'No galleries yet'}
          </h3>
          <p className="text-gray-500">
            {searchTerm 
              ? 'Try adjusting your search' 
              : 'Create your first gallery to showcase your work'
            }
          </p>
        </div>
      )}

      {/* Gallery Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/20 animate-scale-in">
            <div className="p-8 border-b border-slate-200/50 bg-gradient-to-r from-blue-50/50 to-cyan-50/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {isEditing ? 'Edit Gallery' : 'Create New Gallery'}
                  </h3>
                  <p className="text-slate-600 mt-1">
                    {isEditing ? 'Update your gallery details and images' : 'Add images and details for your new gallery'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setFormData({
                      title: '',
                      description: '',
                      images: [],
                      published: false
                    })
                  }}
                  className="p-2 rounded-xl hover:bg-white/50 transition-all duration-200 group"
                >
                  <X className="w-6 h-6 text-slate-600 group-hover:text-slate-800 group-hover:scale-110 transition-all duration-200" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto max-h-[60vh]">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Gallery Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-slate-800 placeholder-slate-500"
                  placeholder="Enter a descriptive title for your gallery..."
                  required
                />
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-slate-800 placeholder-slate-500 resize-none"
                  rows={3}
                  placeholder="Describe your gallery (optional)..."
                />
              </div>
              
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Images *
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 group">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(Array.from(e.target.files))}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center group-hover:scale-105 transition-transform duration-200"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-cyan-200 transition-all duration-200">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <span className="text-lg font-semibold text-slate-700 mb-2">
                      {uploading ? 'Uploading images...' : 'Click to upload images'}
                    </span>
                    <span className="text-sm text-slate-500">
                      PNG, JPG, GIF up to 10MB each • Multiple files supported
                    </span>
                  </label>
                </div>
              </div>
              
              {/* Image Preview */}
              {formData.images.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4">
                    Uploaded Images ({formData.images.length})
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200/50">
                        <img
                          src={image.url}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 rounded-2xl flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-slate-700">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Published checkbox */}
              <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 rounded-2xl border border-blue-200/60 shadow-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="h-6 w-6 text-blue-600 focus:ring-blue-500 border-2 border-slate-400 rounded-lg bg-white checked:bg-blue-600 checked:border-blue-600"
                  />
                  <label htmlFor="published" className="ml-3 text-sm font-bold text-slate-800 cursor-pointer">
                    Publish gallery immediately
                  </label>
                </div>
                <div className="ml-auto">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    formData.published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {formData.published ? 'Will be visible to visitors' : 'Will be saved as draft'}
                  </span>
                </div>
              </div>
            </form>
            
            <div className="p-8 border-t border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-blue-50/50 flex justify-between items-center">
              <div className="text-sm text-slate-600">
                {formData.images.length > 0 && (
                  <span className="font-medium">
                    {formData.images.length} image{formData.images.length !== 1 ? 's' : ''} ready
                  </span>
                )}
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setFormData({
                      title: '',
                      description: '',
                      images: [],
                      published: false
                    })
                  }}
                  className="px-6 py-3 text-slate-700 bg-white/80 hover:bg-white border border-slate-300 rounded-2xl transition-all duration-200 hover:scale-105 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={uploading || !formData.title.trim() || formData.images.length === 0}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-all duration-200 hover:scale-105 font-semibold shadow-lg shadow-blue-500/25 disabled:hover:scale-100"
                >
                  {uploading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </div>
                  ) : (
                    isEditing ? 'Update Gallery' : 'Create Gallery'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}