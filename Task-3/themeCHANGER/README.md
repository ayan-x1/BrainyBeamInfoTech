## Theme Changer

A tiny, fast React + TypeScript app to preview, toggle, and build custom themes. Built with Vite and Tailwind CSS.

### ✨ Features
- Toggle light/dark and custom themes
- Live preview with a modal
- Save theme to `localStorage`
- Minimal, responsive UI

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
- React + TypeScript (Vite)
- Tailwind CSS

### 📁 Structure (key parts)
```
src/
  App.tsx
  components/
    ThemeToggle.tsx
    ThemePreview.tsx
    ThemePreviewModal.tsx
    ThemeGallery.tsx
    CustomThemeBuilder.tsx
  contexts/ThemeContext.tsx
  data/themes.ts
  utils/localStorage.ts
```

### 🔧 Scripts
- `npm run dev`: start dev server
- `npm run build`: production build
- `npm run preview`: preview built app

### 📦 Requirements
- Node.js 18+

### 📝 Notes
- Theme icon is in `public/theme-icon-aurora.svg`
- Tailwind config in `tailwind.config.js`

---
Made with care for simplicity.