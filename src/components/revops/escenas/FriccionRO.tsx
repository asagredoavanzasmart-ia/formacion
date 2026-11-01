import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Bloque, Flujo, Cruz, Visto, Rotulo, Persona, Txt, Hoja, Reloj, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «Dónde está la fricción», en cuatro tomas.
 * 1 · El recorrido con bordes filosos y demasiados traspasos; la lista se escribe, se ordena y se ataca de arriba abajo.
 * 2 · La vive el cliente: cuatro plataformas (descubre, compra, recibe, pide ayuda); el cliente avanza y en cada
 *     etapa estalla un pulso rosa con su fricción.
 * 3 · La viven tus equipos: marketing, ventas, servicio y operaciones, cada uno con su verdad, procesos duplicados y rotación.
 * 4 · La regla de prioridad: facilidad o impacto; lo interno termina siendo fricción para el cliente.
 */

const ID = 'ro14';
const nombres = ['bordes', 'traspasos', 'lista', 'ordena', 'ataca', 'frentes', 'plataforma', 'pulso', 'punto', 'rangan', 'cliente', 'formularios', 'info', 'hablar', 'precios', 'cobros', 'confianza', 'retrasos', 'fallas', 'esperas', 'equipos', 'fuente', 'denuevo', 'duplicados', 'distintas', 'rotacion', 'regla', 'facil', 'impacto', 'interno', 'termina', 'pregunta'] as const;
type N = typeof nombres[number];

export const FriccionRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, 'Dónde está la fricción'], [m('bordes'), 'Los bordes filosos'], [m('lista'), 'Lista, orden y ataque'],
    [m('frentes'), 'Dos frentes'], [m('cliente'), 'La vive el cliente'], [m('confianza'), 'Rompe la confianza'],
    [m('equipos'), 'La viven tus equipos'], [m('regla'), 'Regla de prioridad'], [m('interno'), 'Lo interno también cuenta'],
  ];

  /* Toma 2 · plataformas del cliente */
  const ETC: { txt: string; fr: { n: N; txt: string }[] }[] = [
    { txt: 'Descubre', fr: [{ n: 'formularios', txt: 'Formulario sin respuesta' }, { n: 'info', txt: 'Información escondida' }] },
    { txt: 'Compra', fr: [{ n: 'hablar', txt: 'Obligar a hablar' }, { n: 'precios', txt: 'Precios altos' }, { n: 'cobros', txt: 'Cobros sorpresa' }] },
    { txt: 'Recibe', fr: [{ n: 'retrasos', txt: 'Retrasos' }, { n: 'fallas', txt: 'Fallas' }] },
    { txt: 'Pide ayuda', fr: [{ n: 'esperas', txt: 'Esperas largas' }] },
  ];
  const ETE: { txt: string; k: 'mkt' | 'ven' | 'ser' | 'ops'; fr: { n: N; txt: string } }[] = [
    { txt: 'Marketing', k: 'mkt', fr: { n: 'fuente', txt: 'Otra verdad' } },
    { txt: 'Ventas', k: 'ven', fr: { n: 'denuevo', txt: 'Pregunta de nuevo' } },
    { txt: 'Servicio', k: 'ser', fr: { n: 'duplicados', txt: 'Procesos duplicados' } },
    { txt: 'Operaciones', k: 'ops', fr: { n: 'rotacion', txt: 'Alta rotación' } },
  ];
  const etapaDe = (lista: { fr: { n: N }[] }[]) => { let k = 0; lista.forEach((e, j) => { if (e.fr.some((f) => t >= m(f.n))) k = j; }); return k; };
  const kc = etapaDe(ETC);
  const ultimaFr = (fr: { n: N; txt: string }[]) => { let r: { n: N; txt: string } | null = null; fr.forEach((f) => { if (t >= m(f.n)) r = f; }); return r as { n: N; txt: string } | null; };

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Dónde está la fricción">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · bordes filosos y la lista priorizada */}
      <Toma t={t} a={-1} b={m('frentes')} zi={1}>
        <g opacity={1 - ac(t, m('lista') - 0.3, m('lista') + 0.3)}>
          <path d="M 100 520 C 300 420 420 620 600 520 S 900 420 1100 520" stroke={c.apagado} strokeWidth={26} fill="none" strokeLinecap="round" />
          {t >= m('bordes') && [[260, 480], [520, 545], [840, 470]].map(([x, y], k) => <g key={k} opacity={e1(t, m('bordes') + k * 0.3)}>
            <path d={`M ${x - 30} ${y} l 15 -44 l 15 30 l 15 -50 l 15 64 Z`} fill={ROJO_M} />
          </g>)}
          {t >= m('traspasos') && [0, 1, 2, 3, 4].map((k) => <Persona key={k} id={ID} x={180 + k * 200} y={660} s={0.35} cuerpo={[AMBAR, NARANJA, TEAL, VIOLETA, ROSA][k]} />)}
          {t >= m('traspasos') && (() => { const ph = (t * 0.3) % 1; const x = lerp(120, 1080, ph); return <circle cx={x} cy={520 + 40 * Math.sin(ph * 9)} r={16} fill={NARANJA} />; })()}
          {t >= m('traspasos') && <Letrero x={600} y={740} texto="Demasiados traspasos" fondo={PIZARRA} id={ID} op={e1(t, m('traspasos'))} />}
        </g>
        {t >= m('lista') && (() => {
          const orden = sm(t, m('ordena'), m('ordena') + 1.5);
          const items = [{ txt: 'Formulario sin respuesta', p: 2 }, { txt: 'Cobro sorpresa', p: 0 }, { txt: 'Datos duplicados', p: 3 }, { txt: 'Espera en el chat', p: 1 }];
          return (
            <g opacity={e1(t, m('lista'))}>
              <rect x={330} y={150} width={540} height={440} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 14)} />
              {items.map((it, k) => {
                const y = 210 + lerp(k, it.p, orden) * 96;
                const atacada = t >= m('ataca') && it.p === 0;
                return (
                  <g key={it.txt}>
                    <rect x={360} y={y - 34} width={480} height={74} rx={14} fill={it.p === 0 && orden > 0.5 ? NARANJA : c.panel2} opacity={it.p === 0 && orden > 0.5 ? 0.2 : 1} />
                    <Txt f="a" x={390} y={y + 12} fontSize={26} fill={c.texto} textDecoration={atacada ? 'line-through' : undefined}>{it.txt}</Txt>
                    {atacada && <Visto x={800} y={y + 2} r={22} op={sm(t, m('ataca'), m('ataca') + 0.5)} />}
                  </g>
                );
              })}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 2 · la vive el cliente */}
      <Toma t={t} a={m('frentes')} b={m('equipos')}>
        {ETC.map((e, k) => {
          const x = 210 + k * 260, y = 560;
          const fr = ultimaFr(e.fr);
          const activa = fr && t < m('equipos');
          return (
            <g key={e.txt} opacity={e1(t, m('plataforma') + k * 0.25)}>
              {activa && <circle cx={x} cy={y} r={70 + 20 * Math.sin(t * 6)} fill={ROSA} opacity={0.3} />}
              <Bloque x={x} y={y} w={190} h={56} color={k === kc && t >= m('cliente') ? NARANJA : '#94a3b8'} alto={30} />
              <Letrero x={x} y={y + 110} texto={e.txt} fondo={k === kc && t >= m('cliente') ? NARANJA : PIZARRA} id={ID} tam={24} />
              {fr && <Letrero x={x} y={y - 170 - (k % 2) * 70} texto={fr.txt} fondo={ROSA} id={ID} op={e1(t, m(fr.n))} tam={22} />}
            </g>
          );
        })}
        {t >= m('punto') && (() => { const [x0, x1] = [210 + Math.max(0, kc - 1) * 260, 210 + kc * 260]; const u = sm(t, m(ETC[kc].fr[0].n), m(ETC[kc].fr[0].n) + 1); const x = kc === 0 ? 210 : lerp(x0, x1, u); return <g><Persona id={ID} x={x} y={530 - 6 * Math.abs(Math.sin(t * 6))} s={0.4} cuerpo={AZUL_M} /></g>; })()}
        {t >= m('rangan') && t < m('cliente') && <Letrero x={600} y={190} texto="Bordes filosos y traspasos" fondo={PIZARRA} id={ID} op={e1(t, m('rangan'))} />}
        {t >= m('confianza') && (
          <g opacity={e1(t, m('confianza')) * (1 - ac(t, m('retrasos') - 0.3, m('retrasos')))} transform="translate(470 780)">
            <path d="M -40 0 h 80" stroke={ROJO_M} strokeWidth={10} strokeLinecap="round" />
            <path d="M -6 -16 l 12 32" stroke={c.panel} strokeWidth={8} />
            <Txt f="a" x={60} y={10} fontSize={24} fill={ROJO_M} peso={700}>se rompe la confianza</Txt>
          </g>
        )}
      </Toma>

      {/* TOMA 3 · la viven tus equipos */}
      <Toma t={t} a={m('equipos')} b={m('regla')}>
        <Suelo y={640} isDark={isDark} />
        {ETE.map((e, k) => {
          const x = 210 + k * 260;
          const on = t >= m(e.fr.n);
          return (
            <g key={e.txt} opacity={e1(t, m('equipos') + k * 0.25)}>
              <Equipo id={ID} k={e.k} x={x} y={640} s={0.62} t={t} nombre={e.txt} tam={24} />
              {on && <circle cx={x} cy={470} r={80 + 14 * Math.sin(t * 6)} fill={ROSA} opacity={0.18} />}
              {on && <Letrero x={x} y={300 - (k % 2) * 70} texto={e.fr.txt} fondo={ROSA} id={ID} op={e1(t, m(e.fr.n))} tam={22} />}
              {k === 0 && on && <g opacity={e1(t, m('fuente'))}>{[0, 1, 2, 3].map((j) => <ellipse key={j} cx={210 + j * 260} cy={400} rx={30} ry={10} fill={[AMBAR, NARANJA, TEAL, VIOLETA][j]} />)}</g>}
            </g>
          );
        })}
        {t >= m('distintas') && <Letrero x={600} y={780} texto="Experiencias distintas según con quién" fondo={PIZARRA} id={ID} op={e1(t, m('distintas'))} tam={24} />}
      </Toma>

      {/* TOMA 4 · regla de prioridad */}
      <Toma t={t} a={m('regla')} b={fin + 1}>
        {/* dos ejes: facilidad e impacto */}
        <g opacity={e1(t, m('regla'))}>
          <rect x={200} y={180} width={6} height={480} rx={3} fill={c.apagado} />
          <rect x={200} y={654} width={560} height={6} rx={3} fill={c.apagado} />
          {t >= m('facil') && <Txt f="a" x={480} y={710} textAnchor="middle" fontSize={24} fill={c.tenue} opacity={e1(t, m('facil'))}>más fácil de arreglar →</Txt>}
          {t >= m('impacto') && <Txt f="a" x={170} y={420} textAnchor="middle" fontSize={24} fill={c.tenue} transform="rotate(-90 170 420)" opacity={e1(t, m('impacto'))}>más impacto →</Txt>}
          {[[300, 560, '#94a3b8'], [420, 470, '#94a3b8'], [660, 260, NARANJA], [560, 360, AMBAR], [350, 300, '#94a3b8']].map(([x, y, col], k) => <circle key={k} cx={x as number} cy={y as number} r={k === 2 ? 34 + 4 * Math.sin(t * 5) : 22} fill={col as string} opacity={sm(t, m('facil') + k * 0.2, m('facil') + 0.5 + k * 0.2)} />)}
          {t >= m('impacto') && <Letrero x={660} y={200} texto="Empieza aquí" id={ID} op={e1(t, m('impacto') + 0.6)} tam={24} />}
        </g>
        {t >= m('interno') && (
          <g opacity={e1(t, m('interno'))}>
            <Equipo id={ID} k="ser" x={900} y={420} s={0.5} t={t} nombre={false} />
            <Persona id={ID} x={1020} y={700} s={0.55} cuerpo={AZUL_M} />
            {t >= m('termina') && <Flujo x1={920} y1={360} x2={1020} y2={560} t={t} n={4} vel={0.6} arco={-40} color={ROSA} r={8} />}
            <Letrero x={960} y={780} texto="Lo interno llega al cliente" fondo={ROSA} id={ID} tam={24} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
