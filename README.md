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
