# Chamada Fácil

Aplicativo front-end (SPA) para gerenciar chamadas de presença em turmas. Projeto demonstrativo com:

- Login / Registro (simples, via `localStorage`)
- Dashboard de turmas
- Tela de chamada por turma (marcar presença, finalizar chamada)
- Exportação do resumo em JSON
- Motor de regras testável no navegador (Jasmine)

----

## Tecnologias

- React 18 + Vite
- react-router-dom (rotas)
- styled-components (estilos)
- Jest + React Testing Library (testes unitários)
- Jasmine (runner de regras em browser)

----

**Como rodar (rápido)**

1. Instale dependências:

```powershell
npm install
```

2. Inicie o servidor de desenvolvimento (Vite):

```powershell
npm run dev
```

3. Abra a URL que o Vite imprimir no terminal (por exemplo `http://localhost:5173/`).

Dica: se a porta 5173 estiver em uso, o Vite automaticamente escolherá outra porta (ex.: 5174). Sempre use a URL exibida no terminal.

----

## Testes

### Jest (unitários / React)

Execute os testes unitários com:

```powershell
npm run test
```

### Jasmine (regras, navegador)

O runner está em `jasmine/index.html` e contém 10 specs que testam `jasmine/regras.js`.

- Com o servidor dev rodando (passo anterior), abra no navegador:

```
http://localhost:5173/jasmine/index.html
```

- O runner exibirá os resultados (verde/vermelho). Aceitação: **10 specs, 0 failures**.

Observação: `jasmine/regras.js` foi ajustado para não usar `export` (compatível com carregamento via tag `<script>`). O React também injeta o script automaticamente como fallback quando `window.regras` estiver ausente.

----

## Fluxos principais para testar manualmente

1. Start: `npm run dev` e abra a URL do Vite.
2. Registro/Login: crie um usuário em **Registrar** ou use credenciais de demonstração (se houver).
3. Dashboard: abra uma turma e clique em **Abrir Chamada**.
4. Marcar presença: marque alguns alunos e clique em **Finalizar Chamada**. Verifique o resumo e exporte JSON.

Enquanto testa, abra as DevTools (F12) → Console e verifique se existem erros vermelhos (SyntaxError / TypeError). Cole aqui os erros se precisar de ajuda.

----

## Diagnóstico rápido (se a página ficar em branco)

1. Verifique se o dev server está rodando e em qual porta (`npm run dev`).
2. No navegador, abra DevTools → Console e cole as mensagens de erro aqui.
3. Opcional (automático): use o helper Playwright para capturar console + snapshot. Primeiro instale:

```powershell
npm install -D @playwright/test
```

Então rode:

```powershell
node tools/diagnose.js
```

O script tentará acessar as portas comuns (5173/5174/5175) e imprimir logs do console e um trecho do HTML carregado.

----

## Arquivos importantes

- `src/main.jsx` — entrypoint
- `src/App.jsx` — rotas e guard runtime para `window.regras`
- `src/pages/` — `LoginPage.jsx`, `RegisterPage.jsx`, `DashboardPage.jsx`, `ClassPage.jsx`
- `src/components/` — Input, Toggle, Snackbar, Skeleton, UI primitives
- `src/services/auth.js` — autenticação simples (localStorage)
- `jasmine/regras.js` — motor de regras (função `avaliarChamada({presentes,total})` exposta via `window.regras`)
- `jasmine/regras.spec.js` — 10 specs Jasmine (rodar no navegador)
- `tools/diagnose.js` — captura de console/HTML via Playwright (opcional)

----

## Problemas conhecidos

- Erro comum: `Unexpected token '<'` ou `Unexpected token 'export'` — indica que um arquivo com JSX ou `export` foi carregado via tag `<script>` sem passar por bundler. Corrigi os casos conhecidos (`src/components/UI.js` e `jasmine/regras.js`).
- O dev server pode iniciar em porta diferente se `5173` estiver em uso.

----

Se quiser, eu:

- executo os testes Jest e trago o relatório; ou
- rodo os specs Jasmine em headless com Playwright e retorno o resultado; ou
- crio um workflow de CI (GitHub Actions) que rode `npm ci` + `npm run test` em pushes.

Diga qual ação prefere que eu execute em seguida.

***

Arquivo gerado automaticamente — atualizado por assistente técnico.
