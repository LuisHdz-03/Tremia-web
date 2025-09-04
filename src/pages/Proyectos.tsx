import { useMemo, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ChatWidget from '../components/ChatWidget'
import Card from '../components/Card'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
type Estado = 'abierto' | 'cerrado' | 'en progreso'

const retos = [
  {
    id: 'r1',
    titulo: 'Optimización de logística',
    descripcion: 'Reducir costos de transporte en un 15% con IA.',
    publicadoPor: 'Acme Corp',
    estado: 'abierto' as Estado,
    fechaCreacion: '2025-01-12',
    fechaCierre: '2025-03-01',
  },
  {
    id: 'r2',
    titulo: 'Onboarding digital',
    descripcion: 'Mejorar conversión de registro a activación.',
    publicadoPor: 'InnovateX',
    estado: 'en progreso' as Estado,
    fechaCreacion: '2024-12-05',
    fechaCierre: '2025-02-15',
  },
  {
    id: 'r3',
    titulo: 'Cumplimiento ESG',
    descripcion: 'Monitoreo automatizado de KPIs ambientales.',
    publicadoPor: 'Beta Labs',
    estado: 'cerrado' as Estado,
    fechaCreacion: '2024-08-20',
    fechaCierre: '2024-10-01',
  },
]

export default function Proyectos() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const events = useMemo(() => {
    return retos.map((r) => ({
      id: r.id,
      title: r.titulo,
      start: r.fechaCreacion,
      end: r.fechaCierre,
      // color could be adjusted based on estado if desired via eventDidMount
    }))
  }, [])

  return (
    <Container>
      <Header />
      <BodyLayout>
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <Content>
          <HeaderCard>
            <HeaderCardBody>
              <PageTitle>Proyectos</PageTitle>
            </HeaderCardBody>
          </HeaderCard>

          <TableCard>
            <TableHeader>
              <TableTitle>Calendario de Retos</TableTitle>
              <HeaderActions>
                <PrimaryButton>+ Nuevo Reto</PrimaryButton>
              </HeaderActions>
            </TableHeader>
            <CalendarWrapper>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="auto"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                selectable
                events={events}
                eventClick={(info) => {
                  // placeholder for future actions (ver/editar/cerrar)
                  info.jsEvent.preventDefault()
                }}
                dateClick={() => {
                  // placeholder for crear nuevo reto en fecha
                }}
              />
            </CalendarWrapper>
          </TableCard>
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

const TableCard = styled(Card)`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  /* margen inferior para no tapar el widget de mensajes */
  margin-bottom: ${({ theme }) => theme.spacing(10)};
`

const TableHeader = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(3)};
`

const TableTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const HeaderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`

const PrimaryButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`

const CalendarWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(4)};
  .fc {
    --fc-border-color: ${({ theme }) => theme.colors.gray200};
    --fc-page-bg-color: ${({ theme }) => theme.colors.background};
    --fc-neutral-bg-color: ${({ theme }) => theme.colors.gray100};
    --fc-today-bg-color: ${({ theme }) => theme.colors.primary}22;
    --fc-event-bg-color: ${({ theme }) => theme.colors.primary};
    --fc-event-border-color: ${({ theme }) => theme.colors.primary};
    --fc-button-bg-color: ${({ theme }) => theme.colors.primary};
    --fc-button-border-color: ${({ theme }) => theme.colors.primary};
    --fc-button-text-color: #fff;
  }
  .fc .fc-toolbar-title {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 700;
  }
  .fc .fc-button-primary:hover {
    filter: brightness(0.95);
  }
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  thead th {
    text-align: left;
    padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
    color: ${({ theme }) => theme.colors.gray600};
    background: ${({ theme }) => theme.colors.gray100};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    font-weight: 600;
    white-space: nowrap;
  }

  tbody td {
    padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`

const PrimaryText = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const MutedText = styled.div`
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.4;
`

const Chip = styled.span<{ $kind: Estado }>`
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  ${({ $kind, theme }) => {
    const bg =
      $kind === 'abierto' ? `${theme.colors.success}22` :
      $kind === 'en progreso' ? `${theme.colors.warning}22` :
      `${theme.colors.gray300}55`;
    const fg =
      $kind === 'abierto' ? theme.colors.success :
      $kind === 'en progreso' ? theme.colors.warning :
      theme.colors.gray700;
    return `background: ${bg}; color: ${fg};`;
  }}
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Btn = styled.button`
  background: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.85rem;
  cursor: pointer;
  &:hover { background: ${({ theme }) => theme.colors.gray200}; }
`

const Menu = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  min-width: 160px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  padding: 4px;
`

const MenuItem = styled(DropdownMenu.Item)`
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  &:hover { background: ${({ theme }) => theme.colors.gray100}; }
`
