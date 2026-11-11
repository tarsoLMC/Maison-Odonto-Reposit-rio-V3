# Maison V11 — Tratamentos em capítulos no celular

## Experiência do paciente

A entrada do visitante pela escolha guiada (V10) continua intacta. Ao tocar em um tratamento, ele abre uma página de conteúdo individual. Em celular, a página apresenta:

1. Título, fotografia ilustrativa e botão de WhatsApp logo na abertura.
2. Chamada adicional para agendar ou continuar a explicação, sem redirecionamento automático.
3. Três capítulos curtos durante a rolagem — derivados dos campos `journey` de `content/maison.json`.
4. Outro convite para WhatsApp e acesso opcional às explicações integrais.
5. Perguntas frequentes, tratamentos relacionados e convênios existentes.

O usuário não precisa clicar em capítulos para desbloqueá-los. A rolagem é nativa e o texto nunca fica invisível aguardando animações.

## Salvaguardas

- Mobile até 720px: narrativa editorial; desktop: conteúdo anterior completo.
- JavaScript falhou: narrativa e conteúdo completo permanecem disponíveis, sem travamento.
- JavaScript funciona: o texto técnico detalhado fica recolhido na apresentação mobile; a ação `Ver explicações completas` revela o conteúdo original e navega até ele, sem fechar novamente.
- `IntersectionObserver` apenas aplica uma animação sutil de `opacity` e `transform`; sem suporte, nada desaparece.
- `prefers-reduced-motion`: sem animação decorativa.
- Imagens existentes e dados profissionais não foram inventados nem modificados.
- WhatsApp usa o contato já cadastrado e uma mensagem específica por especialidade, sem coletar preferências do visitante.
- Nenhum formulário foi adicionado, e nenhuma resposta é transmitida ou armazenada.

## Arquivos

- `scripts/build_site.py`: função `mobile_treatment_story` produz marcação para as sete especialidades a partir de `journey`.
- `assets/css/maison-story-v11.css`: identidade, rolagem nativa e mobile first.
- `assets/js/maison-story-v11.js`: realce por interseção, responsividade e botão para conteúdo integral.
- `scripts/check-story-v11.py`: valida sete páginas, 21 capítulos, links, alternativas e conteúdo preservado.
- `tests/story-v11.test.cjs`: simulações de rolagem, movimento reduzido, estado expandido e adaptação a viewport.
- `.github/workflows/site-qa.yml`: verifica os 13 HTMLs gerados e o JavaScript.

## Validação necessária após o deploy

Safari em iPhone (320, 375, 390 e 430px), Chrome Android, zoom de 200%, leitor de tela, rede lenta, links reais do WhatsApp, carregamento de fotos, LCP/INP/CLS, e ausência de sobreposição da barra inferior.

A execução automatizada não comprova ergonomia em um aparelho real. Não publicar CRO, horários ou fotos clínicas novos sem verificação. Manter `noindex,nofollow` no domínio temporário.
