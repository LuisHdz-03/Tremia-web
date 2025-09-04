import styled from 'styled-components'

export interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string
  label?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function EmailInput({ id = 'email', label = 'Email', value, onChange, placeholder = 'tu@email.com', ...rest }: EmailInputProps) {
  return (
    <Field>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input id={id} type="email" value={value} onChange={onChange} placeholder={placeholder} {...rest} />
    </Field>
  )
}

const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`

const Label = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray700};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const Input = styled.input`
  border: 2px solid ${({ theme }) => theme.colors.gray200};
  background: #ffffff;
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
`
