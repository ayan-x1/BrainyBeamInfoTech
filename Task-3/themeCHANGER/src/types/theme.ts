export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface ThemeTokens {
  radius?: number; // px
  spacing?: number; // px base spacing unit
  fontSize?: number; // px base font size
  lineHeight?: number; // unitless
  fontWeight?: number; // numeric weight
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  isDark: boolean;
  tokens?: ThemeTokens;
}

export interface CustomTheme extends Theme {
  isCustom: true;
  createdAt: Date;
  userId?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system' | 'custom';

export interface ThemeContextType {
  currentTheme: Theme;
  themeMode: ThemeMode;
  availableThemes: Theme[];
  customThemes: CustomTheme[];
  setTheme: (themeId: string) => void;
  setThemeMode: (mode: ThemeMode) => void;
  createCustomTheme: (theme: Omit<CustomTheme, 'id' | 'createdAt' | 'isCustom'>) => void;
  deleteCustomTheme: (themeId: string) => void;
  duplicateTheme: (themeId: string) => void;
  exportTheme: (themeId: string) => string;
  importTheme: (themeData: string) => void;
  syncWithCloud: () => Promise<void>;
}