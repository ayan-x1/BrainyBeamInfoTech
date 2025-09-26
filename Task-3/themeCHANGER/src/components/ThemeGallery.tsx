import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ThemePreview } from './ThemePreview';
import { Plus } from 'lucide-react';
import { Theme } from '../types/theme';
import { ThemePreviewModal } from './ThemePreviewModal';

interface ThemeGalleryProps {
  onCreateCustom: () => void;
}

export const ThemeGallery: React.FC<ThemeGalleryProps> = ({ onCreateCustom }) => {
  const { availableThemes, customThemes } = useTheme();
  
  const defaultThemes = availableThemes.filter(t => !('isCustom' in t));
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);

  return (
    <div className="space-y-8">
      {/* Built-in Themes */}
      <section>
        <h2 className="text-2xl font-bold text-text mb-6">Built-in Themes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {defaultThemes.map((theme) => (
            <ThemePreview key={theme.id} theme={theme} onPreview={setPreviewTheme} />
          ))}
        </div>
      </section>

      {/* Custom Themes */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text">Custom Themes</h2>
          <button
            onClick={onCreateCustom}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            Create Theme
          </button>
        </div>
        
        {customThemes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {customThemes.map((theme) => (
              <ThemePreview key={theme.id} theme={theme} onPreview={setPreviewTheme} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-surface/50 rounded-xl border-2 border-dashed border-border">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text mb-2">No Custom Themes Yet</h3>
                <p className="text-textSecondary mb-4">
                  Create your first custom theme to personalize your experience
                </p>
                <button
                  onClick={onCreateCustom}
                  className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all hover:scale-105"
                >
                  Create Your First Theme
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      <ThemePreviewModal theme={previewTheme} onClose={() => setPreviewTheme(null)} />
    </div>
  );
};