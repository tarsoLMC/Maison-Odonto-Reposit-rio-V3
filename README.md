# Maison Odonto — Site institucional V3

Site estático HTML/CSS/JavaScript para testes da Maison Odontologia Especializada. Criado como repositório de código pronto para integração GitHub ↔ Hostinger.

> **Status:** preparado localmente. Este pacote não cria, por si só, um repositório remoto no GitHub nem altera a Hostinger. A conexão exige autenticação e autorização do proprietário.

## Conteúdo

- `index.html` — página inicial com introdução cinematográfica e chamadas para WhatsApp.
- `especialidades.html` — tratamentos apresentados pela clínica.
- `a-maison.html` — história, espaço e proposta de atendimento.
- `convenios.html` — consulta de convênios sem promessas de cobertura.
- `contato.html` — localização, horários e WhatsApp.
- `privacidade.html` — texto inicial de privacidade, a revisar antes de publicar.
- `assets/` — CSS, JS e imagens locais do protótipo.
- `docs/` — implantação, validação e pendências editoriais.

### Teste local

Abra `index.html` diretamente ou execute no diretório do projeto:

```bash
python -m http.server 8000
```

Em seguida, acesse `http://localhost:8000/`.

## Como publicar com GitHub + Hostinger

Veja [docs/PUBLICACAO-HOSTINGER.md](docs/PUBLICACAO-HOSTINGER.md).

A Hostinger oferece integração por OAuth em **Sites → Gerenciar site → Avançado → Git**, permitindo escolher repositório, branch (`main`) e pasta de destino. Depois da primeira publicação, novos commits enviados para a branch de produção podem atualizar o site automaticamente.

**Comece por uma pasta vazia de homologação**, nunca pelo diretório de produção contendo arquivos que você ainda não salvou.

## Proteção do protótipo

O projeto contém `robots=noindex,nofollow` nas páginas. **Não remova isso enquanto estiver em teste**. Para colocar em produção depois de aprovado, será preciso remover a diretiva, configurar canônicas e tags sociais com URLs reais e auditar questões regulatórias.

## Pendências obrigatórias

- Confirmar dados profissionais e registros CRO-DF exigidos.
- Confirmar horários divergentes entre a arte recebida e outras fontes.
- Confirmar convênios e informações de atendimento.
- Validar o uso das imagens existentes, algumas carregadas do domínio antigo.
- Revisar informações legais e de privacidade com o responsável.
- Testar no Safari do iPhone e em Android real.

Nenhuma senha, token ou credencial de painel é necessária ou deve ser colocada neste repositório.
