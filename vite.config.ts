import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

const ARCHIVO_GUIONES = path.resolve(__dirname, 'guiones/guiones-editados.json');
const ENDPOINT_GUIONES = '/formacion/__guiones';

/* Solo en desarrollo: guarda los guiones editados en un JSON dentro del proyecto. */
function guardarGuiones(): Plugin {
  return {
    name: 'guardar-guiones',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(ENDPOINT_GUIONES, (req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        const leer = (): Record<string, string> => {
          try {
            return JSON.parse(fs.readFileSync(ARCHIVO_GUIONES, 'utf8'));
          } catch {
            return {};
          }
        };
        if (req.method === 'GET') {
          res.end(JSON.stringify(leer()));
          return;
        }
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'método no permitido' }));
          return;
        }
        let cuerpo = '';
        req.on('data', (trozo) => {
          cuerpo += trozo;
          if (cuerpo.length > 2_000_000) req.destroy();
        });
        req.on('end', () => {
          try {
            const { slideId, html } = JSON.parse(cuerpo);
            if (typeof slideId !== 'string' || typeof html !== 'string') throw new Error('datos inválidos');
            const guiones = { ...leer(), [slideId]: html };
            fs.mkdirSync(path.dirname(ARCHIVO_GUIONES), { recursive: true });
            fs.writeFileSync(ARCHIVO_GUIONES, JSON.stringify(guiones, null, 2), 'utf8');
            res.end(JSON.stringify({ ok: true, slideId }));
          } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: String(error) }));
          }
        });
      });
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/formacion/',
    plugins: [react(), tailwindcss(), guardarGuiones()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: {
        // Excluir la carpeta de guiones para que guardar un guion editado
        // no dispare un reload de HMR.
        ignored: ['**/guiones/**'],
      },
    },
  };
});
