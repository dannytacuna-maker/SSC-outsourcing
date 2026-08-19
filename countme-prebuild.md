# Countme — pre-build (Master Prompt V2)

Source of truth:
- Brochure: `COUNTME/Original COUNTME.pdf`
- Group lock (2026-08-14): SSC manages SSC Outsourcing, OnTrack, and COUNTME as sister brands.
- Live OnTrack (`https://ontrack-cr.vercel.app`) = structural blueprint (About / Why / Services / Contact), not a visual wireframe.
- Photos: not available at build. Ship logo + Countme green. Swap photos later.

Playbook for future sisters: `CURSOR FILES/ssc-sister-site-playbook.md`.

---

## Client intake

Website / repository: new site. Brochure domain: `www.countmecr.com`. New Vercel project — not a route on SSC or OnTrack.
Brand: Countme (wordmark COUNT + ME)
Offering (one sentence): Outsourcing in accounting, tax compliance, payroll, audit, free-zone, and administrative processes for companies in Costa Rica.
Target customer: Local industrial and professional firms through large international corporations operating in Costa Rica.
Primary CTA: Contactar → WhatsApp / email `ssolis@countmecr.com` / form

Verified claims:
- Founded in 2007
- Highly experienced professionals; outsourcing in Accounting, Tax Compliance, and Payroll
- Long-standing client relationships for more than 15 years
- Clients range from local industrial and professional companies to large international corporations
- Santa Ana, San José, Costa Rica
- ssolis@countmecr.com · www.countmecr.com · + (506) 8349-3312
- Quality service lines (brochure): Accounting, Payroll, Tax Compliance in Costa Rica, Auditing, Free Zone Regime, Administrative Solutions, Business Process / other services
- Promise: integral accounting designed to downsize administrative structure so the client focuses on core business
- Why Countme: Personalized attention · Knowledge and experience · Confidentiality · Compliance and control
- Industries served (brochure “OUR CLIENTS”): goods and services, hotel and restaurants, inactive companies, rental properties, industrial, producer events, construction, gyms, transport, agricultural companies, holding, real estate, HOA management, property managers, surf schools, escrow
- Sister brand of the SSC group (client lock; not on the brochure — footer only)

Content that must remain:
- Seven service families and their brochure bullets
- Founded 2007 / 15+ years of client relationships
- Four why-values
- Industry list (rewritable as “who we serve”, not a logo wall)
- Shirley contact on the Countme channels above
- Promise: client stays on the business

Do not claim:
- FaycaTax alliance (that is OnTrack)
- 20+ years (OnTrack lock; Countme brochure says founded 2007 and 15+ years with clients)
- Invented photos, team headshots, case studies, or client logos
- US tax as a Countme line
- Brochure typos as public copy (`bussiness`, `objetively`, `aperations`)

Competitors (category):
- Local CR accounting boutiques
- Payroll-only processors
- Tax boutiques without operations
- Generic outsourcing contable

Visual references (taste, not clone):
- Brochure wordmark: COUNT charcoal, ME forest green `#008037`
- Dark wordmark: COUNT white, ME green
- Tally / ledger precision — personal count, not a rail, not office cinema, not brochure hexagons
- No OnTrack orange, no SSC blue as the system

Technical constraints:
- Stack: Next.js App Router + TypeScript + Tailwind v4 (`COUNTME/web`)
- Hosting: Vercel production from `COUNTME/web`
- Forms: FormSubmit → `ssolis@countmecr.com` + WhatsApp / tel / mailto
- Locales: Spanish default; English `/en`
- Assets: extract Countme wordmark from brochure; no photos this round
- Address / map / Waze: SSC Santa Ana office (group office)

Permissions:
- Change copy: yes
- Change structure / IA: keep About / Why / Services / Contact
- Change / replace assets: extract logo; atmosphere until photos
- Add dependencies: yes
- Name SSC: footer only
- Booking calendar: no

Style target: futuristic premium
Success: Countme feels like a launched brand of its own — same family as OnTrack in structure, unrecognizable as an OnTrack reskin.

---

## Existing-page audit

URL / path: Brochure PDF only. `countmecr.com` did not resolve at build time.

What the business actually is:
Countme is an outsourcing firm (founded 2007) that runs accounting, tax compliance, payroll, audit, free-zone, and administrative work so Costa Rica companies can shrink internal admin and stay on the business.

Who it’s for:
Local industrial and professional companies through large international corporations, across the brochure’s industry list.

Current primary CTA:
Contact block on brochure page 1 (email, web, phone).

Useful content to carry (rewritable):
- Founded 2007; 15+ years of client relationships
- Integrated outsourcing promise
- Seven service families + bullets
- Four values
- Industry list
- Santa Ana + Shirley Countme channels

Functional requirements:
- Reach Shirley (phone / WhatsApp / email / form)
- Find the office
- Understand services
- Switch ES / EN

Weak or disposable:
- 5-page print catalog
- Hexagon / circle photo frames
- Checkmark sidebar as a webpage
- English-only print (site must be bilingual)
- Using OnTrack’s orange cinematic reel as identity

Top 3 experience failures:
1. No working website.
2. Brochure is a service catalog; the brand promise (“count me”) never becomes an experience.
3. No path to act except reading a phone number on page 1.

Scores (1–5): impact 2 | brand 3 | clarity 3 | trust 3 | modernity 1

Research note: brochure + OnTrack live + SSC live = research, not wireframes.

---

## Creative direction (ONE concept to build)

**Locked concept: The personal count — a living ledger**

Positioning:
Countme is the outsourcing ledger that stays with you. The count is personal: your books, your payroll, your tax, your name on the relationship — since 2007.

Atmosphere:
Dark ink with a green-black undertone. Forest green `#008037` as the only accent (the ME). Charcoal as the COUNT. Quiet, precise, counted. Not mint brochure paper. Not OnTrack orange. Not SSC navy cinema.

Signature move:
Full-bleed **tally field**. A vertical ledger line with hash marks runs through the page; each section is a counted line. Hero is the COUNTME wordmark at product scale on that field, green light falling off the ME. No photo until the client sends one. No hexagons.

Type thesis:
Geometric display with weight (Syne) — not Inter, not Cormorant, not Source Serif. Body: Sora.

Color thesis:
Neutrals: void `#070907`, elevated charcoal, ink-white, mute sage-gray.
ONE accent: brochure green `#008037`. CTA, ME, tally hashes, one underline.
Gold/tan PDF outline on some dark embeds is treated as export artifact, not a second accent.

Explicitly not doing:
- Brochure skeleton / hexagon collage
- OnTrack skeleton with green paint
- Service-path matcher (OnTrack flagship; not requested)
- FaycaTax lockup
- Purple SaaS / cream editorial / neon
- Hero cards, pills, stats stickers
- Fake stock photography

Why this exceeds a typical refresh:
The brochure listed services. The site makes Countme feel like a counted relationship — a ledger you enter — with the wordmark as the product and green as a rare signal.

---

## Content + section architecture

Narrative goal:
In one sitting: Countme has kept the count since 2007; they take the admin so you keep the business; here is the work; reach Shirley in Santa Ana.

Sections (one job each):

1. **Desire** — Hero
   Headline (sr-only): El conteo de su empresa, en una sola relación.
   Support: Contabilidad, planillas, impuestos, auditoría y administración — para que su equipo se quede en el negocio.
   CTA: Contactar + Ver servicios
   Media: Full-bleed tally field + COUNTME wordmark at hero scale. No chips, no 2007 badge, no industry pills.

2. **About** — Who Countme is
   Founded 2007. Outsourcing in accounting, tax, payroll. Client relationships 15+ years. Local firms to international corporations.
   Who we serve: industry list as a measured stream, not a card grid.

3. **Why Countme** — The standard
   Four brochure values as ledger lines (not three photo cards):
   Personalized attention · Knowledge and experience · Confidentiality · Compliance and control
   Promise: downsize admin, keep focus on the core business.

4. **Services** — Seven counted lines
   01 Accounting
   02 Payroll
   03 Tax compliance
   04 Administrative (includes electronic invoicing)
   05 Auditing
   06 Free-zone regime
   07 Other services (CPA / statements / cash flows / reconstruction / inventory / budgets)
   Brochure bullets on expand. Inquire → contact with service context.

5. **Contact** — Place + person
   Shirley via Countme channels. Address: Paseo de Angel, local 12, Santa Ana. Map + Waze. Form + WhatsApp + call + email.

Footer: Countme · Accounting, Tax, Auditing & Payroll · Marca del grupo SSC · Santa Ana

Hero budget:
- [x] Brand hero-level
- [x] One headline + one support + CTA group
- [x] One dominant full-bleed visual (tally field until photos)
- [x] No cards/badges/chips on hero

Copy change plan: elevate brochure English into bilingual ES/EN; fix typos; do not add claims.
Claims source: intake verified list only.

Nav: Sobre Countme · Por qué Countme · Servicios · Contacto · ES/EN

---

## Build notes

- New Next.js app in `COUNTME/web`. Separate Vercel project `countme`.
- Extract wordmark from brochure embeds (on-dark + on-light).
- Photos: placeholder atmosphere only. `public/photos/` reserved.
- Deploy: `cd COUNTME/web` then `npx vercel --prod --yes`
- QA clone test vs brochure, vs OnTrack, vs SSC — all three must fail.
