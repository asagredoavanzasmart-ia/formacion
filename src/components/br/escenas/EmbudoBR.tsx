import React from 'react';
import { useEscenaBR, Lienzo, Toma, Rotulo, Letrero, Txt, Cifra, Barra, Regalo, Curva, EtiquetaPrecio, Sobre, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, ROJO_M, AMBAR, VIOLETA, GRIS } from './kitBR';
import type { PropsCE } from './kitBR';

/**
 * Regalar para calificar: el experimento de los cien visitantes.
 * Toma 1: una grilla de cien visitantes; vendiendo directo se enciende uno solo (197 dólares, un cliente). Luego un regalo
 * con envío: se encienden ocho, y de ellos dos pasan a comprar el producto. Dos pares de barras comparan ingresos y
 * clientes.
 * Toma 2: el precio cero: una curva de demanda que salta al llegar a cero, más el aviso del costo de envío a la vista.
 */

const ID = 'br04', P = 'br-embudo';

export const EmbudoBR: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaBR(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('recorrido'), 'El embudo: un recorrido'], [m('experimento'), 'Cien visitantes'], [m('regalo'), 'Regalar con envío'],
    [m('resultado'), 'El doble y ocho clientes'], [m('ariely'), 'El precio cero'], [m('avisar'), 'El envío, a la vista'],
  ];
  const modo = t >= m('regalo') ? 2 : t >= m('enviaba') ? 1 : 0;
  const ocho = sm(t, m('ocho'), m('ocho') + 1.2) * 8;
  const dos = sm(t, m('cuarta'), m('cuarta') + 1) * 2;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Regalar para calificar">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · Cien visitantes */}
      <Toma t={t} a={0} b={m('ariely')} cy={470}>
        <g opacity={e1(t, m('experimento') - 0.3)}>
          <rect x={80} y={170} width={500} height={540} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          {Array.from({ length: 100 }, (_, k) => {
            const i = k % 10, j = Math.floor(k / 10);
            const enc1 = modo === 1 && k === 44 && t >= m('uno');
            const enc2 = modo === 2 && k < Math.floor(ocho) && k % 1 === 0;
            const compra = modo === 2 && k < Math.floor(dos) * 4 && k % 4 === 0;
            const col = compra ? VERDE : enc2 ? NARANJA : enc1 ? VERDE : c.apagado;
            const pos = enc2 || enc1 ? [130 + (k % 8) * 54, 230 + 0] : [130 + i * 44, 240 + j * 44];
            return <circle key={k} cx={130 + i * 44} cy={250 + j * 44} r={enc1 || enc2 ? 17 : 14} fill={col} opacity={pos ? 1 : 1} />;
          })}
          <Txt x={330} y={210} textAnchor="middle" fontSize={26} fill={c.tenue}>100 visitantes</Txt>
          {modo === 1 && t >= m('uno') && <Letrero x={330} y={760} texto="Vendiendo directo: 1 %" fondo={GRIS} id={ID} tam={26} op={e1(t, m('uno'))} />}
          {modo === 2 && <Letrero x={330} y={760} texto={t >= m('cuarta') ? '8 piden · 2 compran' : t >= m('ocho') ? '8 piden el regalo' : 'Regalo + envío'} fondo={NARANJA} id={ID} tam={26} op={e1(t, m('regalo'))} />}
        </g>
        {t >= m('regalo') && (
          <g opacity={e1(t, m('regalo'))}>
            <Regalo x={720} y={330} s={0.9} color={ROSA} />
            {t >= m('envio') && <EtiquetaPrecio x={790} y={280} texto="Envío" color={AMBAR} tam={24} t={t} bal={1} op={e1(t, m('envio'))} />}
          </g>
        )}
        {t >= m('resultado') && (
          <g opacity={e1(t, m('resultado'))}>
            <rect x={640} y={420} width={480} height={290} rx={24} fill={c.panel} style={sombra(c.sombra, 3, 10)} />
            <rect x={660} y={660} width={440} height={6} rx={3} fill={c.apagado} />
            <Barra x={720} y={660} w={80} hMax={180} valor={197} max={394} u={sm(t, m('resultado'), m('resultado') + 1)} color={GRIS} rotulo="Directo" c={c} suf="" />
            <Barra x={830} y={660} w={80} hMax={180} valor={394} max={394} u={sm(t, m('resultado'), m('resultado') + 1.4)} color={VERDE} rotulo="Regalo" c={c} suf="" />
            <Barra x={960} y={660} w={60} hMax={180} valor={1} max={8} u={sm(t, m('resultado') + 0.5, m('resultado') + 1.5)} color={GRIS} rotulo="1" c={c} suf="" />
            <Barra x={1050} y={660} w={60} hMax={180} valor={8} max={8} u={sm(t, m('resultado') + 0.5, m('resultado') + 1.9)} color={NARANJA} rotulo="8" c={c} suf="" />
            {!movil && <Txt f="a" x={815} y={460} textAnchor="middle" fontSize={22} fill={c.tenue}>Dólares</Txt>}
            {!movil && <Txt f="a" x={1005} y={460} textAnchor="middle" fontSize={22} fill={c.tenue}>Clientes</Txt>}
          </g>
        )}
        {t >= m('doble') && <Letrero x={880} y={760} texto="El doble · ocho clientes" fondo={VERDE} id={ID} tam={28} op={e1(t, m('doble'))} />}
      </Toma>

      {/* 2 · El precio cero */}
      <Toma t={t} a={m('ariely')} b={fin + 1} cy={470}>
        <g opacity={e1(t, m('ariely'))}>
          <rect x={150} y={180} width={640} height={560} rx={30} fill={c.panel} style={sombra(c.sombra, 4, 12)} />
          <rect x={220} y={660} width={520} height={6} rx={3} fill={c.apagado} />
          <rect x={220} y={240} width={6} height={426} rx={3} fill={c.apagado} />
          <Txt x={480} y={710} textAnchor="middle" fontSize={26} fill={c.tenue}>Precio →</Txt>
          <Curva pts={[[700, 620], [560, 590], [420, 560], [290, 530]]} u={sm(t, m('ariely') + 0.3, m('ariely') + 1.3)} color={GRIS} grosor={9} />
          {t >= m('cero') && <Curva pts={[[290, 530], [250, 300]]} u={sm(t, m('cero'), m('cero') + 0.8)} color={NARANJA} grosor={11} />}
          {t >= m('cero') && <Letrero x={420} y={300} texto="Precio cero" fondo={NARANJA} id={ID} tam={28} op={e1(t, m('cero') + 0.4)} />}
          <Txt x={470} y={232} textAnchor="middle" fontSize={24} fill={c.tenue}>Demanda</Txt>
          {!movil && <Txt f="a" x={470} y={772} textAnchor="middle" fontSize={22} fill={c.tenue}>Shampanier, Mazar y Ariely, 2007</Txt>}
        </g>
        {t >= m('avisar') && (
          <g opacity={e1(t, m('avisar'))}>
            <Sobre x={960} y={420} s={1.3} abre={sm(t, m('avisar'), m('avisar') + 1)} color={AZUL_M} />
            <EtiquetaPrecio x={880} y={560} texto="Envío visible" color={VERDE} tam={26} t={t} bal={1} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
