# Artes Romana

Apresentação escolar interativa de **Artes · 9º ano** sobre a arte romana e a vida cotidiana.

Apresentadores: Leticia, Enzo, beatriz, mayra e Gabriel.

## Publicar no GitHub Pages

1. No repositório, abra **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**.
3. Selecione a branch **main**, a pasta **/docs** e clique em **Save**.
4. Aguarde a publicação e abra o endereço mostrado pelo GitHub.

O site funciona como arquivos estáticos, sem depender da assinatura do ChatGPT, de um servidor próprio ou de uma instalação de npm. A pasta `docs/` contém o site completo, incluindo modelos 3D, imagens, fontes, bibliotecas e decodificadores locais.

## Editar a apresentação

- `docs/index.html`: abertura, estrutura e textos das seis partes.
- `docs/content.js`: nomes, falas, páginas e lista de modelos.
- `docs/app.js`: navegação e controles da apresentação.
- `docs/model.js`: visualização dos modelos GLB.
- `docs/styles.css`, `docs/pages.css`, `docs/presentation.css`: aparência e layout.
- `docs/motion.css`: animações das transições.
- `docs/models/` e `docs/assets/`: arquivos necessários para o site funcionar.

Ao alterar a estrutura em `docs/index.html`, execute `python scripts/build-pages.py` para atualizar também as cinco páginas internas. Para visualizar os modelos e os módulos JavaScript localmente, sirva a pasta `docs/` por HTTP; por exemplo, execute `python -m http.server 8000 --directory docs` e abra `http://localhost:8000/`.

Os caminhos são relativos, permitindo a publicação em uma página de projeto do GitHub Pages. Cada parte também pode ser aberta diretamente pelo seu endereço.

## Créditos e uso

As fontes e licenças das imagens e do modelo histórico digitalizado estão no botão **Créditos** da apresentação e em `asset-manifest.json`. Os oito modelos ilustrativos GLB foram fornecidos para este trabalho. As bibliotecas e seus avisos de licença foram preservados em `docs/assets/`.

Não há uma licença geral que substitua as condições de uso dos arquivos de terceiros. Preserve os créditos e as licenças ao reutilizar esses materiais.
