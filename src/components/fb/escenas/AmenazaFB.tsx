import React from 'react';
import { useEscenaFB, Lienzo, TomaFB, RotuloFB, Letrero, Txt, Persona, Brazos, Burbuja, CuentaConfianza, Pulso, Lupa, Cara, Reloj, Mesa, Escritorio, Cruz, Visto, Suelo, Paso, e1, sm, vent, lerp, tono, useMovil, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, ROJO_M, GRIS } from './kitFB';
import type { PropsCE } from './kitFB';

/**
 * La reacción de amenaza. Toma 1: «¿puedo darte un feedback?» y el pulso de quien escucha se dispara; la alarma de
 * lucha o huida y la capacidad de procesar que cae. Toma 2: las dos reacciones (se justifica / cruza los brazos).
 * Toma 3: la cuenta de confianza se llena cinco a uno; el gerente que en cada cruce de pasillo deposita una moneda.
 * Toma 4: la autoridad sube a la persona a un podio y su lupa sobre las señales pequeñas se empaña.
 * Toma 5: el escenario: ambos frescos, la oficina que marca jerarquía, la caminata y el mismo lado de la mesa.
 */

const ID = 'fb03', P = 'fb-amenaza';

const Arbol: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-8} y={-70} width={16} height={70} rx={6} fill="#8b5a2b" />
    <circle cx={0} cy={-110} r={52} fill="#16a34a" /><circle cx={-26} cy={-90} r={34} fill="#15803d" />
  </g>
);

export const AmenazaFB: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaFB(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('frase'), '«¿Puedo darte un feedback?»'], [m('huida'), 'Lucha o huida'], [m('costo'), 'Cae la capacidad de pensar'],
    [m('justifican'), 'Dos reacciones'], [m('relacion'), 'La relación, antes'], [m('cinco'), 'Cinco a uno'], [m('saldo'), 'Saldo a favor'],
    [m('pasillo'), 'Una pregunta en el pasillo'], [m('senales'), 'Las señales pequeñas'], [m('escenario'), 'Preparar el escenario'],
    [m('oficina'), 'El lugar importa'], [m('lado'), 'Del mismo lado'],
  ];
  const pulso = sm(t, m('pulso'), m('huida') + 0.5);
  const capacidad = 1 - 0.7 * sm(t, m('costo'), m('costo') + 1.5);
  const depositos = Math.min(6, Math.floor(Math.max(0, t - m('cinco')) * 2.4));
  const pasillo = Math.min(4, Math.floor(Math.max(0, t - m('pasillo')) * 1.2));
  const podio = sm(t, m('autoridad'), m('autoridad') + 1.2);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="La reacción de amenaza">
      <RotuloFB t={t} lista={rot} id={ID} />

      {/* 1 · la frase y el pulso */}
      <TomaFB t={t} a={0} b={m('justifican')} cy={500}>
        <Suelo y={720} isDark={isDark} x0={120} x1={1080} />
        <Persona id={ID} x={260} y={720} s={1} cuerpo={VIOLETA} />
        <Persona id={ID} x={600} y={720} s={1} cuerpo={NARANJA} ojos={1 - 0.4 * pulso} />
        <Burbuja x={280} y={510} w={440} texto="¿Puedo darte un feedback?" u={sm(t, m('frase'), m('frase') + 1.3)} c={c} id={ID} tam={30} />
        {pulso > 0.01 && (
          <g opacity={sm(t, m('pulso'), m('pulso') + 0.5)}>
            <rect x={720} y={180} width={400} height={180} rx={24} fill={c.panel} style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,.15))' }} />
            <Pulso x={740} y={280} w={360} t={t} v={pulso} />
            <Txt x={920} y={400} textAnchor="middle" fontSize={28} fill={c.texto}>Pulso</Txt>
          </g>
        )}
        {t >= m('huida') && (
          <g opacity={e1(t, m('huida'))}>
            <circle cx={600} cy={590} r={lerp(90, 130, 0.5 + 0.5 * Math.sin(t * 6))} fill={ROJO_M} opacity={0.12} />
            <Letrero x={600} y={790} texto="Alerta" fondo={ROJO_M} id={ID} tam={30} />
          </g>
        )}
        {t >= m('costo') && (
          <g opacity={e1(t, m('costo'))}>
            <rect x={800} y={460} width={70} height={240} rx={14} fill={c.apagado} />
            <rect x={800} y={460 + 240 * (1 - capacidad)} width={70} height={240 * capacidad} rx={14} fill={capacidad > 0.5 ? VERDE : ROJO_M} />
            <Txt x={835} y={760} textAnchor="middle" fontSize={28} fill={c.texto}>Capacidad</Txt>
            {!movil && <Txt f="a" x={900} y={600} fontSize={22} fill={c.tenue}>de procesar</Txt>}
          </g>
        )}
      </TomaFB>

      {/* 2 · dos reacciones */}
      <TomaFB t={t} a={m('justifican')} b={m('relacion')} cy={500}>
        <Suelo y={720} isDark={isDark} x0={120} x1={1080} />
        <g opacity={e1(t, m('justifican'))}>
          <Persona id={ID} x={330} y={720} s={1.05} cuerpo={AZUL_M} />
          <Brazos x={330} y={720} s={1.05} izq={130 + 20 * Math.sin(t * 5)} der={110 + 20 * Math.sin(t * 5 + 1)} color={AZUL_M} id={ID} />
          <Burbuja x={350} y={480} w={380} texto="¡Pero es que tú…!" u={sm(t, m('justifican'), m('justifican') + 1)} c={c} id={ID} tam={30} />
          <Txt x={330} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Se justifica</Txt>
        </g>
        {t >= m('brazos') && (
          <g opacity={e1(t, m('brazos'))}>
            <Persona id={ID} x={870} y={720} s={1.05} cuerpo={ROSA} ojos={0.25} />
            <g transform="translate(870 720) scale(1.05)">
              <rect x={-46} y={-86} width={92} height={22} rx={11} fill={ROSA} style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.25))' }} />
              <rect x={-46} y={-74} width={92} height={20} rx={10} fill="#e85a8a" />
            </g>
            <Txt x={870} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Cruza los brazos</Txt>
          </g>
        )}
      </TomaFB>

      {/* 3 · la cuenta de confianza */}
      <TomaFB t={t} a={m('relacion')} b={m('senales')} cy={480}>
        <CuentaConfianza x={330} y={640} pos={Math.min(5, depositos) + pasillo} neg={depositos >= 6 ? 1 : 0} c={c} op={e1(t, m('relacion'))} />
        <Txt x={330} y={700} textAnchor="middle" fontSize={30} fill={c.texto} opacity={e1(t, m('relacion'))}>Cuenta de confianza</Txt>
        {t >= m('cinco') && (
          <g opacity={vent(t, m('cinco'), m('pasillo'))}>
            <Txt x={780} y={360} textAnchor="middle" fontSize={120} fill={VERDE}>5</Txt>
            <Txt x={880} y={360} textAnchor="middle" fontSize={90} fill={c.tenue}>:</Txt>
            <Txt x={960} y={360} textAnchor="middle" fontSize={120} fill={ROJO_M}>1</Txt>
            <Txt x={870} y={430} textAnchor="middle" fontSize={28} fill={c.texto}>positivas por cada negativa</Txt>
            {t >= m('saldo') && <Letrero x={870} y={530} texto="Saldo a favor antes de lo difícil" fondo={VERDE} id={ID} tam={28} op={e1(t, m('saldo'))} />}
          </g>
        )}
        {t >= m('pasillo') && (
          <g opacity={e1(t, m('pasillo'))}>
            <rect x={620} y={560} width={520} height={14} rx={7} fill={c.apagado} />
            {[0, 1, 2, 3].map((k) => <Persona key={k} id={ID} x={680 + k * 130} y={560} s={0.6} cuerpo={[AZUL_M, ROSA, VIOLETA, VERDE][k]} ojos={k < pasillo ? 1 : 0.6} />)}
            <g transform={`translate(${lerp(640, 1100, sm(t, m('pasillo'), m('pasillo') + 3.4))} 0)`}><Persona id={ID} x={0} y={600} s={0.66} cuerpo={NARANJA} /></g>
            {Array.from({ length: pasillo }, (_, k) => <circle key={k} cx={680 + k * 130} cy={430} r={14} fill={VERDE} opacity={1 - sm(t, m('pasillo') + (k + 1) / 1.2, m('pasillo') + (k + 1) / 1.2 + 0.8)} />)}
            <Txt x={880} y={680} textAnchor="middle" fontSize={28} fill={c.texto}>Minutos que dan vínculos</Txt>
          </g>
        )}
      </TomaFB>

      {/* 4 · las señales pequeñas y la autoridad */}
      <TomaFB t={t} a={m('senales')} b={m('escenario')} cy={480}>
        <Suelo y={720} isDark={isDark} x0={140} x1={1060} />
        <Persona id={ID} x={820} y={720} s={1.05} cuerpo={AZUL_M} ojos={0.75} />
        <g transform={`translate(0 ${-140 * podio})`}>
          <Persona id={ID} x={360} y={720} s={1.05} cuerpo={VIOLETA} corbata />
        </g>
        {podio > 0.01 && <rect x={250} y={720 - 140 * podio} width={220} height={140 * podio} rx={10} fill={GRIS} opacity={0.85} />}
        <Lupa x={700} y={330} r={90} c={c} id={ID} clip={`${ID}-lupa`}>
          <g opacity={1 - 0.75 * podio}><Cara x={0} y={-6} r={60} id={ID} ojos={0.7} cejas={1} boca={-0.6} /></g>
        </Lupa>
        <Txt x={700} y={480} textAnchor="middle" fontSize={28} fill={c.texto} opacity={e1(t, m('senales'))}>Una ceja, un silencio</Txt>
        {t >= m('autoridad') && <Letrero x={360} y={790} texto="Más autoridad, menos atención" fondo={GRIS} id={ID} tam={28} op={e1(t, m('autoridad'))} />}
      </TomaFB>

      {/* 5 · el escenario */}
      <TomaFB t={t} a={m('escenario')} b={fin + 1} cy={480}>
        {vent(t, m('escenario'), m('oficina')) > 0.01 && (
          <g opacity={vent(t, m('escenario'), m('oficina'))}>
            <Reloj x={420} y={400} r={110} t={t * 0.5} />
            <circle cx={760} cy={380} r={70} fill="#fbbf24" />
            {Array.from({ length: 8 }, (_, k) => <rect key={k} x={756} y={270} width={8} height={26} rx={4} fill="#fbbf24" transform={`rotate(${k * 45 + t * 10} 760 380)`} />)}
            <Txt x={600} y={600} textAnchor="middle" fontSize={32} fill={c.texto} opacity={e1(t, m('frescos'))}>Cuando ambos estén frescos</Txt>
          </g>
        )}
        {t >= m('oficina') && (
          <g opacity={e1(t, m('oficina'))}>
            <Suelo y={720} isDark={isDark} x0={80} x1={1120} />
            {/* oficina: jefe detrás del escritorio */}
            <g opacity={1 - 0.6 * sm(t, m('caminata'), m('caminata') + 0.6)}>
              <Persona id={ID} x={220} y={690} s={0.85} cuerpo={VIOLETA} corbata />
              <Escritorio x={240} y={720} w={260} />
              <Persona id={ID} x={410} y={720} s={0.85} cuerpo={AZUL_M} ojos={0.6} />
              <Cruz x={320} y={420} r={26} op={sm(t, m('oficina') + 1, m('oficina') + 1.5)} />
              <Txt x={300} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Tu oficina</Txt>
            </g>
            {t >= m('caminata') && (
              <g opacity={e1(t, m('caminata'))}>
                <Arbol x={560} y={720} s={0.9} />
                <g transform={`translate(${lerp(-20, 30, sm(t, m('caminata'), m('lado')))} 0)`}>
                  <Persona id={ID} x={640} y={720} s={0.85} cuerpo={VIOLETA} />
                  <Persona id={ID} x={720} y={720} s={0.85} cuerpo={AZUL_M} />
                </g>
                <Txt x={680} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Una caminata</Txt>
              </g>
            )}
            {t >= m('lado') && (
              <g opacity={e1(t, m('lado'))}>
                <Persona id={ID} x={930} y={690} s={0.85} cuerpo={VIOLETA} />
                <Persona id={ID} x={1030} y={690} s={0.85} cuerpo={AZUL_M} />
                <Mesa x={980} y={650} w={220} c={c} />
                <Visto x={980} y={420} r={26} />
                <Txt x={980} y={790} textAnchor="middle" fontSize={28} fill={c.texto}>Mismo lado</Txt>
              </g>
            )}
          </g>
        )}
      </TomaFB>
    </Lienzo>
  );
};
