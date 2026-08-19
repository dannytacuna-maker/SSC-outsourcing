# SSC Outsourcing

Bilingual marketing site for SSC Outsourcing (Costa Rica).

## Stack

- Next.js App Router + TypeScript + Tailwind CSS v4
- Locales: `/es` (default), `/en`

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/es`.

## Layout

```
src/                 app, components, copy
public/logo-ssc.png  official logo (unmodified)
public/media/        hero reel (5s hard cuts)
public/photos/       web-optimized company photos
client/              brochure + notes (not deployed)
VIDEOS/              source clips (gitignored)
FOTOS-SSC.zip        photo archive (gitignored)
```

## Deploy

```bash
npx vercel --prod
```
