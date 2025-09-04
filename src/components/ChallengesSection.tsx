import styled from 'styled-components'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

const challenges = [
  { id: 11, name: 'Reto IA Ética', state: 'en progreso' as const, participants: 42, owner: 'Equipo Ética', closeDate: '2025-09-10' },
  { id: 12, name: 'Optimización de Costos', state: 'abierto' as const, participants: 18, owner: 'FinOps', closeDate: '2025-10-01' },
  { id: 13, name: 'Analítica en Tiempo Real', state: 'próximo a cierre' as const, participants: 27, owner: 'Data Team', closeDate: '2025-09-05' },
]

export default function ChallengesSection() {
  return (
    <Section>
      <Header>
        <Title>Retos activos</Title>
      </Header>
      <List>
        {challenges.map((c) => (
          <Row key={c.id}>
            <div>
              <Primary>{c.name}</Primary>
              <Secondary>Resp.: {c.owner}</Secondary>
            </div>
            <Badge>
              <Chip $kind={c.state === 'próximo a cierre' ? 'warning' : 'primary'}>{c.state}</Chip>
            </Badge>
            <Secondary>{c.participants} part.</Secondary>
            <Secondary>Cierra: {c.closeDate}</Secondary>
            <Actions>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Btn>Acciones</Btn>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content sideOffset={6} asChild>
                    <Menu>
                      <MenuItem onSelect={() => { /* noop */ }}>Ver</MenuItem>
                      <MenuItem onSelect={() => { /* noop */ }}>Editar</MenuItem>
                      <MenuItem onSelect={() => { /* noop */ }}>Cerrar</MenuItem>
                    </Menu>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </Actions>
          </Row>
        ))}
      </List>
    </Section>
  )
}

const Section = styled.section`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 10px;
  padding: ${({ theme }) => theme.spacing(4)};
`

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`

const Title = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.6fr 0.5fr 0.6fr auto;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  &:last-child { border-bottom: none; }
`

const Primary = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const Secondary = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray600};
`
const Badge = styled.div`
  display: flex;
`
const Chip = styled.span<{ $kind: 'primary' | 'warning' }>`
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  ${({ $kind, theme }) => $kind === 'warning'
    ? `background: ${theme.colors.warning}22; color: ${theme.colors.warning};`
    : `background: ${theme.colors.primary}22; color: ${theme.colors.primary};`}
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
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
