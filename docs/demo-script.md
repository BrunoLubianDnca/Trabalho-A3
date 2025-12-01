# Roteiro de Demo — Chamada Fácil

Objetivo: demonstrar o fluxo principal do app em ~3 minutos: login, abrir turma, marcar presença, finalizar e exportar JSON. Inclui também mostrar os testes Jasmine em navegador.

1) Preparação
- Executar: `npm run dev` — abrir `http://localhost:5173/`.
- Credenciais demo: `professor` / `senha123` (ou registre um usuário rápido).

2) Passo a passo (demo)
- Tela Login (0:00–0:30)
  - Apresente o visual do login (gradiente, cartão centralizado, ícones nos inputs).
  - Preencha `Usuário` e `Senha` e pressione `Entrar`.
- Dashboard (0:30–1:00)
  - Mostre a lista de turmas; destaque o número de alunos e o botão `Abrir chamada`.
- Tela da Turma / Chamada (1:00–2:00)
  - Abra uma turma; mostre a lista de alunos com avatares, toque nos toggles para marcar `Presente`.
  - Pressione `Finalizar chamada` — observe o `Snackbar` de confirmação e o cartão de `Resumo`.
  - Opcional: pressione `Exportar JSON` para baixar `resumo-chamada.json`.
- Regras (Jasmine) (2:00–2:30)
  - Abra `http://localhost:5173/jasmine/index.html` e mostre os 10 testes da regra de presença (pass/fail).

3) Dicas para apresentação
- Se quiser, antes de rodar a demo, no console do navegador limpe `localStorage` para começar do zero.
- Use um emulador de dispositivo no navegador para demonstrar o layout mobile.

4) Artefatos a entregar
- `resumo-chamada.json` gerado (download). 
- Link para a pasta do projeto (ou repositório) com instruções.

5) Tempo total estimado: 3 minutos.
