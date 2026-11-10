import React from 'react';
import { useEscenaAD, Lienzo, Toma, Rotulo, Letrero, Txt, Cubo, Persona, Gente, Telefono, Sobre, Reloj, Hoja, Billete, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitAD';
import type { PropsCE } from './kitAD';

/**
 * El cubo de entrega.
 * Toma 1: un cubo isométrico se arma cara por cara con los seis códigos; a su lado, un panel muestra las opciones del
 * código que se nombra (1 a 1 / grupo / 1 a muchos, solo / juntos / por él, canales, formatos y velocidad).
 * Toma 2: el ejercicio de diez veces y un décimo: una balanza de precio con el servicio premium (×10) a un lado y la
 * versión escalable (÷10, sin tu tiempo) al otro.
 * Toma 3: la misma solución sale del cubo como consultoría cara o como plantilla grabada que llega a cientos.
 */

const ID = 'ad11', P = 'ad-cubo';

export const CuboAD: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaAD(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('seis'), 'Seis códigos'], [m('atencion'), 'Nivel de atención'], [m('esfuerzo'), 'Esfuerzo del cliente'], [m('vivo'), 'Si es en vivo'], [m('grabado'), 'Si es grabado'],
    [m('velocidad'), 'Velocidad de respuesta'], [m('diez'), 'Diez veces y un décimo'], [m('combinando'), 'Una solución, dos formas'],
  ];
  const COD: [string, string, string][] = [['atencion', 'Atención', NARANJA], ['esfuerzo', 'Esfuerzo', ROSA], ['vivo', 'En vivo', VIOLETA], ['grabado', 'Grabado', AZUL_M], ['velocidad', 'Velocidad', TEAL], ['diez', '10× / 1/10', VERDE]];
  const actual = COD.reduce((a, [n], k) => (t >= m(n) - 0.1 ? k : a), -1);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El cubo de entrega">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El cubo y sus seis códigos */}
      <Toma t={t} a={0} b={m('diez')} cy={470}>
        <g opacity={e1(t, m('seis'))} transform={`translate(300 ${560 + 8 * Math.sin(t * 1.4)})`}>
          {COD.map(([n, , col], k) => {
            const on = t >= m(n) - 0.1;
            const fila = Math.floor(k / 2), lado = k % 2;
            return <g key={n} opacity={on ? e1(t, m(n)) : 0.15}><Cubo x={(lado ? 1 : -1) * 70} y={-fila * 120 + (lado ? 0 : -40) + 40} l={110} color={on ? col : c.apagado} letra={String(k + 1)} /></g>;
          })}
        </g>
        <g opacity={actual >= 0 ? 1 : 0}>
          <rect x={560} y={190} width={560} height={500} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          {actual === 0 && <g opacity={e1(t, m('atencion'))}><Persona id={ID} x={660} y={520} s={0.5} /><Gente x={790} y={520} n={3} activos={3} color={ROSA} paso={34} s={0.4} /><Gente x={950} y={520} n={6} activos={6} color={AZUL_M} paso={24} s={0.3} />
            <Txt f="a" x={660} y={580} textAnchor="middle" fontSize={24} fill={c.texto}>1 a 1</Txt><Txt f="a" x={830} y={580} textAnchor="middle" fontSize={24} fill={c.texto}>Grupo</Txt><Txt f="a" x={1010} y={580} textAnchor="middle" fontSize={24} fill={c.texto}>1 a muchos</Txt></g>}
          {actual === 1 && <g opacity={e1(t, m('esfuerzo'))}>{(['Solo', 'Juntos', 'Por él'] as const).map((s, k) => <g key={s}><rect x={610 + k * 170} y={480 - 60 * (k + 1)} width={120} height={60 * (k + 1)} rx={12} fill={[GRIS, ROSA, VERDE][k]} /><Txt f="a" x={670 + k * 170} y={530} textAnchor="middle" fontSize={26} fill={c.texto}>{s}</Txt></g>)}</g>}
          {actual === 2 && <g opacity={e1(t, m('vivo'))}><Persona id={ID} x={650} y={470} s={0.4} /><Telefono x={780} y={420} s={0.5} /><Sobre x={900} y={410} s={0.8} /><g transform="translate(1030 410)"><rect x={-50} y={-36} width={100} height={72} rx={10} fill="#0b1220" /><circle r={16} fill={VIOLETA} /></g>
            <Txt f="a" x={840} y={560} textAnchor="middle" fontSize={26} fill={c.texto}>Presencial · teléfono · correo · video</Txt></g>}
          {actual === 3 && <g opacity={e1(t, m('grabado'))}>{(['Audio', 'Video', 'Texto'] as const).map((s, k) => <g key={s} transform={`translate(${680 + k * 160} 410)`}><rect x={-60} y={-60} width={120} height={120} rx={20} fill={[AMBAR, ROJO_M, AZUL_M][k]} />{k === 1 && <path d="M -14 -22 L 22 0 L -14 22 Z" fill="#fff" />}{k === 0 && <path d="M -20 10 V -10 M -6 20 V -20 M 8 14 V -14 M 22 6 V -6" stroke="#fff" strokeWidth={8} strokeLinecap="round" />}{k === 2 && [0, 1, 2].map((j) => <rect key={j} x={-30} y={-22 + j * 18} width={60} height={8} rx={4} fill="#fff" />)}<Txt f="a" x={0} y={110} textAnchor="middle" fontSize={26} fill={c.texto}>{s}</Txt></g>)}</g>}
          {actual === 4 && <g opacity={e1(t, m('velocidad'))}><Reloj x={840} y={400} r={100} t={t} vel={4} aro={TEAL} /><Txt f="a" x={840} y={570} textAnchor="middle" fontSize={26} fill={c.texto}>5 min · 1 h · 24 h · oficina · siempre</Txt></g>}
          <Letrero x={840} y={640} texto={COD[Math.max(0, Math.min(4, actual))][1]} fondo={COD[Math.max(0, Math.min(4, actual))][2]} id={ID} tam={30} />
        </g>
      </Toma>

      {/* 2 · Diez veces y un décimo */}
      <Toma t={t} a={m('diez')} b={m('combinando')} cy={470}>
        <g opacity={e1(t, m('diez'))}>
          <rect x={90} y={190} width={480} height={520} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <Txt x={330} y={290} textAnchor="middle" fontSize={84} fill={VIOLETA} peso={800}>×10</Txt>
          {[0, 1, 2, 3].map((k) => <Billete key={k} x={330 + (k - 1.5) * 50} y={380 - (k % 2) * 16} s={0.8} rot={-10 + k * 7} />)}
          <Persona id={ID} x={330} y={620} s={0.55} cuerpo={VIOLETA} corbata />
          <Letrero x={330} y={680} texto="Cómo se ve el premium" fondo={VIOLETA} id={ID} tam={26} />
        </g>
        {t >= m('decimo') && (
          <g opacity={e1(t, m('decimo'))}>
            <rect x={630} y={190} width={480} height={520} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <Txt x={870} y={290} textAnchor="middle" fontSize={84} fill={VERDE} peso={800}>÷10</Txt>
            <g transform="translate(870 470)"><Reloj x={0} y={0} r={70} t={0} aro={GRIS} /><path d="M -80 -80 L 80 80" stroke={ROJO_M} strokeWidth={14} strokeLinecap="round" /></g>
            <Letrero x={870} y={680} texto="Sin tu tiempo: escala" fondo={VERDE} id={ID} tam={26} />
          </g>
        )}
      </Toma>

      {/* 3 · Una solución, dos formas */}
      <Toma t={t} a={m('combinando')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('combinando'))} transform={`translate(600 ${480 + 6 * Math.sin(t * 1.4)})`}>
          <Cubo x={0} y={40} l={130} color={NARANJA} />
        </g>
        {t >= m('consultoria') && (
          <g opacity={e1(t, m('consultoria'))}>
            <Persona id={ID} x={220} y={640} s={0.6} cuerpo={VIOLETA} corbata /><Persona id={ID} x={330} y={640} s={0.6} cuerpo={GRIS} />
            <Letrero x={275} y={710} texto="Consultoría cara" fondo={VIOLETA} id={ID} tam={26} />
          </g>
        )}
        {t >= m('plantilla') && (
          <g opacity={e1(t, m('plantilla'))}>
            <Hoja x={900} y={380} w={140} h={180} lineas={6} color={VERDE} />
            {Array.from({ length: 18 }, (_, k) => <circle key={k} cx={790 + (k % 6) * 44} cy={560 + Math.floor(k / 6) * 40} r={14} fill={AZUL_M} opacity={sm(t, m('plantilla') + k * 0.05, m('plantilla') + k * 0.05 + 0.4)} />)}
            <Letrero x={900} y={710} texto="Plantilla para cientos" fondo={VERDE} id={ID} tam={26} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
