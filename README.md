# Maison Odontologia — V4

Site estático com identidade visual oficial, fotografias locais, navegação por especialidade e contato direto pelo WhatsApp. Publicação na branch `main` de `tarsoLMC/Maison-Odonto-Reposit-rio-V3`, conectada ao site de testes da Hostinger.

## Páginas

- Início, Especialidades, A Maison, Convênios, Contato e Privacidade.
- Implantes dentários, Invisalign, lentes de contato dental, clareamento dental, próteses dentárias e harmonização orofacial.

## Estrutura

- `assets/css/maison.css`: identidade visual e responsividade.
- `assets/js/maison.js`: apresentação, fechamento do menu e filtros de especialidades.
- `assets/img/`: logomarca oficial e fotos publicadas no site original, otimizadas em WebP.
- `assets/fonts/`: fontes locais e licenças.
- `scripts/check-site.py`: verificação dos arquivos, links, âncoras e metadados.
- `docs/ESTRATEGIA-SEO.md`: palavras de busca, intenção e decisões editoriais.

Os arquivos HTML são completos: texto, navegação e contato não dependem de uma aplicação JavaScript. O menu do celular usa `details/summary` nativos. A introdução tem saída independente por CSS e nunca bloqueia a rolagem.

A pasta raiz é o conteúdo de publicação. Não há framework, instalação de pacotes ou comando de build necessário na Hostinger.

## Verificações

```sh
python3 scripts/check-site.py
node --check assets/js/maison.js
```

## Endereço de testes e produção

A V4 mantém `noindex,nofollow` e `robots.txt` bloqueando indexação no endereço temporário. Não há estimativas de volume de buscas nem promessa de posicionamento. A migração para o domínio definitivo, os dados profissionais e os horários dependem das conferências descritas em `docs/CHECKLIST-ANTES-DE-PUBLICAR.md`.

Nenhuma credencial deve ser incluída neste repositório.
