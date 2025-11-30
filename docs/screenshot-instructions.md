# Instruções para capturar screenshots

Recomendo capturar as seguintes telas com o dev server rodando (`npm run dev`):

- `login.png` — `http://localhost:5173/` (viewport: 390x844 para mobile, 1280x800 para desktop)
- `dashboard.png` — `http://localhost:5173/dashboard` (1280x800)
- `class.png` — `http://localhost:5173/class/1` (marque alguns presentes antes) (390x844 + 1280x800)
- `summary.png` — cartão de resumo exibido após `Finalizar chamada` (crop do cartão)
- `jasmine.png` — `http://localhost:5173/jasmine/index.html` mostrando 10 testes em verde

Passo-a-passo manual (Windows PowerShell)

1) Rode o servidor de desenvolvimento:
```powershell
npm run dev
```
2) Abra as URLs no navegador (exemplo automático):
```powershell
start http://localhost:5173/
start http://localhost:5173/dashboard
start http://localhost:5173/class/1
start http://localhost:5173/jasmine/index.html
```
3) Use as Ferramentas de Desenvolvedor (Ctrl+Shift+M no Chrome) para alternar para mobile (emulação 390x844).
4) Capturar tela (Windows): `Win+Shift+S` e salve os arquivos com os nomes sugeridos.

Automatizar (opcional) — Playwright

1) Instale Playwright (dev):
```powershell
npm i -D playwright
npx playwright install --with-deps
```
2) Rodar o script opcional abaixo (`node tools/screenshot.js`) para capturar automaticamente (gera arquivos em `screenshots/`).

Observação: se preferir que eu gere as imagens automaticamente, preciso que você instale Playwright localmente e me autorize a rodar um script; posso criar o script para você executar localmente (fiz isso no repositório).