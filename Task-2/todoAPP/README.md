## Todo App

A tiny, fast React + TypeScript app to add, complete, filter, and manage tasks. Built with Vite, Tailwind CSS, Redux Toolkit, and shadcn/ui.

### ✨ Features
- **Add, edit, delete tasks**
- **Mark complete / toggle status**
- **Filter by status and search text**
- **Persistent state via `localStorage`**
- **Light/Dark theme** with polished UI components
- **Toasts** for quick feedback

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

# Lint (optional)
npm run lint
```

### 🧰 Tech stack
- React + TypeScript (Vite)
- Tailwind CSS + shadcn/ui (Radix UI)
- Redux Toolkit + React Redux
- React Router

### 📁 Structure (key parts)
```
src/
  main.tsx
  App.tsx
  components/
    TodoApp.tsx
    AddTaskForm.tsx
    TaskList.tsx
    TaskItem.tsx
    FilterBar.tsx
    custom-toast/
      ToastSystem.tsx
  store/
    store.ts
    slices/
      tasksSlice.ts
      filtersSlice.ts
      themeSlice.ts
  pages/
    Index.tsx
    NotFound.tsx
```

### 🔧 Scripts
- `npm run dev`: start dev server
- `npm run build`: production build
- `npm run preview`: preview built app
- `npm run lint`: run eslint

### 📦 Requirements
- Node.js 18+

### 📝 Notes
- App icon in `public/todo-purple.svg`
- Tailwind config in `tailwind.config.ts`
- UI components under `src/components/ui/*`

---
Made with care for simplicity.