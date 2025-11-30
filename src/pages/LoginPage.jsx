import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../components/Input'
import { login } from '../services/auth'
import { Link } from 'react-router-dom'
import { Card, H1, Small, LargeButton, CenterCard } from '../components/UI'
import Logo from '../assets/logo.svg'

const Page = styled.div`
  width:100%;min-height:calc(100vh - 48px);display:flex;align-items:center;justify-content:center;padding:24px;
`
const Inner = styled.div`
  width:100%;max-width:420px;
`
const TopLogo = styled.div`
  display:flex;align-items:center;justify-content:center;margin-bottom:6px;
  img{height:44px}
`

const Meta = styled.div`
  text-align:center;margin-bottom:14px;color:#475569;font-size:14px;
`
export default function LoginPage(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    const res = login({ username, password })
    if(res.ok){
      navigate('/dashboard')
    } else {
      setError(res.message)
    }
  }

  return (
    <Page>
      <Inner>
        <CenterCard as={Card} style={{padding:28}}>
          <TopLogo>
            <img src={Logo} alt="Chamada Fácil" />
          </TopLogo>
          <H1 style={{textAlign:'center',marginBottom:6}}>Bem-vindo</H1>
          <Meta>Faça login para acessar suas turmas e registrar chamadas</Meta>
          <form onSubmit={handleSubmit} style={{marginTop:6}}>
            <Input label="Usuário" value={username} onChange={e=>setUsername(e.target.value)} placeholder="teacher" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM4 20c0-3.314 2.686-6 6-6h4c3.314 0 6 2.686 6 6v1H4v-1z" fill="#60a5fa"/></svg>} />
            <Input label="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 8V7a5 5 0 0 0-10 0v1H5v12h14V8h-2zM9 8a3 3 0 0 1 6 0v1H9V8z" fill="#60a5fa"/></svg>} />
            {error && <div style={{color:'#dc2626',marginBottom:10}}>{error}</div>}
            <LargeButton type="submit" disabled={!username || !password}>Entrar</LargeButton>
          </form>
          <div style={{marginTop:12,textAlign:'center'}}>
            <Small>Não tem conta? <Link to="/register">Registre-se</Link></Small>
          </div>
        </CenterCard>
      </Inner>
    </Page>
  )
}
