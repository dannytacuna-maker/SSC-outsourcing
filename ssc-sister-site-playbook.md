# SSC sister-site playbook

Reusable operating plan for every new SSC group brand site (OnTrack, Countme, and future sisters). Fill a new `*-prebuild.md` from this file. Do not skip stages.

Source system: landing-redesign skill · Master Prompt V2.

---

## Pipeline (never skip)

```
Existing page / brochure
  → Business truth + useful content + functional requirements
  → New positioning and creative concept
  → New information architecture
  → New visual system and page experience
```

Old brochure or sibling site = research material, not a wireframe.
Deliverable = a new brand asset (futuristic premium), not a restyle.

---

## Group facts (carry unless the client overrides)

- **SSC** is the group. Sister brands today: **SSC Outsourcing**, **OnTrack**, **COUNTME**.
- OnTrack is **not** operated as a product of SSC Outsourcing. OnTrack is in **alliance with FaycaTax**. Countme is **not** that alliance unless a later lock says so.
- Shared office unless a brand file says otherwise: Centro Comercial Paseo de Angel, local 12, Santa Ana, San José, Costa Rica.
- Maps: `https://maps.app.goo.gl/XbPuu5RRmexrtN8A7`
- Waze: `https://www.waze.com/ul?ll=9.9310625,-84.1795625&navigate=yes`
- Contact person in current files: Shirley Solís. Use the **brand’s own** email, phone, and WhatsApp from that brand’s brochure or client lock — do not copy OnTrack’s live numbers onto another brand.
- Public claims: only brochure + client lock. Never invent headcount, case studies, client logos, SLAs, or another brand’s tenure.

---

## Default intake (copy into the brand pre-build)

```
Website / repository:
Brand:
Offering (one sentence):
Target customer:
Primary CTA (label + destination):

Verified claims (only what we can stand behind):
-

Content that must remain:
-

Do not claim:
-

Visual references (taste, not to clone):
- This brand’s logo + color from its brochure
- Not SSC cinematic office film
- Not OnTrack orange rail
- Not a brochure-as-webpage

Technical constraints:
- Stack: Next.js App Router + TypeScript + Tailwind v4
- App lives in BRAND/web (separate Vercel project — never deploy over SSC or a sibling)
- Hosting: npx vercel --prod --yes from BRAND/web
- Forms: FormSubmit to the brand email + WhatsApp / tel / mailto parallel
- Locales: Spanish default `/es`; English `/en`
- Photos: if missing, ship logo + color atmosphere; swap photos in later without changing IA

Permissions:
- Change copy: yes (elevate; fix brochure typos; do not invent)
- Change structure / IA: follow the locked nav below unless the client asks for more
- Change / replace assets: extract logo from brochure; do not redraw unless the extract is unusable
- Add dependencies: yes
- Name SSC: yes as group, quietly (footer), unless the brand’s story is the alliance
- Booking calendar: no unless asked
```

---

## Locked page structure (SSC sister blueprint)

Nav and primary IA stay the same across sisters so the group feels related. Visual system, positioning, and section craft must be unique to the brand.

1. **Hero** — brand-level wordmark, one support line, CTA group, full-bleed atmosphere (photo when we have it; engineered color field until then). No cards, badges, or chips on the hero.
2. **About** — who the firm is, tenure/founding, who it serves.
3. **Why** — why this brand, from brochure values / proof. Not a feature-pill row.
4. **Services** — brochure lines with real bullets. Expand or detail in place on v1; dedicated `/servicios/[slug]` only if the client asks or the line count needs shareable URLs.
5. **Contact** — WhatsApp + call + email + FormSubmit + map/Waze + address.

Footer: brand + one-line offer + quiet SSC group note + © year.

Do **not** copy another sister’s signature move (OnTrack rail / matcher, SSC office reel, Countme tally) onto the next brand.

---

## Pre-build gate (write these three before UI code)

1. Existing-page audit (brochure or live URL)
2. Creative direction — **one** concept
3. Content + section architecture

Save as `CURSOR FILES/<brand>-prebuild.md`.

Then implement that one concept. Browser-check desktop / tablet / mobile. Score with the Final QA rubric. Deploy production from `BRAND/web`.

---

## Visual rules

- Futuristic premium: depth, one light logic, distinctive type, materials — not decoration.
- Color: neutrals do the work; **one** accent from the brand mark.
- Type: not Inter / Roboto / Arial as the display voice; not the same pairing as SSC (Source Serif) or OnTrack (Cormorant + Inter).
- Hero budget: brand readable at hero scale without the nav.
- Photos later: keep overlay, type, and CTA; replace only the atmosphere plane.
- Clone test must fail vs brochure **and** vs every sibling site.

---

## Build / deploy checklist

```
BRAND/
  Original <brand>.pdf          # client brochure (research)
  web/                          # Next.js app, separate Vercel project
CURSOR FILES/
  <brand>-prebuild.md           # intake + audit + direction + IA
  scripts/<brand>-*.py/.mjs     # logo extract helpers
```

- Extract wordmark: on-dark (transparent) + on-light (transparent). Favicon from mark or a simple brand glyph.
- Contact API posts to FormSubmit at the brand email.
- Deploy: `cd BRAND/web` then `npx vercel --prod --yes` (new project, do not link to ssc-site or ontrack-cr).
- Agent docs stay in `CURSOR FILES/`. Client-facing app stays in `BRAND/web`.

---

## When photos arrive

1. Optimize into `BRAND/web/public/photos/`.
2. Put them on the hero atmosphere plane and, if they earn it, About / Why — never as hero cards.
3. Re-verify desktop / tablet / mobile and redeploy production.
