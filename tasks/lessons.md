# Lessons Learned

## 2026-06-09: Siluetas uniformes oscuras rompen el dither de barras
**Error**: El arco y la colmena procedurales se renderizaban como masa sólida, no como tramas.
**Root cause**: Silueta a un solo gris muy oscuro → brillo normalizado 0 → todas las barras al 102% del cell se funden entre sí.
**Rule**: Las texturas para el shader de barras necesitan variación de tono medio dentro de las formas (ruido 70–140 de gris); el rango de brillo debe caer DENTRO de [blackPoint, whitePoint], no por debajo.

## 2026-06-09: Plugins GSAP sin registrar en efectos de hijos
**Error**: `_context is not a function` al montar — Header/Hero usaban ScrollTrigger antes de que el Shell lo registrara.
**Root cause**: En React los useEffect de los hijos corren ANTES que el del padre; registrar plugins en el efecto del Shell llega tarde.
**Rule**: Registrar plugins GSAP en el scope del módulo (`if (typeof window !== "undefined") setupGsap()`) en el archivo que todos importan, nunca en un useEffect.

## 2026-06-09: Acordeón con grid 0fr no colapsa
**Error**: Todas las respuestas del FAQ aparecían abiertas.
**Root cause**: En el truco `grid-template-rows: 0fr→1fr`, el hijo necesita `min-height: 0`; su min-content impide colapsar la fila.
**Rule**: Todo acordeón con grid-rows necesita `min-height: 0` + `overflow: clip/hidden` en el hijo directo.

## 2026-06-09: SplitText por chars rompe palabras al final de línea
**Error**: La cita del prólogo cortaba "FAMILIA Q-UE" entre líneas.
**Root cause**: `type: "chars"` solo: los chars son inline-block y el navegador parte donde sea.
**Rule**: Para animar chars en texto multilínea usar `type: "words,chars"` — los chars animan, las palabras envuelven.

## 2026-06-09: next@latest puede resolver a un preview sin binarios
**Error**: Build falló — `@next/swc-win32-x64-msvc 16.3.0-preview.0` da 404.
**Root cause**: El dist-tag `latest` de next apuntaba a un preview sin SWC publicado para Windows.
**Rule**: Pinear Next a la versión estable (`backport`/X.Y.Z concreta) en Windows; verificar dist-tags si el build falla descargando SWC.

## 2026-06-09: El efecto dither necesita siluetas, no fotos de tonos medios
**Error**: Escenas dither se veían como "estática gris" (fotos de ciudad/carretera).
**Root cause**: El shader mapea oscuridad→ancho de barra; los tonos medios uniformes producen un campo gris sin forma.
**Rule**: Para dither de barras elegir imágenes con silueta clara y grandes áreas vacías, o crushear niveles (blackPoint/whitePoint) hasta lograr bimodalidad; si no hay imagen buena, usar textura procedural.
