import type { en } from "./en";

type DeepDict = typeof en;

/** Diccionario ES — espejo exacto del EN. */
export const es: DeepDict = {
  langModal: {
    title: "Welcome · Bienvenido",
    question: "Choose your language",
    questionAlt: "Elige tu idioma",
    note: "You can switch anytime · Puedes cambiarlo cuando quieras",
  },
  preloader: {
    sub: "Red de revisión legal · Salt Lake City, UT",
    preparing: "Preparando tu panel",
  },
  nav: {
    links: [
      { label: "Plataforma", target: "#plataforma" },
      { label: "Requisitos", target: "#requisitos" },
      { label: "Proceso", target: "#proceso" },
      { label: "Preguntas", target: "#preguntas" },
    ],
    cta: "Agenda una llamada",
    file: "EXP № 2026-ULP",
  },
  hero: {
    kicker: "Convocatoria abierta para abogados en EE.UU.",
    labels: [
      ["Freelance desde casa", "a tu ritmo"],
      ["Casos asignados a ti", "expedientes en inglés"],
      ["Pago por caso", "ingreso extra real"],
    ],
    badge: "Agenda una llamada con Henry — únete a la red —",
    cta1: "Agenda una llamada con Henry →",
    cta2: "Cómo funciona",
    sceneLabel: "Balanza de la justicia dibujada en tramas",
  },
  vision: {
    label: "Quiénes somos",
    statementA: "Millones de familias latinas en EE.UU. enfrentan sus trámites migratorios solas — no porque no exista ayuda, sino porque está fuera de su alcance. Existimos para ",
    statementEm: "cerrar esa brecha",
    statementB: ".",
    visionLabel: "Nuestra visión",
    visionLine: "Cada familia latina, a un expediente validado de la claridad.",
    body1:
      "Usalatino Prime es una empresa legal-tech constituida en Salt Lake City, Utah. Nuestra plataforma prepara y pre-revisa expedientes migratorios con IA — y abogados con licencia dan a cada expediente su palabra final, humana.",
    body2:
      "Estamos formando una red de abogados freelance que creen que el acceso a la orientación legal no debería depender del código postal ni del bolsillo de una familia. Tu licencia puede abrir puertas — desde tu sala.",
    facts: ["Constituida en Utah", "La tecnología prepara, el abogado decide", "Pago por caso"],
    sceneLabel: "Una multitud de la comunidad dibujada en tramas",
  },
  manifesto: {
    lines: [
      { pre: "La IA", em: "prepara" },
      { pre: "Tú", em: "decides" },
      { pre: "Nosotros", em: "pagamos" },
    ],
    tag: "✦ Revisión legal de expedientes migratorios · abogados.usalatinoprime.com",
  },
  platform: {
    label: "La plataforma",
    titleA: "Freelance sin la ",
    titleEm: "fricción",
    cards: [
      { code: "COLA", title: "Cola asignada", copy: "Los casos llegan a tu cola listos para revisar. Sin buscar clientes, sin hacer marketing." },
      { code: "IA", title: "Pre-revisión IA", copy: "Cada expediente llega analizado contra el playbook del servicio, con semáforo verde, ámbar o rojo." },
      { code: "SPLIT", title: "Revisión split-screen", copy: "Documentos a un lado, checklist al otro. El expediente llega completo — o no llega." },
      { code: "FIRMA", title: "Veredicto en un clic", copy: "Validas o devuelves con hallazgos estructurados. El equipo de origen lo recibe al instante." },
      { code: "USD", title: "Ganancias claras", copy: "La tarifa es visible antes de tomar el caso. Panel de ganancias en tiempo real y pagos puntuales." },
      { code: "KPI", title: "Tus métricas", copy: "Tiempos, volumen y precisión: tu reputación dentro de la red, medible y tuya." },
    ],
  },
  requirements: {
    label: "Requisitos",
    titleA: "Lo que ",
    titleEm: "necesitas",
    items: [
      { title: "Licencia activa de abogado", copy: "De cualquier estado — la ley migratoria es federal." },
      { title: "Sin experiencia migratoria", copy: "No se requiere. Nuestros playbooks y checklists guían cada revisión." },
      { title: "Inglés para los expedientes", copy: "Todos los casos que revisarás están escritos en inglés." },
      { title: "El español es un plus", copy: "No es requisito — pero te acerca a la comunidad que servimos." },
      { title: "Unas horas a la semana", copy: "Desde casa, a tu ritmo. Sin mínimos de casos." },
    ],
  },
  process: {
    label: "Cómo entras",
    titleA: "De tu licencia a tu primer ",
    titleEm: "veredicto",
    steps: [
      { n: "01", title: "Agenda una llamada", copy: "Veinte minutos con Henry, nuestro fundador. Te explica el modelo y responde todo." },
      { n: "02", title: "Verificación", copy: "Confirmamos tu licencia del bar. Eso es todo — sin entrevistas ni portafolio." },
      { n: "03", title: "Onboarding en una hora", copy: "Aprende la revisión por playbook. Tus primeros casos llegan asignados a tu cola." },
      { n: "04", title: "Revisa y cobra", copy: "Desde casa, cuando te convenga. Cada veredicto paga." },
    ],
  },
  stats: {
    label: "Los números",
    items: [
      { value: 90, suffix: "", label: "USD por caso (tarifa base)" },
      { value: 15, suffix: " min", label: "Promedio por expediente" },
      { value: 48, suffix: " h", label: "Máximo por veredicto" },
      { value: 100, suffix: "%", label: "Remoto, donde estés" },
    ],
    sceneLabel: "Colmena de Utah dibujada en tramas",
  },
  modules: {
    label: "Por dentro",
    titleA: "Tu día, dentro del ",
    titleEm: "panel",
    tabsLabel: "Módulos",
    essential: "Lo esencial",
    tabs: [
      {
        id: "queue", label: "La cola", big: "Lista", code: "COLA",
        chips: ["Asignada a ti", "Lock mientras revisas", "Liberación automática", "Sin mínimos"],
        copy: "Los casos llegan asignados a tu cola, empaquetados y listos. Un caso se bloquea mientras lo trabajas; si lo sueltas, vuelve al pozo.",
      },
      {
        id: "review", label: "La revisión", big: "Split", code: "REV",
        chips: ["Checklist por playbook", "Semáforo verde-ámbar-rojo", "Hallazgos de la IA marcados", "Historial completo"],
        copy: "Documentos a la izquierda, el checklist del servicio a la derecha y los hallazgos de la IA resaltados. Tu tiempo se va en criterio, no en logística.",
      },
      {
        id: "verdict", label: "El veredicto", big: "Tuyo", code: "FIRMA",
        chips: ["Validar", "Pedir correcciones", "Hallazgos estructurados", "Entrega instantánea"],
        copy: "La IA sugiere, tú firmas. Validas o devuelves con correcciones — el equipo de origen recibe tu decisión en el momento.",
      },
      {
        id: "earnings", label: "Las ganancias", big: "Al día", code: "USD",
        chips: ["Tarifa por revisión", "Cortes puntuales", "Historial de pagos", "Métricas personales"],
        copy: "Cada revisión muestra su tarifa antes de tomarla. Tu panel registra lo ganado, lo pendiente y cada corte de pago.",
      },
    ],
  },
  testimonials: {
    label: "La red habla",
    stamp: "[ Revisor activo ]",
    items: [
      { quote: "Reviso dos expedientes con el café de la mañana. La IA pone la mesa; yo pongo el criterio.", name: "Andrea T.", detail: "Abogada de inmigración · Houston, TX" },
      { quote: "El split-screen me ahorra lo peor del oficio: perseguir documentos. Aquí el caso llega completo o no llega.", name: "Marco V.", detail: "Práctica humanitaria · Phoenix, AZ" },
      { quote: "Cobro por criterio legal, no por horas de oficina. Y mis métricas hablan por mí.", name: "Silvia R.", detail: "Familiar y SIJS · Salt Lake City, UT" },
    ],
  },
  cta: {
    label: "La siguiente cohorte",
    titleA: "Tu lugar está ",
    titleEm: "abierto",
    sub: "Verificamos cada licencia — la red vale lo que valen sus abogados. Henry responde en menos de 72 horas.",
    formTitle: "FORMULARIO ULP-AB · SOLICITUD DE LLAMADA",
    fields: {
      name: "01 — Nombre completo",
      namePh: "Escribe aquí",
      email: "02 — Email profesional",
      emailPh: "tu@bufete.com",
      bar: "03 — Nº de licencia (bar) y estado",
      barPh: "Ej. 123456 — Texas",
      time: "04 — Mejor horario para llamarte",
      times: ["Mañanas", "Tardes", "Noches"],
    },
    error: "[ ! ] Revisa tu nombre y número de licencia — los necesitamos para verificarte.",
    submit: "Solicitar mi llamada →",
    privacy: "Datos protegidos. Solo usamos tu licencia para la verificación.",
    sentStamp: "Agendado",
    sentBody: "Estás en la lista de Henry. Recibirás un email en menos de 72 horas para elegir hora.",
    sentFolio: "Folio AB-2026-",
    direct: "¿Prefieres ahora? Escribe a henry@usalatinoprime.com",
    sceneLabel: "Arco Delicado dibujado en tramas",
  },
  faq: {
    label: "Preguntas de colegas",
    titleA: "Respuestas ",
    titleEm: "claras",
    items: [
      { q: "¿Cuánto gano por caso?", a: "Cada servicio muestra su tarifa antes de tomar el caso — la base es 90 USD por veredicto. Cobras por revisión, con cortes puntuales y todo el historial en tu panel de ganancias." },
      { q: "¿Necesito experiencia migratoria?", a: "No. Necesitas licencia activa de abogado; nuestros playbooks y la pre-revisión IA guían el resto. Contratamos tu criterio legal." },
      { q: "¿Necesito hablar español?", a: "No — todos los expedientes están en inglés. El español es un plus bienvenido: te conecta con la comunidad que servimos." },
      { q: "¿Cuántos casos debo tomar?", a: "Ninguno obligatorio. No hay mínimos. Los casos llegan a tu cola y tomas los que entren en tu semana." },
      { q: "¿Esto es un empleo?", a: "No — es trabajo freelance, pagado por caso. Conservas tu práctica, tus horarios y tu independencia." },
      { q: "¿Quién es Usalatino Prime?", a: "Una empresa legal-tech constituida en Salt Lake City, Utah, con la misión de hacer accesible la orientación migratoria a la comunidad latina." },
    ],
  },
  footer: {
    network: "La red",
    networkItems: ["Salt Lake City, UT — Sede", "Red 100% remota", "Abogados en 50 estados"],
    follow: "Síguenos",
    copyright: "© 2026 Usalatino Prime · Utah",
    disclaimer: "Plataforma de revisión profesional — requiere licencia activa",
    sceneLabel: "Un mazo de juez dibujado en tramas",
  },
};
