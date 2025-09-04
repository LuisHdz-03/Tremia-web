import styled from 'styled-components'

const members = [
  { id: 1, name: 'María P.', role: 'Admin' },
  { id: 2, name: 'Luis G.', role: 'Moderador' },
  { id: 3, name: 'Ana Q.', role: 'Miembro' },
  { id: 4, name: 'Carlos S.', role: 'Miembro' },
  { id: 5, name: 'Iván T.', role: 'Miembro' },
]

export default function MembersAside() {
  return (
    <Wrapper aria-label="Miembros del foro">
      <Title>Miembros</Title>
      <List>
        {members.map(m => (
          <Row key={m.id}>
            <Avatar>{m.name.charAt(0)}</Avatar>
            <Info>
              <Name>{m.name}</Name>
              <Role>{m.role}</Role>
            </Info>
          </Row>
        ))}
      </List>
    </Wrapper>
  )
}

const Wrapper = styled.aside`
  width: 320px;
  min-width: 280px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 10px;
  height: fit-content;
`;

const Title = styled.h3`
  margin: 0;
  padding: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  &:last-child { border-bottom: none; }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: grid;
  place-items: center;
  font-weight: 700;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Role = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray600};
`;
