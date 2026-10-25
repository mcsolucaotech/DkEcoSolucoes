# Coleta de Eletrônicos — landing page

Landing page estática em HTML, CSS e JavaScript, preparada para GitHub Pages e SEO técnico inicial.

## Conteúdo

- `index.html`: conteúdo, estrutura semântica e metadados.
- `assets/css/style.css`: layout responsivo.
- `assets/js/config.js`: campos configuráveis da operação.
- `assets/js/main.js`: menu mobile, links de contato e dados estruturados condicionais.
- `robots.txt` e `sitemap.xml`: arquivos básicos para rastreadores.
- `CNAME`: arquivo a preencher quando o domínio for comprado/configurado.
- `assets/img/`: logotipo, favicon e imagem Open Graph em SVG.

### Créditos das fotografias

As fotografias de apoio em `img/` foram obtidas em páginas que identificam as imagens como gratuitas para uso:

- `eletronicos-doacao.jpg` — Gustavo Fring, [Pexels](https://www.pexels.com/photo/volunteers-looking-at-laptop-7156185/).
- `computadores-antigos.jpg` — Daniel Dan, [Pexels](https://www.pexels.com/photo/junk-old-computers-in-stacks-7598913/).
- `celulares-antigos.jpg` — Skyler Ewing, [Pexels](https://www.pexels.com/photo/pile-of-old-smartphones-and-music-players-5744291/).
- `eletronicos-diversos.jpg` — Emmanuel Jason Eliphalet, [Pexels](https://www.pexels.com/photo/phone-and-other-devices-on-table-9956769/).
- `placas-eletronicas.jpg` — [Unsplash](https://unsplash.com/photos/discarded-electronic-circuit-boards-on-the-ground-4ORzA3kWBiw), disponibilizada sob a Unsplash License.
- `homem-tv-antiga.jpg` — RDNE Stock project, imagem de vídeo gratuita no [Pexels](https://www.pexels.com/video/man-carrying-tv-9088980/).
- `televisao-antiga.jpg` — Anete Lusina, [Pexels](https://www.pexels.com/photo/aged-tv-set-on-concrete-floor-in-building-5721905/).
- `geladeira-tv-retro.jpg` — Esra Nur Kalay, [Pexels](https://www.pexels.com/photo/a-television-on-top-of-a-refrigerator-11520752/).
- `ventilador-antigo.jpg` — Enrique Zafra, [Pexels](https://www.pexels.com/photo/white-desk-fan-on-white-table-3675622/).
- `controle-remoto.jpg` — Geri Tech, [Pexels](https://www.pexels.com/photo/close-up-of-remote-controls-14770618/).
- `secador.jpg` — Nadin Sh, [Pexels](https://www.pexels.com/photo/coiled-hair-dryer-on-hotel-towel-32641723/).

## 1. Personalizar antes de publicar

Edite `assets/js/config.js`:

- `businessName`: nome real da empresa/marca.
- `region`: região efetivamente atendida.
- `whatsappNumber`: número em formato internacional, somente dígitos, por exemplo `5511999999999`. Não use um número de exemplo na produção.
- `email`: e-mail de atendimento real, ou deixe vazio.
- `siteUrl`: domínio publicado com `https://`, sem barra final.
- `publicAddress`: endereço comercial público correto, ou deixe vazio.
- `description`: descrição factual do serviço.

Mantenha informações sobre gratuidade, cobertura geográfica, certificações, parceiros, volume de reciclagem, licenças e garantias alinhadas às condições reais da operação. A página informa atendimento em São Paulo e no litoral paulista; confirme os municípios atendidos antes da publicação.

### WhatsApp

Os botões da página abrem diretamente uma conversa no WhatsApp do número informado nos links do `index.html`, sem formulário ou cadastro no site. Ao trocar o número, atualize todos os links `wa.me` e teste o agendamento no celular e no desktop.

### SEO e domínio

Antes da publicação, substitua `https://SEU-DOMINIO.com.br/` em:
- `index.html`: `canonical`, `og:url` e `og:image`;
- `robots.txt`: URL do sitemap;
- `sitemap.xml`: URL canônica.

Quando o domínio for configurado, edite o arquivo `CNAME` para conter somente o hostname que será usado, por exemplo `www.seudominio.com.br`. Remova o texto de exemplo/comentário e salve o domínio exato. Configure o mesmo domínio em **Settings → Pages → Custom domain** no GitHub.

Se publicar inicialmente em `https://USUARIO.github.io/REPOSITORIO/`, use essa URL real como base de canonical e sitemap provisórios, incluindo o caminho do repositório. Não deixe canonical apontando para domínio de exemplo.

O JSON-LD `Organization` é inserido por JavaScript apenas quando `siteUrl` tem um endereço HTTPS real. Endereço e e-mail só são adicionados quando informados. Dados estruturados não garantem resultados enriquecidos nem melhor posição.

## 2. Testar localmente

Pode abrir `index.html` diretamente no navegador para uma conferência rápida. Para testar como um site servido por HTTP, no terminal, entre na pasta e execute:

```bash
python3 -m http.server 8000
```

Acesse `http://localhost:8000`. O link do WhatsApp continuará pendente até preencher o número no arquivo de configuração.

## 3. Publicar no GitHub Pages

1. Crie um repositório público no GitHub, por exemplo `coleta-eletronicos`.
2. Envie todos os arquivos mantendo a estrutura de pastas.
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/(root)`, depois salve.
6. Aguarde a URL de publicação aparecer e teste no celular e no desktop.
7. Confirme se imagens, CSS e JavaScript carregam corretamente.

### Domínio próprio (quando comprar)

1. Escolha se usará o domínio raiz (`seudominio.com.br`) ou `www.seudominio.com.br` como endereço principal.
2. Cadastre o domínio em **Settings → Pages → Custom domain**.
3. Configure os registros DNS conforme a documentação atual do GitHub Pages e as instruções do registrador. Para `www`, normalmente é usado um CNAME para `USUARIO.github.io`; para domínio raiz, use os registros A/AAAA recomendados pelo GitHub.
4. Preencha `CNAME` com o hostname escolhido, sem `https://` e sem caminho.
5. Aguarde a propagação DNS, habilite **Enforce HTTPS** quando disponível e teste a versão HTTPS.
6. Não configure DNS com base em endereços IP copiados de tutoriais antigos; confira os valores oficiais vigentes do GitHub.

## 4. Google Search Console

1. Adicione a propriedade de domínio no Google Search Console.
2. Faça a verificação DNS quando tiver o domínio próprio. Enquanto isso, é possível usar uma propriedade de prefixo de URL para a URL publicada no GitHub Pages.
3. Envie `sitemap.xml` usando a URL pública correta.
4. Use a inspeção de URL para pedir indexação da página inicial.
5. Confira periodicamente indexação, consultas, impressões, cliques e problemas de experiência.
6. Corrija erros reportados; solicitação de indexação não garante inclusão nem posição.

## 5. SEO: próximos passos

- Substitua textos genéricos por informações específicas, úteis e verificáveis sobre a empresa, área atendida, materiais aceitos, condições e processo.
- Escolha título e descrição de acordo com a região real; não inclua cidades que não atende.
- Otimize as imagens e mantenha o conteúdo principal acessível em HTML.
- Garanta que o site seja rápido, acessível e utilizável por teclado e celular.
- Se a empresa tiver perfil elegível no Google Business Profile, configure-o com dados reais e consistentes.
- Considere páginas adicionais por região ou categoria apenas se houver conteúdo distinto e útil para cada intenção de busca.
- Não use `meta keywords`: o Google não usa essa tag para ranking.
- Não prometa posição ou prazo de indexação. SEO é contínuo e depende de concorrência, relevância e rastreamento.

## Checklist de publicação

- [ ] Nome real da empresa revisado.
- [ ] Área atendida definida e confirmada.
- [ ] Gratuidade e condições verificadas e descritas sem ambiguidades.
- [ ] Equipamentos aceitos confirmados.
- [ ] Número de WhatsApp testado.
- [ ] E-mail/endereço removidos ou confirmados.
- [ ] Domínio e canonical substituídos em todos os arquivos.
- [ ] `robots.txt` e `sitemap.xml` testados na URL pública.
- [ ] HTTPS ativo.
- [ ] Search Console configurado.
- [ ] Revisão mobile, acessibilidade e links concluída.
