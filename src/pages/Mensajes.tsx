// --------------------- componente Mensajes ---------------------
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getChatsDeUsuarioApi } from "../api/mensajes";
import type { Chat, Mensaje } from "../api/mensajes";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
}

export default function Mensajes() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem("ui.sidebarCollapsed");
    return saved ? saved === "true" : false;
  });

  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const composerRef = useRef<HTMLDivElement | null>(null);
  const [composerH, setComposerH] = useState(0);

  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loadingChats, setLoadingChats] = useState(false);
  const [errorChats, setErrorChats] = useState<string | null>(null);

  useLayoutEffect(() => {
    const measure = () => setComposerH(composerRef.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  // --------------------- dentro del componente Mensajes ---------------------
  useEffect(() => {
    if (!user?.uid) return;
    setLoadingChats(true);
    setErrorChats(null);

    console.log("[Mensajes] UID usado para obtener chats:", user.uid);

    getChatsDeUsuarioApi(user.uid)
      .then((data) => {
        console.log(
          "[Mensajes] Respuesta cruda de getChatsDeUsuarioApi:",
          data
        );

        setChats(data);

        // ⚡ Seleccionar automáticamente el primer chat si existe
        if (data.length > 0 && !activeContactId) {
          setActiveContactId(data[0].chatId);
        }

        if (!data || data.length === 0) {
          console.warn("[Mensajes] ⚠️ La API devolvió un arreglo vacío");
        }
      })
      .catch((err: any) => {
        console.error("[Mensajes] Error al obtener chats:", err);
        if (err?.response?.status === 404) {
          setChats([]);
          setErrorChats(null);
        } else {
          setErrorChats("No se pudieron cargar los chats");
        }
      })
      .finally(() => setLoadingChats(false));
  }, [user?.uid]);

  // Lista de contactos
  const contacts: Contact[] = chats.map((chat) => {
    const other =
      (chat.participantes || []).find((p) => p !== user?.uid) || "Desconocido";
    const lastMsg = chat.mensajes?.[chat.mensajes.length - 1]?.contenido || "";
    return { id: chat.chatId, name: other, lastMessage: lastMsg };
  });

  const activeChat = chats.find((c) => c.chatId === activeContactId) || null;
  const activeMessages: Mensaje[] = activeChat?.mensajes || [];
  const activeContact = contacts.find((c) => c.id === activeContactId) || null;

  const handleSend = () => {
    if (!draft.trim()) return;
    // Aquí podrías hacer POST al backend
    console.log("Enviar mensaje:", draft, "a chat:", activeContactId);
    setDraft("");
  };

  return (
    <Layout>
      <Header />
      <Body>
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => {
            const next = !sidebarCollapsed;
            setSidebarCollapsed(next);
            localStorage.setItem("ui.sidebarCollapsed", String(next));
          }}
        />
        <Content>
          <Panel>
            <PanelHeader>Mensajes</PanelHeader>
            <Messenger>
              <Contacts>
                {contacts.map((c) => (
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
                {loadingChats ? (
                  <EmptyStateFull>Cargando chats...</EmptyStateFull>
                ) : errorChats ? (
                  <EmptyStateFull>{errorChats}</EmptyStateFull>
                ) : chats.length === 0 ? (
                  <EmptyStateFull>No tienes chats disponibles</EmptyStateFull>
                ) : activeChat ? (
                  <ChatWrapper>
                    <ChatHeader>Chat con {activeContact?.name}</ChatHeader>
                    <Messages
                      style={{ paddingBottom: `calc(${composerH}px + 8px)` }}
                    >
                      {activeMessages.map((m) => (
                        <Bubble key={m.id} $mine={m.remitente === user?.uid}>
                          {m.contenido}
                        </Bubble>
                      ))}
                    </Messages>
                    <Composer ref={composerRef}>
                      <Input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Escribe un mensaje"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                      />
                      <SendButton onClick={handleSend}>Enviar</SendButton>
                    </Composer>
                  </ChatWrapper>
                ) : null}
              </ChatArea>
            </Messenger>
          </Panel>
        </Content>
      </Body>
    </Layout>
  );
}

// --------------------- Styled Components ---------------------
const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  background: ${({ theme }) => theme.colors.gray100};
`;
const Body = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 0;
`;
const Content = styled.main`
  padding: ${({ theme }) => theme.spacing(6)};
  overflow: hidden;
  min-height: 0;
`;
const Panel = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radii.lg};
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;
const PanelHeader = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  font-weight: 700;
`;
const Messenger = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  height: 100%;
  min-height: 0;
`;
const Contacts = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colors.gray200};
  overflow-y: auto;
`;
const ContactItem = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: left;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.gray50 : "transparent"};
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
`;
const ContactName = styled.div`
  font-weight: 700;
`;
const LastMessage = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray500};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ChatArea = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  min-height: 0;
`;
const ChatWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  min-height: 0;
`;
const ChatHeader = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  font-weight: 600;
`;
const Messages = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.gray50};
  min-height: 0;
`;
const Bubble = styled.div<{ $mine: boolean }>`
  align-self: ${({ $mine }) => ($mine ? "flex-end" : "flex-start")};
  background: ${({ $mine, theme }) => ($mine ? theme.colors.primary : "#fff")};
  color: ${({ $mine }) => ($mine ? "#fff" : "inherit")};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  max-width: 70%;
`;
const Composer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)};
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  background: #fff;
  position: sticky;
  bottom: 0;
  z-index: 1;
`;
const Input = styled.textarea`
  resize: none;
  height: 84px;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  font-family: inherit;
`;
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
`;
const EmptyStateFull = styled.div`
  grid-row: 1/-1;
  height: 100%;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.gray500};
  background: ${({ theme }) => theme.colors.gray50};
  padding: ${({ theme }) => theme.spacing(4)};
`;
