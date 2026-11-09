# Registro de publicación

## Dónde vive

- Código: https://github.com/asagredoavanzasmart-ia/panel-de-trabajo (rama `main`).
- Sitio: https://asagredoavanzasmart-ia.github.io/panel-de-trabajo/ (rama `gh-pages`).
- Ruta base de la app: `/panel-de-trabajo/`, definida una sola vez en `vite.config.ts` (`BASE`). Si el repositorio cambia de nombre, se cambia ahí y en `homepage` de `package.json`.

## GitHub Pages

Settings → Pages → Build and deployment → Source: **Deploy from a branch** → Branch: **`gh-pages`**, carpeta **`/ (root)`**.

No elegir `main`: en `main` está el código fuente sin compilar y la página se vería en blanco.

## Cómo publicar

```
npm run deploy
```

Compila (`vite build`) y sube solo la carpeta `dist` a la rama `gh-pages`. El código fuente se sube aparte con `git push origin main`.

## Seguridad

Revisión hecha el 2026-11-08 antes de la primera subida:

- Se buscaron claves y tokens (AWS, OpenAI, Anthropic, Google, GitHub, Slack, Hugging Face, llaves privadas y asignaciones `api_key` / `secret` / `password` / `token`) en todo el historial de `master` y en los archivos sin seguimiento. Solo apareció el marcador de ejemplo de `.env.example`, que no es una clave real.
- Se quitó de `vite.config.ts` la inyección de `GEMINI_API_KEY` en el código compilado: la app no la usa y, si algún día existiera un `.env`, la clave habría quedado pública en el sitio.
- Solo se sube la rama `master`. La rama local `gh-pages` antigua contiene modelos de Whisper de 141 y 162 MB (GitHub rechaza archivos de más de 100 MB) y no debe subirse.
- `.gitignore` excluye secretos (`.env*`, llaves y certificados, credenciales), el material de audio de trabajo (`salida/`, `.wav`, `.zip`), los modelos (`.tools/`) y los scripts sueltos de cada entrega de audio.

Reglas para seguir así:

1. Ninguna clave va en el código ni en `vite.config.ts`. Todo lo que se compila queda visible para cualquiera en el sitio.
2. Antes de `git add`, revisar `git status` y no usar `git add -A` a ciegas.
3. Ningún archivo de más de 50 MB en el repositorio; los audios de trabajo quedan en `salida/`.
