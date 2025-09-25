import { useMemo } from 'react';
import { TaskItem } from './TaskItem';
import { useAppSelector } from '@/hooks/useRedux';
import { type Task } from '@/store/slices/tasksSlice';

export function TaskList() {
  const { tasks } = useAppSelector((state) => state.tasks);
  const { currentFilter, searchQuery } = useAppSelector((state) => state.filters);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply filter
    switch (currentFilter) {
      case 'active':
        filtered = filtered.filter((task) => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter((task) => task.completed);
        break;
      default:
        // 'all' - no filtering needed
        break;
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [tasks, currentFilter, searchQuery]);

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4 opacity-50">📝</div>
        <h3 className="text-xl font-medium text-foreground mb-2">
          {searchQuery.trim() ? 'No tasks found' : getEmptyStateTitle(currentFilter)}
        </h3>
        <p className="text-muted-foreground">
          {searchQuery.trim() 
            ? 'Try adjusting your search terms' 
            : getEmptyStateDescription(currentFilter)
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 custom-scrollbar">
      {filteredTasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-fade-in"
          style={{
            animationDelay: `${index * 50}ms`,
            animationFillMode: 'both',
          }}
        >
          <TaskItem task={task} />
        </div>
      ))}
    </div>
  );
}

function getEmptyStateTitle(filter: string): string {
  switch (filter) {
    case 'active':
      return 'No active tasks';
    case 'completed':
      return 'No completed tasks';
    default:
      return 'No tasks yet';
  }
}

function getEmptyStateDescription(filter: string): string {
  switch (filter) {
    case 'active':
      return 'All your tasks are completed! Great job! 🎉';
    case 'completed':
      return 'No completed tasks yet. Start checking off some items!';
    default:
      return 'Add your first task to get started with your productivity journey.';
  }
}