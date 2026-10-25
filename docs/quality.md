# Qualidade — DK Eco Soluções

## Comandos de verificação

- **Verificar tudo**: `npm run verify` — roda validação de HTML + integridade de links locais.
- **HTML isolado**: `npx html-validate assets/index.html`
- **Links locais**: parte do `npm run verify` (usa `linkinator` contra um servidor estático local iniciado pelo `scripts/verify.mjs`).

## O que cada check prova

| Check | O que prova | Quando rodar |
|---|---|---|
| `html-validate` | HTML válido; atributos obrigatórios (ex.: `alt` em imagens); estrutura e atributos ARIA básicos | Antes de publicar e ao editar `index.html` |
| `linkinator` (links locais) | Referências locais (`<img>`, `<link>`, `<script>`, âncoras internas) resolvem — sem assets quebrados | Antes de publicar e ao adicionar/remover arquivos |
| `npm run verify` | Combina os dois acima ponta-a-ponta | Gatilho canônico de qualidade |

## Checks não automatizados (manuais / pendentes)

- **Links externos** (`wa.me`, Instagram, TikTok, Google Fonts): o `verify` pula URLs absolutas para manter o gate estável e offline-friendly. Conferir manualmente, em especial `wa.me/5511976517285`, antes de publicar.
- **Verificação visual/acessibilidade**: sem `agent-browser`/Chrome DevTools MCP, os critérios de `docs/design.md` são inspecionados à mão (navegação por teclado, contraste, quebras de layout, `prefers-reduced-motion`, `<details>`).
- **Consistência de SEO**: `canonical`/Open Graph/`sitemap.xml`/`CNAME` dependem do domínio real; confirmar só após o domínio ser definido.
- **Lint de JS**: não há linter JS (um arquivo pequeno, sem build); revisar mudanças no `main.js` por leitura e teste no navegador.

## Linha de base (antes desta adoção)

Não existiam checks automatizados. Esta adoção introduz `npm run verify`. Falhas pré-existentes do site (ausência de `sitemap.xml`, placeholders de domínio, metadados de compartilhamento ausentes) estão registradas em `PRODUCT.md` e `docs/architecture.md` como pendências e **não** são mascaradas pelo gate.

## Revisão de segurança (reutilizável)

- **Fonte**: toolkit prompt 13, revisão `790a895` (obtenha de `github.com/soumatheusgomes/vibe-coding-toolkit` se precisar do original).
- **Prompt adaptado**: `docs/security-review.md` (autocontido, adaptado a este repo). Passe o modo (repositório ou diff com base/head) e o destino do relatório.
- **Modo**: **read-only**; relatório **privado**, fora do repositório por padrão; redija evidência que contenha dados de negócio (WhatsApp, e-mail) e não exponha segredos.
- **Escopo típico deste site**: limites de confiança (sem backend, só cliente); dados de negócio no `index.html`; links externos (`wa.me`, redes sociais); metadados/SEO; licenciamento de imagens; devDependencies (`html-validate`, `linkinator`).
- **Fallback**: sem `differential-review` instalado, a revisão manual por rastreamento de código é o fallback explícito. Ausência de achados **não** é garantia de segurança.

## Harness2 (método nativo)

O método nativo de melhoria de harness (toolkit 23) está estabelecido: `AGENTS.md` (instruções curtas) + comandos canônicos + `docs/*` + `npm run verify` como check reproduzível. Casos de fumaça aplicáveis: (a) em sessão limpa, encontrar instruções e comandos; (b) rodar `npm run verify`. A CLI oficial do Harness2 é um lab separado, **não** instalada (dependências, custos e isolamento exigem autorização à parte).

## Regras de evolução

- Medir violações antes de apertar regras. Não enfraquecer o gate para mascarar falhas; distinguir falhas pré-existinges (registradas) de introduzidas (corrigir).
- Não adicionar bloqueios de push em `main`, hooks Git nem exigência de branch por padrão.
- Atualizar o documento responsável junto com mudanças de comportamento, comandos ou configuração.
