#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const arg = process.argv[2]
if (!arg) {
  console.error('Uso: node tools/set-regras-threshold.js <percentual>')
  process.exit(1)
}

const threshold = parseInt(arg, 10)
if (Number.isNaN(threshold)) {
  console.error('Percentual inválido:', arg)
  process.exit(2)
}

const filePath = path.resolve(__dirname, '..', 'jasmine', 'regras.js')
if (!fs.existsSync(filePath)) {
  console.error('Arquivo não encontrado:', filePath)
  process.exit(3)
}

const original = fs.readFileSync(filePath, 'utf8')

// backup (first run will create/overwrite .bak)
try {
  fs.writeFileSync(filePath + '.bak', original, 'utf8')
} catch (err) {
  console.warn('Não foi possível escrever backup:', err.message)
}

// replace a pattern like: return percentual >= 75;
const replaced = original.replace(/return\s+percentual\s*>=?\s*\d+\s*;/, `return percentual >= ${threshold};`)

if (replaced === original) {
  console.error('Padrão esperado não encontrado em', filePath)
  console.error('Abra o arquivo e verifique a expressão `return percentual >= <n>;`')
  process.exit(4)
}

fs.writeFileSync(filePath, replaced, 'utf8')
console.log(`Atualizado limiar para ${threshold}% em ${path.relative(process.cwd(), filePath)}`)
console.log('Para reverter execute: node tools/set-regras-threshold.js 75')
