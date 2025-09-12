'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { 
  Calendar, 
  Image as ImageIcon, 
  Users, 
  Settings, 
  LogOut, 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Upload,
  X,
  Save
} from 'lucide-react'
import BookingManagement from './components/BookingManagement'
import GalleryManagement from './components/GalleryManagement'
import LoadingSpinner from './components/LoadingSpinner'
import { toast } from 'react-hot-toast'

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('bookings')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      
      if (user) {
        setUser(user)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Error checking user:', error)
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      router.push('/admin/login')
      toast.success('Signed out successfully')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Error signing out')
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return null
  }

  const tabs = [
    { id: 'bookings', label: 'Bookings', icon: Calendar, count: 0 },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon, count: 0 },
    { id: 'patients', label: 'Patients', icon: Users, count: 0 },
    { id: 'settings', label: 'Settings', icon: Settings, count: 0 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sticky Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-white/20 transform transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200/50 bg-gradient-to-r from-blue-50 to-cyan-50">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Dr. Abdu</h1>
                <p className="text-sm text-slate-600 font-medium">Admin Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl hover:bg-white/50 transition-all duration-200"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setSidebarOpen(false)
                  }}
                  className={`group w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <Icon className={`w-5 h-5 transition-transform duration-200 ${
                      activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                    <span className="font-semibold text-sm">{tab.label}</span>
                  </div>
                  {tab.count > 0 && (
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-100 text-blue-700 group-hover:bg-blue-200'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* User info and logout */}
          <div className="p-6 border-t border-slate-200/50 bg-gradient-to-r from-slate-50 to-blue-50/50">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {user.email}
                </p>
                <p className="text-xs text-slate-600 font-medium">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="group w-full flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 hover:scale-[1.02]"
            >
              <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-semibold">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
          >
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-slate-800">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </h1>
          <div className="w-8" /> {/* Spacer */}
        </div>

        {/* Content area */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto h-full">
            {activeTab === 'bookings' && <BookingManagement />}
            {activeTab === 'gallery' && <GalleryManagement />}
            {activeTab === 'patients' && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Patients Management</h3>
                <p className="text-slate-600 text-lg">Coming soon - Advanced patient management features</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Settings className="w-10 h-10 text-slate-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Settings</h3>
                <p className="text-slate-600 text-lg">Coming soon - System configuration and preferences</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}