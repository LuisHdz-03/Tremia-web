import styled from 'styled-components'
import ForumPostCard, { type ForumPost } from './ForumPostCard'

const posts: ForumPost[] = [
  { id: 1, author: 'CLAUDIA SHEIMBAMBUU', handle: '@presidentaconadmujer', title: 'DEBATE SERIO: EL SEÑOR DE LA TIENDA ¿CÓMO SABE CUÁNTO ES UN PESO DE CILANTRO???', comments: 416 },
  { id: 2, author: 'María P.', handle: '@maria_p', title: 'Buenas prácticas en IA generativa para equipos pequeños', comments: 23 },
  { id: 3, author: 'Luis G.', handle: '@luis_g', title: 'Herramientas de análisis de datos en 2025: mi top 5', comments: 12 },
]

export default function ForumsList() {
  return (
    <Stack>
      {posts.map(p => (
        <ForumPostCard key={p.id} post={p} />
      ))}
    </Stack>
  )
}

const Stack = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(5)};
`
