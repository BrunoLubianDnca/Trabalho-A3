# Chamada Fácil

**Trabalho de Apresentação — Chamada Fácil**

**Autor:** Bruno Lubian
**Disciplina:** [Preencha aqui] — [Professor: Preencha aqui]
**Data:** Dezembro de 2025

**Resumo**
- Este projeto é uma aplicação single-page (SPA) desenvolvida em React + Vite chamada **Chamada Fácil**, criada como trabalho acadêmico para demonstrar um fluxo de registro de presença, regras de validação (testadas com Jasmine), testes unitários (Jest + React Testing Library) e conveniências para demonstração docente.

**Objetivo do trabalho**
- Fornecer uma ferramenta simples e demonstrável para registrar chamadas de turma, aplicar regras de validação de presença e exportar resultados. O foco está na clareza, acessibilidade básica e testabilidade — com passos práticos para mostrar testes verdes/vermelhos ao professor.

**Tecnologias**
- React 18 + Vite
- react-router-dom v6
- styled-components
- Jest + React Testing Library (testes unitários)
- Jasmine (testes de regras, runner em browser e Node)
- Playwright (auxiliares de CI)

**Principais telas e fluxos**
- Login / Register (autenticação simples via localStorage)
- Dashboard (lista de turmas)
- Tela da Turma (registrar presença, exportar JSON, histórico)
- Runner Jasmine: `jasmine/index.html` — executa os specs que validam as regras de negócio

**Regras implementadas (sumário)**
- Presença mínima para chamada válida: 75%
- Atraso tolerado: até 15 minutos
- Limite de faltas por mês: 3
- Justificativa obrigatória para ausência (mínimo 5 caracteres)
- Presença obrigatória em avaliações
- Frequência mensal mínima: 80%
- Bloqueio por excesso de faltas: > 5
- Tolerância de atrasos no mês: até 3
- Presença em atividades extracurriculares: 60%
- Ausência justificada não conta como falta

Essas regras estão implementadas em `jasmine/regras.js` e cobertas por `jasmine/regras.spec.js`.

**Como executar o projeto (passo a passo)**

1. Pré-requisitos
   - Node.js LTS (ex.: 18+)
   - Git

2. Instalar dependências
   ```powershell
   npm install
   ```

3. Rodar em modo dev (Vite)
   ```powershell
   npm run dev
   ```
   - Observe no terminal a porta usada pelo Vite (padrão `5173`).
   - Abra a aplicação em `http://localhost:<porta>/`.

4. Runner Jasmine (visual no navegador)
   - Abra `http://localhost:<porta>/jasmine/index.html` para ver a interface do Jasmine que roda os specs das regras.

5. Rodar os testes (Terminal)
   - Testes Jasmine (Node runner):
     ```powershell
     node tools/run-jasmine-node.cjs
     ```
     Saída esperada: `30 specs, 0 failures` (quando limiar das regras estiver em 75%).

   - Testes Jest (React):
     ```powershell
     npx jest --config=jest.config.cjs
     ```

**Demonstrando fail → pass (roteiro para a banca/professor)**
1. Forçar falha (altera limiar das regras para 90%):
   ```powershell
   node tools/set-regras-threshold.js 90
   ```
2. Rodar o runner Node para ver os specs falhando:
   ```powershell
   node tools/run-jasmine-node.cjs
   ```
   Você verá specs em vermelho (failures > 0).
3. Restaurar comportamento correto (75%) e rodar novamente:
   ```powershell
   node tools/set-regras-threshold.js 75
   node tools/run-jasmine-node.cjs
   ```
   Agora os specs devem aparecer verdes.

**Scripts úteis (npm)**
- `npm run dev` — inicia Vite
- `npm run test` — atualmente aponta para o runner headless (ajustes locais podem existir)
- `node tools/run-jasmine-node.cjs` — executa Jasmine specs em Node (terminal)
- `node tools/set-regras-threshold.js 90` / `75` — alterna limiar das regras para demo

Sugestão: para facilitar a demonstração, você pode adicionar os scripts a `package.json` (ex.: `jasmine:node`, `jasmine:fail`, `jasmine:pass`). Posso fazer isso para você.

**Observações técnicas e dicas**
- A autenticação é propositalmente simples para fins didáticos e está baseada em `localStorage` (`src/services/auth.js`).
- Testes unitários com Jest usam `jsdom`; se executar no CI, atente para instalar `jest-environment-jsdom` se necessário.
- Se o navegador mostrar specs verdes/errados após editar `jasmine/regras.js`, faça hard refresh (Ctrl+F5) para evitar cache.

**Estrutura de arquivos (resumida)**
- `src/` — código React
- `src/pages` — telas (Login, Dashboard, Class)
- `src/components` — componentes UI
- `src/services` — autenticação e helpers
- `jasmine/` — `regras.js` (regras) e `regras.spec.js` (specs)
- `tools/` — scripts auxiliares (runner e utilitários para demo)

**Referências e anexos**
- Runner Jasmine: `jasmine/index.html` (abra no navegador)
- Testes React: `src/tests/` (ex.: `LoginPage.test.jsx`)

---
Se quiser, faço um commit adicional com scripts npm de conveniência, ou gero um slide/PDF curto com os pontos principais para apresentação. Quer que eu adicione os scripts e empurre as alterações agora? 

***Fim do documento***
# Chamada Fácil

Aplicativo de exemplo para registrar presença de alunos.

Executar localmente:

```powershell
npm install
npm run dev
```

Executar testes:

```powershell
npm run test
```

Jasmine (rodar no navegador):

1. Abra `jasmine/index.html` no navegador (ex.: `file:///C:/Users/Bruno/A3/jasmine/index.html`) ou
2. Se estiver servindo com Vite, abra `http://localhost:5173/jasmine/index.html`.

Nota sobre a porta do dev server:
- O Vite tenta a porta padrão `5173`, porém se ela estiver em uso ele automaticamente tenta outra (ex.: `5174`). Verifique a porta exibida no terminal ao rodar `npm run dev`.
- Para abrir o runner Jasmine localmente você pode executar em duas etapas:
	1) Abra uma janela de terminal e rode:
```powershell
npm run dev
```
	2) Em outra janela rode (abre a URL no navegador no Windows):
```powershell
npm run jasmine:open
```
	- Se `npm run jasmine:open` abrir a porta errada, use a URL mostrada pelo Vite (ex.: `http://localhost:5174/jasmine/index.html`).

Diagnóstico automático (opcional):
- Há um utilitário para capturar logs/HTML do app em execução: `tools/diagnose.js`. Para usá-lo:
```powershell
npm install
npm run diagnose
```
	- O script tentará conectar em `http://localhost:5173/` e portas próximas (5174, 5175) e exibirá console logs e um snapshot HTML.

Os testes Jasmine mostram verde/vermelho no navegador. Para demonstrar falha propositalmente, edite `jasmine/regras.js` e modifique o limite (ex.: `n >= 999`) e recarregue a página.
 
Demo rápido (roteiro de apresentação)
 - 1) `npm run dev` e abra `http://localhost:5173/`.
 - 2) Login: use como credenciais de demonstração `Usuário: professor`, `Senha: senha123` ou registre um usuário novo em "Registrar".
 - 3) No Dashboard clique em "Abrir chamada" em uma turma.
 - 4) Marque alguns alunos como "Presente" e clique em "Finalizar chamada" — observe o Snackbar de confirmação e o cartão de resumo.
 - 5) Clique em "Exportar JSON" para baixar o resumo da chamada.
 - 6) Para mostrar os testes Jasmine: abra `jasmine/index.html` (ou a URL do Vite acima). Mostre os testes verdes.
 - 7) Para demonstrar os testes em vermelho: edite `jasmine/regras.js` (por exemplo troque o limiar `>= 75` para `>= 90`), salve e recarregue `jasmine/index.html` para ver falhas.

Notas técnicas rápidas
 - Projeto: React + Vite + styled-components
 - Roteiro de autenticação: simples, armazenada em `localStorage` (arquivo `src/services/auth.js`).
 - Dados de exemplo: `src/data/classes.js`.
 - Testes unitários (React): Jest + React Testing Library em `src/tests`.
 - Testes de regra (navegador): Jasmine em `jasmine/`.

Próximos passos sugeridos
 - Adicionar testes Jest para cobertura do fluxo de autenticação (registro/login).
 - Adicionar CI (GitHub Actions) que rode `npm ci` e `npm run test` em pushes/PRs.
 - Polir UI para mobile (inputs maiores, contrastes) e adicionar ícones.

Se quiser, eu executo agora os testes Jest, crio os testes de autenticação ou adiciono o workflow de CI — diga qual deseja que eu faça em seguida.
