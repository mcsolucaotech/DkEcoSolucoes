# Convenções — DK Eco Soluções

Site estático (HTML/CSS/JS puro, sem build/backend/DB) de página única. Deploy via GitHub Pages; contato só por WhatsApp. Documentação completa em `AGENTS.md` e `docs/`.

## Comandos

- Verificar: `npm run verify` (HTML válido + links locais íntegros)
- Servir local: `python3 -m http.server 8000` a partir de `assets/`
- Instalar devDeps: `npm install`

## Restrições

- Não introduzir framework, build, backend, banco nem dependências de runtime.
- Não publicar, commitar/pushar, criar hooks Git nem bloquear `main` sem pedido explícito.
- Não inventar dados comerciais (domínio, cidades atendidas, ano de fundação, e-mail/endereço) — registrar como pendência.
- Os dados de negócio (nome, WhatsApp, região) estão no `assets/index.html`. Ao mudar o número, atualize todos os links `wa.me` e `tel:`.
- Documentação e commits em português; comandos/nomes técnicos em inglês.
- Sem `agent-browser`/Chrome DevTools MCP: verificação visual é manual (critérios em `docs/design.md`).
- Skills/MCPs do toolkit (Superpowers, Context7, Graphify, etc.) indisponíveis nesta sessão — use fontes oficiais e registre a limitação.

## Mapa de documentos

- `AGENTS.md` — instruções para agentes (acordos completos de trabalho).
- `PRODUCT.md` — escopo, público, aceitação.
- `docs/architecture.md` · `docs/design.md` · `docs/onboarding.md` · `docs/quality.md` · `docs/setup.md` · `docs/security-review.md`.
