# Studio Illustrations

Application web pour composer des illustrations pédagogiques (React + TypeScript + Vite + Fabric.js).

## Démarrage

```bash
npm install
npm run dev
```

Build production :

```bash
npm run build
npm run preview
```

## Fonctionnalités

- Plan de travail multi-formats (A4, A5, carré…)
- Bibliothèque d’illustrations, scènes, photos et imports
- Texte, bulles, calques, opacité
- Undo / redo, duplication, raccourcis clavier
- Export PNG / PDF
- Sauvegarde locale des projets (`localStorage`)

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Compilation TypeScript + build Vite |
| `npm run lint` | Oxlint |
| `npm run preview` | Aperçu du build |

## Stack

React 19, TypeScript, Vite, Fabric.js, jsPDF, Lucide.
