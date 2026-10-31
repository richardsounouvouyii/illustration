# Studio Illustrations

Application web pour composer des illustrations pédagogiques (React + TypeScript + Vite + Fabric.js).

100 % côté navigateur : pas de backend, projets sauvegardés dans le `localStorage`.

## Démarrage local

```bash
npm install
npm run dev
```

Build production :

```bash
npm run build
npm run preview
```

## Déploiement (recommandé)

### Option A — Vercel (la plus simple)

1. Va sur [vercel.com](https://vercel.com) et connecte ton compte GitHub
2. **Add New Project** → sélectionne `richardsounouvouyii/illustration`
3. Laisse les réglages détectés (Vite) → **Deploy**

URL typique : `https://illustration-….vercel.app`

Le fichier `vercel.json` est déjà prêt.

### Option B — Netlify

1. [app.netlify.com](https://app.netlify.com) → Import from Git → ce repo
2. Build : `npm run build` · Publish : `dist`  
   (`netlify.toml` est déjà configuré)

### Option C — GitHub Pages

1. Repo GitHub → **Settings** → **Pages** → Source : **GitHub Actions**
2. À chaque push sur `main`, le workflow `.github/workflows/deploy-pages.yml` publie le site
3. Site attendu : `https://richardsounouvouyii.github.io/illustration/`

> Pour Pages, le build utilise `VITE_BASE=/illustration/`.  
> Pour Vercel/Netlify, laisse la base à `/` (défaut).

## Fonctionnalités

- Plan de travail multi-formats (A4, A5, carré…)
- Bibliothèque d’illustrations, scènes, photos et imports
- Texte, bulles, calques, opacité
- Undo / redo, duplication, raccourcis clavier
- Export PNG / PDF
- Sauvegarde locale des projets

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Compilation TypeScript + build Vite |
| `npm run lint` | Oxlint |
| `npm run preview` | Aperçu du build |

## Stack

React 19, TypeScript, Vite, Fabric.js, jsPDF, Lucide.

## Limites à connaître avant la prod

- Les projets restent **sur l’appareil de l’utilisateur** (pas de compte cloud)
- Les photos Unsplash dépendent du réseau / CORS
- Gros imports peuvent saturer le `localStorage` du navigateur
