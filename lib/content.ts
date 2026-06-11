/**
 * Contenido de la landing — USALATINO PRIME · Red de revisión legal.
 * Recluta abogados de inmigración para el SaaS de validación de
 * expedientes (abogados.usalatinoprime.com).
 */

export const IMG = {
  hero: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=1800&auto=format&fit=crop",
  prologue: "procedural:cordillera",
  stats: "procedural:beehive",
  arch: "procedural:arch",
  footer:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop",
} as const;

/** Módulos del panel — la galería horizontal. */
export const SERVICES = [
  {
    code: "COLA",
    title: "Cola FIFO",
    copy: "Expedientes por orden de llegada, sin asignaciones a dedo. Tomas el siguiente cuando tú decidas.",
  },
  {
    code: "IA",
    title: "Pre-revisión IA",
    copy: "Cada caso llega analizado contra el playbook del servicio, con semáforo verde, ámbar o rojo.",
  },
  {
    code: "SPLIT",
    title: "Revisión split-screen",
    copy: "Documentos a un lado, checklist al otro. El expediente llega completo o no llega.",
  },
  {
    code: "FIRMA",
    title: "Veredicto en un clic",
    copy: "Validas o devuelves con hallazgos estructurados. El sistema de origen lo recibe al instante.",
  },
  {
    code: "USD",
    title: "Ganancias claras",
    copy: "Tarifa visible antes de tomar el caso. Panel de ganancias en tiempo real y pagos puntuales.",
  },
  {
    code: "KPI",
    title: "Tus métricas",
    copy: "Tiempos, volumen y precisión: tu reputación dentro de la red, medible y tuya.",
  },
] as const;

/** Cómo entrar a la red. */
export const PROCESS = [
  {
    n: "01",
    title: "Solicitud",
    copy: "Cuéntanos quién eres: licencia activa, estado y áreas de práctica migratoria.",
  },
  {
    n: "02",
    title: "Acreditación",
    copy: "Verificamos tu colegiatura y te invitamos al panel. Entradas por cohortes.",
  },
  {
    n: "03",
    title: "Primera cola",
    copy: "Tomas tu primer expediente con la pre-revisión IA lista y el checklist del servicio.",
  },
  {
    n: "04",
    title: "Cobras",
    copy: "Cada veredicto suma a tu panel de ganancias. Cortes puntuales, sin perseguir pagos.",
  },
] as const;

export const STATS = [
  { value: 90, suffix: "", label: "USD por revisión (base)" },
  { value: 15, suffix: " min", label: "Promedio por expediente" },
  { value: 48, suffix: " h", label: "SLA máximo por veredicto" },
  { value: 100, suffix: "%", label: "Remoto, desde donde quieras" },
] as const;

/** Los 4 pilares del panel (tabs). */
export const MODULES = [
  {
    id: "cola",
    label: "La cola",
    big: "FIFO",
    codes: ["COLA"],
    chips: [
      "Orden de llegada",
      "Lock mientras revisas",
      "Liberación automática",
      "Sin cuotas mínimas",
    ],
    copy: "Sin favoritismos: el siguiente expediente es de quien lo toma. Queda bloqueado para ti mientras lo revisas; si lo sueltas, vuelve a la cola.",
  },
  {
    id: "revision",
    label: "La revisión",
    big: "Split",
    codes: ["REV"],
    chips: [
      "Checklist por servicio",
      "Semáforo verde-ámbar-rojo",
      "Hallazgos de la IA marcados",
      "Historial completo",
    ],
    copy: "Documentos a la izquierda, checklist del playbook a la derecha y los hallazgos de la pre-revisión señalados. Tu tiempo se va en criterio, no en logística.",
  },
  {
    id: "veredicto",
    label: "El veredicto",
    big: "Tuyo",
    codes: ["FIRMA"],
    chips: [
      "Validar",
      "Pedir correcciones",
      "Hallazgos estructurados",
      "Entrega instantánea",
    ],
    copy: "La IA sugiere, tú firmas. Validas o devuelves con correcciones — y el equipo de origen recibe tu decisión al momento.",
  },
  {
    id: "ganancias",
    label: "Las ganancias",
    big: "Al día",
    codes: ["USD"],
    chips: [
      "Tarifa por revisión",
      "Cortes puntuales",
      "Historial de pagos",
      "Métricas personales",
    ],
    copy: "Cada revisión tiene tarifa publicada antes de tomarla. Tu panel muestra lo ganado, lo pendiente y cada corte de pago.",
  },
] as const;

export const PRACTICE_AREAS = [
  { id: "familiar", label: "Familiar" },
  { id: "humanitaria", label: "Humanitaria" },
  { id: "laboral", label: "Laboral" },
  { id: "sijs", label: "Juvenil (SIJS)" },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Reviso dos expedientes con el café de la mañana. La IA deja listo el semáforo; yo pongo el criterio.",
    name: "Andrea T.",
    detail: "Abogada de inmigración · Houston, TX",
  },
  {
    quote:
      "El split-screen me ahorra lo peor del oficio: perseguir documentos. Aquí el caso llega completo o no llega.",
    name: "Marco V.",
    detail: "Práctica humanitaria · Phoenix, AZ",
  },
  {
    quote:
      "Cobro por criterio legal, no por horas de oficina. Y mis métricas hablan por mí.",
    name: "Silvia R.",
    detail: "Familiar y SIJS · Salt Lake City, UT",
  },
] as const;

export const FAQS = [
  {
    q: "¿Cuánto gano por revisión?",
    a: "Cada servicio tiene su tarifa publicada en el panel antes de tomar el caso — la base es 90 USD por veredicto. Cobras por revisión emitida, con cortes puntuales y todo el historial en tu panel de ganancias.",
  },
  {
    q: "¿Necesito licencia en Utah?",
    a: "No. Aceptamos abogados con licencia activa en cualquier estado: la ley de inmigración es federal y la revisión valida cumplimiento documental según el playbook de cada servicio.",
  },
  {
    q: "¿La IA decide por mí?",
    a: "Nunca. La pre-revisión marca el semáforo y señala hallazgos, pero cada veredicto sale con tu criterio y tu nombre. Tú eres la última palabra — para eso buscamos abogados.",
  },
  {
    q: "¿Cuántos casos debo tomar?",
    a: "Los que quieras: la cola es FIFO y no hay cuotas mínimas. Al tomar un caso queda bloqueado para ti; si no lo terminas, se libera automáticamente para otro revisor.",
  },
  {
    q: "¿Qué pasa cuando pido correcciones?",
    a: "El expediente vuelve al equipo de origen con tus hallazgos estructurados. Cuando regresa corregido, entra de nuevo a la cola para revisión final.",
  },
  {
    q: "¿Cómo entro a la red?",
    a: "Envía la solicitud con tu número de licencia. Verificamos tu colegiatura, te invitamos al panel y entras con la siguiente cohorte de revisores.",
  },
] as const;

export const FORM_CODES = [
  "I-130",
  "I-589",
  "SIJS",
  "VAWA",
  "TPS",
  "N-400",
  "DACA",
  "I-918",
  "PERM",
  "I-485",
] as const;

export const CONTACT = {
  phone: "+1 (801) 555-0134",
  phoneHref: "tel:+18015550134",
  email: "abogados@usalatinoprime.com",
  emailHref: "mailto:abogados@usalatinoprime.com",
  offices: ["Salt Lake City, UT — Sede", "Red 100% remota", "50 estados"],
} as const;
