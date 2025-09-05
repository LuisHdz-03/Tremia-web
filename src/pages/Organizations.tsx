import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import ChatWidget from "../components/ChatWidget";
import {
  getOrganizacionUsuariosApi,
  type OrganizacionUsuario,
} from "../api/usuarios";

// La data proviene de GET /usuarios/rol/organizacion

export default function Organizations() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [list, setList] = useState<OrganizacionUsuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getOrganizacionUsuariosApi();
        if (mounted) setList(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Error cargando organizaciones", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container>
      <Header />
      <BodyLayout>
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <Content>
          <HeaderCard>
            <HeaderCardBody>
              <PageTitle>Organizaciones</PageTitle>
            </HeaderCardBody>
          </HeaderCard>

          <TableCard>
            <TableHeader>
              <TableTitle>Listado</TableTitle>
            </TableHeader>
            <TableWrapper>
              <StyledTable>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Sector</th>
                    <th>Intereses</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5}>
                        <MutedText>Cargando…</MutedText>
                      </td>
                    </tr>
                  ) : list.length === 0 ? (
                    <tr>
                      <td colSpan={5}>
                        <MutedText>Sin resultados</MutedText>
                      </td>
                    </tr>
                  ) : (
                    list.map((o) => (
                      <tr key={o.email}>
                        <td>
                          <PrimaryText>{o.nombre}</PrimaryText>
                        </td>
                        <td>
                          <MutedText>{o.email}</MutedText>
                        </td>
                        <td>
                          <MutedText>{o.sector}</MutedText>
                        </td>
                        <td>
                          <MutedText>
                            {Array.isArray(o.intereses)
                              ? o.intereses.join(", ")
                              : String(o.intereses)}
                          </MutedText>
                        </td>
                        <td>
                          <RowActions>
                            <RowActionBtn>Acciones</RowActionBtn>
                          </RowActions>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </StyledTable>
            </TableWrapper>
          </TableCard>
        </Content>
      </BodyLayout>
      <ChatWidget />
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const BodyLayout = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(6)};
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.gray50};
`;

const HeaderCard = styled(Card)`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const HeaderCardBody = styled.div`
  padding: ${({ theme }) => theme.spacing(6)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

const TableCard = styled(Card)`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  /* margen inferior para no tapar el widget de mensajes */
  margin-bottom: ${({ theme }) => theme.spacing(10)};
`;
const TableHeader = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
`;
const TableTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  thead th {
    text-align: left;
    padding: ${({ theme }) => theme.spacing(3)}
      ${({ theme }) => theme.spacing(4)};
    color: ${({ theme }) => theme.colors.gray600};
    background: ${({ theme }) => theme.colors.gray100};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    font-weight: 600;
    white-space: nowrap;
  }

  tbody td {
    padding: ${({ theme }) => theme.spacing(3)}
      ${({ theme }) => theme.spacing(4)};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    vertical-align: top;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const PrimaryText = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const MutedText = styled.div`
  color: ${({ theme }) => theme.colors.gray600};
  line-height: 1.4;
`;

const RowActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const RowActionBtn = styled.button`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(3)};
  font-size: 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: #fff;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gray100};
    border-color: ${({ theme }) => theme.colors.gray400};
  }
`;
