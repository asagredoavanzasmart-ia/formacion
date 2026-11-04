import React from 'react';
import { useEscenaCP, Lienzo, Toma, Rotulo, Letrero, Txt, Persona, Ficha, Propuesta, Telefono, Hoja, Visto, Cruz, Hilo, e1, sm, ventana, lerp, tono, useMovil, sombra, NARANJA, ROSA, AZUL_M, VERDE, VIOLETA, AMBAR, TEAL, ROJO_M, GRIS } from './kitCP';
import type { PropsCE } from './kitCP';

/**
 * Canales que no se hablan (Reinares).
 * Toma 1: la tienda le pone un precio al cliente y, al rato, por correo le llega otro distinto; signos de confusión
 * y errores entre áreas. Un robot no resuelve el conflicto: lo resuelve una persona.
 * Toma 2: las tres reglas — cada dato con su flecha a una acción; un solo registro al centro con los canales
 * conectados por hilos; la escoba de la limpieza anual.
 * Toma 3 (ejemplo ilustrativo): el gimnasio con tres formularios distintos del mismo socio; cambia de sede y le
 * cobran igual; un solo registro lo habría evitado.
 */

const ID = 'cp18', P = 'cp-canales';

const Precio: React.FC<{ x: number; y: number; texto: string; color: string; op?: number }> = ({ x, y, texto, color, op = 1 }) =>
  op < 0.01 ? null : (
    <g transform={`translate(${x} ${y})`} opacity={op}>
      <path d="M -70 -34 H 40 L 72 0 L 40 34 H -70 Q -80 34 -80 24 V -24 Q -80 -34 -70 -34 Z" fill={color} />
      <circle cx={-56} cy={0} r={8} fill="#fff" />
      <Txt x={8} y={10} textAnchor="middle" fontSize={28} fill="#fff">{texto}</Txt>
    </g>
  );

export const CanalesCP: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, m, vP, fondo } = useEscenaCP(P, marcas, estatico);
  const c = tono(isDark);
  const movil = useMovil();
  const rot: [number, string][] = [
    [m('desconectados'), 'Canales desconectados'], [m('punto'), 'Un precio en la tienda'], [m('correo'), 'Otro por correo'], [m('automaticos'), 'No todo a canales automáticos'],
    [m('reglas'), 'Tres reglas'], [m('registro'), 'Un solo registro'], [m('limpieza'), 'Limpieza anual'], [m('gimnasios'), 'Ejemplo ilustrativo'], [m('evitado'), 'Un registro lo evita'],
  ];
  const llega = sm(t, m('correo'), m('correo') + 1.4);
  const CAN: [number, number, string][] = [[220, 320, 'Tienda'], [980, 320, 'Teléfono'], [600, 720, 'Correo']];
  const conecta = sm(t, m('registro'), m('registro') + 1.6);
  const barre = sm(t, m('limpieza'), m('limpieza') + 2);
  const cambia = sm(t, m('sede'), m('sede') + 1.6);

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="Canales que no se hablan">
      <Rotulo t={t} lista={rot} id={ID} />

      {/* 1 · dos precios para el mismo cliente */}
      <Toma t={t} a={0} b={m('reglas')} cy={500}>
        <Persona id={ID} x={600} y={760} s={1} cuerpo={NARANJA} />
        <g transform="translate(240 620)" opacity={e1(t, m('desconectados'))}>
          <rect x={-130} y={-200} width={260} height={200} rx={10} fill={TEAL} />
          <path d="M -150 -200 L -120 -250 H 120 L 150 -200 Z" fill={ROSA} />
          <Txt f="a" x={0} y={40} textAnchor="middle" fontSize={26} fill={c.texto}>Tienda</Txt>
        </g>
        <g transform="translate(960 560)" opacity={e1(t, m('desconectados'))}>
          <rect x={-100} y={-140} width={200} height={140} rx={14} fill={AZUL_M} />
          <path d="M -100 -140 L 0 -60 L 100 -140" stroke="#fff" strokeWidth={8} fill="none" />
          <Txt f="a" x={0} y={40} textAnchor="middle" fontSize={26} fill={c.texto}>Correo</Txt>
        </g>
        {t >= m('punto') && <Precio x={lerp(240, 470, sm(t, m('punto'), m('punto') + 1))} y={360} texto="Precio A" color={VERDE} op={e1(t, m('punto'))} />}
        {t >= m('correo') && <g><Propuesta x={lerp(960, 760, llega)} y={lerp(400, 380, llega)} s={0.7} /><Precio x={760} y={280} texto={t >= m('distinto') ? 'Precio B' : '…'} color={ROJO_M} op={sm(t, m('correo') + 1, m('correo') + 1.4)} /></g>}
        {t >= m('distinto') && <Txt x={600} y={520 + 6 * Math.sin(t * 4)} textAnchor="middle" fontSize={90} fill={ROJO_M} opacity={e1(t, m('distinto'))}>?!</Txt>}
        {t >= m('confusion') && t < m('automaticos') && <Letrero x={600} y={190} texto={t >= m('errores') ? 'Más errores entre áreas' : 'Confusión del cliente'} fondo={GRIS} id={ID} tam={26} op={e1(t, m('confusion'))} />}
        {t >= m('automaticos') && (
          <g opacity={e1(t, m('automaticos'))}>
            {t >= m('personal') && <Letrero x={600} y={190} texto={t >= m('conflicto') ? 'En un conflicto, una persona' : 'La atención personal importa'} fondo={VERDE} id={ID} tam={26} op={e1(t, m('personal'))} />}
            {t >= m('personal') && <Visto x={680} y={560} r={28} op={e1(t, m('personal'))} />}
          </g>
        )}
      </Toma>

      {/* 2 · las tres reglas */}
      <Toma t={t} a={m('reglas')} b={m('gimnasios')} cy={480}>
        {ventana(t, m('reglas'), m('registro')) > 0.01 && (
          <g opacity={ventana(t, m('reglas'), m('registro'))}>
            {[0, 1, 2].map((k) => (
              <g key={k} opacity={e1(t, m('accion') + 0.3 * k)}>
                <Ficha x={300} y={300 + k * 150} s={1} color={[NARANJA, ROSA, AZUL_M][k]} />
                <path d={`M 380 ${300 + k * 150} H 640`} stroke={k === 2 ? c.apagado : VERDE} strokeWidth={8} strokeLinecap="round" strokeDasharray={k === 2 ? '10 12' : undefined} />
                {k < 2 ? <Visto x={720} y={300 + k * 150} r={28} /> : <Cruz x={720} y={300 + k * 150} r={26} />}
              </g>
            ))}
            {t >= m('aniversario') && <Letrero x={940} y={210} texto="Si no sirve, no lo pidas" fondo={GRIS} id={ID} tam={26} op={e1(t, m('aniversario'))} />}
          </g>
        )}
        {t >= m('registro') && (
          <g opacity={e1(t, m('registro'))}>
            {CAN.map(([x, y, n], k) => (
              <g key={n}>
                <Hilo x1={x} y1={y} x2={600} y2={480} u={conecta} id={ID} grosor={6} />
                <circle cx={x} cy={y} r={56} fill={c.panel} style={sombra(c.sombra, 4, 10)} />
                {k === 1 ? <Telefono x={x} y={y} s={0.35} /> : k === 0 ? <rect x={x - 28} y={y - 24} width={56} height={48} rx={6} fill={TEAL} /> : <rect x={x - 30} y={y - 20} width={60} height={40} rx={6} fill={AZUL_M} />}
                <Txt f="a" x={x} y={y + (k === 2 ? 90 : -76)} textAnchor="middle" fontSize={26} fill={c.texto}>{n}</Txt>
              </g>
            ))}
            <circle cx={600} cy={480} r={80} fill={`url(#${ID}-marca)`} />
            <Ficha x={600} y={480} s={1.1} />
          </g>
        )}
        {t >= m('limpieza') && (
          <g opacity={e1(t, m('limpieza'))}>
            <g transform={`translate(${lerp(1100, 860, barre)} 640) rotate(${-20 + 15 * Math.sin(t * 6)})`}><rect x={-6} y={-150} width={12} height={150} rx={6} fill="#7c4a1e" /><path d="M -40 0 L 40 0 L 30 50 L -30 50 Z" fill={AMBAR} /></g>
            {[0, 1, 2].map((k) => <rect key={k} x={lerp(860, 1120, barre) + k * 20} y={690 - k * 6} width={18} height={12} rx={3} fill={GRIS} opacity={1 - barre} />)}
          </g>
        )}
        {t >= m('ruido') && <Letrero x={600} y={812} texto="Menos datos: menos riesgo, menos errores, menos ruido" id={ID} tam={24} op={e1(t, m('ruido'))} />}
      </Toma>

      {/* 3 · el gimnasio */}
      <Toma t={t} a={m('gimnasios')} b={fin + 1} cy={480}>
        {ventana(t, m('gimnasios'), m('evitado')) > 0.01 && (
          <g opacity={ventana(t, m('gimnasios'), m('evitado'))}>
            {(['Recepción', 'Web', 'App'] as const).map((n, k) => (
              <g key={n} opacity={e1(t, m('formulario') + 0.3 * k)}>
                <Hoja x={140 + k * 160} y={240} w={110} h={140} rot={(k - 1) * 5} lineas={[3, 5, 2][k]} color={[NARANJA, AZUL_M, VIOLETA][k]} />
                <Txt f="a" x={140 + k * 160} y={355} textAnchor="middle" fontSize={26} fill={c.texto}>{n}</Txt>
              </g>
            ))}
            {[0, 1].map((k) => <g key={k} transform={`translate(${720 + k * 280} 640)`} opacity={e1(t, m('sede') - 0.5)}><rect x={-100} y={-200} width={200} height={200} rx={12} fill={k ? VIOLETA : TEAL} /><Txt f="a" x={0} y={40} textAnchor="middle" fontSize={26} fill={c.texto}>{k ? 'Sede nueva' : 'Sede antigua'}</Txt></g>)}
            <Persona id={ID} x={lerp(720, 1000, cambia)} y={600 - 60 * Math.sin(Math.PI * cambia)} s={0.6} cuerpo={t >= m('extrano') ? ROSA : NARANJA} />
            {t >= m('cobra') && <g opacity={e1(t, m('cobra'))}><Precio x={1000} y={300} texto="Cobro" color={ROJO_M} /><Letrero x={400} y={620} texto="Había pedido pausar" fondo={ROJO_M} id={ID} tam={26} /></g>}
          </g>
        )}
        {t >= m('evitado') && (
          <g opacity={e1(t, m('evitado'))}>
            <circle cx={600} cy={440} r={110} fill={`url(#${ID}-marca)`} />
            <Ficha x={600} y={440} s={1.4} />
            <Letrero x={600} y={640} texto="Un solo registro lo habría evitado" fondo={VERDE} id={ID} tam={28} />
          </g>
        )}
      </Toma>
    </Lienzo>
  );
};
