import { useEffect } from 'react';
import { Header } from './Header';
import { AddTaskForm } from './AddTaskForm';
import { FilterBar } from './FilterBar';
import { TaskList } from './TaskList';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { updateSystemTheme } from '@/store/slices/themeSlice';

export function TodoApp() {
  const dispatch = useAppDispatch();
  const { resolvedTheme } = useAppSelector((state) => state.theme);

  // Initialize theme and listen for system theme changes
  useEffect(() => {
    // Set initial theme class
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      dispatch(updateSystemTheme());
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch, resolvedTheme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        <div className="space-y-6">
          <AddTaskForm />
          <FilterBar />
          <TaskList />
        </div>
        
        {/* Background decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
}