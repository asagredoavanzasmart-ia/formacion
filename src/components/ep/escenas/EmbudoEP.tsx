import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Visto, Cruz, Flecha, Auto, Cifra, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * El embudo y sus barreras.
 * 1 · Un embudo con barreras horizontales: en cada una caen personas por el costado; se mide cuántas caen y se le pregunta a
 *     quien cayó. Cuatro herramientas se aplican a la barrera más grave: eliminarla, simplificarla, escribir menos, guiar con el diseño.
 * 2 · El cruce de Waze: el giro gris «prohibido» pasa a «permitido, salvo que sepamos que no» y la ruta se vuelve razonable.
 *     La billetera de Zeek se usa poco y, al quitarla, las búsquedas suben.
 * 3 · Las cifras reales: siete usos al mes, 30 % a tres meses y la regla de los tres usos.
 */

const ID = 'ep23', P = 'ep-embudo';

export const EmbudoEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('embudo'), 'El embudo de usuarios'], [m('medir'), 'Medir y preguntar'], [m('grave'), 'Cuatro formas'], [m('salto'), 'El gran salto de Waze'],
    [m('zeek'), 'La billetera de Zeek'], [m('siete'), 'Las cifras reales'],
  ];
  const BARRERAS = [{ y: 330, w: 380 }, { y: 470, w: 290 }, { y: 610, w: 200 }];
  const HERR = [{ k: 'eliminarla', n: 'Eliminar o mover', col: NARANJA }, { k: 'simplificarla', n: 'Simplificar', col: ROSA }, { k: 'escribir', n: 'Escribir menos', col: AZUL_M }, { k: 'diseno', n: 'Guiar con el diseño', col: VERDE }];
  const permitido = sm(t, m('permitido'), m('permitido') + 1);
  const quita = sm(t, m('quitarla'), m('quitarla') + 1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El embudo y sus barreras">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el embudo */}
      <Toma t={t} a={0} b={m('salto')} cy={470}>
        <g opacity={e1(t, m('embudo'))}>
          <path d="M 120 200 H 680 L 500 740 H 300 Z" fill={c.panel2} />
          {BARRERAS.map((b, k) => t >= m('barrera') && <rect key={k} x={400 - b.w / 2} y={b.y} width={b.w} height={16} rx={8} fill={k === 1 && t >= m('grave') ? ROSA : '#64748b'} opacity={e1(t, m('barrera') + 0.3 * k)} />)}
          {Array.from({ length: 8 }, (_, k) => { const ph = (t * 0.35 + k / 8) % 1; const y = lerp(200, 740, ph); const cae = t >= m('barrera') && k % 3 === 0 && y > 340; return <circle key={k} cx={400 + (cae ? (y - 340) * 0.6 : 0)} cy={y} r={14} fill={AZUL_M} opacity={cae ? Math.max(0, 1 - (y - 340) / 300) : 1} />; })}
          <Txt f="a" x={400} y={180} textAnchor="middle" fontSize={26} fill={c.tenue}>Todo el mercado</Txt>
          <Txt f="a" x={400} y={790} textAnchor="middle" fontSize={26} fill={c.tenue}>Los que vuelven</Txt>
        </g>
        {t >= m('medir') && t < m('grave') && <g opacity={e1(t, m('medir'))}>
          {BARRERAS.map((b, k) => k === 1 && <Txt key={k} f="a" x={400 + b.w / 2 + 24} y={b.y + 14} fontSize={26} fill={ROSA}>¿cuántos caen?</Txt>)}
          <Persona id={ID} x={900} y={600} s={0.6} cuerpo={GRIS} />
          {t >= m('preguntarle') && <Burbuja x={760} y={300} w={330} texto="¿Por qué no pasaste?" u={sm(t, m('preguntarle'), m('preguntarle') + 1)} c={c} id={ID} marca lado="der" />}
        </g>}
        {t >= m('grave') && HERR.map((h, i) => t >= m(h.k) && (
          <g key={h.k} opacity={e1(t, m(h.k))} transform={`translate(880 ${260 + i * 120})`}>
            <rect x={-200} y={-42} width={400} height={84} rx={22} fill={c.panel} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} />
            <rect x={-200} y={-42} width={14} height={84} rx={7} fill={h.col} />
            <Txt f="a" x={-170} y={10} fontSize={28} fill={c.texto}>{h.n}</Txt>
          </g>
        ))}
      </Toma>

      {/* 2 · Waze y Zeek */}
      <Toma t={t} a={m('salto')} b={m('siete')} cy={470}>
        {t < m('zeek') ? <g>
          <rect x={160} y={420} width={560} height={90} fill="#64748b" /><rect x={395} y={180} width={90} height={560} fill="#64748b" />
          <path d={`M 300 465 H 440 V ${lerp(465, 240, permitido)}`} stroke={permitido > 0.5 ? VERDE : GRIS} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={permitido > 0.5 ? undefined : '20 18'} />
          {permitido < 0.5 ? <Cruz x={540} y={330} r={30} /> : <Visto x={540} y={330} r={30} />}
          <Auto x={lerp(230, 230, 0)} y={480} s={0.5} color={NARANJA} />
          <g transform="translate(940 380)" opacity={e1(t, m('salto'))}>
            <rect x={-200} y={-120} width={400} height={240} rx={24} fill={c.panel} style={{ filter: `drop-shadow(0 4px 10px rgba(0,0,0,${c.sombra}))` }} />
            <Txt f="a" x={0} y={-50} textAnchor="middle" fontSize={26} fill={c.tenue}>{permitido > 0.5 ? 'Ahora' : 'Antes'}</Txt>
            <Txt f="a" x={0} y={0} textAnchor="middle" fontSize={28} fill={c.texto}>{permitido > 0.5 ? 'Permitido, salvo' : 'Prohibido, salvo'}</Txt>
            <Txt f="a" x={0} y={40} textAnchor="middle" fontSize={28} fill={c.texto}>{permitido > 0.5 ? 'que sepamos que no' : 'que sepamos que sí'}</Txt>
          </g>
          {permitido > 0.5 && <Letrero x={940} y={600} texto="Rutas razonables" fondo={VERDE} id={ID} op={permitido} tam={26} />}
        </g> : <g>
          <g transform="translate(380 440)" opacity={1 - 0.8 * quita}>
            <rect x={-160} y={-110} width={320} height={220} rx={26} fill="#7c2d12" /><rect x={-160} y={-110} width={320} height={80} rx={26} fill="#9a3412" />
            {[0, 1].map((k) => <rect key={k} x={-120 + k * 30} y={-70 + k * 16} width={180} height={110} rx={12} fill={[NARANJA, ROSA][k]} />)}
            <Txt f="a" x={0} y={170} textAnchor="middle" fontSize={28} fill={c.texto}>La billetera</Txt>
          </g>
          {t >= m('billetera') && <Letrero x={380} y={260} texto="La aprovecha un 0,3 %" fondo={GRIS} id={ID} op={e1(t, m('billetera'))} tam={24} />}
          {quita > 0.5 && <Cruz x={380} y={440} r={50} op={quita} />}
          {t >= m('quitarla') && <g opacity={e1(t, m('quitarla'))}>
            <Flecha x1={820} y1={660} x2={820} y2={lerp(660, 300, sm(t, m('quitarla') + 0.3, m('quitarla') + 1.6))} color={VERDE} grosor={20} />
            <Letrero x={820} y={720} texto="Suben las búsquedas" fondo={VERDE} id={ID} tam={26} />
          </g>}
        </g>}
      </Toma>

      {/* 3 · cifras reales */}
      <Toma t={t} a={m('siete')} b={fin + 1} cy={470}>
        {[{ k: 'siete', v: 7, suf: '', n: 'por mes', col: NARANJA }, { k: 'treinta', v: 30, suf: ' %', n: 'a tres meses', col: ROSA }, { k: 'tres', v: 3, suf: '', n: 'usos', col: VERDE }].map((d, k) => t >= m(d.k) && (
          <g key={d.k} opacity={e1(t, m(d.k))} transform={`translate(${240 + k * 360} 440)`}>
            <circle r={140} fill={d.col} opacity={0.15} />
            <Cifra x={0} y={30} valor={d.v} u={sm(t, m(d.k), m(d.k) + 1)} suf={d.suf} color={d.col} tam={110} />
            <Txt f="a" x={0} y={200} textAnchor="middle" fontSize={28} fill={c.texto}>{d.n}</Txt>
          </g>
        ))}
      </Toma>
    </Lienzo>
  );
};
