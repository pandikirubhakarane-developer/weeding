# Tamil Wedding Invitation
`npm install && npm run dev` → http://localhost:3000 · `npm run build` → static site in `out/` (deploy to Vercel / Netlify / Cloudflare Pages / any static host).
Set `NEXT_PUBLIC_SITE_URL=https://your-domain` at build time (WhatsApp preview + share link).
## Where things go
- Content (time, venue, reception, gallery, story): `config/wedding.ts`
- Illustrations: `public/images/groom.webp`, `public/images/bride.webp` (transparent)
- Couple photos: put in `public/images/`, list in `gallery` / `story.photo`, set `enableGallery` / `enableStory`
- BGM: `public/audio/wedding-bgm.mp3` (keep ~1–2 MB)
- WhatsApp preview: `public/og.jpg` (1200×630)
- Languages: `locales/*.json`, register in `locales/index.ts`
