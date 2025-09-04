import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ChatWidget from '../components/ChatWidget'
import Card from '../components/Card'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import CreateEventForm from '../components/eventos/CreateEventForm'
import { getEventsApi, deleteEventApi } from '../api/events'
import EditEventModal from '../components/eventos/EditEventModal'
import type { EventItem } from '../types/events'

type Estado = 'abierto' | 'cerrado' | 'en progreso'

// EventItem type now comes from src/types/events

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

export default function Eventos() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  // Create form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const canSubmit = title.trim().length > 0 && start.trim().length > 0

  const initial = useMemo<EventItem[]>(() => {
    return retos.map((r) => ({
      id: r.id,
      title: r.titulo,
      start: r.fechaCreacion,
      end: r.fechaCierre,
    }))
  }, [])

  const [events, setEvents] = useState<EventItem[]>(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Edit modal state
  const [editOpen, setEditOpen] = useState(false)
  const [selected, setSelected] = useState<EventItem | null>(null)
  // Pagination state
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Helpers: normalize ISO strings (e.g. 2025-09-12T18:00:00Z) to date-only (YYYY-MM-DD)
  const toDateOnly = (iso: string | undefined): string | undefined => {
    if (!iso) return undefined
    // If it's already date-only, just return
    if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso
    // Convert to Date then format as YYYY-MM-DD in local timezone to avoid shifting
    const d = new Date(iso)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  // Derived: paginated events
  const totalPages = Math.max(1, Math.ceil(events.length / pageSize))
  const paginated = useMemo(() => {
    const startIdx = (page - 1) * pageSize
    return events.slice(startIdx, startIdx + pageSize)
  }, [events, page, pageSize])

  // Load events from backend
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getEventsApi()
        if (!mounted) return
        const mapped: EventItem[] = data.map((e) => ({
          id: e.id,
          title: e.titulo,
          start: toDateOnly(e.inicio)!,
          end: toDateOnly(e.fin),
          description: e.descripcion,
        }))
        setEvents((prev) => {
          // If backend returned any events, prefer them over local sample
          return mapped.length > 0 ? mapped : prev
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error cargando eventos', err)
        if (mounted) setError('No se pudieron cargar los eventos')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const handleCreated = (evt: EventItem) => {
    setEvents((prev) => [...prev, evt])
    setStart('')
    setEnd('')
    setDescription('')
    setIsOpen(false)
  }

  const handleDelete = async (id: string) => {
    const ok = window.confirm('¿Eliminar este evento? Esta acción no se puede deshacer.')
    if (!ok) return
    const prev = events
    // Optimistic UI
    setEvents((cur) => cur.filter((e) => e.id !== id))
    try {
      await deleteEventApi(id)
    } catch (err) {
      // Revert on failure
      // eslint-disable-next-line no-console
      console.error('No se pudo eliminar en backend, revirtiendo', err)
      setEvents(prev)
      alert('No se pudo eliminar el evento. Intenta nuevamente.')
    }
  }

  return (
    <Container>
      <Header />
      <BodyLayout>
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <Content>
          <HeaderCard>
            <HeaderCardBody>
              <PageTitle>Eventos</PageTitle>
              <HeaderActions>
                <PrimaryButton type="button" onClick={() => setIsOpen(true)}>
                  + Crear evento
                </PrimaryButton>
              </HeaderActions>
            </HeaderCardBody>
          </HeaderCard>

          <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Portal>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>Crear nuevo evento</ModalTitle>
                  <Dialog.Close asChild>
                    <CloseBtn aria-label="Cerrar">×</CloseBtn>
                  </Dialog.Close>
                </ModalHeader>
                <ModalBody>
                  <CreateEventForm
                    title={title}
                    description={description}
                    start={start}
                    end={end}
                    canSubmit={canSubmit}
                    onTitleChange={setTitle}
                    onDescriptionChange={setDescription}
                    onStartChange={setStart}
                    onEndChange={setEnd}
                    onCreated={handleCreated}
                    onCancel={() => setIsOpen(false)}
                  />
                </ModalBody>
              </ModalContent>
            </Dialog.Portal>
          </Dialog.Root>

          <CalendarCard>
            <TableHeader>
              <TableTitle>Eventos</TableTitle>
            </TableHeader>
            <TableWrapper>
              {loading && <LoadMsg>Cargando eventos...</LoadMsg>}
              {error && <ErrorMsg>{error}</ErrorMsg>}
              {!loading && !error && (
                <>
                  <StyledTable>
                    <thead>
                      <tr>
                        <th>Título</th>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Descripción</th>
                        <th style={{ width: 100 }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.length === 0 ? (
                        <tr>
                          <td colSpan={5} style={{ textAlign: 'center', color: '#666' }}>Sin eventos</td>
                        </tr>
                      ) : (
                        paginated.map((e) => (
                          <tr key={e.id}>
                            <td title={e.title}>{e.title}</td>
                            <td>{toDateOnly(e.start)}</td>
                            <td>{toDateOnly(e.end) || '-'}</td>
                            <td title={e.description || ''}>{e.description || '-'}</td>
                            <td>
                              <RowActions>
                                <DropdownMenu.Root>
                                  <DropdownMenu.Trigger asChild>
                                    <ActionsButton type="button">Acciones</ActionsButton>
                                  </DropdownMenu.Trigger>
                                  <DropdownMenu.Portal>
                                    <MenuContent sideOffset={6} align="end">
                                      <MenuItem
                                        onSelect={(ev: Event) => {
                                          ev.preventDefault()
                                          setSelected(e)
                                          setEditOpen(true)
                                        }}
                                      >Editar</MenuItem>
                                      <DangerMenuItem
                                        onSelect={(ev: Event) => {
                                          ev.preventDefault()
                                          handleDelete(e.id)
                                        }}
                                      >Eliminar</DangerMenuItem>
                                    </MenuContent>
                                  </DropdownMenu.Portal>
                                </DropdownMenu.Root>
                              </RowActions>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </StyledTable>
                  <PaginationBar>
                    <div>
                      Página {page} de {totalPages}
                    </div>
                    <div className="controls">
                      <SecondaryButton
                        type="button"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                      >Anterior</SecondaryButton>
                      <SecondaryButton
                        type="button"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                      >Siguiente</SecondaryButton>
                      <PageSizeSelect
                        value={String(pageSize)}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setPageSize(parseInt(e.target.value, 10)); setPage(1) }}
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                      </PageSizeSelect>
                    </div>
                  </PaginationBar>
                </>
              )}
            </TableWrapper>
          </CalendarCard>
          {selected && (
            <EditEventModal
              open={editOpen}
              event={selected}
              onOpenChange={setEditOpen}
              onSave={async (updated) => {
                // Optimistic update UI
                setEvents((prev) => prev.map((ev) => (ev.id === updated.id ? updated : ev)))
                setEditOpen(false)
                try {
                  const { updateEventApi } = await import('../api/events')
                  const payload = {
                    titulo: updated.title,
                    inicio: updated.start,
                    fin: updated.end,
                    descripcion: updated.description,
                  }
                  await updateEventApi(updated.id, payload)
                } catch (apiErr) {
                  // eslint-disable-next-line no-console
                  console.warn('No se pudo actualizar en backend (se mantuvo el cambio local)', apiErr)
                }
              }}
            />
          )}
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

// Modal styles
const ModalOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(2px);
  z-index: 1000;
`

const ModalContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(560px, 92vw);
  background: #fff;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
  overflow: hidden;
  z-index: 1001;
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`

const ModalTitle = styled(Dialog.Title)`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`

const CloseBtn = styled.button`
  border: none;
  background: transparent;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray600};
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

const CalendarCard = styled(Card)`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  /* margen inferior para no tapar el widget de mensajes */
  margin-bottom: ${({ theme }) => theme.spacing(10)};
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
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`

// SecondaryButton was used in the inline form; the new CreateEventForm defines its own buttons.

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

// Table-based UI wrappers
const TableWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(4)};
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 8px;
  overflow: hidden;
  thead th {
    text-align: left;
    padding: 12px 14px;
    background: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 700;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  }
  tbody td {
    padding: 12px 14px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.textSecondary};
    vertical-align: top;
  }
  tbody tr:hover {
    background: ${({ theme }) => theme.colors.gray50};
  }
`

const PaginationBar = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  .controls {
    display: flex;
    gap: ${({ theme }) => theme.spacing(2)};
    align-items: center;
  }
`

const SecondaryButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: #fff;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`

const SmallButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: #fff;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 6px 10px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
`

// Actions dropdown styles (matching Socios RowActionBtn)
const RowActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`

const ActionsButton = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(3)};
  font-size: 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: #fff;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
    border-color: ${({ theme }) => theme.colors.gray400};
  }
`

const MenuContent = styled(DropdownMenu.Content)`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  padding: 6px;
  min-width: 160px;
  z-index: 1002;
`

const MenuItem = styled(DropdownMenu.Item)`
  all: unset;
  display: block;
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  user-select: none;
  outline: none;
  &:hover, &[data-highlighted] { background: ${({ theme }) => theme.colors.gray100}; }
`

const DangerMenuItem = styled(MenuItem)`
  color: #c62828;
  &:hover, &[data-highlighted] { background: #fdecea; }
`

const PageSizeSelect = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: #fff;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 8px 10px;
  border-radius: 8px;
`

const LoadMsg = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.9rem;
`;

const ErrorMsg = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
  color: #b00020;
  font-weight: 600;
  font-size: 0.9rem;
`;
