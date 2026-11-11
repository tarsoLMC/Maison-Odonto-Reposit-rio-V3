# Maison Odontologia — V8

Site estático (V8) com experiência mobile aprimorada, navegação por quatro necessidades de cuidado, sete páginas individuais de tratamento, contato direto para WhatsApp e fotografia da clínica, verde profundo, textura de papel e grão, tipografia Inter local, sete especialidades, cinco planos com logotipos, avaliações públicas resumidas e galeria ampliável. Contato direto pelo WhatsApp, sem formulários.

## Conteúdo e publicação

A referência de conteúdo é `https://maison-odontologia-brasilia.vercel.app/`, indicada pelo responsável pelo projeto. Dados estruturados em `content/maison.json`; HTML gerado por `scripts/build_site.py`. Fotografias ilustrativas são identificadas como tal. Os links de avaliações abrem os relatos no Google.

A raiz do repositório é o conteúdo publicado pela integração existente entre a branch `main` e a Hostinger. Não há instalação de pacotes ou build obrigatório no servidor. `dist/` e `.openai/` servem apenas à prévia local e não são versionados.

## Edição e verificação

```sh
python3 scripts/build_site.py
python3 scripts/check-site.py
python3 scripts/check-v8.py
node --check assets/js/maison.js
```

As 13 páginas incluem início, especialidades, a clínica, planos, contato, privacidade e uma página para cada um dos sete tratamentos. O JavaScript aprimora carrosséis, galeria e movimentos. Conteúdo, navegação, menu móvel e WhatsApp continuam disponíveis sem ele. A introdução tem saída independente por CSS em 2,3 segundos e não bloqueia rolagem.

## Endereço temporário

O site de testes mantém `noindex,nofollow`. Não foi alterado o domínio definitivo nem o DNS. A identificação profissional para um lançamento no domínio definitivo deve ser tratada no checklist editorial existente. Nenhuma credencial deve ser incluída neste repositório.


## O que mudou na V8

- Orientação por quatro necessidades na página de especialidades, sem simular diagnóstico.
- Títulos claros, CTAs contextualizados e tratamentos relacionados nas sete páginas individuais.
- Melhorias de tipografia, contraste, áreas de toque e espaço seguro do WhatsApp no celular.
- Estilos complementares em `assets/css/maison-v8.css`, preservando a base funcional.
- Registro da matriz Q01–Q10, testes realizados e pendências em `docs/V8-IMPLEMENTACAO-E-AUDITORIA.md`.

**Atenção:** a versão do domínio temporário conserva `noindex,nofollow` e não autoriza publicar informações profissionais não verificadas. Um teste estático com PASS não substitui Safari de iPhone, verificação no domínio hospedado e medição de desempenho real.
