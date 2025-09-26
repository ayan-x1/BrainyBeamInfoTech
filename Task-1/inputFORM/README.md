<div align="center">

  <img src="public/form-icon.svg" alt="Form Icon" width="72" height="72" />

  <h2>Input Form — Vite + React + TypeScript</h2>
  <p>Clean, fast, and modern dynamic form builder with shadcn UI and Supabase.</p>

</div>

---

### Features

- **Dynamic form**: Config-driven fields with validation via `react-hook-form` + `zod`.
- **Beautiful UI**: `shadcn/ui` + `Tailwind CSS` components.
- **State & data**: `@tanstack/react-query` integration ready.
- **Supabase**: Pre-wired client for auth/storage/DB.
- **DX**: Vite, TypeScript, ESLint, and hot reload.

### Tech Stack

- **Build**: Vite + TypeScript + React 18
- **UI**: Tailwind CSS, shadcn/ui, Radix Primitives
- **Forms**: react-hook-form, zod
- **Data**: @tanstack/react-query
- **Backend-as-a-Service**: Supabase

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Build Locally

```bash
npm run preview
```

## Supabase Setup (optional)

If you plan to use Supabase features:

1. Create a project at `https://supabase.com`.
2. Copy your Project URL and anon key.
3. Initialize the client in `src/integrations/supabase/client.ts` with your env values.
4. If using migrations, see `supabase/migrations/` and `supabase/config.toml`.

Consider storing secrets via environment variables and reading them in Vite using `import.meta.env`.

## Project Structure

```
src/
  components/          # UI + form components (shadcn/ui)
  hooks/               # Reusable hooks
  integrations/        # Supabase client & types
  lib/                 # Utilities
  pages/               # Routes
  main.tsx             # App entry
public/                # Static assets
```

## Deploy

This is a static SPA; deploy the `dist/` output to any static host (Vercel, Netlify, GitHub Pages, etc.).

Basic steps:

1. Build: `npm run build`
2. Deploy the `dist/` directory with your provider.

## Contact & Support

- **Email**: [pathanayan8347@gmail.com](mailto:pathanayan8347@gmail.com).
- **Phone**: [+91 9313917598](tel:+919313917598).
- **Questions & help**: Start a Discussion or check existing issues/discussions first.
- **Commercial support**: If you need priority assistance or custom features, add your preferred contact channel here.