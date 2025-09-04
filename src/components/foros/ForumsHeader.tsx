import styled from 'styled-components'

export default function ForumsHeader() {
  return (
    <Bar role="region" aria-label="Filtros de foros">
      <Left>
        <Title>Foros</Title>
      </Left>
      <Filters>
        <SearchInput placeholder="Buscar foros..." />
        <Select>
          <option value="todos">Todos</option>
          <option value="activos">Activos</option>
          <option value="cerrados">Cerrados</option>
        </Select>
        <NewButton>+ Nuevo Foro</NewButton>
      </Filters>
    </Bar>
  )
}

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 10px;
`

const Left = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing(3)};
`

const Title = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  flex-wrap: wrap;
`

const SearchInput = styled.input`
  height: 36px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
`

const Select = styled.select`
  height: 36px;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
`

const NewButton = styled.button`
  height: 36px;
  padding: 0 12px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`
