# kingegoat · personal site

Personal portfolio site for [@kingegoat](https://github.com/kingegoat). Single-page, vanilla HTML/CSS/JS, multilingual (RU/EN), dark/light themes. **Zero build step.**

Lives at `https://kingegoat.github.io` via GitHub Pages.

## What's inside

```
.
├── index.html          # one file, semantic, accessible
├── css/style.css       # design system, mobile-first, dark/light
├── js/app.js           # vanilla ES2024, no dependencies
├── i18n/
│   ├── ru.json         # Russian
│   └── en.json         # English
└── assets/
    ├── favicon.svg
    └── og-cover.svg
```

## Local preview

```bash
# any static server
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

The repo is named `kingegoat/kingegoat.github.io` — GitHub automatically serves the `main` branch as the site root.

After pushing:

1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `/ (root)` → **Save**

Site is live at `https://kingegoat.github.io` within a minute.

## Customise

- **Colors** — edit `:root` block in `css/style.css`
- **Copy** — edit `i18n/ru.json` and `i18n/en.json`
- **Sections** — add/remove `<section>` blocks in `index.html`

## License

MIT — fork, learn, reuse.
