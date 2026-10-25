# Onboarding — DK Eco Soluções

## Preparação local

Pré-requisitos: Node.js (para as verificações) e Python 3 (para servir o site) — já presentes neste ambiente.

1. `npm install` — instala as devDependencies de verificação (`html-validate`, `linkinator`).
2. Servir o site: a partir de `assets/`, rode `python3 -m http.server 8000` e abra `http://localhost:8000`.
   - Para conferência rápida, abra `assets/index.html` direto no navegador (alguns recursos podem se comportar diferente via `file://`).
3. Verificar: `npm run verify` (valida HTML e confere links locais). Detalhes em `docs/quality.md`.

## Dados de negócio

Nome, WhatsApp (`5511976517285`), região e textos estão no `assets/index.html`. Mantenha gratuidade, cobertura, certificações, parceiros, volume, licenças e garantias alinhados à operação real. E-mail e endereço comercial só entram no HTML se houver dado público real.

## WhatsApp

Os botões abrem uma conversa no WhatsApp do número informado, sem formulário nem cadastro. Ao trocar o número, atualize todos os links `wa.me` e `tel:` no `index.html` e teste no celular e no desktop.

## Publicar no GitHub Pages

O repositório está no GitHub (`mcsolucaotech/DkEcoSolucoes`).

> **Atenção à estrutura**: os arquivos do site estão em `assets/` (não na raiz). O GitHub Pages, no modo "Deploy from a branch", só publica a partir de `/(root)` ou `/docs`. Para servir `assets/`, use um workflow do GitHub Actions que publique essa pasta, **ou** mova os arquivos do site para a raiz. Essa é uma decisão de publicação sua; esta adoção não reorganizou a estrutura nem criou workflow de Actions (sem CI solicitado).

Passos gerais:

1. Settings → Pages → Build and deployment.
2. Escolha a branch `main` e a pasta correta conforme a decisão acima.
3. Aguarde a URL de publicação e teste em celular e desktop.
4. Confirme se imagens, CSS e JavaScript carregam corretamente.

### Domínio próprio (quando comprar)

1. Defina se usará domínio raiz (`seudominio.com.br`) ou `www.seudominio.com.br`.
2. Cadastre em Settings → Pages → Custom domain.
3. Configure o DNS conforme a documentação vigente do GitHub Pages (CNAME para `www`; A/AAAA para domínio raiz). Não copie IPs de tutoriais antigos.
4. Preencha `assets/CNAME` com apenas o hostname (sem `https://`, sem caminho).
5. Habilite Enforce HTTPS quando disponível e teste a versão HTTPS.

## SEO e domínio (executar só com o domínio real)

Antes de publicar, substitua `https://SEU-DOMINIO.com.br/` em:
- `index.html`: `canonical`, `og:url`, `og:image` (a adicionar).
- `robots.txt`: URL do sitemap.
- `sitemap.xml`: URL canônica (arquivo a criar).
- `assets/CNAME`: hostname real.

Quando o domínio existir, **adicione** no `<head>` os metadados ausentes: `link rel="canonical"`, Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type=website`, `og:locale=pt_BR`), Twitter Cards e o `sitemap.xml`. Hoje só existem `title` e `meta description`.

## Google Search Console

1. Adicione a propriedade (domínio ou prefixo de URL).
2. Verifique por DNS (domínio próprio) ou por meta/HTML (enquanto usar o URL do GitHub Pages).
3. Envie `sitemap.xml` com a URL pública correta.
4. Use a inspeção de URL para pedir indexação da home.
5. Monitore indexação, consultas, cliques e problemas de experiência; corrija erros reportados.
6. Não prometa posição nem prazo de indexação. SEO é contínuo.

## Checklist de publicação

- [ ] Nome, WhatsApp e região no `index.html` conferidos com a operação real.
- [ ] Número de WhatsApp testado no celular e no desktop.
- [ ] E-mail/endereço removidos ou confirmados.
- [ ] Domínio definido; `canonical`, `og:url`, `og:image`, `robots.txt`, `sitemap.xml`, `CNAME` atualizados.
- [ ] Pasta de publicação do Pages definida conforme a estrutura em `assets/`.
- [ ] `npm run verify` passando.
- [ ] HTTPS ativo.
- [ ] Search Console configurado.
- [ ] Revisão mobile, acessibilidade e links concluída (manual — ver `docs/design.md`).
