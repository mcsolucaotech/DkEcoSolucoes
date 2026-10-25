# PRODUCT — DK Eco Soluções

## Problema

Pessoas e pequenas empresas em São Paulo e no litoral paulista precisam descartar eletrônicos e eletrodomésticos antigos, quebrados ou com defeito, mas têm dificuldade de encontrar um serviço prático e responsável para encaminhar esses aparelhos.

## Público

Moradores e pequenas empresas na região atendida (São Paulo e litoral paulista, sob consulta por cidade) que querem liberar espaço e descartar aparelhos sem uso de forma consciente.

## Produto

Landing page estática de página única que apresenta o serviço de coleta gratuita da DK Eco Soluções, explica o que é coletado e como funciona, e direciona o visitante ao WhatsApp para agendar e consultar a disponibilidade na sua cidade.

## Fluxo essencial

1. Visitante chega à página (SEO ou link direto).
2. Lê o que é coletado, como funciona e a cobertura (São Paulo e litoral, sob consulta por cidade).
3. Clica em um link de WhatsApp (`wa.me/5511976517285`) com mensagem pré-preenchida.
4. Combina os itens, a cidade e os próximos passos com a equipe pelo WhatsApp.

## Restrições

- Site **estático**: HTML/CSS/JS puro, sem backend, sem banco de dados, sem formulário. Toda a lógica é no cliente.
- Contato **somente por WhatsApp** (links `wa.me` e `tel:`); não há captura de dados do visitante.
- Serviço **gratuito** e atendimento **sob consulta por cidade** — toda afirmação de gratuidade e cobertura no site deve refletir a operação real; não inventar cidades nem itens.
- Deploy via **GitHub Pages**; domínio próprio ainda não definido (ver `docs/onboarding.md`).
- **Sem dados sensíveis** no repositório; `config.js` contém dados públicos de negócio (nome, WhatsApp), nunca segredos.

## Suposições e pendências (confirmar antes de publicar)

- **Domínio real** não definido; `canonical`, `og:url`, `og:image`, `sitemap.xml` e `CNAME` usam placeholders ou estão ausentes. Sem domínio, não publicar metadados de URL.
- **Cidades atendidas**: o site diz "São Paulo e litoral" com consulta por cidade; a lista específica não está confirmada no código.
- **Ano de fundação**: o texto de "Quem somos" diz "nasceu em 2026"; não confirmado por outra fonte — manter só se a empresa confirmar.
- **E-mail e endereço comercial**: vazios em `config.js`; só preencher se houver dado público real.
- **Imagens sem uso** (ex.: "Colagem Colorida de Reciclagem Eletrônica") contêm mensagens não confirmadas; não publicar até validar o conteúdo da arte.

## Critérios de aceitação

- A página carrega apenas com HTML/CSS/JS estáticos, sem build nem backend.
- Todos os links de WhatsApp apontam para `5511976517285` com mensagem pré-preenchida e abrem em nova aba com `rel="noopener noreferrer"`.
- O conteúdo principal é acessível mesmo sem JavaScript (progressive enhancement da revelação — ver `docs/design.md`).
- Imagens têm texto alternativo; navegação por teclado funciona; `prefers-reduced-motion` é respeitado.
- `npm run verify` passa (HTML válido + links locais íntegros).
- Metadados de compartilhamento (Open Graph, Twitter Cards, `canonical`) só são preenchidos com o domínio real confirmado.
