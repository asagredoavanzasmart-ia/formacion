import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, PersonaCara, Sello, Moneda3D, Billete, Pastilla, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL, resorte } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * La lista es el activo. Un solo objeto protagonista, el fichero «Tu lista», recorre la escena.
 * Toma 0: el fichero lleno, con brillo: el activo central.
 * Toma 1: el error del estudiante. En su escritorio mete un disco con un millón de correos; los sobres viajan por el
 * cable al proveedor de internet y de su antena a la gente, que se enoja y devuelve quejas al proveedor (contador
 * hasta 30+). Unas tijeras cortan el cable, la pantalla se apaga y una boleta marca $70.
 * Toma 2: con permiso. El disco comprado queda tachado; cuatro personas marcan «Sí» y sus fichas entran al fichero
 * vacío. Cada nombre ≈ $1 al mes: el fichero suelta monedas que forman una pila mes a mes.
 * Toma 3: dos ventanas de 30 días en una línea de tiempo. Primero cuatro embudos tragan anuncios ($128 mil) y devuelven
 * ventas ($142 mil): utilidad ≈ $14 mil y 14.205 contactos que caen al fichero. Después el fichero devuelve $234 mil:
 * la barra crece 16,49 veces sobre la utilidad inicial. Cierra con el sello «Sin auditar».
 */

const ID = 'br20', P = 'br-lista';
const cl = (v: number) => Math.max(0, Math.min(1, v));
const arco = (p: number, x0: number, y0: number, x1: number, y1: number, h: number): [number, number] => [lerp(x0, x1, p), lerp(y0, y1, p) - h * Math.sin(Math.PI * p)];
const TABS = [NARANJA, VERDE, AZUL_M, ROSA, AMBAR, TEAL];

/* Fichero «Tu lista»: caja de tarjetas en vista frontal con fondo en perspectiva. (x, y) = centro de la base.
   `n` = tarjetas visibles (0 a 9, admite fracciones para que caigan suaves). `brillo` 0..1 = halo de activo. */
const Fichero: React.FC<{ x: number; y: number; n: number; brillo?: number; t: number; placa?: React.ReactNode; op?: number }> = ({ x, y, n, brillo = 0, t, placa, op = 1 }) => {
  if (op < 0.01) return null;
  return (
    <g opacity={op} transform={`translate(${x} ${y})`}>
      {brillo > 0.01 && <g opacity={brillo}>
        <circle cx={0} cy={-90} r={150 + 8 * Math.sin(t * 3)} fill={AMBAR} opacity={0.14} />
        {Array.from({ length: 8 }, (_, k) => { const a = (k / 8) * Math.PI * 2 + t * 0.4; return <path key={k} d={`M ${Math.cos(a) * 128} ${-90 + Math.sin(a) * 128} L ${Math.cos(a) * 160} ${-90 + Math.sin(a) * 160}`} stroke={AMBAR} strokeWidth={6} strokeLinecap="round" opacity={0.55} />; })}
      </g>}
      <ellipse cx={0} cy={6} rx={130} ry={12} fill="#000" opacity={0.16} />
      {/* Fondo de la caja (perspectiva) */}
      <path d="M -100 -122 L -88 -150 H 88 L 100 -122 Z" fill="#5b21b6" />
      {/* Tarjetas: caen desde arriba al entrar */}
      {Array.from({ length: 9 }, (_, k) => {
        const v = cl(n - k);
        if (v <= 0) return null;
        const top = -176 + k * 7 - (1 - v) * 70, lx = -88 + (k % 2) * 6;
        return (
          <g key={k} opacity={Math.min(1, v * 2)}>
            <rect x={lx + 8 + (k % 3) * 52} y={top - 13} width={42} height={18} rx={5} fill={TABS[k % TABS.length]} />
            <rect x={lx} y={top} width={170} height={80} rx={8} fill="#ffffff" style={sombra(0.12, 1, 3)} />
            <circle cx={lx + 22} cy={top + 22} r={10} fill={TABS[k % TABS.length]} opacity={0.75} />
            <rect x={lx + 40} y={top + 15} width={80} height={6} rx={3} fill="#cbd5e1" />
            <rect x={lx + 40} y={top + 26} width={56} height={6} rx={3} fill="#e2e8f0" />
          </g>
        );
      })}
      {/* Frente */}
      <rect x={-110} y={-124} width={220} height={124} rx={16} fill={VIOLETA} />
      <rect x={-110} y={-124} width={220} height={18} rx={9} fill="#fff" opacity={0.18} />
      <rect x={-110} y={-30} width={220} height={30} rx={14} fill="#000" opacity={0.12} />
      <rect x={-86} y={-92} width={172} height={52} rx={12} fill="#ffffff" opacity={0.95} />
      {placa}
    </g>
  );
};

/* Embudo: boca ancha arriba, tubo abajo. (x, y) = centro de la boca. */
const Embudo: React.FC<{ x: number; y: number; color: string; op?: number }> = ({ x, y, color, op = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={op}>
    <ellipse cx={0} cy={0} rx={42} ry={10} fill="#000" opacity={0.25} />
    <path d="M -42 0 L -9 64 V 92 Q 0 98 9 92 V 64 L 42 0 Z" fill={color} />
    <path d="M 0 0 L 42 0 L 9 64 V 92 Q 4 96 0 96 Z" fill="#000" opacity={0.13} />
    <ellipse cx={0} cy={0} rx={42} ry={10} fill="none" stroke={color} strokeWidth={5} />
  </g>
);

export const ListaBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('activo'), 'El activo central'], [m('estudiante'), 'Un error de estudiante'], [m('permiso'), 'Con permiso'],
    [m('dolar'), 'Un dólar al mes'], [m('cuatro'), 'Dos ventanas de 30 días'], [m('seguimiento'), 'La ganancia está en el seguimiento'],
  ];

  // ── Toma 1: estados ──
  const tD = m('disco'), tC = m('corto'), t70 = m('setenta');
  const mete = sm(t, tD, tD + 1.0);
  const encendido = t >= tD + 1.0 && t < tC;
  const envia = t >= tD + 1.0 ? 1 - sm(t, tC, tC + 0.4) : 0;
  const enojo = sm(t, tD + 2.4, tD + 3.4);
  const quejas = sm(t, tD + 2.8, tC - 0.2);
  const tijera = resorte(t, tC - 0.5, { rigidez: 120, amortiguacion: 14 });
  const corte = resorte(t, tC, { rigidez: 260, amortiguacion: 16 });
  const boleta = sm(t, t70, t70 + 1.1);
  const animo = t < tD ? 0.2 : t < tC ? 0.8 : t < t70 ? -0.5 : -1;

  // ── Toma 2 ──
  const tP = m('permiso'), t1 = m('dolar');
  const llega = (k: number) => tP + 0.9 + k * 0.75;
  const fichasP = [0, 1, 2, 3].reduce((s, k) => s + sm(t, llega(k) + 0.8, llega(k) + 1.0), 0);

  // ── Toma 3 ──
  const t4 = m('cuatro'), tG = m('gastaron'), tK = m('contactos'), tS = m('siguientes'), t16 = m('dieciseis'), tF = m('seguimiento');
  const mes1 = sm(t, t4, tK + 1.5), mes2 = sm(t, tS, t16);
  const barA = resorte(t, tG, { rigidez: 70, amortiguacion: 15 }), barV = resorte(t, tG + 2.3, { rigidez: 70, amortiguacion: 15 });
  const util = sm(t, tG + 4.2, tG + 4.9);
  const contactos = sm(t, tK, tK + 2.2);
  const crece = resorte(t, tS + 0.3, { rigidez: 30, amortiguacion: 11 });
  // Fichas del fichero: 4 con permiso, luego hasta 9 con los contactos nuevos.
  const fichas = Math.min(9, fichasP + 5 * contactos);
  const fichY = 760;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La lista es el activo">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 0 · El activo central */}
      <Toma t={t} a={0} b={m('estudiante')} cy={560}>
        <rect x={300} y={fichY} width={600} height={10} rx={5} fill={c.apagado} />
        <Fichero x={600} y={fichY} n={9 * sm(t, m('activo') - 1.2, m('activo') + 0.6)} brillo={E('activo', 0.7)} t={t}
          placa={<Txt x={0} y={-57} textAnchor="middle" fontSize={26} fill={VIOLETA} peso={800}>{movil ? 'Lista' : 'Tu lista'}</Txt>} />
        {[0, 1, 2].map((k) => <Moneda3D key={k} x={600 + (k - 1) * 150} y={420 - 16 * Math.sin(t * 2 + k)} r={24} giro={Math.cos(t * 2.4 + k)} op={E('activo', 0.6, 0.3 + k * 0.15)} />)}
      </Toma>

      {/* 1 · El error del estudiante */}
      <Toma t={t} a={m('estudiante')} b={tP} cy={560}>
        <g opacity={E('estudiante', 0.6, -0.3)}>
          <rect x={60} y={740} width={1080} height={10} rx={5} fill={c.apagado} />
          {/* Silla, estudiante y escritorio con panel frontal */}
          <rect x={172} y={520} width={96} height={130} rx={18} fill="#334155" />
          <PersonaCara id={ID} x={220} y={706} s={0.95} cuerpo={AZUL_M} e={animo} />
          <rect x={104} y={604} width={372} height={22} rx={8} fill="#b45309" />
          <rect x={104} y={604} width={372} height={7} rx={3.5} fill="#fff" opacity={0.18} />
          <rect x={124} y={626} width={332} height={82} fill="#92400e" />
          <rect x={124} y={626} width={22} height={114} fill="#78350f" /><rect x={434} y={626} width={22} height={114} fill="#78350f" />
          {/* Monitor */}
          <rect x={364} y={566} width={22} height={40} fill="#475569" /><rect x={336} y={598} width={78} height={9} rx={4} fill="#475569" />
          <rect x={296} y={456} width={158} height={114} rx={12} fill="#1f2937" />
          <rect x={306} y={466} width={138} height={92} rx={6} fill={encendido ? '#1d4ed8' : '#0f172a'} />
          {encendido && <g>
            <rect x={322} y={480} width={58} height={38} rx={5} fill="#fff" />
            <path d="M 322 482 L 351 502 L 380 482" stroke="#1d4ed8" strokeWidth={3} fill="none" />
            <rect x={322} y={532} width={106} height={12} rx={6} fill="#fff" opacity={0.25} />
            <rect x={322} y={532} width={106 * ((t - tD - 1) * 0.12 % 1)} height={12} rx={6} fill="#a3e635" />
            <Txt x={412} y={510} textAnchor="middle" fontSize={22} fill="#fff" peso={800}>{movil ? '' : '1M'}</Txt>
          </g>}
          {t >= tC && <g opacity={sm(t, tC + 0.2, tC + 0.5)}>
            <path d="M 352 488 L 398 534 M 398 488 L 352 534" stroke={ROJO_M} strokeWidth={9} strokeLinecap="round" />
          </g>}
          {/* Torre del computador con ranura de disco */}
          <rect x={486} y={604} width={70} height={136} rx={10} fill="#334155" />
          <rect x={486} y={604} width={70} height={14} rx={7} fill="#fff" opacity={0.12} />
          <rect x={498} y={636} width={46} height={6} rx={3} fill="#0f172a" />
          <circle cx={521} cy={712} r={6} fill={encendido ? '#a3e635' : '#64748b'} />
          {/* Disco: entra girando a la ranura */}
          {t >= tD - 0.05 && mete < 1 && (() => {
            const [dx, dy] = arco(mete, 640, 420, 521, 639, 60);
            return (
              <g transform={`translate(${dx} ${dy}) scale(${lerp(1, 0.55, mete)} ${lerp(1, 0.12, sm(mete, 0.75, 1))}) rotate(${t * 220})`} opacity={E('disco', 0.4)}>
                <circle r={46} fill="#e2e8f0" />
                <circle r={46} fill={`url(#${ID}-marca)`} opacity={0.35} />
                <path d="M -40 -20 A 44 44 0 0 1 -6 -45 L -4 -30 A 30 30 0 0 0 -27 -14 Z" fill="#fff" opacity={0.55} />
                <circle r={12} fill={c.panel} /><circle r={12} fill="none" stroke="#94a3b8" strokeWidth={3} />
              </g>
            );
          })()}
          {/* Cable al proveedor: se corta con las tijeras */}
          <path d={`M 556 724 H ${598 - 10 * corte}`} stroke={c.texto} strokeWidth={8} strokeLinecap="round" />
          <path d={`M ${606 + 10 * corte} 724 H 652`} stroke={c.texto} strokeWidth={8} strokeLinecap="round" />
          {corte > 0.2 && corte < 1.6 && t < tC + 0.9 && <g transform={`translate(602 724) scale(${1.2 - 0.6 * sm(t, tC, tC + 0.9)})`} opacity={1 - sm(t, tC + 0.5, tC + 0.9)}>
            {[0, 45, 90, 135].map((a) => <path key={a} d="M 0 -26 V 26" stroke={AMBAR} strokeWidth={5} strokeLinecap="round" transform={`rotate(${a})`} />)}
          </g>}
          {/* Tijeras: bajan sobre el cable y se cierran */}
          {tijera > 0.01 && (() => {
            const abre = 26 * (1 - corte);
            return (
              <g transform={`translate(602 ${lerp(520, 664, tijera)}) rotate(90) scale(1.25)`} opacity={1 - sm(t, tC + 1.6, tC + 2.2)}>
                {[1, -1].map((sg) => (
                  <g key={sg} transform={`rotate(${sg * abre})`}>
                    {/* Hoja: ancha en el eje y afilada en la punta, con filo más claro */}
                    <path d={`M -2 ${sg * 7} L 52 ${sg * 1.5} Q 60 0 52 ${-sg * 0.5} L -2 ${-sg * 1}`} fill="#94a3b8" />
                    <path d={`M 4 ${sg * 1.5} L 54 ${sg * 0.4}`} stroke="#e2e8f0" strokeWidth={2.5} strokeLinecap="round" />
                    {/* Mango con anillo */}
                    <path d={`M -2 ${sg * 2} L -16 ${sg * 9}`} stroke={ROJO_M} strokeWidth={8} strokeLinecap="round" />
                    <ellipse cx={-30} cy={sg * 15} rx={15} ry={11} fill="none" stroke={ROJO_M} strokeWidth={7} />
                  </g>
                ))}
                <circle r={5} fill="#334155" /><circle r={2} fill="#cbd5e1" />
              </g>
            );
          })()}
          {/* Proveedor de internet: edificio con antena y contador de quejas */}
          <rect x={644} y={560} width={122} height={180} rx={10} fill="#475569" />
          <rect x={705} y={560} width={61} height={180} rx={10} fill="#000" opacity={0.12} />
          {[0, 1, 2].map((r) => [0, 1].map((cI) => <rect key={`${r}${cI}`} x={662 + cI * 50} y={650 + r * 28} width={36} height={16} rx={3} fill="#fde68a" opacity={t >= tC ? 0.3 : 0.75} />))}
          <rect x={701} y={500} width={8} height={60} fill="#64748b" />
          <path d="M 683 506 Q 705 532 727 506 Z" fill="#94a3b8" />
          {envia > 0.01 && [0, 1].map((k) => { const p = (t * 1.2 + k / 2) % 1; return <path key={k} d={`M ${716 + p * 30} ${490 - p * 6} q 12 14 0 28`} stroke={AZUL_M} strokeWidth={4} fill="none" opacity={envia * (1 - p)} />; })}
          <rect x={656} y={578} width={98} height={52} rx={10} fill="#1f2937" />
          <Txt x={705} y={614} textAnchor="middle" fontSize={28} fill={quejas > 0 ? ROJO_M : '#94a3b8'} peso={800}>{t >= tC - 0.2 ? '30+' : String(Math.round(30 * quejas))}</Txt>
          <Txt x={705} y={782} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800}>{movil ? 'Proveedor' : 'Proveedor de internet'}</Txt>
        </g>
        {/* Sobres: por el cable y luego de la antena a cada persona */}
        {envia > 0.01 && Array.from({ length: 6 }, (_, k) => { const p = (t * 1.4 + k / 6) % 1; return <rect key={`c${k}`} x={lerp(560, 636, p) - 10} y={706} width={20} height={13} rx={2} fill={AZUL_M} opacity={envia} />; })}
        {envia > 0.01 && Array.from({ length: 6 }, (_, k) => {
          const p = (t * 0.55 + k / 6) % 1;
          const [x, y] = arco(p, 705, 500, 880 + (k % 3) * 105, (k < 3 ? 540 : 712) - 70, 70);
          return <g key={`s${k}`} transform={`translate(${x} ${y}) rotate(${lerp(-20, 15, p)})`} opacity={envia * Math.sin(Math.PI * Math.min(1, p * 1.15))}><rect x={-15} y={-10} width={30} height={20} rx={3} fill={AZUL_M} /><path d="M -15 -9 L 0 3 L 15 -9" stroke="#fff" strokeWidth={2.5} fill="none" opacity={0.8} /></g>;
        })}
        {/* La gente recibe correo no deseado y se queja */}
        {[0, 1, 2, 3, 4, 5].map((k) => {
          const x = 880 + (k % 3) * 105, y = k < 3 ? 560 : 740;
          return <g key={k} opacity={E('disco', 0.5, 0.5 + k * 0.08)}><PersonaCara id={ID} x={x} y={y} s={0.58} cuerpo={['#64748b', '#0d9488', '#9333ea', '#ca8a04', '#2563eb', '#db2777'][k]} e={0.3 - 1.3 * enojo} enojo={enojo} /></g>;
        })}
        {quejas > 0 && t < tC + 0.3 && Array.from({ length: 5 }, (_, k) => {
          const p = (t * 0.7 + k / 5) % 1, o = k % 6;
          const [x, y] = arco(p, 880 + (o % 3) * 105 + 20, (o < 3 ? 560 : 740) - 120, 705, 600, 60);
          return <g key={k} transform={`translate(${x} ${y})`} opacity={Math.sin(Math.PI * p) * (1 - sm(t, tC, tC + 0.3))}><path d="M -16 -14 H 16 Q 22 -14 22 -8 V 8 Q 22 14 16 14 H -2 L -10 22 L -8 14 H -16 Q -22 14 -22 8 V -8 Q -22 -14 -16 -14 Z" fill={ROJO_M} /><Txt x={0} y={8} textAnchor="middle" fontSize={20} fill="#fff" peso={800}>!</Txt></g>;
        })}
        <Pastilla x={380} y={404} texto={movil ? '1 millón' : '1.000.000 de correos'} fondo={AZUL_M} tam={24} op={E('disco') * (1 - sm(t, tC - 0.3, tC))} />
        <Pastilla x={380} y={404} texto={movil ? 'Cortado' : 'Servicio cortado'} fondo={ROJO_M} tam={24} op={sm(t, tC, tC + 0.4)} />
        <Pastilla x={985} y={400} texto={movil ? '+30 quejas' : 'Más de 30 quejas'} fondo={ROJO_M} tam={24} op={sm(t, tC - 0.3, tC + 0.2)} />
        {/* Boleta de ventas que se desenrolla: $70 */}
        {boleta > 0.01 && <g transform="translate(145 300)" style={sombra(0.18, 4, 10)}>
          <path d={`M -72 0 H 72 V ${170 * boleta} ${Array.from({ length: 8 }, (_, k) => `L ${72 - (k + 0.5) * 18} ${170 * boleta + (k % 2 ? 0 : 9)} L ${72 - (k + 1) * 18} ${170 * boleta}`).join(' ')} Z`} fill="#ffffff" />
          <rect x={-72} y={-8} width={144} height={14} rx={7} fill="#94a3b8" />
          <g opacity={sm(boleta, 0.5, 1)}>
            <Txt x={0} y={50} textAnchor="middle" fontSize={22} fill={GRIS} peso={800}>Ventas</Txt>
            <Txt x={0} y={118} textAnchor="middle" fontSize={56} fill={ROJO_M} peso={800}>$70</Txt>
          </g>
        </g>}
      </Toma>

      {/* 2 y 3 · Con permiso, un dólar al mes y las dos ventanas de 30 días: el fichero se queda en el centro */}
      <Toma t={t} a={tP} b={fin + 1} cy={560}>
        <rect x={180} y={fichY} width={840} height={10} rx={5} fill={c.apagado} opacity={1 - sm(t, t4 - 0.4, t4)} />

        {/* Disco comprado, tachado */}
        <g opacity={E('permiso', 0.5) * (1 - sm(t, t1 - 0.4, t1))}>
          <circle cx={300} cy={600} r={70} fill="#e2e8f0" /><circle cx={300} cy={600} r={70} fill={`url(#${ID}-marca)`} opacity={0.3} /><circle cx={300} cy={600} r={18} fill={c.panel} />
          <path d="M 228 528 L 372 672" stroke={ROJO_M} strokeWidth={14} strokeLinecap="round" opacity={sm(t, tP + 0.3, tP + 0.7)} />
          <Txt x={300} y={movil ? 728 : 712} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>Comprada</Txt>
        </g>
        <Pastilla x={600} y={300} texto={movil ? 'Con permiso' : 'Se construye con permiso'} fondo={VERDE} tam={26} op={E('permiso') * (1 - sm(t, t1 - 0.3, t1))} />

        {/* Personas que dicen sí: marcan su casilla y su ficha vuela al fichero */}
        {[0, 1, 2, 3].map((k) => {
          const x = 790 + k * 100, tk = llega(k);
          const marca = sm(t, tk, tk + 0.35);
          const vuela = sm(t, tk + 0.25, tk + 1.0);
          const [fx, fy] = arco(vuela, x, 560, 600, fichY - 150, 120);
          return (
            <g key={k} opacity={E('permiso', 0.5, k * 0.2) * (1 - sm(t, t4 - 0.4, t4))}>
              <PersonaCara id={ID} x={x} y={fichY} s={0.58} cuerpo={[NARANJA, ROSA, TEAL, AZUL_M][k]} e={0.4 + 0.6 * marca} />
              {/* Globo de diálogo: la persona dice «sí» marcando su casilla */}
              <path d={`M ${x - 34} 562 H ${x + 34} Q ${x + 42} 562 ${x + 42} 570 V 606 Q ${x + 42} 614 ${x + 34} 614 H ${x + 8} L ${x - 2} 628 L ${x - 4} 614 H ${x - 34} Q ${x - 42} 614 ${x - 42} 606 V 570 Q ${x - 42} 562 ${x - 34} 562 Z`} fill={c.panel} style={sombra(0.18, 2, 6)} />
              <rect x={x - 14} y={575} width={28} height={26} rx={6} fill="none" stroke={marca > 0 ? VERDE : '#94a3b8'} strokeWidth={4} />
              {marca > 0 && <path d={`M ${x - 9} 588 L ${x - 2} 595 L ${x + 11} 579`} stroke={VERDE} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${marca} 1`} />}
              {vuela > 0 && vuela < 1 && <g transform={`translate(${fx} ${fy}) rotate(${lerp(-10, 0, vuela)})`}><rect x={-30} y={-18} width={60} height={36} rx={5} fill="#fff" style={sombra(0.2, 2, 4)} /><circle cx={-16} cy={-5} r={7} fill={TABS[k]} /><rect x={-4} y={-8} width={26} height={5} rx={2.5} fill="#cbd5e1" /></g>}
            </g>
          );
        })}

        {/* Un dólar al mes: cada ficha suelta una moneda y la pila crece mes a mes */}
        {t >= t1 - 0.1 && t < t4 + 0.2 && (() => {
          const u = sm(t, t1, t1 + 0.5) * (1 - sm(t, t4 - 0.4, t4));
          const meses = Math.min(5, Math.floor(Math.max(0, t - t1) / 1.2));
          return (
            <g opacity={u}>
              {Array.from({ length: 4 }, (_, k) => { const p = ((t - t1) * 0.85 + k / 4) % 1; const [x, y] = arco(p, 560 + k * 26, fichY - 170, 320, fichY - 20 - meses * 14, 110); return <Moneda3D key={k} x={x} y={y} r={15} giro={Math.cos(t * 5 + k)} op={Math.sin(Math.PI * p)} />; })}
              {Array.from({ length: meses + 1 }, (_, k) => <g key={k}><ellipse cx={320} cy={fichY - 6 - k * 14} rx={46} ry={13} fill="#d97706" /><ellipse cx={320} cy={fichY - 10 - k * 14} rx={46} ry={13} fill="#fbbf24" /></g>)}
              {/* Calendario que pasa de mes */}
              <g transform="translate(320 470)">
                <rect x={-58} y={-50} width={116} height={104} rx={12} fill={c.panel} style={sombra(0.18, 3, 8)} />
                <rect x={-58} y={-50} width={116} height={30} rx={12} fill={ROJO_M} /><rect x={-58} y={-30} width={116} height={10} fill={ROJO_M} />
                {[-30, 30].map((rx) => <rect key={rx} x={rx - 4} y={-60} width={8} height={20} rx={4} fill="#64748b" />)}
                {!movil && <Txt x={0} y={-28} textAnchor="middle" fontSize={18} fill="#fff" peso={800}>Mes</Txt>}
                <Txt x={0} y={36} textAnchor="middle" fontSize={44} fill={c.texto} peso={800}>{String(meses + 1)}</Txt>
              </g>
            </g>
          );
        })()}
        <Pastilla x={600} y={300} texto={movil ? '1 nombre ≈ $1/mes' : 'Cada nombre ≈ $1 al mes'} fondo={AMBAR} tam={26} op={E('dolar') * (1 - sm(t, t4 - 0.4, t4))} />

        {/* Línea de tiempo de 60 días */}
        <g opacity={E('cuatro')}>
          <rect x={120} y={262} width={960} height={14} rx={7} fill={c.apagado} />
          <rect x={120} y={262} width={480 * mes1} height={14} rx={7} fill={NARANJA} />
          <rect x={600} y={262} width={480 * mes2} height={14} rx={7} fill={VERDE} />
          <circle cx={600} cy={269} r={9} fill={c.panel} stroke={c.apagado} strokeWidth={4} />
          <Txt x={360} y={244} textAnchor="middle" fontSize={24} fill={NARANJA} peso={800}>Días 1–30</Txt>
          <Txt x={840} y={244} textAnchor="middle" fontSize={24} fill={VERDE} peso={800} opacity={0.35 + 0.65 * E('siguientes')}>Días 31–60</Txt>
          <circle cx={120 + 480 * mes1 + 480 * mes2} cy={269} r={13} fill={mes2 > 0 ? VERDE : NARANJA} />
        </g>

        {/* Ventana 1: cuatro embudos tragan anuncios y devuelven ventas y contactos */}
        <g opacity={1}>
          {[0, 1, 2, 3].map((k) => <Embudo key={k} x={150 + k * 100} y={330} color={[NARANJA, ROSA, VIOLETA, AZUL_M][k]} op={E('cuatro', 0.5, k * 0.15)} />)}
          {t >= t4 + 0.5 && Array.from({ length: 6 }, (_, k) => { const p = (t * 0.9 + k / 6) % 1; const x = 150 + (k % 4) * 100; return <Billete key={k} x={x + 10 * Math.sin(p * 6 + k)} y={lerp(282, 336, p)} s={0.32} rot={20 * Math.sin(p * 5 + k)} color={ROJO_M} op={Math.sin(Math.PI * p) * (1 - sm(t, tS - 0.5, tS))} />; })}
          {/* Contactos: salen de los tubos, corren por la canaleta y caen al fichero */}
          {contactos > 0 && t < tS + 1 && Array.from({ length: 8 }, (_, k) => {
            const p = (t * 0.6 + k / 8) % 1;
            const x0 = 150 + (k % 4) * 100;
            const x = p < 0.55 ? lerp(x0, 600, p / 0.55) : 600, y = p < 0.55 ? 448 : lerp(448, fichY - 140, (p - 0.55) / 0.45);
            return <circle key={k} cx={x} cy={y} r={9} fill={TABS[k % TABS.length]} opacity={Math.min(1, Math.sin(Math.PI * p) * 2) * (1 - sm(t, tS, tS + 0.6))} />;
          })}
          {contactos > 0 && <path d={`M 150 448 H 600 V ${fichY - 160}`} stroke={c.apagado} strokeWidth={3} fill="none" strokeDasharray="6 8" opacity={0.6 * (1 - sm(t, tS, tS + 0.6))} />}
          {/* Barras: anuncios frente a ventas, y la utilidad que queda */}
          <g opacity={E('gastaron')}>
            <rect x={100} y={500} width={Math.max(0.01, 128 * 2.6 * barA)} height={44} rx={10} fill={ROJO_M} />
            <Txt x={118} y={530} textAnchor="start" fontSize={22} fill="#fff" peso={800} opacity={sm(barA, 0.7, 1)}>{movil ? '−128 mil' : 'Anuncios −$128 mil'}</Txt>
            <rect x={100} y={560} width={Math.max(0.01, 142 * 2.6 * barV)} height={44} rx={10} fill={VERDE} opacity={sm(t, tG + 2.2, tG + 2.4)} />
            <Txt x={118} y={590} textAnchor="start" fontSize={22} fill="#fff" peso={800} opacity={sm(barV, 0.7, 1)}>{movil ? '+142 mil' : 'Ventas +$142 mil'}</Txt>
            {util > 0 && <g opacity={util}>
              <rect x={100 + 128 * 2.6} y={556} width={14 * 2.6} height={52} rx={6} fill="none" stroke={AMBAR} strokeWidth={4} />
              <path d={`M ${100 + 135 * 2.6} 612 Q ${100 + 135 * 2.6} 642 380 646`} stroke={AMBAR} strokeWidth={4} fill="none" />
              <Txt x={330} y={680} textAnchor="middle" fontSize={26} fill={AMBAR} peso={800}>≈ +$14 mil</Txt>
            </g>}
          </g>
        </g>

        {/* Fichero central */}
        <Fichero x={600} y={fichY} n={fichas} t={t} brillo={0} op={sm(t, tP - 0.2, tP + 0.5)}
          placa={contactos > 0
            ? <Cifra x={0} y={-52} valor={14205} u={contactos} tam={36} color={VIOLETA} miles />
            : <Txt x={0} y={-57} textAnchor="middle" fontSize={26} fill={VIOLETA} peso={800}>{movil ? 'Lista' : 'Tu lista'}</Txt>} />
        <Txt x={600} y={804} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800} opacity={contactos}>{movil ? 'contactos' : 'contactos nuevos'}</Txt>

        {/* Ventana 2: el fichero devuelve $234 mil; la barra crece 16,49 veces la utilidad inicial */}
        {t >= tS - 0.05 && (() => { const H = movil ? 290 : 330, bx = movil ? 1004 : 951; return <g opacity={E('siguientes')}>
          {crece < 1.2 && Array.from({ length: 6 }, (_, k) => { const p = (t * 0.9 + k / 6) % 1; const [x, y] = arco(p, 640, fichY - 160, 950, lerp(fichY - 20, fichY - H * Math.min(1, crece), 0.6), 120); return <Moneda3D key={k} x={x} y={y} r={13} giro={Math.cos(t * 5 + k)} op={Math.sin(Math.PI * p) * (1 - sm(t, t16 + 2, t16 + 3))} />; })}
          <rect x={movil ? 778 : 760} y={fichY - H * 14.2 / 234} width={64} height={H * 14.2 / 234} rx={6} fill={AMBAR} />
          <Txt x={movil ? 810 : 792} y={fichY - 36} textAnchor="middle" fontSize={22} fill={AMBAR} peso={800}>$14 mil</Txt>
          <rect x={bx - 45} y={fichY - H * crece} width={90} height={Math.max(0.01, H * crece)} rx={10} fill={VERDE} />
          <rect x={bx - 45} y={fichY - H * crece} width={30} height={Math.max(0.01, H * crece)} rx={10} fill="#fff" opacity={0.18} />
          <Cifra x={bx} y={fichY - H * Math.min(1, crece) - 18} valor={234} u={Math.min(1, crece)} pre="$" suf=" mil" tam={30} color={VERDE} />
          <Txt x={movil ? 810 : 792} y={804} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800}>Inicial</Txt>
          <Txt x={bx} y={804} textAnchor="middle" fontSize={22} fill={c.tenue} peso={800}>Después</Txt>
        </g>; })()}
        <Pastilla x={movil ? 960 : 890} y={movil ? 336 : 352} texto={movil ? '×16,49' : '×16,49 por dólar inicial'} fondo={VERDE} tam={28} op={E('dieciseis')} />
        {t >= tF && <Sello x={280} y={752} texto="Sin auditar" u={sm(t, tF + 0.4, tF + 1)} color={GRIS} tam={24} rot={-5} />}
      </Toma>
    </Lienzo>
  );
};
