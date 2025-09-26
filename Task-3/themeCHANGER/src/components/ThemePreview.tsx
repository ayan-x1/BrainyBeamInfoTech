import React from 'react';
import { Theme } from '../types/theme';
import { useTheme } from '../contexts/ThemeContext';
import { Trash2, Download, Check, Eye, Copy, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface ThemePreviewProps {
  theme: Theme;
  showActions?: boolean;
  onPreview?: (theme: Theme) => void;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, showActions = true, onPreview }) => {
  const { currentTheme, setTheme, deleteCustomTheme, exportTheme, duplicateTheme } = useTheme();
  const isActive = currentTheme.id === theme.id;
  const isCustom = 'isCustom' in theme && theme.isCustom;

  const handleSelect = () => {
    setTheme(theme.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCustom && confirm('Are you sure you want to delete this custom theme?')) {
      deleteCustomTheme(theme.id);
      toast.success('Theme deleted');
    }
  };

  const handleExport = (e: React.MouseEvent) => {
    e.stopPropagation();
    const themeJson = exportTheme(theme.id);
    const blob = new Blob([themeJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Theme exported');
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateTheme(theme.id);
    toast.success('Theme duplicated');
  };

  return (
    <motion.div 
      onClick={handleSelect}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative group cursor-pointer rounded-xl p-4 transition-all duration-300 border-2
        hover:shadow-lg hover:border-primary/50
        ${isActive 
          ? 'border-primary shadow-md ring-2 ring-primary/20' 
          : 'border-border/50 hover:border-border'
        }
      `}
      style={{
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
      }}
    >
      {/* Theme Preview */}
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm" style={{ color: theme.colors.text }}>
            {theme.name}
          </h3>
          {isActive && (
            <Check className="w-4 h-4 text-primary" />
          )}
        </div>

        {/* Color Palette */}
        <div className="grid grid-cols-4 gap-2">
          <div 
            className="aspect-square rounded-md border border-white/20"
            style={{ backgroundColor: theme.colors.primary }}
            title="Primary"
          />
          <div 
            className="aspect-square rounded-md border border-white/20"
            style={{ backgroundColor: theme.colors.accent }}
            title="Accent"
          />
          <div 
            className="aspect-square rounded-md border border-white/20"
            style={{ backgroundColor: theme.colors.success }}
            title="Success"
          />
          <div 
            className="aspect-square rounded-md border border-white/20"
            style={{ backgroundColor: theme.colors.warning }}
            title="Warning"
          />
        </div>

        {/* Sample UI Elements */}
        <div className="space-y-2">
          <div 
            className="text-xs p-2 rounded"
            style={{ 
              backgroundColor: theme.colors.background,
              color: theme.colors.textSecondary,
              border: `1px solid ${theme.colors.border}`
            }}
          >
            Sample text content
          </div>
          <div 
            className="text-xs px-2 py-1 rounded text-center font-medium"
            style={{ 
              backgroundColor: theme.colors.primary,
              color: theme.isDark ? '#ffffff' : '#ffffff'
            }}
          >
            Button
          </div>
        </div>
      </div>

      {/* Actions */}
      {showActions && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); setTheme(theme.id); }}
              className="p-1.5 bg-primary/20 hover:bg-primary/30 rounded-lg backdrop-blur-sm transition-colors"
              title="Apply theme"
            >
              <CheckCircle2 className="w-3 h-3 text-primary" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onPreview?.(theme); }}
              className="p-1.5 bg-black/20 hover:bg-black/30 rounded-lg backdrop-blur-sm transition-colors"
              title="Preview theme"
            >
              <Eye className="w-3 h-3 text-white" />
            </button>
            <button
              onClick={handleExport}
              className="p-1.5 bg-black/20 hover:bg-black/30 rounded-lg backdrop-blur-sm transition-colors"
              title="Export theme"
            >
              <Download className="w-3 h-3 text-white" />
            </button>
            <button
              onClick={handleDuplicate}
              className="p-1.5 bg-black/20 hover:bg-black/30 rounded-lg backdrop-blur-sm transition-colors"
              title="Duplicate theme"
            >
              <Copy className="w-3 h-3 text-white" />
            </button>
            {isCustom && (
              <button
                onClick={handleDelete}
                className="p-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg backdrop-blur-sm transition-colors"
                title="Delete theme"
              >
                <Trash2 className="w-3 h-3 text-red-400" />
              </button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};