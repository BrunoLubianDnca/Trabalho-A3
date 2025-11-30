import React, {useEffect} from 'react'
import styled, {keyframes} from 'styled-components'
import { tokens } from '../styles/tokens'

const slideUp = keyframes`
  from { transform: translateY(8px); opacity:0 }
  to { transform: translateY(0); opacity:1 }
`

const Wrap = styled.div`
  position:fixed;bottom:20px;left:50%;transform:translateX(-50%);
  background:${tokens.colors.primary};color:#fff;padding:12px 18px;border-radius:10px;box-shadow:0 10px 26px rgba(16,24,40,0.18);
  display:flex;align-items:center;gap:10px;min-width:220px;animation:${slideUp} ${tokens.motion.normal} ease both;
`

const Msg = styled.div`font-size:14px`

export default function Snackbar({message, open, onClose, tone='info'}){
  useEffect(()=>{
    if(open){
      const t = setTimeout(()=>onClose?.(), 2800)
      return ()=>clearTimeout(t)
    }
  },[open])
  if(!open) return null
  return (
    <Wrap role="status" aria-live="polite">
      <Msg>{message}</Msg>
    </Wrap>
  )
}
