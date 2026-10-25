# DK Eco Soluções — site estático

> Site estático (HTML/CSS/JS puro) de página única para a DK Eco Soluções, serviço de coleta de eletrônicos em São Paulo e no litoral paulista. Sem framework, sem backend, sem banco de dados. Deploy via GitHub Pages. Contato por links de WhatsApp (sem formulário).

## Produto e stack

- Produto e escopo: `PRODUCT.md`.
- Stack: HTML5, CSS3, JavaScript (vanilla, sem build). Fonte: Manrope (Google Fonts).
- Documentação e adoção do toolkit: `docs/setup.md`.

## Comandos canônicos

- Verificar (valida HTML + integridade de links locais): `npm run verify`
- Instalar dependências de desenvolvimento: `npm install`
- Servir localmente: `python3 -m http.server 8000` (a partir de `assets/`) → `http://localhost:8000`
- HTML isolado: `npx html-validate assets/index.html`
- Lint de tipos/testes/build: **não aplicável** (site estático sem build; sem TypeScript nem framework)

## Acordos de trabalho

- Leia o código e as instruções relevantes antes de editar. Diga suposições que afetem comportamento ou escopo.
- Faça a menor alteração suficiente. Reuse padrões, componentes e dependências existentes.
- Preserve alterações locais, validação, tratamento de erros, segurança, acessibilidade e requisitos explícitos.
- Não crie abstrações, arquitetura, opções, dependências ou funcionalidades para necessidades não pedidas.
- Rode `npm run verify`. Teste lógica e regressões relevantes; alterações triviais não precisam de testes que só espelham a implementação.
- Não transforme suposições em fatos nem integrações pendentes em resultados simulados.
- Continue o trabalho autorizado. Pergunte só o necessário fora da autorização.
- Publicar, enviar mensagens a terceiros, custos e ações destrutivas exigem autorização. Instalar ferramentas não autoriza isso.

## Continuidade de execução

- Durante trabalho autorizado, responda a perguntas de status e retome as ações restantes. Pare se o usuário pedir pausa, cancelar ou mudar o objetivo.
- Um bloqueio afeta só suas dependências. Complete tarefas independentes que continuem seguras.
- Se um agente falhar, confirme que parou antes de assumir seus arquivos. Inspecione mudanças parciais e retome de um ponto verificado, sem escritores concorrentes.
- Não repita uma tentativa idêntica sem nova evidência. Respeite limites de custo/tempo e gates explícitos.
- Ao retomar de um handoff, confira arquivos, estado do Git, checks e processos reais. Prometa execução em segundo plano só com processo/agente verificável.
- Para trabalho multi-sessão incompleto, mantenha um handoff curto no local de tarefa/plano existente (objetivo, estado verificado, checks, pendências, bloqueios, recursos, próxima ação).

## Ferramentas e estilo

- **Ponytail / Caveman / Superpowers:** não instalados como skills nesta sessão. Siga os princípios (menor solução completa; comunicação concisa em português; processo proporcional ao escopo). Não finja instalação.
- **Context7:** MCP indisponível nesta sessão. Use documentação oficial; registre a limitação.
- **Graphify:** não aplicável (site pequeno, sem grafo útil).
- **RTK:** sem hook nativo; o equivalente no Kiro é `.kiro/hooks/` (nenhum necessário agora).
- **Navegador (agent-browser / Chrome DevTools MCP):** indisponível — verificação visual é manual ou fica pendente de tooling.
- **LLMs:** preserve o cliente/modelo/autenticação da sessão. Sem política de seleção configurada, subagentes usam o modelo da sessão.

## Revisão de segurança

- Use o prompt de revisão versionado em `docs/security-review.md` (fonte: toolkit prompt 13, revisão `790a895`). Revisão **read-only**; relatório **privado** fora do repositório por padrão. Redija evidência com dados de negócio (WhatsApp, e-mail). Ausência de achados não é garantia de segurança.
- Para diffs sensíveis, faça revisão independente quando disponível; rastreie limites de confiança. Sem `differential-review` instalado, o fallback é rastreamento manual de código.

## Documentação

- `PRODUCT.md` — escopo, público, fluxo, restrições, aceitação.
- `docs/architecture.md` — estrutura, limites, dados, decisões técnicas.
- `docs/design.md` — direção visual e critérios de acessibilidade.
- `docs/onboarding.md` — preparação local, deploy (GitHub Pages), domínio, Google Search Console.
- `docs/quality.md` — o que cada check prova, quando rodar, fonte do security review.
- `docs/setup.md` — revisão do toolkit, versões, escopos, matriz de cobertura, pendências.
- `assets/README.md` — ponteiro para `docs/onboarding.md` + créditos de imagens.

## Convenções

- Documentação e commits em português; comandos e nomes técnicos permanecem como estão.
- Os dados de negócio (nome, WhatsApp `5511976517285`, região) estão no `assets/index.html`. Ao mudar o número, atualize todos os links `wa.me` e `tel:`.
- Não adicionar hooks Git, bloquear `main`, exigir branch/worktree nem criar pre-commit/pre-push por padrão.
- Não reintroduzir imagens sem referência no HTML nem arquivos `.DS_Store`.
