# Alexandre Iyukuri — Portfolio

React (Vite) single-page portfolio, ready for Firebase Hosting.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting      # choose your Firebase project; keep public dir "dist";
                           # single-page app: Yes; do NOT overwrite index.html
npm run deploy             # builds, then runs firebase deploy --only hosting
```

`firebase.json` is already configured (public dir `dist`, SPA rewrite, long cache for `/assets`).

## Edit content

All text lives in `src/data.js`. Layout is in `src/App.jsx`, styling in `src/styles.css`.

## Note

The education line says graduation completion is October 2026. Update the wording in `src/data.js` if your graduation status has changed.
