import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
  padding:10px 14px;border-radius:999px;border:none;cursor:pointer;font-weight:700;
  background:${p => p.$on ? '#16a34a' : '#e2e8f0'};color:${p => p.$on ? '#fff' : '#475569'};
  transition:transform .12s ease, box-shadow .12s ease, background-color .12s ease;
  box-shadow: ${p => p.$on ? '0 6px 18px rgba(16,185,129,0.12)' : 'none'};
  &:active{transform:scale(.98)}
  &:focus{outline:3px solid rgba(37,99,235,0.12)}
`

export default function Toggle({$on, onClick, id}){
  return (
    <Btn
      role="switch"
      aria-checked={!!$on}
      aria-label={$on ? 'Presente' : 'Ausente'}
      $on={$on}
      onClick={onClick}
      data-student-id={id}
    >
      {$on ? 'Presente' : 'Ausente'}
    </Btn>
  )
}
