describe('Regras - avaliarChamada (presença >= 75%)', function(){
  // 1. sucesso: 3/4 = 75% => Chamada válida
  it('3 presentes de 4 total => Chamada válida (75%)', function(){
    expect(window.regras.avaliarChamada({ presentes: 3, total: 4 })).toBe('Chamada válida')
  })

  // 2. falha: 2/3 = 66.666...% => Chamada inválida
  it('2 presentes de 3 total => Chamada inválida (~66.67%)', function(){
    expect(window.regras.avaliarChamada({ presentes: 2, total: 3 })).toBe('Chamada inválida')
  })

  // 3. borda: 74.99% => Chamada inválida
  it('74.99% => Chamada inválida (borda inferior)', function(){
    expect(window.regras.avaliarChamada({ presentes: 74.99, total: 100 })).toBe('Chamada inválida')
  })

  // 4. borda: 75.0% => Chamada válida
  it('75% => Chamada válida (borda)', function(){
    expect(window.regras.avaliarChamada({ presentes: 75, total: 100 })).toBe('Chamada válida')
  })

  // 5. sucesso: todos presentes
  it('2 presentes de 2 total => Chamada válida (100%)', function(){
    expect(window.regras.avaliarChamada({ presentes: 2, total: 2 })).toBe('Chamada válida')
  })

  // 6. falha: zero presentes
  it('0 presentes de 10 total => Chamada inválida (0%)', function(){
    expect(window.regras.avaliarChamada({ presentes: 0, total: 10 })).toBe('Chamada inválida')
  })

  // 7. strings numéricas coerção
  it('strings "3" e "4" => Chamada válida (coerção)', function(){
    expect(window.regras.avaliarChamada({ presentes: '3', total: '4' })).toBe('Chamada válida')
  })

  // 8. total inválido (0) => Chamada inválida
  it('total igual a 0 => Chamada inválida (inválido)', function(){
    expect(window.regras.avaliarChamada({ presentes: 0, total: 0 })).toBe('Chamada inválida')
  })

describe('Regras - Sistema de Chamada Escolar', function(){
  // 1. Presença mínima de 75%
  it('Presença >= 75%: 3/4 => válida (forçando erro)', function(){
    expect(window.regras.avaliarChamada({ presentes: 3, total: 4 })).toBe('Chamada válida')
  })
  it('Presença < 75%: 2/4 => inválida', function(){
    expect(window.regras.avaliarChamada({ presentes: 2, total: 4 })).toBe('Chamada inválida')
  })

  // 2. Atraso máximo permitido
  it('Atraso 10min => tolerado', function(){
    expect(window.regras.validarAtraso({ minutosAtraso: 10 })).toBe('Atraso tolerado')
  })
  it('Atraso 20min => excessivo', function(){
    expect(window.regras.validarAtraso({ minutosAtraso: 20 })).toBe('Atraso excessivo')
  })

  // 3. Limite de faltas por mês
  it('Faltas mês 2 => dentro do limite', function(){
    expect(window.regras.limiteFaltasMes({ faltasMes: 2 })).toBe('Dentro do limite')
  })
  it('Faltas mês 4 => excedeu limite', function(){
    expect(window.regras.limiteFaltasMes({ faltasMes: 4 })).toBe('Excedeu limite de faltas')
  })

  // 4. Justificativa obrigatória para ausência
  it('Ausente sem justificativa => insuficiente', function(){
    expect(window.regras.justificarAusencia({ status:'ausente', justificativa:'' })).toBe('Justificativa insuficiente')
  })
  it('Ausente com justificativa => aceita', function(){
    expect(window.regras.justificarAusencia({ status:'ausente', justificativa:'Consulta médica' })).toBe('Justificativa aceita')
  })

  // 5. Presença obrigatória em avaliações
  it('Presente em avaliação => OK', function(){
    expect(window.regras.presencaAvaliacao({ presente:true, avaliacao:true })).toBe('Presença obrigatória OK')
  })
  it('Falta em avaliação => erro', function(){
    expect(window.regras.presencaAvaliacao({ presente:false, avaliacao:true })).toBe('Falta em avaliação')
  })

  // 6. Frequência mensal mínima
  it('Frequência mensal 90% => OK', function(){
    expect(window.regras.frequenciaMensal({ presentes:9, total:10 })).toBe('Frequência OK')
  })
  it('Frequência mensal 70% => insuficiente', function(){
    expect(window.regras.frequenciaMensal({ presentes:7, total:10 })).toBe('Frequência insuficiente')
  })

  // 7. Bloqueio por excesso de faltas
  it('Faltas 6 => bloqueado', function(){
    expect(window.regras.bloqueioFaltas({ faltas:6 })).toBe('Aluno bloqueado')
  })
  it('Faltas 3 => liberado', function(){
    expect(window.regras.bloqueioFaltas({ faltas:3 })).toBe('Aluno liberado')
  })

  // 8. Tolerância de atraso por mês
  it('Atrasos mês 2 => dentro', function(){
    expect(window.regras.toleranciaAtrasoMes({ atrasosMes:2 })).toBe('Dentro da tolerância')
  })
  it('Atrasos mês 5 => excedeu', function(){
    expect(window.regras.toleranciaAtrasoMes({ atrasosMes:5 })).toBe('Excedeu tolerância de atrasos')
  })

  // 9. Presença mínima em atividades extracurriculares
  it('Presença em atividades 6/10 => OK', function(){
    expect(window.regras.presencaAtividades({ presentes:6, total:10 })).toBe('Presença em atividades OK')
  })
  it('Presença em atividades 5/10 => insuficiente', function(){
    expect(window.regras.presencaAtividades({ presentes:5, total:10 })).toBe('Presença insuficiente em atividades')
  })

  // 10. Ausência justificada não conta como falta
  it('Ausente com justificativa => não conta', function(){
    expect(window.regras.faltaJustificada({ status:'ausente', justificativa:'Atestado médico' })).toBe('Falta justificada (não conta)')
  })
  it('Ausente sem justificativa => conta', function(){
    expect(window.regras.faltaJustificada({ status:'ausente', justificativa:'' })).toBe('Falta não justificada (conta)')
  })
})
  // 9. valores não numéricos => Chamada inválida
  it('valores não numéricos => Chamada inválida', function(){
    expect(window.regras.avaliarChamada({ presentes: 'abc', total: 10 })).toBe('Chamada inválida')
  })

  // 10. decimal precision: 7.5/10 = 75% => Chamada válida
  it('7.5 presentes de 10 total => Chamada válida (75% float)', function(){
    expect(window.regras.avaliarChamada({ presentes: 7.5, total: 10 })).toBe('Chamada válida')
  })

})
