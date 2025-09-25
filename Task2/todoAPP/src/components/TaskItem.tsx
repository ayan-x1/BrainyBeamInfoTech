import { useState } from 'react';
import { Pencil2Icon, TrashIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAppDispatch } from '@/hooks/useRedux';
import { updateTask, deleteTask, toggleTask, type Task } from '@/store/slices/tasksSlice';
import { useToasts } from '@/components/custom-toast/ToastSystem';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const toasts = useToasts();

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
    if (task.completed) {
      toasts.message({ text: "Task marked as active" });
    } else {
      toasts.success("Task completed! Great work! 🎉");
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toasts.error("Task deleted. The task has been removed from your list.");
  };

  const handleSaveInline = () => {
    if (!editTitle.trim()) {
      toasts.error("Title required: Please enter a title for your task.");
      return;
    }

    dispatch(updateTask({
      id: task.id,
      updates: {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      },
    }));

    setIsEditing(false);
    toasts.success("Task updated! Your changes have been saved.");
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const handleSaveModal = () => {
    if (!editTitle.trim()) {
      toasts.error("Title required: Please enter a title for your task.");
      return;
    }

    dispatch(updateTask({
      id: task.id,
      updates: {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      },
    }));

    setDialogOpen(false);
    toasts.success("Task updated! Your changes have been saved.");
  };

  if (isEditing) {
    return (
      <Card className="glass-card task-item border-primary/20">
        <CardContent className="p-4 space-y-3">
          <div className="flex gap-3">
            <div className="flex items-center pt-2">
              <Checkbox 
                checked={task.completed}
                onCheckedChange={handleToggle}
                className="data-[state=checked]:bg-success data-[state=checked]:border-success"
              />
            </div>
            <div className="flex-1 space-y-3">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="font-medium"
                placeholder="Task title..."
                autoFocus
              />
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description (optional)..."
                rows={2}
                className="resize-none"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSaveInline}
                  className="btn-gradient"
                >
                  <CheckIcon className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  <Cross2Icon className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "glass-card task-item group hover:shadow-md",
      task.completed && "task-completed"
    )}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="flex items-center pt-1">
            <Checkbox 
              checked={task.completed}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-success data-[state=checked]:border-success"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-medium text-foreground mb-1 break-words",
              task.completed && "line-through opacity-60"
            )}>
              {task.title}
            </h3>
            {task.description && (
              <p className={cn(
                "text-sm text-muted-foreground break-words",
                task.completed && "line-through opacity-50"
              )}>
                {task.description}
              </p>
            )}
            <div className="text-xs text-muted-foreground/70 mt-2">
              {new Date(task.updatedAt).toLocaleDateString()}
            </div>
          </div>

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-accent-subtle hover:text-accent"
                >
                  <Pencil2Icon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card">
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Task title..."
                    className="font-medium"
                  />
                  <Textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description (optional)..."
                    rows={4}
                    className="resize-none"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveModal}
                      className="btn-gradient"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              className="hover:bg-destructive-subtle hover:text-destructive"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}