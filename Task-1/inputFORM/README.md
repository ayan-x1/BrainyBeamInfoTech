## InputFORM

A lightweight React + TypeScript app to design, validate, and submit dynamic forms. Powered by Vite, Tailwind CSS, and shadcn/ui with Supabase integration.

---

### ✨ Features
- **Config-driven forms** with validation (react-hook-form + zod)
- **Clean UI** with shadcn/ui + Tailwind CSS
- **Submissions view** component included
- **Great DX**: Vite, TypeScript, hot reload
- **Supabase-ready** client and types (optional)

### 🚀 Quick start
```bash
# Install
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 🧰 Tech stack
- React 18 + TypeScript (Vite)
- Tailwind CSS + shadcn/ui (Radix Primitives)
- react-hook-form + zod
- @tanstack/react-query
- Supabase (optional)

### 📁 Structure (key parts)
```
src/
  App.tsx
  main.tsx
  components/
    DynamicForm.tsx
    FormSubmissions.tsx
    ui/                # shadcn/ui components
  hooks/
  integrations/
    supabase/
      client.ts
      types.ts
  pages/
    Index.tsx
    NotFound.tsx
```

### 🔧 Scripts
- `npm run dev`: start dev server
- `npm run build`: production build
- `npm run preview`: preview built app
- `npm run lint`: run ESLint

### 📦 Requirements
- Node.js 18+

### 📝 Notes
- App styles: `src/App.css`, Tailwind config: `tailwind.config.ts`
- Form icon: `public/form-icon.svg`
- Supabase is optional; configure `src/integrations/supabase/client.ts` if used

---
Made for clarity and speed.