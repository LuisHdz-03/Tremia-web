import styled from 'styled-components'
import { useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { FiMoreVertical, FiHeart, FiMessageCircle } from 'react-icons/fi'
import CommentsPanel from '../forum/CommentsPanel'

export type ForumPost = {
  id: number
  author: string
  handle: string
  title: string
  imagePlaceholder?: boolean
  comments: number
}

export default function ForumPostCard({ post }: { post: ForumPost }) {
  const [showComments, setShowComments] = useState(false)
  return (
    <Card role="article" aria-label={`Publicación de ${post.author}`}>
      <Header>
        <Avatar aria-hidden>{post.author.charAt(0)}</Avatar>
        <AuthorBlock>
          <AuthorName>{post.author}</AuthorName>
          <Handle>{post.handle}</Handle>
        </AuthorBlock>
        <Actions>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <IconButton aria-label="Acciones de la publicación">
                <FiMoreVertical size={18} />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content sideOffset={6} asChild>
                <Menu>
                  <MenuItem onSelect={() => { /* noop */ }}>Ver</MenuItem>
                  <MenuItem onSelect={() => { /* noop */ }}>Editar</MenuItem>
                  <MenuItem onSelect={() => { /* noop */ }}>Eliminar</MenuItem>
                  <MenuItem onSelect={() => { /* noop */ }}>Reportar</MenuItem>
                </Menu>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </Actions>
      </Header>

      <Title>{post.title}</Title>

      <ProblemText>
        <strong>Problemática:</strong> La organización enfrenta ineficiencias operativas por falta de integración entre sistemas de ventas, inventario y distribución. 
        Esta desconexión genera datos inconsistentes, quiebres de stock y demoras en la reposición, impactando el nivel de servicio y los costos logísticos. 
        ¿Qué enfoque recomendarías para un diagnóstico integral (procesos, datos y tecnología) y qué prácticas sugieres para priorizar iniciativas de 
        integración y automatización con impacto medible en tiempos de ciclo y exactitud de inventario?
      </ProblemText>

      <Footer>
        <FooterRight>
          <CommentsButton
            type="button"
            aria-label="Mostrar comentarios"
            aria-pressed={showComments}
            onClick={() => setShowComments((v) => !v)}
          >
            <FiMessageCircle size={18} />
            <span>{post.comments}</span>
          </CommentsButton>
          <ReactionButton aria-label="Me gusta">
            <FiHeart size={18} />
          </ReactionButton>
        </FooterRight>
      </Footer>

      {showComments && (
        <CommentsSection>
          <CommentsPanel />
        </CommentsSection>
      )}
    </Card>
  )
}

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 12px;
  overflow: hidden;
`

const Header = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr auto;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  padding: ${({ theme }) => theme.spacing(4)};
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: grid;
  place-items: center;
  font-weight: 800;
`

const AuthorBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const AuthorName = styled.div`
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const Handle = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray600};
`

const Actions = styled.div`
  display: flex;
  align-items: center;
`

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  &:hover { background: ${({ theme }) => theme.colors.gray100}; }
`

const Menu = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  min-width: 180px;
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

const Title = styled.div`
  padding: 0 ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`
const ProblemText = styled.div`
  margin: 0 ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing(4)};
`

const FooterRight = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-left: auto;
`

const ReactionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: #fff;
  border: 2px solid #d24c43; /* tono como el corazón del mock */
  color: #d24c43;
  display: grid;
  place-items: center;
  cursor: pointer;
`

const CommentsButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
  border: none;
  cursor: pointer;
`

const CommentsSection = styled.div`
  padding: 0 ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(4)};
`

// ShareButton eliminado según requerimiento
