# OnTrack — pre-build (Master Prompt V2)

Source of truth:
- Brochure: `ONTRACK/Brochure OnTrack español.pdf`
- Client lock (2026-08-14): Hierarchy — **SSC** (group) manages **SSC Outsourcing**, **OnTrack**, and **COUNTME** as sister brands. OnTrack is **not** operated by SSC Outsourcing. OnTrack is in **alliance with FaycaTax**. Show **20+ years**. Same address as SSC. Brand: solo OnTrack logo + orange `#FF6D2C`.

No live OnTrack site. Brochure = existing page for audit.
Do not clone SSC or FaycaTax sites. OnTrack is the brand; the alliance is the proof.

---

## Client intake

Website / repository: new site (no current URL). Proposed domain from email: `ontrackcr.net`. New Vercel project — not a route on SSC or FaycaTax.
Brand: OnTrack
Offering (one sentence): Alianza estratégica entre SSC Outsourcing y FaycaTax que opera el riel mensual de contabilidad, planillas, impuestos, auditoría, facturación electrónica y zona franca en Costa Rica.
Target customer: Empresas en Costa Rica (locales e internacionales operando aquí) que necesitan back-office contable + criterio tributario en un solo riel, sin montar el departamento.
Primary CTA: Hablar con OnTrack → WhatsApp `+506 8349 3312` / `ssolis@ontrackcr.net`

Verified claims:
- OnTrack is a strategic alliance between FaycaTax and SSC Outsourcing (client)
- 20+ years of experience (client; supersedes brochure “más de 10 años” as the public claim)
- Same office as SSC: Centro Comercial Paseo de Angel, local 12, Santa Ana, San José, Costa Rica
- Maps/Waze: same as SSC (`maps.app.goo.gl/XbPuu5RRmexrtN8A7`)
- Brochure services (rewritable, not invented):
  - Contabilidad: libros, planillas, presentación de impuestos, reportes financieros, contabilidad de costos
  - Impuestos Costa Rica: cumplimiento y asesoría (corto y largo plazo)
  - Régimen zonas francas: obligaciones mensuales, auxiliares de activos fijos, informe anual, acompañamiento auditorías PROCOMER
  - Auditoría: financiera y operativa; foco en áreas clave de riesgo
  - Planillas: cálculo con deducciones/retenciones; banca electrónica; CCSS e INS; aguinaldos; liquidaciones
  - Facturación electrónica: activación con proveedor; emisión según giro; conciliación CxC; reportes periódicos
- Promise: optimize admin structure so the client focuses on the business
- Contact: Shirley Solis · ssolis@ontrackcr.net · +506 8349 3312
- Alliance partners (public, used as partner identity — not as OnTrack founding dates):
  - SSC Outsourcing: accounting / payroll / admin operations; sscoutsourcing.com; founded 2007
  - FaycaTax: tax advisory of Facio & Cañas; faycatax.com; tax practice since 1998

Content that must remain:
- The six service lines and brochure bullets
- Alliance statement: FaycaTax + SSC
- 20+ years
- Santa Ana address (same as SSC)
- Shirley Solis contact
- Promise: client stays on the business

Do not claim:
- US tax as an OnTrack line (brochure does not list it; that stays SSC unless client adds it)
- Facio & Cañas 80 years as OnTrack’s age
- FaycaTax 30 years as OnTrack’s age
- Invented headcount, case studies, or client logos

Competitors (category):
- Local CR accounting boutiques
- Big-four / mid-tier for free-zone
- Payroll-only processors
- Tax boutiques without operations
- Generic outsourcing contable

Visual references (taste, not clone):
- Product-launch precision (instrument / rail)
- Two houses, one track — alliance as dual rails merging, not a logo salad
- Not SSC cinematic office film; not FaycaTax law-firm editorial

Technical constraints:
- Stack: Next.js App Router + TypeScript + Tailwind v4 (new project)
- Hosting: Vercel production (`npx vercel --prod --yes`)
- Forms: mailto / WhatsApp first
- Locales: Spanish default; English `/en` recommended
- Assets: extract OnTrack wordmark from brochure if no SVG
- Partner marks: SSC + FaycaTax logos in the alliance section only (need files or official sites). OnTrack wordmark owns the hero.
- Address, map, Waze: reuse SSC location data
- Do not reuse SSC hero reel as OnTrack identity

Permissions:
- Change copy: yes
- Change structure / IA: yes
- Change / replace assets: yes
- Add dependencies: yes
- Name SSC and FaycaTax: **yes** (alliance is core truth)
- Booking calendar: no unless asked
- Address: **yes** — SSC Santa Ana

Style target: futuristic premium
Success: OnTrack feels like a launched alliance product, not a brochure and not an SSC reskin.

---

## Existing-page audit

URL / path: Brochure PDF only. No public marketing site found.

What the business actually is:
OnTrack is the go-to-market brand of a strategic alliance: SSC Outsourcing (operations: books, payroll, admin, free-zone) + FaycaTax (tax advisory). Together they run the client’s financial month in Costa Rica.

Who it’s for:
Companies in Costa Rica that need operations and tax criterion on one rail — including free-zone operators.

Current primary CTA:
Contact Shirley Solis (phone + email) on brochure page 3.

Useful content to carry (rewritable):
- Alliance: FaycaTax + SSC (client; not in brochure — now primary)
- 20+ years (client; replaces brochure 10+)
- Integrated services → less admin → focus on the business
- Six service lines + bullets
- Shirley Solis contact
- Address: Paseo de Angel, local 12, Santa Ana

Functional requirements:
- Reach Shirley (phone / WhatsApp / email)
- Find the office (address + maps)
- Understand services
- Understand who stands behind OnTrack (two named firms)

Weak or disposable:
- 3-page print skeleton
- Numbered 1–6 catalog
- Generic “total confianza” without the alliance
- Brochure-as-webpage
- SSC page structure
- Treating OnTrack as “another SSC product” (wrong; it is the alliance)

Top 3 experience failures:
1. No website.
2. Brochure hides the real story (alliance) and understates tenure (10+ vs 20+).
3. Print catalog, contact on page 3, no place.

Scores (1–5): impact 2 | brand 2 | clarity 3 | trust 3 | modernity 1

Research note: brochure + SSC site + FaycaTax site = research, not wireframes.

---

## Creative direction (ONE concept to build)

**Locked concept: The operating rail — two houses, one track**

Positioning:
OnTrack is the monthly operating rail built by SSC and FaycaTax. Operations and tax on one path — so the company stays on its own work.

Atmosphere:
Dark (near-black void, lifted steel). Precision rail. Two parallel guides that merge into one luminous track. Engineered quiet. Not office cinema. Not law-firm marble. Not neon.

Signature move:
Full-bleed **monthly rail**. Stations are the month. Mid-page, the rail is revealed as two source lines — SSC (operate) and FaycaTax (tax) — locking into OnTrack. Brand name is the product. Not a card grid. Not a dual-logo hero.

Type thesis:
Sharp geometric grotesque (not Inter, not SSC Source Serif, not law-firm Trajan). Body: clean grotesque. Mono for stations, address, contact.

Color thesis:
Neutrals: void `#07080A`, charcoal, ink-white, steel.
ONE accent: **signal lime** `#C6F04A` (on-track). CTA, active rail, one underline.
Partner color is not allowed to split the page: SSC blue and FaycaTax identity stay inside partner marks, not the system.
If extracted OnTrack logo conflicts, keep the mark authentic; accent stays signal, not SSC blue.

Explicitly not doing:
- Brochure skeleton
- SSC skeleton
- Dual-logo hero / “powered by” sticker farm
- Theme-swap of SSC or FaycaTax
- Purple SaaS / cream editorial / neon
- Hero cards, pills, stats in first viewport
- Claiming US tax, Facio 80 years, or FaycaTax 30 years as OnTrack’s age

Why this exceeds a typical refresh:
The alliance is the story the brochure never told. The site launches OnTrack as the product of two firms, with a rail you can feel.

---

## Content + section architecture

Narrative goal:
In one sitting: OnTrack keeps the financial month on rails; SSC + FaycaTax stand behind it; 20+ years; reach Shirley in Santa Ana.

Sections (new order — one job each):

1. **Desire** — Hero
   Headline: Operá el mes. Nosotros el riel.
   Support: Contabilidad, planillas, impuestos, auditoría y zona franca — en ritmo, para que tu equipo no se baje del negocio.
   CTA: Hablar con OnTrack (WhatsApp) + Ver el riel
   Media: Full-bleed rail. ONTRACK wordmark at hero scale. No partner logos, no chips, no “20+” badge in the hero.
   English: Run the month. We run the rail.

2. **Promise** — Why the rail
   Job: Make “on track” concrete.
   Support: Más de 20 años de criterio operativo y tributario, en un solo riel, para que la estructura administrativa no coma el negocio.
   Media: One long rail (not three cards). Tenure lives here as a line of copy, not a hero sticker.

3. **Alliance** — Two houses, one track
   Job: Name the alliance without stealing the brand.
   Headline: SSC y FaycaTax. Un riel.
   Support: OnTrack es la alianza: SSC opera el back-office; FaycaTax aporta el criterio tributario. El cliente no parte el mes entre dos proveedores.
   Marks: partner wordmarks, equal weight, subordinate to OnTrack.
   Links: sscoutsourcing.com · faycatax.com (new tab)
   Do not turn this into bios, 7 values, or AAA.

4. **Stations** — Six services as one journey
   Operating order (not PDF order):
   1. Contabilidad
   2. Planillas
   3. Impuestos Costa Rica
   4. Facturación electrónica
   5. Régimen zonas francas
   6. Auditoría
   Brochure bullets on detail. No new claims.

5. **Place + person** — Santa Ana / Shirley
   Job: Trust you can visit and a name you can call.
   Shirley Solis. Address: Centro Comercial Paseo de Angel, local 12, Santa Ana, San José. Map + Waze (SSC location). Phone + email.

6. **Close** — Contact
   WhatsApp +506 8349 3312 · ssolis@ontrackcr.net · short form · address repeated.
   No booking calendar unless requested.

Footer: OnTrack · Alianza SSC × FaycaTax · Santa Ana · contact.

Hero budget:
- [x] Brand hero-level
- [x] One headline + one support + CTA group
- [x] One dominant full-bleed visual
- [x] No cards/badges/chips on hero (20+ and partner logos wait until sections 2–3)

Copy change plan: elevate brochure Spanish; add English; alliance copy is new from client truth.
Claims source: intake verified list only.

Nav: El riel · Alianza · Servicios · Contacto · Hablar con OnTrack
Locales: `/` `/es` Spanish; `/en` English.

---

## Build notes (after approval — not started)

- New Next.js app. Separate Vercel project.
- Extract OnTrack wordmark from brochure if no SVG.
- Get SSC + FaycaTax marks for the alliance section (from existing SSC logo + FaycaTax site, or client files).
- Office stills may support place (same address) but must not become an SSC clone hero.
- Deploy: `npx vercel --prod --yes`
- QA clone test vs brochure, vs SSC, vs FaycaTax — all three must fail.

Open locks (defaults if they say build):
1. ES+EN (yes)
2. Domain `ontrackcr.net` when available
3. WhatsApp/email only (no booking)
4. Logo vector if they have it
5. Partner logo files if they have official versions
