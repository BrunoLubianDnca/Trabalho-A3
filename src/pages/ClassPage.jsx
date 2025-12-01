const PresenceButton = styled.button`
  padding: 7px 14px;
  border-radius: 10px;
  border: 1.5px solid #e5e7eb;
  background: ${({ $on }) => $on ? '#16a34a' : '#fff'};
  color: ${({ $on }) => $on ? '#fff' : '#1e293b'};
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, border 0.18s;
  margin-right: 2px;
  box-shadow: 0 1px 4px rgba(16,24,40,0.04);
  &:hover {
    background: ${({ $on }) => $on ? '#15803d' : '#f1f5f9'};
    color: #2563eb;
    border-color: #2563eb;
  }
`;
const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  overflow: hidden;
`;

const Name = styled.div`
  font-weight: 700;
  font-size: 17px;
  color: #1e293b;
  margin-bottom: 2px;
`;

import React, {useState, useMemo, useEffect} from 'react';
import dayjs from 'dayjs';
import { useParams, useNavigate } from 'react-router-dom';
import { classes as seed } from '../data/classes';
import { Card, H1, Small, LargeButton, GhostButton } from '../components/UI';
import { FaUserCircle } from 'react-icons/fa';
import Toggle from '../components/Toggle';
import styled from 'styled-components';
import { tokens } from '../styles/tokens';
import Snackbar from '../components/Snackbar';
import { downloadJSON } from '../utils/downloadJSON';
import Skeleton from '../components/Skeleton';

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 10px;
  padding: 0 8px 10px 8px;
`;


export default function ClassPage() {
    const navigate = useNavigate();
  const { id } = useParams();

  // Carregar turma e registros ao montar
  useEffect(() => {
    setLoading(true);
    let c = null;
    if (id) {
      // Buscar turma pelo id
      c = seed.find(cls => String(cls.id) === String(id));
    }
    if (c) {
      setKlass(c);
      // Inicializar presença
      const hoje = dayjs().format('YYYY-MM-DD');
      const raw = localStorage.getItem(`registros_${c.id}_${hoje}`);
      let presentInit = {};
      c.students.forEach(s => {
        presentInit[String(s.id)] = false;
      });
      if (raw) {
        const registrosDia = JSON.parse(raw);
        registrosDia.forEach(r => {
          if (r.status === 'presente') presentInit[String(r.alunoId)] = true;
        });
        setRegistros(registrosDia);
      }
      setPresent(presentInit);
      // Carregar histórico
      const rawHistory = localStorage.getItem(`history_${c.id}`);
      setHistory(rawHistory ? JSON.parse(rawHistory) : []);
    }
    setLoading(false);
  }, [id]);

  // Estados principais
  const [klass, setKlass] = useState(null);
  const [present, setPresent] = useState({});
  const [registros, setRegistros] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erroRegistro, setErroRegistro] = useState('');
  const [justificativas, setJustificativas] = useState({});
  const [importError, setImportError] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [summary, setSummary] = useState(null);

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px 24px;
  margin-top: 44px;
  max-width: 1000px;
  width: 100%;
  justify-items: center;
  align-items: stretch;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px 10px;
    max-width: 98vw;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 24px;
    padding: 0 4px;
  }
`;
// Bloco órfão removido. Código corrigido para sintaxe válida React/JS.

  useEffect(()=>{
    if(klass) document.title = `${klass.name} — Chamada Fácil`
    return ()=>{ document.title = 'Chamada Fácil' }
  },[klass])

  const counts = useMemo(()=>{
    const total = klass?.students.length || 0
    const presentes = Object.values(present).filter(Boolean).length
    return { total, presentes, ausentes: total - presentes }
  },[present, klass])


  function registrarChamada(sid, status) {
    setErroRegistro('');
    if (!klass) return;
    const aluno = klass.students.find(s => s.id === sid);
    if (!aluno || !aluno.name) {
      setErroRegistro('Nome obrigatório.');
      return;
    }
    const agora = dayjs();
    // Validar horário permitido
    const [ini, fim] = (klass.schedule || '19h00 - 21h50').split('-').map(h=>h.trim());
    const horaIni = dayjs(agora.format('YYYY-MM-DD') + ' ' + ini, 'YYYY-MM-DD HH:mm');
    const horaFim = dayjs(agora.format('YYYY-MM-DD') + ' ' + fim, 'YYYY-MM-DD HH:mm');
    if (agora.isBefore(horaIni) || agora.isAfter(horaFim)) {
      setErroRegistro('Fora do horário.');
      return;
    }
    // Impedir duplicidade
    const hoje = agora.format('YYYY-MM-DD');
    const raw = localStorage.getItem(`registros_${klass.id}_${hoje}`);
    const registrosDia = raw ? JSON.parse(raw) : [];
    const sidStr = String(sid)
    if (registrosDia.some(r => String(r.alunoId) === sidStr)) {
      setErroRegistro('Já registrado.');
      return;
    }
    // Justificativa
    let justificativa = justificativas[sid] || '';
    if ((status === 'ausente' || status === 'atrasado') && justificativa.length > 120) {
      setErroRegistro('Justificativa muito longa.');
      return;
    }
    // Registrar
    const registro = {
      id: 'r' + Date.now() + sidStr,
      alunoId: sidStr,
      alunoNome: aluno.name,
      status,
      horario: agora.format('HH:mm'),
      data: hoje,
      justificativa: justificativa || null
    };
    const novos = [...registrosDia, registro];
    localStorage.setItem(`registros_${klass.id}_${hoje}`, JSON.stringify(novos));
    setRegistros(novos);
    // Atualiza também o estado `present` imediatamente para refletir na UI
    setPresent(p => ({ ...p, [sidStr]: status === 'presente' }));
    setErroRegistro('');
    setJustificativas(j => ({...j, [sid]: ''}));
  }

  function finalize(){
    const data = { classId: klass.id, className: klass.name, counts: counts, timestamp: new Date().toISOString(), attendance: present }
    setSummary(data)
    // persist summary for later
    localStorage.setItem(`summary_${klass.id}`, JSON.stringify(data))
    // salvar no histórico
    const rawHistory = localStorage.getItem(`history_${klass.id}`)
    const hist = rawHistory ? JSON.parse(rawHistory) : []
    hist.unshift(data)
    localStorage.setItem(`history_${klass.id}`, JSON.stringify(hist))
    setHistory(hist)
    setSnackOpen(true)
  }

  return (
    <div style={{width:'100%'}}>
      <button
        onClick={() => navigate(-1)}
        style={{
          margin: '18px 0 0 12px',
          padding: '7px 18px',
          background: '#fff',
          color: '#2563eb',
          border: '1.5px solid #2563eb',
          borderRadius: 16,
          fontWeight: 700,
          fontSize: 15,
          cursor: 'pointer',
          boxShadow: '0 1px 4px rgba(37,99,235,0.06)',
          transition: 'background 0.18s',
          display: 'inline-block',
        }}
        aria-label="Voltar"
      >
        ← Voltar
      </button>

      <div style={{maxWidth:1100, margin:'0 auto 24px auto'}}>
        {klass && (
          <div style={{display:'flex',gap:12,marginBottom:12}}>
            <label style={{background:'#fff',border:'1.5px solid #2563eb',color:'#2563eb',padding:'7px 18px',borderRadius:16,fontWeight:700,fontSize:15,cursor:'pointer',boxShadow:'0 1px 4px rgba(37,99,235,0.06)',transition:'background 0.18s'}}>
              Importar alunos
              <input
                type="file"
                accept="application/json"
                style={{display:'none'}}
                onChange={async e => {
                  setImportError('');
                  const file = e.target.files[0];
                  if (!file) return;
                  try {
                    const text = await file.text();
                    const alunos = JSON.parse(text);
                    if (!Array.isArray(alunos) || !alunos.every(a => a.name)) {
                      setImportError('Arquivo inválido. Deve ser um array de objetos com campo "name".');
                      return;
                    }
                    // Atualiza alunos da turma
                    setKlass(k => ({...k, students: alunos.map((a,i) => ({...a, id: a.id || ('s'+Date.now()+i)}))}));
                    // Atualiza no localStorage se for turma customizada
                    const raw = localStorage.getItem('chamada_custom_classes');
                    if (raw) {
                      const custom = JSON.parse(raw);
                      const idx = custom.findIndex(c => c.id === klass.id);
                      if (idx !== -1) {
                        custom[idx].students = alunos.map((a,i) => ({...a, id: a.id || ('s'+Date.now()+i)}));
                        localStorage.setItem('chamada_custom_classes', JSON.stringify(custom));
                      }
                    }
                  } catch (err) {
                    setImportError('Erro ao importar alunos: ' + err.message);
                  }
                }}
              />
            </label>
            {importError && <span style={{color:'#dc2626',fontSize:14,marginLeft:8}}>{importError}</span>}
          </div>
        )}
                {klass && (
                  <button
                    style={{
                      marginTop: 8,
                      marginRight: 12,
                      padding: '7px 18px',
                      background: '#fff',
                      color: '#2563eb',
                      border: '1.5px solid #2563eb',
                      borderRadius: 16,
                      fontWeight: 700,
                      fontSize: 15,
                      cursor: 'pointer',
                      boxShadow: '0 1px 4px rgba(37,99,235,0.06)',
                      transition: 'background 0.18s',
                    }}
                    onClick={() => setShowHistory(h => !h)}
                    aria-label="Ver histórico de chamadas"
                  >
                    {showHistory ? 'Ocultar histórico' : 'Ver histórico'}
                  </button>
                )}
              {showHistory && (
                <Card style={{margin:'18px auto', maxWidth:700, background:'#f8fafc', boxShadow:'0 2px 12px rgba(37,99,235,0.06)'}}>
                  <div style={{fontWeight:700, fontSize:18, marginBottom:10}}>Histórico de Chamadas</div>
                  {history.length === 0 && <Small>Nenhuma chamada registrada ainda.</Small>}
                  {history.length > 0 && (
                    <>
                      <table style={{width:'100%', borderCollapse:'collapse', fontSize:15}}>
                        <thead>
                          <tr style={{background:'#e0e7ff'}}>
                            <th style={{padding:'6px 8px', textAlign:'left', borderRadius:6}}>Data</th>
                            <th style={{padding:'6px 8px', textAlign:'left'}}>Presentes</th>
                            <th style={{padding:'6px 8px', textAlign:'left'}}>Ausentes</th>
                            <th style={{padding:'6px 8px', textAlign:'left'}}>Exportar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {history.map((h, i) => (
                            <tr key={i} style={{borderBottom:'1px solid #e5e7eb'}}>
                              <td style={{padding:'6px 8px'}}>{dayjs(h.timestamp).format('DD/MM/YYYY HH:mm')}</td>
                              <td style={{padding:'6px 8px'}}>{h.counts.presentes}</td>
                              <td style={{padding:'6px 8px'}}>{h.counts.ausentes}</td>
                              <td style={{padding:'6px 8px'}}>
                                <button
                                  style={{padding:'4px 12px', background:'#2563eb', color:'#fff', border:'none', borderRadius:10, fontWeight:600, cursor:'pointer'}}
                                  onClick={() => {
                                    const alunosComPresenca = klass.students.map(aluno => ({
                                      ...aluno,
                                      status: h.attendance[aluno.id] ? 'Presente' : 'Ausente'
                                    }));
                                    downloadJSON(`alunos-turma-${klass.id}-${dayjs(h.timestamp).format('YYYYMMDD-HHmm')}.json`, alunosComPresenca);
                                  }}
                                >Exportar</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </Card>
              )}
        <H1>{klass ? klass.name : 'Turma'}</H1>
        <Small>{klass?.schedule} — {klass?.modality} — {klass?.location} — {klass?.weekday}</Small>
        <div style={{marginTop:12, fontWeight:600, color:'#2563eb'}}>
          {klass && `${counts.presentes} presentes de ${counts.total} (${counts.total ? Math.round((counts.presentes / counts.total) * 100) : 0}% presente)`}
        </div>
        {klass && (
          <button
            style={{
              marginTop: 18,
              padding: '8px 22px',
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: 18,
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
              transition: 'background 0.18s',
            }}
            onClick={() => {
              const alunosComPresenca = klass.students.map(aluno => ({
                ...aluno,
                status: present[aluno.id] ? 'Presente' : 'Ausente'
              }));
              downloadJSON(`alunos-turma-${klass.id}.json`, alunosComPresenca);
            }}
            aria-label="Exportar lista de alunos da turma com presença"
          >
            Exportar turma
          </button>
        )}
      </div>

      {klass && (
        <Card style={{margin:'0 auto 16px auto', maxWidth:400, background:'#e6f0ff', display:'flex',alignItems:'center',gap:16, boxShadow:'0 4px 24px rgba(37,99,235,0.10)'}}>
          <Avatar style={{width:56,height:56,background:'#fff',color:tokens.colors.primary600,fontSize:32,boxShadow:'0 2px 8px rgba(37,99,235,0.10)'}} aria-label="Foto do professor">
            <FaUserCircle size={44} style={{marginRight:6}} />
          </Avatar>
          <div>
            <div style={{fontWeight:700,fontSize:20, color:'#1e293b'}}>{klass.teacher}</div>
            <Small>Professor</Small>
          </div>
        </Card>
      )}

      {loading ? (
        <div style={{maxWidth:900}}>
          <Skeleton height="24px" style={{marginBottom:8}} />
          <Skeleton height="16px" width="60%" />
        </div>
      ) : (
        <List>
          {klass?.students.map(s => {
            const registroHoje = registros.find(r => r.alunoId === s.id);
            return (
              <Card
                key={s.id}
                style={{
                  padding: '26px 20px',
                  minHeight: 110,
                  display: 'flex',
                  alignItems: 'center',
                  background: registroHoje ? (registroHoje.status === 'presente' ? 'linear-gradient(180deg,#e0ffe7 60%,#f0fff4 100%)' : registroHoje.status === 'atrasado' ? 'linear-gradient(180deg,#fffbe7 60%,#fffbe7 100%)' : '#fff') : '#fff',
                  border: registroHoje ? (registroHoje.status === 'presente' ? '2px solid #16a34a' : registroHoje.status === 'atrasado' ? '2px solid #fbbf24' : '2px solid #e11d48') : '1px solid #e5e7eb',
                  boxShadow: registroHoje ? (registroHoje.status === 'presente' ? '0 4px 18px rgba(22,163,74,0.10)' : registroHoje.status === 'atrasado' ? '0 4px 18px rgba(251,191,36,0.10)' : '0 4px 18px rgba(225,29,72,0.10)') : '0 1px 4px rgba(16,24,40,0.04)',
                  borderRadius: 22,
                  transition: 'all 0.2s',
                  width: '100%',
                  maxWidth: 420,
                  margin: '0 auto',
                }}
              >
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0, flex: 1 }}>
                    <Avatar aria-hidden>
                      <FaUserCircle size={32} style={{marginRight:6}} />
                    </Avatar>
                    <div style={{maxWidth:180,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                      <Name style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.name}</Name>
                      {registroHoje && (
                        <Small>
                          {registroHoje.status.charAt(0).toUpperCase() + registroHoje.status.slice(1)}
                          {' • ' + registroHoje.horario}
                          {registroHoje.justificativa ? ' • ' + registroHoje.justificativa : ''}
                        </Small>
                      )}
                    </div>
                  </div>
                  {!registroHoje && (
                    <div style={{display:'flex',flexDirection:'row',gap:8,alignItems:'center',flexWrap:'nowrap'}}>
                      <PresenceButton $on={false} onClick={()=>registrarChamada(s.id,'presente')}>Presente</PresenceButton>
                      <PresenceButton $on={false} onClick={()=>registrarChamada(s.id,'ausente')}>Ausente</PresenceButton>
                      <PresenceButton $on={false} onClick={()=>registrarChamada(s.id,'atrasado')}>Atrasado</PresenceButton>
                      {(justificativas[s.id] !== undefined || erroRegistro) && (
                        <input
                          type="text"
                          placeholder="Justificativa (opcional)"
                          value={justificativas[s.id] || ''}
                          maxLength={120}
                          onChange={e=>setJustificativas(j=>({...j,[s.id]:e.target.value}))}
                          style={{padding:'6px 10px',borderRadius:8,border:'1px solid #e5e7eb',fontSize:14,width:140,marginLeft:6}}
                        />
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </List>
      )}

      {erroRegistro && <Snackbar open={!!erroRegistro} message={erroRegistro} onClose={()=>setErroRegistro('')} tone="error" />}
      <Snackbar open={snackOpen} message="Chamada finalizada" onClose={()=>setSnackOpen(false)} />
    </div>
  )
}

