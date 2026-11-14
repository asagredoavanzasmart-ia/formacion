import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Escalon, Domino, Engranaje, Visto, Cruz, Sello, Persona, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Qué conservar.
 * Toma 1: la máquina de captar demanda: una escalera de cuatro escalones a la que se suman, uno a uno, las piezas que
 * se quedan (oferta de entrada, una frase, tráfico propio) con un visto; y las que se descartan (teatralidad, presión,
 * el primer día como todo el negocio) que caen tachadas.
 * Toma 2: el engranaje central (la arquitectura) que se conecta con cuatro engranajes: producto, venta consultiva,
 * marca y retención; si se copian solo las tácticas, el engranaje gira en falso.
 * Toma 3: el primer paso: tres casillas que se marcan: revisa tu escalera, escribe tu gran dominó, lista 50 y 50.
 */

const ID = 'br29', P = 'br-sintesis';

export const SintesisBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('sistema'), 'Un sistema para captar demanda'], [m('quedarse'), 'Lo que se queda'], [m('descartarse'), 'Lo que se descarta'],
    [m('conectas'), 'Conectado al negocio'], [m('revisa'), 'Tu primer paso'],
  ];
  const Q: [string, string][] = [['entrada', 'Oferta de entrada'], ['frase', 'Una sola frase'], ['propio', 'Tráfico propio']];
  const D = ['Teatralidad', 'Presión', 'El día uno es todo'];
  const conecta = sm(t, m('conectas'), m('conectas') + 1.5);
  const copia = t >= m('copias');

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Qué conservar">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Conservar y descartar */}
      <Toma t={t} a={0} b={m('conectas')} cy={470}>
        <g opacity={e1(t, m('sistema') - 0.3)}>
          {[0, 1, 2, 3].map((k) => <Escalon key={k} x={110 + k * 110} y={700} w={110} h={90 + k * 90} color={[GRIS, AZUL_M, VIOLETA, NARANJA][k]} op={t >= m('escalera') ? 1 : 0.35} />)}
          <Persona id={ID} x={lerp(165, 495, sm(t, m('escalera'), m('escalera') + 2))} y={lerp(610, 340, sm(t, m('escalera'), m('escalera') + 2))} s={0.5} cuerpo={TEAL} />
          {t >= m('escalera') && <Letrero x={330} y={760} texto="Escalera de valor completa" fondo={NARANJA} id={ID} tam={24} op={e1(t, m('escalera'))} />}
        </g>
        {Q.map(([n, txt], k) => t >= m(n) - 0.1 && (
          <g key={n} opacity={ventana(t, m(n), m('descartarse')) * 0.7 + 0.3 * e1(t, m(n))}>
            <rect x={620} y={220 + k * 90} width={360} height={70} rx={16} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
            <Visto x={660} y={255 + k * 90} r={22} />
            <Txt x={700} y={265 + k * 90} fontSize={28} fill={c.texto} peso={800}>{txt}</Txt>
          </g>
        ))}
        {t >= m('descartarse') && D.map((txt, k) => {
          const cae = sm(t, m('descartarse') + 0.4 + k * 0.4, m('descartarse') + 1.4 + k * 0.4);
          return (
            <g key={txt} opacity={e1(t, m('descartarse') + k * 0.3) * (1 - 0.45 * cae)}>
              <rect x={620} y={500 + k * 80} width={360} height={62} rx={16} fill={ROJO_M} opacity={0.18} />
              <Cruz x={660} y={531 + k * 80} r={20} />
              <Txt x={700} y={541 + k * 80} fontSize={26} fill={c.texto} peso={800}>{txt}</Txt>
              <rect x={694} y={529 + k * 80} width={250 * cae} height={5} rx={2} fill={ROJO_M} />
            </g>
          );
        })}
      </Toma>

      {/* 2 · Engranajes */}
      <Toma t={t} a={m('conectas')} b={m('revisa')} cy={470}>
        <g opacity={e1(t, m('conectas'))}>
          <Engranaje x={600} y={470} r={110} t={copia ? t * 3 : t} color={NARANJA} hueco={c.panel} />
          <Txt x={600} y={630} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>Embudo</Txt>
          {(['Producto', 'Venta consultiva', 'Marca', 'Retención'] as const).map((txt, k) => {
            const a = (k / 4) * Math.PI * 2 - Math.PI / 4;
            const d = lerp(420, 235, conecta);
            const x = 600 + Math.cos(a) * d * 1.35, y = 470 + Math.sin(a) * d * 0.95;
            return (
              <g key={txt} opacity={copia ? 0.3 : 1}>
                <Engranaje x={x} y={y} r={66} t={-t * 1.6} color={[AZUL_M, VIOLETA, ROSA, VERDE][k]} hueco={c.panel} />
                <Txt x={x} y={y + (Math.sin(a) > 0 ? 100 : -90)} textAnchor="middle" fontSize={26} fill={c.texto} peso={800}>{movil ? txt.split(' ')[0] : txt}</Txt>
              </g>
            );
          })}
          {t >= m('conectas') + 1.2 && !copia && <Letrero x={600} y={805} texto="Máquina comercial" fondo={VERDE} id={ID} tam={28} op={e1(t, m('conectas') + 1.2)} />}
          {copia && <Letrero x={600} y={805} texto={movil ? 'Gira en falso' : 'Solo tácticas: gira en falso'} fondo={ROJO_M} id={ID} tam={28} op={e1(t, m('copias'))} />}
        </g>
      </Toma>

      {/* 3 · El primer paso */}
      <Toma t={t} a={m('revisa')} b={fin + 1} cy={470}>
        {([['revisa', 'Revisa tu escalera de valor'], ['domino', 'Escribe tu gran dominó y tres dudas'], ['lista', 'Lista 50 lugares y 50 frases']] as const).map(([n, txt], k) => (
          <g key={n} opacity={t >= m(n) - 0.1 ? e1(t, m(n)) : 0.15}>
            <rect x={160} y={240 + k * 160} width={880} height={120} rx={24} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
            <rect x={200} y={270 + k * 160} width={60} height={60} rx={14} fill={c.panel2} />
            {t >= m(n) + 0.5 && <Visto x={230} y={300 + k * 160} r={26} op={e1(t, m(n) + 0.5)} />}
            <Txt x={290} y={312 + k * 160} fontSize={movil ? 30 : 32} fill={c.texto} peso={800}>{movil ? ['Revisa tu escalera', 'Tu gran dominó', 'Lista 50 y 50'][k] : txt}</Txt>
            {n === 'domino' && t >= m(n) && <Domino x={955} y={350 + k * 160} h={70} cae={sm(t, m(n) + 0.5, m(n) + 1.5)} color={NARANJA} puntos={2} />}
          </g>
        ))}
      </Toma>
    </Lienzo>
  );
};
