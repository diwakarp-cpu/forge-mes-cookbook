# Forge MES Product Cookbook

A public, self-service guide for learning Forge MES and following the correct
setup-to-shipment sequence.

## Run locally

Requirements:

- Node.js 20.9 or newer
- Corepack with pnpm 9

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`. The root URL redirects to the cookbook.

## Deploy

Use these settings on a Next.js-compatible hosting platform:

- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`
- Start command, when requested: `pnpm start`
- Environment variable: `NEXT_PUBLIC_SITE_URL=https://your-production-domain`

No database, Payload CMS, or private source archive is required. The public
cookbook content is stored in
`content/cookbooks/forge/forge-public-guide.json`.

The downloadable PDF is served from
`/api/cookbooks/forge/download`.
