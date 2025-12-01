import styled from 'styled-components'
import { tokens } from '../styles/tokens'

export const Card = styled.div`
  background: ${tokens.colors.surface};
  border-radius: ${tokens.radii.md};
  padding: 20px;
  box-shadow: 0 10px 30px rgba(15,23,42,0.06);
  border: 1px solid rgba(15,23,42,0.06);
`

export const H1 = styled.h1`
  margin:0 0 10px 0;
  font-size: ${tokens.typography.h1};
  color: ${tokens.colors.primary600};
  font-weight: 700;
  line-height: 1.1;
`

export const Small = styled.div`
  font-size:14px;
  color: ${tokens.colors.muted};
`

export const LargeButton = styled.button`
  background: ${props => props.variant === 'ghost' ? 'transparent' : `linear-gradient(180deg,${tokens.colors.primary} 0%,${tokens.colors.primary600} 100%)`};
  color: ${props => props.variant === 'ghost' ? tokens.colors.primary : '#fff'};
  border: ${props => props.variant === 'ghost' ? `1px solid rgba(37,99,235,0.12)` : 'none'};
  padding: 12px 18px;
  border-radius: ${tokens.radii.md};
  font-weight:700;
  cursor:pointer;
  display:inline-flex;align-items:center;justify-content:center;
  min-width:120px;
  box-shadow: ${props => props.variant === 'ghost' ? 'none' : '0 10px 22px rgba(37,99,235,0.10)'};
  transition: transform ${tokens.motion.fast} ease, box-shadow ${tokens.motion.fast} ease, opacity ${tokens.motion.fast} ease;
  &:active{ transform: translateY(1px) }
  &:disabled{ opacity: .6; cursor: not-allowed }
  @media(max-width:600px){
    width:100%;
    min-width:0;
  }
`

export const GhostButton = styled(LargeButton).attrs({ variant: 'ghost' })``

export const CenterCard = styled.div`
  width:100%;
  max-width:480px;
  margin:18px auto;
  padding: 0 12px;
`
