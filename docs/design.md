# Design — DK Eco Soluções

## Direção visual

- **Tipografia**: Manrope (400–800), via Google Fonts com `preconnect`.
- **Paleta** (tokens em `assets/css/style.css`):
  - Azul `--azul #075b91` / `--azul-escuro #073f68`
  - Verde `--verde #2ea64f` / `--verde-claro #70c94b`
  - Fundo `--fundo #f5f9f6`; texto `--texto #15271d` / `--texto-claro #647168`; borda translúcida verde; sombra suave (`--sombra`); cantos `--raio 24px`.
- **Layout**: container `min(1160px, …)`, seções com `padding 110px`, grids responsivos. Cabeçalho fixo com `backdrop-filter` ao rolar. Hero em grade de 2 colunas; cards com cantos arredondados e sombras.
- **Botões**: `.botao-verde` (gradiente verde, sombra) e `.botao-claro` (contorno). Botão flutuante de WhatsApp fixo, com pulso animado.
- **Interações**: hover com `translateY`; revelação de seções por `IntersectionObserver`; menu mobile off-canvas com backdrop.

## Responsividade

- Breakpoints: `max-width: 960px` (tablet: menu off-canvas, grids de 2 colunas) e `max-width: 640px` (celular: coluna única, container menor). Usa `100dvh` para o menu (altura dinâmica).
- **Observado, não verificado visualmente**: o ambiente não dispõe de navegador para inspecionar quebras de layout. Pontos a conferir manualmente: quebras em larguras intermediárias; possível conteúdo oculto por `overflow-x: hidden` no `body` (não tratá-lo como prova de layout correto).

## Acessibilidade — critérios

Marcados `[x]` estão presentes no código; `[ ]` precisam de inspeção manual (pendente de navegador).

- [x] HTML semântico (`header`, `nav`, `main`, `section`, `figure`, `article`, `details`, `footer`).
- [x] `alt` em todas as imagens.
- [x] Foco visível (`:focus-visible` com outline verde).
- [x] `aria-label`/`aria-expanded`/`aria-controls` no botão de menu e `aria-label` nos links sociais.
- [x] `rel="noopener noreferrer"` em links externos com `target="_blank"`.
- [x] `prefers-reduced-motion`: reduz animações e desativa `scroll-behavior: smooth`.
- [x] **Revelação sem JS**: conteúdo visível por padrão; o JS só adiciona a animação (progressive enhancement — abaixo). Sem JS ou sem `IntersectionObserver`, nada fica oculto.
- [ ] Navegação por teclado end-to-end (ordem, foco no menu, `Escape` fecha) — lógica presente no `main.js`; conferir no navegador.
- [ ] Contraste dos textos (especialmente `--texto-claro` sobre fundos claros) — conferir com ferramenta de contraste.
- [ ] Comportamento dos `<details>` (abrir/fechar por teclado) — conferir.
- [ ] Zoom até 200% sem perda de conteúdo — conferir.

### Progressive enhancement da revelação (`.revelar`)

Originalmente `.revelar` começava com `opacity: 0` e só aparecia quando o JS adicionava `.visivel` — conteúdo ficava **invisível sem JS** ou sem `IntersectionObserver`. Corrigido para:

- CSS: o estado oculto fica sob `.js` (`.js .revelar { opacity: 0 }`) e `.revelar.visivel` restaura a visibilidade.
- `index.html`: um script inline no `<head>` adiciona a classe `js` ao `<html>` antes da pintura (sem flash).
- `main.js`: se `IntersectionObserver` não existir, adiciona `.visivel` a todos os `.revelar` (fallback).

Assim: sem JS → conteúdo visível; com JS → animado; sem `IntersectionObserver` → visível de imediato.

## Verificação visual

**Pendente**: não há `agent-browser` nem Chrome DevTools MCP nesta sessão. A verificação visual (quebras de layout, contraste, comportamento do menu/revelação em mobile e desktop) é **manual** até que esse tooling seja instalado. Os critérios acima guiam essa inspeção.
