import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { type ReactElement } from 'react'

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const { user, loading } = useAuth()

  if (loading) return (
    <div style={{ height: '100vh', display: 'grid', placeItems: 'center', color: '#2957CD' }}>
      Cargando...
    </div>
  )
  if (!user) return <Navigate to="/login" replace />
  return children
}
