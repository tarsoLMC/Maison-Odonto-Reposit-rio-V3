# Maison V17 — Auditoria rápida fundamentada em fontes públicas

## Escopo da avaliação
Inspeção de código-fonte do repositório na branch `main` (V16), comparação com recomendações publicadas pela Pesquisa Google, web.dev, W3C/WCAG 2.2, CRO-DF e dados públicos da Maison Odontologia Especializada. A ferramenta externa não conseguiu abrir as páginas da Hostinger para inspeção visual ou Lighthouse; **não foi aferida velocidade real**.

## Correções técnicas implementadas sem novos dados
1. Nas **sete páginas de procedimentos**, o agendamento do cabeçalho (desktop) e do menu móvel passam a preparar mensagem referente ao procedimento visitado; os CTAs de outras páginas ficam genéricos.
2. A imagem principal de cada procedimento deixa de ter somente `alt="Imagem ilustrativa"` e recebe identificação ilustrativa relacionada ao procedimento. Isso **não substitui descrição visual precisa** após validação da fotografia utilizada.
3. Um verificador de regressões impede que as mensagens voltem a ficar genéricas nos sete cabeçalhos ou que as sete imagens principais percam os textos alternativos.

## Pontos identificados, não alterados automaticamente

### 1. Dados regulatórios obrigatórios — prioridade alta
O rodapé do projeto traz a razão social e o CNPJ, mas não identificações de inscrição no CRO e do responsável técnico. O Código de Ética Odontológica (CFO Resolução 118/2012, artigo 43) prevê nome e número de registro da pessoa física ou jurídica e, para empresas, nome e número de inscrição do responsável técnico. O CRO-DF confirma essas informações como obrigatórias na publicidade odontológica. É necessário coletar e validar os **dados oficiais reais** antes de incluí-los, não é permitido inventar.

Fontes:
- https://sistemas.cfo.org.br/visualizar/atos/RESOLU%C3%87%C3%83O/SEC/2012/118
- https://cro-df.org.br/cro-df-codigo-de-etica-profissional-e-exercicio-legal-da-odontologia/

### 2. Experiência/SEO entre domínio antigo e versão temporária — prioridade alta no lançamento
O buscador ainda encontra material de `https://maisonodonto.com.br/` que corresponde ao site anterior, inclusive número fixo (61) 3204-3436. O repositório V16 utiliza (61) 99599-1116 como telefone secundário, além do WhatsApp (61) 99143-4312. A fonte pública do CNES também informa outro número e horário 08:00–18:00, ao passo que o novo site apresenta 08:00–12:00 e 13:00–18:00. **Confirmar telefones e horários com a equipe**; não corrigir por inferência a partir de cadastros heterogêneos. O ambiente Hostinger temporário está com `noindex,nofollow`, `robots.txt: Disallow: /`, URLs canônicas e mapa do site da hospedagem; é proposital para homologação, mas exige checklist para a futura migração para o domínio oficial.

Fontes:
- https://maisonodonto.com.br/
- https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=5300102847167
- https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=pt-BR

### 3. Visual e desempenho
A imagem `assets/img/tratamento-implantes.webp` é declarada com dimensões **300 × 300** no gerador e é usada no hero da página de implantes. Isso poderá parecer pouco nítido em monitor de alta densidade. Requer fotografia/arte de maior resolução para melhoria real; aumentar pixels artificialmente não recupera detalhes.

A Home mantém uma apresentação inicial (`#opening`) de duração limitada por JavaScript/CSS. Não é demonstrado que seja ruim no navegador real, mas pode adicionar atraso perceptível no acesso ao conteúdo. Recomenda-se verificar o comportamento com visitantes novos, rede lenta e teclado, e considerar reduzir/evitar o efeito para repetentes. Não remover sem decisão editorial.

Métricas a medir no domínio publicado: LCP até 2,5 s, INP até 200 ms e CLS até 0,1 (percentil 75). Sem testes de navegador ou medição de campo, nenhum desses valores foi atribuído ao site.

Fontes:
- https://web.dev/articles/vitals
- https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance?hl=pt-br
- https://www.w3.org/Translations/WCAG22-pt-BR/

## Implantação
Arquivos alterados: `scripts/build_site.py`, sete HTMLs de procedimentos, `scripts/check-quick-audit-v17.py`, workflow CI e esta nota. Nenhuma mudança em domínio canônico, robots, horários, números telefônicos, CRO, texto clínico, CSS ou recursos de imagem.

### Testes
`python3 scripts/build_site.py`; `python3 scripts/check-site.py`; verificadores V8–V16; `python3 scripts/check-quick-audit-v17.py`; `git diff --exit-code -- '*.html'` e os testes JavaScript. A aprovação desses testes não substitui conferência visual de Hostinger, Safari, Firefox ou PageSpeed Insights.
