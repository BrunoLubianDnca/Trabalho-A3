// regras.js
// Função de negócio: avaliar presença em chamada
// Regra: chamada válida se (presentes / total) * 100 >= 75

function toNumber(v){
  const n = Number(v)
  return Number.isNaN(n) ? NaN : n
}

function avaliarChamada({ presentes, total }){
  const p = toNumber(presentes)
  const t = toNumber(total)
  if(Number.isNaN(p) || Number.isNaN(t)) return 'Chamada inválida'
  if(t <= 0) return 'Chamada inválida'
  const percent = (p / t) * 100
  return percent >= 75 ? 'Chamada válida' : 'Chamada inválida'
}

// Expor no global para os testes no navegador
if(typeof window !== 'undefined'){
  window.regras = { avaliarChamada }
}

