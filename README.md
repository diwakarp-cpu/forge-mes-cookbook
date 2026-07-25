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

The repository includes:

- `boltic.yaml` with the Boltic application and port configuration
- A multi-stage `Dockerfile` that builds the Next.js standalone server
- A production runtime listening on `0.0.0.0:8080`

For other Next.js-compatible hosting platforms, use:

- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`
- Start command, when requested: `pnpm start`
- Environment variable: `NEXT_PUBLIC_SITE_URL=https://your-production-domain`

No database, Payload CMS, or private source archive is required. The public
cookbook content is stored in
`content/cookbooks/forge/forge-public-guide.json`.

The downloadable PDF is served from
`/api/cookbooks/forge/download`.
