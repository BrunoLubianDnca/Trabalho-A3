import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { classes as seed } from '../data/classes'
import { Card, H1, Small, GhostButton } from '../components/UI'
import styled from 'styled-components'
import Skeleton from '../components/Skeleton'
import { tokens } from '../styles/tokens'

const Grid = styled.div`
  display:grid;grid-template-columns:repeat(1,1fr);gap:12px;width:100%;max-width:900px;
  @media(min-width:720px){grid-template-columns:repeat(2,1fr)}
`

const CardMeta = styled.div`
  display:flex;justify-content:space-between;align-items:center;margin-top:12px;
`

export default function DashboardPage(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    const t = setTimeout(()=>{
      setItems(seed)
      setLoading(false)
    }, 500)
    return ()=>clearTimeout(t)
  },[])

  return (
    <div style={{width:'100%'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',maxWidth:900,marginBottom:12}}>
        <div>
          <H1>Turmas</H1>
          <Small>Selecione uma turma para registrar presença</Small>
        </div>
        <GhostButton onClick={()=>{localStorage.removeItem('chamada_user');navigate('/login')}}>Sair</GhostButton>
      </div>

      <Grid>
        {loading ? (
          Array.from({length:4}).map((_,i)=>(
            <Card key={i} style={{padding:18, borderRadius: tokens.radii.md}}><Skeleton height="20px" style={{marginBottom:8}} /><Skeleton height="14px" width="60%" /></Card>
          ))
        ) : (
          items.map(c => (
            <Card key={c.id} style={{padding:18, borderRadius: tokens.radii.md}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:700}}>{c.name}</div>
                  <Small>{c.teacher}</Small>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontWeight:700,fontSize:18}}>{c.students.length}</div>
                  <Small>alunos</Small>
                </div>
              </div>
              <CardMeta>
                <Link to={`/class/${c.id}`} style={{textDecoration:'none'}}>
                  <GhostButton>Abrir chamada</GhostButton>
                </Link>
              </CardMeta>
            </Card>
          ))
        )}
      </Grid>
    </div>
  )
}
