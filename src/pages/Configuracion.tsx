import { useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ChatWidget from '../components/ChatWidget'
import Card from '../components/Card'
import Button from '../components/Button'
import SettingSection from '../components/settings/SettingSection'
import SettingRow from '../components/settings/SettingRow'
import { useNavigate } from 'react-router-dom'
import { signOutUser } from '../auth/authService'

export default function Configuracion() {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('ui.sidebarCollapsed')
    return saved ? saved === 'true' : false
  })
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('prefs.notificationsEnabled')
    return saved ? saved === 'true' : true
  })
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem('prefs.language') || 'es'
  })

  const handleToggleSidebar = () => {
    const next = !sidebarCollapsed
    setSidebarCollapsed(next)
    localStorage.setItem('ui.sidebarCollapsed', String(next))
  }

  const handleToggleNotifications = () => {
    const next = !notificationsEnabled
    setNotificationsEnabled(next)
    localStorage.setItem('prefs.notificationsEnabled', String(next))
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    localStorage.setItem('prefs.language', value)
  }

  const handleLogout = () => {
    signOutUser()
      .catch(() => {/* ignore */})
      .finally(() => {
        try {
          localStorage.clear()
          sessionStorage.clear()
        } catch {}
        navigate('/login', { replace: true })
      })
  }

  return (
    <Container>
      <Header />
      <BodyLayout>
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />
        <Content>
          <HeaderCard>
            <HeaderCardBody>
              <PageTitle>Configuración</PageTitle>
            </HeaderCardBody>
          </HeaderCard>

          <SettingsGrid>
            <SettingSection
              title="Preferencias de interfaz"
              description="Controla opciones visuales y de usabilidad."
            >
              <SettingRow
                label="Sidebar compacta"
                description="Reduce el ancho de la barra lateral para mayor espacio de contenido."
                control={(
                  <label>
                    <input
                      type="checkbox"
                      checked={sidebarCollapsed}
                      onChange={handleToggleSidebar}
                    />{' '}
                    Activar
                  </label>
                )}
              />
              <SettingRow
                label="Idioma de la interfaz"
                description="Selecciona el idioma preferido."
                control={(
                  <Select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </Select>
                )}
              />
            </SettingSection>

            <SettingSection
              title="Notificaciones"
              description="Configura alertas y comunicaciones."
            >
              <SettingRow
                label="Activar notificaciones"
                description="Recibe alertas sobre actividad relevante."
                control={(
                  <label>
                    <input
                      type="checkbox"
                      checked={notificationsEnabled}
                      onChange={handleToggleNotifications}
                    />{' '}
                    Activar
                  </label>
                )}
              />
            </SettingSection>

            <SettingSection
              title="Sesión"
              description="Acciones relacionadas con tu cuenta en este dispositivo."
            >
              <ActionsRow>
                <Button onClick={handleLogout}>Cerrar sesión</Button>
              </ActionsRow>
            </SettingSection>
          </SettingsGrid>
        </Content>
      </BodyLayout>
      <ChatWidget />
    </Container>
  )
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`

const BodyLayout = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`

const Content = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(6)};
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.gray50};
`

const HeaderCard = styled(Card)`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`

const HeaderCardBody = styled.div`
  padding: ${({ theme }) => theme.spacing(6)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`

 

const SettingsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(6)};
  /* margen inferior para no tapar el widget de mensajes */
  margin-bottom: ${({ theme }) => theme.spacing(10)};
`

const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.radii.md};
  background: #fff;
  color: ${({ theme }) => theme.colors.textSecondary};
`
