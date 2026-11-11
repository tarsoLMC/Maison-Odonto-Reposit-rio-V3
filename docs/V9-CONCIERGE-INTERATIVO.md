# Maison V9 — Concierge Interativo de Tratamentos

## Objetivo

Transformar a página \`especialidades.html\` em uma experiência de descoberta de tratamentos, especialmente confortável no iPhone, sem exigir preenchimento de formulário e sem simular diagnóstico.

### Interface implementada
- Quatro categorias selecionáveis: Reabilitação; Alinhamento; Estética do sorriso; **Outros cuidados e harmonização facial**.
- Painel editorial contextual para cada escolha, com foto ilustrativa local, explicação, links de tratamentos e WhatsApp com mensagem específica.
- Transição discreta; em \`prefers-reduced-motion: reduce\` não há movimento decorativo.
- Navegação por teclado (setas, Home, End), \`role=tablist\`, \`aria-selected\` e foco visível adicionados quando o JavaScript funciona.
- Sem JavaScript, os quatro painéis e seus links ficam no HTML e continuam acessíveis por âncoras.
- Sete cards tradicionais permanecem abaixo, para acesso direto ou consulta completa.
- Conteúdo do concierge mantido em \`content/concierge.json\`; o gerador \`scripts/build_site.py\` gera sua marcação.

### Controle de qualidade
- Executar \`python3 scripts/build_site.py\`.
- Executar \`python3 scripts/check-site.py\`, \`python3 scripts/check-v8.py\`, \`python3 scripts/check-v9.py\`.
- Executar \`node --check assets/js/maison-concierge.js\` e \`node --test tests/concierge-interaction.test.cjs\`.
- Verificar \`git diff --exit-code -- especialidades.html\` após a geração para não manter HTML divergente da fonte.
- No aparelho real, testar 320, 360, 375, 390, 430, 768 e 1440 CSS px, incluindo Safari em iPhone, toque, foco, zoom, imagem em rede lenta, retorno do navegador e movimento reduzido.

### Limites e cuidados
- Fotos de tratamento continuam marcadas como **ilustrativas** e não representam necessariamente a clínica ou um paciente específico.
- Esta interface **não recomenda clinicamente** qual tratamento realizar; a decisão depende da avaliação profissional.
- Não modifica informações de CRO, horários, convênios ou o domínio definitivo.
- O domínio temporário permanece com \`noindex,nofollow\` até o processo editorial e a migração terem sido validados.
- Clique no WhatsApp comprova apenas abertura do link; não comprova mensagem enviada ou consulta agendada.
- Testes Node e estáticos não substituem Safari real, aferição de LCP/INP/CLS, nem inspeção visual final em hospedagem.

### Publicação e reversão
Fonte: \`feat/maison-v9-concierge-interativo\`. Integrar à \`main\` após CI verde; o deploy automático da Hostinger pode ocorrer depois do merge conforme configuração atual. Para reverter, usar o histórico do Pull Request.
