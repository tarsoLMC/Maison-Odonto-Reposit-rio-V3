# Maison V14 — Abertura emocional e navegação no computador

## Objetivo
Fazer com que a Home apresente primeiro o significado humano do sorriso e, em seguida, ofereça opções claras ao visitante, sem questionário obrigatório e sem rolagem artificial.

## Nova abertura
**Título:** Seu sorriso guarda histórias. Vamos cuidar das próximas.

**Texto:** Um sorriso vai além dos dentes. É autoestima, bem-estar e presença nos momentos que ficam na memória. Na Maison, cada história merece atenção e um cuidado individualizado.

O texto é aspiracional e não promete ou garante resultados clínicos. Os CTAs permanecem: agendamento pelo WhatsApp e tratamentos.

## Desktop
- Depois da credibilidade da clínica, seção editorial "O cuidado começa quando ouvimos você".
- Três links diretos: **Conhecer os tratamentos**, **Consultar meu plano**, **Conhecer a Maison**.
- A lista de tratamentos vem antes da seção de planos de saúde, para responder primeiro a quem procura informações clínicas, sem retirar convênios.
- Sem modal inesperado, conteúdo bloqueado, autoplay, efeitos invasivos ou novas dependências JavaScript.
- A seção de escolhas existe visualmente somente no desktop (a partir de 921 CSS px); todos os links já estão disponíveis na navegação do celular.

## Arquivos
- `scripts/build_site.py` contém a Home atualizada e a função `home_desktop_guide()`.
- `index.html` sincronizado ao gerador.
- `assets/css/maison-desktop-v14.css`: regras responsivas da entrada e do painel, preservando `prefers-reduced-motion`.
- `scripts/check-desktop-v14.py`: valida título, texto, ordem das seções, navegação e segurança editorial.
- Workflow CI compara as 13 páginas reconstruídas, inclusive a Home.

## Próximas ideias de maior potencial (planejadas, não implementadas)
1. **Mesa de orientação desktop:** um comparador educativo integrado à página de especialidades, com dois procedimentos lado a lado.
2. **Experiência de primeira visita:** visão resumida do que acontecerá da chegada à clínica ao primeiro atendimento, desde que os procedimentos sejam confirmados pela equipe.
3. **Clínica em contexto:** pequeno mapa ilustrado e caminho de acesso ao Centro Clínico Advance, sem buscar a localização exata do usuário.
4. **Preferência por leitura:** alternar entre visão resumida e conteúdo integral no desktop, sem ocultar páginas para mecanismos de busca.
5. **Medição do funil com consentimento:** entender o uso dos três caminhos sem compartilhar informações clínicas sensíveis nem tratar clique como agendamento.

## Limites
O código não comprova que a estética está homologada. Testar em telas de 1024, 1280, 1440 e 1920px, zoom 200%, navegação por teclado, leitor de tela, Firefox e Safari. Validar que avaliações, horário de atendimento, CRO e dados da clínica estejam corretos antes de publicar no domínio definitivo.
