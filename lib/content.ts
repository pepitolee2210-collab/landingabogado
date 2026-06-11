/**
 * Datos neutrales al idioma. Todo el copy bilingüe vive en lib/i18n/.
 *
 * Storyboard de escenas dither (arte 100% procedural, ver lib/dither/shapes.ts):
 *   hero → balanza · visión → multitud · manifesto → cordillera ·
 *   stats → colmena · cta → arco · footer → mazo.
 */

export const IMG = {
  hero: "procedural:scales",
  vision: "procedural:crowd",
  manifesto: "procedural:wasatch",
  stats: "procedural:beehive",
  arch: "procedural:arch",
  footer: "procedural:gavel",
} as const;

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
  email: "henry@usalatinoprime.com",
  emailHref: "mailto:henry@usalatinoprime.com",
} as const;
