import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Burbuja, Ficha, Calendario, Telefono, Propuesta, Corazon, Cifra, Visto, Cruz, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Personalizar con respeto.
 * Toma 1: el megáfono que le habla al grupo frente a la conversación de uno a uno; las diez tablas de Susan Cohen
 * (en Newell) y el escudo de la privacidad; el ojo que vigila se tacha.
 * Toma 2 (John McKean, en Newell): el anillo que se llena hasta el 70 % con un corazón: sentirse un ser humano.
 * Toma 3: la pregunta antes de cada campaña (dato → acción); el contrato que vence en marzo y la llamada de febrero;
 * la distribuidora (ejemplo ilustrativo): la misma promo a la imprenta y a la notaría, y la llamada a tiempo.
 * Toma 4: la regla de respeto — la ficha con candado, la mano que pide permiso y el regalo a cambio; quien se siente
 * vigilado se va y lo cuenta.
 */

const ID = 'cp13', P = 'cp-personalizar';

export const PersonalizarCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('recursos'), 'Segmentar sirve para los recursos'], [m('reemplaza'), 'Pero no reemplaza el trato'], [m('mandamientos'), 'Diez mandamientos'], [m('vigila'), 'Conocer, no vigilar'],
    [m('mckean'), 'John McKean'], [m('tactica'), 'La pregunta antes de cada campaña'], [m('marzo'), 'El dato que sirve'], [m('distribuidora'), 'Ejemplo ilustrativo'],
    [m('respeto'), 'Una regla de respeto'], [m('seva'), 'El que se siente vigilado se va'],
  ];
  const anillo = sm(t, m('humano') - 0.6, m('humano') + 1.2);
  const r70 = (u: number) => { const a = u * 0.7 * Math.PI * 2; return `M 0 -150 A 150 150 0 ${a > Math.PI ? 1 : 0} 1 ${150 * Math.sin(a - 0.0001)} ${-150 * Math.cos(a - 0.0001)}`; };

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Personalizar con respeto">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · el grupo, el trato personal y la privacidad */}
      <Toma t={t} a={0} b={m('mckean')} cy={480}>
        {ventana(t, 0, m('mandamientos')) > 0.01 && (
          <g opacity={ventana(t, 0, m('mandamientos'))}>
            <g transform="translate(260 480)"><path d="M -60 -30 L 60 -80 V 80 L -60 30 Z" fill={GRIS} /><rect x={-90} y={-30} width={34} height={60} rx={8} fill="#475569" /></g>
            {[0, 1, 2, 3].map((k) => <Persona key={k} id={ID} x={480 + k * 70} y={620} s={0.45} cuerpo={GRIS} />)}
            {t >= m('reemplaza') && (
              <g opacity={e1(t, m('reemplaza'))}>
                <Persona id={ID} x={860} y={640} s={0.7} cuerpo={NARANJA} /><Persona id={ID} x={1040} y={640} s={0.7} corbata cuerpo={VIOLETA} />
                <Corazon x={950} y={420} s={0.8} />
                <Letrero x={950} y={760} texto="Trato personal" fondo={VERDE} id={ID} tam={28} />
              </g>
            )}
            <Letrero x={420} y={760} texto="Un mensaje para el grupo" fondo={GRIS} id={ID} tam={28} op={e1(t, m('recursos'))} />
          </g>
        )}
        {t >= m('mandamientos') && (
          <g opacity={e1(t, m('mandamientos'))}>
            {[0, 1].map((k) => (
              <g key={k} transform={`translate(${330 + k * 200} 470)`}>
                <path d="M -90 160 V -100 Q -90 -170 0 -170 Q 90 -170 90 -100 V 160 Z" fill={isDark ? '#6b7280' : '#9ca3af'} />
                {[0, 1, 2, 3, 4].map((j) => <rect key={j} x={-60} y={-110 + j * 52} width={120} height={14} rx={7} fill="#fff" opacity={0.75} />)}
              </g>
            ))}
            {t >= m('privacidad') && <g opacity={e1(t, m('privacidad'))} transform="translate(900 440)"><path d="M 0 -110 L 90 -76 V 6 Q 90 80 0 120 Q -90 80 -90 6 V -76 Z" fill={AZUL_M} /><rect x={-28} y={-10} width={56} height={44} rx={8} fill="#fff" /><path d="M -16 -10 V -30 A 16 16 0 0 1 16 -30 V -10" stroke="#fff" strokeWidth={8} fill="none" /></g>}
            {t >= m('vigila') && <g opacity={e1(t, m('vigila'))} transform="translate(900 700)"><ellipse rx={60} ry={30} fill="#fff" /><circle r={20} fill="#334155" /><Cruz x={0} y={0} r={36} /></g>}
            <Txt f="a" x={430} y={700} textAnchor="middle" fontSize={26} fill={c.texto}>Susan Cohen, en Newell</Txt>
          </g>
        )}
      </Toma>

      {/* 2 · McKean: el 70 % es hacer sentir humano */}
      <Toma t={t} a={m('mckean')} b={m('tactica')} cy={460}>
        <g transform="translate(600 460)">
          <circle r={150} fill="none" stroke={c.apagado} strokeWidth={40} />
          {anillo > 0.01 && <path d={r70(anillo)} stroke={ROSA} strokeWidth={40} fill="none" />}
          <Corazon x={0} y={-10} s={1.2} op={e1(t, m('humano'))} />
        </g>
        <Cifra x={600} y={720} valor={70} u={anillo} pre="Cerca del " suf=" %" tam={52} color={ROSA} />
        {t >= m('simple') && <Letrero x={600} y={800} texto="La idea más simple, y la más olvidada" id={ID} tam={28} op={e1(t, m('simple'))} />}
      </Toma>

      {/* 3 · la pregunta y los ejemplos */}
      <Toma t={t} a={m('tactica')} b={m('respeto')} cy={480}>
        {ventana(t, m('tactica'), m('distribuidora')) > 0.01 && (
          <g opacity={ventana(t, m('tactica'), m('distribuidora'))}>
            <Ficha x={260} y={360} s={1.6} />
            <path d="M 360 360 H 520" stroke={GRIS} strokeWidth={10} strokeLinecap="round" opacity={e1(t, m('distinto'))} /><path d="M 520 340 L 550 360 L 520 380 Z" fill={GRIS} opacity={e1(t, m('distinto'))} />
            <Txt x={680} y={380} textAnchor="middle" fontSize={64} fill={NARANJA} opacity={e1(t, m('distinto'))}>?</Txt>
            {t >= m('sobra') && t < m('marzo') && <Letrero x={600} y={560} texto="Si no cambia nada, el dato sobra" fondo={GRIS} id={ID} tam={28} op={e1(t, m('sobra'))} />}
            {t >= m('marzo') && (
              <g opacity={e1(t, m('marzo'))}>
                <Calendario x={420} y={600} s={0.9} marcados={2} />
                <Txt f="a" x={420} y={720} textAnchor="middle" fontSize={26} fill={c.texto}>Vence en marzo</Txt>
                <Telefono x={780} y={600} s={0.8} />
                <Txt f="a" x={780} y={740} textAnchor="middle" fontSize={26} fill={c.texto}>Llamada en febrero</Txt>
                <Visto x={900} y={330} r={34} />
              </g>
            )}
          </g>
        )}
        {t >= m('distribuidora') && (
          <g opacity={e1(t, m('distribuidora'))}>
            <g transform="translate(300 620)"><rect x={-110} y={-200} width={220} height={200} rx={12} fill={AZUL_M} /><Txt f="a" x={0} y={40} textAnchor="middle" fontSize={26} fill={c.texto}>Imprenta</Txt></g>
            <g transform="translate(900 620)"><rect x={-110} y={-200} width={220} height={200} rx={12} fill={VIOLETA} /><Txt f="a" x={0} y={40} textAnchor="middle" fontSize={26} fill={c.texto}>Notaría</Txt></g>
            {t < m('trimestre') && [300, 900].map((x, k) => <Propuesta key={x} x={lerp(600, x, sm(t, m('imprenta') + 0.3 * k, m('imprenta') + 0.3 * k + 1))} y={lerp(260, 380, sm(t, m('imprenta'), m('imprenta') + 1))} s={0.6} />)}
            {t >= m('trimestre') && <g opacity={e1(t, m('trimestre'))}><Telefono x={560} y={430} s={0.6} /><path d="M 620 430 Q 500 360 400 440" stroke={VERDE} strokeWidth={6} fill="none" strokeDasharray="10 10" /><Visto x={300} y={340} r={30} /></g>}
            {t >= m('ninguno') && <Letrero x={600} y={790} texto="Eso es personalizar" fondo={VERDE} id={ID} tam={28} op={e1(t, m('ninguno'))} />}
          </g>
        )}
      </Toma>

      {/* 4 · la regla de respeto */}
      <Toma t={t} a={m('respeto')} b={fin + 1} cy={480}>
        <Persona id={ID} x={220} y={760} s={0.9} corbata cuerpo={VIOLETA} />
        <Persona id={ID} x={lerp(760, 1180, sm(t, m('seva'), m('seva') + 2))} y={760} s={0.9} cuerpo={t >= m('seva') ? ROSA : NARANJA} />
        {t >= m('permiso') && <g opacity={e1(t, m('permiso')) * (1 - sm(t, m('seva'), m('seva') + 0.6))}><Burbuja x={260} y={420} w={movil ? 420 : 360} texto="«¿Me autorizas?»" u={sm(t, m('permiso'), m('permiso') + 1)} c={c} id={ID} tam={28} /></g>}
        {t >= m('cambio') && t < m('seva') && <g opacity={e1(t, m('cambio'))} transform={`translate(${lerp(320, 640, sm(t, m('cambio'), m('cambio') + 1.2))} 560)`}><rect x={-40} y={-34} width={80} height={68} rx={8} fill={ROSA} /><rect x={-8} y={-34} width={16} height={68} fill={AMBAR} /><rect x={-48} y={-46} width={96} height={20} rx={6} fill={ROSA} /></g>}
        {t >= m('seva') && [0, 1, 2].map((k) => <Persona key={k} id={ID} x={900 + k * 90} y={520} s={0.4} cuerpo={GRIS} />)}
        {t >= m('seva') && <Letrero x={600} y={812} texto="Se va, y se lo cuenta a otros" fondo={ROSA} id={ID} tam={28} op={e1(t, m('seva'))} />}
        {t >= m('respeto') && t < m('seva') && <Letrero x={600} y={812} texto="Pide permiso, explica y da algo a cambio" id={ID} tam={28} op={e1(t, m('respeto'))} />}
      </Toma>
    </Lienzo>
  );
};
