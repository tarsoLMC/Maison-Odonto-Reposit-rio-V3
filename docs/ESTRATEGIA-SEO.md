# Maison — estratégia de conteúdo, navegação e busca local

## Objetivo

Facilitar três decisões: reconhecer a clínica, compreender uma especialidade e iniciar uma conversa para agendamento. A composição usa a marca oficial, verde profundo, marfim, areia, tipografia editorial e textura discreta. A entrada é curta e possui saída independente de JavaScript.

A experiência reúne decisões dos projetos anteriores: presença institucional da Saluvia, comunicação acolhedora da Essenes, contato direto e clareza local do Habite-se, navegação organizada e tratamento consistente dos serviços. Não se importam ofertas, dados ou promessas de outros negócios.

## Mapa de intenção e páginas

Estas são hipóteses editoriais de busca, não dados de volume ou concorrência de uma ferramenta de palavras-chave.

| Página | Busca principal | Necessidade atendida |
| --- | --- | --- |
| `index.html` | dentista na Asa Sul; clínica odontológica em Brasília | Conhecer a Maison e agendar |
| `especialidades.html` | especialidades odontológicas na Asa Sul | Comparar áreas de atendimento |
| `implantes-dentarios.html` | implantes dentários na Asa Sul; implante dentário em Brasília | Entender a possibilidade de reabilitação |
| `invisalign.html` | Invisalign na Asa Sul; alinhadores transparentes em Brasília | Conhecer a opção de alinhamento |
| `lentes-de-contato-dental.html` | lentes de contato dental na Asa Sul | Conversar sobre estética do sorriso |
| `clareamento-dental.html` | clareamento dental em Brasília; clareamento dentário na Asa Sul | Consultar avaliação para clareamento |
| `proteses-dentarias.html` | próteses dentárias na Asa Sul | Entender alternativas de reabilitação |
| `harmonizacao-orofacial.html` | harmonização orofacial na Asa Sul | Conhecer o atendimento e consultar avaliação |
| `a-maison.html` | Maison Odontologia Brasília | Ver história, ambiente e identidade |
| `convenios.html` | convênios odontológicos na Asa Sul | Confirmar cobertura diretamente com a equipe |
| `contato.html` | Maison telefone; dentista SGAS 915 | Encontrar endereço, rota e agendamento |

## Implementação

- Títulos e descrições individuais, um H1 por página, hierarquia de subtítulos e links para serviços relacionados.
- Dados estruturados `Dentist` e `BreadcrumbList`, com fatos de contato da clínica; sem avaliações, notas, preços ou credenciais inventados.
- Fotografias com texto alternativo e dimensões; imagem principal prioritária e secundárias carregadas sob demanda.
- Fontes locais, CSS/JS versionados, imagens WebP em duas larguras e ícones SVG.
- WhatsApp direto com mensagem relacionada ao assunto. Sem formulário ou coleta de dados de saúde no site.
- Menu móvel nativo, perguntas frequentes nativas, suporte a movimento reduzido e áreas de toque adequadas.
- Horário baseado na arte fornecida no projeto, sujeito a confirmação pela clínica.
- Canonical e Open Graph usam o endereço temporário atual. Na produção, atualizar para o domínio escolhido e liberar indexação após validação. O sitemap é preparado, mas não autoriza indexação da homologação.

## Referências consultadas

Dados da clínica e lista de tratamentos:

- https://maisonodonto.com.br/
- https://maisonodonto.com.br/implante-dentario/
- https://maisonodonto.com.br/invisalign/
- https://maisonodonto.com.br/clareamento-dentario/
- https://maisonodonto.com.br/protese-dentaria/
- https://maisonodonto.com.br/harmonizacao-facial/

Referências de organização visual e apresentação institucional, sem copiar textos ou atribuir seus diferenciais à Maison:

- https://reabilitodonto.com.br/
- https://qualityodontologia.com.br/

Princípios de busca: conteúdo útil, títulos descritivos, links rastreáveis e identificação da empresa local:

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=pt-BR
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/appearance/structured-data/local-business?hl=pt-BR
