# Implantação GitHub → Hostinger (método recomendado)

Atualizado com base na documentação da Hostinger em novembro de 2026.

## 0. Proteja o site atual

1. No hPanel, faça backup dos arquivos e, se houver, do banco de dados.
2. Não altere a publicação atual antes de aprovar a prévia.
3. Se você já compartilhou uma senha em uma conversa, altere-a no próprio painel. Nunca cole credenciais em arquivos de código.

## 1. Crie o repositório remoto (ação do proprietário)

1. Entre em https://github.com/ com sua própria conta e autentique-se pelo método que preferir, inclusive Google se estiver disponível.
2. Em https://github.com/new crie um repositório chamado `maison-odonto-site`, preferencialmente **Private**.
3. Se estiver usando Git localmente, não inicialize o repositório remoto com arquivos de exemplo; publique a branch local inicial.
4. Envie os arquivos deste pacote. Caso você tenha o arquivo `.bundle`, a seção 1B explica como trabalhar com ele.

### 1A. Projeto sem Git local (por interface)

Crie o repositório e use **Add file → Upload files** para enviar o conteúdo desta pasta, preservando a hierarquia de `assets/` e `docs/`. Confirme o commit na branch `main`.

### 1B. Projeto com Git local

No diretório já versionado deste projeto (fora do ZIP se preferir), execute os comandos abaixo substituindo `<USUARIO>` pelo seu usuário real:

```bash
git remote add origin https://github.com/<USUARIO>/maison-odonto-site.git
git push -u origin main
```

O GitHub solicitará uma autorização apropriada. Não use sua senha de Hostinger para autenticar no GitHub.

## 2. Conecte ao site de testes na Hostinger

1. Abra o site no hPanel: https://hpanel.hostinger.com/websites/cornflowerblue-reindeer-259674.hostingersite.com
2. Vá a **Gerenciar site → Avançado → Git**.
3. Clique **Connect with GitHub** / **Conectar com GitHub**.
4. Autorize a Hostinger no GitHub, preferindo acesso apenas ao repositório da Maison.
5. Selecione `maison-odonto-site`, branch `main`.
6. **Pasta de implantação:** escolha um diretório vazio, como `public_html/maison-git-preview` (somente se realmente estiver vazio). **Não use `public_html` inicialmente.**
7. Revise os dados e clique em **Deploy/Implantar**.
8. Confira o histórico de implantação; em seguida, abra a URL correspondente à pasta de teste.
9. Habilite **Auto-deployment** depois de validar que a origem e o destino estão corretos.

Os menus podem variar ligeiramente por conta do tipo de plano e idioma da interface. A integração Git via OAuth é destinada a sites PHP/HTML personalizados. Sites feitos exclusivamente no Hostinger AI Builder podem não suportar esse fluxo.

## 3. Verifique antes de liberar

- Todas as seis páginas carregam.
- Links de menu e todos os CTAs funcionam.
- WhatsApp aponta para o atendimento confirmado da clínica.
- Não há dados de exemplo ou credenciais publicadas.
- Fotos carregam sem erro, idealmente hospedadas localmente com autorização.
- Menu e botão fixo funcionam no iPhone e Android.
- O protótipo segue com `noindex` até a aprovação da versão definitiva.

## 4. Atualizações futuras

Quando os arquivos da branch `main` forem alterados no GitHub, a Hostinger poderá atualizar automaticamente o site conectado. Para mudanças importantes, é recomendável adotar branch de revisão e validar antes de mesclar em `main`.

## 5. Produção

Não aponte automaticamente esse repositório para a raiz do site atual sem revisar os arquivos existentes e confirmar backup. Uma troca de diretório ou repositório pode sobrescrever conteúdos. A publicação definitiva deve ser uma decisão separada depois do teste.

## Documentação oficial

- https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/
- https://www.hostinger.com/changelog/github-oauth-setup-for-git-deployments
