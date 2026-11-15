import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Txt, Cifra, Persona, Edificio, Calendario, Cubo, Pala, Navegador, Tarjeta, Conector, Pastilla, Visto, Globo, pop, sm, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS, TEAL } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * El sueño cien (Chet Holmes).
 * Toma 1: el ranking de quince revistas con la de Holmes al fondo; doscientos puntos representan los 2.000
 * anunciantes, se encienden los 167 que importan y una dona muestra que gastan el 95 % del presupuesto.
 * Toma 2: Holmes envía un paquete cada quince días por una cinta hacia seis empresas; meses sin respuesta hasta que
 * Xerox se enciende, luego casi treinta, y su revista sube del puesto 15 al 1.
 * Toma 3: dónde ya está reunido tu cliente: por intereses (un referente con su órbita de seguidores) y por búsqueda
 * (frases que se escriben); el mapa de 185 fuentes y 30 millones, y el pozo que se cava antes de tener sed.
 */

const ID = 'br14', P = 'br-sueno';

export const SuenoBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const E = (n: string, d = 0.5, extra = 0) => (t >= m(n) + extra - 0.05 ? Math.min(1, pop(t, m(n) + extra, d)) : 0);
  const rot: [number, string][] = [
    [m('holmes'), 'Chet Holmes'], [m('dosmil'), 'Los que importan'], [m('paquete'), 'Constancia'],
    [m('xerox'), 'La primera respuesta'], [m('reunidos'), 'Ya están reunidos'], [m('pozo'), 'Antes de tener sed'],
  ];
  const IMP = [3, 17, 22, 38, 41, 59, 66, 77, 85, 92, 104, 118, 127, 141, 156, 173, 188];
  const dona = sm(t, m('noventa'), m('noventa') + 1.4);
  const sube = sm(t, m('primero'), m('primero') + 1.6);
  const puesto = Math.round(lerp(15, 1, sube));
  const encendidas = (k: number) => (k === 0 ? sm(t, m('xerox'), m('xerox') + 0.6) : sm(t, m('treinta') + k * 0.25, m('treinta') + k * 0.25 + 0.5));
  const envio = ((t - m('paquete')) * 0.45) % 1;
  const EMP: [number, number][] = [[640, 470], [800, 470], [960, 470], [640, 690], [800, 690], [960, 690]];

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="El sueño cien">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · El ranking y los que importan */}
      <Toma t={t} a={0} b={m('paquete')} cy={470}>
        <Tarjeta x={60} y={200} w={250} h={560} titulo={movil ? '15 revistas' : '15 revistas'} c={c} id={ID} op={E('revista', 0.6, -0.4)} acento={GRIS} tam={24}>
          {Array.from({ length: 15 }, (_, k) => <g key={k}><rect x={30} y={76 + k * 31} width={190} height={22} rx={8} fill={k === 14 ? NARANJA : c.panel2} /><Txt x={44} y={93 + k * 31} fontSize={16} fill={k === 14 ? '#fff' : c.tenue} peso={800}>{`#${k + 1}`}</Txt></g>)}
        </Tarjeta>
        <Pastilla x={185} y={790} texto="Holmes: último" fondo={NARANJA} tam={22} op={E('ultimo')} />
        <Tarjeta x={350} y={200} w={420} h={430} titulo={movil ? '2.000 anunciantes' : '2.000 anunciantes posibles'} c={c} id={ID} op={E('dosmil', 0.6, -0.3)} tam={24}>
          {Array.from({ length: 200 }, (_, k) => <circle key={k} cx={40 + (k % 20) * 18} cy={100 + Math.floor(k / 20) * 30} r={6} fill={IMP.includes(k) && t >= m('ciento') ? NARANJA : c.apagado} opacity={IMP.includes(k) && t >= m('ciento') ? sm(t, m('ciento') + IMP.indexOf(k) * 0.05, m('ciento') + IMP.indexOf(k) * 0.05 + 0.3) * 0.7 + 0.3 : 1} />)}
          <Pastilla x={210} y={400} texto="167 de 2.000" fondo={NARANJA} tam={26} op={E('ciento', 0.5, 0.8)} />
        </Tarjeta>
        <g opacity={E('noventa', 0.6, -0.3)}>
          <circle cx={950} cy={420} r={130} fill="none" stroke={c.apagado} strokeWidth={60} />
          <circle cx={950} cy={420} r={130} fill="none" stroke={NARANJA} strokeWidth={60} pathLength={1} strokeDasharray={`${0.95 * dona} 1`} transform="rotate(-90 950 420)" />
          <Cifra x={950} y={440} valor={95} u={dona} suf=" %" tam={52} color={NARANJA} />
          <Txt x={950} y={610} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>{movil ? 'del presupuesto' : 'del presupuesto de la industria'}</Txt>
        </g>
        <Conector x1={770} y1={420} x2={820} y2={420} u={E('noventa')} t={t} color={NARANJA} puntos={2} />
      </Toma>

      {/* 2 · Un paquete cada quince días */}
      <Toma t={t} a={m('paquete')} b={m('reunidos')} cy={470}>
        <Persona id={ID} x={140} y={640} s={0.85} cuerpo={NARANJA} />
        <Pastilla x={140} y={700} texto="Holmes" fondo={NARANJA} tam={22} op={E('paquete')} />
        <rect x={210} y={600} width={340} height={22} rx={11} fill={c.apagado} opacity={E('paquete')} />
        {t >= m('paquete') && sube < 0.2 && <g transform={`translate(${lerp(230, 560, envio)} ${600 - 30 * Math.sin(Math.PI * envio)})`} opacity={Math.sin(Math.PI * envio)}><rect x={-26} y={-40} width={52} height={40} rx={6} fill="#d97706" /><path d="M -26 -24 H 26" stroke="#92400e" strokeWidth={4} /></g>}
        {EMP.map(([x, y], k) => {
          const on = encendidas(k);
          return (
            <g key={k} opacity={E('paquete', 0.5, 0.2 + k * 0.1)}>
              <Edificio x={x} y={y} w={100} h={150} color={on > 0.5 ? VERDE : GRIS} />
              {on > 0.5 && <Visto x={x + 40} y={y - 170} r={18} op={on} />}
              {k === 0 && on > 0.3 && <Pastilla x={x} y={y + 30} texto="Xerox" fondo={VERDE} tam={22} op={on} />}
            </g>
          );
        })}
        <g opacity={E('cuatro') * (1 - sm(t, m('xerox'), m('xerox') + 0.5))}><Calendario x={360} y={360} s={0.8} marcados={8} /><Txt x={360} y={470} textAnchor="middle" fontSize={24} fill={c.tenue} peso={800}>{movil ? '4 meses' : '4 meses sin respuesta'}</Txt></g>
        <Pastilla x={360} y={300} texto={movil ? '≈ 30 clientes' : 'Casi 30 en seis meses'} fondo={VERDE} tam={24} op={E('treinta')} />
        <g opacity={E('primero')}>
          <rect x={300} y={720} width={240} height={90} rx={18} fill={c.panel} style={sombra(0.14, 4, 10)} />
          <Txt x={420} y={780} textAnchor="middle" fontSize={44} fill={sube > 0.9 ? VERDE : NARANJA} peso={800}>{`Puesto #${puesto}`}</Txt>
        </g>
      </Toma>

      {/* 3 · Dónde ya están reunidos */}
      <Toma t={t} a={m('reunidos')} b={fin + 1} cy={470}>
        <Tarjeta x={80} y={190} w={480} h={340} titulo="Por intereses" c={c} id={ID} op={E('intereses')} acento={VIOLETA} tam={24}>
          <Persona id={ID} x={240} y={240} s={0.75} cuerpo={VIOLETA} corbata />
          {Array.from({ length: 9 }, (_, k) => { const a = t * 0.6 + (k / 9) * Math.PI * 2; return <circle key={k} cx={240 + 180 * Math.cos(a)} cy={190 + 70 * Math.sin(a)} r={14} fill={[NARANJA, ROSA, AZUL_M][k % 3]} opacity={0.85} />; })}
        </Tarjeta>
        <g opacity={E('busqueda')}>
          <Navegador x={640} y={190} w={480} h={340} c={c} texto={'cómo conseguir clientes'.slice(0, Math.max(0, Math.floor((t - m('busqueda')) * 10)))}>
            {[0, 1, 2].map((k) => <g key={k} opacity={sm(t, m('busqueda') + 1.5 + k * 0.4, m('busqueda') + 1.9 + k * 0.4)}><rect x={30} y={80 + k * 80} width={420} height={60} rx={12} fill={c.panel2} /><rect x={50} y={98 + k * 80} width={260} height={12} rx={6} fill={AZUL_M} opacity={0.6} /><rect x={50} y={118 + k * 80} width={180} height={8} rx={4} fill={c.apagado} /></g>)}
          </Navegador>
        </g>
        <g opacity={E('mapeo')}>
          <Globo x={240} y={690} r={100} t={t} c={c} pins={Array.from({ length: 12 }, (_, k) => [k * 30, (k % 5) * 12 - 20] as [number, number])} n={Math.round(12 * sm(t, m('mapeo'), m('mapeo') + 2))} />
          <Cifra x={470} y={660} valor={185} u={sm(t, m('mapeo'), m('mapeo') + 1.2)} tam={40} color={VIOLETA} suf=" fuentes" />
          <Cifra x={470} y={720} valor={30} u={sm(t, m('mapeo'), m('mapeo') + 1.2)} tam={34} color={c.texto} suf=" millones" />
        </g>
        {t >= m('pozo') - 0.1 && (() => {
          const agua = sm(t, m('pozo') + 0.8, m('pozo') + 3);
          const palada = (t * 0.9) % 1;
          return (
            <g opacity={E('pozo')}>
              {/* Pozo de piedra con techo y balde */}
              <rect x={800} y={600} width={14} height={140} rx={5} fill="#92400e" />
              <rect x={986} y={600} width={14} height={140} rx={5} fill="#92400e" />
              <path d="M 780 606 L 900 556 L 1020 606 Z" fill="#b45309" />
              <path d="M 900 556 L 1020 606 H 900 Z" fill="#000" opacity={0.15} />
              <rect x={810} y={624} width={180} height={8} rx={4} fill="#78350f" />
              <path d={`M 900 632 V ${662 + 8 * Math.sin(t * 2)}`} stroke="#78350f" strokeWidth={3} />
              <path d={`M 886 ${662 + 8 * Math.sin(t * 2)} h 28 l -4 22 h -20 Z`} fill="#64748b" />
              <ellipse cx={900} cy={742} rx={112} ry={30} fill="#78716c" />
              <ellipse cx={900} cy={740} rx={88} ry={20} fill="#1e293b" />
              <ellipse cx={900} cy={740} rx={88 * agua} ry={20 * agua} fill="#3b82f6" opacity={0.9} />
              <path d="M 788 742 V 786 Q 900 820 1012 786 V 742 Q 900 774 788 742 Z" fill="#a8a29e" />
              {[0, 1, 2, 3].map((k) => <rect key={k} x={806 + k * 50} y={756 + (k % 2) * 14} width={40} height={12} rx={4} fill="#78716c" opacity={0.6} />)}
              {/* Quien cava, con la pala en movimiento y tierra que salta */}
              <Persona id={ID} x={1090} y={790} s={0.6} cuerpo={NARANJA} />
              <Pala x={1040} y={700} s={0.42} rot={-35 + 22 * Math.sin(t * 3.4)} />
              {[0, 1, 2].map((k) => { const p = (palada + k / 3) % 1; return <circle key={k} cx={1020 + 60 * p} cy={760 - 70 * Math.sin(Math.PI * p)} r={6} fill="#92400e" opacity={1 - p} />; })}
              <Pastilla x={900} y={834} texto={movil ? 'Cava antes' : 'Cavar el pozo antes de tener sed'} fondo={AZUL_M} tam={22} />
            </g>
          );
        })()}
        <Conector x1={320} y1={530} x2={290} y2={590} u={E('mapeo')} t={t} color={VIOLETA} puntos={2} grosor={4} />
      </Toma>
    </Lienzo>
  );
};
