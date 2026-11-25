# Haiany Oliveira — Arquitetura

Site one-page estático (HTML + CSS + JS, sem build), mobile-first.

## Estrutura
- `public/` → o site publicado (index.html, css/, js/, img/ em WebP, favicon, og-image)
- `fotos/` → fotos originais (fonte)
- `referencias/` → prints de referência (SILVA e Axis Haus) — não são publicados
- `INFORMACOES.md` → briefing com conteúdo e dados reais

## Rodar localmente
```bash
cd public && python3 -m http.server 8000
```

## Deploy na Vercel
Importe o repositório na Vercel (Framework: **Other**, sem build). O `vercel.json` já aponta `outputDirectory` para `public/`.

## Notas
- Efeito do hero: `img/12-hero-recorte.webp` é a mesma foto com o céu transparente, sobreposta à palavra "HAIANY" para a casa "atravessar" as letras.
- Projetos do carrossel: edite a lista `PROJECTS` em `public/js/main.js`.
- Quiz: monta a mensagem e abre `wa.me/5564981232418`.
