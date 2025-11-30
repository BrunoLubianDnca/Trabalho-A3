import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../components/Input'
import { register } from '../services/auth'
import { Card, H1, Small, LargeButton, CenterCard } from '../components/UI'

const Page = styled.div`width:100%;min-height:calc(100vh - 48px);display:flex;align-items:center;justify-content:center;padding:24px;`
const Inner = styled.div`width:100%;max-width:420px;`

export default function RegisterPage(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    if(!username || !password) return setError('Preencha usuário e senha')
    if(password !== confirm) return setError('As senhas não conferem')
    const res = register({ username, password, name })
    if(res.ok){
      navigate('/dashboard')
    } else {
      setError(res.message)
    }
  }

  const valid = username && password && confirm && password === confirm

  return (
    <Page>
      <Inner>
        <CenterCard as={Card} style={{padding:24}}>
          <H1>Registrar</H1>
          <Small>Crie um usuário para usar o app</Small>
          <form onSubmit={handleSubmit} style={{marginTop:16}}>
            <Input label="Nome" value={name} onChange={e=>setName(e.target.value)} placeholder="Seu nome" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM4 20c0-3.314 2.686-6 6-6h4c3.314 0 6 2.686 6 6v1H4v-1z" fill="#60a5fa"/></svg>} />
            <Input label="Usuário" value={username} onChange={e=>setUsername(e.target.value)} placeholder="teacher" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14v2H5z" fill="#60a5fa"/></svg>} />
            <Input label="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 8V7a5 5 0 0 0-10 0v1H5v12h14V8h-2zM9 8a3 3 0 0 1 6 0v1H9V8z" fill="#60a5fa"/></svg>} />
            <Input label="Confirme a senha" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="password" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 8V7a5 5 0 0 0-10 0v1H5v12h14V8h-2zM9 8a3 3 0 0 1 6 0v1H9V8z" fill="#60a5fa"/></svg>} />
            {error && <div style={{color:'#dc2626',marginBottom:10}}>{error}</div>}
            <LargeButton type="submit" disabled={!valid}>Criar conta</LargeButton>
          </form>
        </CenterCard>
      </Inner>
    </Page>
  )
}
