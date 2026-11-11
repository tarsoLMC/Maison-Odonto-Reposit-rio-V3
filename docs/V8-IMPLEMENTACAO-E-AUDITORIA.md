# Maison Odonto V8 — implementação e auditoria

## Escopo desta revisão
A V8 preserva as 13 páginas estáticas, os dados confirmados já cadastrados e o fluxo direto para WhatsApp. As melhorias foram desenvolvidas conforme o *Prompt Mestre — Criação e Auditoria de Sites* e o *Guia Avançado Sites e Prompts IA*.

### Mudanças implementadas
- Página geral de especialidades: quatro grupos orientados por necessidade (reabilitação, alinhamento, estética dental e outros cuidados), com links para **todos os sete tratamentos**, sem sugerir diagnóstico automático.
- Cards dos sete serviços e card extra de avaliação pelo WhatsApp preservados.
- Sete páginas individuais: procedimento explícito no H1, chamada editorial secundária, botão contextual para avaliação e dois tratamentos relacionados por página.
- Lentes de contato dentais: três perguntas frequentes novas sobre avaliação, alternativas e cuidados.
- `assets/css/maison-v8.css`: camada isolada de layout e tipografia, áreas de toque, foco, âncoras compensadas para header fixo e safe area da barra móvel.
- `scripts/build_site.py` e `content/maison.json` atualizados para evitar que futuras compilações eliminem as melhorias.
- Todas as 13 páginas carregam a versão de estilos `maison-v8`.

### Critérios de aceitação
| Critério | Status | Evidência / observações |
| --- | --- | --- |
| Q01 — Entrada animada sem bloquear | PASSOU (estático) | Fallback CSS e saída por JavaScript preservados; teste em Safari pendente |
| Q02 — Rotas e assets internos | PASSOU (estático) | `python scripts/check-site.py` |
| Q03 — Mobile em 320–1440 px | NÃO TESTADO em navegador | Browser local bloqueado: `ERR_BLOCKED_BY_ADMINISTRATOR`; testes em Safari/Chrome de aparelho pendentes |
| Q04 — Teclado e leitor de tela | NÃO TESTADO (manual) | Regras de `focus-visible` presentes, mas não comprovam acessibilidade integral |
| Q05 — WhatsApp | PASSOU (destino estático) | 121 links no site; abertura e recebimento de mensagens reais não testados |
| Q06 — Formulários/erros | NÃO SE APLICA | Projeto não utiliza formulários |
| Q07 — Conteúdo, integridade e links | PASSOU (estrutura) | `python scripts/check-v8.py`: 13 páginas e sete tratamentos |
| Q08 — Movimento reduzido | PASSOU (código) | CSS e JS preservam alternativa; teste real pendente |
| Q09 — LCP, INP e CLS | NÃO TESTADO | Sem dados de campo nem Lighthouse em produção |
| Q10 — Hostinger em produção | NÃO TESTADO | Verificar após deploy: imagens, links, cache e rotas |

### Verificações executadas em cópia local
- `python scripts/build_site.py`: **13 páginas geradas**
- `python scripts/check-site.py`: **PASS**, 577 referências locais, 121 links de WhatsApp
- `python scripts/check-v8.py`: **PASS**, sete serviços, quatro grupos, três FAQs de lentes
- `node --check assets/js/maison.js`: **PASS**
- Tentativa de teste Chromium/Playwright: **NÃO TESTADO**, pois a política do ambiente bloqueou a abertura de URLs locais e do servidor local.

### Pendências editoriais e de lançamento
1. Confirmar identificação e registros CRO dos profissionais e responsável técnico, sem inventar nomes ou títulos.
2. Conferir horários: os arquivos atuais informam 8h–12h e 13h–18h, enquanto uma arte enviada anteriormente mostra 9h–18h30.
3. Confirmar autorizações de imagem, fotografias da equipe e da clínica, planos/convênios, avaliações públicas e números apresentados.
4. Substituir fotografia de implantes de **300 × 300 px** por original de maior resolução, preservando procedência e licenças.
5. Manter `noindex,nofollow` no domínio temporário; só configurar indexação, canonical e SEO local ao migrar para o domínio definitivo com validação.
6. Medir CWV e verificar o site em Safari de iPhone real, Chrome Android e zoom de 200%.
7. Confirmar que a Hostinger publicou o commit e executar os CTAs em aparelho real; clique no WhatsApp não significa atendimento recebido.

### Publicação e reversão
Origem: branch `feat/maison-v8-experiencia-servicos` no GitHub. A branch `main` fica como destino do Pull Request, podendo disparar deploy automático na Hostinger após a mesclagem. Em caso de regressão, reverter o commit de integração no GitHub e confirmar o retorno na hospedagem. **Não modificar domínio definitivo, DNS ou informações de e-mail nesta fase.**
