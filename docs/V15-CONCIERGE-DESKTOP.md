# Maison V15 — Concierge Desktop

## Objetivo

Converter a página de tratamentos no computador de catálogo visual para espaço de orientação, sem tornar o percurso obrigatório.

### Experiência implementada

- Acima de 920 CSS px, as quatro categorias ficam em uma coluna lateral e o conteúdo editorial contextual aparece na coluna da direita.
- Escolha por toque, mouse e teclado usa o componente já existente da V9. Ao trocar a categoria, a página não muda, o scroll não é capturado e o usuário não precisa preencher formulário.
- Cada painel apresenta fotografia *ilustrativa* já disponível, explicação objetiva, links diretos aos tratamentos e WhatsApp contextual.
- Nas categorias de Reabilitação e Estética: **Compare as possibilidades** abre uma comparação informativa reaproveitando os dados validados editorialmente em `content/maison-compare.json`.
- Em Alinhamento e Outros cuidados e harmonização facial: **Uma dúvida comum** exibe a primeira pergunta existente do inventário `content/maison.json`.
- Um bloco inferior discreto "Sem pressa. No seu tempo." ajuda o visitante a entender que pode explorar, conversar e realizar uma avaliação individual, sem precisar identificar sozinho o procedimento indicado.
- O catálogo integral de sete tratamentos continua logo abaixo, sem exigir usar o Concierge.
- Sem JavaScript, todas as categorias, os painéis e os acordeões nativos permanecem acessíveis.
- Até 920 CSS px, o layout antigo é preservado; em telefone (até 720 px), a enquete da V10 continua sendo a experiência principal.

### Alterações técnicas

- `scripts/build_site.py` gera a comparação e as dúvidas a partir dos mesmos dados usados pelo site.
- `especialidades.html` é mantida sincronizada ao gerador.
- `assets/css/maison-desktop-v15.css` organiza o conteúdo em duas colunas, com breakpoints para desktop intermediário, foco visível e `prefers-reduced-motion`.
- `scripts/check-desktop-v15.py` verifica quatro categorias, quatro detalhes opcionais, duas comparações, duas dúvidas rápidas, sete tratamentos e contatos.
- GitHub Actions executa o verificador e exige HTML idêntico ao gerado.

### Cuidados

- As comparações não recomendam o tratamento ideal; somente informam diferenças gerais com o aviso de avaliação individual.
- Não adicionar fotos de pacientes, nomes de profissionais ou resultados clínicos não verificados.
- Horários, CRO e avaliações continuam sujeitos à confirmação antes do lançamento no domínio definitivo.
- Ambiente temporário permanece `noindex,nofollow`.
- Clique no WhatsApp é uma ação de contato, não comprovação de consulta agendada.

### QA ainda necessária fora do CI

- Navegação no Safari, Firefox e Chrome; larguras 921, 1024, 1280, 1440, 1920; zoom de 200%; leitor de tela.
- Comparação aberta e fechada; links contextuais; imagem e texto sem sobreposições.
- Core Web Vitals no ambiente publicado.
- Verificar deploy na Hostinger separadamente do sucesso do GitHub Actions.
