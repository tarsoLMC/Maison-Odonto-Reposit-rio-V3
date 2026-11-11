# Validação da Maison V4

## Arquivos e navegação

- 12 páginas HTML com H1, título e descrição individuais.
- 375 referências locais e âncoras verificadas.
- 91 links para o WhatsApp correto da clínica.
- Nenhum formulário.
- JSON-LD válido e recursos CSS/fontes existentes.
- JavaScript validado com `node --check`.

## Navegador de teste

12 páginas × 6 larguras: 320, 375, 390, 430, 768 e 1440 px. As 72 combinações passaram sem rolagem horizontal, incluindo abertura do menu nas larguras móveis. Teste realizado em Chromium; não equivale a Safari em um iPhone físico.

Também foram conferidos os filtros de especialidades (3 opções em Estética e 6 em Todas), a expansão das perguntas frequentes e a navegação entre páginas.

## Falha de JavaScript

Verificação em iframe com scripts bloqueados:

- Introdução desaparece por CSS.
- Rolagem não fica bloqueada.
- Link Entrar direto leva ao conteúdo e oculta a apresentação.
- Menu nativo do celular abre normalmente.

A proteção da introdução permanece no HTML inicial e funciona independentemente do arquivo de JavaScript. Arquivos CSS e JS usam URLs versionadas para evitar cache antigo.

## Limites

Não foram medidas métricas de campo Core Web Vitals nem validado posicionamento em buscas. O endereço temporário continua sem indexação. Os dados profissionais e as outras pendências de produção constam no checklist.
