
// Função utilitária
function toNumber(v){
  const n = Number(v)
  return Number.isNaN(n) ? NaN : n
}

// 1. Presença mínima de 75%
function avaliarChamada({ presentes, total }){
  const p = toNumber(presentes)
  const t = toNumber(total)
  if(Number.isNaN(p) || Number.isNaN(t)) return 'Chamada inválida'
  if(t <= 0) return 'Chamada inválida'
  const percent = (p / t) * 100
  return percent >= 75 ? 'Chamada válida' : 'Chamada inválida'
}

// 2. Atraso máximo permitido: 15 minutos
function validarAtraso({ minutosAtraso }){
  const m = toNumber(minutosAtraso)
  if(Number.isNaN(m)) return 'Atraso inválido'
  return m <= 15 ? 'Atraso tolerado' : 'Atraso excessivo'
}

// 3. Limite de faltas por mês: 3
function limiteFaltasMes({ faltasMes }){
  const f = toNumber(faltasMes)
  if(Number.isNaN(f)) return 'Valor inválido'
  return f > 3 ? 'Excedeu limite de faltas' : 'Dentro do limite'
}

// 4. Justificativa obrigatória para ausência
function justificarAusencia({ status, justificativa }){
  if(status !== 'ausente') return 'Não ausente'
  if(!justificativa || justificativa.trim().length < 5) return 'Justificativa insuficiente'
  return 'Justificativa aceita'
}

// 5. Presença obrigatória em avaliações
function presencaAvaliacao({ presente, avaliacao }){
  if(!avaliacao) return 'Não é avaliação'
  return presente ? 'Presença obrigatória OK' : 'Falta em avaliação'
}

// 6. Frequência mensal mínima: 80%
function frequenciaMensal({ presentes, total }){
  const p = toNumber(presentes)
  const t = toNumber(total)
  if(Number.isNaN(p) || Number.isNaN(t) || t <= 0) return 'Frequência inválida'
  const percent = (p / t) * 100
  return percent >= 80 ? 'Frequência OK' : 'Frequência insuficiente'
}

// 7. Bloqueio por excesso de faltas (mais de 5)
function bloqueioFaltas({ faltas }){
  const f = toNumber(faltas)
  if(Number.isNaN(f)) return 'Valor inválido'
  return f > 5 ? 'Aluno bloqueado' : 'Aluno liberado'
}

// 8. Tolerância de atraso: até 3 vezes por mês
function toleranciaAtrasoMes({ atrasosMes }){
  const a = toNumber(atrasosMes)
  if(Number.isNaN(a)) return 'Valor inválido'
  return a > 3 ? 'Excedeu tolerância de atrasos' : 'Dentro da tolerância'
}

// 9. Presença mínima em atividades extracurriculares: 60%
function presencaAtividades({ presentes, total }){
  const p = toNumber(presentes)
  const t = toNumber(total)
  if(Number.isNaN(p) || Number.isNaN(t) || t <= 0) return 'Atividade inválida'
  const percent = (p / t) * 100
  return percent >= 60 ? 'Presença em atividades OK' : 'Presença insuficiente em atividades'
}

// 10. Ausência justificada não conta como falta
function faltaJustificada({ status, justificativa }){
  if(status !== 'ausente') return 'Não ausente'
  if(justificativa && justificativa.trim().length >= 5) return 'Falta justificada (não conta)'
  return 'Falta não justificada (conta)'
}

// Expor no global para os testes no navegador
if(typeof window !== 'undefined'){
  window.regras = {
    avaliarChamada,
    validarAtraso,
    limiteFaltasMes,
    justificarAusencia,
    presencaAvaliacao,
    frequenciaMensal,
    bloqueioFaltas,
    toleranciaAtrasoMes,
    presencaAtividades,
    faltaJustificada
  }
}

