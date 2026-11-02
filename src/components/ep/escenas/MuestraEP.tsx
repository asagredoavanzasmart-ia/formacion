import React from 'react';
import { useEscenaEP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Telefono, Auto, Pin, Corazon, Cifra, Suelo, Reloj, tono, e1, sm, lerp, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, GRIS, AMBAR, useMovil } from './kitEP';
import type { PropsCE } from './kitEP';

/**
 * Somos una muestra de uno.
 * 1 · La selfie con el botón de volumen y el gesto de Wozniak; luego tres maneras de usar Waze: con destino, sin destino (20 %)
 *     y buscar la ruta y cerrar (10 %); el taxista de Chile desplaza el mapa.
 * 2 · El primer beso: un estallido que no se repite; quien crea el producto ya lo usó mil veces.
 * 3 · Poca atención: un teléfono cada doce minutos, ochenta aplicaciones y solo nueve abiertas al día; observar al usuario nuevo.
 */

const ID = 'ep20', P = 'ep-muestra';

export const MuestraEP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaEP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('humildad'), 'Una muestra de uno'], [m('selfie'), 'La selfie'], [m('destino'), 'Cada quien la usa distinto'], [m('chile'), 'En Chile'],
    [m('primera'), 'El usuario de primera vez'], [m('doce'), 'Muy poca atención'], [m('observar'), 'Observar sin ayudar'],
  ];
  const USOS = [{ k: 'destino', t: 'Con destino', col: NARANJA, p: '' }, { k: 'veinte', t: 'Sin destino', col: ROSA, p: '20 %' }, { k: 'diez', t: 'Buscar y cerrar', col: AZUL_M, p: '10 %' }];
  const apps = Math.round(80 * sm(t, m('ochenta'), m('ochenta') + 2));

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Somos una muestra de uno">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · la selfie y los usos */}
      <Toma t={t} a={0} b={m('primera')} cy={470}>
        {t < m('destino') ? <g>
          <Persona id={ID} x={420} y={680} s={1} cuerpo={NARANJA} />
          <g transform={`translate(560 ${440}) rotate(-12)`}><Telefono x={0} y={0} s={0.55} widgets={0} op={e1(t, m('selfie'))} /><circle cx={-58} cy={-30} r={9} fill={ROSA} opacity={0.5 + 0.5 * Math.sin(t * 6)} /></g>
          {t >= m('wozniak') && <g opacity={e1(t, m('wozniak'))}><Persona id={ID} x={860} y={680} s={1} cuerpo={AZUL_M} /><Letrero x={860} y={750} texto="Steve Wozniak" fondo={AZUL_M} id={ID} tam={26} /><Letrero x={860} y={340} texto="¡Como una cámara!" id={ID} tam={26} /></g>}
          {t >= m('distintos') && <Letrero x={600} y={190} texto="Ninguna forma es la correcta" fondo={GRIS} id={ID} op={e1(t, m('distintos'))} tam={26} />}
        </g> : <g>
          {USOS.map((u, k) => t >= m(u.k) && (
            <g key={u.k} opacity={e1(t, m(u.k))} transform={`translate(${220 + k * 380} 430)`}>
              <Telefono x={0} y={0} s={0.9} widgets={0} />
              <g transform="scale(0.9)">
                <rect x={-48} y={-94} width={96} height={188} rx={12} fill="#e0f2fe" />
                <path d="M -30 70 Q -10 0 10 -20 T 30 -70" stroke={k === 0 ? u.col : '#94a3b8'} strokeWidth={7} fill="none" opacity={k === 2 && Math.sin(t * 2) > 0 ? 0.2 : 1} />
                {k === 0 && <Pin x={30} y={-66} s={0.6} color={u.col} />}
                {k === 1 && <circle cx={0} cy={0} r={14 + 4 * Math.sin(t * 4)} fill="#fbbf24" />}
              </g>
              <Txt f="a" x={0} y={160} textAnchor="middle" fontSize={28} fill={c.texto}>{u.t}</Txt>
              {u.p && <Txt x={0} y={-130} textAnchor="middle" fontSize={44} fill={u.col}>{u.p}</Txt>}
            </g>
          ))}
          {t >= m('chile') && <g opacity={e1(t, m('chile'))}><Auto x={600} y={780} s={0.55} color="#fbbf24" /><Letrero x={880} y={760} texto="Taxis en Chile: mapa abierto" fondo={AMBAR} id={ID} tam={22} /></g>}
        </g>}
      </Toma>

      {/* 2 · el primer beso */}
      <Toma t={t} a={m('primera')} b={m('doce')} cy={470}>
        <Persona id={ID} x={500} y={660} s={0.9} cuerpo={NARANJA} />
        <Persona id={ID} x={700} y={660} s={0.9} cuerpo={ROSA} />
        {t >= m('beso') && <g>
          {Array.from({ length: 10 }, (_, k) => { const a = k * Math.PI / 5; const r = 60 + 140 * sm(t, m('beso'), m('beso') + 1.2); return <circle key={k} cx={600 + Math.cos(a) * r} cy={360 + Math.sin(a) * r * 0.7} r={10} fill={[NARANJA, ROSA, '#fbbf24'][k % 3]} opacity={1 - sm(t, m('beso') + 1, m('beso') + 2.2)} />; })}
          <Corazon x={600} y={330} s={1.4} op={e1(t, m('beso'))} />
          <Letrero x={600} y={740} texto="Solo se vive una vez" id={ID} op={e1(t, m('beso') + 0.6)} />
        </g>}
        {t >= m('nuevo') && <g opacity={e1(t, m('nuevo'))}><Persona id={ID} x={1020} y={660} s={0.6} cuerpo={VIOLETA} /><Letrero x={1020} y={720} texto="Quien lo creó" fondo={VIOLETA} id={ID} tam={22} /></g>}
      </Toma>

      {/* 3 · poca atención */}
      <Toma t={t} a={m('doce')} b={fin + 1} cy={470}>
        <Reloj x={220} y={380} r={100} t={t} vel={2} aro={AZUL_M} />
        <Letrero x={220} y={540} texto="Cada 12 minutos" fondo={AZUL_M} id={ID} op={e1(t, m('doce'))} tam={24} />
        {t >= m('ochenta') && <g opacity={e1(t, m('ochenta'))}>
          {Array.from({ length: 80 }, (_, k) => k < apps && <rect key={k} x={430 + (k % 10) * 56} y={180 + Math.floor(k / 10) * 56} width={44} height={44} rx={10} fill={t >= m('nueve') && k < 9 ? NARANJA : c.apagado} />)}
          <Cifra x={710} y={680} valor={apps} u={1} color={c.texto} tam={60} />
          <Txt f="a" x={710} y={715} textAnchor="middle" fontSize={24} fill={c.tenue}>aplicaciones instaladas</Txt>
        </g>}
        {t >= m('nueve') && <Letrero x={1060} y={240} texto="9 al día" id={ID} op={e1(t, m('nueve'))} />}
        {t >= m('observar') && <Letrero x={600} y={790} texto="Observar al usuario nuevo, sin ayudarle" fondo={VERDE} id={ID} op={e1(t, m('observar'))} tam={26} />}
      </Toma>
    </Lienzo>
  );
};
