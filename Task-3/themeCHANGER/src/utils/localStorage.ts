import { Theme, CustomTheme, ThemeMode } from '../types/theme';

const THEME_STORAGE_KEY = 'global-theme-preferences';
const CUSTOM_THEMES_KEY = 'custom-themes';

export interface ThemePreferences {
  currentThemeId: string;
  themeMode: ThemeMode;
  lastUpdated: string;
}

export const saveThemePreferences = (preferences: ThemePreferences): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to save theme preferences:', error);
  }
};

export const loadThemePreferences = (): ThemePreferences | null => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to load theme preferences:', error);
    return null;
  }
};

export const saveCustomThemes = (themes: CustomTheme[]): void => {
  try {
    localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(themes));
  } catch (error) {
    console.warn('Failed to save custom themes:', error);
  }
};

export const loadCustomThemes = (): CustomTheme[] => {
  try {
    const stored = localStorage.getItem(CUSTOM_THEMES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load custom themes:', error);
    return [];
  }
};

export const detectSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const exportThemeAsJson = (theme: Theme): string => {
  return JSON.stringify(theme, null, 2);
};

export const importThemeFromJson = (jsonString: string): Theme | null => {
  try {
    const parsed = JSON.parse(jsonString);
    // Basic validation
    if (parsed.id && parsed.name && parsed.colors && typeof parsed.isDark === 'boolean') {
      return parsed as Theme;
    }
    return null;
  } catch (error) {
    console.error('Failed to import theme:', error);
    return null;
  }
};