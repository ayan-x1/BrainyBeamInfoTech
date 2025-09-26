import React from 'react';
import { Theme } from '../types/theme';
import { X, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface ThemePreviewModalProps {
  theme: Theme | null;
  onClose: () => void;
}

export const ThemePreviewModal: React.FC<ThemePreviewModalProps> = ({ theme, onClose }) => {
  const { setTheme } = useTheme();

  const applyTheme = () => {
    if (!theme) return;
    setTheme(theme.id);
    toast.success(`Applied ${theme.name}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {theme && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl"
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text, border: `1px solid ${theme.colors.border}` }}
          >
            <div className="flex items-center justify-between p-4" style={{ backgroundColor: theme.colors.surface }}>
              <div>
                <h3 className="text-xl font-semibold">Preview: {theme.name}</h3>
                <p className="text-sm" style={{ color: theme.colors.textSecondary }}>This is how the app looks with this theme.</p>
              </div>
              <button onClick={onClose} className="p-2 rounded hover:bg-black/10" title="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}>
                  <h4 className="font-semibold mb-2">Buttons</h4>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: theme.colors.primary }}>Primary</button>
                    <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: theme.colors.secondary }}>Secondary</button>
                    <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: theme.colors.accent }}>Accent</button>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}>
                  <h4 className="font-semibold mb-2">Inputs</h4>
                  <input className="w-full px-3 py-2 rounded-lg" placeholder="Type here..." style={{ backgroundColor: theme.colors.background, color: theme.colors.text, border: `1px solid ${theme.colors.border}` }} />
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}>
                  <h4 className="font-semibold mb-2">Status</h4>
                  <div className="flex gap-2 text-white text-xs">
                    <span className="px-2 py-1 rounded" style={{ backgroundColor: theme.colors.success }}>Success</span>
                    <span className="px-2 py-1 rounded" style={{ backgroundColor: theme.colors.warning }}>Warning</span>
                    <span className="px-2 py-1 rounded" style={{ backgroundColor: theme.colors.error }}>Error</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}>
                  <h4 className="font-semibold mb-2">Cards</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded border" style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border }}>
                      <div className="h-2 w-16 rounded mb-2" style={{ backgroundColor: theme.colors.textSecondary }} />
                      <div className="h-2 w-24 rounded" style={{ backgroundColor: theme.colors.textSecondary }} />
                    </div>
                    <div className="p-3 rounded border" style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.border }}>
                      <div className="h-2 w-20 rounded mb-2" style={{ backgroundColor: theme.colors.textSecondary }} />
                      <div className="h-2 w-16 rounded" style={{ backgroundColor: theme.colors.textSecondary }} />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}>
                  <h4 className="font-semibold mb-2">Typography</h4>
                  <p className="text-sm" style={{ color: theme.colors.textSecondary }}>Base copy appearance across the app.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-4" style={{ backgroundColor: theme.colors.surface, borderTop: `1px solid ${theme.colors.border}` }}>
              <button onClick={onClose} className="px-4 py-2 rounded-lg" style={{ border: `1px solid ${theme.colors.border}` }}>Close</button>
              <button onClick={applyTheme} className="px-4 py-2 rounded-lg text-white flex items-center gap-2" style={{ backgroundColor: theme.colors.primary }}>
                <Check className="w-4 h-4" /> Apply
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


