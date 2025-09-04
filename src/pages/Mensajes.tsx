import { useMemo, useState, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

interface Contact {
  id: string
  name: string
  lastMessage: string
}

interface Message {
  id: string
  from: 'me' | 'them'
  text: string
  timestamp: number
}

export default function Mensajes() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('ui.sidebarCollapsed')
    return saved ? saved === 'true' : false
  })
  const [activeContactId, setActiveContactId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const composerRef = useRef<HTMLDivElement | null>(null)
  const [composerH, setComposerH] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (composerRef.current) {
        setComposerH(composerRef.current.offsetHeight)
      } else {
        setComposerH(0)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const contacts: Contact[] = useMemo(() => ([
    { id: '1', name: 'María López', lastMessage: '¿Revisaste el contrato?' },
    { id: '2', name: 'Juan Pérez', lastMessage: 'Nos vemos a las 3pm.' },
    { id: '3', name: 'Ana García', lastMessage: 'Te mando el archivo.' },
  ]), [])

  const [chats, setChats] = useState<Record<string, Message[]>>({
    '1': [
      { id: 'm1', from: 'them', text: 'Hola! ¿Cómo vas?', timestamp: Date.now() - 3600_000 },
      { id: 'm2', from: 'me', text: 'Todo bien, gracias 😊', timestamp: Date.now() - 3500_000 },
    ],
    '2': [
      { id: 'm3', from: 'them', text: 'Reunión a las 3pm?', timestamp: Date.now() - 3000_000 },
    ],
    '3': [
      { id: 'm4', from: 'them', text: 'Te comparto el PDF', timestamp: Date.now() - 2000_000 },
    ],
  })

  const activeMessages = activeContactId ? (chats[activeContactId] || []) : []
  const activeContact = contacts.find(c => c.id === activeContactId) || null

  const handleSend = () => {
    if (!activeContactId || !draft.trim()) return
    const msg: Message = {
      id: `m-${Date.now()}`,
      from: 'me',
      text: draft.trim(),
      timestamp: Date.now(),
    }
    setChats(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), msg],
    }))
    setDraft('')
  }

  return (
    <Layout>
      <Header />
      <Body>
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => {
          const next = !sidebarCollapsed
          setSidebarCollapsed(next)
          localStorage.setItem('ui.sidebarCollapsed', String(next))
        }} />

        <Content>
          <Panel>
            <PanelHeader>Mensajes</PanelHeader>
            <Messenger>
              <Contacts>
                {contacts.map(c => (
                  <ContactItem
                    key={c.id}
                    $active={c.id === activeContactId}
                    onClick={() => setActiveContactId(c.id)}
                  >
                    <ContactName>{c.name}</ContactName>
                    <LastMessage>{c.lastMessage}</LastMessage>
                  </ContactItem>
                ))}
              </Contacts>

              <ChatArea>
                {activeContact ? (
                  <ChatWrapper>
                    <ChatHeader>Chat con {activeContact.name}</ChatHeader>
                    <Messages style={{ paddingBottom: `calc(${composerH}px + 8px)` }}>
                      {activeMessages.map(m => (
                        <Bubble key={m.id} $mine={m.from === 'me'}>
                          {m.text}
                        </Bubble>
                      ))}
                    </Messages>
                    <Composer ref={composerRef}>
                      <Input
                        value={draft}
                        onChange={e => setDraft(e.target.value)}
                        placeholder="Escribe un mensaje"
                        onKeyDown={e => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSend()
                          }
                        }}
                      />
                      <SendButton onClick={handleSend}>Enviar</SendButton>
                    </Composer>
                  </ChatWrapper>
                ) : (
                  <EmptyStateFull>Selecciona un contacto para ver el chat</EmptyStateFull>
                )}
              </ChatArea>
            </Messenger>
          </Panel>
        </Content>
      </Body>
    </Layout>
  )
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  background: ${({ theme }) => theme.colors.gray100};
`

const Body = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 0;
`

const Content = styled.main`
  padding: ${({ theme }) => theme.spacing(6)};
  overflow: hidden;
  min-height: 0; /* evita desbordes y permite scroll interno */
`

const Panel = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radii.lg};
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0; /* permite que Messenger gestione su propio scroll */
`

const PanelHeader = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  font-weight: 700;
`

const Messenger = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  height: 100%;
  min-height: 0; /* permite que ChatArea se expanda y el scroll ocurra dentro de Messages */
`

const Contacts = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.gray200};
  overflow-y: auto;
`

const ContactItem = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: left;
  background: ${({ $active, theme }) => ($active ? theme.colors.gray50 : 'transparent')};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    background: ${({ theme }) => theme.colors.gray50};
  }
`

const ContactName = styled.div`
  font-weight: 700;
`

const LastMessage = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray500};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ChatArea = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  min-height: 0; /* asegura que la fila 1fr (Messages) ocupe todo el espacio disponible */
`

const ChatWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  min-height: 0; /* permite que la fila 1fr colapse y pueda hacer scroll */
`

const ChatHeader = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  font-weight: 600;
`

const Messages = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.gray50};
  /* Deja un pequeño espacio para que el contenido no se sienta pegado a la barra */
  padding-bottom: ${({ theme }) => theme.spacing(4)};
  min-height: 0; /* asegura que el contenedor pueda contraerse para hacer scroll */
  height: 50vh; /* ocupa todo el alto disponible entre el header y el composer */
`

const Bubble = styled.div<{ $mine: boolean }>`
  align-self: ${({ $mine }) => ($mine ? 'flex-end' : 'flex-start')};
  background: ${({ $mine, theme }) => ($mine ? theme.colors.primary : '#fff')};
  color: ${({ $mine }) => ($mine ? '#fff' : 'inherit')};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  max-width: 70%;
`

const Composer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)};
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  background: #fff;
  position: sticky; /* fija la barra al bottom del contenedor de scroll */
  bottom: 0;
  z-index: 1;
`

const Input = styled.textarea`
  resize: none;
  height: 84px;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  font-family: inherit;
`

const SendButton = styled.button`
  padding: 0 ${({ theme }) => theme.spacing(5)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  cursor: pointer;
  min-height: 84px;
  display: grid;
  place-items: center;
`

const EmptyStateFull = styled.div`
  grid-row: 1 / -1;
  height: 100%;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.gray500};
  background: ${({ theme }) => theme.colors.gray50};
  padding: ${({ theme }) => theme.spacing(4)};
`
