import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeGallery } from './components/ThemeGallery';
import { CustomThemeBuilder } from './components/CustomThemeBuilder';
import { Palette, Sparkles, Zap, Heart } from 'lucide-react';
import { Toaster } from 'sonner';

function AppContent() {
  const [showThemeBuilder, setShowThemeBuilder] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text transition-all duration-300">
      <Toaster richColors position="bottom-right" />
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      {/* Header */}
      <header className="relative sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Global Theme Changer
                </h1>
                <p className="text-sm text-textSecondary">
                  Studio‑grade theming for modern, polished applications
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <Sparkles className="w-6 h-6" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Fully Customizable
              </span>
              <Sparkles className="w-6 h-6" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-text via-primary to-accent bg-clip-text text-transparent">
                Beautiful Themes
              </span>
              <br />
              <span className="text-text">Made Simple</span>
            </h2>
            
            <p className="text-xl text-textSecondary max-w-2xl mx-auto leading-relaxed">
              Switch between stunning pre-built themes or create your own custom designs with our intuitive theme builder. Experience seamless transitions and persistent preferences.
            </p>

            <div className="flex items-center justify-center gap-8 pt-6">
              <div className="flex items-center gap-2 text-textSecondary">
                <Zap className="w-5 h-5 text-accent" />
                <span>Real-time switching</span>
              </div>
              <div className="flex items-center gap-2 text-textSecondary">
                <Heart className="w-5 h-5 text-error" />
                <span>Beautiful design</span>
              </div>
              <div className="flex items-center gap-2 text-textSecondary">
                <Palette className="w-5 h-5 text-primary" />
                <span>Fully customizable</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-textSecondary">
              Instant theme switching with smooth animations. No page reloads, no flickering.
            </p>
          </div>

          <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Persistent Memory</h3>
            <p className="text-textSecondary">
              Your theme preferences are saved locally and sync across sessions automatically.
            </p>
          </div>

          <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Unlimited Creativity</h3>
            <p className="text-textSecondary">
              Create, customize, export, and share your own unique themes with ease.
            </p>
          </div>
        </section>

        {/* Theme Gallery */}
        <ThemeGallery onCreateCustom={() => setShowThemeBuilder(true)} />
      </main>

      {/* Custom Theme Builder Modal */}
      <CustomThemeBuilder
        isOpen={showThemeBuilder}
        onClose={() => setShowThemeBuilder(false)}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;