# Maison V10 — Jornada de tratamentos no celular

## Objetivo
Reduzir a densidade da página de especialidades em celulares, sem impedir o acesso direto aos tratamentos.

A inspiração de produto é uma navegação guiada em poucas etapas. O link da Manual foi fornecido como referência de formato, mas a experiência da Maison tem identidade, textos, ícones e comportamento próprios.

## Funcionamento
**Somente em telas de até 720 CSS px, com JavaScript funcional:**
1. "Qual cuidado você procura?" — escolha entre **Reabilitação**, **Alinhamento**, **Estética do sorriso** e **Outros cuidados e harmonização facial**.
2. "Qual tratamento você quer conhecer?" — exibe só os procedimentos da área, com ícone, nome, resumo e link para a página de detalhes.

Os controles permitem voltar, visualizar os sete tratamentos ou abrir diretamente o WhatsApp. Nenhuma resposta é armazenada ou transmitida. Não há formulário ou recomendação clínica automática.

**No desktop:** permanece o concierge V9 com fotografias e catálogo completo.

**Sem JavaScript:** a experiência V10 fica oculta e a página V9 tradicional permanece disponível, inclusive no celular.

## Arquivos
- `content/mobile-quiz.html`: conteúdo HTML da experiência, incluído pelo gerador.
- `scripts/build_site.py`: inclusão exclusiva em `especialidades.html`.
- `assets/css/maison-mobile-quiz.css`: layout mobile, estados, animações reduzidas e área segura.
- `assets/js/maison-mobile-quiz.js`: progresso, seleção, voltar, mostrar todos e adaptação ao viewport.
- `scripts/check-mobile-quiz.py` e `tests/mobile-quiz.test.cjs`: verificações estáticas e simulação do fluxo.

## Critérios de qualidade
- `python3 scripts/build_site.py`
- `python3 scripts/check-site.py`
- `python3 scripts/check-v8.py`
- `python3 scripts/check-v9.py`
- `python3 scripts/check-mobile-quiz.py`
- `node --check assets/js/maison-mobile-quiz.js`
- `node --test tests/concierge-interaction.test.cjs tests/mobile-quiz.test.cjs`
- `git diff --exit-code -- especialidades.html` após o build

## Pendências antes de considerar totalmente aprovado
- Safari físico em iPhone (320–430 px), Chrome Android, leitor de tela, zoom 200% e teste de links em hospedagem
- LCP/INP/CLS e comparação de uso: não presumir maior conversão sem dados
- Confirmação editorial de horários, CRO, fotos reais e convênios para lançamento definitivo

O domínio temporário mantém `noindex,nofollow` e as páginas completas continuam acessíveis no desktop.
