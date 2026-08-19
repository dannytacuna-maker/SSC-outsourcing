# OnTrack — Flagship Upgrade Plan

**Status:** planning lock (awaiting build approval)  
**Live site:** https://ontrack-cr.vercel.app  
**Baseline to beat:** https://www.sscoutsourcing.com  
**Internal premise:** OnTrack generates more revenue for SSC than SSC Outsourcing → OnTrack must be the **flagship** client-acquisition and service-access platform, not a sibling brochure.

Public messaging stays professional and evidence-based. Revenue hierarchy is an **investment priority**, not a public claim.

---

## Existing-page audit (current OnTrack)

URL: https://ontrack-cr.vercel.app/es  
What the business actually is: Contabilidad + planillas + impuestos CR + auditoría + facturación electrónica + zona franca; brand under SSC group; alliance with FaycaTax; 20+ years; Santa Ana office; Shirley Solís contact.  
Who it’s for: Empresas en Costa Rica (locales e internacionales) que necesitan back-office contable/administrativo integrado.  
Current primary CTA: WhatsApp / Contactar / mailto form.

Useful content to carry:
- Six service lines + brochure detail bullets
- Group note (SSC → Outsourcing, OnTrack, COUNTME)
- FaycaTax alliance roles
- 20+ years, address, Shirley contact
- Cinematic reel + FOTOS-SSC photography

Functional requirements:
- ES/EN locales
- Sticky hero + sticky nav + light-band logo swap
- WhatsApp + map/Waze + email contact
- Vercel production deploy

Weak / disposable:
- One-page brochure depth only (no service destinations)
- Mailto form (no qualification, no CRM, no confirmation journey)
- Services as expand cards — hard to share/bookmark
- No path for **existing** SSC/OnTrack clients
- No industry or need-based entry
- Lint debt: `setHeroWatching` in effect; extract scripts in lint path

Top 3 experience failures vs flagship bar:
1. **Access** — visitors cannot find “their” service path; everything is scroll + expand.
2. **Conversion** — contact is generic; no assessment intake, no booking types, no next-step confirmation.
3. **Utility** — site informs; it does not help clients request, prepare, or self-serve.

Scores (current OnTrack, 1–5): impact 3 | brand 4 | clarity 3 | trust 4 | modernity 4  
Scores (SSC Outsourcing live): impact 3 | brand 4 | clarity 3 | trust 4 | modernity 4  

**Verdict:** OnTrack currently ≈ SSC Outsourcing parity (same experience family). Flagship requires **product-like service access**, not a prettier clone.

---

## Competitive gap vs SSC Outsourcing

| Capability | SSC Outsourcing today | OnTrack today | OnTrack flagship target |
|---|---|---|---|
| Hero / brand | Cinematic reel | Same reel family | Keep reel; add purpose after scroll |
| Service discovery | Expand cards on one page | Same | Matcher + dedicated service pages |
| Lead capture | Mailto / WhatsApp | Same | Qualified multi-step assessment |
| Booking | None | None | Service-specific consultation types |
| Existing clients | None | None | Client Access entry (request / docs / meet) |
| Resources | None | None | Deadlines / onboarding / FAQs |
| Industries | Sector chips (static) | None | Path cards with recommended bundles |
| Accessibility | Partial | Partial | Explicit a11y pass (focus, contrast, reduced-motion, lint clean) |

---

## Creative direction (ONE concept)

**Positioning:** OnTrack is SSC’s **operating rail** for accounting and administration — the place clients start when they need clarity, compliance, and a single professional relationship.

**Atmosphere:** Dark cinematic entrance → light operational band → warm OnTrack orange as the only accent. Material metaphor: **instrument panel / rail** — precise, calm, actionable.

**Signature move:** **Service Path** — a guided matcher that turns “I need help with payroll / free zone / taxes” into a recommended bundle + one CTA (assessment or WhatsApp), then deep-links into service pages.

**Type / color:** Keep current OnTrack system (display + body already set; orange `#FF6D2C`). Elevate hierarchy; do not theme-swap.

**Explicitly not doing:**
- Clone SSC Outsourcing section order with orange paint
- Portal theater (login UI with no backend)
- Invented case studies, logos, or SLA numbers
- Public “we earn more than Outsourcing” messaging
- Purple SaaS / cream editorial / neon cosplay

**Why this exceeds a refresh:** The site becomes a **service product**: find → understand → request → confirm. SSC Outsourcing remains a strong brand story page; OnTrack becomes the **working front door**.

---

## Content + section architecture (flagship)

Narrative goal: A decision-maker lands, recognizes OnTrack as the professional operating partner, finds the right service path in under a minute, and starts a qualified conversation.

### Site map (target)

```
/[locale]
  hero + sticky nav
  about / proof
  service path (matcher)
  services overview → /[locale]/servicios/[slug]
  industries → anchors or /[locale]/sectores/[slug]
  client access (entry)
  resources (Phase 2)
  contact / assessment
  footer (group + partners)
```

### Landing sections (new order — one job each)

1. **Hero** — Brand + one support + CTAs (Service Path | Contact) + cinematic reel  
2. **Proof strip** — 20+ years, SSC group, CR operation (facts only)  
3. **Service Path** — Interactive matcher (need → recommendation → CTA)  
4. **Services** — Six lines as destinations (not only expands)  
5. **Industries** — Startup / established local / free-zone & international  
6. **How we work** — Timeline: intake → setup → monthly rail → review  
7. **Alliance** — SSC + FaycaTax roles (support, not identity)  
8. **Client Access** — Existing clients: request document, schedule, WhatsApp support  
9. **Contact / Assessment** — Qualified form + WhatsApp + map  
10. **Footer** — Group brands, legal, locales  

Hero budget:
- [x] Brand hero-level  
- [x] One headline + support + CTA group  
- [x] Full-bleed reel  
- [x] No cards/badges on hero  

Copy plan: elevate + rewrite where needed for paths/intake; preserve verified claims.

---

## Interaction & feature system

### A. Service Path (matcher)
Inputs (3–4 steps):
1. Company type: local | international / free zone | startup / early  
2. Primary need: accounting | payroll | tax | e-invoicing | audit | free zone | “not sure”  
3. Urgency: this month | planning | ongoing partner  
4. Optional: employee range  

Output:
- Recommended primary service + 1–2 supporting services  
- Short “why this path” copy  
- CTAs: **Start assessment** (pre-filled) | **WhatsApp with path summary**

### B. Service pages (`/servicios/[slug]`)
Per service: scope, deliverables, who it’s for, FAQs, related services, assessment CTA. Shareable URLs for sales.

### C. Qualified assessment form
Fields beyond name/email:
- Company, role, employee range, service interest (from path), urgency, message  
- Success state with **explicit next steps** (response window language only if operations confirms)  
- Submit: WhatsApp deep-link with structured message **or** Formspree/Resend/API if approved  

### D. Client Access (Phase 1 = front door only)
Three actions without fake auth:
1. Request a document / report  
2. Schedule a call (Cal.com / calendar link if provided; else WhatsApp schedule intent)  
3. Message support (WhatsApp preset for existing clients)  

Phase 3: real portal / secure upload only when SSC names the system.

### E. Accessibility & craft (bundled into Phase 1)
- Fix lint (`set-state-in-effect`, hook deps, exclude `_extract`)  
- Focus-visible on all interactive controls  
- Reduced-motion respect on reel cuts / PhotoPop  
- Alt text + section landmarks  
- Mobile tap targets on matcher + forms  

---

## Phased delivery

### Phase 1 — Conversion foundation (build next)
Ship bar: OnTrack clearly **more useful** than SSC Outsourcing for finding and starting a service conversation.

1. Fix lint / a11y debt on current experience  
2. Sticky nav: Services, Path, Client Access, Contact  
3. Service Path matcher on home  
4. Six service detail routes + overview links  
5. Qualified assessment form + success next-steps  
6. Client Access section (three intents, no fake login)  
7. Industries band (3 paths → recommended services)  
8. Deploy production  

**Out of Phase 1:** CMS, auth portal, resource library, live calendar unless URL provided.

### Phase 2 — Depth
- Resources: payroll/tax/e-invoice explainers + deadline notes (ops-approved)  
- Expand FAQs per service  
- Lead analytics (events on path complete, assessment submit)  
- Optional Cal.com embed  

### Phase 3 — Client experience
- Secure request / document workflow or SSO to existing SSC tools  
- Status expectations and templates ops can fulfill  

### Phase 4 — Optimize
- Funnel tests on matcher CTAs  
- Lead-quality reporting with Shirley / ops  

---

## Success metrics

- Path completion rate  
- Assessment submit / WhatsApp-with-path rate  
- Booked or confirmed consultations  
- % of inbound with service interest pre-tagged  
- Existing-client Client Access usage  
- Time-to-first-response (ops)  

---

## Locked decisions (2026-08-14)

1. **Contact channels (flexible — all offered):**
   - WhatsApp (`+506 8349 3312`)
   - Call line (same number)
   - Shirley OnTrack email (`ssolis@ontrackcr.net`)
   - **FormSubmit** booking/assessment form (implement for OnTrack; same pattern as SSC when applicable)
2. **Calendar booking link:** **No.** No Calendly/Cal.com. Scheduling intent goes through FormSubmit + WhatsApp/call/email.
3. **Response promise:** **Yes** — responses are quick and daily. Public copy may say replies are handled promptly / same business day (no invented hour SLA).
4. **Client Access:** **OnTrack clients only** for now.
5. **US tax:** Out of OnTrack (SSC Outsourcing line) unless unlocked later.
6. **Custom domain:** Stay on `ontrack-cr.vercel.app`; attach `ontrackcr.net` later.

### FormSubmit notes (Phase 1)
- Wire assessment + Client Access request forms to FormSubmit targeting `ssolis@ontrackcr.net`
- Success UI on-site (next steps: expect a reply the same business day; WhatsApp/call still available)
- Keep WhatsApp, tel:, and mailto: as parallel paths — never force a single channel

---

## Build gate

Say **build Phase 1** to start implementation with the locks above.
