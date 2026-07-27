'use client'
export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ToastProvider } from '@/components/Toast'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import Registros from '@/components/Registros'
import AgregarProducto from '@/components/AgregarProducto'
import Usuarios from '@/components/Usuarios'
import { getProductos } from '@/lib/db'

const PAGE_INFO = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Control de inventario en tiempo real',
  },
  registros: {
    title: 'Historial de Movimientos',
    subtitle: 'Registro de entradas, salidas y cambios',
  },
  agregar: {
    title: 'Agregar Producto',
    subtitle: 'Nuevo producto o restock de existente',
  },
  usuarios: {
    title: 'Gestión de Usuarios',
    subtitle: 'Administra roles y accesos',
  }
}

function DateBadge() {
  const [date, setDate] = useState('')
  useEffect(() => {
    const d = new Date()
    setDate(d.toLocaleDateString('es-VE', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }))
  }, [])
  return (
    <div className="date-badge">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      {date}
    </div>
  )
}

export default function HomePage() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [productos, setProductos]  = useState([])
  const [loading, setLoading]      = useState(true)
  const [authChecking, setAuthChecking] = useState(true)
  const [userRole, setUserRole] = useState(null)

  // ── SEGURIDAD: Verificar sesión activa ──
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)
      if (session) {
        const { data } = await supabase.from('perfiles').select('rol').eq('id', session.user.id).single()
        if (data) setUserRole(data.rol)
      }
      setAuthChecking(false)
      if (!session) router.push('/login')
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      if (session) {
        const { data } = await supabase.from('perfiles').select('rol').eq('id', session.user.id).single()
        if (data) setUserRole(data.rol)
      }
      if (!session) router.push('/login')
    })

    return () => subscription.unsubscribe()
  }, [router])

  const loadProductos = useCallback(async () => {
    if (!session) return // No cargar si no hay sesión
    try {
      setLoading(true)
      const data = await getProductos()
      setProductos(data)
    } catch (err) {
      console.error('Error cargando productos:', err)
    } finally {
      setLoading(false)
    }
  }, [session])

  useEffect(() => {
    if (session) {
      loadProductos()
    }
  }, [session, loadProductos])

  if (authChecking) {
    return <div className="login-container"><div className="login-error">Verificando acceso...</div></div>
  }

  if (!session) {
    return null // Evitar flash UI antes del redirect
  }

  const totalUnidades = productos.reduce((s, p) => s + (p.cantidad || 0), 0)
  const info = PAGE_INFO[activeTab]

  return (
    <ToastProvider>
      <div className="app-layout">
        {/* Sidebar + Mobile nav */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          totalProductos={productos.length}
          totalUnidades={totalUnidades}
          userRole={userRole}
        />

        {/* Main */}
        <div className="main-content">
          {/* Top bar */}
          <header className="topbar">
            <div className="topbar-left">
              <h1 className="page-title">{info.title}</h1>
              <p className="page-subtitle">{info.subtitle}</p>
            </div>
            <div className="topbar-right">
              <DateBadge />
            </div>
          </header>

          {/* Tab content */}
          {activeTab === 'dashboard' && (
            <Dashboard
              productos={productos}
              setProductos={setProductos}
              loading={loading}
              onTabChange={setActiveTab}
              userRole={userRole}
            />
          )}
          {activeTab === 'registros' && <Registros />}
          {activeTab === 'agregar' && userRole === 'admin' && (
            <AgregarProducto
              productos={productos}
              setProductos={setProductos}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === 'usuarios' && userRole === 'admin' && <Usuarios />}
        </div>
      </div>
    </ToastProvider>
  )
}
