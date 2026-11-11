# Maison V13 — Microinterações úteis sem sobrecarregar o celular

## Escopo implementado

1. **Continuidade da enquete**: quando o usuário escolhe uma das quatro categorias no celular e navega para um tratamento, a categoria é mantida apenas no `history.state` da entrada do navegador. Não há cookies, armazenamento persistente, conta, formulário, requisição nem envio de informações de saúde para o servidor. Quando a pessoa volta pelo histórico, reaparece a lista relacionada. O link "Outros tratamentos" utiliza o botão Voltar do navegador somente se a origem imediata for a própria página de especialidades; caso contrário usa o link normal.
2. **Dúvidas rápidas**: as perguntas e respostas existentes em `content/maison.json` são mostradas em acordeões nativos em cada uma das sete histórias mobile. No celular com JS, a seção FAQ completa antiga fica oculta para evitar duplicação; permanece visível no desktop e no fallback sem JS. Conteúdo integral continua acessível.
3. **Maison Compare**: comparações educativas em quatro páginas, nos pares implantes/próteses e clareamento/lentes. O conteúdo está em `content/maison-compare.json`, derivado do inventário editorial e sem indicação individual. A seleção é acessível por toque e teclado; sem JS, ambas as explicações permanecem visíveis.
4. **WhatsApp contextual**: o botão inferior fixo e o contato flutuante usam mensagem específica do procedimento nas sete páginas. O canal, telefone e endereço permanecem inalterados.
5. **Performance e resiliência**: CSS/JS V13 só nas páginas individuais; sem bibliotecas externas, sem novas imagens, sem rastreamento e sem animação necessária para ler.

## Arquivos

- `scripts/build_site.py`: gera os novos componentes e os links de contato por serviço.
- `content/maison-compare.json`: duas comparações de caráter educativo.
- `assets/css/maison-v13.css`: estilos de FAQ e comparação, restritos a mobile.
- `assets/js/maison-compare-v13.js`: interação acessível das comparações e retorno de navegação.
- `assets/js/maison-mobile-quiz.js`: restauração do passo no histórico do navegador.
- `scripts/check-v13.py`, `tests/compare-v13.test.cjs` e `tests/mobile-quiz.test.cjs`: regressões.

## Publicação responsável e limitações

- Comparações são **informativas**, não recomendação de procedimento. Recomenda-se a revisão clínica/ética dos textos antes da migração ao domínio definitivo.
- Nenhuma informação de CRO, horário, convênios ou resultados clínicos foi inventada.
- A versão temporária mantém `noindex,nofollow`.
- Exigir testes reais no Safari de iPhone, Chrome de Android, leitor de tela, zoom 200%, links de WhatsApp e Core Web Vitals antes de declarar homologação completa.
- Clique no WhatsApp não confirma mensagem enviada ou consulta agendada.

## Validar

```sh
python3 scripts/build_site.py
python3 scripts/check-site.py
python3 scripts/check-v8.py
python3 scripts/check-v9.py
python3 scripts/check-mobile-quiz.py
python3 scripts/check-story-v11.py
python3 scripts/check-minimal-v12.py
python3 scripts/check-v13.py
node --check assets/js/maison-compare-v13.js
node --test tests/*.test.cjs
git diff --exit-code -- '*.html'
```
