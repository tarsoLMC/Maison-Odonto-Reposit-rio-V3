# Maison V16 — Auditoria editorial e experiência pós-escolha no computador

## Conclusão da auditoria

Antes da V16, a abertura de várias áreas era correta, porém abstrata. Frases como "bom planejamento", "individualidade" e "conheça as possibilidades" não explicavam ao visitante **o que o tratamento faz, o que deve ser avaliado e o que pode dar errado ou exigir manutenção**.

### Alterações implementadas

1. **Especialidades → Concierge desktop:** quatro títulos e quatro descrições refeitos para explicar diferenças concretas, sem criar promessas: implante versus prótese; alinhadores e uso diário; clareamento versus facetas; cirurgia versus harmonização facial.
2. **Páginas individuais (7):** as sete introduções no inventário original foram revistas; seis blocos de "Principais benefícios" foram substituídos por informações clínicas específicas, mantendo os demais textos já fundamentados.
3. **Guia "Antes de decidir" (só computador):** cada tratamento tem **três informações úteis** (definição, avaliação e limite/cuidado) com uma fonte clínica externa associada.
4. **Pergunta para a equipe:** formulário não é necessário; o visitante pode abrir o WhatsApp com uma pergunta concreta pré-escrita, que pode editar livremente antes de enviar.
5. **Navegação direta:** links levam a explicações completas, etapas, perguntas frequentes e opções relacionadas na mesma página. Sem conteúdo bloqueado ou rolagem obrigatória.
6. **SEO:** cada tratamento tem `meta description` e `og:description` próprios, informativos e sem texto genérico duplicado.
7. **Mobile:** o guia novo é oculto até 920px; o quiz e a narrativa mobile permanecem.

### Fonte dos textos novos

Os textos já existentes do site, recuperados em `content/maison.json`, serviram como base. As informações clínicas gerais da V16 foram confrontadas com material externo:

- Implantes: [American Dental Association, MouthHealthy](https://www.mouthhealthy.org/all-topics-a-z/implants/)
- Próteses: [NHS — Dentures](https://www.nhs.uk/tests-and-treatments/dentures/)
- Alinhadores: [American Association of Orthodontists — Clear aligners](https://aaoinfo.org/whats-trending/braces-vs-clear-aligners/) e [Retainers](https://aaoinfo.org/whats-trending/will-i-need-to-wear-retainers/)
- Lentes/facetas: [American Dental Association — Veneers](https://www.mouthhealthy.org/all-topics-a-z/veneers)
- Clareamento: [American Dental Association — Whitening](https://www.ada.org/resources/ada-library/oral-health-topics/whitening)
- Cirurgia: [UCLH / NHS — Dental extraction recovery](https://www.uclh.nhs.uk/patients-and-visitors/patient-information-pages/dental-extractions-post-operative-instructions)
- Harmonização: [FDA — Dermal fillers and risks](https://www.fda.gov/medical-devices/aesthetic-cosmetic-devices/dermal-fillers-soft-tissue-fillers)
- Ética: [CFO — uso de imagens e anúncios odontológicos](https://website.cfo.org.br/redes-sociais-na-odontologia-fique-atento-as-normas-eticas-e-acerte-na-publicacao-dos-conteudos/)

Essas referências **não comprovam o portfólio, a qualificação da equipe, o material exato ou o protocolo aplicado pela Maison**. Explicam procedimentos e riscos de maneira geral; a indicação clínica só ocorre mediante avaliação.

### Informações que ainda **não estão verificadas** e não foram inventadas

- Nomes, CRO e qualificações profissionais da equipe e responsável técnico
- Materiais/marcas de implantes, técnicas específicas, exames disponíveis e tecnologias utilizadas na Maison
- Duração e preço da consulta ou de cada procedimento; modalidades de pagamento
- Quais procedimentos cada convênio efetivamente cobre e quando exige autorização
- Confirmação operacional dos horários e da possibilidade de sedação consciente por procedimento
- Fotografias clínicas próprias, autorizações de pacientes e resultados documentados

Sem essas confirmações, não usar afirmações como "em X sessões", "sem dor", "garantia de resultados", "a mais moderna tecnologia" ou números de sucesso.

### Ideias disruptivas futuras — com benefício e limite real

**1. Orientador de decisão não diagnóstico:** um comparador de uma tela com diferenças entre tratamentos e perguntas que o paciente pode levar à consulta. Já iniciamos com conteúdo V13/V15; próximo nível exige revisão clínica detalhada de tabelas comparativas.

**2. O que acontece na primeira consulta:** cronologia real de recepção, avaliação, exames, orçamento e próximos passos. Exige confirmar o fluxo operacional da clínica antes de publicar.

**3. Transparência de elegibilidade e orçamento:** explicar o que altera planejamento e custo, sem informar valores não confirmados. Depende da equipe validar critérios e oferta.

**4. Biblioteca de explicações com fontes:** artigos curtos e referenciais com revisão profissional, sem promessas ou "antes/depois" da clínica. Construir gradualmente.

**5. Escolha informada com contato contextual:** já implementado na V16, sem dados pessoais coletados e sem rastreamento clínico.

## Implementação e regressões

Fonte do gerador: `scripts/build_site.py`. Conteúdo: `content/treatment-guide-v16.json`, `content/concierge.json` e `content/maison.json`. Estilo: `assets/css/maison-guide-v16.css`. Verificação: `scripts/check-v16.py`.

CI mantém verificadores anteriores V8–V15 e compara todos os HTMLs gerados ao estado do repositório.

### Ainda pendente de homologação completa

- Conferir publicação na Hostinger e navegação em desktop físico 921, 1024, 1280, 1440 e 1920px
- Zoom de 200%, leitor de tela, teclado, Firefox, Chrome e Safari
- Leitura e validação final por dentista responsável antes de substituir a versão temporária `noindex,nofollow`
- Verificação independente de informações específicas da clínica, sobretudo horários, registro profissional e sedação consciente

*Estes são textos informativos, não orientações clínicas personalizadas.*
