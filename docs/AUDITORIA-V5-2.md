# Auditoria Maison — 11/11/2026

## Resultado

Site funcional nos cenários verificados. Revisão V5.2 preserva as 13 páginas, os sete tratamentos, cinco planos, avaliações, galeria e contatos. Não equivale a certificação integral de acessibilidade, revisão clínica/legal ou teste em aparelhos físicos.

## Problemas encontrados e corrigidos

- Textos de apoio e conteúdo entre 8 e 14 px: ampliados seletivamente (corpo principal 16 px, legendas relevantes 11 px, contatos 13 px), preservando hierarquia e identidade.
- Nome acessível vazio no WhatsApp flutuante depois de recolher: agora o link recebe rótulo explícito.
- Carrosséis sem operação direta por teclado: região focável, setas, Home e End. Interação interrompe rotação automática.
- Controles pequenos: carrosséis e galeria com 44 × 44 px; áreas de contato móvel ampliadas.
- Menu móvel próximo ao botão fixo: mais espaço inferior para alcançar os últimos itens.
- Melhor contraste de textos secundários selecionados e fundo para legendas sobre fotos. Isso não constitui aprovação de todos os contrastes da página.

## Evidências

| Teste | Estado | Evidência e limite |
| --- | --- | --- |
| 13 rotas públicas HTTPS | PASSOU | HTTP 200 em todas antes da atualização |
| CSS, JavaScript, sitemap e robots | PASSOU | HTTP 200 |
| URL inexistente | PASSOU | HTTP 404; página padrão da hospedagem |
| Links e arquivos locais | PASSOU | 543 referências verificadas por scripts/check-site.py |
| Destinos WhatsApp | PASSOU | 119 links apontam para 5561991434312; não enviadas mensagens |
| Estrutura HTML | PASSOU | Um H1 por página, títulos únicos, metadados e JSON-LD válidos |
| Largura da página | PASSOU | 13 páginas × 8 larguras: 320, 360, 390, 430, 768, 1024, 1280, 1440; 104 cenários sem overflow, menu aberto incluído |
| Teclado no carrossel | PASSOU | End levou a scrollLeft 1748 (máximo); Home retornou a 0, em 390 px |
| Introdução e menu sem JS | PASSOU | Saída automática CSS, link nativo, rolagem e menu; teste em iframe sem permissão de scripts |
| Movimento reduzido | REVISÃO DE CÓDIGO | CSS desativa movimento; JS desativa autoplay. Emulação de preferência não executada nesta rodada |
| Safari/iPhone e Android físicos | NÃO TESTADO | Revisão em Chromium remoto e viewports; sem aparelhos disponíveis |
| Zoom 200%, leitor de tela e auditoria WCAG completa | NÃO TESTADO | Não declarar conformidade integral |
| Lighthouse, Core Web Vitals e rede lenta | NÃO TESTADO | Sem pontuação ou desempenho de campo declarado |
| Recebimento WhatsApp, e-mail e ligações | NÃO TESTADO | Destinos verificados; nenhum contato enviado |
| Formulários e pagamentos | NÃO SE APLICA | Não existem nessa versão |

## Próximas melhorias por prioridade

1. **Lançamento no domínio definitivo e busca:** a versão temporária mantém noindex,nofollow deliberadamente. Ao migrar, ajustar canonical, sitemap, indexação e acompanhamento de busca. Não modificar DNS ou liberar indexação da homologação por acidente.
2. **Confiança e personalidade:** acrescentar retratos reais da equipe, nomes e qualificações fornecidos pela clínica. Hoje há foto da clínica e imagens ilustrativas identificadas; o material real adicional diminuiria a aparência de banco de imagens.
3. **Medição:** definir acompanhamento de cliques e agendamentos com configuração de privacidade apropriada. Clique não comprova mensagem recebida ou consulta marcada.
4. **Desempenho real e acessibilidade:** executar Lighthouse/PageSpeed e testar Safari, Android, zoom e leitor de tela antes de campanhas. Não há nota inventada nesta auditoria.
5. **Conteúdo atualizado:** nota e quantidade de avaliações são estáticas, trazidas da referência autorizada; revisar periodicamente ou integrar uma fonte oficial. Dados da equipe e registros não foram inventados.
6. **Erro 404 personalizado:** o servidor já responde corretamente, mas a página padrão pode futuramente receber identidade e atalhos da Maison.

## Critérios e referências

Foram consultados os dois PDFs fornecidos pelo usuário: Prompt Mestre Criação e Auditoria de Sites e Guia Avançado Sites e Prompts IA. Critérios aproveitados: evidência por teste, conteúdo acessível sem animação, tipografia legível, áreas de toque e distinção entre teste local e produção.

Referência técnica de contraste: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum

Versão anterior recuperável no GitHub: a2c5be68030e64f99a658cf9ffed3b0c82a78d61. Alterações limitadas a apresentação e melhorias de interação; nenhum serviço externo, conta, DNS ou fluxo de envio foi criado.
