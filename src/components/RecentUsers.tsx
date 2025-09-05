import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { getSolicitudesApi, type Solicitud } from "../api/solicitudes";

export default function RecentUsers() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    getSolicitudesApi()
      .then(setSolicitudes)
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(solicitudes.length / pageSize);
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return solicitudes.slice(start, start + pageSize);
  }, [page, solicitudes]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  if (loading) return <p>Cargando...</p>;
  if (solicitudes.length === 0) return <p>No hay solicitudes.</p>;

  return (
    <Section>
      <Header>
        <Title>Solicitudes de entrada</Title>
      </Header>
      <List>
        {pageItems.map((s) => (
          <Row key={s.id}>
            <UserCell>
              <AvaRoot>
                <AvaFallback>
                  {(s.email || "")
                    .split(/[@.]/)
                    .filter((n: string) => n.length > 0)
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join("")}
                </AvaFallback>
              </AvaRoot>
              <Email>{s.email}</Email>
            </UserCell>
            <Primary>{s.asunto}</Primary>
            <Secondary>{s.descripcion}</Secondary>
            <Secondary>
              {new Date(s.fechaSolicitud).toLocaleDateString()}
            </Secondary>
            <Actions>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Btn>Acciones</Btn>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content sideOffset={6} asChild>
                    <Menu>
                      <MenuItem
                        onSelect={() => {
                          /* noop */
                        }}
                      >
                        Aceptar
                      </MenuItem>
                      <MenuItem
                        onSelect={() => {
                          /* noop */
                        }}
                      >
                        Rechazar
                      </MenuItem>
                    </Menu>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </Actions>
          </Row>
        ))}
      </List>
      <Pagination>
        <PageButton onClick={goPrev} disabled={page === 1}>
          Anterior
        </PageButton>
        <PageInfo>
          Página {page} de {totalPages}
        </PageInfo>
        <PageButton onClick={goNext} disabled={page === totalPages}>
          Siguiente
        </PageButton>
      </Pagination>
    </Section>
  );
}
const Email = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px; /* 👈 ajusta este ancho según lo que prefieras */
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 10px;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const PageInfo = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray600};
`;

const PageButton = styled.button`
  background: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.85rem;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 2fr 0.6fr auto;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  &:last-child {
    border-bottom: none;
  }
`;

const UserCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  min-width: 240px;
`;

const AvaRoot = styled(Avatar.Root)`
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  flex-shrink: 0;
`;

const AvaFallback = styled(Avatar.Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;

const Primary = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Secondary = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray600};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Btn = styled.button`
  background: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.85rem;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.gray200};
  }
`;

const Menu = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 8px;
  min-width: 160px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 4px;
`;

const MenuItem = styled(DropdownMenu.Item)`
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
  }
`;
