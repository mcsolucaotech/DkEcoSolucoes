# Arquitetura — DK Eco Soluções

> Registrado a partir do estado real do repositório. Planos são marcados como planos; só a estrutura implementada é descrita como existente.

## Visão geral

Site estático de página única, sem build, sem framework, sem backend e sem banco de dados. Todo o conteúdo é servido como arquivos estáticos (deploy via GitHub Pages).

## Árvore (raiz do repo)

- `assets/` — **raiz do site** servida ao visitante.
  - `index.html` — página única, estrutura semântica, metadados e links de contato.
  - `css/style.css` — layout responsivo, tokens de design, animações de revelação.
  - `js/config.js` — `window.SITE_CONFIG`: dados configuráveis de negócio (nome, WhatsApp, região, email, siteUrl, endereço, descrição).
  - `js/main.js` — menu mobile, cabeçalho ao rolar, revelação por `IntersectionObserver`, ano do rodapé, JSON-LD `Organization` condicional.
  - `img/` — logotipo, favicons e fotografias de apoio (créditos em `assets/README.md`).
  - `robots.txt` — diretivas para rastreadores.
  - `CNAME` — placeholder do domínio (a preencher).
  - `README.md` — ponteiro para `docs/onboarding.md` + créditos de imagens.
- `AGENTS.md`, `PRODUCT.md`, `package.json`, `scripts/`, `docs/`, `.kiro/` — documentação, tooling e configuração de agente (não servidos ao visitante).

## Entry points

- Navegador: `assets/index.html` (carrega `css/style.css` e `js/main.js` com `defer`; `js/config.js` é lido por `main.js` via `window.SITE_CONFIG`).
- Desenvolvimento: `python3 -m http.server 8000` a partir de `assets/`.
- Verificação: `npm run verify`.

## Limites e contratos

- **Sem backend/DB/auth**: não há servidor, persistência nem autenticação. Toda a lógica é no cliente.
- **Contato só por WhatsApp**: os links `wa.me/5511976517285` e `tel:+5511976517285` estão hardcoded no HTML. `config.js` e `main.js` suportam uma via alternativa por atributos `data-*` (`data-whatsapp-link`, `data-business-name`, `data-region`, `data-email-link`, `data-phone-link`), **não presentes** no HTML atual — ver divergência abaixo.
- **SEO**: `title` e `meta description` definidos. **Ausentes**: `canonical`, Open Graph, Twitter Cards e `sitemap.xml`. `robots.txt` aponta para um sitemap com domínio de exemplo (`SEU-DOMINIO.com.br`).
- **Acessibilidade**: HTML semântico, `alt` em imagens, foco visível, suporte parcial a `prefers-reduced-motion`. A revelação por `.revelar` originalmente escondia conteúdo sem JS — mitigada por progressive enhancement (ver `docs/design.md`).

## Divergência conhecida (config.js × index.html)

`main.js` lê `window.SITE_CONFIG` e procura elementos com `data-business-name`, `data-region`, `data-whatsapp-link`, `data-email-link` e `data-phone-link`. O `index.html` atual **não tem** esses atributos — os valores (nome "DK Eco Soluções", WhatsApp `5511976517285`) estão hardcoded diretamente no HTML. Resultado: as funções de preenchimento/contato do `main.js` são inertes neste HTML, e o JSON-LD `Organization` não é injetado porque `siteUrl` está vazio. Ao atualizar dados de negócio, sincronize `config.js` e, se quiser usar a via `data-*`, adicione os atributos no HTML.

## Decisões técnicas

- **Stack estática preservada**: não introduzir framework, build nem dependências de runtime. O `package.json` adicionado contém só devDependencies de verificação (`html-validate`, `linkinator`).
- **Progressive enhancement da revelação**: conteúdo visível sem JS; o JS só adiciona a animação (ver `docs/design.md`).
- **Sem deploy automático**: publicação é manual via GitHub Pages (ver `docs/onboarding.md`).

## Pendências (registrar, não implementar sem dados)

- `sitemap.xml` ausente (mencionado em versões anteriores do `assets/README.md`); criar só com o domínio real.
- `canonical`, `og:url`, `og:image`, `CNAME` e a URL de sitemap no `robots.txt` dependem do domínio real.
- Lista de cidades atendidas e ano de fundação (2026) não confirmados.
