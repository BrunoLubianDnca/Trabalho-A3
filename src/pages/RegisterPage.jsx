import React, {useState, useEffect} from 'react'
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
  const [errors, setErrors] = useState({ username: '', password: '', confirm: '', form: '' })
  const navigate = useNavigate()

  useEffect(()=>{ document.title = 'Registrar — Chamada Fácil' }, [])

  function handleSubmit(e){
    e.preventDefault()
    const next = { username: '', password: '', confirm: '', form: '' }
    if(!username) next.username = 'Preencha o usuário'
    if(!password) next.password = 'Preencha a senha'
    if(password && password.length < 6) next.password = 'Senha deve ter ao menos 6 caracteres'
    if(password !== confirm) next.confirm = 'As senhas não conferem'
    if(next.username || next.password || next.confirm){
      setErrors(next)
      return
    }
    const res = register({ username, password, name })
    if(res.ok){
      navigate('/dashboard')
    } else {
      setErrors({ ...next, form: res.message })
    }
  }

  const valid = username && password && confirm && password === confirm

  function handleUsernameBlur(){
    if(!username) return
    // check existence via auth helper
    import('../services/auth').then(mod => {
      if(mod.userExists(username)){
        setErrors(e => ({ ...e, username: 'Usuário já existe' }))
      }
    })
  }
  return (
    <Page>
      <Inner>
        <CenterCard as={Card} style={{padding:24}}>
          <H1>Registrar</H1>
          <Small>Crie um usuário para usar o app</Small>
          <form onSubmit={handleSubmit} style={{marginTop:16}}>
            <Input label="Nome" value={name} onChange={e=>setName(e.target.value)} placeholder="Seu nome" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM4 20c0-3.314 2.686-6 6-6h4c3.314 0 6 2.686 6 6v1H4v-1z" fill="#60a5fa"/></svg>} />
            <Input label="Usuário" value={username} onChange={e=>{ setUsername(e.target.value); if(errors.username||errors.form) setErrors({ username: '', password: '', confirm: '', form: '' }) }} onBlur={handleUsernameBlur} placeholder="seu usuário" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14v2H5z" fill="#60a5fa"/></svg>} error={errors.username} />
            <Input label="Senha" type="password" value={password} onChange={e=>{ setPassword(e.target.value); if(errors.password||errors.form) setErrors({ username: '', password: '', confirm: '', form: '' }) }} placeholder="sua senha" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 8V7a5 5 0 0 0-10 0v1H5v12h14V8h-2zM9 8a3 3 0 0 1 6 0v1H9V8z" fill="#60a5fa"/></svg>} error={errors.password} />
            <Input label="Confirme a senha" type="password" value={confirm} onChange={e=>{ setConfirm(e.target.value); if(errors.confirm||errors.form) setErrors({ username: '', password: '', confirm: '', form: '' }) }} placeholder="sua senha" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 8V7a5 5 0 0 0-10 0v1H5v12h14V8h-2zM9 8a3 3 0 0 1 6 0v1H9V8z" fill="#60a5fa"/></svg>} error={errors.confirm} />
            {errors.form && <div style={{color:'#dc2626',marginBottom:10}}>{errors.form}</div>}
            <LargeButton type="submit" aria-label="Criar conta" disabled={!valid}>Criar conta</LargeButton>
          </form>
        </CenterCard>
      </Inner>
    </Page>
  )
}
