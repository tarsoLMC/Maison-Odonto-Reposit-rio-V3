# Publicação da Maison — GitHub e Hostinger

## Configuração atual

- Repositório: `tarsoLMC/Maison-Odonto-Reposit-rio-V3`.
- Branch de publicação: `main`.
- Site de testes: https://cornflowerblue-reindeer-259674.hostingersite.com/
- Projeto estático: os HTML e a pasta `assets/` ficam na raiz publicada.
- Sem Node.js, PHP, banco de dados ou comando de build.

A integração já publicou a V3 e a correção da introdução. Novos commits devem ser conferidos no endereço real após a implantação. Enviar código ao GitHub e verificar que ele chegou ao servidor são verificações diferentes.

## Publicação

1. Execute as verificações do README.
2. Revise as alterações e envie o commit para `main`.
3. Aguarde a implantação automática configurada na Hostinger.
4. Compare o HTML e os arquivos versionados com os publicados. Verifique status HTTP, imagens, links e saída da introdução.
5. Se o commit não aparecer, confira o histórico de implantação em Avançado → Git no hPanel.

Os arquivos estáticos de CSS e JS recebem uma versão na URL para evitar reaproveitar uma cópia antiga do navegador. A saída de segurança da introdução fica no próprio HTML da página inicial.

## Reversão

O histórico mantém o commit funcional anterior. Para desfazer uma versão, reverta o commit correspondente e publique a reversão. Não force o histórico da branch compartilhada.

## Domínio definitivo

A troca do site original no domínio `maisonodonto.com.br` é uma etapa separada. Antes dela, confirme identificação profissional, horários, direitos das fotografias e conteúdo com a clínica; ajuste canonical, sitemap e Open Graph; só então libere indexação.
