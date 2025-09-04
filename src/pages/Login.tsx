import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signIn } from '../auth/authService'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const translateAuthError = (code: string): string => {
    switch (code) {
      case 'auth/invalid-email':
        return 'El correo no tiene un formato válido.'
      case 'auth/user-disabled':
        return 'Tu cuenta está deshabilitada. Contacta al administrador.'
      case 'auth/user-not-found':
        return 'No existe una cuenta con ese correo.'
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'La contraseña es incorrecta.'
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Inténtalo más tarde.'
      case 'auth/network-request-failed':
        return 'Problema de red. Revisa tu conexión a internet.'
      case 'auth/operation-not-allowed':
        return 'El inicio de sesión por correo/contraseña no está habilitado.'
      default:
        return 'No se pudo iniciar sesión. Verifica tus datos e inténtalo de nuevo.'
    }
  }

  const handleLogin = async () => {
    setError(null)
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/dashboard', { replace: true })
    } catch (e: any) {
      const message = translateAuthError(e?.code || '')
      setError(message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Wrapper>
      <Layout>
        <LeftPane>
          <Brand>Tremia</Brand>
          <Card>
            <Title>Login</Title>
            <Field>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Field>
            <Field>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                onKeyDown={(e) => { if (e.key === 'Enter') handleLogin() }}
              />
            </Field>
            {error && <ErrorMsg role="alert">{error}</ErrorMsg>}
            <Button onClick={handleLogin} disabled={loading} aria-busy={loading}>
              {loading ? 'Ingresando...' : 'Entrar'}
            </Button>
          </Card>
          <SmallPrint>
            © {new Date().getFullYear()} Tremia. All rights reserved.
          </SmallPrint>
        </LeftPane>
      </Layout>
    </Wrapper>
  )
}



const Wrapper = styled.main`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center; /* centra el contenido */
  padding: 0 ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

const LeftPane = styled.aside`
  width: 100%;
  max-width: 440px;
  padding: ${({ theme }) => theme.spacing(8)} 0;
  display: grid;
  grid-template-rows: auto auto auto;
  gap: ${({ theme }) => theme.spacing(6)};
`;

/* RightPane eliminado: sin imagen de fondo, diseño centrado */

const Card = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  padding: ${({ theme }) => theme.spacing(6)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(5)};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  min-width: 0;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin: 0;
`;

const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
`;

const Label = styled.label`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray700};
  font-weight: 600;
`;

const Input = styled.input`
  border: 2px solid ${({ theme }) => theme.colors.gray200};
  background: #fff;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(4)};
  font-size: 1rem;
  font-weight: 500;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus { 
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(41, 87, 205, 0.15);
  }
  
  &::placeholder { 
    color: ${({ theme }) => theme.colors.gray400};
    font-weight: 400;
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(6)};
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
  margin-top: ${({ theme }) => theme.spacing(2)};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(41, 87, 205, 0.25);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(41, 87, 205, 0.25);
  }
  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(41, 87, 205, 0.35);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Brand = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)} 0;
  border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  width: fit-content;
`;


const SmallPrint = styled.p`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: 0.8rem;
`;

const ErrorMsg = styled.div`
  color: #b00020;
  background: #fde7e9;
  border: 1px solid #f4c7cf;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.9rem;
`

// placeholder eliminado: RightPane ahora usa imagen de fondo
