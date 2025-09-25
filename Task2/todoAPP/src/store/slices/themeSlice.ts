import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
}

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored;
    }
  }
  return 'system';
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
  resolvedTheme: getSystemTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
        
        if (action.payload === 'system') {
          state.resolvedTheme = getSystemTheme();
        } else {
          state.resolvedTheme = action.payload;
        }
        
        // Apply theme to document
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(state.resolvedTheme);
      }
    },
    updateSystemTheme: (state) => {
      if (state.theme === 'system') {
        state.resolvedTheme = getSystemTheme();
        
        if (typeof window !== 'undefined') {
          const root = document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(state.resolvedTheme);
        }
      }
    },
  },
});

export const { setTheme, updateSystemTheme } = themeSlice.actions;

export default themeSlice.reducer;