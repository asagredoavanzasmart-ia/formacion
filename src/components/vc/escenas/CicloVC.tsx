import React from 'react';
import { useEscenaVC, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Reloj, Hoja, Curva, Telefono, Cruz, e1, sm, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, GRIS } from './kitVC';
import type { PropsCE } from './kitVC';

/**
 * Ciclo normal de ventas.
 * 1 · Un desconocido recorre el anillo del ciclo hasta volverse cliente recurrente; la fórmula (tiempo total ÷ ventas reales)
 *     y dos reglas en barra: de 3 a 9 meses ronda los 6; de 10 a 20 semanas ronda las 15.
 * 2 · La auditoría en cinco estaciones: recopilar, medir, depurar (la venta relámpago sale), promediar y aplicar.
 * 3 · Las dos preguntas de Michael Pearce: qué información importa en cada etapa y cuántos contactos toma convertir.
 */

const ID = 'vc21', P = 'vc-ciclo';

export const CicloVC: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaVC(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('ciclo'), 'El ciclo normal'], [m('formula'), 'La fórmula clave'], [m('fases'), 'Cinco fases'], [m('pearce'), 'Dos preguntas de Pearce'],
  ];
  const vuelta = sm(t, m('ciclo') + 0.5, m('formula'));
  const ang = -Math.PI / 2 + 2 * Math.PI * vuelta;
  const regla = (y: number, a: number, b: number, mid: string, uni: string, t0: number, tM: number) => (
    <g opacity={e1(t, t0)}>
      <rect x={640} y={y} width={460} height={16} rx={8} fill={c.apagado} />
      <rect x={640} y={y} width={460 * sm(t, t0, t0 + 1)} height={16} rx={8} fill={AZUL_M} opacity={0.6} />
      <Txt x={640} y={y - 16} fontSize={26} fill={c.texto}>{`${a}`}</Txt>
      <Txt x={1100} y={y - 16} textAnchor="end" fontSize={26} fill={c.texto}>{`${b} ${uni}`}</Txt>
      {t >= tM && <g opacity={e1(t, tM)}><circle cx={870} cy={y + 8} r={20} fill={NARANJA} /><Txt x={870} y={y + 64} textAnchor="middle" fontSize={30} fill={NARANJA}>{`≈ ${mid}`}</Txt></g>}
    </g>
  );
  const FASES: [string, string, string][] = [['recopilacion', 'Recopilar', AZUL_M], ['medicion', 'Medir', VIOLETA], ['depuracion', 'Depurar', ROSA], ['resultado', 'Promediar', AMBAR], ['aplicacion', 'Aplicar', VERDE]];
  let fa = -1;
  FASES.forEach(([a], k) => { if (t >= m(a)) fa = k; });

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Ciclo normal">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el anillo del ciclo y la fórmula */}
      <Toma t={t} a={0} b={m('fases')} cy={470}>
        <circle cx={330} cy={470} r={200} fill="none" stroke={c.apagado} strokeWidth={22} opacity={e1(t, m('ciclo'))} />
        <circle cx={330} cy={470} r={200} fill="none" stroke={`url(#${ID}-marcaH)`} strokeWidth={22} pathLength={1} strokeDasharray={`${vuelta} 1`} transform="rotate(-90 330 470)" />
        <Reloj x={330} y={470} r={70} t={t} />
        <g opacity={e1(t, m('ciclo'))} transform={`translate(${330 + 200 * Math.cos(ang)} ${470 + 200 * Math.sin(ang) + 40})`}><Persona id={ID} x={0} y={0} s={0.42} cuerpo={vuelta > 0.95 ? NARANJA : GRIS} /></g>
        {t >= m('formula') && (
          <g opacity={e1(t, m('formula'))} transform="translate(870 250)">
            <Txt x={0} y={-20} textAnchor="middle" fontSize={34} fill={c.texto}>Tiempo total</Txt>
            <rect x={-190} y={0} width={380} height={8} rx={4} fill={NARANJA} />
            <Txt x={0} y={60} textAnchor="middle" fontSize={34} fill={c.texto}>Ventas reales</Txt>
          </g>
        )}
        {t >= m('meses') && regla(470, 3, 9, '6 meses', 'meses', m('meses'), m('seis'))}
        {t >= m('semanas') && regla(650, 10, 20, '15 semanas', 'semanas', m('semanas'), m('semanas') + 1.5)}
      </Toma>

      {/* 2 · cinco fases */}
      <Toma t={t} a={m('fases')} b={m('pearce')} cy={470}>
        <rect x={80} y={600} width={1040} height={20} rx={10} fill={c.apagado} />
        {FASES.map(([a, n, col], k) => {
          const x = 180 + k * 210, on = t >= m(a);
          return (
            <g key={a} opacity={on ? 1 : 0.3}>
              <circle cx={x} cy={610} r={34} fill={on ? col : c.panel2} />
              <Txt x={x} y={621} textAnchor="middle" fontSize={28} fill="#fff">{k + 1}</Txt>
              <Txt x={x} y={movil && k % 2 ? 560 : 696} textAnchor="middle" fontSize={26} fill={fa === k ? col : c.texto}>{n}</Txt>
            </g>
          );
        })}
        <g transform="translate(600 360)">
          {fa === 0 && <g opacity={e1(t, m('recopilacion'))}>{[0, 1, 2, 3].map((k) => <Hoja key={k} x={-150 + k * 70} y={-80 - 6 * k} w={80} h={104} lineas={4} color={AZUL_M} />)}<Txt x={0} y={90} textAnchor="middle" fontSize={28} fill={c.texto}>12 a 24 meses</Txt></g>}
          {fa === 1 && <g opacity={e1(t, m('medicion'))}><rect x={-260} y={-20} width={520} height={40} rx={8} fill={AMBAR} />{Array.from({ length: 11 }, (_, k) => <rect key={k} x={-250 + k * 50} y={-20} width={4} height={k % 2 ? 16 : 26} fill="#fff" />)}<Txt x={-260} y={70} fontSize={26} fill={c.texto}>Primer contacto</Txt><Txt x={260} y={70} textAnchor="end" fontSize={26} fill={c.texto}>Firma</Txt></g>}
          {fa === 2 && <g opacity={e1(t, m('depuracion'))}>{Array.from({ length: 7 }, (_, k) => { const fuera = k === 5; const u = fuera ? sm(t, m('depuracion') + 1.5, m('depuracion') + 2.5) : 0; return <g key={k} transform={`translate(${-240 + k * 80} ${-60 * u})`} opacity={1 - 0.7 * u}><rect x={-26} y={40 - (fuera ? 20 : 110 + 20 * Math.sin(k))} width={52} height={fuera ? 20 : 110 + 20 * Math.sin(k)} rx={8} fill={fuera ? ROSA : VIOLETA} />{fuera && <Cruz x={0} y={-10} r={18} />}</g>; })}<Txt x={0} y={100} textAnchor="middle" fontSize={26} fill={ROSA}>Fuera: la venta de dos días</Txt></g>}
          {fa === 3 && <g opacity={e1(t, m('resultado'))}>{Array.from({ length: 6 }, (_, k) => <rect key={k} x={-240 + k * 80} y={40 - (110 + 20 * Math.sin(k))} width={52} height={110 + 20 * Math.sin(k)} rx={8} fill={VIOLETA} opacity={0.6} />)}<line x1={-260} y1={-70} x2={240} y2={-70} stroke={NARANJA} strokeWidth={8} strokeDasharray="16 10" pathLength={1} /><Txt x={0} y={100} textAnchor="middle" fontSize={28} fill={NARANJA}>Sumar y dividir</Txt></g>}
          {fa === 4 && <g opacity={e1(t, m('aplicacion'))}><Curva pts={[[-260, 60], [-120, 20], [0, -10], [120, -60], [260, -110]]} u={sm(t, m('aplicacion'), m('aplicacion') + 1.5)} color={VERDE} /><Txt x={0} y={100} textAnchor="middle" fontSize={28} fill={c.texto}>Predices ingresos</Txt></g>}
        </g>
      </Toma>

      {/* 3 · las preguntas de Pearce */}
      <Toma t={t} a={m('pearce')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('pearce'))} transform="translate(160 470)">
          <rect x={-80} y={-110} width={160} height={220} rx={12} fill={TEAL} /><rect x={-80} y={-110} width={22} height={220} rx={8} fill="#000" opacity={0.2} />
          <Txt x={10} y={-20} textAnchor="middle" fontSize={30} fill="#fff">CRM</Txt>
          <Txt x={10} y={30} textAnchor="middle" fontSize={20} fill="#fff">Pearce</Txt>
        </g>
        {t >= m('informacion') && (
          <g opacity={e1(t, m('informacion'))}>
            {[0, 1, 2, 3, 4].map((k) => <g key={k}><rect x={330 + k * 160} y={230} width={130} height={70} rx={14} fill={c.panel2} /><Hoja x={375 + k * 160} y={180 - 6 * Math.sin(t * 2 + k)} w={40} h={52} lineas={3} color={AZUL_M} /></g>)}
            <Txt x={330} y={360} fontSize={28} fill={c.texto}>{movil ? '¿Qué información?' : '¿Qué información importa en cada etapa?'}</Txt>
          </g>
        )}
        {t >= m('contactar') && (
          <g opacity={e1(t, m('contactar'))}>
            <Telefono x={380} y={560} s={0.32} widgets={0} />
            {Array.from({ length: 7 }, (_, k) => <circle key={k} cx={480 + k * 70} cy={560} r={20} fill={NARANJA} opacity={e1(t, m('contactar') + 0.4 * k)} />)}
            <Txt x={1000} y={574} fontSize={44} fill={NARANJA} opacity={e1(t, m('contactar') + 3)}>?</Txt>
            <Txt x={330} y={680} fontSize={28} fill={c.texto}>{movil ? '¿Cuántos contactos?' : '¿Cuántos contactos antes de comprar?'}</Txt>
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
