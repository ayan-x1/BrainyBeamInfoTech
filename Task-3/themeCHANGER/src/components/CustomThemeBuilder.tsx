import React, { useState } from 'react';
import { X, Save, Palette, Download, Upload, RotateCcw } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeColors, ThemeTokens } from '../types/theme';
import { toast } from 'sonner';

interface CustomThemeBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomThemeBuilder: React.FC<CustomThemeBuilderProps> = ({ isOpen, onClose }) => {
  const { createCustomTheme, importTheme } = useTheme();
  const [themeName, setThemeName] = useState('My Custom Theme');
  const [isDark, setIsDark] = useState(false);
  const [colors, setColors] = useState<ThemeColors>({
    primary: '#3B82F6',
    secondary: '#1E40AF',
    accent: '#F59E0B',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  });
  const [tokens, setTokens] = useState<ThemeTokens>({ radius: 12, spacing: 8, fontSize: 14, lineHeight: 1.5, fontWeight: 500 });

  const handleColorChange = (colorKey: keyof ThemeColors, value: string) => {
    setColors(prev => ({ ...prev, [colorKey]: value }));
  };

  const handleSave = () => {
    createCustomTheme({
      name: themeName,
      colors,
      isDark,
      tokens,
    });
    toast.success('Theme saved');
    onClose();
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          try {
            importTheme(content);
            toast.success('Theme imported');
            onClose();
          } catch (error) {
            alert('Failed to import theme. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExport = () => {
    const draftTheme = {
      id: `draft-${Date.now()}`,
      name: themeName,
      colors,
      isDark,
      tokens,
    };
    const json = JSON.stringify(draftTheme, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${themeName.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Theme exported');
  };

  const presetDarkColors = () => {
    setColors({
      primary: '#60A5FA',
      secondary: '#3B82F6',
      accent: '#FBBF24',
      background: '#0F172A',
      surface: '#1E293B',
      text: '#F1F5F9',
      textSecondary: '#94A3B8',
      border: '#334155',
      success: '#34D399',
      warning: '#FBBF24',
      error: '#F87171',
    });
    setIsDark(true);
  };

  const presetLightColors = () => {
    setColors({
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#F59E0B',
      background: '#FFFFFF',
      surface: '#F8FAFC',
      text: '#1F2937',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    });
    setIsDark(false);
  };

  const resetToDefault = () => {
    setThemeName('My Custom Theme');
    presetLightColors();
    setTokens({ radius: 12, spacing: 8, fontSize: 14, lineHeight: 1.5, fontWeight: 500 });
    toast.success('Reset to defaults');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-surface rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: colors.surface, color: colors.text }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-surface/95 backdrop-blur-sm border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Custom Theme Builder</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetToDefault}
                className="flex items-center gap-2 px-3 py-2 bg-border/30 hover:bg-border/50 rounded-lg transition-colors"
                title="Reset to default"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleImport}
                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-white rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-border/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            {/* Theme Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Theme Name</label>
              <input
                type="text"
                value={themeName}
                onChange={(e) => setThemeName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-text focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                style={{ 
                  backgroundColor: colors.background, 
                  color: colors.text, 
                  borderColor: colors.border 
                }}
              />
            </div>

            {/* Theme Mode */}
            <div>
              <label className="block text-sm font-medium mb-3">Theme Mode</label>
              <div className="flex gap-3">
                <button
                  onClick={presetLightColors}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    !isDark ? 'bg-primary text-white' : 'bg-surface border border-border hover:bg-border/30'
                  }`}
                >
                  Light Mode
                </button>
                <button
                  onClick={presetDarkColors}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    isDark ? 'bg-primary text-white' : 'bg-surface border border-border hover:bg-border/30'
                  }`}
                >
                  Dark Mode
                </button>
              </div>
            </div>

            {/* Color Inputs */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(colors).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => handleColorChange(key as keyof ThemeColors, e.target.value)}
                      className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleColorChange(key as keyof ThemeColors, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-text text-sm font-mono"
                      style={{ 
                        backgroundColor: colors.background, 
                        color: colors.text, 
                        borderColor: colors.border 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Tokens */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Border Radius: {tokens.radius}px</label>
                <input type="range" min={0} max={24} value={tokens.radius || 0} onChange={(e) => setTokens(prev => ({ ...prev, radius: Number(e.target.value) }))} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Spacing: {tokens.spacing}px</label>
                <input type="range" min={4} max={24} value={tokens.spacing || 8} onChange={(e) => setTokens(prev => ({ ...prev, spacing: Number(e.target.value) }))} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Base Font Size: {tokens.fontSize}px</label>
                <input type="range" min={12} max={18} value={tokens.fontSize || 14} onChange={(e) => setTokens(prev => ({ ...prev, fontSize: Number(e.target.value) }))} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Line Height: {tokens.lineHeight}</label>
                <input type="range" min={1.2} max={1.8} step={0.05} value={tokens.lineHeight || 1.5} onChange={(e) => setTokens(prev => ({ ...prev, lineHeight: Number(e.target.value) }))} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Font Weight: {tokens.fontWeight}</label>
                <input type="range" min={400} max={800} step={50} value={tokens.fontWeight || 500} onChange={(e) => setTokens(prev => ({ ...prev, fontWeight: Number(e.target.value) }))} className="w-full" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Theme
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-border/30 hover:bg-border/50 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Live Preview</h3>
            
            <div 
              className="rounded-xl p-6 border transition-all duration-300"
              style={{ 
                backgroundColor: colors.background, 
                borderColor: colors.border,
                color: colors.text 
              }}
            >
              <div className="space-y-4" style={{ fontSize: tokens.fontSize, lineHeight: tokens.lineHeight, fontWeight: tokens.fontWeight }}>
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold" style={{ color: colors.text }}>
                    {themeName}
                  </h4>
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  />
                </div>

                {/* Content */}
                <p style={{ color: colors.textSecondary }}>
                  This is how your theme will look. You can see the primary text color, secondary text, and various UI elements.
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button 
                    className="px-4 py-2 rounded-lg font-medium text-white transition-colors"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Primary Button
                  </button>
                  <button 
                    className="px-4 py-2 rounded-lg font-medium transition-colors text-white"
                    style={{ 
                      backgroundColor: colors.secondary
                    }}
                  >
                    Secondary Button
                  </button>
                </div>

                {/* Status Indicators */}
                <div className="flex gap-2">
                  <div 
                    className="px-2 py-1 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: colors.success }}
                  >
                    Success
                  </div>
                  <div 
                    className="px-2 py-1 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: colors.warning }}
                  >
                    Warning
                  </div>
                  <div 
                    className="px-2 py-1 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: colors.error }}
                  >
                    Error
                  </div>
                </div>

                {/* Card */}
                <div 
                  className="p-4 border"
                  style={{ 
                    backgroundColor: colors.surface, 
                    borderColor: colors.border,
                    borderRadius: tokens.radius
                  }}
                >
                  <h5 className="font-semibold mb-2" style={{ color: colors.text }}>
                    Sample Card
                  </h5>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    This card shows how content will appear with your custom theme colors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};