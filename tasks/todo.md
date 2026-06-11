# Project Status — USALATINO PRIME · Landing del SaaS de abogados

## Reconversión 2026-06-10 — landing B2B (reclutamiento de abogados)
- [x] Nueva audiencia: **abogados de inmigración** que se unen a la red de revisión legal (el SaaS de `E:\Plataforma abogado\abogados-app`, deploy `abogados.usalatinoprime.com`)
- [x] Contenido extraído del producto real: cola FIFO con lock, pre-revisión IA (Claude + playbook, semáforo), revisión split-screen, veredicto (validar / pedir correcciones + webhook), panel de ganancias (tarifa base **90 USD/revisión**, `tariff_per_review`), métricas, acreditación por invitación/cohortes
- [x] Secciones remapeadas: Manifesto "La IA prepara / Tú decides / Nosotros pagamos" · Plataforma (6 módulos) · Proceso (solicitud→acreditación→cola→cobro) · Stats (90 USD / 15 min / 48 h / 100% remoto) · Módulos (4 tabs: cola/revisión/veredicto/ganancias) · Form ULP-AB de acreditación (licencia bar + área) con sello "EN COLA"
- [x] Mismo sistema visual (dither, Utah, scroll effects); favicon ✦ añadido; build limpio

## Historia previa (B2C migratoria, estilo sondaven, branding Utah)

## Reestructura de efectos 2026-06-09 (noche)
- [x] **DitherCanvas animable**: API imperativa (`setLayer`/`render`) para conducir capas con ScrollTrigger — la firma real de sondaven
- [x] Hero: la estatua **se teje de arriba a abajo** al cargar + label con typewriter y caret dorado
- [x] Nueva sección **Manifesto**: "Cruzaste *fronteras* / Construiste *una vida* / Asegura *tu futuro*" — líneas display gigantes con deriva horizontal opuesta scrubbed
- [x] **Process → scrollytelling pinned** (420vh): pasos 01–04 se suceden, riel dorado se llena, rombos se encienden en rojo; fallback estático en móvil/reduced-motion
- [x] Stats: la **colmena se construye con el scroll** (scrub de bounds de capa)
- [x] CTA: el **Arco Delicado se levanta del suelo** al entrar la sección
- [x] Marquee **reactivo a velocidad de scroll** (acelera y decae)
- [x] `data-parallax` declarativo (testimonios a 3 velocidades) + contador de progreso 01/06 en Services + outro monumental "USALATINO ✦ PRIME" en footer
- [x] Build de producción limpio + verificación visual

## Rebrand 2026-06-09 (tarde)
- [x] Marca: **Usalatino Prime**, sede Salt Lake City, UT (tel 801, oficinas SLC/West Valley/Provo)
- [x] Paleta Utah: navy bandera `#0f2148`, papel `#f2ead3`, dorado colmena `#f3b229`, rojo cañones `#a63a2b` (accent por tema: gold en dark, rock en light)
- [x] Efectos premium añadidos: cursor custom (punto + anillo dashed que gira sobre interactivos), hilo de progreso dorado, swap de caracteres en nav, combs de transición entre secciones, glitch con bandas doradas, lockup mixto Doto+serif itálica ("Usalatino *Prime*"), acentos `<em>` itálicos en headings
- [x] Texturas procedurales de Utah: **Arco Delicado** (CTA) y **colmena/skep** (stats) con ruido de tono medio para dither correcto
- [x] Build de producción limpio + verificación visual desktop

## Estado actual (2026-06-09)
- [x] Análisis completo de sondaven.com → `analysis/design-analysis.md` + capturas en `analysis/screens/`
- [x] **Landing one-page construida y verificada** — Next.js 16.2.8 + TS + Tailwind 4 + GSAP 3.15 + Lenis
- [x] L1 Fundación: escala fluida 1vw/14.4, tokens papel/tinta, Instrument Serif + Doto, eases custom del original
- [x] L2 DitherCanvas WebGL: shader de barras verticales (port del original), capas, glitch bands, fuente procedural (`procedural:*`)
- [x] L3 Preloader (% real + cortina pixelada), header (hide on scroll + tema por sección), hero pinned con shrink-to-frame
- [x] L4 Secciones: prólogo (highlight scrub), servicios (scroll horizontal), proceso 01–04, stats (count-up por IO), visas (tabs), testimonios, formulario VN-01 con sello "RECIBIDO", FAQ acordeón, footer con marquee + contactos gigantes
- [x] L5 Verificación visual desktop + móvil con Playwright, build de producción limpio

## Decisiones tomadas
- Marca ficticia: **VÍA NORTE** · concepto "EL EXPEDIENTE" (papel #e9e2cf / tinta #181f2e / sello #b5402c)
- Fuentes libres: Instrument Serif (display) + Doto (técnica dot-matrix, eco de KTF Metro Blueline)
- Imágenes: Unsplash hotlink (hero estatua, stats skyline, footer manos) con fallback procedural si fallan
- Sin imagen en prólogo: textura procedural de cordillera (más limpia que cualquier foto de tonos medios)

## Pendiente / siguientes pasos
- [ ] Conectar formulario a backend (Supabase: tabla `leads` + RLS) — hoy simula el envío en cliente
- [ ] Reemplazar imágenes Unsplash por assets propios del cliente
- [ ] Menú overlay móvil (hoy el nav central se oculta en <992px, solo queda CTA)
- [ ] Deploy a Vercel
- [ ] Páginas internas (blog, detalle de visas) — fase 2

## Lecciones de esta sesión → ver tasks/lessons.md
