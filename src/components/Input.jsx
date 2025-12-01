import React, { useId } from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  display:flex;flex-direction:column;margin-bottom:14px;width:100%;position:relative;
`
const Label = styled.label`
  font-size:14px;color:#334155;margin-bottom:8px;font-weight:600;
`
const Field = styled.input`
  padding:14px 16px 14px 44px;border-radius:12px;border:1px solid #e6eef8;font-size:16px;outline:none;background:#fbfdff;
  width:100%;
  &:focus{box-shadow:0 6px 20px rgba(37,99,235,0.10);border-color:#60a5fa}
  &[data-error='true']{ border-color: #dc2626; box-shadow: 0 6px 20px rgba(220,38,38,0.06) }
`

const Helper = styled.div`
  margin-top:6px;font-size:13px;color:#dc2626;min-height:18px;
`

const IconWrap = styled.div`
  position:absolute;left:12px;top:42px;transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:20px;height:20px;color:#60a5fa;
`

export default function Input({label, icon, error, helperText, id, ...props}){
  const generatedId = useId()
  const inputId = id || `input-${generatedId}`
  return (
    <Wrap>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      {icon && <IconWrap aria-hidden>{icon}</IconWrap>}
      <Field id={inputId} {...props} data-error={!!error} aria-invalid={!!error} />
      <Helper id={inputId ? `${inputId}-helper` : undefined}>{error ? error : (helperText || '')}</Helper>
    </Wrap>
  )
}
