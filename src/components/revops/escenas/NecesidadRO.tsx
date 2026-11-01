import React from 'react';
import { Lienzo, useEscena, Toma, Letrero, Suelo, Equipo, Tabla, Cruz, Visto, Rotulo, Persona, Txt, Hoja, Moneda3D, NARANJA, ROSA, PIZARRA, VIOLETA, AZUL_M, VERDE, TEAL, AMBAR, ROJO_M, ac, sm, e1, lerp, tono, sombra } from './kitRO';
import type { PropsCE } from './kitRO';

/**
 * «¿Hay que contratar?», en cuatro tomas.
 * 1 · Antes de publicar el cargo: el punto de quiebre es real, pero contratar sin saber qué falla pone una curita al síntoma.
 * 2 · La tabla de responsabilidades: satisfactorio, insatisfactorio o nulo; la diferencia cambia la respuesta.
 * 3 · Tres causas: demasiadas tareas (contratar sirve), faltan habilidades (contratar, capacitar o consultar) y falta
 *     inversión (contratar no lo resuelve).
 * 4 · Agrupar responsabilidades en un rol y elegir el tipo de perfil.
 */

const ID = 'ro48';
const nombres = ['antes', 'volm', 'quiebre', 'estirada', 'caro', 'sintoma', 'tabla', 'satisfactorio', 'insatisfactorio', 'nulo', 'diferencia', 'causas', 'demasiadas', 'habilidades', 'capacitar', 'inversion', 'noResuelve', 'agrupar', 'admin', 'perfil', 'pregunta'] as const;
type N = typeof nombres[number];

export const NecesidadRO: React.FC<PropsCE> = ({ isDark, marcas, pregunta, estatico = false }) => {
  const { t, fin, M, vP, fondo } = useEscena(nombres, marcas, estatico);
  const c = tono(isDark);
  const m = (n: N) => M(n);

  const rotulos: [number, string][] = [
    [0.2, '¿Hay que contratar?'], [m('quiebre'), 'El punto de quiebre'], [m('caro'), 'El síntoma y la causa'],
    [m('tabla'), 'Responsabilidades y desempeño'], [m('causas'), 'Tres causas'], [m('agrupar'), 'Agrupar en un rol'],
  ];

  const causa = t >= m('inversion') ? 2 : t >= m('habilidades') ? 1 : t >= m('demasiadas') ? 0 : -1;

  return (
    <Lienzo id={ID} t={t} fin={fin} fondo={fondo} vP={vP} pregunta={pregunta} isDark={isDark} titulo="¿Hay que contratar?">
      <Rotulo t={t} lista={rotulos} id={ID} />

      {/* TOMA 1 · antes de publicar */}
      <Toma t={t} a={-1} b={m('tabla')} zi={1}>
        <Suelo y={680} isDark={isDark} />
        <g opacity={e1(t, m('antes'))}>
          <rect x={160} y={260} width={260} height={180} rx={16} fill="#fff" style={sombra(0.25, 4, 12)} />
          <rect x={160} y={260} width={260} height={50} rx={16} fill={VERDE} /><Txt f="a" x={290} y={294} textAnchor="middle" fontSize={22} fill="#fff" peso={700}>Se busca</Txt>
          {[0, 1, 2].map((k) => <rect key={k} x={190} y={334 + k * 28} width={k === 2 ? 120 : 200} height={12} rx={6} fill="#cbd5e1" />)}
          <Txt x={450} y={300} fontSize={70} fill={NARANJA} peso={800}>?</Txt>
        </g>
        {t >= m('quiebre') && (() => { const est = t >= m('estirada') ? 1 : 0.4; return <g opacity={e1(t, m('quiebre'))}>
          <Equipo id={ID} k="ops" x={800} y={680} s={0.8} t={t} nombre={false} distintivo={false} />
          {[0, 1, 2, 3].map((k) => <Hoja key={k} x={660 + k * 70 + 6 * Math.sin(t * 6 + k) * est} y={340 - k * 18} w={70} h={50} lineas={2} rot={(k % 2 ? 8 : -8) * est} />)}
          <Letrero x={800} y={740} texto="Tan estirada que nada sale bien" fondo={ROJO_M} id={ID} tam={20} />
        </g>; })()}
        {t >= m('caro') && <g opacity={e1(t, m('caro'))}>
          <rect x={150} y={520} width={300} height={110} rx={18} fill={c.panel} style={sombra(c.sombra, 3, 8)} />
          <g transform="translate(220 575) rotate(-30)"><rect x={-40} y={-14} width={80} height={28} rx={14} fill="#f9c8a0" /><rect x={-12} y={-14} width={24} height={28} fill="#e8a87c" /></g>
          <Txt f="a" x={280} y={568} fontSize={20} fill={c.texto}>Curita al síntoma</Txt>
          {t >= m('sintoma') && <Txt f="a" x={280} y={598} fontSize={20} fill={ROJO_M} peso={700} opacity={e1(t, m('sintoma'))}>la causa sigue ahí</Txt>}
        </g>}
      </Toma>

      {/* TOMA 2 · la tabla */}
      <Toma t={t} a={m('tabla')} b={m('causas')}>
        {(() => {
          const filas = [['Responsabilidad', 'Desempeño'], ['Administrar el CRM', ''], ['Reportes de ingresos', ''], ['Integrar datos', ''], ['Gobierno de datos', '']];
          const estado: [N, string, string][] = [['satisfactorio', 'Satisfactorio', VERDE], ['insatisfactorio', 'Insatisfactorio', AMBAR], ['nulo', 'Nulo', '#94a3b8'], ['insatisfactorio', 'Insatisfactorio', AMBAR]];
          return (
            <g>
              <Tabla x={200} y={200} cols={[440, 360]} filas={filas} alto={84} c={c} op={e1(t, m('tabla'))} tam={24} />
              {estado.map(([n, txt, col], k) => t >= m(n) + (k === 3 ? 0.6 : 0) && <g key={k} opacity={e1(t, m(n) + (k === 3 ? 0.6 : 0))}><rect x={660} y={300 + k * 84} width={320} height={52} rx={26} fill={col} /><Txt f="a" x={820} y={334 + k * 84} textAnchor="middle" fontSize={22} fill="#fff" peso={700}>{txt}</Txt></g>)}
              {t >= m('diferencia') && <Letrero x={600} y={700} texto="Cada estado pide una respuesta distinta" fondo={PIZARRA} id={ID} op={e1(t, m('diferencia'))} tam={22} />}
            </g>
          );
        })()}
      </Toma>

      {/* TOMA 3 · tres causas */}
      <Toma t={t} a={m('causas')} b={m('agrupar')}>
        {['Demasiadas tareas', 'Faltan habilidades', 'Falta inversión'].map((txt, k) => <g key={txt} opacity={e1(t, m('causas') + k * 0.3) * (causa >= 0 && causa !== k ? 0.4 : 1)}><Letrero x={240 + k * 360} y={180} texto={txt} fondo={[NARANJA, VIOLETA, ROJO_M][k]} id={ID} tam={24} /></g>)}
        <Suelo y={680} isDark={isDark} />
        {causa === 0 && <g opacity={e1(t, m('demasiadas'))}>
          <Persona id={ID} x={460} y={680} s={0.7} cuerpo={PIZARRA} />{Array.from({ length: 8 }, (_, k) => <Hoja key={k} x={380 + (k % 4) * 50} y={400 - Math.floor(k / 4) * 30} w={50} h={36} lineas={1} />)}
          <Persona id={ID} x={760} y={680} s={0.7} cuerpo={VERDE} />
          <Visto x={760} y={430} r={30} /><Letrero x={760} y={740} texto="Contratar sirve" fondo={VERDE} id={ID} tam={22} />
        </g>}
        {causa === 1 && <g opacity={e1(t, m('habilidades'))}>
          {[['Contratar', VERDE], ['Capacitar', AZUL_M], ['Otro equipo', TEAL], ['Un consultor', VIOLETA]].map(([txt, col], k) => <g key={txt} opacity={k === 0 ? 1 : e1(t, m('capacitar') + (k - 1) * 0.4)}><Persona id={ID} x={240 + k * 240} y={680} s={0.6} cuerpo={col} /><Letrero x={240 + k * 240} y={740} texto={txt} fondo={col} id={ID} tam={20} /></g>)}
        </g>}
        {causa === 2 && <g opacity={e1(t, m('inversion'))}>
          {['Tiempo', 'Herramientas', 'Acceso a datos'].map((txt, k) => <g key={txt}><rect x={200 + k * 280} y={340} width={220} height={150} rx={20} fill={c.panel2} stroke={ROJO_M} strokeWidth={4} strokeDasharray="12 8" /><Txt f="a" x={310 + k * 280} y={425} textAnchor="middle" fontSize={24} fill={c.texto}>{txt}</Txt></g>)}
          {t >= m('noResuelve') && <g opacity={e1(t, m('noResuelve'))}><Persona id={ID} x={600} y={680} s={0.6} cuerpo={VERDE} /><Cruz x={660} y={560} r={26} /><Letrero x={600} y={740} texto="Contratar no lo resuelve: primero invertir" fondo={ROJO_M} id={ID} tam={20} /></g>}
        </g>}
      </Toma>

      {/* TOMA 4 · agrupar en un rol */}
      <Toma t={t} a={m('agrupar')} b={fin + 1}>
        {(() => { const junta = sm(t, m('admin'), m('admin') + 1.5); const tareas = ['CRM', 'Stack', 'Integración']; return (
          <g>
            {tareas.map((txt, k) => <g key={txt} transform={`translate(${lerp(260 + k * 340, 600, junta)} ${lerp(330, 380, junta)})`} opacity={e1(t, m('agrupar') + k * 0.3)}><rect x={-110} y={-40} width={220} height={80} rx={16} fill={VIOLETA} opacity={1 - junta * 0.7} /><Txt f="a" x={0} y={8} textAnchor="middle" fontSize={24} fill="#fff" peso={700} opacity={1 - junta}>{txt}</Txt></g>)}
            {junta > 0.5 && <g opacity={sm(junta, 0.5, 1)}><rect x={400} y={330} width={400} height={100} rx={22} fill={VIOLETA} /><Txt f="a" x={600} y={392} textAnchor="middle" fontSize={28} fill="#fff" peso={700}>Administrador de sistemas</Txt></g>}
            {t >= m('perfil') && ['Especialista', 'Desde ventas o servicio', 'Con credencial'].map((txt, k) => <g key={txt} opacity={e1(t, m('perfil') + k * 0.4)}><Persona id={ID} x={300 + k * 300} y={680} s={0.55} cuerpo={[AZUL_M, NARANJA, TEAL][k]} /><Letrero x={300 + k * 300} y={740} texto={txt} fondo={[AZUL_M, NARANJA, TEAL][k]} id={ID} tam={20} /></g>)}
          </g>
        ); })()}
      </Toma>
    </Lienzo>
  );
};
