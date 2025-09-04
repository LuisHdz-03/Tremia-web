import styled from 'styled-components'

export type CommentItem = {
  id: string
  author: string
  content: string
  createdAt: string | Date
}

export type CommentsPanelProps = {
  comments?: CommentItem[]
  loading?: boolean
  emptyMessage?: string
  className?: string
}

// Simple relative time in Spanish (sin dependencias externas)
function formatRelativeEs(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const sec = Math.round(diffMs / 1000)
  if (sec < 60) return `hace ${sec} s`
  const min = Math.round(sec / 60)
  if (min < 60) return `hace ${min} min`
  const hrs = Math.round(min / 60)
  if (hrs < 24) return `hace ${hrs} h`
  const days = Math.round(hrs / 24)
  if (days < 30) return `hace ${days} d`
  const months = Math.round(days / 30)
  if (months < 12) return `hace ${months} mes${months === 1 ? '' : 'es'}`
  const years = Math.round(months / 12)
  return `hace ${years} año${years === 1 ? '' : 's'}`
}

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const Body = styled.div`
  height: 260px; /* altura fija */
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.gray50};
`

const CommentCard = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-areas:
    'avatar header'
    'avatar content';
  gap: 6px 12px;
  padding: 10px 0;
  &:not(:last-child) { border-bottom: 1px solid ${({ theme }) => theme.colors.gray200}; }
`

const Avatar = styled.div`
  grid-area: avatar;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
`

const CommentHeader = styled.div`
  grid-area: header;
  display: flex;
  align-items: baseline;
  gap: 8px;
`

const Author = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 700;
`

const Time = styled.span`
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 0.85rem;
`

const CommentText = styled.div`
  grid-area: content;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`

const Empty = styled.div`
  color: ${({ theme }) => theme.colors.gray600};
  text-align: center;
  padding: ${({ theme }) => theme.spacing(6)} 0;
`

const Loading = styled.div`
  color: ${({ theme }) => theme.colors.gray600};
  text-align: center;
  padding: ${({ theme }) => theme.spacing(6)} 0;
`

export const sampleComments: CommentItem[] = [
  { id: 'c1', author: 'Ana Gómez', content: '¡Excelente aporte, gracias por compartir!', createdAt: new Date(Date.now() - 5 * 60 * 1000) },
  { id: 'c2', author: 'Luis Pérez', content: 'Tengo una duda sobre el segundo punto.', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: 'c3', author: 'María Ruiz', content: 'Comparto un recurso que puede ayudar: https://ejemplo.com', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
]

export default function CommentsPanel({ comments, loading, emptyMessage = 'Sin comentarios', className }: CommentsPanelProps) {
  const list = comments && comments.length > 0 ? comments : sampleComments
  return (
    <Wrapper className={className}>
      <Header>
        <Title>Comentarios</Title>
      </Header>
      <Body>
        {loading ? (
          <Loading>Cargando comentarios…</Loading>
        ) : list.length === 0 ? (
          <Empty>{emptyMessage}</Empty>
        ) : (
          list.map((c) => {
            const date = c.createdAt instanceof Date ? c.createdAt : new Date(c.createdAt)
            const initials = c.author.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
            return (
              <CommentCard key={c.id}>
                <Avatar aria-hidden>{initials}</Avatar>
                <CommentHeader>
                  <Author>{c.author}</Author>
                  <Time>{formatRelativeEs(date)}</Time>
                </CommentHeader>
                <CommentText>{c.content}</CommentText>
              </CommentCard>
            )
          })
        )}
      </Body>
    </Wrapper>
  )
}
