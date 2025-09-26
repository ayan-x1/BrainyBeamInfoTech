import React from 'react';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeMode } from '../types/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export const ThemeToggle: React.FC = () => {
  const { themeMode, setThemeMode } = useTheme();

  const modes: { mode: ThemeMode; icon: React.ReactNode; label: string }[] = [
    { mode: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
    { mode: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
    { mode: 'system', icon: <Monitor className="w-4 h-4" />, label: 'System' },
    { mode: 'custom', icon: <Palette className="w-4 h-4" />, label: 'Custom' },
  ];

  return (
    <div className="flex items-center bg-surface/50 backdrop-blur-sm rounded-xl p-1 border border-border/50 shadow-lg relative">
      <AnimatePresence initial={false}>
        <motion.div
          key={themeMode}
          layoutId="toggle-pill"
          className="absolute h-8 rounded-lg bg-primary/15"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            width: '25%',
            left: `${['light','dark','system','custom'].indexOf(themeMode) * 25}%`,
            top: 4,
          }}
        />
      </AnimatePresence>
      {modes.map(({ mode, icon, label }) => (
        <motion.button
          key={mode}
          onClick={() => { setThemeMode(mode); toast.success(`${label} mode`); }}
          whileTap={{ scale: 0.96 }}
          className={`
            relative z-10 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
            ${themeMode === mode 
              ? 'text-primary' 
              : 'text-textSecondary hover:text-text'
            }
          `}
          title={`Switch to ${label} mode`}
        >
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </motion.button>
      ))}
    </div>
  );
};