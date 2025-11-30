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

  // 9. valores não numéricos => Chamada inválida
  it('valores não numéricos => Chamada inválida', function(){
    expect(window.regras.avaliarChamada({ presentes: 'abc', total: 10 })).toBe('Chamada inválida')
  })

  // 10. decimal precision: 7.5/10 = 75% => Chamada válida
  it('7.5 presentes de 10 total => Chamada válida (75% float)', function(){
    expect(window.regras.avaliarChamada({ presentes: 7.5, total: 10 })).toBe('Chamada válida')
  })

})
