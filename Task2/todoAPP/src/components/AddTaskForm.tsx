import { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useAppDispatch } from '@/hooks/useRedux';
import { addTask } from '@/store/slices/tasksSlice';
import { useToasts } from '@/components/custom-toast/ToastSystem';

export function AddTaskForm() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();
  const toasts = useToasts();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toasts.error("Title required: Please enter a title for your task.");
      return;
    }

    dispatch(addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
    }));

    // Reset form
    setTitle('');
    setDescription('');
    setIsExpanded(false);

    toasts.success("Task added! Your new task has been added to the list.");
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  return (
    <Card className="glass-card border-border-hover hover:border-primary/20 transition-all duration-300">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder={isExpanded ? "Task title..." : "Add a new task..."}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="flex-1 border-none bg-transparent text-base placeholder:text-muted-foreground/70 focus-visible:ring-0"
            />
            
            {isExpanded && (
              <div className="flex gap-2 animate-fade-in">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="hover:bg-destructive-subtle hover:text-destructive hover:border-destructive/30"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="btn-gradient"
                  disabled={!title.trim()}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </div>
            )}
          </div>

          {isExpanded && (
            <div className="animate-slide-up">
              <Textarea
                placeholder="Add a description (optional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-none bg-transparent resize-none placeholder:text-muted-foreground/70 focus-visible:ring-0"
                rows={3}
              />
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}