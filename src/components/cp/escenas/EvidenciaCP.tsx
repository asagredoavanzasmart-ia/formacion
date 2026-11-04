import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Engranaje, Cifra, Barra, Cruz, e1, sm, ventana, brillo, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Lo que dicen los datos.
 * Toma 1 (Gartner, en Newell): el 65 % y cuatro engranajes que deberían engranar —dirección, tecnología, jefaturas y
 * cliente— pero quedan desalineados y giran cada uno por su lado: nadie se puso de acuerdo.
 * Toma 2 (Forrester, en Reinares): una diana con diez dardos, la mitad fuera: cerca del 50 % sin sus objetivos.
 * Toma 3 (Newell): el orden en bloques que se apilan: procesos, personas y, al final, tecnología.
 * Toma 4: Unisys en tres barras (44, 42 y 14) y la frase de Don Neal.
 */

const ID = 'cp03', P = 'cp-evidencia';

export const EvidenciaCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('gartner'), 'Gartner, según Newell'], [m('nadie'), 'Nadie se puso de acuerdo'], [m('forrester'), 'Forrester, según Reinares'],
    [m('orden'), 'El orden de Newell'], [m('unisys'), 'Encuesta de Unisys'], [m('neal'), 'Don Neal'],
  ];
  const GEAR: [string, string, number, string][] = [['Dirección', 'direccion', 0, VIOLETA], ['Tecnología', 'direccion', 1.2, AZUL_M], ['Jefaturas', 'jefaturas', 0, NARANJA], ['Cliente', 'cliente', 0, ROSA]];
  const caos = sm(t, m('nadie'), m('nadie') + 0.8);
  const BLOQ: [string, number, string][] = [['Procesos', 520, VERDE], ['Personas', 420, AZUL_M], ['Tecnología', 320, NARANJA]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Lo que dicen los datos">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Gartner: cuatro engranajes que no engranan */}
      <Toma t={t} a={0} b={m('forrester')} cy={480}>
        <Cifra x={600} y={250} valor={65} u={sm(t, m('sesenta'), m('sesenta') + 1.2)} suf=" %" tam={110} color={ROJO_M} />
        <Letrero x={600} y={330} texto="No logrará alinear" fondo={GRIS} id={ID} tam={28} op={e1(t, m('sesenta') + 0.8)} />
        {GEAR.map(([n, ancla, d, col], k) => {
          const x = 210 + k * 260, y = 530 + (k % 2 ? 40 : -10) * caos;
          const giro = (k % 2 ? -1 : 1) * (1 + caos * k * 0.6);
          return (
            <g key={n} opacity={e1(t, m(ancla) + d)}>
              <Engranaje x={x} y={y} r={78} t={t * giro} color={col} hueco={isDark ? '#1b1b1b' : '#f5f6f8'} />
              <Txt x={x} y={680} textAnchor="middle" fontSize={28} fill={c.texto}>{n}</Txt>
            </g>
          );
        })}
        {t >= m('nadie') && [0, 1, 2].map((k) => <Cruz key={k} x={340 + k * 260} y={530} r={22} op={e1(t, m('nadie') + 0.2 * k)} />)}
        <Letrero x={600} y={790} texto="Nadie se puso de acuerdo" fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('nadie') + 0.3)} />
      </Toma>

      {/* 2 · Forrester: la mitad de los dardos fuera */}
      <Toma t={t} a={m('forrester')} b={m('orden')} cy={480}>
        {[150, 115, 80, 45].map((r, k) => <circle key={r} cx={380} cy={480} r={r} fill={k % 2 ? c.panel : ROSA} opacity={e1(t, m('forrester'))} />)}
        {Array.from({ length: 10 }, (_, k) => {
          const dentro = k % 2 === 0;
          const a = k * 0.63 + 0.4, r = dentro ? 30 + (k % 3) * 30 : 190 + (k % 3) * 25;
          const u = sm(t, m('cincuenta') + 0.15 * k, m('cincuenta') + 0.15 * k + 0.4);
          return u > 0.01 && <g key={k} transform={`translate(${380 + Math.cos(a) * r} ${480 + Math.sin(a) * r * 0.9})`} opacity={u}><circle r={9} fill={dentro ? VERDE : GRIS} /><rect x={-3} y={-34} width={6} height={30} rx={3} fill={dentro ? VERDE : GRIS} /></g>;
        })}
        <Cifra x={880} y={480} valor={50} u={sm(t, m('cincuenta'), m('cincuenta') + 1.2)} suf=" %" tam={110} color={ROJO_M} />
        <Letrero x={880} y={560} texto="Sin los objetivos" fondo={GRIS} id={ID} tam={28} op={e1(t, m('cincuenta') + 0.8)} />
        {!movil && <Txt f="a" x={880} y={620} textAnchor="middle" fontSize={22} fill={c.tenue} opacity={e1(t, m('forrester'))}>Forrester, 2016</Txt>}
      </Toma>

      {/* 3 · el orden: procesos, personas y, al final, tecnología */}
      <Toma t={t} a={m('orden')} b={m('unisys')} cy={500}>
        {BLOQ.map(([n, w, col], k) => {
          const u = sm(t, m('procesos') + 0.7 * k, m('procesos') + 0.7 * k + 0.6);
          const y = 700 - k * 125;
          const destaca = k === 2 && t >= m('alfinal');
          return u > 0.01 && (
            <g key={n} transform={`translate(0 ${(1 - u) * -200})`} opacity={u}>
              <rect x={600 - w / 2} y={y - 110} width={w} height={110} rx={18} fill={col} opacity={1 - 0.05 * brillo(t, destaca)} />
              <rect x={600 - w / 2} y={y - 110} width={w} height={40} rx={18} fill="#fff" opacity={0.15} />
              <Txt x={600} y={y - 42} textAnchor="middle" fontSize={34} fill="#fff">{n}</Txt>
            </g>
          );
        })}
        {t >= m('alfinal') && <Letrero x={600} y={790} texto="La tecnología va al final" id={ID} tam={28} op={e1(t, m('alfinal'))} />}
      </Toma>

      {/* 4 · Unisys y Don Neal */}
      <Toma t={t} a={m('unisys')} b={fin + 1} cy={500}>
        {ventana(t, m('unisys'), m('neal')) > 0.01 && (
          <g opacity={ventana(t, m('unisys'), m('neal'))}>
            <Barra x={330} y={660} hMax={420} valor={44} u={sm(t, m('positivo'), m('positivo') + 1)} color={VERDE} rotulo="Positivo" c={c} tam={28} />
            <Barra x={600} y={660} hMax={420} valor={42} u={sm(t, m('neutro'), m('neutro') + 1)} color={GRIS} rotulo="Neutro" c={c} tam={28} />
            <Barra x={870} y={660} hMax={420} valor={14} u={sm(t, m('negativo'), m('negativo') + 1)} color={ROJO_M} rotulo="Negativo" c={c} tam={28} />
            {!movil && <Txt f="a" x={600} y={760} textAnchor="middle" fontSize={22} fill={c.tenue}>Retorno de la inversión en tecnología · 200 empresas</Txt>}
          </g>
        )}
        {t >= m('neal') && (
          <g opacity={e1(t, m('neal'))}>
            <Persona id={ID} x={200} y={760} s={0.9} corbata cuerpo="#334155" />
            <Burbuja x={320} y={560} w={movil ? 760 : 700} texto="«Los riesgos de gastar antes de planificar son reales»" u={sm(t, m('neal') + 0.2, m('planificar') + 1)} c={c} id={ID} tam={30} />
            <Letrero x={700} y={790} texto="Don Neal, Rapp Collins" fondo={GRIS} id={ID} tam={28} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
