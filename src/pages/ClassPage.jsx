import React, {useState, useMemo, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { classes as seed } from '../data/classes'
import { Card, H1, Small, LargeButton, GhostButton } from '../components/UI'
import Toggle from '../components/Toggle'
import styled from 'styled-components'
import { tokens } from '../styles/tokens'
import Snackbar from '../components/Snackbar'
import { downloadJSON } from '../utils/downloadJSON'
import Skeleton from '../components/Skeleton'

const List = styled.div`
  display:flex;flex-direction:column;gap:12px;margin-top:16px;max-width:840px;width:100%;
`

const StudentRow = styled.div`
  display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;
`
const Left = styled.div`display:flex;align-items:center;gap:12px;`
const Avatar = styled.div`
  width:44px;height:44px;border-radius:10px;background:linear-gradient(180deg,#eef4ff,#e6f0ff);display:flex;align-items:center;justify-content:center;font-weight:700;color:${tokens.colors.primary};
`
const Name = styled.div`font-weight:700;font-size:16px;color:#0f172a;`

export default function ClassPage(){
  const { id } = useParams()
  const [klass, setKlass] = useState(null)
  const [loading, setLoading] = useState(true)
  const [present, setPresent] = useState({})
  const [snackOpen, setSnackOpen] = useState(false)
  const [summary, setSummary] = useState(null)

  useEffect(()=>{
    const t = setTimeout(()=>{
      const c = seed.find(x=>x.id===id)
      setKlass(c)
      if(c){
        // try to load saved attendance for this class
        const saved = localStorage.getItem(`attendance_${c.id}`)
        if(saved){
          try{
            setPresent(JSON.parse(saved))
          }catch(e){
            const init = {}
            c.students.forEach(s=>init[s.id]=false)
            setPresent(init)
          }
        } else {
          const init = {}
          c.students.forEach(s=>init[s.id]=false)
          setPresent(init)
        }
      }
      setLoading(false)
    }, 400)
    return ()=>clearTimeout(t)
  },[id])

  useEffect(()=>{
    if(klass) document.title = `${klass.name} — Chamada Fácil`
    return ()=>{ document.title = 'Chamada Fácil' }
  },[klass])

  const counts = useMemo(()=>{
    const total = klass?.students.length || 0
    const presentes = Object.values(present).filter(Boolean).length
    return { total, presentes, ausentes: total - presentes }
  },[present, klass])

  function toggleStudent(sid){
    setPresent(p=>{
      const next = { ...p, [sid]: !p[sid] }
      // persist per-class
      if(klass?.id) localStorage.setItem(`attendance_${klass.id}`, JSON.stringify(next))
      return next
    })
  }

  function finalize(){
    const data = { classId: klass.id, className: klass.name, counts: counts, timestamp: new Date().toISOString(), attendance: present }
    setSummary(data)
    // persist summary for later
    localStorage.setItem(`summary_${klass.id}`, JSON.stringify(data))
    setSnackOpen(true)
  }

  return (
    <div style={{width:'100%'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',maxWidth:900}}>
        <div>
          <H1>{klass ? klass.name : 'Turma'}</H1>
          <Small>{klass?.teacher}</Small>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontWeight:700}}>{counts.presentes} presentes de {counts.total}</div>
          <Small>{counts.total ? Math.round((counts.presentes / counts.total) * 100) + '% presente' : ''}</Small>
        </div>
      </div>

      {loading ? (
        <div style={{maxWidth:900}}>
          <Skeleton height="24px" style={{marginBottom:8}} />
          <Skeleton height="16px" width="60%" />
        </div>
      ) : (
        <>
          <List>
            {klass?.students.map(s=> (
              <Card key={s.id} style={{padding:'14px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <StudentRow>
                  <Left>
                    <Avatar aria-hidden style={{background: present[s.id] ? 'linear-gradient(180deg,#ddfff0,#d1f7e6)' : 'linear-gradient(180deg,#eef4ff,#e6f0ff)', color: present[s.id] ? tokens.colors.accent : tokens.colors.primary}}>{s.name.charAt(0)}</Avatar>
                    <div>
                      <Name>{s.name}</Name>
                      <Small>{s.email || ''}</Small>
                    </div>
                  </Left>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}>
                    <Toggle $on={!!present[s.id]} onClick={()=>toggleStudent(s.id)} id={s.id} />
                  </div>
                </StudentRow>
              </Card>
            ))}
          </List>

          <div style={{marginTop:16,display:'flex',gap:12,flexWrap:'wrap'}}>
            <LargeButton aria-label="Finalizar chamada" onClick={finalize}>Finalizar chamada</LargeButton>
            {summary ? (
              <GhostButton aria-label="Exportar resumo como JSON" onClick={()=>{ downloadJSON('resumo-chamada.json', summary); setSnackOpen(true); }}>Exportar JSON</GhostButton>
            ) : (
              <GhostButton aria-label="Exportar resumo como JSON" disabled>Exportar JSON</GhostButton>
            )}
          </div>

          {summary && (
            <Card style={{marginTop:12}}>
              <div style={{fontWeight:700}}>Resumo</div>
              <Small>Presentes: {counts.presentes} — Ausentes: {counts.ausentes} — Total: {counts.total}</Small>
            </Card>
          )}
        </>
      )}

      <Snackbar open={snackOpen} message="Chamada finalizada" onClose={()=>setSnackOpen(false)} />
    </div>
  )
}
