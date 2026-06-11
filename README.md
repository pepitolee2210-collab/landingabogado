# Usalatino Prime · Landing de abogados

Landing one-page que recluta abogados de inmigración para la red de revisión
legal de Usalatino Prime (`abogados.usalatinoprime.com`): expedientes
migratorios pre-revisados con IA, veredictos con criterio del abogado y pago
por revisión.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS 4
- **GSAP 3.15** (ScrollTrigger, SplitText, CustomEase) + **Lenis** smooth scroll
- WebGL propio: `lib/dither/DitherCanvas.tsx` — shader de tramas de barras
  verticales (capas animables por scroll, texturas procedurales `procedural:*`)

## Identidad

Branding Utah: navy `#0f2148`, papel `#f2ead3`, dorado colmena `#f3b229`,
rojo cañón `#a63a2b`. Tipografías: Instrument Serif + Doto. Escala fluida
(`html { font-size: 1vw }`, mockup 1440 / ratio 14.4).

## Desarrollo

```bash
npm install
npm run dev     # localhost:3000
npm run build
```

## Pendiente

- Conectar el formulario de acreditación (ULP-AB) a Supabase + Resend
- Deploy en Vercel (p. ej. `unete.usalatinoprime.com`)

El estado del proyecto y las decisiones viven en `tasks/todo.md` y
`tasks/lessons.md`.
