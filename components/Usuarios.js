'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from './Toast'

export default function Usuarios() {
  const toast = useToast()
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsuarios()
  }, [])

  async function fetchUsuarios() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('perfiles')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setUsuarios(data)
    } catch (error) {
      toast('Error al cargar usuarios', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleRoleChange(id, currentRole) {
    const newRole = currentRole === 'admin' ? 'usuario' : 'admin'
    
    // Evitar que el admin principal se quite a sí mismo (opcional, pero buena práctica)
    const { data: sessionData } = await supabase.auth.getSession()
    if (sessionData.session?.user?.id === id && newRole === 'usuario') {
      toast('No puedes quitarte el rol de admin a ti mismo', 'error')
      return
    }

    try {
      const { error } = await supabase
        .from('perfiles')
        .update({ rol: newRole })
        .eq('id', id)
      
      if (error) throw error
      
      setUsuarios(prev => prev.map(u => u.id === id ? { ...u, rol: newRole } : u))
      toast('Rol actualizado correctamente', 'success')
    } catch (error) {
      toast('Error al actualizar rol', 'error')
    }
  }

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2 className="section-title">Gestión de Usuarios</h2>
      </div>

      <div className="table-container" style={{ marginTop: '2rem' }}>
        <table className="registros-table">
          <thead>
            <tr>
              <th>Correo</th>
              <th>Rol Actual</th>
              <th>Fecha Registro</th>
              <th style={{ textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                  Cargando...
                </td>
              </tr>
            ) : usuarios.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                  No se encontraron usuarios.
                </td>
              </tr>
            ) : (
              usuarios.map(user => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.email}</strong>
                  </td>
                  <td>
                    <span className={`stock-pill ${user.rol === 'admin' ? 'ok' : 'normal'}`}>
                      <span className="stock-pill-dot" />
                      {user.rol}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString('es-VE')}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn-edit" 
                      onClick={() => handleRoleChange(user.id, user.rol)}
                      style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-elevated)' }}
                    >
                      {user.rol === 'admin' ? 'Hacer Usuario' : 'Hacer Admin'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
