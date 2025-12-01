import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { classes as seed } from '../data/classes'
import { Card, H1, Small, GhostButton, LargeButton } from '../components/UI'
import Input from '../components/Input'
import styled from 'styled-components'
import Skeleton from '../components/Skeleton'
import { tokens } from '../styles/tokens'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 36px 32px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto 40px auto;
  padding: 0 32px;
  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px 36px;
    max-width: 1200px;
  }
  @media (min-width: 1300px) {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1500px;
  }
`

const CardMeta = styled.div`
  display:flex;justify-content:space-between;align-items:center;margin-top:12px;
`

export default function DashboardPage(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [newTeacher, setNewTeacher] = useState('')
  const [newStudents, setNewStudents] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{ document.title = 'Dashboard — Chamada Fácil' }, [])

  useEffect(()=>{
    const t = setTimeout(()=>{
      // load custom classes from localStorage and merge with seed
      try{
        const raw = localStorage.getItem('chamada_custom_classes')
        const custom = raw ? JSON.parse(raw) : []
        setItems([...seed, ...custom])
      }catch(e){
        setItems(seed)
      }
      setLoading(false)
    }, 500)
    return ()=>clearTimeout(t)
  },[])

  const filtered = items.filter(c => {
    if(!search) return true
    const q = search.toLowerCase()
    return c.name.toLowerCase().includes(q) || (c.teacher || '').toLowerCase().includes(q)
  })

  return (
    <div style={{
      width:'100%',
      minHeight:'100vh',
      background:'linear-gradient(120deg, #e0e7ff 0%, #f0fdfa 100%)',
      paddingBottom:48,
      fontFamily:'Segoe UI, Inter, Arial, sans-serif'}}>
      <div style={{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        maxWidth:1200,
        margin:'0 auto 24px auto',
        padding:'40px 32px 0 32px',
        width:'100%'}}>
        <div>
          <H1 style={{color:'#2563eb',letterSpacing:0.5}}>Turmas</H1>
          <Small style={{color:'#2563eb',fontWeight:500}}>Selecione uma turma para registrar presença</Small>
        </div>
        <div style={{display:'flex',gap:16}}>
          <LargeButton style={{background:'linear-gradient(90deg,#38bdf8 0%,#2563eb 100%)',boxShadow:'0 4px 24px #38bdf855'}} onClick={()=>setShowCreate(true)} aria-label="Criar turma">Criar turma</LargeButton>
          <GhostButton style={{color:'#2563eb',borderColor:'#2563eb'}} aria-label="Sair" onClick={()=>{localStorage.removeItem('chamada_user');navigate('/login')}}>Sair</GhostButton>
        </div>
      </div>

      <div style={{maxWidth:600, margin:'0 auto 28px auto', padding:'0 32px'}}>
        <Input label="Buscar turma" placeholder="nome ou professor" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>

      <Grid>
        {loading ? (
          Array.from({length:4}).map((_,i)=>(
            <Card key={i} style={{padding:18, borderRadius: tokens.radii.md}}><Skeleton height="20px" style={{marginBottom:8}} /><Skeleton height="14px" width="60%" /></Card>
          ))
        ) : (
          filtered.map(c => (
            <Card
              key={c.id}
              style={{
                padding: 22,
                borderRadius: tokens.radii.lg,
                boxShadow: '0 8px 32px #2563eb22, 0 1.5px 8px #38bdf855',
                border: '1.5px solid #38bdf8',
                background: 'linear-gradient(120deg,#fff 80%,#e0f2fe 100%)',
                transition: 'box-shadow 0.18s, border 0.18s, transform 0.18s',
                minHeight: 120,
                marginBottom: 0,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onMouseOver={e=>e.currentTarget.style.boxShadow='0 12px 36px #2563eb33, 0 2px 12px #38bdf855'}
              onMouseOut={e=>e.currentTarget.style.boxShadow='0 8px 32px #2563eb22, 0 1.5px 8px #38bdf855'}
            >
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontWeight:700,fontSize:18,color:'#2563eb',marginBottom:2}}>{c.name}</div>
                  <Small style={{color:'#0e7490',fontWeight:600}}>{c.teacher}</Small>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontWeight:700,fontSize:22,color:'#0ea5e9'}}>{c.students.length}</div>
                  <Small style={{color:'#2563eb'}}>alunos</Small>
                </div>
              </div>
              <CardMeta>
                <Link to={`/class/${c.id}`} style={{textDecoration:'none'}}>
                  <GhostButton style={{color:'#fff',background:'linear-gradient(90deg,#38bdf8 0%,#2563eb 100%)',border:'none',fontWeight:700,boxShadow:'0 2px 8px #2563eb33'}} aria-label={`Abrir chamada da turma ${c.name}`}>Abrir chamada</GhostButton>
                </Link>
              </CardMeta>
            </Card>
          ))
        )}
      </Grid>
      {showCreate && (
        <div style={{position:'fixed',inset:0,background:'rgba(2,6,23,0.4)',display:'flex',alignItems:'center',justifyContent:'center',padding:20}} aria-modal="true" role="dialog">
          <Card style={{maxWidth:600,width:'100%'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <div>
                <div style={{fontWeight:700}}>Criar turma</div>
                <Small>Adicione uma nova turma para demonstração</Small>
              </div>
              <button aria-label="Fechar" onClick={()=>setShowCreate(false)} style={{border:'none',background:'transparent',fontSize:18,cursor:'pointer'}}>✕</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <Input label="Nome da turma" placeholder="Ex.: Matemática - 3º Ano" value={newName} onChange={e=>setNewName(e.target.value)} />
              <Input label="Professor" placeholder="Nome do professor" value={newTeacher} onChange={e=>setNewTeacher(e.target.value)} />
              <Input label="Alunos (vírgula-separados)" placeholder="Ex.: Joao, Maria, Pedro" value={newStudents} onChange={e=>setNewStudents(e.target.value)} />
              <div style={{display:'flex',gap:8,marginTop:6}}>
                <LargeButton onClick={()=>{
                  const students = newStudents.split(',').map(s=>s.trim()).filter(Boolean).map((name,i)=>({ id: 's' + (Date.now()) + i, name }))
                  const id = 'c' + Date.now()
                  const c = { id, name: newName || 'Turma sem nome', teacher: newTeacher || 'Profesor(a)', students }
                  try{
                    const raw = localStorage.getItem('chamada_custom_classes')
                    const custom = raw ? JSON.parse(raw) : []
                    custom.push(c)
                    localStorage.setItem('chamada_custom_classes', JSON.stringify(custom))
                    setItems(prev=>[...prev, c])
                    setShowCreate(false)
                    setNewName('')
                    setNewTeacher('')
                    setNewStudents('')
                  }catch(e){
                    console.error('Erro ao criar turma', e)
                  }
                }}>Salvar</LargeButton>
                <GhostButton onClick={()=>setShowCreate(false)}>Cancelar</GhostButton>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
