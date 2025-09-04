import styled from 'styled-components'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

const alerts = [
  { id: 21, type: 'solicitud de acceso', date: '2025-09-03', priority: 'alta' as const, status: 'pendiente' as const },
  { id: 22, type: 'usuario reportado', date: '2025-09-02', priority: 'media' as const, status: 'pendiente' as const },
  { id: 23, type: 'reto vencido', date: '2025-08-31', priority: 'alta' as const, status: 'resuelto' as const },
]

export default function AdminAlertsSection() {
  return (
    <Section>
      <Header>
        <Title>Alertas</Title>
      </Header>
      <List>
        {alerts.map((a) => (
          <Row key={a.id}>
            <div>
              <Primary>{a.type}</Primary>
              <Secondary>{a.date}</Secondary>
            </div>
            <Chip $kind={a.priority === 'alta' ? 'danger' : a.priority === 'media' ? 'warning' : 'success'}>
              {a.priority}
            </Chip>
            <Chip $kind={a.status === 'pendiente' ? 'warning' : 'success'}>
              {a.status}
            </Chip>
            <Actions>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Btn>Acciones</Btn>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content sideOffset={6} asChild>
                    <Menu>
                      <MenuItem onSelect={() => { /* noop */ }}>Ver</MenuItem>
                      <MenuItem onSelect={() => { /* noop */ }}>Resolver</MenuItem>
                      <MenuItem onSelect={() => { /* noop */ }}>Archivar</MenuItem>
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
  grid-template-columns: 1.2fr 0.5fr 0.6fr auto;
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

const Chip = styled.span<{ $kind: 'primary' | 'success' | 'warning' | 'danger' }>`
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  ${({ $kind, theme }) => {
    const map = {
      primary: `${theme.colors.primary}22; color: ${theme.colors.primary};`,
      success: `${theme.colors.success}22; color: ${theme.colors.success};`,
      warning: `${theme.colors.warning}22; color: ${theme.colors.warning};`,
      danger: `${theme.colors.danger}22; color: ${theme.colors.danger};`,
    } as const
    return `background: ${map[$kind]}`
  }}
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
