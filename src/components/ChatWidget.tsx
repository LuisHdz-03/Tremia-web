import styled from "styled-components";
import { useState } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import axios from "axios";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { id?: string; remitente?: string; contenido: string }[]
  >([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      // Llamada al asistente virtual
      const { data } = await axios.post("/chat/asistente", {
        mensaje: message,
      });
      setChatMessages([
        ...chatMessages,
        { contenido: message, remitente: "usuario" },
        { contenido: data.respuesta, remitente: "bot" },
      ]);
      setMessage("");
    } catch (err) {
      console.error("Error enviando mensaje al bot:", err);
    }
  };

  return (
    <>
      {isOpen && (
        <ChatWindow>
          <ChatHeader>
            <HeaderTitle>
              <ChatIcon>
                <FiMessageCircle size={16} />
              </ChatIcon>
              Asistente Virtual
            </HeaderTitle>
            <CloseButton onClick={() => setIsOpen(false)}>
              <FiX size={18} />
            </CloseButton>
          </ChatHeader>

          <ChatBody>
            {chatMessages.length === 0 && (
              <MessageBubble $isBot>
                ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?
              </MessageBubble>
            )}
            {chatMessages.map((m, i) => (
              <MessageBubble key={i} $isBot={m.remitente === "bot"}>
                {m.contenido}
              </MessageBubble>
            ))}
          </ChatBody>

          <ChatFooter>
            <MessageInput
              type="text"
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <SendButton onClick={handleSend} disabled={!message.trim()}>
              <FiSend size={16} />
            </SendButton>
          </ChatFooter>
        </ChatWindow>
      )}

      <FloatingButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </FloatingButton>
    </>
  );
}

// --- Styled components ---
const FloatingButton = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(41, 87, 205, 0.3);
  z-index: 1000;
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 350px;
  height: 500px;
  background: #fff;
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  display: flex;
  flex-direction: column;
  z-index: 999;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-weight: 600;
  font-size: 0.9rem;
`;
const ChatIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.radii.sm};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(4)};
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.gray50};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;
const MessageBubble = styled.div<{ $isBot?: boolean }>`
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radii.lg};
  max-width: 80%;
  font-size: 0.9rem;
  line-height: 1.4;
  ${({ $isBot, theme }) =>
    $isBot
      ? `
    background:#fff; color:${theme.colors.textSecondary}; align-self:flex-start; border:1px solid ${theme.colors.gray200};
  `
      : `
    background:${theme.colors.primary}; color:#fff; align-self:flex-end;
  `}
`;
const ChatFooter = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  background: #fff;
`;
const MessageInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(3)};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.radii.md};
  outline: none;
  font-size: 0.9rem;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(41, 87, 205, 0.1);
  }
`;
const SendButton = styled.button`
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  &:hover:not(:disabled) {
    background: #1e4ba8;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
