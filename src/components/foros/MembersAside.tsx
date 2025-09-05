import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  getSociosUsuariosApi,
  getOrganizacionUsuariosApi,
} from "@/api/usuarios";
import type { SocioUsuario, OrganizacionUsuario } from "@/api/usuarios";

export default function MembersAside() {
  const [miembros, setMiembros] = useState<
    Array<{ nombre: string; rol: string; email: string }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getSociosUsuariosApi(), getOrganizacionUsuariosApi()])
      .then(([socios, orgs]) => {
        setMiembros([
          ...socios.map((s) => ({
            nombre: s.nombre,
            rol: s.rol,
            email: s.email,
          })),
          ...orgs.map((o) => ({
            nombre: o.nombre,
            rol: o.rol,
            email: o.email,
          })),
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Wrapper aria-label="Miembros del foro">
      <Title>Miembros</Title>
      <List>
        {loading ? (
          <Row>
            <Info>Cargando miembros...</Info>
          </Row>
        ) : miembros.length === 0 ? (
          <Row>
            <Info>No hay miembros.</Info>
          </Row>
        ) : (
          miembros.map((m, idx) => (
            <Row key={String(m.email || m.nombre + idx)}>
              <Avatar>{m.nombre.charAt(0)}</Avatar>
              <Info>
                <Name>{m.nombre}</Name>
                <Role>{m.rol}</Role>
              </Info>
            </Row>
          ))
        )}
      </List>
    </Wrapper>
  );
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
  &:last-child {
    border-bottom: none;
  }
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
