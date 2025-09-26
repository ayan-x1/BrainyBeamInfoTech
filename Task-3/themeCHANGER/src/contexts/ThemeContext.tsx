import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme, CustomTheme, ThemeMode, ThemeContextType } from '../types/theme';
import { defaultThemes } from '../data/themes';
import {
  saveThemePreferences,
  loadThemePreferences,
  saveCustomThemes,
  loadCustomThemes,
  detectSystemTheme,
  exportThemeAsJson,
  importThemeFromJson,
} from '../utils/localStorage';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultThemes[0]);
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const availableThemes = [...defaultThemes, ...customThemes];

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const preferences = loadThemePreferences();
    const storedCustomThemes = loadCustomThemes();
    
    setCustomThemes(storedCustomThemes);

    if (preferences) {
      setThemeMode(preferences.themeMode);
      const allThemes = [...defaultThemes, ...storedCustomThemes];
      const theme = allThemes.find(t => t.id === preferences.currentThemeId);
      
      if (theme) {
        setCurrentTheme(theme);
      } else if (preferences.themeMode === 'system') {
        const systemTheme = detectSystemTheme();
        const fallbackTheme = defaultThemes.find(t => t.id === systemTheme) || defaultThemes[0];
        setCurrentTheme(fallbackTheme);
      }
    } else {
      // First visit - use system preference
      const systemTheme = detectSystemTheme();
      const initialTheme = defaultThemes.find(t => t.id === systemTheme) || defaultThemes[0];
      setCurrentTheme(initialTheme);
      setThemeMode('system');
    }

    setIsInitialized(true);
  }, []);

  // Apply theme to CSS custom properties
  useEffect(() => {
    if (!isInitialized) return;

    const root = document.documentElement;
    const colors = currentTheme.colors;
    const tokens = currentTheme.tokens || {};

    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-surface', colors.surface);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-success', colors.success);
    root.style.setProperty('--color-warning', colors.warning);
    root.style.setProperty('--color-error', colors.error);

    // Tokens
    if (tokens.radius !== undefined) root.style.setProperty('--radius', `${tokens.radius}px`);
    if (tokens.spacing !== undefined) root.style.setProperty('--spacing', `${tokens.spacing}px`);
    if (tokens.fontSize !== undefined) root.style.setProperty('--font-size', `${tokens.fontSize}px`);
    if (tokens.lineHeight !== undefined) root.style.setProperty('--line-height', `${tokens.lineHeight}`);
    if (tokens.fontWeight !== undefined) root.style.setProperty('--font-weight', `${tokens.fontWeight}`);

    // Update body class for theme-aware styles
    document.body.className = currentTheme.isDark ? 'theme-dark' : 'theme-light';
  }, [currentTheme, isInitialized]);

  // Save preferences when theme changes
  useEffect(() => {
    if (!isInitialized) return;

    saveThemePreferences({
      currentThemeId: currentTheme.id,
      themeMode,
      lastUpdated: new Date().toISOString(),
    });
  }, [currentTheme, themeMode, isInitialized]);

  // Listen for system theme changes
  useEffect(() => {
    if (themeMode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const systemTheme = detectSystemTheme();
      const theme = defaultThemes.find(t => t.id === systemTheme) || defaultThemes[0];
      setCurrentTheme(theme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  const setTheme = (themeId: string) => {
    const theme = availableThemes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      if (themeMode === 'system') {
        setThemeMode('custom');
      }
    }
  };

  const handleSetThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);

    if (mode === 'system') {
      const systemTheme = detectSystemTheme();
      const theme = defaultThemes.find(t => t.id === systemTheme) || defaultThemes[0];
      setCurrentTheme(theme);
      return;
    }

    if (mode === 'light') {
      const light = defaultThemes.find(t => t.id === 'light') || defaultThemes[0];
      setCurrentTheme(light);
      return;
    }

    if (mode === 'dark') {
      const dark = defaultThemes.find(t => t.id === 'dark') || defaultThemes[0];
      setCurrentTheme(dark);
      return;
    }

    if (mode === 'custom') {
      // Prefer the currently selected custom theme, else the most recently created one, else fallback to light
      const existingSelectedIsCustom = customThemes.some(t => t.id === currentTheme.id);
      if (existingSelectedIsCustom) return;
      const recentCustom = customThemes[customThemes.length - 1];
      if (recentCustom) {
        setCurrentTheme(recentCustom);
      } else {
        const fallback = defaultThemes[0];
        setCurrentTheme(fallback);
      }
      return;
    }
  };

  const createCustomTheme = (themeData: Omit<CustomTheme, 'id' | 'createdAt' | 'isCustom'>) => {
    const newTheme: CustomTheme = {
      ...themeData,
      id: `custom-${Date.now()}`,
      isCustom: true,
      createdAt: new Date(),
    };

    const updatedCustomThemes = [...customThemes, newTheme];
    setCustomThemes(updatedCustomThemes);
    saveCustomThemes(updatedCustomThemes);
    setCurrentTheme(newTheme);
    setThemeMode('custom');
  };

  const deleteCustomTheme = (themeId: string) => {
    const updatedCustomThemes = customThemes.filter(t => t.id !== themeId);
    setCustomThemes(updatedCustomThemes);
    saveCustomThemes(updatedCustomThemes);

    // If the deleted theme was active, switch to light theme
    if (currentTheme.id === themeId) {
      setCurrentTheme(defaultThemes[0]);
    }
  };

  const duplicateTheme = (themeId: string) => {
    const source = availableThemes.find(t => t.id === themeId);
    if (!source) return;
    const duplicated: CustomTheme = {
      ...source,
      id: `custom-${Date.now()}`,
      name: `${source.name} Copy`,
      isCustom: true,
      createdAt: new Date(),
    } as CustomTheme;
    const updated = [...customThemes, duplicated];
    setCustomThemes(updated);
    saveCustomThemes(updated);
  };

  const exportTheme = (themeId: string): string => {
    const theme = availableThemes.find(t => t.id === themeId);
    return theme ? exportThemeAsJson(theme) : '';
  };

  const importTheme = (themeData: string) => {
    const theme = importThemeFromJson(themeData);
    if (theme) {
      createCustomTheme({
        name: `${theme.name} (Imported)`,
        colors: theme.colors,
        isDark: theme.isDark,
      });
    }
  };

  const syncWithCloud = async () => {
    // This would integrate with Supabase to sync themes
    console.log('Cloud sync would be implemented with Supabase');
  };

  const contextValue: ThemeContextType = {
    currentTheme,
    themeMode,
    availableThemes,
    customThemes,
    setTheme,
    setThemeMode: handleSetThemeMode,
    createCustomTheme,
    deleteCustomTheme,
    duplicateTheme,
    exportTheme,
    importTheme,
    syncWithCloud,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};