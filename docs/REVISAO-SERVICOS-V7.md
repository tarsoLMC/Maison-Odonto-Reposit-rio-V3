# Revisão V7 — Serviços e mobile

## Escopo
- Reorganiza a página de tratamentos em oito módulos (sete tratamentos + orientação pelo WhatsApp), permitindo grade de quatro colunas no desktop e cartões legíveis no celular.
- Acrescenta um guia visual para navegar por necessidades (reposição de dentes, alinhamento e estética). O guia **não é diagnóstico**, e reforça a avaliação profissional.
- Inclui um card final com agendamento direto no WhatsApp, sem formulário.
- Ajusta rótulos, títulos e descrições dos cards para 320–430 px; reforça contraste, estados de foco e alvo de toque.
- Eleva para 16 px a leitura dos detalhes dos tratamentos em telas menores.
- Atualiza a versão de cache `maison-v7` nas 13 páginas.

## Fonte de verdade
Atualizar sempre `scripts/build_site.py` e `content/maison.json` quando houver alterações de estrutura ou texto e executar `python scripts/build_site.py`, para evitar que futuras compilações revertam a página.

## Validação
- Gerador Python executado em uma cópia do repositório-base: 13 páginas geradas.
- `python scripts/check-site.py`: **PASS**; 546 referências locais; 121 links de WhatsApp.
- Estruturas verificadas: 7 links de tratamentos, 1 card de agendamento e 3 âncoras correspondentes no seletor.

## Antes de integrar à main
- Testar a aparência e o fluxo de toque em Safari real, principalmente com iPhone de 375–430 px, e em Android/Chrome.
- Validar os dados clínicos, convênios, identificação CRO, informações de contato e autorização de imagens com a clínica.
- Não foi feito deploy na Hostinger nem medição de Core Web Vitals em produção.

## Reversão
Se o resultado visual não agradar, não mesclar o PR; a branch `main` permanece inalterada.
