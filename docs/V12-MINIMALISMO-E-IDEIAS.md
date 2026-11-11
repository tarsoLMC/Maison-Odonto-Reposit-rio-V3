# Maison V12 — Minimalismo funcional no celular

## Por que simplificar

A V11 repetia no celular o convite para WhatsApp no hero, na abertura da história e no fechamento. A V12 elimina a abertura duplicada e deixa o caminho principal mais direto: escolher tratamento, entender três etapas e conversar.

## Alterações implementadas

- Sete páginas individuais: remover a introdução repetida da narrativa; preservar hero com CTA contextual, capítulos, CTA final e botão para explicações completas.
- Capítulos deixam de parecer três cartões grandes: passam a uma linha do tempo vertical com divisórias leves, sem sombras fortes e sem símbolos decorativos volumosos.
- Enquete inicial: redução moderada da altura dos cartões e do tamanho dos símbolos, sem reduzir o texto para níveis desconfortáveis; retirar rótulo duplicado "2 passos simples".
- Nova folha de estilos `assets/css/maison-compact-v12.css` atua **somente até 720px**, depois das regras V10/V11. O desktop mantém a composição anterior.
- `scripts/build_site.py` permanece como fonte da geração dos 13 HTMLs; arquivos publicados sincronizados.
- Não muda os 21 textos educativos dos `journey` nem as FAQs completas.

## Critérios e cautelas

- Os botões importantes continuam com área de toque próxima de 48px ou maior. O WCAG 2.2 AA exige alvos de 24x24 px ou espaçamento equivalente; aqui usamos uma meta de conforto maior onde possível.
- A apresentação progressiva deve ser **puramente decorativa**: nenhum texto depende de animação para ser lido.
- `prefers-reduced-motion` continua respeitado.
- A ação "Ver detalhes completos" continua revelando o conteúdo, sem navegar a outra página.
- WhatsApp é a ação principal, mas **não há redirecionamento automático**.
- Sem dados pessoais, diagnóstico ou resultados clínicos presumidos.

## Possibilidades futuras (não implementadas)

1. Comparação simples de duas alternativas odontológicas com critérios educativos, sem recomendar tratamento.
2. Mini-orientação por dúvidas frequentes em 20–30 segundos, sem coleta de dados.
3. Vídeos curtos de dentistas reais da Maison, iniciados apenas pelo visitante e carregados sob demanda.
4. Salvamento local **opcional** da categoria escolhida para continuar a navegação sem repetir escolhas, com controle claro de exclusão.
5. Mensuração agregada e consentida do funil (escolha > página de tratamento > clique em WhatsApp), distinguindo clique de agendamento confirmado.
6. Modo de acessibilidade de menor movimento, alto contraste e texto ampliado.

## Verificações

`python3 scripts/build_site.py`, `python3 scripts/check-site.py`, `python3 scripts/check-v8.py`, `python3 scripts/check-v9.py`, `python3 scripts/check-mobile-quiz.py`, `python3 scripts/check-story-v11.py`, `python3 scripts/check-minimal-v12.py`, testes Node e consistência do gerador no GitHub Actions.

### Pendente para homologação visual

Safari físico (320, 375, 390 e 430px), Android, zoom 200%, leitura por voz, navegação com teclado, medição real de Core Web Vitals, verificação da publicação e comportamento da barra fixa do WhatsApp. O domínio temporário permanece com `noindex,nofollow`.
